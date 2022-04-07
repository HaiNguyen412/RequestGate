<?php

namespace App\Http\Requests\Api\Users;

use App\Http\Requests\Api\ApiRequest;
use Illuminate\Validation\Rule;

class CreateRequest extends ApiRequest
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
            'email' => 'unique:users|required|email|ends_with:hblab.vn',
            'password' => 'required|min:' . config('change_user.passwordLength'),
            'name' => 'required|max:' . config('change_user.nameLength'),
            'role_id' => 'required|' . Rule::in(config('roles')),
            'department_id' => 'exists:departments,id|nullable',
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
            'name.required' => __('user_notification.name_required'),
            'email.required' => __('user_notification.email_required'),
            'email.ends_with' => __('user_notification.endWith'),
            'email.unique' => __('user_notification.email_unique'),
            'email.email' => __('user_notification.email'),
            'password.required' => __('user_notification.pw_required'),
            'password.min' => __('user_notification.passwordLength'),
            'role_id.required' => __('user_notification.roleId'),
            'role_id.in' => __('user_notification.roleId_in'),
            'department_id.required' => __('user_notification.departmentID'),
            'department_id.integer' => __('user_notification.int'),
            'department_id.exists' => __('user_notification.exist'),
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
            'name' => __('user_notification.name'),
        ];
    }
}
