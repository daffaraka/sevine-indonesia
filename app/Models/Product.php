<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'sku',
        'brand_id',
        'category_id',
        'name',
        'capacity',
        'price',
        'status',
        'description',
        'features',
        'shipping_origin',
        'is_b2b_ready',
        'shopee_url',
        'views_count',
    ];

    protected function casts(): array
    {
        return [
            'price'        => 'integer',
            'features'     => 'array',
            'is_b2b_ready' => 'boolean',
            'views_count'  => 'integer',
        ];
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    public function swatches(): HasMany
    {
        return $this->hasMany(ProductSwatch::class)->orderBy('sort_order');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }
}
