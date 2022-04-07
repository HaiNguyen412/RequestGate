<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\ForgotPasswordRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function sendResetLinkEmail(ForgotPasswordRequest $request)
    {
        $response = $this->broker()->sendResetLink(
            $this->credentials($request)
        );
        return $response == Password::RESET_LINK_SENT
            ? $this->sendResetLinkResponse($request, $response)
            : $this->sendResetLinkFailedResponse($request, $response);
    }

    protected function sendResetLinkResponse(Request $request, $response)
    {
        return [
            'message' => __('notification.send_reset_link_success'),
        ];
    }

    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return [
            'message' => __('notification.send_reset_link_failed'),
            'email' => $request->only('email'),
            'error' => __($response),
        ];
    }

    protected function credentials(Request $request)
    {
        return $request->only('email');
    }

    public function broker()
    {
        return Password::broker();
    }
}
