import React from 'react';
import { ClientPartnerGroup } from '../../types/CompanyProfileTypes';

interface EditorialPartnerCategoryCardProps {
  group: ClientPartnerGroup;
  index: number;
}

export const EditorialPartnerCategoryCard: React.FC<EditorialPartnerCategoryCardProps> = ({
  group,
  index
}) => {
  const cardId = `partner-group-${group.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  const totalItems = group.partnerItems?.length ?? group.clients.length;
  const isScrollable = totalItems > 4;

  return (
    <div
      id={cardId}
      className="p-5 sm:p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
    >
      {/* Header Kategori dengan Border Bawah yang Mengikat Judul */}
      <div className="pb-3 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C27B66] font-semibold">
            0{index + 1} / {group.category}
          </span>
          {isScrollable && (
            <span className="font-mono text-[9px] text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200 font-medium">
              {totalItems} Brand • Scroll
            </span>
          )}
        </div>
        <h4 className="font-serif text-lg sm:text-xl font-semibold text-[#132238] mt-1">
          {group.subtitle}
        </h4>
      </div>

      {/* Daftar Brand Mitra (Ukuran pas untuk max 4 brand, scrollable jika melebihi 4) */}
      <ul className="pt-3.5 space-y-2.5 h-[216px] overflow-y-auto pr-1.5 custom-scrollbar">
        {group.partnerItems && group.partnerItems.length > 0
          ? group.partnerItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2.5 font-sans text-xs text-slate-700 py-0.5 transition-transform duration-150 hover:translate-x-0.5"
              >
                <div className="w-7 h-7 rounded-full bg-white p-0.5 border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center overflow-hidden">
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
                  <div className="font-bold text-[#132238] truncate">{item.name}</div>
                  {item.role && (
                    <div className="font-sans font-normal text-[10px] text-slate-500 tracking-normal truncate">
                      {item.role}
                    </div>
                  )}
                </div>
              </li>
            ))
          : group.clients.map((client) => (
              <li
                key={client}
                className="font-sans text-xs font-medium text-slate-700 flex items-center justify-between py-1"
              >
                <span>{client}</span>
                <span className="font-mono text-[10px] text-slate-400">—</span>
              </li>
            ))}
      </ul>
    </div>
  );
};
