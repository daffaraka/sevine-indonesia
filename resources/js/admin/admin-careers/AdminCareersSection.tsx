import React, { useMemo, useState } from 'react';
import { Briefcase, ExternalLink, MapPin, Plus, Search } from 'lucide-react';
import { AdminCareerItem } from '../../types/AdminDashboardTypes';
import { AdminCareerFormModal } from './AdminCareerFormModal';
import { AdminCareerPreviewModal } from './AdminCareerPreviewModal';
import { PublicSectionLink, PublicVisibilityBadge } from '../admin-shared/PublicSyncBadge';
import { AdminDeleteConfirmModal } from '../admin-shared/AdminDeleteConfirmModal';
import {
  TableDeleteActionButton,
  TableEditActionButton,
  TableViewActionButton,
} from '../admin-shared/TableActionButtons';

interface AdminCareersSectionProps {
  careers: AdminCareerItem[];
  externalSearch: string;
  onSaveCareer: (payload: Omit<AdminCareerItem, 'id' | 'updatedAt'>, editId?: string) => void;
  onDeleteCareer: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const AdminCareersSection: React.FC<AdminCareersSectionProps> = ({
  careers,
  externalSearch,
  onSaveCareer,
  onDeleteCareer,
  onToggleStatus,
}) => {
  const [search, setSearch] = useState(externalSearch);
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<AdminCareerItem | null>(null);
  const [previewCareer, setPreviewCareer] = useState<AdminCareerItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminCareerItem | null>(null);

  const filtered = useMemo(() => {
    const q = (search || externalSearch).toLowerCase();
    return careers.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(q) || item.division.toLowerCase().includes(q);
      const matchLocation = locationFilter === 'all' || item.location === locationFilter;
      return matchSearch && matchLocation;
    });
  }, [careers, search, externalSearch, locationFilter]);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-doff-sm p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-doff-navy text-base flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-doff-terracotta" />
            <span>Manajemen Lowongan Kerja &amp; Tautan Google Form</span>
          </h3>
          <p className="text-xs text-slate-500">
            Kelola daftar posisi terbuka yang tampil pada halaman karir publik Sevine.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari posisi atau divisi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-doff-navy"
            />
          </div>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-doff-navy cursor-pointer"
          >
            <option value="all">Semua Lokasi</option>
            <option value="Ngawi">Ngawi</option>
            <option value="Malang">Malang</option>
            <option value="Remote">Remote</option>
          </select>
          <PublicSectionLink href="/#contact" label="Portal Publik" />
          <button
            type="button"
            onClick={() => {
              setEditingCareer(null);
              setIsModalOpen(true);
            }}
            className="px-3 py-1.5 bg-doff-navy text-white text-xs font-bold rounded-lg hover:bg-doff-navydark flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Lowongan</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200/80">
            <tr>
              <th className="py-2.5 px-3">Posisi &amp; Divisi</th>
              <th className="py-2.5 px-3">Lokasi</th>
              <th className="py-2.5 px-3">Tipe</th>
              <th className="py-2.5 px-3">Tautan Lamaran</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  Tidak ada lowongan yang sesuai filter.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-doff-navy">{item.title}</div>
                    <div className="text-[11px] text-slate-500">{item.division}</div>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                      <MapPin className="w-3 h-3 text-doff-terracotta" />
                      {item.location}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-doff-navy font-medium text-[11px]">
                      {item.employmentType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <a
                      href={item.googleFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline bg-blue-50 px-2 py-0.5 rounded"
                    >
                      <span>Buka Google Form</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onToggleStatus(item.id)}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded cursor-pointer transition-colors ${
                          item.isActive
                            ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                            : 'text-slate-500 bg-slate-100 hover:bg-slate-200'
                        }`}
                      >
                        {item.isActive ? 'Aktif' : 'Ditutup'}
                      </button>
                      <PublicVisibilityBadge
                        isPublished={item.isActive}
                        publishedLabel="Tayang"
                        hiddenLabel="Arsip"
                      />
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <TableViewActionButton
                        title="Pratinjau Lowongan"
                        onClick={() => setPreviewCareer(item)}
                      />
                      <TableEditActionButton
                        title="Edit Lowongan"
                        onClick={() => {
                          setEditingCareer(item);
                          setIsModalOpen(true);
                        }}
                      />
                      <TableDeleteActionButton
                        title="Hapus Lowongan"
                        onClick={() => setDeleteTarget(item)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminCareerFormModal
        isOpen={isModalOpen}
        editingCareer={editingCareer}
        onClose={() => setIsModalOpen(false)}
        onSave={onSaveCareer}
      />

      <AdminCareerPreviewModal
        career={previewCareer}
        onClose={() => setPreviewCareer(null)}
      />

      <AdminDeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Konfirmasi Hapus Lowongan"
        targetName={deleteTarget?.title || ''}
        warningDetail="Lowongan yang dihapus tidak dapat dipulihkan dan akan langsung hilang dari portal karir."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          onDeleteCareer(deleteTarget.id);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
};
