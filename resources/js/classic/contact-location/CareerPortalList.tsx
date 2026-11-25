import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, Briefcase, MapPin } from 'lucide-react';
import { CareerPublicItem } from '../../types/CompanyProfileTypes';

interface CareerPortalListProps {
  id?: string;
  careers?: CareerPublicItem[];
}

export const CareerPortalList: React.FC<CareerPortalListProps> = ({
  id = 'careers',
  careers = [],
}) => {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative py-14 sm:py-16 md:py-20 bg-doff-subtle border-t border-slate-200/80 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#1B2E4B]/15 to-transparent" />
      <div className="relative w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1.5 min-w-0">
            <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
              Portal Karir Sevine
            </div>
            <h2
              id={`${id}-heading`}
              className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-doff-navy tracking-tight"
            >
              Peluang Bergabung Bersama Tim Kami
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-doff-navy shadow-doff-sm shrink-0">
            <Briefcase className="w-3.5 h-3.5 text-doff-terracotta" />
            <span>{careers.length} Lowongan Aktif</span>
          </span>
        </div>

        {careers.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200/80 p-5 sm:p-8 text-center text-xs sm:text-sm text-slate-500">
            Saat ini belum ada lowongan aktif yang dibuka. Pantau terus pembaruan dari tim HRD CV. Sevine Indonesia.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5">
            {careers.map((career) => (
              <Link
                key={career.id}
                href={`/careers/${career.slug}`}
                className="group bg-white rounded-lg border border-slate-200/90 shadow-doff-sm hover:shadow-doff-md hover:border-doff-navy/30 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col justify-between min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-doff-navy"
              >
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-doff-navy/10 text-doff-navy truncate">
                      {career.division}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                      {career.employmentType}
                    </span>
                  </div>

                  <h3 className="font-bold text-doff-navy group-hover:text-doff-terracotta text-base sm:text-lg leading-snug break-words transition-colors">
                    {career.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-doff-terracotta shrink-0" />
                    <span className="truncate">{career.location}</span>
                  </div>
                </div>

                <div className="px-4 sm:px-5 py-3 bg-[#132238] border-t border-slate-800 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-medium text-slate-300 truncate">
                    Detail &amp; Kualifikasi
                  </span>
                  <span className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-md bg-white/10 border border-white/15 group-hover:bg-doff-terracotta group-hover:border-doff-terracotta text-white text-xs font-semibold transition-colors shrink-0">
                    <span>Lihat Lamaran</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
