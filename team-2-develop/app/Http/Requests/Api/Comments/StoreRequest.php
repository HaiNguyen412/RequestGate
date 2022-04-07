<?php

namespace App\Http\Requests\Api\Comments;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\Api\ApiRequest;

class StoreRequest extends ApiRequest
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
            'content' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'content.required' => __('notification.content.required')
        ];
    }
}