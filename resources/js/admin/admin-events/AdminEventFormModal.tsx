import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminEventItem } from '../../types/AdminDashboardTypes';
import { AdminModal } from '../admin-shared/AdminModal';
import { AdminDraftStatusBar } from '../admin-shared/AdminDraftStatusBar';
import { useModalDraftPersistence } from '../admin-shared/useModalDraftPersistence';
import { AdminButton } from '../admin-datatable/AdminButton';
import { AdminEventGalleryInput } from './AdminEventGalleryInput';

interface AdminEventFormModalProps {
  isOpen: boolean;
  editingEvent: AdminEventItem | null;
  onClose: () => void;
  onSave: (payload: Omit<AdminEventItem, 'id'>, editId?: string) => void;
}

type EventDraftState = Omit<AdminEventItem, 'id'>;

const buildInitialEventDraft = (editingEvent: AdminEventItem | null): EventDraftState => {
  if (editingEvent) {
    return {
      title: editingEvent.title,
      location: editingEvent.location,
      year: editingEvent.year,
      description: editingEvent.description,
      images: editingEvent.images,
    };
  }
  return {
    title: '',
    location: '',
    year: '2026',
    description: '',
    images: [],
  };
};

export const AdminEventFormModal: React.FC<AdminEventFormModalProps> = ({
  isOpen,
  editingEvent,
  onClose,
  onSave,
}) => {
  const initialDraft = useMemo(() => buildInitialEventDraft(editingEvent), [editingEvent]);
  const [formState, setFormState] = useState<EventDraftState>(initialDraft);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setError('');
    setFormState(initialDraft);
  }, [isOpen, initialDraft]);

  const handleRestoreDraft = useCallback((draft: EventDraftState) => {
    setFormState(draft);
  }, []);

  const draft = useModalDraftPersistence<EventDraftState>({
    storageKey: editingEvent ? `sevine_draft_event_${editingEvent.id}` : 'sevine_draft_event_new',
    isOpen,
    initialValue: initialDraft,
    currentValue: formState,
    onRestore: handleRestoreDraft,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.location.trim()) {
      setError('Nama kegiatan dan lokasi wajib diisi.');
      return;
    }
    const finalImages =
      formState.images.length > 0
        ? formState.images
        : ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'];
    onSave(
      {
        title: formState.title.trim(),
        location: formState.location.trim(),
        year: formState.year.trim() || '2026',
        description: formState.description.trim() || '-',
        images: finalImages,
      },
      editingEvent?.id,
    );
    draft.clearDraft();
    onClose();
  };

  return (
    <AdminModal
      isOpen={isOpen}
      title={editingEvent ? 'Edit Dokumentasi Event' : 'Tambah Dokumentasi Event'}
      subtitle="Satu kegiatan dapat memuat beberapa foto galeri (one-to-many)."
      hasUnsavedChanges={draft.isDirty}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <AdminDraftStatusBar
          isDirty={draft.isDirty}
          hasPendingDraft={draft.hasPendingDraft}
          pendingDraftSavedAt={draft.pendingDraftSavedAt}
          lastSavedAt={draft.lastSavedAt}
          onRestoreDraft={draft.restorePendingDraft}
          onDiscardDraft={draft.discardPendingDraft}
          onResetForm={() => {
            setFormState(initialDraft);
            draft.clearDraft();
          }}
        />

        {error && (
          <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-700 font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block font-semibold text-doff-navy mb-1">Nama Event / Pameran *</label>
          <input
            type="text"
            value={formState.title}
            onChange={(e) => setFormState((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Mis. Hello Market Solo #37"
            className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-doff-navy mb-1">Lokasi *</label>
            <input
              type="text"
              value={formState.location}
              onChange={(e) => setFormState((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="Solo Paragon Mall"
              className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
            />
          </div>
          <div>
            <label className="block font-semibold text-doff-navy mb-1">Tahun / Label</label>
            <input
              type="text"
              value={formState.year}
              onChange={(e) => setFormState((prev) => ({ ...prev, year: e.target.value }))}
              placeholder="2026 / Official Exhibitor"
              className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-doff-navy mb-1">Deskripsi Kegiatan</label>
          <textarea
            rows={2}
            value={formState.description}
            onChange={(e) => setFormState((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
          />
        </div>

        <AdminEventGalleryInput
          images={formState.images}
          onChangeImages={(images) => setFormState((prev) => ({ ...prev, images }))}
        />

        <div className="pt-3 border-t border-doff-border flex items-center justify-end gap-2">
          <AdminButton variant="secondary" onClick={onClose}>
            Batal
          </AdminButton>
          <AdminButton type="submit" variant="primary">
            Simpan Event
          </AdminButton>
        </div>
      </form>
    </AdminModal>
  );
};
