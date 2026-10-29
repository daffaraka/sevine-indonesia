import React from 'react';
import { MapPin, ZoomIn } from 'lucide-react';
import { OfflineEvent } from '../../types/CompanyProfileTypes';

interface PortfolioEventsGridProps {
  events: OfflineEvent[];
  onZoom: (img: string, title: string) => void;
}

export const PortfolioEventsGrid: React.FC<PortfolioEventsGridProps> = ({ events, onZoom }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map((evt) => (
        <div
          key={evt.id}
          className="bg-white rounded-xl border border-slate-200/90 shadow-doff-sm overflow-hidden group cursor-pointer hover:border-slate-300 transition-colors"
          onClick={() => onZoom(evt.image, evt.title)}
        >
          <div className="relative h-56 w-full overflow-hidden bg-slate-100">
            <img
              src={evt.image}
              alt={evt.imageAlt || evt.title}
              width={800}
              height={500}
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="p-3 rounded-full bg-white/90 text-doff-navy shadow-md">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-doff-navy text-white shadow-xs">
                {evt.year}
              </span>
            </div>
          </div>
          <div className="p-5 space-y-2">
            <h3 className="font-bold text-doff-navy text-base">
              {evt.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-doff-terracotta shrink-0" />
              <span>{evt.location}</span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
              {evt.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
