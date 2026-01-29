<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LabelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('labels', 'name')->whereNull('deleted_at'),
            ],
        ];
    }

    public function message(){
        return [
            'name.required' => 'Label name is required',
            'name.string' => 'Label name must be a string',
            'name.max' => 'Label name must not exceed 255 characters',
            'name.unique' => 'This Label name has been taken',
        ];
    }
}
