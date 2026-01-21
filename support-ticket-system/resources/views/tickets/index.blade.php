@extends('layouts.app')

@section('content')
<div class="p-12">
    <!-- Header -->
    <div class="mb-8 flex justify-between items-center">
        <h1 class="text-4xl font-bold text-gray-900">Tickets</h1>
        <a href="{{ route('tickets.create') }}" class="hover:bg-gray-200 font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm">
            + Create Ticket
        </a>
    </div>

    @if(session('success'))
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {{ session('success') }}
        </div>
    @endif

    <!-- Tickets Table -->
    @if($tickets->count() > 0)
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Labels
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categories
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @foreach($tickets as $ticket)
                <tr class="hover:bg-gray-50">
                    <td class="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{{ $ticket->id }}
                    </td>
                    <td class="px-2 py-4 text-sm text-gray-900">
                        <div class="font-medium">{{ $ticket->title }}</div>
                    </td>
                    <td class="px-2 py-4 whitespace-nowrap text-sm text-gray-700">
                        {{ $ticket->user->name }}
                    </td>
                    <td class="px-2 py-4 whitespace-nowrap">
                        @php
                            $statusColors = [
                                'open' => 'bg-green-100 text-green-800',
                                'in_progress' => 'bg-yellow-100 text-yellow-800',
                                'closed' => 'bg-gray-100 text-gray-800'
                            ];
                            $statusLabels = [
                                'open' => 'Open',
                                'in_progress' => 'In Progress',
                                'closed' => 'Closed'
                            ];
                        @endphp
                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full {{ $statusColors[$ticket->status] ?? 'bg-gray-100 text-gray-800' }}">
                            {{ $statusLabels[$ticket->status] ?? ucfirst($ticket->status) }}
                        </span>
                    </td>
                    <td class="px-2 py-4 whitespace-nowrap">
                        @php
                            $priorityColors = [
                                'low' => 'bg-blue-100 text-blue-800',
                                'medium' => 'bg-orange-100 text-orange-800',
                                'high' => 'bg-red-100 text-red-800'
                            ];
                        @endphp
                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full {{ $priorityColors[$ticket->priority] ?? 'bg-gray-100 text-gray-800' }}">
                            {{ strtoupper($ticket->priority) }}
                        </span>
                    </td>
                    <td class="py-4 whitespace-nowrap text-sm text-gray-700">
                        @if($ticket->labels->count() > 0)
                            <div class="flex flex-wrap gap-1">
                                @foreach($ticket->labels as $label)
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                        {{ $label->name }}
                                    </span>
                                @endforeach
                            </div>
                        @else
                            <span class="text-gray-400 italic text-xs">No Label</span>
                        @endif
                    </td>
                    <td class="py-4 whitespace-nowrap text-sm text-gray-700">
                        @if($ticket->categories->count() > 0)
                            <div class="flex flex-wrap gap-1">
                                @foreach($ticket->categories as $category)
                                    <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                        {{ $category->name }}
                                    </span>
                                @endforeach
                            </div>
                        @else
                            <span class="text-gray-400 italic text-xs">No Category</span>
                        @endif
                    </td>
                    <td class="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ \Carbon\Carbon::parse($ticket->created_at)->format('M d, Y') }}
                    </td>
                    <td class="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a href="{{ route('tickets.detail', $ticket->id) }}" class="text-blue-600 hover:text-blue-900 font-medium">View</a>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @else
    <div class="bg-white rounded-lg shadow-sm p-12 text-center">
        <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
        </svg>
        <h3 class="text-xl font-medium text-gray-900 mb-2">No tickets yet</h3>
        <p class="text-gray-500 mb-6">Get started by creating your first ticket.</p>
        <a href="{{ route('tickets.create') }}" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Create Ticket
        </a>
    </div>
    @endif
</div>
@endsection
