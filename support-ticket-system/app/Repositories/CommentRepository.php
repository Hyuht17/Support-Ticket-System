<?php

namespace App\Repositories;

use App\Models\Comment;
class CommentRepository{

    public function create($data){
        return Comment::create($data);
    }

    public function findById($commentId){
        return Comment::find($commentId);
    }

    public function findByTicketId($ticketId){
        return Comment::with('user:id,name')->where('ticket_id', $ticketId)->get();
    }

    public function update($comment, $data){
        $comment->update($data);
        return $comment;
    }

    public function delete($commentId){
        return Comment::destroy($commentId);
    }
}