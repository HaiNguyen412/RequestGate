<?php

namespace App\Repositories;

use App\Contracts\Repositories\DepartmentRepositoryInterface;
use App\Models\Department;

class DepartmentRepository extends BaseRepository implements DepartmentRepositoryInterface
{

    public function __construct(Department $department)
    {
        parent::__construct($department);
    }

    public function index($params)
    {
        return $this->model
        ->where('departments.name', 'like', '%' . $params . '%');
    }
}
