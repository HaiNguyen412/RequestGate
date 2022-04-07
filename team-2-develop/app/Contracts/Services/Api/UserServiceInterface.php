<?php

namespace App\Contracts\Services\Api;

use App\Models\User;

interface UserServiceInterface
{
    public function index($params);

    public function find($params);

    public function store($params);

    public function update(User $user, $params);

    public function destroy(User $user);

    public function getListAssignee();
    public function getListUser();
}
