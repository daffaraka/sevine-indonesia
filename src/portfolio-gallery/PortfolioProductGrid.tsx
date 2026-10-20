import React from 'react';
import { ZoomIn } from 'lucide-react';
import { PortfolioSample } from '../types/CompanyProfileTypes';

interface PortfolioProductGridProps {
  products: PortfolioSample[];
  onZoom: (img: string, title: string) => void;
}

export const PortfolioProductGrid: React.FC<PortfolioProductGridProps> = ({
  products,
  onZoom
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl border border-slate-200/90 shadow-doff-sm overflow-hidden group cursor-pointer hover:border-slate-300 transition-colors"
          onClick={() => onZoom(item.image, item.title)}
        >
          <div className="relative h-60 w-full overflow-hidden bg-slate-100">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="p-3 rounded-full bg-white/90 text-doff-navy shadow-md">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/90 text-doff-navy backdrop-blur-xs shadow-xs">
                {item.brand}
              </span>
            </div>
          </div>
          <div className="p-4 space-y-1">
            <h4 className="font-bold text-doff-navy text-sm">
              {item.title}
            </h4>
            <p className="text-xs text-slate-500 line-clamp-1">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
