<?php

namespace App\Repositories;

use App\Models\TicketLog;

class TicketLogRepository{
    public function create($data){
        return TicketLog::create($data);
    }

    public function findbyTicketId($ticketId){
        return TicketLog::with('user:id,name')->where('ticket_id', $ticketId)->get();
    }
}
