<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTicketRequest extends FormRequest
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
            'title' => 'string|max:255',
            'description' => 'string',
            'priority' => 'string|in:low,medium,high',
            'categories' => 'array',
            'categories.*' => 'exists:categories,id',
            'labels' => 'array',
            'labels.*' => 'exists:labels,id',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|mimes:jpg,jpeg,png,pdf,doc,docx|max:5120',
            'keep_attachments' => 'nullable|string',
            'status'=>'string|in:open,in_progress,closed',
            //
        ];
    }
}
