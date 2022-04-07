<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use App\Models\User;

class VerificationController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Email Verification Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling email verification for any
    | user that recently registered with the application. Emails may also
    | be re-sent if the user didn't receive the original email message.
    |
    */

    public function __construct()
    {
        $this->middleware('throttle:6,1');
    }

    public function verify(Request $request)
    {
        $user = User::find($request->route('id'));

        if (! hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => __('notification.verify_failed')], 500);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => __('notification.verified_email')], 422);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return [
            'message' => __('notification.verify_success')
        ];
    }

    public function resend(Request $request)
    {
        if (auth()->user()->hasVerifiedEmail()) {
            return response()->json(['message' => __('notification.verified_email')], 422);
        }

        auth()->user()->sendEmailVerificationNotification();

        return [
            'message' => __('notification.send_verify_mail')
        ];
    }
}
