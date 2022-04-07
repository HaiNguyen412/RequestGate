<?php

namespace App\Repositories;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    /**
     * UserRepository constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        parent::__construct($user);
    }

    public function index($request)
    {
        $results = $this->model
            ->when($request->has('params'), function ($query) use ($request) {
                return $query->where('users.name', 'like', '%' . $request->params . '%');
            })
            ->leftJoin('departments', 'users.department_id', '=', 'departments.id')
            ->select(
                'users.id AS user_id',
                'users.name AS name',
                'users.email AS email',
                'users.role_id AS role',
                'users.status AS status',
                'departments.name AS department'
            )->paginate(config('pagination.user'));
        if ($request->has('params')) {
            $results->appends(['params' => $request->params]);
        }
        return $results;
    }

    public function store($data)
    {
        $data['password'] = Hash::make($data['password']);
        return $this->model->create($data);
    }

    public function getListAssignee()
    {
        return $this->model
            ->where('users.role_id', config('roles.admin'))
            ->join('departments', 'users.department_id', '=', 'departments.id')
            ->select(
                'users.id AS user_id',
                'users.name AS name',
                'users.email AS email',
                'departments.name AS department'
            )->get();
    }

    public function getListUser()
    {
        return $this->model
            ->join('departments', 'users.department_id', '=', 'departments.id')
            ->select(
                'users.id AS user_id',
                'users.name AS name',
                'users.email AS email',
                'users.role_id AS role',
                'users.status AS status',
                'departments.name AS department',
                'departments.id AS department_id'
            )->paginate(config('pagination.category'));
    }

    public function getUsersForRequestNotification($user_id, $assignee_id)
    {
        return $this->model
            ->whereIn('id', [$user_id, $assignee_id])
            ->get();
    }

    public function getAssigneeByCategory($category_id)
    {
        return $this->model
            ->whereHas('categories', function ($query) use ($category_id) {
                $query->where('id', $category_id);
            })->first();
    }
}
