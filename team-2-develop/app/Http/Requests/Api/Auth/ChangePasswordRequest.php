<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\Api\ApiRequest;

class ChangePasswordRequest extends ApiRequest
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
    public function rules()
    {
        return [
            'password_new' => ['required', 'min:' . config('change_user.passwordLength')],
            'confirm_password' => ['required', 'same:password_new']
        ];
    }

    public function messages()
    {
        return [
            'password_new.min' => __('user_notification.passwordLength'),
            'password_new.required' =>  __('user_notification.pw_required'),
            'confirm_password.same' =>  __('user_notification.password_same'),
            'confirm_password.required' =>  __('user_notification.pw_required'),
        ];
    }
}
