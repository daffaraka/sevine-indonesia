import React from 'react';
import { Clock, RotateCcw } from 'lucide-react';

interface AdminDraftStatusBarProps {
  isDirty: boolean;
  hasPendingDraft: boolean;
  pendingDraftSavedAt: string | null;
  lastSavedAt: string | null;
  onRestoreDraft: () => void;
  onDiscardDraft: () => void;
  onResetForm?: () => void;
}

export const AdminDraftStatusBar: React.FC<AdminDraftStatusBarProps> = ({
  isDirty,
  hasPendingDraft,
  pendingDraftSavedAt,
  lastSavedAt,
  onRestoreDraft,
  onDiscardDraft,
  onResetForm,
}) => {
  if (hasPendingDraft) {
    return (
      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-2 text-amber-900">
          <RotateCcw className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>
            Ditemukan draft lokal yang belum disimpan{' '}
            {pendingDraftSavedAt ? `(pukul ${pendingDraftSavedAt})` : ''}.
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onDiscardDraft}
            className="px-2 py-1 rounded border border-amber-300 text-amber-800 hover:bg-amber-100 font-medium cursor-pointer"
          >
            Abaikan
          </button>
          <button
            type="button"
            onClick={onRestoreDraft}
            className="px-2.5 py-1 rounded bg-amber-700 text-white hover:bg-amber-800 font-semibold cursor-pointer"
          >
            Pulihkan Draft
          </button>
        </div>
      </div>
    );
  }

  if (!isDirty && !lastSavedAt) return null;

  return (
    <div className="px-2.5 py-1.5 rounded-md bg-doff-subtle/70 border border-doff-border flex items-center justify-between gap-2 text-[11px] text-doff-muted">
      <div className="flex items-center gap-1.5 min-w-0">
        <Clock className="w-3 h-3 text-emerald-700 shrink-0" />
        <span className="truncate">
          {lastSavedAt
            ? `Draft lokal tersimpan otomatis (${lastSavedAt})`
            : 'Perubahan belum disimpan'}
        </span>
      </div>
      {isDirty && onResetForm && (
        <button
          type="button"
          onClick={onResetForm}
          className="text-doff-navy hover:underline font-medium shrink-0 cursor-pointer"
        >
          Reset Perubahan
        </button>
      )}
    </div>
  );
};
