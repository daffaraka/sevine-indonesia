<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisitorSession extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'visitor_hash',
        'current_path',
        'device_type',
        'referrer_source',
        'visited_date',
        'last_seen_at',
    ];

    protected function casts(): array
    {
        return [
            'visited_date' => 'date',
            'last_seen_at' => 'datetime',
        ];
    }
}
