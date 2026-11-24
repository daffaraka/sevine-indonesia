import React from 'react';
import { Download, Search, Upload } from 'lucide-react';
import {
  AdminCategoryItem,
  AdminProductItem,
  BrandCategory,
} from '../../types/AdminDashboardTypes';
import { AdminButton } from './AdminButton';
import { PublicSectionLink } from '../admin-shared/PublicSyncBadge';

interface AdminDatatableToolbarProps {
  products: AdminProductItem[];
  categories: AdminCategoryItem[];
  currentBrand: BrandCategory | 'all';
  searchQuery: string;
  selectedCategory: string;
  selectedStatus: string;
  onSelectBrand: (brand: BrandCategory | 'all') => void;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onAddProduct: () => void;
  onImportCsv: () => void;
  onExportCsv: () => void;
}

const BRAND_KEYS: { key: BrandCategory; label: string }[] = [
  { key: 'SEVINE', label: 'SEVINE Bag' },
  { key: 'klou', label: 'klou Apparel' },
  { key: 'LALUNA', label: 'LALUNA Bag' },
  { key: 'ASSAIF', label: 'ASSAIF Muslim' },
  { key: 'NABIRA', label: 'NABIRA Muslim' },
];

export const AdminDatatableToolbar: React.FC<AdminDatatableToolbarProps> = ({
  products,
  categories,
  currentBrand,
  searchQuery,
  selectedCategory,
  selectedStatus,
  onSelectBrand,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onAddProduct,
  onImportCsv,
  onExportCsv,
}) => {
  return (
    <div className="p-4 border-b border-doff-border space-y-3 bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold tracking-wide text-doff-navy">
            Daftar Katalog Produk &amp; Spesifikasi Manufaktur
          </h2>
          <p className="text-xs text-doff-muted font-mono">
            Total {products.length} model produk terdaftar pada state aktif
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PublicSectionLink href="/catalog" label="Katalog Publik" />
          <AdminButton
            variant="import"
            icon={<Upload className="w-3.5 h-3.5" />}
            onClick={onImportCsv}
          >
            Impor CSV
          </AdminButton>
          <AdminButton
            variant="export"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={onExportCsv}
          >
            Ekspor CSV
          </AdminButton>
          <AdminButton variant="primary" onClick={onAddProduct}>
            + Tambah Produk
          </AdminButton>
        </div>
      </div>

      {/* Search & Filter Dropdowns */}
      <div className="pt-1 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari SKU, nama model, kategori..."
            className="w-full bg-white border border-doff-border rounded px-3 py-1.5 pl-8 text-xs text-doff-navy placeholder-doff-muted focus:outline-none focus:border-doff-navy focus:ring-1 focus:ring-doff-navy shadow-sm"
          />
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-doff-muted" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={currentBrand}
            onChange={(e) => onSelectBrand(e.target.value as BrandCategory | 'all')}
            aria-label="Filter Brand"
            className="bg-white border border-doff-border rounded px-2.5 py-1.5 text-xs text-doff-navy focus:outline-none focus:border-doff-navy cursor-pointer shadow-sm"
          >
            <option value="all">Semua Brand ({products.length})</option>
            {BRAND_KEYS.map((tab) => {
              const count = products.filter((p) => p.brand === tab.key).length;
              return (
                <option key={tab.key} value={tab.key}>
                  {tab.label} ({count})
                </option>
              );
            })}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter Kategori"
            className="bg-white border border-doff-border rounded px-2.5 py-1.5 text-xs text-doff-navy focus:outline-none focus:border-doff-navy cursor-pointer shadow-sm"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter Status"
            className="bg-white border border-doff-border rounded px-2.5 py-1.5 text-xs text-doff-navy focus:outline-none focus:border-doff-navy cursor-pointer shadow-sm"
          >
            <option value="all">Semua Status</option>
            <option value="Produksi Aktif">Produksi Aktif</option>
            <option value="Review QC">Review QC</option>
            <option value="Draft Sampling">Draft Sampling</option>
          </select>
        </div>
      </div>
    </div>
  );
};
