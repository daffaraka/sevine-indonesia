import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  AdminBrandItem,
  AdminMenuKey,
  AdminProductItem,
} from '../../types/AdminDashboardTypes';

interface AdminBrandStatusSummaryCardProps {
  brands: AdminBrandItem[];
  products: AdminProductItem[];
  canOpen: (key: AdminMenuKey) => boolean;
  onNavigateMenu: (key: AdminMenuKey) => void;
}

export const AdminBrandStatusSummaryCard: React.FC<AdminBrandStatusSummaryCardProps> = ({
  brands,
  products,
  canOpen,
  onNavigateMenu,
}) => {
  return (
    <div className="bg-white rounded-xl border border-doff-border shadow-doff-sm p-5 space-y-4">
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-doff-navy text-sm">Kesiapan Katalog per Brand</h3>
          <p className="text-[11px] text-doff-muted">Rincian SKU tayang vs belum tayang</p>
        </div>
        {canOpen('products') && (
          <button
            type="button"
            onClick={() => onNavigateMenu('products')}
            className="text-xs font-semibold text-doff-navy hover:underline inline-flex items-center gap-0.5 cursor-pointer shrink-0"
          >
            <span>Katalog</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="space-y-3.5">
        {brands.map((brand) => {
          const brandProducts = products.filter((p) => p.brand === brand.key);
          const total = brandProducts.length;
          const active = brandProducts.filter((p) => p.status === 'Produksi Aktif').length;
          const pending = total - active;
          const activePct = total > 0 ? Math.round((active / total) * 100) : 0;
          const pendingPct = total > 0 ? 100 - activePct : 0;

          return (
            <div key={brand.id} className="space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${brand.badgeColor}`}>
                    {brand.key}
                  </span>
                  <span className="font-mono text-[11px] text-doff-muted">{total} SKU</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] shrink-0">
                  <span className="text-emerald-700 font-semibold">{active} tayang</span>
                  {pending > 0 && (
                    <span className="text-amber-700 font-semibold">{pending} pending</span>
                  )}
                </div>
              </div>

              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                {activePct > 0 && (
                  <div style={{ width: `${activePct}%` }} className="h-full bg-emerald-500" />
                )}
                {pendingPct > 0 && (
                  <div style={{ width: `${pendingPct}%` }} className="h-full bg-amber-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-doff-muted">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Tayang Publik
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            QC / Draft
          </span>
        </div>
        {canOpen('brands') && (
          <button
            type="button"
            onClick={() => onNavigateMenu('brands')}
            className="font-semibold text-doff-navy hover:underline cursor-pointer"
          >
            Kelola Brand
          </button>
        )}
      </div>
    </div>
  );
};
