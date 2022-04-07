<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function create(User $user)
    {
        return $user->role_id == config('roles.admin');
    }

    public function update(User $user, $currentUser)
    {
        return $user->role_id == config('roles.admin') || $currentUser->id == Auth::user()->id;
    }

    public function delete(User $user)
    {
        return $user->role_id == config('roles.admin');
    }
}
