<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\DepartmentServiceInterface;
use App\Http\Requests\Api\Departments\ShowRequest;
use App\Http\Requests\Api\Departments\StoreRequest;
use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;

class DepartmentController extends ApiController
{
    protected $departmentService;
    public function __construct(DepartmentServiceInterface $departmentService)
    {
        parent::__construct();
        $this->departmentService = $departmentService;
    }
    /**
     * @param Request $request
     * @param DepartmentServiceInterface $serviceService
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
        $params = $request->all();
        return $this->getData(function () use ($params) {
            return $this->departmentService->index($params);
        });
    }

    public function store(StoreRequest $request)
    {
        $this->authorize('create', Department::class);
        $data = $request->all();
        return $this->doRequest(function () use ($data) {
            return $this->departmentService->store($data);
        });
    }

    public function show(Department $department)
    {
        $id = $department->id;
        return $this->getData(function () use ($id) {
            return $this->departmentService->show($id);
        });
    }

    public function update(Department $department, Request $request)
    {
        $this->authorize('update', Department::class);
        return $this->doRequest(function () use ($department, $request) {
            return $this->departmentService->update($department, $request);
        });
    }

    public function destroy(Department $department)
    {
        $this->authorize('delete', Department::class);
        return $this->doRequest(function () use ($department) {
            return $this->departmentService->destroy($department);
        });
    }
}
