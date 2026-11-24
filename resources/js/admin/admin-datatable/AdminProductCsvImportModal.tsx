import React, { useMemo, useState } from 'react';
import { Download, FileSpreadsheet, Upload } from 'lucide-react';
import { AdminCategoryItem, AdminProductItem } from '../../types/AdminDashboardTypes';
import {
  downloadProductCsvTemplate,
  parseCsvText,
  SAMPLE_PRODUCT_CSV_TEXT,
  validateProductCsvRows,
} from '../../services/AdminCsvImportService';
import { AdminModal } from '../admin-shared/AdminModal';
import { AdminButton } from './AdminButton';
import { AdminCsvPreviewTable } from './AdminCsvPreviewTable';

interface AdminProductCsvImportModalProps {
  isOpen: boolean;
  existingProducts: AdminProductItem[];
  categories: AdminCategoryItem[];
  onClose: () => void;
  onImportProducts: (items: Omit<AdminProductItem, 'id'>[]) => void;
}

export const AdminProductCsvImportModal: React.FC<AdminProductCsvImportModalProps> = ({
  isOpen,
  existingProducts,
  categories,
  onClose,
  onImportProducts,
}) => {
  const [csvText, setCsvText] = useState('');
  const [fileName, setFileName] = useState('');

  const validation = useMemo(() => {
    const parsed = parseCsvText(csvText);
    return validateProductCsvRows(parsed, existingProducts, categories);
  }, [csvText, existingProducts, categories]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCsvText(String(ev.target?.result || ''));
    };
    reader.readAsText(file, 'UTF-8');
    e.target.value = '';
  };

  const handleConfirmImport = () => {
    if (validation.validPayloads.length === 0) return;
    onImportProducts(validation.validPayloads);
    setCsvText('');
    setFileName('');
    onClose();
  };

  const handleClose = () => {
    setCsvText('');
    setFileName('');
    onClose();
  };

  return (
    <AdminModal
      isOpen={isOpen}
      title="Impor Massal Produk via CSV"
      subtitle="Unggah file .csv atau tempel baris dari Excel/Google Sheets, lalu periksa validasi SKU sebelum disimpan."
      maxWidthClass="max-w-3xl"
      onClose={handleClose}
    >
      <div className="space-y-4 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-doff-subtle/60 border border-doff-border">
          <div className="flex items-center gap-2 text-doff-navy">
            <FileSpreadsheet className="w-4 h-4 text-doff-terracotta shrink-0" />
            <span>
              Kolom wajib: <code className="font-mono font-semibold">SKU, Nama Produk, Brand</code>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCsvText(SAMPLE_PRODUCT_CSV_TEXT)}
              className="px-2.5 py-1 rounded border border-doff-border bg-white text-doff-navy hover:bg-doff-subtle font-medium cursor-pointer"
            >
              Isi Contoh Data
            </button>
            <button
              type="button"
              onClick={downloadProductCsvTemplate}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-doff-navy/30 bg-white text-doff-navy hover:bg-doff-navy hover:text-white font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Template CSV</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label className="font-semibold text-doff-navy">
              Unggah File CSV atau Tempel Data
              {fileName && <span className="ml-2 font-mono text-doff-muted">({fileName})</span>}
            </label>
            <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-doff-border bg-white hover:bg-doff-subtle text-doff-navy font-semibold cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Pilih File .csv</span>
              <input type="file" accept=".csv,text/csv" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
          <textarea
            rows={4}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder="SKU,Nama Produk,Brand,Kategori,Kapasitas,Status,Deskripsi"
            className="w-full p-2.5 border border-doff-border rounded-md font-mono text-[11px] focus:outline-none focus:border-doff-navy"
          />
        </div>

        {validation.rows.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              {validation.validPayloads.length} Baris Siap Impor
            </span>
            {validation.errorCount > 0 && (
              <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 font-semibold">
                {validation.errorCount} Baris Error (Dilewati)
              </span>
            )}
            {validation.warningCount > 0 && (
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                {validation.warningCount} Catatan Kategori
              </span>
            )}
          </div>
        )}

        <AdminCsvPreviewTable rows={validation.rows} />

        <div className="pt-3 border-t border-doff-border flex items-center justify-end gap-2">
          <AdminButton variant="secondary" onClick={handleClose}>
            Batal
          </AdminButton>
          <AdminButton
            variant="primary"
            disabled={validation.validPayloads.length === 0}
            onClick={handleConfirmImport}
          >
            Impor {validation.validPayloads.length} Produk Valid
          </AdminButton>
        </div>
      </div>
    </AdminModal>
  );
};
