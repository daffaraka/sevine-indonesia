<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Career extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'slug',
        'title',
        'division',
        'location',
        'employment_type',
        'qualifications_html',
        'responsibilities_html',
        'google_form_url',
        'is_active',
        'apply_clicks_count',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'is_active'          => 'boolean',
            'apply_clicks_count' => 'integer',
            'expires_at'         => 'date',
        ];
    }
}
