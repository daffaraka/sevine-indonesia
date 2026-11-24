import React from 'react';
import { MetricStat } from '../../types/CompanyProfileTypes';

interface HeroStatCounterProps {
  stats: MetricStat[];
}

export const HeroStatCounter: React.FC<HeroStatCounterProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-doff-sm divide-y md:divide-y-0 md:divide-x divide-slate-200 grid grid-cols-1 md:grid-cols-3">
      {stats.map((item) => (
        <div key={item.id} className="p-6 sm:p-7 flex flex-col justify-between text-left">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
              {item.value}
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-doff-terracotta mt-1.5">
              {item.label}
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};
