import React from 'react';
import { RefreshCw } from 'lucide-react';
import { SystemHealthServiceItem } from '../../types/AdminDashboardTypes';

interface AdminRealtimeSystemHealthCardProps {
  healthItems: SystemHealthServiceItem[];
  onRunHealthCheck: () => void;
}

const STATUS_BADGE: Record<SystemHealthServiceItem['status'], string> = {
  normal: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-800 border-amber-200',
  error: 'bg-red-50 text-red-700 border-red-200',
};

const STATUS_LABEL: Record<SystemHealthServiceItem['status'], string> = {
  normal: 'Berjalan Baik',
  warning: 'Perlu Diperiksa',
  error: 'Ada Gangguan',
};

export const AdminRealtimeSystemHealthCard: React.FC<AdminRealtimeSystemHealthCardProps> = ({
  healthItems,
  onRunHealthCheck,
}) => {
  const hasIssue = healthItems.some((item) => item.status !== 'normal');

  return (
    <div className="bg-white rounded-xl border border-doff-border shadow-doff-sm p-5 space-y-4">
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-doff-navy text-sm">
            Status Website &amp; Tautan Penting
          </h3>
          <p className="text-[11px] text-slate-500">
            {hasIssue
              ? 'Ada tautan toko atau formulir yang perlu diperiksa.'
              : 'Seluruh halaman website dan tautan utama berfungsi normal.'}
          </p>
        </div>
        <button
          type="button"
          onClick={onRunHealthCheck}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-doff-border bg-slate-50 hover:bg-doff-navy hover:text-white text-doff-navy text-xs font-semibold transition-colors cursor-pointer shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Periksa</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {healthItems.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg border border-slate-200/80 bg-slate-50/70 space-y-1"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-doff-navy">{item.serviceName}</span>
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border shrink-0 ${
                  STATUS_BADGE[item.status]
                }`}
              >
                {STATUS_LABEL[item.status]}
              </span>
            </div>
            <p className="text-[11px] text-slate-600">{item.detailText}</p>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>{item.category}</span>
              <span>Diperiksa pukul {item.lastCheckedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
