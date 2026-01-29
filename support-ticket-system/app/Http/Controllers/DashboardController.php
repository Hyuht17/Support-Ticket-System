<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Services\TicketService;

class DashboardController extends Controller
{
    protected $ticketService;
    public function __construct(TicketService $ticketService)
    {
        $this->ticketService = $ticketService;
    }
    public function index()
    {
        $data = $this->ticketService->countTickets();

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
}
