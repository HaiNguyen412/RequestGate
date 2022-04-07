<?php

namespace App\Contracts\Services\Api;

use App\Models\Category;

interface CategoryServiceInterface
{
    public function index($params);
    public function store($params);
    public function show($params);
    public function update(Category $category, $request);
    public function destroy($category);
    public function getCategoryList();
}
