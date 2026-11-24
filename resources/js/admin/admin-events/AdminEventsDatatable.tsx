import React, { useMemo, useState } from 'react';
import { Camera, Images, MapPin, Plus, Search } from 'lucide-react';
import { AdminEventItem } from '../../types/AdminDashboardTypes';
import { AdminEventFormModal } from './AdminEventFormModal';
import { AdminEventGalleryModal } from './AdminEventGalleryModal';
import { PublicSectionLink } from '../admin-shared/PublicSyncBadge';
import { AdminDeleteConfirmModal } from '../admin-shared/AdminDeleteConfirmModal';
import {
  TableDeleteActionButton,
  TableEditActionButton,
  TableViewActionButton,
} from '../admin-shared/TableActionButtons';

interface AdminEventsDatatableProps {
  events: AdminEventItem[];
  externalSearch: string;
  onSaveEvent: (payload: Omit<AdminEventItem, 'id'>, editId?: string) => void;
  onDeleteEvent: (id: string) => void;
}

export const AdminEventsDatatable: React.FC<AdminEventsDatatableProps> = ({
  events,
  externalSearch,
  onSaveEvent,
  onDeleteEvent,
}) => {
  const [search, setSearch] = useState<string>(externalSearch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AdminEventItem | null>(null);
  const [previewEvent, setPreviewEvent] = useState<AdminEventItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminEventItem | null>(null);

  const filteredEvents = useMemo(() => {
    const q = (search || externalSearch).toLowerCase();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q),
    );
  }, [events, search, externalSearch]);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-doff-sm overflow-hidden space-y-4 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-doff-navy text-base flex items-center gap-2">
            <Camera className="w-4 h-4 text-doff-terracotta" />
            <span>Manajemen Dokumentasi Pameran &amp; Offline Events</span>
          </h3>
          <p className="text-xs text-slate-500">
            Kelola kegiatan pameran beserta multi-foto galeri untuk halaman publik.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari event atau kota..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-doff-navy"
            />
          </div>
          <PublicSectionLink href="/#events" label="Galeri Publik" />
          <button
            type="button"
            onClick={() => {
              setEditingEvent(null);
              setIsModalOpen(true);
            }}
            className="px-3 py-1.5 bg-doff-navy text-white text-xs font-bold rounded-lg hover:bg-doff-navydark flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Event</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200/80">
            <tr>
              <th className="py-2.5 px-3">Cover</th>
              <th className="py-2.5 px-3">Nama Pameran / Event</th>
              <th className="py-2.5 px-3">Lokasi</th>
              <th className="py-2.5 px-3">Tahun / Label</th>
              <th className="py-2.5 px-3">Galeri</th>
              <th className="py-2.5 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredEvents.map((evt) => (
              <tr key={evt.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-2.5 px-3 w-16">
                  <img
                    src={evt.images[0]}
                    alt={evt.title}
                    className="w-12 h-10 object-cover rounded-md border border-slate-200"
                  />
                </td>
                <td className="py-2.5 px-3">
                  <div className="font-bold text-doff-navy">{evt.title}</div>
                  <div className="text-[11px] text-slate-500 max-w-xs truncate">
                    {evt.description}
                  </div>
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-slate-600">
                    <MapPin className="w-3 h-3 text-doff-terracotta" />
                    <span>{evt.location}</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className="font-semibold text-doff-navy px-2 py-0.5 bg-slate-100 rounded">
                    {evt.year}
                  </span>
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setPreviewEvent(evt)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded cursor-pointer"
                  >
                    <Images className="w-3 h-3" />
                    <span>{evt.images.length} Foto</span>
                  </button>
                </td>
                <td className="py-2.5 px-3 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5">
                    <TableViewActionButton
                      title="Lihat Galeri Event"
                      onClick={() => setPreviewEvent(evt)}
                    />
                    <TableEditActionButton
                      title="Edit Event"
                      onClick={() => {
                        setEditingEvent(evt);
                        setIsModalOpen(true);
                      }}
                    />
                    <TableDeleteActionButton
                      title="Hapus Event"
                      onClick={() => setDeleteTarget(evt)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminEventFormModal
        isOpen={isModalOpen}
        editingEvent={editingEvent}
        onClose={() => setIsModalOpen(false)}
        onSave={onSaveEvent}
      />

      <AdminEventGalleryModal
        event={previewEvent}
        onClose={() => setPreviewEvent(null)}
      />

      <AdminDeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Konfirmasi Hapus Event"
        targetName={deleteTarget?.title || ''}
        warningDetail="Dokumentasi beserta daftar foto galeri event ini akan dihapus dari daftar aktif."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          onDeleteEvent(deleteTarget.id);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
};
