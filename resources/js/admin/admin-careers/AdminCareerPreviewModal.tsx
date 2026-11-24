import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { AdminCareerItem } from '../../types/AdminDashboardTypes';
import { AdminModal } from '../admin-shared/AdminModal';
import { sanitizeRichHtml } from '../admin-shared/richTextSanitizer';

interface AdminCareerPreviewModalProps {
  career: AdminCareerItem | null;
  onClose: () => void;
}

const RICH_CONTENT_CLASSES =
  'text-xs text-slate-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_p]:my-1 [&_a]:text-blue-600 [&_a]:underline';

export const AdminCareerPreviewModal: React.FC<AdminCareerPreviewModalProps> = ({
  career,
  onClose,
}) => {
  return (
    <AdminModal
      isOpen={Boolean(career)}
      title={career?.title || 'Pratinjau Lowongan'}
      subtitle={career ? `${career.division} · ${career.employmentType}` : ''}
      maxWidthClass="max-w-2xl"
      onClose={onClose}
    >
      {career && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-doff-navy font-semibold">
              <MapPin className="w-3.5 h-3.5 text-doff-terracotta" />
              {career.location}
            </span>
            <span
              className={`px-2.5 py-1 rounded font-bold text-[11px] ${
                career.isActive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {career.isActive ? 'Dipublikasikan' : 'Ditutup'}
            </span>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-doff-navy uppercase tracking-wider">
              Kualifikasi Pelamar
            </h4>
            <div
              className={RICH_CONTENT_CLASSES}
              dangerouslySetInnerHTML={{
                __html: sanitizeRichHtml(career.qualifications) || '<p>-</p>',
              }}
            />
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-doff-navy uppercase tracking-wider">
              Tanggung Jawab Pekerjaan
            </h4>
            <div
              className={RICH_CONTENT_CLASSES}
              dangerouslySetInnerHTML={{
                __html: sanitizeRichHtml(career.responsibilities) || '<p>-</p>',
              }}
            />
          </div>

          <div className="pt-2 flex justify-end">
            <a
              href={career.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-doff-navy text-white text-xs font-bold rounded-lg hover:bg-doff-navydark transition-colors"
            >
              <span>Buka Form Pendaftaran (Google Form)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </AdminModal>
  );
};
