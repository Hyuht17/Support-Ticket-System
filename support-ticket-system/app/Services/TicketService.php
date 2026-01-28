<?php

namespace App\Services;

use App\Model\Ticket;
use App\Repositories\TicketRepository;
use Illuminate\Support\Arr;

class TicketService{

    protected $ticketRepository;
    protected $fileUploadService;
    protected $arr;

    public function __construct(TicketRepository $ticketRepository, FileUploadService $fileUploadService){
        $this->ticketRepository = $ticketRepository;
        $this->fileUploadService = $fileUploadService;
        $this->arr = new Arr();
    }


    public function createTicket($data){                
        
        $data['user_id'] = auth()->id();
        $ticketData = $this->arr->except($data, ['categories', 'labels', 'attachments']);

        if (isset($data['attachments']) && is_array($data['attachments'])) {
            $filesMetadata = $this->fileUploadService->uploadMultiple($data['attachments'], 'tickets');
            $ticketData['attachment'] = $filesMetadata;
        }

        $ticket = $this->ticketRepository->create($ticketData);


        if (!empty($data['categories'])) {
            $ticket->categories()->attach($data['categories']);
        }

        if (!empty($data['labels'])) {
            $ticket->labels()->attach($data['labels']);
        }
        return $ticket;
    }

    public function getTicketById($id){
        return $this->ticketRepository->findById($id);
    }

    public function updateTicket($ticket, $data){

        $ticketData = $this->arr->except($data, ['categories', 'labels', 'attachments', 'keep_attachments']);

        if (isset($data['attachments']) || isset($data['keep_attachments'])) {
            $existingFiles = [];
            
            if (isset($data['keep_attachments'])) {
                $keepFiles = is_string($data['keep_attachments']) 
                    ? json_decode($data['keep_attachments'], true) 
                    : $data['keep_attachments'];
                    
                if (is_array($keepFiles)) {
                    $existingFiles = $keepFiles;
                    $keepPaths = array_column($keepFiles, 'path');
                    
                    $oldAttachments = $ticket->attachment ?? [];
                    
                    foreach ($oldAttachments as $file) {
                        $filePath = is_array($file) ? ($file['path'] ?? '') : $file;
                        if ($filePath && !in_array($filePath, $keepPaths)) {
                            $this->fileUploadService->delete($filePath);
                        }
                    }
                }
            }
            
            if (isset($data['attachments']) && is_array($data['attachments'])) {
                $newFiles = $this->fileUploadService->uploadMultiple($data['attachments'], 'tickets');
                $existingFiles = array_merge($existingFiles, $newFiles);
            }
            
            $ticketData['attachment'] = !empty($existingFiles) ? $existingFiles : null;
        }

        $ticketNew = $this->ticketRepository->update($ticket, $ticketData);

        if (isset($data['categories'])){
            $ticketNew->categories()->sync($data['categories']);
        } else {
            $ticketNew->categories()->detach();
        }

        if (isset($data['labels'])){
            $ticketNew->labels()->sync($data['labels']);
        } else {
            $ticketNew->labels()->detach();
        }
                
        return $ticketNew;
    }

    public function deleteTicket($id){
        return $this->ticketRepository->delete($id);
    }

    public function getAllTickets($user, $filters, $perPage){
        if ($user->role_id === 1){
            return $this->ticketRepository->all($filters, $perPage);
        }
        return $this->ticketRepository->getTicketsByUserId($user->id, $filters, $perPage);
    }
}

