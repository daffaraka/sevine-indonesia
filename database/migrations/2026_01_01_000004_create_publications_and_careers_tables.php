<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('division');
            $table->enum('location', ['Ngawi', 'Malang', 'Remote'])->default('Ngawi')->index();
            $table->enum('employment_type', ['Full-time', 'Part-time', 'Magang'])->default('Full-time');
            $table->longText('qualifications_html');
            $table->longText('responsibilities_html');
            $table->string('google_form_url');
            $table->boolean('is_active')->default(true)->index();
            $table->unsignedInteger('apply_clicks_count')->default(0);
            $table->date('expires_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('location');
            $table->string('year_label', 64);
            $table->text('description');
            $table->boolean('is_published')->default(true)->index();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('event_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->cascadeOnDelete();
            $table->string('image_path');
            $table->string('caption')->nullable();
            $table->boolean('is_cover')->default(false);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category', 64)->index();
            $table->string('category_label');
            $table->string('logo_path');
            $table->string('role_scope');
            $table->enum('status', ['Mitra Aktif', 'Nonaktif'])->default('Mitra Aktif')->index();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('partnership_inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('company_or_store_name')->nullable();
            $table->string('whatsapp_number', 32);
            $table->enum('partnership_type', ['reseller', 'corporate_b2b', 'custom_order', 'distributor']);
            $table->string('preferred_brand')->nullable();
            $table->text('message_notes')->nullable();
            $table->enum('status', ['Baru', 'Dihubungi', 'Selesai'])->default('Baru')->index();
            $table->timestamps();
        });

        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('author');
            $table->string('review_date_label', 64);
            $table->unsignedTinyInteger('rating')->default(5);
            $table->text('content');
            $table->string('highlight_aspect')->nullable();
            $table->string('screenshot_image')->nullable();
            $table->json('buyer_photos')->nullable();
            $table->string('platform', 64)->default('Shopee');
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });

        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->text('answer');
            $table->enum('category', ['maklon', 'reseller', 'umum'])->default('umum')->index();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('partnership_inquiries');
        Schema::dropIfExists('partners');
        Schema::dropIfExists('event_images');
        Schema::dropIfExists('events');
        Schema::dropIfExists('careers');
    }
};
