import React from 'react';
import { ActivityLogItem, DailyVisitorMetricItem } from '../../types/AdminDashboardTypes';

interface AdminLiveActivityFeedCardProps {
  todayMetric: DailyVisitorMetricItem;
  activityLogs: ActivityLogItem[];
}

const TONE_DOT: Record<ActivityLogItem['tone'], string> = {
  info: 'bg-blue-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
};

export const AdminLiveActivityFeedCard: React.FC<AdminLiveActivityFeedCardProps> = ({
  todayMetric,
  activityLogs,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Ringkasan Aksi Pengunjung Hari Ini */}
      <div className="bg-white rounded-xl border border-doff-border shadow-doff-sm p-5 space-y-3">
        <div className="pb-3 border-b border-slate-100">
          <h3 className="font-bold text-doff-navy text-sm">Aksi Pengunjung Hari Ini</h3>
          <p className="text-[11px] text-slate-500">
            Jumlah pengunjung yang mengklik tombol hubungi atau belanja di website.
          </p>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between">
            <div>
              <p className="font-bold text-emerald-900">Hubungi WhatsApp (Kerja Sama)</p>
              <p className="text-[11px] text-emerald-700">
                Dari formulir kemitraan dan tombol WhatsApp
              </p>
            </div>
            <span className="text-lg font-mono font-bold text-emerald-800">
              {todayMetric.whatsappClicks}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-sky-50/70 border border-sky-200/80 flex items-center justify-between">
            <div>
              <p className="font-bold text-sky-900">Kunjungi Toko Shopee (5 Brand)</p>
              <p className="text-[11px] text-sky-700">
                Klik produk dan tautan menuju toko resmi
              </p>
            </div>
            <span className="text-lg font-mono font-bold text-sky-800">
              {todayMetric.shopeeClicks}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
            <div>
              <p className="font-bold text-amber-900">Buka Formulir Lowongan Kerja</p>
              <p className="text-[11px] text-amber-700">
                Klik tombol lamar pada halaman karir
              </p>
            </div>
            <span className="text-lg font-mono font-bold text-amber-800">
              {todayMetric.careerFormClicks}
            </span>
          </div>
        </div>
      </div>

      {/* Riwayat Perubahan Terbaru */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-doff-border shadow-doff-sm p-5 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-doff-navy text-sm">Riwayat Perubahan Terbaru</h3>
            <p className="text-[11px] text-slate-500">
              Daftar pembaruan data produk, lowongan kerja, dan kegiatan yang baru dilakukan tim.
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-doff-navy font-mono text-[10px] font-semibold">
            {activityLogs.length} aktivitas
          </span>
        </div>

        <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-1">
          {activityLogs.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-400">
              Belum ada riwayat perubahan terbaru.
            </p>
          ) : (
            activityLogs.map((log) => (
              <div key={log.id} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${TONE_DOT[log.tone]}`} />
                  <div className="min-w-0">
                    <p className="text-doff-navy font-medium truncate">
                      <span className="font-bold">{log.actionLabel}</span> · {log.targetLabel}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Bagian {log.module} · oleh {log.actorRole}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap shrink-0">
                  {log.timestamp}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
