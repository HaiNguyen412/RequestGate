<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\UserServiceInterface;
use App\Http\Requests\Api\Users\CreateRequest;
use App\Http\Requests\Api\Users\UpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends ApiController
{
    /**
     * UserController constructor.
     */

    protected $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @param IndexRequest $request
     * @param UserServiceInterface $serviceService
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\CheckAuthenticationException
     * @throws \App\Exceptions\CheckAuthorizationException
     * @throws \App\Exceptions\NotFoundException
     * @throws \App\Exceptions\QueryException
     * @throws \App\Exceptions\ServerException
     * @throws \App\Exceptions\UnprocessableEntityException
     */
    public function index(Request $request)
    {
        return $this->getData(function () use ($request) {
            return $this->userService->index($request);
        });
    }

    public function show(User $user)
    {
        $params = $user->id;
        return $this->getData(function () use ($params) {
            return $this->userService->find($params);
        });
    }

    public function store(CreateRequest $request)
    {
        $this->authorize('create', User::class);
        $params = $request->all();
        return $this->doRequest(function () use ($params) {
            return $this->userService->store($params);
        });
    }

    public function update(User $user, UpdateRequest $request)
    {
        $this->authorize('update', $user);
        return $this->doRequest(function () use ($user, $request) {
            return $this->userService->update($user, $request);
        });
    }

    public function destroy(User $user)
    {
        $this->authorize('delete', User::class);
        return $this->doRequest(function () use ($user) {
            return $this->userService->destroy($user);
        });
    }

    public function getListAssignee()
    {
        return $this->getData(function () {
            return $this->userService->getListAssignee();
        });
    }

    public function getListUser()
    {
        return $this->getData(function () {
            return $this->userService->getListUser();
        });
    }
}
