import React from 'react';
import {
  AdminCareerItem,
  AdminCategoryItem,
  AdminEventItem,
  AdminMenuKey,
  AdminPartnerItem,
  AdminProductItem,
} from '../../types/AdminDashboardTypes';

interface AdminOverviewKpiStripProps {
  products: AdminProductItem[];
  categories: AdminCategoryItem[];
  careers: AdminCareerItem[];
  events: AdminEventItem[];
  partners: AdminPartnerItem[];
  canOpen: (key: AdminMenuKey) => boolean;
  onNavigateMenu: (key: AdminMenuKey) => void;
}

export const AdminOverviewKpiStrip: React.FC<AdminOverviewKpiStripProps> = ({
  products,
  categories,
  careers,
  events,
  partners,
  canOpen,
  onNavigateMenu,
}) => {
  const activeProducts = products.filter((p) => p.status === 'Produksi Aktif').length;
  const qcProducts = products.filter((p) => p.status === 'Review QC').length;
  const draftProducts = products.filter((p) => p.status === 'Draft Sampling').length;
  const pendingProducts = qcProducts + draftProducts;
  const activeCategories = categories.filter((c) => c.isActive).length;

  const activeCareers = careers.filter((c) => c.isActive).length;
  const closedCareers = careers.length - activeCareers;
  const activePartners = partners.filter((p) => p.status === 'Mitra Aktif').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. SKU Tayang Publik */}
      <button
        type="button"
        disabled={!canOpen('products')}
        onClick={() => onNavigateMenu('products')}
        className="text-left bg-white border border-doff-border rounded-xl p-4 shadow-doff-sm hover:border-doff-navy/40 transition-colors space-y-2 cursor-pointer disabled:cursor-default"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-doff-slate">SKU Tayang Publik</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Tayang
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-2xl font-bold text-doff-navy">{activeProducts}</span>
          <span className="text-xs font-mono text-doff-muted">dari {products.length} SKU</span>
        </div>
        <p className="text-[11px] text-doff-muted">
          Tersebar di {activeCategories} kategori katalog aktif
        </p>
      </button>

      {/* 2. Belum Tayang (QC & Draft) */}
      <button
        type="button"
        disabled={!canOpen('products')}
        onClick={() => onNavigateMenu('products')}
        className="text-left bg-white border border-doff-border rounded-xl p-4 shadow-doff-sm hover:border-doff-navy/40 transition-colors space-y-2 cursor-pointer disabled:cursor-default"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-doff-slate">Belum Tayang (Internal)</span>
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${
              pendingProducts > 0
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
          >
            {pendingProducts > 0 ? 'Perlu Cek' : 'Bersih'}
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-2xl font-bold text-doff-navy">{pendingProducts}</span>
          <span className="text-xs font-mono text-doff-muted">SKU tertahan</span>
        </div>
        <p className="text-[11px] text-doff-muted">
          {qcProducts} Review QC · {draftProducts} Draft Sampling
        </p>
      </button>

      {/* 3. Lowongan Kerja */}
      <button
        type="button"
        disabled={!canOpen('careers')}
        onClick={() => onNavigateMenu('careers')}
        className="text-left bg-white border border-doff-border rounded-xl p-4 shadow-doff-sm hover:border-doff-navy/40 transition-colors space-y-2 cursor-pointer disabled:cursor-default"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-doff-slate">Lowongan Dibuka</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-100 text-doff-navy border border-slate-200">
            {careers.length} Total
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-2xl font-bold text-doff-navy">{activeCareers}</span>
          <span className="text-xs font-mono text-doff-muted">posisi aktif</span>
        </div>
        <p className="text-[11px] text-doff-muted">
          {closedCareers} posisi ditutup · Ngawi, Malang, Remote
        </p>
      </button>

      {/* 4. Mitra & Event (Dipisah Jelas, Tidak Dijumlahkan) */}
      <div className="bg-white border border-doff-border rounded-xl p-4 shadow-doff-sm flex flex-col justify-between space-y-2">
        <span className="text-xs font-semibold text-doff-slate">Publikasi Mitra &amp; Event</span>
        <div className="grid grid-cols-2 divide-x divide-doff-border pt-0.5">
          <button
            type="button"
            disabled={!canOpen('collaborations')}
            onClick={() => onNavigateMenu('collaborations')}
            className="text-left pr-3 hover:opacity-80 transition-opacity cursor-pointer disabled:cursor-default"
          >
            <div className="font-mono text-2xl font-bold text-doff-navy">{activePartners}</div>
            <div className="text-[11px] text-doff-muted">Mitra aktif</div>
          </button>
          <button
            type="button"
            disabled={!canOpen('events')}
            onClick={() => onNavigateMenu('events')}
            className="text-left pl-3 hover:opacity-80 transition-opacity cursor-pointer disabled:cursor-default"
          >
            <div className="font-mono text-2xl font-bold text-doff-navy">{events.length}</div>
            <div className="text-[11px] text-doff-muted">Event tampil</div>
          </button>
        </div>
        <p className="text-[11px] text-doff-muted">
          Tampil terpisah di carousel mitra dan galeri event
        </p>
      </div>
    </div>
  );
};
