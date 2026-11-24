<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AdminDashboardPayloadService;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Controller Inertia khusus halaman `Admin/Monitoring`.
 */
class MonitoringController extends Controller
{
    public function index(AdminDashboardPayloadService $payloadService): Response
    {
        return Inertia::render('Admin/Monitoring', $payloadService->buildMonitoringPageProps());
    }
}
