<?php

namespace App\Http\Requests\Api\Auth;

use App\Http\Requests\Api\ApiRequest;

class LoginRequest extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:users',
            'password' => 'required|min: '.config('login.passwordLength'),
        ];
    }
    public function messages(): array
    {
        return [
            'email.required' => __('notification.email_required'),
            'email.email' => __('notification.email_format'),
            'email.exists' => __('notification.email_exists'),
            'password.required' => __('notification.pw_require'),
            'password.min' => __('notification.passwordLength'),
        ];
    }
}
