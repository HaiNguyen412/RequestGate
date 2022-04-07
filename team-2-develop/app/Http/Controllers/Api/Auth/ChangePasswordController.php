<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\Api\Auth\ChangePasswordRequest;
use Illuminate\Support\Facades\Hash;

class ChangePasswordController extends Controller
{
    public function changePassword(User $user, ChangePasswordRequest $request)
    {
        $pass = $request->password;
        $password = Auth::user()->password;
        $user = Auth::user();
        if (Hash::check($pass, $password)) {
            $user->password = Hash::make($request->password_new);
            $user->save();
            return __('user_notification.change_password_successfully');
        } else {
            return __('user_notification.wrong_password');
        }
    }
}
