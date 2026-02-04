<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class TicketLog extends Model
{
    protected $fillable = [
        'ticket_id',
        'user_id',
        'action',
        'changed_fields',
    ];

    protected $casts = [
        'changed_fields' => 'array',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function ticket(){
        return $this->belongsTo(Ticket::class);
    }

    public function scopeFilter($query, $filters){
        if (isset($filters['ticket_id'])) {
            $query->where('ticket_id', $filters['ticket_id']);
        }
        if (isset($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }
        if (isset($filters['action'])) {
            $query->where('action', $filters['action']);
        }
        if (isset($filters['date_from'])) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }
        if (isset($filters['date_to'])) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }
        return $query;
    }

}
