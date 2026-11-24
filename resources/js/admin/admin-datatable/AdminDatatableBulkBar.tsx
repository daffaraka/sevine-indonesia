import React, { useState } from 'react';
import { ProductStatus } from '../../types/AdminDashboardTypes';
import { AdminButton } from './AdminButton';

interface AdminDatatableBulkBarProps {
  selectedCount: number;
  onBulkUpdateStatus: (status: ProductStatus) => void;
  onBulkExport: () => void;
  onBulkDelete: () => void;
}

export const AdminDatatableBulkBar: React.FC<AdminDatatableBulkBarProps> = ({
  selectedCount,
  onBulkUpdateStatus,
  onBulkExport,
  onBulkDelete,
}) => {
  const [targetStatus, setTargetStatus] = useState<ProductStatus>('Produksi Aktif');

  if (selectedCount === 0) return null;

  return (
    <div className="bg-blue-50/90 border-b border-blue-200 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-doff-navy shadow-sm">
      <div className="flex items-center gap-2">
        <span className="font-bold text-blue-900 bg-white border border-blue-200 px-2 py-0.5 rounded shadow-sm">
          {selectedCount}
        </span>
        <span className="font-medium">produk dipilih</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1">
          <select
            value={targetStatus}
            onChange={(e) => setTargetStatus(e.target.value as ProductStatus)}
            aria-label="Pilih status baru"
            className="bg-white border border-blue-200 rounded px-2 py-1 text-xs text-doff-navy focus:outline-none cursor-pointer"
          >
            <option value="Produksi Aktif">Produksi Aktif</option>
            <option value="Review QC">Review QC</option>
            <option value="Draft Sampling">Draft Sampling</option>
          </select>
          <AdminButton variant="secondary" onClick={() => onBulkUpdateStatus(targetStatus)}>
            Terapkan Status
          </AdminButton>
        </div>

        <AdminButton variant="secondary" onClick={onBulkExport}>
          Ekspor Terpilih
        </AdminButton>
        <AdminButton variant="danger" onClick={onBulkDelete}>
          Hapus
        </AdminButton>
      </div>
    </div>
  );
};
