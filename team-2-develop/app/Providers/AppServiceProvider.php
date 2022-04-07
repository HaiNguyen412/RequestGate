<?php

namespace App\Providers;

use App\Contracts\Services\Api\CategoryServiceInterface;
use App\Contracts\Services\Api\RequestServiceInterface;
use App\Contracts\Services\Api\UserServiceInterface;
use App\Services\Api\CategoryService;
use App\Services\Api\RequestService;
use App\Services\Api\UserService;
use App\Contracts\Services\Api\DepartmentServiceInterface;
use App\Services\Api\DepartmentService;
use App\Contracts\Services\Api\CommentServiceInterface;
use App\Services\Api\CommentService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $services = [
            [
                UserServiceInterface::class,
                UserService::class
            ],
            [
                CategoryServiceInterface::class,
                CategoryService::class
            ],
            [
                DepartmentServiceInterface::class,
                DepartmentService::class
            ],
            [
                RequestServiceInterface::class,
                RequestService::class
            ],
            [
                CommentServiceInterface::class,
                CommentService::class
            ]
        ];
        foreach ($services as $service) {
            $this->app->bind(
                $service[0],
                $service[1]
            );
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Collection::macro('paginate', function ($perPage, $total = null, $page = null, $pageName = 'page') {
            $page = $page ?: LengthAwarePaginator::resolveCurrentPage($pageName);

            return new LengthAwarePaginator(
                $this->forPage($page, $perPage)->values(),
                $total ?: $this->count(),
                $perPage,
                $page,
                [
                    'path' => LengthAwarePaginator::resolveCurrentPath(),
                    'pageName' => $pageName,
                ]
            );
        });
    }
}
