import React from 'react';
import { User } from 'lucide-react';

interface TestimonialAuthorCardProps {
  author: string;
  date: string;
  platform?: string;
}

export const TestimonialAuthorCard: React.FC<TestimonialAuthorCardProps> = ({
  author,
  date,
  platform
}) => {
  return (
    <div className="flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-xl bg-slate-50/90 border-2 border-slate-300 transition-colors group-hover:border-slate-400">
      {/* Sisi Kiri: Icon Person & Nama */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs text-slate-700">
          <User className="w-3.5 h-3.5 text-doff-navy" />
        </div>
        <div className="min-w-0">
          <span className="font-bold text-doff-navy text-xs sm:text-[13px] block truncate">
            {author}
          </span>
          <span className="text-[9px] text-emerald-700 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            {platform || 'Shopee Terverifikasi'}
          </span>
        </div>
      </div>

      {/* Sisi Kanan: Tanggal */}
      <div className="shrink-0 pl-2">
        <span className="font-mono text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
          {date}
        </span>
      </div>
    </div>
  );
};
