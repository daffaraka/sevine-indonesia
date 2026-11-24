import React, { useState } from 'react';
import { Layers, Plus } from 'lucide-react';
import { AdminCategoryItem, AdminProductItem } from '../../types/AdminDashboardTypes';
import { AdminCategoryFormModal } from './AdminCategoryFormModal';
import { PublicSectionLink, PublicVisibilityBadge } from '../admin-shared/PublicSyncBadge';
import { AdminDeleteConfirmModal } from '../admin-shared/AdminDeleteConfirmModal';
import { TableDeleteActionButton, TableEditActionButton } from '../admin-shared/TableActionButtons';

interface AdminCategoriesSectionProps {
  categories: AdminCategoryItem[];
  products: AdminProductItem[];
  onSaveCategory: (payload: Omit<AdminCategoryItem, 'id'>, editId?: string) => void;
  onDeleteCategory: (id: string) => void;
}

export const AdminCategoriesSection: React.FC<AdminCategoriesSectionProps> = ({
  categories,
  products,
  onSaveCategory,
  onDeleteCategory,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategoryItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ item: AdminCategoryItem; skuCount: number } | null>(null);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-doff-sm p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-doff-navy text-base flex items-center gap-2">
            <Layers className="w-4 h-4 text-doff-terracotta" />
            <span>Manajemen Kategori Produk</span>
          </h3>
          <p className="text-xs text-slate-500">
            Pengelompokan produk aktif yang terhubung ke filter dan formulir Katalog Produk.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <PublicSectionLink href="/catalog" label="Lihat Filter Publik" />
          <button
            type="button"
            onClick={() => {
              setEditingCategory(null);
              setIsModalOpen(true);
            }}
            className="px-3 py-1.5 bg-doff-navy text-white text-xs font-bold rounded-lg hover:bg-doff-navydark flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Kategori</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200/80">
            <tr>
              <th className="py-2.5 px-3">Nama Kategori</th>
              <th className="py-2.5 px-3">Deskripsi</th>
              <th className="py-2.5 px-3">Produk Terkait</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {categories.map((cat) => {
              const skuCount = products.filter((p) => p.category === cat.name).length;
              return (
                <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-doff-navy whitespace-nowrap">
                    {cat.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 max-w-md">{cat.description}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="font-mono font-bold text-doff-navy bg-slate-100 px-2 py-0.5 rounded">
                      {skuCount} SKU
                    </span>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <PublicVisibilityBadge
                      isPublished={cat.isActive}
                      publishedLabel="Aktif di Katalog"
                      hiddenLabel="Nonaktif"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <TableEditActionButton
                        title="Edit Kategori"
                        onClick={() => {
                          setEditingCategory(cat);
                          setIsModalOpen(true);
                        }}
                      />
                      <TableDeleteActionButton
                        title="Hapus Kategori"
                        onClick={() => setDeleteTarget({ item: cat, skuCount })}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AdminCategoryFormModal
        isOpen={isModalOpen}
        editingCategory={editingCategory}
        onClose={() => setIsModalOpen(false)}
        onSave={onSaveCategory}
      />

      <AdminDeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Konfirmasi Hapus Kategori"
        targetName={deleteTarget?.item.name || ''}
        warningDetail={
          deleteTarget && deleteTarget.skuCount > 0
            ? `Peringatan: Masih terdapat ${deleteTarget.skuCount} SKU produk yang memakai kategori ini.`
            : 'Kategori yang dihapus akan hilang dari daftar master dan pilihan filter katalog.'
        }
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          onDeleteCategory(deleteTarget.item.id);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
};
