import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import { CareerPublicItem } from '../../types/CompanyProfileTypes';

interface CareerDetailApplyCardProps {
  career: CareerPublicItem;
  otherCareers?: CareerPublicItem[];
}

function getXsrfToken(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function recordCareerApplyClick(careerId: string): void {
  const numericId = Number(careerId);
  if (!Number.isFinite(numericId) || numericId <= 0) return;

  const xsrfToken = getXsrfToken();
  try {
    void fetch('/telemetry/click', {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(xsrfToken ? { 'X-XSRF-TOKEN': xsrfToken } : {}),
      },
      body: JSON.stringify({ type: 'career', careerId: numericId }),
    });
  } catch {
    // Non-blocking telemetry
  }
}

export const CareerDetailApplyCard: React.FC<CareerDetailApplyCardProps> = ({
  career,
  otherCareers = [],
}) => (
  <aside className="space-y-5 lg:sticky lg:top-24">
    <div className="bg-white rounded-lg border border-slate-200/90 shadow-doff-sm overflow-hidden">
      <div className="px-5 py-4 bg-[#132238] text-white space-y-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-doff-gold">
          Ringkasan Posisi
        </div>
        <div className="font-bold text-sm sm:text-base leading-snug">{career.title}</div>
      </div>

      <div className="p-5 space-y-4">
        <dl className="space-y-3 text-xs">
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
            <dt className="text-slate-500">Divisi</dt>
            <dd className="font-semibold text-doff-navy text-right">{career.division}</dd>
          </div>
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
            <dt className="text-slate-500">Tipe Kerja</dt>
            <dd className="font-semibold text-doff-navy text-right">{career.employmentType}</dd>
          </div>
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
            <dt className="text-slate-500">Penempatan</dt>
            <dd className="font-semibold text-doff-navy text-right">{career.location}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-slate-500">Status</dt>
            <dd className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              Aktif Menerima Lamaran
            </dd>
          </div>
        </dl>

        <div className="pt-2 space-y-2.5">
          <a
            href={career.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordCareerApplyClick(career.id)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-doff-navy hover:bg-doff-navydark text-white text-xs sm:text-sm font-bold transition-colors shadow-doff-sm"
          >
            <span>Lamar Sekarang</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-[11px] text-slate-500 text-center leading-relaxed">
            Pendaftaran akan diarahkan ke formulir resmi tim HRD CV. Sevine Indonesia.
          </p>
        </div>
      </div>
    </div>

    {otherCareers.length > 0 && (
      <div className="bg-white rounded-lg border border-slate-200/90 shadow-doff-sm p-5 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-doff-navy">
          Lowongan Aktif Lainnya
        </h2>
        <div className="divide-y divide-slate-100">
          {otherCareers.map((item) => (
            <Link
              key={item.id}
              href={`/careers/${item.slug}`}
              className="group py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3"
            >
              <div className="min-w-0 space-y-0.5">
                <div className="text-xs font-bold text-doff-navy group-hover:text-doff-terracotta truncate transition-colors">
                  {item.title}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                  <MapPin className="w-3 h-3 text-doff-terracotta shrink-0" />
                  <span>{item.location}</span>
                  <span>&middot;</span>
                  <span>{item.employmentType}</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-doff-terracotta group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    )}
  </aside>
);
