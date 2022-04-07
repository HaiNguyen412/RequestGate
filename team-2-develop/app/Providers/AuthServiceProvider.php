<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\Request;
use App\Policies\RequestPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Department;
use App\Models\User;
use App\Policies\CategoryPolicy;
use App\Policies\DepartmentPolicy;
use App\Policies\UserPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
        Department::class => DepartmentPolicy::class,
        User::class => UserPolicy::class,
        Category::class => CategoryPolicy::class,
        Request::class => RequestPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
