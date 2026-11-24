import React from 'react';
import { AdminProductItem } from '../../types/AdminDashboardTypes';
import { AdminDatatableTableRow } from './AdminDatatableTableRow';

interface AdminDatatableTableProps {
  items: AdminProductItem[];
  selectedIds: Set<number>;
  sortField: 'sku' | 'name' | 'capacity';
  sortOrder: 'asc' | 'desc';
  onSort: (field: 'sku' | 'name' | 'capacity') => void;
  onToggleSelectAll: (checked: boolean) => void;
  onToggleSelect: (id: number, checked: boolean) => void;
  onEdit: (item: AdminProductItem) => void;
  onDelete: (item: AdminProductItem) => void;
}

export const AdminDatatableTable: React.FC<AdminDatatableTableProps> = ({
  items,
  selectedIds,
  sortField,
  sortOrder,
  onSort,
  onToggleSelectAll,
  onToggleSelect,
  onEdit,
  onDelete,
}) => {
  const isAllSelected = items.length > 0 && items.every((item) => selectedIds.has(item.id));

  return (
    <div className="overflow-x-auto bg-white">
      <table className="w-full text-left text-xs">
        <thead className="bg-doff-subtle/80 text-doff-muted font-mono text-[11px] uppercase tracking-wider border-b border-doff-border">
          <tr>
            <th className="p-3 w-10 text-center">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => onToggleSelectAll(e.target.checked)}
                className="rounded border-doff-border text-doff-navy focus:ring-0 focus:ring-offset-0 cursor-pointer"
                aria-label="Pilih Semua Baris"
              />
            </th>
            <th
              className="p-3 font-semibold cursor-pointer hover:text-doff-navy select-none"
              onClick={() => onSort('sku')}
            >
              SKU Kode {sortField === 'sku' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
            </th>
            <th
              className="p-3 font-semibold cursor-pointer hover:text-doff-navy select-none"
              onClick={() => onSort('name')}
            >
              Model &amp; Brand {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
            </th>
            <th className="p-3 font-semibold">Kategori</th>
            <th className="p-3 font-semibold">Swatch Warna</th>
            <th
              className="p-3 font-semibold cursor-pointer hover:text-doff-navy select-none"
              onClick={() => onSort('capacity')}
            >
              Output Pabrik {sortField === 'capacity' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
            </th>
            <th className="p-3 font-semibold">Status</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-doff-border/70 font-mono bg-white">
          {items.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-8 text-center text-doff-muted font-sans">
                Tidak ada data produk yang sesuai kriteria filter.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <AdminDatatableTableRow
                key={item.id}
                item={item}
                isSelected={selectedIds.has(item.id)}
                onToggleSelect={onToggleSelect}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
