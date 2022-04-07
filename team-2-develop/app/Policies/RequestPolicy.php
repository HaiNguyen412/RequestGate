<?php

namespace App\Policies;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use App\Models\User;
use App\Models\Request;
use Illuminate\Auth\Access\HandlesAuthorization;

class RequestPolicy
{
    use HandlesAuthorization;
    protected $userRepository;
    protected $categoryRepository;

    public function __construct(
        UserRepositoryInterface $userRepository,
        CategoryRepositoryInterface $categoryRepository
    ) {
        $this->userRepository = $userRepository;
        $this->categoryRepository = $categoryRepository;
    }

    public function update(User $user, Request $request)
    {
        return false;
    }

    public function adminUpdate(User $user, Request $request)
    {
        return $user->role_id == config('roles.admin') &&
            $request->approval != config('request.approval.rejected');
    }

    public function authorUpdate(User $user, Request $request)
    {
        return $user->id === $request->user_id &&
            $request->status == config('request.status.open') &&
            $request->approval == config('request.approval.pending');
    }

    public function delete(User $user, Request $request)
    {
        return ($request->status == config('request.status.open') && $user->id === $request->user_id);
    }

    public function viewStaff(User $user)
    {
        return ($user->role_id == config('roles.manager'));
    }

    public function manager(User $user, Request $request)
    {
        $author = $this->userRepository->find($request->user_id);

        return (
            $request->status == config('request.status.open') &&
            $request->is_approved == config('request.approval.pending') &&
            $user->role_id == config('roles.manager') &&
            $user->department_id == $author->department_id
        );
    }

    public function changeStatus(User $user, Request $request)
    {
        $assignee_id = $this->categoryRepository->find($request->category_id)->user_id;

        return $user->role_id == config('roles.admin') && $user->id === $assignee_id;
    }

    public function manageRequest(User $user, Request $request)
    {
        return $user->role_id == config('roles.admin');
    }
}
