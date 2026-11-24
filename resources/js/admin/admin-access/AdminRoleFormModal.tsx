import React, { useEffect, useState } from 'react';
import { AdminMenuKey, AdminRoleItem } from '../../types/AdminDashboardTypes';
import { ADMIN_MENU_DEFINITIONS } from '../../services/AdminDashboardService';
import { AdminModal } from '../admin-shared/AdminModal';
import { AdminButton } from '../admin-datatable/AdminButton';

interface AdminRoleFormModalProps {
  isOpen: boolean;
  editingRole: AdminRoleItem | null;
  onClose: () => void;
  onSave: (payload: Omit<AdminRoleItem, 'id'>, editId?: string) => void;
}

export const AdminRoleFormModal: React.FC<AdminRoleFormModalProps> = ({
  isOpen,
  editingRole,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState<AdminMenuKey[]>(['overview']);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setError('');
    if (editingRole) {
      setName(editingRole.name);
      setDescription(editingRole.description);
      setPermissions(editingRole.permissions);
      return;
    }
    setName('');
    setDescription('');
    setPermissions(['overview']);
  }, [isOpen, editingRole]);

  const togglePermission = (key: AdminMenuKey) => {
    setPermissions((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Nama jabatan / role wajib diisi.');
      return;
    }
    if (permissions.length === 0) {
      setError('Pilih minimal satu modul yang dapat diakses.');
      return;
    }
    onSave(
      {
        name: name.trim(),
        description: description.trim() || '-',
        permissions,
      },
      editingRole?.id,
    );
    onClose();
  };

  return (
    <AdminModal
      isOpen={isOpen}
      title={editingRole ? `Edit Role: ${editingRole.name}` : 'Buat Role Hak Akses Baru'}
      subtitle="Centang modul yang diizinkan untuk dibuka oleh staf dengan jabatan ini."
      maxWidthClass="max-w-lg"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {error && (
          <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-700 font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block font-semibold text-doff-navy mb-1">Nama Jabatan / Role *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Mis. Admin Konten & Event"
            className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
          />
        </div>

        <div>
          <label className="block font-semibold text-doff-navy mb-1">Deskripsi Tugas</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ringkasan tanggung jawab role ini..."
            className="w-full px-3 py-2 border border-doff-border rounded-md focus:outline-none focus:border-doff-navy"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-semibold text-doff-navy">Izin Akses Modul</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ADMIN_MENU_DEFINITIONS.map((menu) => {
              const checked = permissions.includes(menu.key);
              return (
                <label
                  key={menu.key}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                    checked
                      ? 'bg-blue-50/70 border-blue-200 text-doff-navy font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => togglePermission(menu.key)}
                    className="rounded border-doff-border text-doff-navy"
                  />
                  <span>{menu.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-doff-border flex items-center justify-end gap-2">
          <AdminButton variant="secondary" onClick={onClose}>
            Batal
          </AdminButton>
          <AdminButton type="submit" variant="primary">
            Simpan Role
          </AdminButton>
        </div>
      </form>
    </AdminModal>
  );
};
