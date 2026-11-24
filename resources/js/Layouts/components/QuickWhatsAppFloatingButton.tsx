import React, { useState } from 'react';
import { MessageCircle, X, Users, Briefcase } from 'lucide-react';
import { CONTACT_INFO } from '../../data/SevineProfileData';

export const QuickWhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 md:bottom-8 md:right-24 z-40">
      {isOpen && (
        <div className="mb-3 w-64 p-3 bg-white rounded-xl border border-slate-200 shadow-doff-lg transition-all duration-200 text-sm">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <span className="font-semibold text-doff-navy text-xs uppercase tracking-wider">
              Konsultasi Langsung PIC
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              aria-label="Tutup dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <a
              href={`https://wa.me/62${CONTACT_INFO.resellerHotline.replace(/^0/, '')}?text=${encodeURIComponent('Halo Tim Sevine, saya tertarik untuk mendaftar sebagai mitra Reseller resmi.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors text-doff-navy"
            >
              <div className="p-1.5 rounded-md bg-white border border-slate-200 text-doff-navy">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-xs text-doff-navy">Jalur Reseller</div>
                <div className="text-[11px] text-slate-500">Peluang distributor & agen</div>
              </div>
            </a>

            <a
              href={`https://wa.me/62${CONTACT_INFO.collaborationHotline.replace(/^0/, '')}?text=${encodeURIComponent('Halo Tim Sevine, saya ingin berdiskusi mengenai kerjasama korporasi / custom merchandise B2B.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors text-doff-navy"
            >
              <div className="p-1.5 rounded-md bg-white border border-slate-200 text-doff-navy">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-xs text-doff-navy">Jalur B2B & Kolaborasi</div>
                <div className="text-[11px] text-slate-500">Custom order & korporat</div>
              </div>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Hubungi WhatsApp Sevine"
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-doff-navy text-white shadow-doff-md hover:bg-doff-navydark transition-colors"
      >
        <MessageCircle className="w-4 h-4 text-white" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">Hubungi PIC</span>
      </button>
    </div>
  );
};
