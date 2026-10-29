import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { OfficeLocation } from '../../types/CompanyProfileTypes';

interface OfficeBranchCardProps {
  office: OfficeLocation;
}

export const OfficeBranchCard: React.FC<OfficeBranchCardProps> = ({ office }) => {
  const isPusat = office.id === 'pusat';

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-md hover:shadow-lg flex flex-col justify-between hover:border-slate-300 transition-all">
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${
            isPusat ? 'bg-doff-navy text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            {isPusat ? 'Pusat Manufaktur' : 'Sentra Bisnis & Kreatif'}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {office.postalCode}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-doff-navy text-base tracking-tight">
            {office.name}
          </h3>
          <div className="text-xs font-medium text-doff-terracotta mt-0.5">
            {office.role}
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-600 mt-3">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              {office.address}, {office.city}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-doff-navy hover:text-doff-terracotta transition-colors"
        >
          <span>Buka di Google Maps</span>
          <Navigation className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
