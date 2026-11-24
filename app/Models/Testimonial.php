<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'author',
        'review_date_label',
        'rating',
        'content',
        'highlight_aspect',
        'screenshot_image',
        'buyer_photos',
        'platform',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'buyer_photos' => 'array',
            'rating'       => 'integer',
            'is_active'    => 'boolean',
        ];
    }
}
