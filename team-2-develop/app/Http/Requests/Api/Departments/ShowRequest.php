<?php

namespace App\Http\Requests\Api\Departments;

use App\Http\Requests\Api\ApiRequest;

class ShowRequest extends ApiRequest
{
    public function prepareForValidation()
    {
        $this->merge([
            'id' => $this->route('id'),
        ]);
    }
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
            'id' => 'required|exists:departments'
        ];
    }

    public function messages()
    {
        return [
            'id.exists' => __('notification.exists')
        ];
    }
}
