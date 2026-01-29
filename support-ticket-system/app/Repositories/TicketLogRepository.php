<?php

namespace App\Repositories;

use App\Models\TicketLog;
use Illuminate\Pagination\LengthAwarePaginator;

class TicketLogRepository{
    public function create($data){
        return TicketLog::create($data);
    }

    public function findbyTicketId($ticketId){
        return TicketLog::with('user:id,name')->where('ticket_id', $ticketId)->get();
    }

    public function all($filters, $perPage): LengthAwarePaginator{
        return TicketLog::query()
                    ->with('user:id,name')
                    ->filter($filters)
                    ->latest()
                    ->paginate($perPage);
    }
}
