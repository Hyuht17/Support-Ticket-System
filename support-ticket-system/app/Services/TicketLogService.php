<?php

namespace App\Services;

use App\Models\TicketLog;
use App\Repositories\TicketLogRepository;

class TicketLogService
{
    protected $ticketLogRepository;

    public function __construct(TicketLogRepository $ticketLogRepository){
        $this->ticketLogRepository = $ticketLogRepository;
    }

    public function createTicketLog($data){
        return $this->ticketLogRepository->create($data);
    }

    public function getLogsByTicketId($ticketId){
        return $this->ticketLogRepository->findbyTicketId($ticketId);
    }
}