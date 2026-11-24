import React, { useMemo, useState } from 'react';
import { CheckCircle, Handshake, Plus, Search } from 'lucide-react';
import { AdminPartnerItem } from '../../types/AdminDashboardTypes';
import { AdminPartnerFormModal } from './AdminPartnerFormModal';
import { PublicSectionLink, PublicVisibilityBadge } from '../admin-shared/PublicSyncBadge';
import { AdminDeleteConfirmModal } from '../admin-shared/AdminDeleteConfirmModal';
import { TableDeleteActionButton, TableEditActionButton } from '../admin-shared/TableActionButtons';

interface AdminCollaborationDatatableProps {
  partners: AdminPartnerItem[];
  externalSearch: string;
  onSavePartner: (payload: Omit<AdminPartnerItem, 'id'>, editId?: string) => void;
  onDeletePartner: (id: string) => void;
}

const PAGE_SIZE = 8;

export const AdminCollaborationDatatable: React.FC<AdminCollaborationDatatableProps> = ({
  partners,
  externalSearch,
  onSavePartner,
  onDeletePartner,
}) => {
  const [search, setSearch] = useState<string>(externalSearch);
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<AdminPartnerItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminPartnerItem | null>(null);

  const sectors = useMemo(
    () => Array.from(new Set(partners.map((p) => p.category))),
    [partners],
  );

  const filtered = useMemo(() => {
    const q = (search || externalSearch).toLowerCase();
    return partners.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(q) || p.categoryLabel.toLowerCase().includes(q);
      const matchSector = sectorFilter === 'all' || p.category === sectorFilter;
      return matchSearch && matchSector;
    });
  }, [partners, search, externalSearch, sectorFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-doff-sm p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-doff-navy text-base flex items-center gap-2">
            <Handshake className="w-4 h-4 text-doff-terracotta" />
            <span>Manajemen Mitra Kolaborasi &amp; Klien B2B ({partners.length})</span>
          </h3>
          <p className="text-xs text-slate-500">
            Daftar mitra dan rekanan industri yang tampil pada halaman publik.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama mitra..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-doff-navy"
            />
          </div>
          <select
            value={sectorFilter}
            onChange={(e) => {
              setSectorFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Sektor</option>
            {sectors.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
          <PublicSectionLink href="/#partners" label="Mitra Publik" />
          <button
            type="button"
            onClick={() => {
              setEditingPartner(null);
              setIsModalOpen(true);
            }}
            className="px-3 py-1.5 bg-doff-navy text-white text-xs font-bold rounded-lg hover:bg-doff-navydark flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Mitra</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200/80">
            <tr>
              <th className="py-2.5 px-3">Logo</th>
              <th className="py-2.5 px-3">Nama Brand / Instansi</th>
              <th className="py-2.5 px-3">Sektor</th>
              <th className="py-2.5 px-3">Lingkup Proyek</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {paginated.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-2.5 px-3 w-14">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center p-1">
                    <img src={p.logo} alt={p.name} className="max-w-full max-h-full object-contain" />
                  </div>
                </td>
                <td className="py-2.5 px-3 font-bold text-doff-navy">{p.name}</td>
                <td className="py-2.5 px-3">
                  <span className="capitalize px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">
                    {p.categoryLabel}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-slate-600">{p.role}</td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <div className="flex flex-col items-start gap-1">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.status === 'Mitra Aktif'
                          ? 'text-emerald-700 bg-emerald-50'
                          : 'text-slate-500 bg-slate-100'
                      }`}
                    >
                      {p.status === 'Mitra Aktif' && (
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                      )}
                      {p.status}
                    </span>
                    <PublicVisibilityBadge
                      isPublished={p.status === 'Mitra Aktif'}
                      publishedLabel="Tampil di Carousel"
                      hiddenLabel="Disembunyikan"
                    />
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5">
                    <TableEditActionButton
                      title="Edit Mitra"
                      onClick={() => {
                        setEditingPartner(p);
                        setIsModalOpen(true);
                      }}
                    />
                    <TableDeleteActionButton
                      title="Hapus Mitra"
                      onClick={() => setDeleteTarget(p)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
        <span>
          Hal {safePage} dari {totalPages} ({filtered.length} mitra)
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setCurrentPage(safePage - 1)}
            className="px-2.5 py-1 rounded border border-slate-200 bg-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setCurrentPage(safePage + 1)}
            className="px-2.5 py-1 rounded border border-slate-200 bg-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            Selanjutnya
          </button>
        </div>
      </div>

      <AdminPartnerFormModal
        isOpen={isModalOpen}
        editingPartner={editingPartner}
        onClose={() => setIsModalOpen(false)}
        onSave={onSavePartner}
      />

      <AdminDeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Konfirmasi Hapus Mitra"
        targetName={deleteTarget?.name || ''}
        warningDetail="Data mitra yang dihapus akan hilang dari daftar kolaborasi dan carousel publik."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          onDeletePartner(deleteTarget.id);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
};
