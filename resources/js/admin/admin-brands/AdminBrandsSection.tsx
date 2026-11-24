import React, { useState } from 'react';
import { Edit2, ExternalLink, Package, Store } from 'lucide-react';
import { AdminBrandItem, AdminProductItem } from '../../types/AdminDashboardTypes';
import { AdminBrandFormModal } from './AdminBrandFormModal';
import { PublicSectionLink } from '../admin-shared/PublicSyncBadge';

interface AdminBrandsSectionProps {
  brands: AdminBrandItem[];
  products: AdminProductItem[];
  onUpdateBrand: (updated: AdminBrandItem) => void;
}

export const AdminBrandsSection: React.FC<AdminBrandsSectionProps> = ({
  brands,
  products,
  onUpdateBrand,
}) => {
  const [editingBrand, setEditingBrand] = useState<AdminBrandItem | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-doff-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-bold text-doff-navy text-base flex items-center gap-2">
            <Store className="w-4 h-4 text-doff-terracotta" />
            <span>5 Lini Brand Ekosistem CV. Sevine Indonesia</span>
          </h3>
          <p className="text-xs text-slate-500">
            Kelola deskripsi, target pasar, dan tautan etalase resmi masing-masing lini brand.
          </p>
        </div>
        <PublicSectionLink href="/#brands" label="Lihat di Website" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {brands.map((brand) => {
          const skuCount = products.filter((p) => p.brand === brand.key).length;
          return (
            <div
              key={brand.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-doff-sm p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-md ${brand.badgeColor}`}>
                    {brand.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingBrand(brand)}
                    className="p-1.5 text-slate-400 hover:text-doff-navy rounded hover:bg-slate-100 cursor-pointer"
                    title="Edit Brand"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-sm text-doff-navy">{brand.tagline}</div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {brand.description}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-slate-400" />
                    Model Terdaftar
                  </span>
                  <strong className="font-mono text-doff-navy">{skuCount} SKU</strong>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Target Pasar Utama
                  </div>
                  <p className="text-xs text-slate-700 font-medium">{brand.targetMarket}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <a
                  href={brand.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 bg-slate-50 hover:bg-doff-navy hover:text-white text-doff-navy text-xs font-bold rounded-lg border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Buka Etalase Brand</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <AdminBrandFormModal
        brand={editingBrand}
        onClose={() => setEditingBrand(null)}
        onSave={onUpdateBrand}
      />
    </div>
  );
};
