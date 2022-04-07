<?php

namespace App\Contracts\Repositories;

interface UserRepositoryInterface extends BaseRepositoryInterface
{
    public function getListAssignee();
    public function getUsersForRequestNotification($user_id, $assignee_id);
    public function getAssigneeByCategory($category_id);
}
