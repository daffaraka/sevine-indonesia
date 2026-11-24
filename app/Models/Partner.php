<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Partner extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'category',
        'category_label',
        'logo_path',
        'role_scope',
        'status',
        'sort_order',
    ];
}
