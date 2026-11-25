import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ChevronRight, Home, MapPin } from 'lucide-react';
import { CareerPublicItem } from '../../types/CompanyProfileTypes';

interface CareerDetailHeroProps {
  career: CareerPublicItem;
}

export const CareerDetailHero: React.FC<CareerDetailHeroProps> = ({ career }) => (
  <header className="bg-gradient-to-b from-white to-doff-subtle/70 border-b border-slate-200/80 pt-7 pb-9 sm:pt-9 sm:pb-11">
    <div className="w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 min-w-0">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-doff-navy transition-colors shrink-0">
            <Home className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <Link href="/#careers" className="hover:text-doff-navy transition-colors shrink-0">
            Karir
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="font-semibold text-doff-navy truncate">{career.title}</span>
        </nav>

        <Link
          href="/#careers"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-doff-navy hover:text-doff-terracotta transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Daftar Lowongan</span>
        </Link>
      </div>

      <div className="space-y-3 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-doff-navy/10 text-doff-navy">
            {career.division}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            {career.employmentType}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-doff-navy tracking-tight leading-tight">
          {career.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-doff-terracotta shrink-0" />
            <span>Penempatan: {career.location}</span>
          </span>
          {career.updatedAt && (
            <span className="text-slate-400">Diperbarui {career.updatedAt}</span>
          )}
        </div>
      </div>
    </div>
  </header>
);
