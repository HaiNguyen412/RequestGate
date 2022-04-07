<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\LoginRequest;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        $token = null;
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['message' => __('notification.login_invalid')], 422);
            }
        } catch (JWTException $e) {
            return response()->json(['message' => __('notification.login_failed_token')], 500);
        }
        $user = auth()->user();
        if (!empty($request->remember_me)) {
            $token = auth()->setTTL(10080)->login($user);
        }
        return response()->json([
            'id' => $user->id,
            'role_id' => $user->role_id,
            'name' => $user->name,
            'email' => $user->email,
            'token' => $token,
        ]);
    }

    public function getUserInfo(Request $request)
    {
        $user = JWTAuth::toUser($request->token);
        $result = $user->toArray();
        $result['department'] = $user->departments ? $user->departments->name : '';
        unset($result['department_id']);
        return response()->json([
            'result' => $result
        ]);
    }

    public function logout(Request $request)
    {
        JWTAuth::invalidate($request->token);
        return response()->json([
            'status' => true,
            'message' => 'User logged out successfully'
        ]);
    }
}
