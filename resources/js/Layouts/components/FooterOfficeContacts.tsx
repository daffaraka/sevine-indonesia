import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO, OFFICE_LOCATIONS } from '../../data/SevineProfileData';

export const FooterOfficeContacts: React.FC = () => {
  return (
    <>
      {/* Kolom Hub Kantor */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-white uppercase tracking-wider">
          Hub Kantor Resmi
        </div>
        {OFFICE_LOCATIONS.map((loc) => (
          <div key={loc.id} className="text-xs space-y-1">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-doff-gold shrink-0" />
              <span>{loc.id === 'pusat' ? 'Kantor Pusat' : 'Kantor Cabang'}</span>
            </div>
            <div className="text-slate-400 pl-5 leading-relaxed text-[11px]">
              {loc.address}, {loc.city} ({loc.postalCode})
            </div>
          </div>
        ))}
      </div>

      {/* Kolom Hotline Kemitraan */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-white uppercase tracking-wider mb-4">
          Hotline Kemitraan
        </div>
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium">PIC Reseller:</span>
          </div>
          <div className="font-semibold text-white pl-5">{CONTACT_INFO.resellerHotline}</div>
          <div className="border-t border-slate-700/60 pt-2 flex items-center gap-2 text-slate-300">
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-medium">PIC B2B Kolaborasi:</span>
          </div>
          <div className="font-semibold text-white pl-5">{CONTACT_INFO.collaborationHotline}</div>
        </div>
      </div>
    </>
  );
};
