import React, { useState } from 'react';
import {
  AdminCategoryItem,
  AdminProductItem,
  ProductStatus,
} from '../../types/AdminDashboardTypes';
import { exportRowsToCsv } from '../../services/AdminDashboardService';
import { useAdminProductTable } from './useAdminProductTable';
import { AdminDatatableToolbar } from './AdminDatatableToolbar';
import { AdminDatatableBulkBar } from './AdminDatatableBulkBar';
import { AdminDatatableTable } from './AdminDatatableTable';
import { AdminDatatablePagination } from './AdminDatatablePagination';
import { AdminProductFormModal } from './AdminProductFormModal';
import { AdminProductCsvImportModal } from './AdminProductCsvImportModal';
import { AdminDeleteConfirmModal } from '../admin-shared/AdminDeleteConfirmModal';

interface AdminProductDatatableProps {
  products: AdminProductItem[];
  categories: AdminCategoryItem[];
  externalSearch: string;
  onSaveProduct: (payload: Omit<AdminProductItem, 'id'>, editId?: number) => void;
  onImportProducts: (items: Omit<AdminProductItem, 'id'>[]) => void;
  onDeleteProducts: (ids: number[]) => void;
  onBulkUpdateStatus: (ids: number[], status: ProductStatus) => void;
  onShowAlert: (msg: string, type: 'info' | 'success' | 'warning') => void;
}

export const AdminProductDatatable: React.FC<AdminProductDatatableProps> = ({
  products,
  categories,
  externalSearch,
  onSaveProduct,
  onImportProducts,
  onDeleteProducts,
  onBulkUpdateStatus,
  onShowAlert,
}) => {
  const table = useAdminProductTable(products, externalSearch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProductItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ ids: number[]; label: string } | null>(null);

  const exportList = (list: AdminProductItem[], label: string) => {
    exportRowsToCsv(
      'katalog-produk-sevine.csv',
      ['SKU', 'Nama Produk', 'Brand', 'Kategori', 'Kapasitas', 'Status'],
      list.map((p) => [p.sku, p.name, p.brand, p.category, p.capacity, p.status]),
    );
    onShowAlert(`${list.length} data ${label} berhasil diunduh (CSV).`, 'success');
  };

  return (
    <div className="bg-white border border-doff-border rounded-lg overflow-hidden flex flex-col shadow-md">
      <AdminDatatableToolbar
        products={products}
        categories={categories}
        currentBrand={table.currentBrand}
        searchQuery={table.searchQuery}
        selectedCategory={table.selectedCategory}
        selectedStatus={table.selectedStatus}
        onSelectBrand={table.setCurrentBrand}
        onSearchChange={table.setSearchQuery}
        onCategoryChange={table.setSelectedCategory}
        onStatusChange={table.setSelectedStatus}
        onAddProduct={() => {
          setEditingProduct(null);
          setIsModalOpen(true);
        }}
        onImportCsv={() => setIsImportModalOpen(true)}
        onExportCsv={() => exportList(table.filteredProducts, 'produk terfilter')}
      />

      <AdminDatatableBulkBar
        selectedCount={table.selectedIds.size}
        onBulkUpdateStatus={(status) => {
          onBulkUpdateStatus(Array.from(table.selectedIds), status);
          table.setSelectedIds(new Set());
        }}
        onBulkExport={() =>
          exportList(
            products.filter((p) => table.selectedIds.has(p.id)),
            'produk terpilih',
          )
        }
        onBulkDelete={() =>
          setDeleteTarget({
            ids: Array.from(table.selectedIds),
            label: `${table.selectedIds.size} produk terpilih`,
          })
        }
      />

      <AdminDatatableTable
        items={table.paginatedProducts}
        selectedIds={table.selectedIds}
        sortField={table.sortField}
        sortOrder={table.sortOrder}
        onSort={table.handleSort}
        onToggleSelectAll={table.handleToggleSelectAll}
        onToggleSelect={table.handleToggleSelect}
        onEdit={(item) => {
          setEditingProduct(item);
          setIsModalOpen(true);
        }}
        onDelete={(item) =>
          setDeleteTarget({
            ids: [item.id],
            label: `${item.sku} (${item.name})`,
          })
        }
      />

      <AdminDatatablePagination
        filteredCount={table.filteredProducts.length}
        currentPage={table.safePage}
        pageSize={table.pageSize}
        onPageChange={table.setCurrentPage}
        onPageSizeChange={table.setPageSize}
      />

      <AdminProductFormModal
        isOpen={isModalOpen}
        editingProduct={editingProduct}
        categories={categories}
        onClose={() => setIsModalOpen(false)}
        onSave={onSaveProduct}
      />

      <AdminProductCsvImportModal
        isOpen={isImportModalOpen}
        existingProducts={products}
        categories={categories}
        onClose={() => setIsImportModalOpen(false)}
        onImportProducts={onImportProducts}
      />

      <AdminDeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Konfirmasi Hapus Produk"
        targetName={deleteTarget?.label || ''}
        warningDetail="Produk yang dihapus akan hilang dari daftar katalog aktif dan seleksi tabel saat ini."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          onDeleteProducts(deleteTarget.ids);
          const next = new Set(table.selectedIds);
          deleteTarget.ids.forEach((id) => next.delete(id));
          table.setSelectedIds(next);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
};
