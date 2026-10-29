import React from 'react';
import { ClientPartnerGroup } from '../../types/CompanyProfileTypes';

interface PartnerCategoryCardProps {
  group: ClientPartnerGroup;
}

export const PartnerCategoryCard: React.FC<PartnerCategoryCardProps> = ({ group }) => {
  const totalItems = group.partnerItems?.length ?? group.clients.length;
  const isScrollable = totalItems > 4;

  return (
    <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md flex flex-col hover:border-slate-300 transition-all">
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-doff-terracotta uppercase tracking-wider block">
            {group.subtitle}
          </span>
          <h3 className="font-bold text-doff-navy text-base mt-0.5 tracking-tight">
            {group.category}
          </h3>
        </div>
        {isScrollable && (
          <span className="font-mono text-[9px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200 font-medium">
            {totalItems} Mitra • Scroll
          </span>
        )}
      </div>

      {/* Daftar Brand Mitra (Ukuran pas untuk max 4 brand, scrollable jika melebihi 4) */}
      <div className="pt-3.5 space-y-2.5 h-[216px] overflow-y-auto pr-1.5 custom-scrollbar">
        {group.partnerItems && group.partnerItems.length > 0 ? (
          group.partnerItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/70"
            >
              <div className="w-7 h-7 rounded-full bg-white p-0.5 border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                <img
                  src={item.logo}
                  alt={item.imageAlt || `Logo ${item.name}`}
                  width={56}
                  height={56}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-doff-navy truncate">{item.name}</div>
                {item.role && (
                  <div className="text-[10px] text-slate-500 font-sans font-normal tracking-normal truncate">
                    {item.role}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-wrap gap-2">
            {group.clients.map((client, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-2.5 py-1 rounded bg-slate-50 text-slate-700 border border-slate-200"
              >
                {client}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
