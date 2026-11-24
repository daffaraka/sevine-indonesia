<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->string('key', 32)->unique(); // SEVINE, klou, LALUNA, ASSAIF, NABIRA
            $table->string('name');
            $table->enum('category', ['bag', 'apparel', 'muslim-wear'])->default('bag');
            $table->string('tagline');
            $table->text('description');
            $table->string('target_market');
            $table->json('highlight_points')->nullable();
            $table->string('badge_color', 64)->default('bg-doff-navy text-white');
            $table->string('logo_path')->nullable();
            $table->string('shopee_url');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });

        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name')->unique();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku', 64)->unique();
            $table->foreignId('brand_id')->constrained('brands')->restrictOnDelete();
            $table->foreignId('category_id')->constrained('product_categories')->restrictOnDelete();
            $table->string('name')->index();
            $table->string('capacity', 64)->default('-');
            $table->enum('status', ['Produksi Aktif', 'Review QC', 'Draft Sampling'])
                ->default('Produksi Aktif')
                ->index();
            $table->text('description')->nullable();
            $table->json('features')->nullable();
            $table->enum('shipping_origin', ['ngawi', 'jakarta', 'solo'])->default('ngawi');
            $table->boolean('is_b2b_ready')->default(true);
            $table->string('shopee_url')->nullable();
            $table->unsignedBigInteger('views_count')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('product_swatches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->string('name', 64);
            $table->char('hex_code', 7);
            $table->unsignedSmallInteger('sort_order')->default(0);
        });

        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->string('image_path');
            $table->string('alt_text')->nullable();
            $table->boolean('is_primary')->default(false);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_images');
        Schema::dropIfExists('product_swatches');
        Schema::dropIfExists('products');
        Schema::dropIfExists('product_categories');
        Schema::dropIfExists('brands');
    }
};
