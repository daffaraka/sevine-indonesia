import React, { useState } from 'react';
import { Check, Plus, ShieldCheck } from 'lucide-react';
import { AdminRoleItem } from '../../types/AdminDashboardTypes';
import { ADMIN_MENU_DEFINITIONS } from '../../services/AdminDashboardService';
import { AdminRoleFormModal } from './AdminRoleFormModal';
import { AdminDeleteConfirmModal } from '../admin-shared/AdminDeleteConfirmModal';
import { TableDeleteActionButton, TableEditActionButton } from '../admin-shared/TableActionButtons';

interface AdminRbacSectionProps {
  roles: AdminRoleItem[];
  activeRoleId: string;
  onSwitchRole: (roleId: string) => void;
  onSaveRole: (payload: Omit<AdminRoleItem, 'id'>, editId?: string) => void;
  onDeleteRole: (id: string) => void;
}

export const AdminRbacSection: React.FC<AdminRbacSectionProps> = ({
  roles,
  activeRoleId,
  onSwitchRole,
  onSaveRole,
  onDeleteRole,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<AdminRoleItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminRoleItem | null>(null);

  const labelByKey = Object.fromEntries(
    ADMIN_MENU_DEFINITIONS.map((m) => [m.key, m.label]),
  );

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-doff-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-doff-navy text-base flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-doff-terracotta" />
            <span>Dynamic RBAC — Pengaturan Hak Akses Staf</span>
          </h3>
          <p className="text-xs text-slate-500">
            Buat jabatan kustom dan atur izin akses modul. Klik &ldquo;Uji Akses&rdquo; untuk melihat menu sidebar menyesuaikan izin role secara langsung.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingRole(null);
            setIsModalOpen(true);
          }}
          className="px-3 py-1.5 bg-doff-navy text-white text-xs font-bold rounded-lg hover:bg-doff-navydark flex items-center gap-1.5 shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Role</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((role) => {
          const isCurrent = role.id === activeRoleId;
          return (
            <div
              key={role.id}
              className={`bg-white rounded-xl border p-5 shadow-doff-sm flex flex-col justify-between space-y-4 ${
                isCurrent ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-slate-200/90'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-doff-navy">{role.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{role.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <TableEditActionButton
                      title="Edit Role"
                      onClick={() => {
                        setEditingRole(role);
                        setIsModalOpen(true);
                      }}
                    />
                    {!role.isSystem && (
                      <TableDeleteActionButton
                        title="Hapus Role"
                        onClick={() => setDeleteTarget(role)}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {role.permissions.map((perm) => (
                    <span
                      key={perm}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-doff-navy border border-slate-200"
                    >
                      {labelByKey[perm] || perm}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSwitchRole(role.id)}
                disabled={isCurrent}
                className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                    : 'bg-slate-50 hover:bg-doff-navy hover:text-white text-doff-navy border border-slate-200'
                }`}
              >
                {isCurrent && <Check className="w-3.5 h-3.5" />}
                <span>{isCurrent ? 'Sedang Aktif' : 'Uji Akses Role Ini'}</span>
              </button>
            </div>
          );
        })}
      </div>

      <AdminRoleFormModal
        isOpen={isModalOpen}
        editingRole={editingRole}
        onClose={() => setIsModalOpen(false)}
        onSave={onSaveRole}
      />

      <AdminDeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Konfirmasi Hapus Role"
        targetName={deleteTarget?.name || ''}
        warningDetail="Role akses ini akan dihapus dari daftar pengaturan hak akses staf."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          onDeleteRole(deleteTarget.id);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
};
