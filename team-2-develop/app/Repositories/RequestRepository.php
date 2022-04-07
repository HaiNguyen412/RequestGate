<?php

namespace App\Repositories;

use App\Contracts\Repositories\RequestRepositoryInterface;
use App\Models\Request;

class RequestRepository extends BaseRepository implements RequestRepositoryInterface
{
    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

    public function index($filters)
    {
        return $this->model
            ->from('requests as r')
            ->join('users as u1', 'r.user_id', '=', 'u1.id')
            ->join('categories as c', 'r.category_id', '=', 'c.id')
            ->join('users as u2', 'c.user_id', '=', 'u2.id')
            ->select('r.id', 'r.title', 'r.description', 'u1.name as author', 'r.created_at', 'r.approval')
            ->addSelect('c.name as category', 'u2.name as assignee', 'r.status', 'r.due_date')
            ->filter($filters)
            ->orderBy('r.status', 'asc')
            ->orderBy('r.created_at', 'desc')
            ->paginate(config('pagination.request'));
    }

    public function getRequestById($id)
    {
        return $this->model
            ->from('requests as r')
            ->where('r.id', $id)
            ->join('users as u1', 'r.user_id', '=', 'u1.id')
            ->join('categories as c', 'r.category_id', '=', 'c.id')
            ->join('users as u2', 'c.user_id', '=', 'u2.id')
            ->select('u1.name as author', 'c.name as category', 'u2.name as assignee')
            ->addSelect('r.description', 'r.created_at', 'r.status', 'r.title', 'r.due_date', 'r.approval')
            ->first();
    }

    public function history()
    {
        return $this->model
            ->from('requests as r')
            ->join('users as u', 'user_id', '=', 'u.id')
            ->select('r.id', 'r.title', 'r.created_at', 'u.name')
            ->orderBy('r.status')
            ->orderBy('r.created_at', 'desc')
            ->paginate(config('pagination.requestHistory'));
    }

    public function getRequestsByUser($id)
    {
        return $this->model
            ->from('requests as r')
            ->where('r.user_id', $id)
            ->join('users as u1', 'r.user_id', '=', 'u1.id')
            ->join('categories as c', 'r.category_id', '=', 'c.id')
            ->join('users as u2', 'c.user_id', '=', 'u2.id')
            ->select('r.id', 'r.title', 'r.description', 'u1.name as author', 'r.created_at', 'r.approval')
            ->addSelect('c.name as category', 'u2.name as assignee', 'r.status', 'r.due_date')
            ->orderBy('r.status')
            ->orderBy('r.created_at')
            ->paginate(config('pagination.request'));
    }

    public function getRequestsByDept($dept_id)
    {
        return $this->model
            ->from('requests as r')
            ->join('users as u1', 'r.user_id', '=', 'u1.id')
            ->where('u1.department_id', $dept_id)
            ->join('categories as c', 'r.category_id', '=', 'c.id')
            ->join('users as u2', 'c.user_id', '=', 'u2.id')
            ->select('r.id', 'r.title', 'r.description', 'r.created_at', 'r.status', 'r.approval')
            ->addSelect('u1.name as author', 'c.name as category', 'u2.name as assignee')
            ->orderBy('r.status')
            ->orderBy('r.created_at')
            ->paginate(config('pagination.request'));
    }

    public function getRequestsByAssignee($assignee_id)
    {
        return $this->model
        ->from('requests as r')
        ->join('categories as c', 'c.id', '=', 'r.category_id')
        ->where('c.user_id', $assignee_id)
        ->join('users as u', 'r.user_id', '=', 'u.id')
        ->select('r.id', 'r.title', 'r.description', 'r.created_at', 'r.status', 'r.approval')
        ->addSelect('u.name as author', 'c.name as category', 'r.due_date')
        ->orderBy('r.status')
        ->orderBy('r.created_at')
        ->paginate(config('pagination.request'));
    }
}
