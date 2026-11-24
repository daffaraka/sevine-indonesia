import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { ParsedCsvProductRow } from '../../services/AdminCsvImportService';

interface AdminCsvPreviewTableProps {
  rows: ParsedCsvProductRow[];
}

export const AdminCsvPreviewTable: React.FC<AdminCsvPreviewTableProps> = ({ rows }) => {
  if (rows.length === 0) {
    return (
      <div className="p-6 text-center text-xs text-doff-muted border border-dashed border-doff-border rounded-lg bg-doff-subtle/40">
        Unggah file CSV atau tempel data di atas untuk melihat pratinjau validasi baris.
      </div>
    );
  }

  return (
    <div className="border border-doff-border rounded-lg overflow-hidden">
      <div className="max-h-60 overflow-auto">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-doff-subtle text-doff-muted font-mono uppercase border-b border-doff-border sticky top-0">
            <tr>
              <th className="p-2 w-10">#</th>
              <th className="p-2">Validasi</th>
              <th className="p-2">SKU</th>
              <th className="p-2">Nama Produk</th>
              <th className="p-2">Brand</th>
              <th className="p-2">Kategori</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-doff-border/70 bg-white">
            {rows.map((row) => (
              <tr
                key={`${row.rowNumber}-${row.sku}`}
                className={row.isValid ? 'hover:bg-doff-subtle/40' : 'bg-red-50/60'}
              >
                <td className="p-2 font-mono text-doff-muted">{row.rowNumber}</td>
                <td className="p-2 whitespace-nowrap">
                  {row.isValid ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{row.warnings.length > 0 ? row.warnings[0] : 'Siap Impor'}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-red-700 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{row.errors.join(', ')}</span>
                    </span>
                  )}
                </td>
                <td className="p-2 font-mono font-semibold text-doff-navy whitespace-nowrap">
                  {row.sku}
                </td>
                <td className="p-2 text-doff-navy max-w-[180px] truncate">{row.name}</td>
                <td className="p-2 font-mono whitespace-nowrap">{row.brand}</td>
                <td className="p-2 text-doff-slate whitespace-nowrap">{row.category}</td>
                <td className="p-2 font-mono whitespace-nowrap">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
