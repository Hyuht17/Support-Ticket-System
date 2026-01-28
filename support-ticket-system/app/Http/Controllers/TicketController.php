<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Ticket;
use App\Models\Category;
use App\Models\Label;
use App\Models\User;
use App\Services\TicketService;
use App\Http\Requests\CreateTicketRequest;
use App\Http\Requests\UpdateTicketRequest;

class TicketController extends Controller
{
    protected $ticketService;
    public function __construct(TicketService $ticketService){
        $this->ticketService = $ticketService;
    }

    public function index(Request $request){
        $user = auth()->user();
        $filters = $request->only(['status', 'priority', 'category_id']);
        $perPage = $request->input('per_page', 10);
        $results = $this->ticketService->getAllTickets($user, $filters, $perPage);
        return response()->json([
                'success' => true,
                'data' => $results,
        ]);
    }

    public function store(CreateTicketRequest $request){
        $data = $request->validated();
          
        $ticket = $this->ticketService->createTicket($data);

        return response()->json([
            'success' => true,
            'message' => 'Ticket created successfully',
            'data' => $ticket
        ], 201);
    }

    public function show($id){
        $ticket = $this->ticketService->getTicketById($id);
        $this->authorize('view', $ticket);
        return response()->json([
            'success' => true,
            'data' => [
                'ticket' => $ticket,
            ]
        ]);
    }

    public function update(UpdateTicketRequest $request, $id){

        $data = $request->validated();
        
        $ticket = $this->ticketService->getTicketById($id);
        $this->authorize('update', $ticket);

        $ticket = $this->ticketService->updateTicket($ticket, $data);

        return response()->json([
            'success' => true,
            'message' => 'Ticket updated successfully',
            'data' => $ticket
        ]);
    }

    public function destroy($id){

        $ticket = $this->ticketService->getTicketById($id);
        $this->authorize('delete', $ticket);

        $this->ticketService->deleteTicket($ticket);

        return response()->json([
            'success' => true,
            'message' => 'Ticket deleted successfully',
        ]);
    }
}
