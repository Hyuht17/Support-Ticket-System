<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TicketLogService;
use App\Services\TicketService;

class TicketLogController extends Controller
{
    protected $ticketLogService;
    protected $ticketService;

    public function __construct(TicketLogService $ticketLogService, TicketService $ticketService){
        $this->ticketLogService = $ticketLogService;
        $this->ticketService = $ticketService;
    }

    public function index($id){
        $ticket = $this->ticketService->getTicketById($id);
        $this->authorize('view', $ticket);
        return response()->json([
            'success' => true,
            'data' => $this->ticketLogService->getLogsByTicketId($id),
        ]);
    }
}
