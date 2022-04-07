<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class GoogleController extends Controller
{
    use AuthenticatesUsers;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function redirectToGoogle(Request $request)
    {
        $userinfo = $request->all();
        $email = $userinfo['profileObj']['email'] ?? null;
        if (strlen(strstr($email, '@hblab.vn')) > 0) {
            $user = User::where('email', $email)->first();
            if (empty($user)) {
                $user = new User;
                $user->email = $email;
                $user->name = $userinfo['profileObj']['name'] ?? null;
                $user->role_id = config('roles.staff');
                $user->password = Hash::make(config('user.password_default'));
                $user->status = config('user.status.active');
                $user->email_verified_at = Carbon::now();
                $user->save();
            }
            $token = auth()->login($user);
            if (!empty($request->remember_me)) {
                $token = auth()->setTTL(10080)->login($user);
            }
            return [
                'id' => $user->id,
                'role_id' => $user->role_id,
                'name' => $user->name,
                'email' => $user->email,
                'token' => $token,
            ];
        } else {
            return response()->json(__('notification.google_member'), 401);
        }
    }
}
