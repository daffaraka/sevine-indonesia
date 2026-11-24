import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AdminCategoryItem,
  AdminProductItem,
  ProductSwatch,
} from '../../types/AdminDashboardTypes';
import { AdminModal } from '../admin-shared/AdminModal';
import { AdminDraftStatusBar } from '../admin-shared/AdminDraftStatusBar';
import { useModalDraftPersistence } from '../admin-shared/useModalDraftPersistence';
import { AdminButton } from './AdminButton';
import { AdminProductSwatchEditor } from './AdminProductSwatchEditor';
import { AdminProductFormFields, ProductFormValues } from './AdminProductFormFields';

interface AdminProductFormModalProps {
  isOpen: boolean;
  editingProduct: AdminProductItem | null;
  categories: AdminCategoryItem[];
  onClose: () => void;
  onSave: (payload: Omit<AdminProductItem, 'id'>, editId?: number) => void;
}

interface ProductDraftState extends ProductFormValues {
  swatches: ProductSwatch[];
  images: string[];
}

const buildInitialProductDraft = (
  editingProduct: AdminProductItem | null,
  defaultCategory: string,
): ProductDraftState => {
  if (editingProduct) {
    return {
      sku: editingProduct.sku,
      name: editingProduct.name,
      brand: editingProduct.brand,
      category: editingProduct.category,
      capacity: editingProduct.capacity,
      status: editingProduct.status,
      description: editingProduct.description || '',
      swatches: editingProduct.swatches,
      images: editingProduct.images || [],
    };
  }
  return {
    sku: '',
    name: '',
    brand: 'SEVINE',
    category: defaultCategory,
    capacity: '1.000 pcs/bln',
    status: 'Produksi Aktif',
    description: '',
    swatches: [{ name: 'Navy Doff', hex: '#1B2E4B' }],
    images: [],
  };
};

export const AdminProductFormModal: React.FC<AdminProductFormModalProps> = ({
  isOpen,
  editingProduct,
  categories,
  onClose,
  onSave,
}) => {
  const defaultCategory = categories[0]?.name || 'Tas Harian (Backpack)';
  const initialDraft = useMemo(
    () => buildInitialProductDraft(editingProduct, defaultCategory),
    [editingProduct, defaultCategory],
  );
  const [formState, setFormState] = useState<ProductDraftState>(initialDraft);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setError('');
    setFormState(initialDraft);
  }, [isOpen, initialDraft]);

  const handleRestoreDraft = useCallback((draft: ProductDraftState) => {
    setFormState(draft);
  }, []);

  const draft = useModalDraftPersistence<ProductDraftState>({
    storageKey: editingProduct ? `sevine_draft_product_${editingProduct.id}` : 'sevine_draft_product_new',
    isOpen,
    initialValue: initialDraft,
    currentValue: formState,
    onRestore: handleRestoreDraft,
  });

  const handleFieldChange = <K extends keyof ProductFormValues>(
    field: K,
    value: ProductFormValues[K],
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.sku.trim() || !formState.name.trim()) {
      setError('Kode SKU dan Nama Produk wajib diisi.');
      return;
    }
    onSave(
      {
        sku: formState.sku.trim().toUpperCase(),
        name: formState.name.trim(),
        brand: formState.brand,
        category: formState.category,
        capacity: formState.capacity.trim() || '-',
        status: formState.status,
        description: formState.description.trim(),
        swatches: formState.swatches.length > 0 ? formState.swatches : [{ name: 'Default', hex: '#1B2E4B' }],
        images: formState.images,
      },
      editingProduct?.id,
    );
    draft.clearDraft();
    onClose();
  };

  return (
    <AdminModal
      isOpen={isOpen}
      title={editingProduct ? `Edit Produk (${editingProduct.sku})` : 'Tambah Produk Baru'}
      subtitle="Lengkapi informasi SKU, brand, kategori, dan variasi warna tanpa harga."
      hasUnsavedChanges={draft.isDirty}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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

        <AdminProductFormFields
          values={formState}
          categories={categories}
          onChange={handleFieldChange}
        />

        <AdminProductSwatchEditor
          swatches={formState.swatches}
          images={formState.images}
          onChangeSwatches={(swatches) => setFormState((prev) => ({ ...prev, swatches }))}
          onChangeImages={(images) => setFormState((prev) => ({ ...prev, images }))}
        />

        <div className="pt-3 border-t border-doff-border flex items-center justify-end gap-2">
          <AdminButton variant="secondary" onClick={onClose}>
            Tutup
          </AdminButton>
          <AdminButton type="submit" variant="primary">
            {editingProduct ? 'Simpan Perubahan' : 'Simpan Produk'}
          </AdminButton>
        </div>
      </form>
    </AdminModal>
  );
};
