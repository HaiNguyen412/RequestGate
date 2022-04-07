<?php

namespace App\Providers;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Contracts\Repositories\RequestRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use App\Repositories\CategoryRepository;
use App\Repositories\RequestRepository;
use App\Repositories\UserRepository;
use App\Contracts\Repositories\DepartmentRepositoryInterface;
use App\Repositories\DepartmentRepository;
use App\Contracts\Repositories\CommentRepositoryInterface;
use App\Repositories\CommentRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    protected static $repositories = [
        'user' => [
            UserRepositoryInterface::class,
            UserRepository::class,
        ],

        'department' => [
            DepartmentRepositoryInterface::class,
            DepartmentRepository::class,
        ],

        'category' => [
            CategoryRepositoryInterface::class,
            CategoryRepository::class,
        ],

        'request' => [
            RequestRepositoryInterface::class,
            RequestRepository::class,
        ],
        'comment' => [
            CommentRepositoryInterface::class,
            CommentRepository::class,
        ],
    ];

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        foreach (static::$repositories as $repository) {
            $this->app->singleton(
                $repository[0],
                $repository[1]
            );
        }
    }
}