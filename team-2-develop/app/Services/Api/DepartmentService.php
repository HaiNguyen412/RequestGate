<?php

namespace App\Services\Api;

use App\Contracts\Repositories\DepartmentRepositoryInterface;
use App\Contracts\Services\Api\DepartmentServiceInterface;
use App\Models\Department;
use App\Services\AbstractService;
use App\Events\DepartmentCreated;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Event;

class DepartmentService extends AbstractService implements DepartmentServiceInterface
{
    /**
     * @var DepartmentRepositoryInterface
     */
    protected $departmentRepository;
    /**
     * DepartmentService constructor.
     * @param DepartmentRepositoryInterface $DepartmentRepository
     */
    public function __construct(DepartmentRepositoryInterface $departmentRepository)
    {
        $this->departmentRepository = $departmentRepository;
    }

    /**
     * @param $params
     * @return array
     */

    public function index($params)
    {
        if (!empty($params['params'])) {
            return $this->departmentRepository->index($params['params']);
        } else {
            return $this->departmentRepository->getColumns()->get();
        }
    }

    public function store($data)
    {
        $this->departmentRepository->store($data);
        return ['message' => __('notification.create_successfully')];
    }

    public function show($id)
    {
        return $this->departmentRepository->find($id);
    }

    public function update(Department $department, $request)
    {
        $data = $request->all();
        return [
            'message' => $this->departmentRepository
            ->update($department, $data) ?
            __('notification.update_successfully') :
            __('notification.update_failed')
        ];
    }

    public function destroy($department)
    {
        return $this->departmentRepository->destroy($department);
    }
}
