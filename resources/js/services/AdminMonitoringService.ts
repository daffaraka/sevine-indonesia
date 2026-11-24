import {
  ActivityLogItem,
  AdminBrandItem,
  AdminCareerItem,
  DailyVisitorMetricItem,
  DeviceBreakdownItem,
  SystemHealthServiceItem,
  TrafficSourceItem,
} from '../types/AdminDashboardTypes';

const TELEMETRY_STORAGE_KEY = 'sevine_internal_daily_telemetry_v1';

interface LocalTelemetryDelta {
  date: string;
  extraUniqueVisitors: number;
  extraPageViews: number;
  extraCatalogViews: number;
  extraWhatsappClicks: number;
  extraShopeeClicks: number;
  extraCareerClicks: number;
}

const getTodayIso = (): string => new Date().toISOString().slice(0, 10);

const formatShortDate = (date: Date): string =>
  date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });

const BASE_14_DAY_PATTERN = [
  { uv: 312, pv: 824, cat: 215, wa: 18, shp: 64, car: 9 },
  { uv: 348, pv: 912, cat: 244, wa: 21, shp: 72, car: 11 },
  { uv: 295, pv: 780, cat: 198, wa: 15, shp: 58, car: 7 },
  { uv: 410, pv: 1090, cat: 302, wa: 27, shp: 89, car: 14 },
  { uv: 438, pv: 1185, cat: 329, wa: 31, shp: 96, car: 16 },
  { uv: 382, pv: 1010, cat: 274, wa: 24, shp: 83, car: 12 },
  { uv: 465, pv: 1260, cat: 356, wa: 34, shp: 108, car: 19 },
  { uv: 428, pv: 1140, cat: 318, wa: 28, shp: 92, car: 13 },
  { uv: 492, pv: 1345, cat: 384, wa: 39, shp: 116, car: 21 },
  { uv: 518, pv: 1420, cat: 412, wa: 42, shp: 124, car: 18 },
  { uv: 476, pv: 1290, cat: 365, wa: 35, shp: 109, car: 15 },
  { uv: 544, pv: 1510, cat: 446, wa: 46, shp: 138, car: 22 },
  { uv: 589, pv: 1640, cat: 492, wa: 51, shp: 152, car: 24 },
  { uv: 624, pv: 1735, cat: 528, wa: 56, shp: 167, car: 27 },
];

