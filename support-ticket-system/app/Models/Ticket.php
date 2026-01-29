<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class Ticket extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
        'user_id',
        'attachment',
        'assigned_to_user_id'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function assignedTo(){
        return $this->belongsTo(User::class, 'assigned_to_user_id');
    }

    public function categories(){
        return $this->belongsToMany(Category::class, 'ticket_category');
    }

    public function labels(){
        return $this->belongsToMany(Label::class, 'ticket_label');
    }

    public function logs(){
        return $this->hasMany(TicketLog::class)->latest();
    }

    public function comments(){
        return $this->hasMany(Comment::class)->latest();
    }

    protected $appends = ['attachment_urls'];
    
    protected $casts = [
        'attachment' => 'array', 
    ];

    public function scopeWithAllDetails($query){
        return $query->with([
            'categories:id,name', 
            'labels:id,name', 
            'user:id,name',
            'assignedTo:id,name',
        ]);
    }

    public function scopeFilter($query, $filters){
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }

        if (!empty($filters['category_id'])) {
            $query->whereHas('categories', function ($q) use ($filters) {
                $q->where('categories.id', $filters['category_id']);
            });
        }

        return $query;
    }

    protected function attachmentUrls(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (empty($this->attachment)) {
                    return [];
                }
                
                return array_map(function($file) {
                    if (is_array($file) && isset($file['path'], $file['original_name'])) {
                        return [
                            'url' => Storage::disk('r2')->url($file['path']),
                            'name' => $file['original_name'],
                            'size' => $file['size'] ?? null,
                            'path' => $file['path']
                        ];
                    }
                }, $this->attachment);
            },
        );
    }
}
