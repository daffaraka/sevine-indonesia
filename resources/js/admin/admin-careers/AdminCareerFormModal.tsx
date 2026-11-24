import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminCareerItem } from '../../types/AdminDashboardTypes';
import { AdminModal } from '../admin-shared/AdminModal';
import { AdminDraftStatusBar } from '../admin-shared/AdminDraftStatusBar';
import { useModalDraftPersistence } from '../admin-shared/useModalDraftPersistence';
import { AdminButton } from '../admin-datatable/AdminButton';
import { AdminRichTextEditor } from '../admin-shared/AdminRichTextEditor';
import { isRichHtmlEmpty, sanitizeRichHtml } from '../admin-shared/richTextSanitizer';
import { AdminCareerBasicFields, CareerBasicFormValues } from './AdminCareerBasicFields';

interface AdminCareerFormModalProps {
  isOpen: boolean;
  editingCareer: AdminCareerItem | null;
  onClose: () => void;
  onSave: (payload: Omit<AdminCareerItem, 'id' | 'updatedAt'>, editId?: string) => void;
}

interface CareerDraftState extends CareerBasicFormValues {
  qualifications: string;
  responsibilities: string;
}

const buildInitialCareerDraft = (editingCareer: AdminCareerItem | null): CareerDraftState => {
  if (editingCareer) {
    return {
      title: editingCareer.title,
      division: editingCareer.division,
      location: editingCareer.location,
      employmentType: editingCareer.employmentType,
      qualifications: editingCareer.qualifications,
      responsibilities: editingCareer.responsibilities,
      googleFormUrl: editingCareer.googleFormUrl,
      isActive: editingCareer.isActive,
    };
  }
  return {
    title: '',
    division: 'Produksi Manufaktur',
    location: 'Ngawi',
    employmentType: 'Full-time',
    qualifications: '',
    responsibilities: '',
    googleFormUrl: 'https://forms.gle/',
    isActive: true,
  };
};

export const AdminCareerFormModal: React.FC<AdminCareerFormModalProps> = ({
  isOpen,
  editingCareer,
  onClose,
  onSave,
}) => {
  const initialDraft = useMemo(() => buildInitialCareerDraft(editingCareer), [editingCareer]);
  const [formState, setFormState] = useState<CareerDraftState>(initialDraft);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setError('');
    setFormState(initialDraft);
  }, [isOpen, initialDraft]);

  const handleRestoreDraft = useCallback((draft: CareerDraftState) => {
    setFormState(draft);
  }, []);

  const draft = useModalDraftPersistence<CareerDraftState>({
    storageKey: editingCareer ? `sevine_draft_career_${editingCareer.id}` : 'sevine_draft_career_new',
    isOpen,
    initialValue: initialDraft,
    currentValue: formState,
    onRestore: handleRestoreDraft,
  });

  const handleBasicChange = <K extends keyof CareerBasicFormValues>(
    field: K,
    value: CareerBasicFormValues[K],
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.googleFormUrl.trim()) {
      setError('Posisi lowongan dan tautan Google Form wajib diisi.');
      return;
    }
    const cleanQualifications = sanitizeRichHtml(formState.qualifications);
    const cleanResponsibilities = sanitizeRichHtml(formState.responsibilities);

    onSave(
      {
        title: formState.title.trim(),
        division: formState.division.trim() || 'Umum',
        location: formState.location,
        employmentType: formState.employmentType,
        qualifications: isRichHtmlEmpty(cleanQualifications) ? '<p>-</p>' : cleanQualifications,
        responsibilities: isRichHtmlEmpty(cleanResponsibilities) ? '<p>-</p>' : cleanResponsibilities,
        googleFormUrl: formState.googleFormUrl.trim(),
        isActive: formState.isActive,
      },
      editingCareer?.id,
    );
    draft.clearDraft();
    onClose();
  };

  return (
    <AdminModal
      isOpen={isOpen}
      title={editingCareer ? 'Edit Lowongan Kerja' : 'Tambah Lowongan Kerja Baru'}
      subtitle="Pelamar pada halaman karir publik akan diarahkan langsung ke tautan Google Form."
      maxWidthClass="max-w-2xl"
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

        <AdminCareerBasicFields values={formState} onChange={handleBasicChange} />

        <AdminRichTextEditor
          label="Kualifikasi Pelamar"
          value={formState.qualifications}
          onChange={(qualifications) => setFormState((prev) => ({ ...prev, qualifications }))}
          placeholder="Tulis atau tempel daftar kualifikasi dari Google Docs..."
        />

        <AdminRichTextEditor
          label="Tanggung Jawab Pekerjaan"
          value={formState.responsibilities}
          onChange={(responsibilities) => setFormState((prev) => ({ ...prev, responsibilities }))}
          placeholder="Tulis atau tempel daftar tanggung jawab pekerjaan..."
        />

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formState.isActive}
            onChange={(e) => handleBasicChange('isActive', e.target.checked)}
            className="rounded border-doff-border text-doff-navy"
          />
          <span className="font-medium text-doff-navy">Publikasikan lowongan (Aktif)</span>
        </label>

        <div className="pt-3 border-t border-doff-border flex items-center justify-end gap-2">
          <AdminButton variant="secondary" onClick={onClose}>
            Batal
          </AdminButton>
          <AdminButton type="submit" variant="primary">
            {editingCareer ? 'Simpan Perubahan' : 'Publikasikan Lowongan'}
          </AdminButton>
        </div>
      </form>
    </AdminModal>
  );
};
