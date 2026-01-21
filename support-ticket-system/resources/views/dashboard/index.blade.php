@extends('layouts.app')

@section('content')
<div class="p-12">
    <!-- Header -->
    <div class="mb-12">
        <h1 class="text-4xl font-bold text-gray-900">Dashboard</h1>
    </div>

    <!-- Statistics Card -->
    <div class="inline-block">
        <div class="bg-white rounded-2xl shadow-sm p-8 min-w-[300px]">
            <div class="flex items-center gap-6">
                <div class="bg-orange-100 rounded-full p-5">
                    <svg class="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                    </svg>
                </div>
                <div>
                    <p class="text-gray-600 text-lg mb-2">Total tickets</p>
                    <p class="text-5xl font-bold text-gray-900">{{ $totalTickets }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
