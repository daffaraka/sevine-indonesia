<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AdminDashboardPayloadService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardOverviewController extends Controller
{
    public function overview(AdminDashboardPayloadService $service): Response
    {
        return Inertia::render('Admin/Overview', $service->buildOverviewProps());
    }

    public function products(AdminDashboardPayloadService $service): Response
    {
        return Inertia::render('Admin/Products', $service->buildProductsPageProps());
    }

    public function categories(AdminDashboardPayloadService $service): Response
    {
        return Inertia::render('Admin/Categories', $service->buildCategoriesPageProps());
    }

    public function brands(AdminDashboardPayloadService $service): Response
    {
        return Inertia::render('Admin/Brands', $service->buildBrandsPageProps());
    }

    public function careers(AdminDashboardPayloadService $service): Response
    {
        return Inertia::render('Admin/Careers', $service->buildCareersPageProps());
    }

    public function events(AdminDashboardPayloadService $service): Response
    {
        return Inertia::render('Admin/Events', $service->buildEventsPageProps());
    }

    public function collaborations(AdminDashboardPayloadService $service): Response
    {
        return Inertia::render('Admin/Collaborations', $service->buildCollaborationsPageProps());
    }

    public function access(AdminDashboardPayloadService $service): Response
    {
        return Inertia::render('Admin/Access', $service->buildAccessPageProps());
    }
}
