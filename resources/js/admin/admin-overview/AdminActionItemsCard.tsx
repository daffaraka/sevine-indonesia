import React, { useMemo } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  AdminBrandItem,
  AdminCareerItem,
  AdminMenuKey,
  AdminProductItem,
} from '../../types/AdminDashboardTypes';

interface OverviewActionItem {
  id: string;
  tag: string;
  tone: 'amber' | 'red' | 'slate';
  title: string;
  detail: string;
  targetMenu: AdminMenuKey;
  actionLabel: string;
}

interface AdminActionItemsCardProps {
  products: AdminProductItem[];
  brands: AdminBrandItem[];
  careers: AdminCareerItem[];
  canOpen: (key: AdminMenuKey) => boolean;
  onNavigateMenu: (key: AdminMenuKey) => void;
}

const TAG_STYLES: Record<OverviewActionItem['tone'], string> = {
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  slate: 'bg-slate-100 text-slate-600 border-slate-200',
};

export const AdminActionItemsCard: React.FC<AdminActionItemsCardProps> = ({
  products,
  brands,
  careers,
  canOpen,
  onNavigateMenu,
}) => {
  const actionItems = useMemo<OverviewActionItem[]>(() => {
    const list: OverviewActionItem[] = [];

    products.forEach((product) => {
      if (product.status !== 'Produksi Aktif') {
        list.push({
          id: `prod-status-${product.id}`,
          tag: product.status,
          tone: 'amber',
          title: `${product.sku} · ${product.name}`,
          detail: 'Belum tayang di katalog publik. Ubah ke Produksi Aktif bila siap dipublikasikan.',
          targetMenu: 'products',
          actionLabel: 'Periksa SKU',
        });
      } else if (!product.images || product.images.length === 0) {
        list.push({
          id: `prod-img-${product.id}`,
          tag: 'Tanpa Foto',
          tone: 'red',
          title: `${product.sku} · ${product.name}`,
          detail: 'Status sudah aktif tetapi belum memiliki foto produk.',
          targetMenu: 'products',
          actionLabel: 'Lengkapi Foto',
        });
      }
    });

    brands.forEach((brand) => {
      if (!brand.shopeeUrl.startsWith('https://shopee.co.id/')) {
        list.push({
          id: `brand-link-${brand.id}`,
          tag: 'Link Shopee',
          tone: 'red',
          title: brand.name,
          detail: 'Format tautan etalase Shopee perlu diperiksa sebelum diklik pengunjung.',
          targetMenu: 'brands',
          actionLabel: 'Perbaiki Link',
        });
      }
    });

    careers.forEach((career) => {
      if (career.isActive && (!career.googleFormUrl.startsWith('https://') || career.googleFormUrl.includes('/edit'))) {
        list.push({
          id: `career-link-${career.id}`,
          tag: 'Link Form',
          tone: 'red',
          title: career.title,
          detail: 'Tautan Google Form tidak valid atau masih memakai link mode edit.',
          targetMenu: 'careers',
          actionLabel: 'Cek Tautan',
        });
      } else if (!career.isActive) {
        list.push({
          id: `career-closed-${career.id}`,
          tag: 'Ditutup',
          tone: 'slate',
          title: `${career.title} (${career.location})`,
          detail: 'Lowongan berstatus arsip dan tidak ditampilkan di portal karir.',
          targetMenu: 'careers',
          actionLabel: 'Kelola Karir',
        });
      }
    });

    return list;
  }, [products, brands, careers]);

  return (
    <div className="bg-white rounded-xl border border-doff-border shadow-doff-sm p-5 space-y-4">
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-doff-navy text-sm">Perlu Tindakan Hari Ini</h3>
          <p className="text-xs text-doff-muted">
            Daftar data yang belum tayang publik, belum lengkap, atau berstatus arsip.
          </p>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-doff-navy font-mono text-[11px] font-semibold shrink-0">
          {actionItems.length} item
        </span>
      </div>

      {actionItems.length === 0 ? (
        <div className="p-6 rounded-lg bg-emerald-50/60 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-900">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Seluruh SKU aktif, lowongan terbuka, dan tautan eksternal dalam kondisi siap tayang.</span>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {actionItems.map((item) => (
            <div
              key={item.id}
              className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${
                      TAG_STYLES[item.tone]
                    }`}
                  >
                    {item.tag}
                  </span>
                  <span className="text-xs font-bold text-doff-navy truncate">{item.title}</span>
                </div>
                <p className="text-[11px] text-doff-muted">{item.detail}</p>
              </div>

              {canOpen(item.targetMenu) && (
                <button
                  type="button"
                  onClick={() => onNavigateMenu(item.targetMenu)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-doff-border bg-slate-50 hover:bg-doff-navy hover:text-white text-doff-navy text-[11px] font-semibold transition-colors shrink-0 self-start sm:self-center cursor-pointer"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
