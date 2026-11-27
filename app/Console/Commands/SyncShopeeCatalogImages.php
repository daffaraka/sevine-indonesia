<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;

class SyncShopeeCatalogImages extends Command
{
    protected $signature = 'catalog:sync-shopee-images
        {--force : Timpa ulang file WebP yang sudah ada}
        {--max-width=900 : Lebar maksimum gambar dalam piksel}
        {--quality=82 : Kualitas kompresi WebP (1-100)}';

    protected $description = 'Mengunduh foto produk Sevine dari manifest Shopee dan mengonversinya ke WebP lokal.';

    private const MANIFEST_PATH = 'seeders/data/shopee_sevine_catalog.json';

    public function handle(): int
    {
        if (! extension_loaded('gd') || ! function_exists('imagewebp')) {
            $this->error('Ekstensi PHP GD dengan dukungan WebP tidak aktif.');

            return self::FAILURE;
        }

        $manifestPath = database_path(self::MANIFEST_PATH);
        if (! File::exists($manifestPath)) {
            $this->error("Manifest tidak ditemukan di {$manifestPath}");

            return self::FAILURE;
        }

        $manifest = json_decode(File::get($manifestPath), true, 512, JSON_THROW_ON_ERROR);
        $jobs = $this->collectDownloadJobs($manifest['products'] ?? [], (bool) $this->option('force'));

        if ($jobs === []) {
            $this->info('Semua foto produk WebP sudah tersedia. Gunakan --force untuk mengunduh ulang.');

            return self::SUCCESS;
        }

        $this->info('Mengunduh & mengonversi ' . count($jobs) . ' foto produk ke WebP...');
        [$saved, $failed, $totalBytes] = $this->processJobsInBatches(
            $jobs,
            (int) $this->option('max-width'),
            (int) $this->option('quality'),
        );

        $sizeMb = number_format($totalBytes / (1024 * 1024), 2);
        $this->info("Selesai: {$saved} foto tersimpan ({$sizeMb} MB), {$failed} gagal.");

        return $failed === 0 ? self::SUCCESS : self::FAILURE;
    }

    /**
     * @param  array<int, array<string, mixed>>  $products
     * @return array<int, array{url: string, target: string, relative: string}>
     */
    private function collectDownloadJobs(array $products, bool $force): array
    {
        $jobs = [];
        foreach ($products as $product) {
            $sources = $product['source_images'] ?? [];
            $targets = $product['images'] ?? [];

            foreach ($sources as $index => $url) {
                if (! isset($targets[$index]) || ! is_string($url) || $url === '') {
                    continue;
                }

                $relative = ltrim((string) $targets[$index], '/');
                $targetPath = public_path($relative);

                if (! $force && File::exists($targetPath) && File::size($targetPath) > 0) {
                    continue;
                }

                $jobs[] = [
                    'url'      => $url,
                    'target'   => $targetPath,
                    'relative' => '/' . $relative,
                ];
            }
        }

        return $jobs;
    }

    /**
     * @param  array<int, array{url: string, target: string, relative: string}>  $jobs
     * @return array{0: int, 1: int, 2: int}
     */
    private function processJobsInBatches(array $jobs, int $maxWidth, int $quality): array
    {
        $saved = 0;
        $failed = 0;
        $totalBytes = 0;

        foreach (array_chunk($jobs, 10) as $batch) {
            $responses = Http::pool(fn (Pool $pool) => array_map(
                fn (array $job) => $pool
                    ->timeout(20)
                    ->retry(2, 500)
                    ->withHeaders([
                        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept'     => 'image/webp,image/jpeg,image/png,*/*',
                    ])
                    ->get($job['url']),
                $batch,
            ));

            foreach ($batch as $idx => $job) {
                $response = $responses[$idx] ?? null;
                if (! $response || $response instanceof \Throwable || ! $response->successful()) {
                    $this->warn("Gagal unduh: {$job['url']}");
                    $failed++;
                    continue;
                }

                $bytes = $this->saveAsWebp($response->body(), $job['target'], $maxWidth, $quality);
                if ($bytes === null) {
                    $this->warn("Gagal konversi WebP: {$job['relative']}");
                    $failed++;
                    continue;
                }

                $saved++;
                $totalBytes += $bytes;
            }
        }

        return [$saved, $failed, $totalBytes];
    }

    private function saveAsWebp(string $binary, string $targetPath, int $maxWidth, int $quality): ?int
    {
        $image = @imagecreatefromstring($binary);
        if ($image === false) {
            return null;
        }

        $width = imagesx($image);
        $height = imagesy($image);
        $output = $image;

        if ($width > $maxWidth && $maxWidth > 0) {
            $newHeight = (int) round(($height / $width) * $maxWidth);
            $resized = imagescale($image, $maxWidth, $newHeight, IMG_BICUBIC);
            if ($resized !== false) {
                imagedestroy($image);
                $output = $resized;
            }
        }

        imagepalettetotruecolor($output);
        imagealphablending($output, true);
        imagesavealpha($output, true);

        File::ensureDirectoryExists(dirname($targetPath));
        $ok = imagewebp($output, $targetPath, max(1, min(100, $quality)));
        imagedestroy($output);

        return $ok && File::exists($targetPath) ? (int) File::size($targetPath) : null;
    }
}
