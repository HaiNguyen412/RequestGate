<?php

namespace App\Http\Requests\Api\Users;

use App\Http\Requests\Api\ApiRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends ApiRequest
{
    /**
     * Get custom rules for validator errors.
     *
     * @return array
     */

    public function authorize()
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'email|ends_with:hblab.vn',
            'password' => 'min:' . config('change_user.passwordLength'),
            'name' => 'max:' . config('change_user.nameLength'),
            'role_id' => Rule::in(config('roles')),
            'department_id' => 'exists:departments,id|integer',
            'status' => Rule::in(config('user.status')),
            'address' => 'max:255',
            'phone' => 'max:255',
            'gender' => Rule::in(config('user.gender')),
            'birthday' => 'date',
        ];
    }
    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'name.max' => __('user_notification.nameLength'),
            'email.ends_with' => __('user_notification.endWith'),
            'email.unique' => __('user_notification.email_unique'),
            'email.email' => __('user_notification.email'),
            'password.min' => __('user_notification.passwordLength'),
            'role_id.in' => __('user_notification.roleId_in'),
            'department_id.integer'=>__('user_notification.int'),
            'department_id.exists' => __('user_notification.exist'),
            'status.in' => __('user_notification.status_in'),
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes(): array
    {
        return [
            'email' => __('user_notification.email'),
            'password' => __('user_notification.pw'),
            'name' => __('user_notification.name')
        ];
    }
}
