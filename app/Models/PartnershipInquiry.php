<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PartnershipInquiry extends Model
{
    protected $fillable = [
        'full_name',
        'company_or_store_name',
        'whatsapp_number',
        'partnership_type',
        'preferred_brand',
        'message_notes',
        'status',
    ];
}