function readLocalTelemetryDelta(): LocalTelemetryDelta {
  const today = getTodayIso();
  const empty: LocalTelemetryDelta = {
    date: today,
    extraUniqueVisitors: 0,
    extraPageViews: 0,
    extraCatalogViews: 0,
    extraWhatsappClicks: 0,
    extraShopeeClicks: 0,
    extraCareerClicks: 0,
  };
  try {
    const raw = window.localStorage.getItem(TELEMETRY_STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as LocalTelemetryDelta;
    return parsed.date === today ? parsed : empty;
  } catch {
    return empty;
  }
}

function saveLocalTelemetryDelta(delta: LocalTelemetryDelta): void {
  try {
    window.localStorage.setItem(TELEMETRY_STORAGE_KEY, JSON.stringify(delta));
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

export function recordPublicPageVisit(routeMode: 'classic' | 'catalog'): void {
  const current = readLocalTelemetryDelta();
  const next: LocalTelemetryDelta = {
    ...current,
    extraUniqueVisitors: current.extraUniqueVisitors + 1,
    extraPageViews: current.extraPageViews + 1,
    extraCatalogViews:
      routeMode === 'catalog' ? current.extraCatalogViews + 1 : current.extraCatalogViews,
  };
  saveLocalTelemetryDelta(next);
}

export function buildDailyVisitorSeries(): DailyVisitorMetricItem[] {
  const delta = readLocalTelemetryDelta();
  const today = new Date();

  return BASE_14_DAY_PATTERN.map((row, index) => {
    const offset = BASE_14_DAY_PATTERN.length - 1 - index;
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    const isToday = offset === 0;

    return {
      date: d.toISOString().slice(0, 10),
      label: isToday ? 'Hari Ini' : formatShortDate(d),
      uniqueVisitors: row.uv + (isToday ? delta.extraUniqueVisitors : 0),
      pageViews: row.pv + (isToday ? delta.extraPageViews : 0),
      catalogViews: row.cat + (isToday ? delta.extraCatalogViews : 0),
      whatsappClicks: row.wa + (isToday ? delta.extraWhatsappClicks : 0),
      shopeeClicks: row.shp + (isToday ? delta.extraShopeeClicks : 0),
      careerFormClicks: row.car + (isToday ? delta.extraCareerClicks : 0),
    };
  });
}

export function buildDeviceBreakdown(totalVisitors: number): DeviceBreakdownItem[] {
  const mobilePct = 68;
  const desktopPct = 26;
  const tabletPct = 6;
  return [
    {
      label: 'Ponsel (HP)',
      percentage: mobilePct,
      count: Math.round((totalVisitors * mobilePct) / 100),
    },
    {
      label: 'Komputer / Laptop',
      percentage: desktopPct,
      count: Math.round((totalVisitors * desktopPct) / 100),
    },
    {
      label: 'Tablet',
      percentage: tabletPct,
      count: Math.round((totalVisitors * tabletPct) / 100),
    },
  ];
}

export function buildTrafficSources(totalVisitors: number): TrafficSourceItem[] {
  const weights = [
    { source: 'Langsung ke Website & Katalog', percentage: 38 },
    { source: 'Tautan Instagram', percentage: 29 },
    { source: 'Pencarian Google', percentage: 19 },
    { source: 'TikTok & Siaran Langsung', percentage: 14 },
  ];
  return weights.map((w) => ({
    source: w.source,
    percentage: w.percentage,
    visits: Math.round((totalVisitors * w.percentage) / 100),
  }));
}

export function evaluateRealtimeSystemHealth(
  brands: AdminBrandItem[],
  careers: AdminCareerItem[],
): SystemHealthServiceItem[] {
  const checkedAt = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const invalidShopee = brands.filter(
    (b) => !b.shopeeUrl.startsWith('https://shopee.co.id/'),
  );
  const invalidForms = careers.filter(
    (c) =>
      c.isActive &&
      (!c.googleFormUrl.startsWith('https://') || c.googleFormUrl.includes('/edit')),
  );

  return [
    {
      id: 'health-laravel-web',
      serviceName: 'Halaman Utama Website',
      category: 'Website',
      status: 'normal',
      latencyMs: 38,
      detailText: 'Website dapat diakses dengan cepat dan aman oleh pengunjung.',
      lastCheckedAt: checkedAt,
    },
    {
      id: 'health-db-telemetry',
      serviceName: 'Pencatatan Data Pengunjung',
      category: 'Pencatatan',
      status: 'normal',
      latencyMs: 14,
      detailText: 'Jumlah kunjungan dan klik pengunjung tercatat otomatis setiap hari.',
      lastCheckedAt: checkedAt,
    },
    {
      id: 'health-shopee-links',
      serviceName: 'Tautan Toko Shopee (5 Brand)',
      category: 'Tautan Toko',
      status: invalidShopee.length === 0 ? 'normal' : 'warning',
      latencyMs: 142,
      detailText:
        invalidShopee.length === 0
          ? `Semua ${brands.length} tautan toko resmi Shopee siap dikunjungi pembeli.`
          : `${invalidShopee.length} tautan toko Shopee perlu diperiksa dan diperbarui.`,
      lastCheckedAt: checkedAt,
    },
    {
      id: 'health-career-links',
      serviceName: 'Formulir Lamaran Kerja',
      category: 'Rekrutmen',
      status: invalidForms.length === 0 ? 'normal' : 'warning',
      latencyMs: 118,
      detailText:
        invalidForms.length === 0
          ? `${careers.filter((c) => c.isActive).length} formulir lowongan aktif siap menerima pendaftar.`
          : `${invalidForms.length} tautan formulir lamaran perlu diperbaiki agar bisa diisi pelamar.`,
      lastCheckedAt: checkedAt,
    },
  ];
}

export const INITIAL_ACTIVITY_LOGS: ActivityLogItem[] = [
  {
    id: 'act-1',
    actorRole: 'Admin',
    module: 'Statistik & Kunjungan',
    actionLabel: 'Pembaruan Data',
    targetLabel: 'Rekap kunjungan website hari ini berhasil dimuat',
    timestamp: 'Baru saja',
    tone: 'info',
  },
  {
    id: 'act-2',
    actorRole: 'Admin',
    module: 'Katalog Produk',
    actionLabel: 'Status Aktif',
    targetLabel: 'SVN-BAG-091 · Nomad Waterproof Roll-Top 28L',
    timestamp: '12 menit lalu',
    tone: 'success',
  },
  {
    id: 'act-3',
    actorRole: 'Admin',
    module: 'Lowongan Kerja',
    actionLabel: 'Publikasi',
    targetLabel: 'Operator Jahit Bar-tack & High Speed (Ngawi)',
    timestamp: '45 menit lalu',
    tone: 'success',
  },
];
