import React, { useEffect, useState } from 'react';
import { AdminCategoryItem } from '../../types/AdminDashboardTypes';
import { AdminModal } from '../admin-shared/AdminModal';
import { AdminButton } from '../admin-datatable/AdminButton';

interface AdminCategoryFormModalProps {
  isOpen: boolean;
  editingCategory: AdminCategoryItem | null;
  onClose: () => void;
  onSave: (payload: Omit<AdminCategoryItem, 'id'>, editId?: string) => void;
}

export const AdminCategoryFormModal: React.FC<AdminCategoryFormModalProps> = ({
  isOpen,
  editingCategory,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setError('');
    if (editingCategory) {
      setName(editingCategory.name);
      setDescription(editingCategory.description);
      setIsActive(editingCategory.isActive);
      return;
    }
    setName('');
    setDescription('');
    setIsActive(true);
  }, [isOpen, editingCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Nama kategori wajib diisi.');
      return;
    }
    onSave(
      {
        name: name.trim(),
        description: description.trim() || '-',
        isActive,
      },
      editingCategory?.id,
    );
    onClose();
  };

  return (
    <AdminModal
      isOpen={isOpen}
      title={editingCategory ? 'Edit Kategori Produk' : 'Tambah Kategori Produk'}
      subtitle="Kategori ini otomatis tersedia pada filter & form produk."
      maxWidthClass="max-w-md"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {error && (
          <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-700 font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block font-semibold text-doff-navy mb-1">Nama Kategori *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Mis. Aksesoris Travel"
            className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
          />
        </div>

        <div>
          <label className="block font-semibold text-doff-navy mb-1">Deskripsi Singkat</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Keterangan singkat jenis produk dalam kategori ini..."
            className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="rounded border-doff-border text-doff-navy"
          />
          <span className="font-medium text-doff-navy">Kategori aktif ditampilkan</span>
        </label>

        <div className="pt-3 border-t border-doff-border flex items-center justify-end gap-2">
          <AdminButton variant="secondary" onClick={onClose}>
            Batal
          </AdminButton>
          <AdminButton type="submit" variant="primary">
            Simpan Kategori
          </AdminButton>
        </div>
      </form>
    </AdminModal>
  );
};
