<?php

namespace App\Observers;

use App\Models\Ticket;
use App\Services\TicketLogService;
use Illuminate\Support\Arr;

class TicketObserver
{
    protected $ticketLogService;
    protected $arr;

    public function __construct(TicketLogService $ticketLogService){
        $this->ticketLogService = $ticketLogService;
        $this->arr = new Arr();
    }
    /**
     * Handle the Ticket "created" event.
     */
    public function created(Ticket $ticket): void
    {
        $data = [
            'ticket_id' => $ticket->id,
            'user_id' => auth()->id(),
            'action' => 'created',
            'changed_fields' => null,
        ];
        $this->ticketLogService->createTicketLog($data);
    }

    /**
     * Handle the Ticket "updated" event.
     */
    public function updated(Ticket $ticket): void
    {
        $changedFields = $ticket->getDirty();
        
        $changedFields = $this->arr->except($changedFields, ['updated_at']);

        if (count($changedFields) > 0) {
            $data = [
                'ticket_id' => $ticket->id,
                'user_id' => auth()->id(),
                'action' => 'updated',
                'changed_fields' => $changedFields,
            ];

            $this->ticketLogService->createTicketLog($data);
        }
    }

    /**
     * Handle the Ticket "deleted" event.
     */
    public function deleted(Ticket $ticket): void
    {
        $data = [
            'ticket_id' => $ticket->id,
            'user_id' => auth()->id(),
            'action' => 'deleted',
            'changed_fields' => null,
        ];
        $this->ticketLogService->createTicketLog($data);
    }

    /**
     * Handle the Ticket "restored" event.
     */
    public function restored(Ticket $ticket): void
    {
        //
    }

    /**
     * Handle the Ticket "force deleted" event.
     */
    public function forceDeleted(Ticket $ticket): void
    {
        //
    }
}
