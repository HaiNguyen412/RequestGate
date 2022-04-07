<?php

namespace App\Contracts\Services\Api;

use App\Models\Department;

interface DepartmentServiceInterface
{
    public function index($params);
    public function store($data);
    public function show(Department $department);
    public function update(Department $department, $request);
    public function destroy($department);
}
