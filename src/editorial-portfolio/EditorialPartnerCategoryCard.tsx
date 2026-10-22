import React from 'react';
import { ClientPartnerGroup } from '../types/CompanyProfileTypes';

interface EditorialPartnerCategoryCardProps {
  group: ClientPartnerGroup;
  index: number;
}

export const EditorialPartnerCategoryCard: React.FC<EditorialPartnerCategoryCardProps> = ({
  group,
  index
}) => {
  const cardId = `partner-group-${group.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <div
      id={cardId}
      className="p-5 sm:p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between space-y-5"
    >
      <div>
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C27B66] font-semibold">
          0{index + 1} / {group.category}
        </span>
        <h4 className="font-serif text-lg sm:text-xl font-semibold text-[#132238] mt-1">
          {group.subtitle}
        </h4>
      </div>

      <ul className="space-y-3 pt-4 border-t border-slate-200">
        {group.partnerItems && group.partnerItems.length > 0
          ? group.partnerItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2.5 font-sans text-xs text-slate-700"
              >
                <div className="w-7 h-7 rounded-full bg-white p-0.5 border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.logo}
                    alt={item.name}
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
                className="font-sans text-xs font-medium text-slate-700 flex items-center justify-between"
              >
                <span>{client}</span>
                <span className="font-mono text-[10px] text-slate-400">—</span>
              </li>
            ))}
      </ul>
    </div>
  );
};
