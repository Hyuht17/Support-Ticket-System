@extends('layouts.app')

@section('content')
<div class="p-12 max-w-4xl">
    <!-- Header -->
    <div class="mb-8 flex items-center gap-4">
        <a href="{{ route('tickets') }}" class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="font-medium">Back</span>
        </a>
    </div>

    <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900">Create ticket</h1>
    </div>

    <!-- Form -->
    <form action="{{ route('tickets.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
        @csrf

        <!-- Title -->
        <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Title</label>
            <input 
                type="text" 
                name="title" 
                value="{{ old('title') }}"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
            >
            @error('title')
                <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Message -->
        <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Message</label>
            <textarea 
                name="description" 
                rows="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                required
            >{{ old('description') }}</textarea>
            @error('description')
                <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Labels -->
        @if(isset($labels) && $labels->count() > 0)
        <div>
            <label class="block text-gray-700 text-sm font-medium mb-3">Labels</label>
            <div class="flex flex-wrap gap-4">
                @foreach($labels as $label)
                <label class="inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        name="labels[]" 
                        value="{{ $label->id }}"
                        class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    >
                    <span class="ml-2 text-gray-700">{{ $label->name }}</span>
                </label>
                @endforeach
            </div>
        </div>
        @endif

        <!-- Categories -->
        <div>
            <label class="block text-gray-700 text-sm font-medium mb-3">Categories</label>
            <div class="flex flex-wrap gap-4">
                @foreach($categories as $category)
                <label class="inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        name="categories[]" 
                        value="{{ $category->id }}"
                        class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    >
                    <span class="ml-2 text-gray-700">{{ $category->name }}</span>
                </label>
                @endforeach
            </div>
        </div>

        <!-- Priority -->
        <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Priority</label>
            <input 
                type="text" 
                name="priority" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none uppercase"
                placeholder="HIGH"
                list="priority-options"
                required
            >
            <datalist id="priority-options">
                <option value="LOW"></option>
                <option value="MEDIUM"></option>
                <option value="HIGH"></option>
            </datalist>
            @error('priority')
                <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Assignee -->
        <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Assignee</label>
            <div class="flex gap-3">
                <select 
                    name="user_id" 
                    id="assignee-select"
                    class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                >
                    <option value="">Select assignee</option>
                    @foreach($users as $user)
                    <option value="{{ $user->id }}">{{ $user->name }}</option>
                    @endforeach
                </select>
                <button 
                    type="button" 
                    onclick="assignToMe()"
                    class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors whitespace-nowrap"
                >
                    Assign to me
                </button>
            </div>
            @error('user_id')
                <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
            @enderror
        </div>

        <script>
        function assignToMe() {
            // TODO
            const currentUserId = '1'; 
            document.getElementById('assignee-select').value = currentUserId;
        }
        </script>

        <!-- File Upload -->
        <div>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <input type="file" name="attachments[]" multiple class="hidden" id="file-upload">
                <label for="file-upload" class="cursor-pointer">
                    <svg class="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p class="text-gray-600">Drag & Drop your files or <span class="text-blue-600 font-medium">Browse</span></p>
                </label>
            </div>
        </div>

        <!-- Submit Button -->
        <div>
            <button 
                type="submit" 
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-sm"
            >
                Submit
            </button>
        </div>

        @if(session('success'))
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {{ session('success') }}
            </div>
        @endif

        @if($errors->any())
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <ul class="list-disc list-inside">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
    </form>
</div>
@endsection
