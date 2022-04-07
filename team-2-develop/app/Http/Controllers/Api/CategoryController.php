<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\CategoryServiceInterface;
use App\Http\Requests\Api\Categories\UpdateRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends ApiController
{
    protected $categoryService;

    public function __construct(CategoryServiceInterface $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index(Request $request)
    {
        $params = $request->all();
        return $this->getData(function () use ($params) {
            return $this->categoryService->index($params);
        });
    }

    public function store(Request $request)
    {
        $this->authorize('create', Category::class);
        $params = $request->all();
        return $this->doRequest(function () use ($params) {
            return $this->categoryService->store($params);
        });
    }

    public function show(Request $request)
    {
        $params = $request->category;
        return $this->getData(function () use ($params) {
            return $this->categoryService->show($params);
        });
    }

    public function destroy(Category $category)
    {
        $this->authorize('delete', Category::class);
        return $this->doRequest(function () use ($category) {
            return $this->categoryService->destroy($category);
        });
    }

    public function update(Category $category, UpdateRequest $request)
    {
        $this->authorize('update', Category::class);
        return $this->doRequest(function () use ($category, $request) {
            return $this->categoryService->update($category, $request);
        });
    }

    public function getCategoryList()
    {
        return $this->getData(function () {
            return $this->categoryService->getCategoryList();
        });
    }
}
