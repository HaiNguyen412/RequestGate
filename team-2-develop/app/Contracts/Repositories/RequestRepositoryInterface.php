<?php

namespace App\Contracts\Repositories;

interface RequestRepositoryInterface extends BaseRepositoryInterface
{
    public function index($filters);
    public function getRequestById($id);
    public function history();
    public function getRequestsByUser($id);
    public function getRequestsByDept($dept_id);
    public function getRequestsByAssignee($assignee_id);
}
