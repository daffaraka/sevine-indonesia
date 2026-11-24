import React from 'react';
import { AdminEventItem } from '../../types/AdminDashboardTypes';
import { AdminModal } from '../admin-shared/AdminModal';

interface AdminEventGalleryModalProps {
  event: AdminEventItem | null;
  onClose: () => void;
}

export const AdminEventGalleryModal: React.FC<AdminEventGalleryModalProps> = ({
  event,
  onClose,
}) => {
  return (
    <AdminModal
      isOpen={Boolean(event)}
      title={event?.title || 'Galeri Event'}
      subtitle={event ? `${event.location} · ${event.year}` : ''}
      maxWidthClass="max-w-2xl"
      onClose={onClose}
    >
      {event && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {event.images.map((img, idx) => (
              <div
                key={`${img}-${idx}`}
                className="rounded-lg overflow-hidden border border-doff-border bg-slate-100 aspect-video"
              >
                <img
                  src={img}
                  alt={`${event.title} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminModal>
  );
};
