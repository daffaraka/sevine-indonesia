import React, { useEffect, useMemo, useState } from 'react';
import { Activity, Pause, Play, Plus } from 'lucide-react';
import {
  ActivityLogItem,
  AdminBrandItem,
  AdminCareerItem,
  AdminMonitoringServerPayload,
  DailyVisitorMetricItem,
  SystemHealthServiceItem,
} from '../../types/AdminDashboardTypes';
import {
  buildDailyVisitorSeries,
  buildDeviceBreakdown,
  buildTrafficSources,
  evaluateRealtimeSystemHealth,
  recordPublicPageVisit,
} from '../../services/AdminMonitoringService';
import { reloadMonitoringPartial } from '../../services/AdminInertiaBridge';
import { AdminMonitoringKpiRow } from './AdminMonitoringKpiRow';
import { AdminDailyVisitorChartCard } from './AdminDailyVisitorChartCard';
import { AdminRealtimeSystemHealthCard } from './AdminRealtimeSystemHealthCard';
import { AdminLiveActivityFeedCard } from './AdminLiveActivityFeedCard';

interface AdminMonitoringSectionProps {
  brands: AdminBrandItem[];
  careers: AdminCareerItem[];
  liveOnlineVisitors: number;
  activityLogs: ActivityLogItem[];
  serverMonitoring?: AdminMonitoringServerPayload;
  isInertiaMode?: boolean;
  onPulseLiveVisitors: (nextCount: number) => void;
  onLogMonitoringEvent: (actionLabel: string, targetLabel: string) => void;
}

export const AdminMonitoringSection: React.FC<AdminMonitoringSectionProps> = ({
  brands,
  careers,
  liveOnlineVisitors,
  activityLogs,
  serverMonitoring,
  isInertiaMode = false,
  onPulseLiveVisitors,
  onLogMonitoringEvent,
}) => {
  const [dailySeries, setDailySeries] = useState<DailyVisitorMetricItem[]>(() =>
    serverMonitoring?.dailyMetrics?.length
      ? serverMonitoring.dailyMetrics
      : buildDailyVisitorSeries(),
  );
  const [isLivePolling, setIsLivePolling] = useState<boolean>(true);
  const [healthItems, setHealthItems] = useState<SystemHealthServiceItem[]>(() =>
    evaluateRealtimeSystemHealth(brands, careers),
  );

  useEffect(() => {
    if (serverMonitoring?.dailyMetrics && serverMonitoring.dailyMetrics.length > 0) {
      setDailySeries(serverMonitoring.dailyMetrics);
    }
    if (serverMonitoring?.systemHealth) {
      const dbLatency = serverMonitoring.systemHealth.databaseLatencyMs;
      setHealthItems(
        evaluateRealtimeSystemHealth(brands, careers).map((item) =>
          item.id === 'health-db-telemetry' ? { ...item, latencyMs: dbLatency } : item,
        ),
      );
    }
  }, [serverMonitoring, brands, careers]);

  // Partial reload Inertia setiap 5 detik pada mode Laravel, atau simulasi lokal
  useEffect(() => {
    if (!isLivePolling) return;
    const interval = window.setInterval(() => {
      if (isInertiaMode) {
        reloadMonitoringPartial();
        return;
      }
      const delta = Math.floor(Math.random() * 5) - 2;
      const nextOnline = Math.max(8, Math.min(48, liveOnlineVisitors + delta));
      onPulseLiveVisitors(nextOnline);
      setDailySeries(buildDailyVisitorSeries());
    }, 5000);
    return () => window.clearInterval(interval);
  }, [isLivePolling, isInertiaMode, liveOnlineVisitors, onPulseLiveVisitors]);

  const todayMetric = dailySeries[dailySeries.length - 1];
  const yesterdayMetric = dailySeries[dailySeries.length - 2] || todayMetric;

  const devices = useMemo(
    () => buildDeviceBreakdown(todayMetric.uniqueVisitors),
    [todayMetric.uniqueVisitors],
  );
  const sources = useMemo(
    () => buildTrafficSources(todayMetric.uniqueVisitors),
    [todayMetric.uniqueVisitors],
  );

  const handleSimulatePublicVisit = () => {
    if (isInertiaMode) {
      window.open('/catalog', '_blank', 'noopener,noreferrer');
      window.setTimeout(() => reloadMonitoringPartial(), 800);
      return;
    }
    recordPublicPageVisit('catalog');
    setDailySeries(buildDailyVisitorSeries());
    onPulseLiveVisitors(liveOnlineVisitors + 1);
    onLogMonitoringEvent('Kunjungan Baru', 'Pengunjung membuka halaman Katalog Produk');
  };

  const handleRunHealthCheck = () => {
    if (isInertiaMode) {
      reloadMonitoringPartial();
    }
    setHealthItems(evaluateRealtimeSystemHealth(brands, careers));
    onLogMonitoringEvent('Pemeriksaan Website', 'Seluruh halaman utama dan tautan penting telah diperiksa');
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-doff-border shadow-doff-sm p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-doff-navy flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Laporan Kunjungan &amp; Kondisi Website</span>
          </h2>
          <p className="text-xs text-slate-500">
            Data kunjungan diperbarui otomatis setiap 5 detik untuk membantu memantau minat pengunjung dan kesiapan website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsLivePolling((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
              isLivePolling
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isLivePolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLivePolling ? 'Pembaruan Otomatis: Aktif' : 'Pembaruan Otomatis: Dijeda'}</span>
          </button>

          <button
            type="button"
            onClick={handleSimulatePublicVisit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-doff-navy hover:bg-doff-navydark text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Buka Halaman Katalog</span>
          </button>
        </div>
      </div>

      <AdminMonitoringKpiRow
        liveOnlineVisitors={liveOnlineVisitors}
        todayMetric={todayMetric}
        yesterdayMetric={yesterdayMetric}
        isLivePolling={isLivePolling}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <AdminDailyVisitorChartCard
            dailySeries={dailySeries}
            devices={devices}
            sources={sources}
          />
        </div>
        <AdminRealtimeSystemHealthCard
          healthItems={healthItems}
          onRunHealthCheck={handleRunHealthCheck}
        />
      </div>

      <AdminLiveActivityFeedCard todayMetric={todayMetric} activityLogs={activityLogs} />
    </div>
  );
};
