<?php

namespace App\Services;
use App\Repositories\CommentRepository;

class CommentService{
    protected $commentRepository;

    public function __construct(CommentRepository $commentRepository){
        $this->commentRepository = $commentRepository;
    }

    public function addComment($data){
        return $this->commentRepository->create($data);
    }

    public function getCommentsByTicketId($ticketId){
        return $this->commentRepository->findByTicketId($ticketId);
    }

    public function updateComment($comment, $data){
        return $this->commentRepository->update($comment, $data);
    }

    public function deleteComment($commentId){
        return $this->commentRepository->delete($commentId);
    }

    public function getCommentById($commentId){
        return $this->commentRepository->findById($commentId);
    }
}