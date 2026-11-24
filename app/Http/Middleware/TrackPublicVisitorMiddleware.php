<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware internal telemetry ringan untuk mencatat pengunjung harian
 * dan pengunjung sedang online (5 menit terakhir) tanpa cookie tracking pihak ketiga.
 */
class TrackPublicVisitorMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (! $request->isMethod('GET') || $request->is('admin*') || $request->expectsJson()) {
            return $response;
        }

        $today = now()->toDateString();
        $visitorHash = hash('sha256', $today . '|' . $request->ip() . '|' . ($request->userAgent() ?? 'unknown'));
        $deviceType = $this->detectDeviceType($request->userAgent() ?? '');
        $referrerSource = $this->detectReferrerSource($request->headers->get('referer'));

        $existingSession = DB::table('visitor_sessions')
            ->where('visitor_hash', $visitorHash)
            ->where('visited_date', $today)
            ->first();

        $isNewDailyVisitor = $existingSession === null;

        DB::table('visitor_sessions')->upsert(
            [
                'visitor_hash'    => $visitorHash,
                'current_path'    => '/' . ltrim($request->path(), '/'),
                'device_type'     => $deviceType,
                'referrer_source' => $referrerSource,
                'visited_date'    => $today,
                'last_seen_at'    => now(),
            ],
            ['visitor_hash', 'visited_date'],
            ['current_path', 'last_seen_at']
        );

        $isCatalogPath = str_starts_with(ltrim($request->path(), '/'), 'catalog');

        DB::table('daily_visitor_metrics')->upsert(
            [
                'metric_date'     => $today,
                'unique_visitors' => $isNewDailyVisitor ? 1 : 0,
                'page_views'      => 1,
                'catalog_views'   => $isCatalogPath ? 1 : 0,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            ['metric_date'],
            [
                'unique_visitors' => DB::raw('unique_visitors + ' . ($isNewDailyVisitor ? 1 : 0)),
                'page_views'      => DB::raw('page_views + 1'),
                'catalog_views'   => DB::raw('catalog_views + ' . ($isCatalogPath ? 1 : 0)),
                'updated_at'      => now(),
            ]
        );

        return $response;
    }

    private function detectDeviceType(string $userAgent): string
    {
        $ua = strtolower($userAgent);
        if (str_contains($ua, 'ipad') || str_contains($ua, 'tablet')) {
            return 'tablet';
        }
        if (str_contains($ua, 'mobile') || str_contains($ua, 'android') || str_contains($ua, 'iphone')) {
            return 'mobile';
        }
        return 'desktop';
    }

    private function detectReferrerSource(?string $referer): string
    {
        if (! $referer) {
            return 'Direct';
        }
        $host = strtolower((string) parse_url($referer, PHP_URL_HOST));
        return match (true) {
            str_contains($host, 'instagram') => 'Instagram',
            str_contains($host, 'tiktok')    => 'TikTok',
            str_contains($host, 'google')    => 'Google',
            str_contains($host, 'shopee')    => 'Shopee',
            default                          => 'Direct',
        };
    }
}
