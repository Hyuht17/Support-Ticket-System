<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
    ];

    public function tickets(){
        return $this->belongsToMany(Ticket::class, 'ticket_category');
    }
}
