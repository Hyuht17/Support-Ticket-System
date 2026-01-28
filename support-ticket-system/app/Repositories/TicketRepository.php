<?php

namespace App\Repositories;

use App\Models\Ticket;
use Illuminate\Pagination\LengthAwarePaginator;

class TicketRepository{
    public function create($data): Ticket{
        return Ticket::create($data);
    }

    public function findById($id): ?Ticket{
        return Ticket::withAllDetails()->findOrFail($id);
    }

    public function all($filters, $perPage): LengthAwarePaginator{
        return Ticket::withAllDetails()
                    ->filter($filters)
                    ->latest()
                    ->paginate($perPage);
    }

    public function update(Ticket $ticket, $data): Ticket{
        $ticket->update($data);
        return $ticket;
    }

    public function delete(Ticket $ticket): void{
        $ticket->delete();
    }

    public function getTicketsByUserId($userId, $filters, $perPage): LengthAwarePaginator{
        
        $query = Ticket::query()
                     ->withAllDetails()
                     ->where('user_id', $userId)
                     ->orWhere('assigned_to_user_id', $userId)
                     ->filter($filters)
                     ->latest()
                     ->paginate($perPage);

        return $query;
    }
}

