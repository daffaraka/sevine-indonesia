<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('visitor_sessions', function (Blueprint $table) {
            $table->id();
            $table->char('visitor_hash', 64)->index();
            $table->string('current_path', 255)->default('/');
            $table->enum('device_type', ['mobile', 'tablet', 'desktop'])->default('mobile');
            $table->string('referrer_source', 64)->default('Direct');
            $table->date('visited_date')->index();
            $table->timestamp('last_seen_at')->index();
            $table->unique(['visitor_hash', 'visited_date']);
        });

        Schema::create('daily_visitor_metrics', function (Blueprint $table) {
            $table->id();
            $table->date('metric_date')->unique();
            $table->unsignedInteger('unique_visitors')->default(0);
            $table->unsignedInteger('page_views')->default(0);
            $table->unsignedInteger('catalog_views')->default(0);
            $table->unsignedInteger('whatsapp_b2b_clicks')->default(0);
            $table->unsignedInteger('shopee_store_clicks')->default(0);
            $table->unsignedInteger('career_form_clicks')->default(0);
            $table->json('brand_views_breakdown')->nullable();
            $table->json('device_breakdown')->nullable();
            $table->json('referrer_breakdown')->nullable();
            $table->timestamps();
        });

        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('actor_role', 64)->default('admin');
            $table->string('module', 64)->index();
            $table->enum('action', [
                'create',
                'update',
                'delete',
                'restore',
                'import_csv',
                'bulk_status',
                'health_check',
            ]);
            $table->string('target_label');
            $table->json('metadata')->nullable();
            $table->timestamp('created_at')->useCurrent()->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('daily_visitor_metrics');
        Schema::dropIfExists('visitor_sessions');
    }
};
