import React from 'react';
import { AdminProductItem } from '../../types/AdminDashboardTypes';
import { PublicVisibilityBadge } from '../admin-shared/PublicSyncBadge';
import {
  TableDeleteActionButton,
  TableEditActionButton,
  TableViewActionButton,
} from '../admin-shared/TableActionButtons';

interface AdminDatatableTableRowProps {
  item: AdminProductItem;
  isSelected: boolean;
  onToggleSelect: (id: number, checked: boolean) => void;
  onEdit: (item: AdminProductItem) => void;
  onDelete: (item: AdminProductItem) => void;
}

const STATUS_STYLES: Record<string, string> = {
  'Produksi Aktif': 'text-emerald-700 bg-emerald-50 border-emerald-200',
  'Review QC': 'text-amber-800 bg-amber-50 border-amber-200',
  'Draft Sampling': 'text-doff-muted bg-doff-subtle border-doff-border',
};

export const AdminDatatableTableRow: React.FC<AdminDatatableTableRowProps> = ({
  item,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className={`hover:bg-doff-subtle/40 transition-colors ${isSelected ? 'bg-blue-50/60' : ''}`}>
      <td className="p-3 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onToggleSelect(item.id, e.target.checked)}
          className="rounded border-doff-border text-doff-navy focus:ring-0 focus:ring-offset-0 cursor-pointer"
          aria-label={`Pilih ${item.name}`}
        />
      </td>
      <td className="p-3 font-mono font-medium text-doff-navy whitespace-nowrap">{item.sku}</td>
      <td className="p-3">
        <div className="min-w-0 space-y-0.5">
          <p className="font-sans font-medium text-doff-navy truncate max-w-[240px]">
            {item.name}
          </p>
          <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-mono uppercase bg-doff-subtle border border-doff-border text-doff-muted">
            {item.brand}
          </span>
        </div>
      </td>
      <td className="p-3 text-doff-slate font-sans whitespace-nowrap">{item.category}</td>
      <td className="p-3">
        <div className="flex items-center gap-1.5">
          {item.swatches.map((swatch, idx) => (
            <span
              key={`${swatch.hex}-${idx}`}
              className="w-3.5 h-3.5 rounded-full border border-doff-border shadow-2xs"
              style={{ backgroundColor: swatch.hex }}
              title={`${swatch.name} (${swatch.hex})`}
            />
          ))}
        </div>
      </td>
      <td className="p-3 text-doff-slate font-mono whitespace-nowrap">{item.capacity}</td>
      <td className="p-3 whitespace-nowrap">
        <div className="flex flex-col items-start gap-1">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] border font-mono font-medium shadow-2xs ${
              STATUS_STYLES[item.status] || 'text-doff-muted bg-doff-subtle border-doff-border'
            }`}
          >
            {item.status}
          </span>
          <PublicVisibilityBadge
            isPublished={item.status === 'Produksi Aktif'}
            publishedLabel="Tampil di Katalog"
            hiddenLabel="Internal"
          />
        </div>
      </td>
      <td className="p-3 text-right whitespace-nowrap">
        <div className="inline-flex items-center gap-1.5">
          <TableViewActionButton
            href="/catalog"
            title="Lihat di Katalog Publik"
            ariaLabel={`Lihat ${item.name} di Katalog Publik`}
          />
          <TableEditActionButton
            onClick={() => onEdit(item)}
            title="Edit Produk"
            ariaLabel={`Edit ${item.name}`}
          />
          <TableDeleteActionButton
            onClick={() => onDelete(item)}
            title="Hapus Produk"
            ariaLabel={`Hapus ${item.name}`}
          />
        </div>
      </td>
    </tr>
  );
};
