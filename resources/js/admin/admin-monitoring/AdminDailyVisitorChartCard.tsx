import React, { useState } from 'react';
import {
  DailyVisitorMetricItem,
  DeviceBreakdownItem,
  TrafficSourceItem,
} from '../../types/AdminDashboardTypes';
import { AdminVisitorLineChart } from './AdminVisitorLineChart';

interface AdminDailyVisitorChartCardProps {
  dailySeries: DailyVisitorMetricItem[];
  devices: DeviceBreakdownItem[];
  sources: TrafficSourceItem[];
}

export const AdminDailyVisitorChartCard: React.FC<AdminDailyVisitorChartCardProps> = ({
  dailySeries,
  devices,
  sources,
}) => {
  const [rangeDays, setRangeDays] = useState<7 | 14>(7);
  const [metricMode, setMetricMode] = useState<'uniqueVisitors' | 'pageViews'>('uniqueVisitors');

  const visibleSeries = dailySeries.slice(-rangeDays);
  const totalInRange = visibleSeries.reduce((acc, item) => acc + item[metricMode], 0);
  const dailyAverage = visibleSeries.length > 0 ? Math.round(totalInRange / visibleSeries.length) : 0;

  const firstVal = visibleSeries[0]?.[metricMode] ?? 0;
  const lastVal = visibleSeries[visibleSeries.length - 1]?.[metricMode] ?? 0;
  const periodGrowthPct =
    firstVal > 0 ? Math.round(((lastVal - firstVal) / firstVal) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-doff-border shadow-doff-sm p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-doff-navy text-sm">
              Perkembangan Pengunjung Harian
            </h3>
            {visibleSeries.length > 1 && (
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                  periodGrowthPct >= 0
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {periodGrowthPct >= 0
                  ? `Naik +${periodGrowthPct}% dalam ${rangeDays} hari`
                  : `Turun ${Math.abs(periodGrowthPct)}% dalam ${rangeDays} hari`}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Total {rangeDays} hari terakhir:{' '}
            <strong className="font-mono text-doff-navy">
              {totalInRange.toLocaleString('id-ID')}
            </strong>{' '}
            {metricMode === 'uniqueVisitors' ? 'pengunjung' : 'kali halaman dibuka'} · Rata-rata{' '}
            <strong className="font-mono text-doff-navy">
              {dailyAverage.toLocaleString('id-ID')}
            </strong>{' '}
            per hari
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="inline-flex rounded-lg border border-doff-border bg-slate-50 p-0.5">
            <button
              type="button"
              onClick={() => setMetricMode('uniqueVisitors')}
              className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
                metricMode === 'uniqueVisitors'
                  ? 'bg-doff-navy text-white'
                  : 'text-slate-600 hover:text-doff-navy'
              }`}
            >
              Jumlah Pengunjung
            </button>
            <button
              type="button"
              onClick={() => setMetricMode('pageViews')}
              className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
                metricMode === 'pageViews'
                  ? 'bg-doff-navy text-white'
                  : 'text-slate-600 hover:text-doff-navy'
              }`}
            >
              Halaman Dibuka
            </button>
          </div>

          <div className="inline-flex rounded-lg border border-doff-border bg-slate-50 p-0.5">
            {([7, 14] as const).map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setRangeDays(days)}
                className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                  rangeDays === days
                    ? 'bg-white text-doff-navy font-bold shadow-2xs'
                    : 'text-slate-500 hover:text-doff-navy'
                }`}
              >
                {days} Hari
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Line Chart Tren Harian */}
      <AdminVisitorLineChart series={visibleSeries} metricMode={metricMode} />

      {/* Ringkasan Perangkat & Asal Pengunjung */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
        <div className="space-y-2">
          <p className="font-semibold text-doff-navy">Perangkat yang Digunakan Hari Ini</p>
          {devices.map((dev) => (
            <div key={dev.label} className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-600">{dev.label}</span>
                <span className="font-mono font-semibold text-doff-navy">
                  {dev.count.toLocaleString('id-ID')} ({dev.percentage}%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${dev.percentage}%` }}
                  className="h-full bg-doff-navy rounded-full"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-doff-navy">Asal Pengunjung Website</p>
          {sources.map((src) => (
            <div key={src.source} className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-600">{src.source}</span>
                <span className="font-mono font-semibold text-doff-navy">
                  {src.visits.toLocaleString('id-ID')} ({src.percentage}%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${src.percentage}%` }}
                  className="h-full bg-blue-600 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
