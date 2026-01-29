<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\SoftDeletes;
class Label extends Model
{
    use softDeletes;
    
    protected $fillable = [
        'name',
    ];

    public function tickets(){
        return $this->belongsToMany(Ticket::class, 'ticket_label');
    }
}
