<?php

namespace App\Http\Requests\Api\Requests;

use App\Http\Requests\Api\ApiRequest;
use Illuminate\Validation\Rule;

class AdminUpdateRequest extends ApiRequest
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
            'status' => Rule::in(config('request.status')),
            'priority' => Rule::in(config('request.priority')),
            'category_id' => 'exists:categories,id',
        ];
    }

    public function attributes()
    {
        return [
            'status' => __('validation.attributes.status'),
            'priority' => __('validation.attributes.priority'),
            'category_id' => __('validation.attributes.category_id'),
        ];
    }
}
