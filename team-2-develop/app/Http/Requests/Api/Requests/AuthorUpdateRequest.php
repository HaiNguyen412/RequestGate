<?php

namespace App\Http\Requests\Api\Requests;

use App\Http\Requests\Api\ApiRequest;

class AuthorUpdateRequest extends ApiRequest
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
            'title' => 'max:255',
            'description' => 'max:255',
            'category_id' => 'exists:categories,id',
            'due_date' => 'date',
        ];
    }

    public function attributes()
    {
        return [
            'title' => __('validation.attributes.title'),
            'description' => __('validation.attributes.description'),
            'category_id' => __('validation.attributes.category_id'),
            'due_date' => __('validation.attributes.due_date'),
        ];
    }
}
