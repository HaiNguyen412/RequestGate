<?php

namespace App\Services\Api;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Contracts\Services\Api\UserServiceInterface;
use App\Models\User;
use App\Services\AbstractService;

class UserService extends AbstractService implements UserServiceInterface
{
    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;

    /**
     * UserService constructor.
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @param $params
     * @return array
     */
    public function index($request)
    {

        return $this->userRepository->index($request);
    }

    public function find($params)
    {
        $user = $this->userRepository->find($params);
        if (!$user) {
            return ['message' => __('user_notification.find_failed')];
        } else {
            return [
                'message' => __('user_notification.find_succeed'),
                'data' => $user
            ];
        }
    }

    public function store($params)
    {
        $user = $this->userRepository->store($params);
        if (!$user) {
            return ['message' => __('user_notification.create_failed')];
        } else {
            $user->sendEmailVerificationNotification();
            return [
                'message' => __('user_notification.create_succeed'),
                'data' => $params
            ];
        }
    }

    public function update(User $user, $request)
    {
        $input = $request->validated();
        $data = $this->userRepository->update($user, $input);
        if (!$data) {
            return ['message' => __('user_notification.update_failed')];
        } else {
            return [
                'message' => __('user_notification.update_succeed'),
                'data' => $input
            ];
        }
    }

    public function destroy(User $user)
    {
        return [
            'message:' => $this->userRepository
                ->destroy($user) ?
            __('user_notification.delete_succeed') :
            __('user_notification.delete_failed')
        ];
    }

    public function getListAssignee()
    {
        return [
            'data' => $this->userRepository->getListAssignee()
        ];
    }
    public function getListUser()
    {
        return $this->userRepository->getListUser();
    }
}
