import React, { useEffect, useState } from 'react';
import { AdminPartnerItem } from '../../types/AdminDashboardTypes';
import { AdminModal } from '../admin-shared/AdminModal';
import { AdminButton } from '../admin-datatable/AdminButton';

interface AdminPartnerFormModalProps {
  isOpen: boolean;
  editingPartner: AdminPartnerItem | null;
  onClose: () => void;
  onSave: (payload: Omit<AdminPartnerItem, 'id'>, editId?: string) => void;
}

const SECTOR_OPTIONS = [
  { key: 'beauty', label: 'Beauty & Skincare' },
  { key: 'fnb', label: 'Food & Beverage' },
  { key: 'lifestyle', label: 'Lifestyle & Retail' },
  { key: 'community', label: 'Komunitas & Event' },
];

export const AdminPartnerFormModal: React.FC<AdminPartnerFormModalProps> = ({
  isOpen,
  editingPartner,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('beauty');
  const [role, setRole] = useState('Custom Merchandise & Bags');
  const [logo, setLogo] = useState('/assets/brands/logo-sevine-1.webp');
  const [status, setStatus] = useState<'Mitra Aktif' | 'Nonaktif'>('Mitra Aktif');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setError('');
    if (editingPartner) {
      setName(editingPartner.name);
      setCategory(editingPartner.category);
      setRole(editingPartner.role);
      setLogo(editingPartner.logo);
      setStatus(editingPartner.status);
      return;
    }
    setName('');
    setCategory('beauty');
    setRole('Custom Merchandise & Goodie Bag Official');
    setLogo('/assets/brands/logo-sevine-1.webp');
    setStatus('Mitra Aktif');
  }, [isOpen, editingPartner]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogo(URL.createObjectURL(file));
    e.target.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Nama brand / instansi mitra wajib diisi.');
      return;
    }
    const foundSector = SECTOR_OPTIONS.find((s) => s.key === category);
    onSave(
      {
        name: name.trim(),
        category,
        categoryLabel: foundSector?.label || category,
        role: role.trim() || 'Mitra B2B',
        logo: logo.trim() || '/assets/brands/logo-sevine-1.webp',
        status,
      },
      editingPartner?.id,
    );
    onClose();
  };

  return (
    <AdminModal
      isOpen={isOpen}
      title={editingPartner ? 'Edit Data Mitra Kolaborasi' : 'Tambah Mitra Kolaborasi'}
      subtitle="Data ini ditampilkan pada seksi mitra & klien B2B di website publik."
      maxWidthClass="max-w-md"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        {error && (
          <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-700 font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block font-semibold text-doff-navy mb-1">Nama Brand / Instansi *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Mis. Wardah Cosmetics"
            className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-doff-navy mb-1">Sektor Industri</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy bg-white"
            >
              {SECTOR_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-doff-navy mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Mitra Aktif' | 'Nonaktif')}
              className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy bg-white"
            >
              <option value="Mitra Aktif">Mitra Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-doff-navy mb-1">Lingkup Kolaborasi</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-semibold text-doff-navy">Logo Mitra</label>
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Preview logo"
              className="w-10 h-10 rounded border border-doff-border object-contain p-1 bg-slate-50 shrink-0"
            />
            <input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="/assets/brands/..."
              className="flex-1 px-2.5 py-1.5 border border-doff-border rounded focus:outline-none focus:border-doff-navy font-mono"
            />
            <label className="px-2.5 py-1.5 bg-doff-subtle hover:bg-slate-200 text-doff-navy rounded border border-doff-border font-semibold cursor-pointer shrink-0">
              Upload
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>

        <div className="pt-3 border-t border-doff-border flex items-center justify-end gap-2">
          <AdminButton variant="secondary" onClick={onClose}>
            Batal
          </AdminButton>
          <AdminButton type="submit" variant="primary">
            Simpan Mitra
          </AdminButton>
        </div>
      </form>
    </AdminModal>
  );
};
