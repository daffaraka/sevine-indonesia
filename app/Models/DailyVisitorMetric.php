<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyVisitorMetric extends Model
{
    protected $fillable = [
        'metric_date',
        'unique_visitors',
        'page_views',
        'catalog_views',
        'whatsapp_b2b_clicks',
        'shopee_store_clicks',
        'career_form_clicks',
        'brand_views_breakdown',
        'device_breakdown',
        'referrer_breakdown',
    ];

    protected function casts(): array
    {
        return [
            'metric_date'           => 'date',
            'unique_visitors'       => 'integer',
            'page_views'            => 'integer',
            'catalog_views'         => 'integer',
            'whatsapp_b2b_clicks'   => 'integer',
            'shopee_store_clicks'   => 'integer',
            'career_form_clicks'    => 'integer',
            'brand_views_breakdown' => 'array',
            'device_breakdown'      => 'array',
            'referrer_breakdown'    => 'array',
        ];
    }
}
