<?php

namespace App\Services\Api;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Contracts\Repositories\CommentRepositoryInterface;
use App\Contracts\Repositories\RequestRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use App\Contracts\Services\Api\RequestServiceInterface;
use App\Services\AbstractService;

class RequestService extends AbstractService implements RequestServiceInterface
{
    protected $requestRepository;
    protected $commentRepository;
    protected $userRepository;
    protected $categoryRepository;

    public function __construct(
        RequestRepositoryInterface $requestRepository,
        CommentRepositoryInterface $commentRepository,
        UserRepositoryInterface $userRepository,
        CategoryRepositoryInterface $categoryRepository
    ) {
        $this->requestRepository = $requestRepository;
        $this->commentRepository = $commentRepository;
        $this->userRepository = $userRepository;
        $this->categoryRepository = $categoryRepository;
    }

    public function index($filters)
    {
        return $this->requestRepository->index($filters);
    }

    public function show($id)
    {
        $request = $this->requestRepository->getRequestById($id);

        $comments = $this->commentRepository->getRequestComments($id);

        $results = collect(['request' => $request, 'comments' => $comments]);

        return $results;
    }

    public function store($data)
    {
        $data['approval'] = config('request.approval.pending');
        $data['status'] = config('request.status.open');
        $data['priority'] = config('request.priority.low');
        $data['user_id'] = auth()->user()->id;

        $request = $this->requestRepository->store($data);

        if ($request) {
            $comment['request_id'] = $request->id;
            $comment['user_id'] = $request->user_id;
            $comment['content'] = __('notification.request_create');

            $this->commentRepository->store($comment);

            $mail = $this->setMail($request);

            $assignee_id = $request->category->user->id;
            $user_id = $request->user_id;

            $recipents = $this->userRepository->getUsersForRequestNotification($user_id, $assignee_id);

            foreach ($recipents as $user) {
                $user->sendRequestActionNotification($mail, 'create');
            }
        };

        return [
            'message' => __('notification.create_success'),
        ];
    }

    public function update($request, $data, $action = 'update')
    {
        if ($action == 'approve') {
            $comment['content'] = __('notification.request_approve');
        } else {
            $comment['content'] = $this->getContent($request, $data);
        }
        $comment['user_id'] = auth()->user()->id;
        $comment['request_id'] = $request->id;

        $results = $this->requestRepository->update($request, $data);

        if ($results) {
            $this->commentRepository->store($comment);

            $mail = $this->setMail($request, $comment['content']);

            $user_id = $request->user_id;
            $assignee_id = $request->category->user->id;

            $recipents = $this->userRepository->getUsersForRequestNotification($user_id, $assignee_id);

            foreach ($recipents as $user) {
                $user->sendRequestActionNotification($mail, $action);
            }
        }

        return [
            'message' => __('notification.' . $action . '_success')
        ];
    }

    public function destroy($request)
    {
        $this->commentRepository->deleteCommentsByRequest($request->id);
        $this->requestRepository->destroy($request);
        return [
            'message' => __('notification.delete_success'),
        ];
    }

    public function history()
    {
        return $this->requestRepository->history();
    }

    public function myRequests($user_id)
    {
        return $this->requestRepository->getRequestsByUser($user_id);
    }

    public function staffRequests($dept_id)
    {
        return $this->requestRepository->getRequestsByDept($dept_id);
    }

    public function approve($request)
    {
        $data['approval'] = config('request.approval.approved');

        return $this->update($request, $data, 'approve');
    }

    public function reject($request)
    {
        $data['status'] = config('request.status.close');
        $data['approval'] = config('request.approval.rejected');

        return $this->update($request, $data, 'reject');
    }

    public function adminUpdate($request, $data)
    {
        if (isset($data['status']) && $request->status > $data['status']) {
            return [
                'message' => __('notification.request_status_error'),
            ];
        }
        return $this->update($request, $data);
    }

    public function authorUpdate($request, $data)
    {
        return $this->update($request, $data);
    }

    public function setMail($request, $content = null)
    {
        $mail['name'] = auth()->user()->name;
        $mail['role'] = ucwords(array_search(auth()->user()->role_id, config('roles')));
        $mail['request_id'] = $request->id;
        $mail['request_title'] = $request->title;
        $mail['request_status'] = $this->convertFromConfig($request->status, 'status');
        $mail['assignee'] = $request->category->user->name;

        if ($content) {
            $mail['content'] = $content;
        }

        return $mail;
    }

    public function getContent($request, $data)
    {
        $content = array_map(function ($item) use ($data, $request) {
            if ($data[$item] != $request->$item) {
                if ($item == 'status' || $item == 'priority' || $item == 'approval') {
                    $from = $this->convertFromConfig($request->$item, $item);
                    $to = $this->convertFromConfig($data[$item], $item);
                } elseif ($item == 'category_id') {
                    $from = $this->categoryRepository->find($request->$item)->name;
                    $to = $this->categoryRepository->find($data[$item])->name;
                } else {
                    $from = $request->$item;
                    $to = $data[$item];
                }
                return $this->normalizeKey($item) . ': ' . $from . ' -> ' . $to;
            }
        }, array_keys($data));

        if (isset($data['category_id']) && $data['category_id'] != $request->category_id) {
            $from = $this->getCode($this->userRepository->getAssigneeByCategory($request->category_id)->email);
            $to = $this->getCode($this->userRepository->getAssigneeByCategory($data['category_id'])->email);
            $content[] = 'Assignee: ' . $from . ' -> ' . $to;
        }
        $content = array_filter($content);
        $content = implode(' ; ', $content);

        return $content;
    }

    public function convertFromConfig($int, $key)
    {
        return ucwords(str_replace('_', ' ', array_search($int, config('request.' . $key))));
    }

    public function getCode($email)
    {
        return explode('@', $email)[0];
    }

    public function normalizeKey($key)
    {
        return ucwords(str_replace('_', ' ', str_replace('_id', '', $key)));
    }

    public function getRequestsByAssignee()
    {
        return $this->requestRepository->getRequestsByAssignee(auth()->user()->id);
    }
}
