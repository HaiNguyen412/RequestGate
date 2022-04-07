<?php

namespace App\Services\Api;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Contracts\Repositories\CommentRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use App\Contracts\Services\Api\CommentServiceInterface;
use App\Services\AbstractService;

class CommentService extends AbstractService implements CommentServiceInterface
{
    protected $commentRepository;
    protected $userRepository;
    protected $categoryRepository;

    /**
     * CommentService constructor.
     * @param CommentRepositoryInterface $commentRepository
     */
    public function __construct(
        CommentRepositoryInterface $commentRepository,
        UserRepositoryInterface $userRepository,
        CategoryRepositoryInterface $categoryRepository
    ) {
        $this->commentRepository = $commentRepository;
        $this->userRepository = $userRepository;
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * @param $params
     * @return array
     */
    public function store($request, $content)
    {
        $params = [
            'request_id' => $request->id,
            'user_id' => auth()->user()->id,
        ];
        $data = $params + $content;

        $comment = $this->commentRepository->store($data);

        if ($comment) {
            $mail = $this->setMail($request);

            $user_id = $request->user_id;
            $assignee_id = $request->category->user->id;

            $recipents = $this->userRepository->getUsersForRequestNotification($user_id, $assignee_id);

            foreach ($recipents as $user) {
                $user->sendRequestActionNotification($mail, 'comment');
            }
        }

        return [
            'message' => __('notification.create_success'),
        ];
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

    public function convertFromConfig($int, $key)
    {
        return ucwords(str_replace('_', ' ', array_search($int, config('request.' . $key))));
    }
}
