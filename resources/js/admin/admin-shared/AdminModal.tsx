import React, { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  maxWidthClass?: string;
  hasUnsavedChanges?: boolean;
  onDiscardAndClose?: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  title,
  subtitle,
  maxWidthClass = 'max-w-xl',
  hasUnsavedChanges = false,
  onDiscardAndClose,
  onClose,
  children,
}) => {
  const [showCloseGuard, setShowCloseGuard] = useState(false);

  useEffect(() => {
    if (!isOpen) setShowCloseGuard(false);
  }, [isOpen]);

  const requestClose = useCallback(() => {
    if (hasUnsavedChanges) {
      setShowCloseGuard(true);
      return;
    }
    onClose();
  }, [hasUnsavedChanges, onClose]);

  const handleConfirmDiscard = () => {
    setShowCloseGuard(false);
    if (onDiscardAndClose) {
      onDiscardAndClose();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, requestClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      onClick={requestClose}
    >
      <div
        className={`w-full ${maxWidthClass} bg-white border border-doff-border rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3.5 border-b border-doff-border flex items-start justify-between gap-3 bg-doff-subtle/40 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 id="admin-modal-title" className="text-sm font-bold text-doff-navy truncate">
                {title}
              </h3>
              {hasUnsavedChanges && (
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-mono font-semibold shrink-0">
                  Belum Disimpan
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-doff-muted mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={requestClose}
            className="p-1.5 rounded-lg text-doff-muted hover:text-doff-navy hover:bg-doff-subtle transition-colors cursor-pointer shrink-0"
            aria-label="Tutup Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {showCloseGuard && (
          <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shrink-0">
            <div className="flex items-center gap-2 text-amber-900 font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Ada perubahan belum disimpan. Draft lokal tetap aman, tutup form?</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowCloseGuard(false)}
                className="px-2.5 py-1 rounded border border-amber-300 bg-white text-amber-900 font-semibold hover:bg-amber-100 cursor-pointer"
              >
                Lanjut Edit
              </button>
              <button
                type="button"
                onClick={handleConfirmDiscard}
                className="px-2.5 py-1 rounded bg-red-600 text-white font-semibold hover:bg-red-700 cursor-pointer"
              >
                Tutup Form
              </button>
            </div>
          </div>
        )}

        <div className="p-5 overflow-y-auto custom-scrollbar">{children}</div>
      </div>
    </div>
  );
};
