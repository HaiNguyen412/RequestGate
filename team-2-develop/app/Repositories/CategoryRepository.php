<?php

namespace App\Repositories;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Models\Category;

class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface
{
    public function __construct(Category $category)
    {
        parent::__construct($category);
    }

    public function index($params)
    {
        $results = $this->model
            ->when(isset($params['params']), function ($query) use ($params) {
                return $query->where('categories.name', 'like', '%' . $params['params'] . '%');
            })
            ->join('users', 'users.id', '=', 'categories.user_id')
            ->join('departments', 'users.department_id', '=', 'departments.id')
            ->select(
                'categories.id AS id',
                'users.id AS role_id',
                'categories.name AS name',
                'categories.status AS status',
                'users.email AS email',
                'departments.name AS department'
            )
            ->paginate(config('pagination.category'));
        if (isset($params['params'])) {
            $results->appends(['params' => $params['params']]);
        }
        return $results;
    }

    public function getCategoryList()
    {
        return $this->model
        ->join('users', 'users.id', '=', 'categories.user_id')
        ->join('departments', 'users.department_id', '=', 'departments.id')
        ->select(
            'categories.id AS id',
            'users.id AS role_id',
            'categories.name AS name',
            'categories.status AS status',
            'users.email AS email',
            'departments.name AS department'
        );
    }
}
