import React from 'react';
import { DailyVisitorMetricItem } from '../../types/AdminDashboardTypes';

interface AdminMonitoringKpiRowProps {
  liveOnlineVisitors: number;
  todayMetric: DailyVisitorMetricItem;
  yesterdayMetric: DailyVisitorMetricItem;
  isLivePolling: boolean;
}

const calcGrowthLabel = (today: number, yesterday: number): string => {
  if (yesterday <= 0) return 'Naik 100%';
  const diff = Math.round(((today - yesterday) / yesterday) * 100);
  if (diff > 0) return `Naik +${diff}%`;
  if (diff < 0) return `Turun ${Math.abs(diff)}%`;
  return 'Stabil 0%';
};

export const AdminMonitoringKpiRow: React.FC<AdminMonitoringKpiRowProps> = ({
  liveOnlineVisitors,
  todayMetric,
  yesterdayMetric,
  isLivePolling,
}) => {
  const visitorGrowth = calcGrowthLabel(todayMetric.uniqueVisitors, yesterdayMetric.uniqueVisitors);
  const pageViewGrowth = calcGrowthLabel(todayMetric.pageViews, yesterdayMetric.pageViews);
  const totalActions =
    todayMetric.whatsappClicks + todayMetric.shopeeClicks + todayMetric.careerFormClicks;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl border border-doff-border p-4 shadow-doff-sm space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">Sedang Membuka Website</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${
                isLivePolling ? 'animate-pulse' : ''
              }`}
            />
            {isLivePolling ? 'Aktif' : 'Dijeda'}
          </span>
        </div>
        <div className="text-2xl font-bold font-mono text-doff-navy">{liveOnlineVisitors}</div>
        <p className="text-[11px] text-slate-500">
          Orang yang sedang mengakses website dalam 5 menit terakhir
        </p>
      </div>

      <div className="bg-white rounded-xl border border-doff-border p-4 shadow-doff-sm space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">Pengunjung Hari Ini</span>
          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-200">
            {visitorGrowth}
          </span>
        </div>
        <div className="text-2xl font-bold font-mono text-doff-navy">
          {todayMetric.uniqueVisitors.toLocaleString('id-ID')}
        </div>
        <p className="text-[11px] text-slate-500">
          Kemarin: {yesterdayMetric.uniqueVisitors.toLocaleString('id-ID')} orang mengunjungi website
        </p>
      </div>

      <div className="bg-white rounded-xl border border-doff-border p-4 shadow-doff-sm space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">Total Halaman Dibuka</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-doff-navy text-[10px] font-semibold border border-slate-200">
            {pageViewGrowth}
          </span>
        </div>
        <div className="text-2xl font-bold font-mono text-doff-navy">
          {todayMetric.pageViews.toLocaleString('id-ID')}
        </div>
        <p className="text-[11px] text-slate-500">
          Termasuk {todayMetric.catalogViews.toLocaleString('id-ID')} kali pembukaan Katalog Produk
        </p>
      </div>

      <div className="bg-white rounded-xl border border-doff-border p-4 shadow-doff-sm space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">Minat &amp; Aksi Pengunjung</span>
          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-semibold border border-amber-200">
            Hari Ini
          </span>
        </div>
        <div className="text-2xl font-bold font-mono text-doff-navy">
          {totalActions.toLocaleString('id-ID')}
        </div>
        <p className="text-[11px] text-slate-500">
          {todayMetric.whatsappClicks} WhatsApp · {todayMetric.shopeeClicks} Shopee ·{' '}
          {todayMetric.careerFormClicks} Lamar Kerja
        </p>
      </div>
    </div>
  );
};
