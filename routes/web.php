<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CareerController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardOverviewController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\MonitoringController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\RoleAccessController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\PublicProfileController;
use App\Http\Controllers\TelemetryController;
use App\Http\Middleware\TrackPublicVisitorMiddleware;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Halaman Publik CV. Sevine Indonesia (Dengan Internal Visitor Telemetry)
|--------------------------------------------------------------------------
*/
Route::middleware([TrackPublicVisitorMiddleware::class])->group(function () {
    Route::get('/', [PublicProfileController::class, 'home'])->name('public.home');
    Route::get('/catalog', [PublicProfileController::class, 'catalog'])->name('public.catalog');
    Route::get('/careers/{career:slug}', [PublicProfileController::class, 'careerDetail'])->name('public.careers.show');
});

Route::post('/inquiries', [PublicProfileController::class, 'storeInquiry'])
    ->middleware('throttle:15,1')
    ->name('public.inquiries.store');

Route::post('/telemetry/click', [TelemetryController::class, 'trackClick'])
    ->middleware('throttle:60,1')
    ->name('public.telemetry.click');

/*
|--------------------------------------------------------------------------
| Autentikasi Standar Laravel (Email + Password)
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

/*
|--------------------------------------------------------------------------
| Panel Admin Backoffice (Spatie Role Default: admin)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [DashboardOverviewController::class, 'overview'])->name('dashboard');
        Route::get('/monitoring', [MonitoringController::class, 'index'])->name('monitoring');
        Route::get('/products', [DashboardOverviewController::class, 'products'])->name('products.index');
        Route::get('/categories', [DashboardOverviewController::class, 'categories'])->name('categories.index');
        Route::get('/brands', [DashboardOverviewController::class, 'brands'])->name('brands.index');
        Route::get('/careers', [DashboardOverviewController::class, 'careers'])->name('careers.index');
        Route::get('/events', [DashboardOverviewController::class, 'events'])->name('events.index');
        Route::get('/collaborations', [DashboardOverviewController::class, 'collaborations'])->name('collaborations.index');
        Route::get('/access', [DashboardOverviewController::class, 'access'])->name('access.index');

        // Katalog Produk
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
        Route::patch('/products/bulk-status', [ProductController::class, 'bulkStatus'])->name('products.bulk-status');
        Route::delete('/products/bulk-delete', [ProductController::class, 'bulkDestroy'])->name('products.bulk-destroy');
        Route::post('/products/import-csv', [ProductController::class, 'importCsv'])->name('products.import-csv');

        // Kategori Produk
        Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
        Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

        // 5 Brand Ekosistem
        Route::put('/brands/{brand}', [BrandController::class, 'update'])->name('brands.update');

        // Lowongan Kerja
        Route::post('/careers', [CareerController::class, 'store'])->name('careers.store');
        Route::put('/careers/{career}', [CareerController::class, 'update'])->name('careers.update');
        Route::patch('/careers/{career}/toggle-status', [CareerController::class, 'toggleStatus'])->name('careers.toggle');
        Route::delete('/careers/{career}', [CareerController::class, 'destroy'])->name('careers.destroy');

        // Dokumentasi Event
        Route::post('/events', [EventController::class, 'store'])->name('events.store');
        Route::put('/events/{event}', [EventController::class, 'update'])->name('events.update');
        Route::delete('/events/{event}', [EventController::class, 'destroy'])->name('events.destroy');

        // Mitra Kolaborasi
        Route::post('/partners', [PartnerController::class, 'store'])->name('partners.store');
        Route::put('/partners/{partner}', [PartnerController::class, 'update'])->name('partners.update');
        Route::delete('/partners/{partner}', [PartnerController::class, 'destroy'])->name('partners.destroy');

        // Hak Akses & Role (Spatie Permission)
        Route::post('/roles', [RoleAccessController::class, 'store'])->name('roles.store');
        Route::put('/roles/{role}', [RoleAccessController::class, 'update'])->name('roles.update');
        Route::delete('/roles/{role}', [RoleAccessController::class, 'destroy'])->name('roles.destroy');
    });
