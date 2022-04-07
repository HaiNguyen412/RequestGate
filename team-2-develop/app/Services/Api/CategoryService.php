<?php

namespace App\Services\Api;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Contracts\Services\Api\CategoryServiceInterface;
use App\Models\Category;
use App\Services\AbstractService;
use Illuminate\Support\Facades\Cache;

class CategoryService extends AbstractService implements CategoryServiceInterface
{
    /**
     * @var CategoryRepositoryInterface
     */
    protected $categoryRepository;

    /**
     * CategoryService constructor.
     * @param CategoryRepositoryInterface $categoryRepository
     */
    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * @param $params
     * @return array
     */

    public function index($params)
    {
        return $this->categoryRepository->index($params);
    }

    public function store($data)
    {
        $this->categoryRepository->store($data);
        return ['message' => __('notification.create_successfully')];
    }

    public function show($params)
    {
        return $this->categoryRepository->find($params);
    }

    public function destroy($category)
    {
        return [
            'message' => $this->categoryRepository
                ->destroy($category) ?
                __('notification.delete_succesed') :
                __('notification.delete_failed')
        ];
    }

    public function update(Category $category, $request)
    {
        $data = $request->all();
        return [
            'message' => $this->categoryRepository
                ->update($category, $data) ?
                __('notification.update_successfully') :
                __('notification.update_failed')
        ];
    }

    public function getCategoryList()
    {
        return $this->categoryRepository->getCategoryList()->get();
    }
}
