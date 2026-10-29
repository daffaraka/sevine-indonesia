import React from 'react';
import { AdvantageItem } from '../../types/CompanyProfileTypes';

interface AdvantageItemCardProps {
  item: AdvantageItem;
}

export const AdvantageItemCard: React.FC<AdvantageItemCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-md hover:shadow-lg flex flex-col justify-between hover:border-slate-300 transition-all">
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-mono font-bold text-doff-terracotta tracking-wider">
            0{item.id} &bull; KEUNGGULAN
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        </div>

        <div>
          <h3 className="font-bold text-doff-navy text-base tracking-tight">
            {item.title}
          </h3>
          <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};
