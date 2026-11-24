import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { AdminModal } from './AdminModal';
import { AdminButton } from '../admin-datatable/AdminButton';

interface AdminDeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  targetName: string;
  warningDetail?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const AdminDeleteConfirmModal: React.FC<AdminDeleteConfirmModalProps> = ({
  isOpen,
  title = 'Konfirmasi Hapus Data',
  targetName,
  warningDetail,
  confirmLabel = 'Ya, Hapus Data',
  onCancel,
  onConfirm,
}) => (
  <AdminModal isOpen={isOpen} title={title} maxWidthClass="max-w-md" onClose={onCancel}>
    <div className="space-y-4 text-xs">
      <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-red-900">
          <p className="font-semibold">
            Apakah Anda yakin ingin menghapus <span className="underline">{targetName}</span>?
          </p>
          <p className="text-[11px] text-red-700 leading-relaxed">
            {warningDetail ||
              'Data yang dihapus akan langsung hilang dari daftar aktif dan tidak dapat dikembalikan.'}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-doff-border flex items-center justify-end gap-2">
        <AdminButton variant="secondary" onClick={onCancel}>
          Batal
        </AdminButton>
        <button
          type="button"
          onClick={onConfirm}
          className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </AdminModal>
);
