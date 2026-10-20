import React from 'react';
import { ClientPartnerGroup } from '../types/CompanyProfileTypes';

interface PartnerCategoryCardProps {
  group: ClientPartnerGroup;
}

export const PartnerCategoryCard: React.FC<PartnerCategoryCardProps> = ({ group }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-md hover:shadow-lg flex flex-col justify-between hover:border-slate-300 transition-all">
      <div className="space-y-4">
        <div className="pb-2.5 border-b border-slate-100">
          <span className="text-[10px] font-bold text-doff-terracotta uppercase tracking-wider">
            {group.subtitle}
          </span>
          <h4 className="font-bold text-doff-navy text-base mt-0.5 tracking-tight">
            {group.category}
          </h4>
        </div>

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
      </div>
    </div>
  );
};
