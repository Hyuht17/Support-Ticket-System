<?php

namespace App\Http\Controllers;

use App\Services\CommentService;
use App\Services\TicketService;
use App\Http\Requests\CommentRequest;

class CommentController extends Controller
{

    protected $commentService;
    protected $ticketService;

    public function __construct(CommentService $commentService, TicketService $ticketService){
        $this->commentService = $commentService;
        $this->ticketService = $ticketService;
    }

    public function index($ticketId){
        $ticket = $this->ticketService->getTicketById($ticketId);
        $this->authorize('view', $ticket);
         
        $data = $this->commentService->getCommentsByTicketId($ticketId);
        
        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function store(CommentRequest $request, $ticketId){

        $ticket = $this->ticketService->getTicketById($ticketId);
        $this->authorize('view', $ticket);

        $data = $request->validated();
        $data['ticket_id'] = $ticketId;
        $data['user_id'] = auth()->id();

        $comment = $this->commentService->addComment($data);

        return response()->json([
            'success' => true,
            'message' => 'Comment added successfully',
            'data' => $comment->load('user:id,name'),
        ], 201);
    }

    public function update(CommentRequest $request, $ticketId, $commentId){

        $ticket = $this->ticketService->getTicketById($ticketId);
        $this->authorize('view', $ticket);

        $comment = $this->commentService->getCommentById($commentId);
        $this->authorize('update', $comment);

        $data = $request->validated();

        $updatedComment = $this->commentService->updateComment($comment, $data);

        return response()->json([
            'success' => true,
            'message' => 'Comment updated successfully',
            'data' => $updatedComment->load('user:id,name'),
        ]);
    }

    public function destroy($ticketId, $commentId){

        $ticket = $this->ticketService->getTicketById($ticketId);
        $this->authorize('view', $ticket);

        $comment = $this->commentService->getCommentById($commentId);
        $this->authorize('delete', $comment);

        $this->commentService->deleteComment($commentId);

        return response()->json([
            'success' => true,
            'message' => 'Comment deleted successfully',
        ]);
    }
}
