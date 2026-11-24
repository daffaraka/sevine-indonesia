import React from 'react';
import { DepartmentItem } from '../../types/CompanyProfileTypes';

interface DepartmentCardItemProps {
  dept: DepartmentItem;
}

export const DepartmentCardItem: React.FC<DepartmentCardItemProps> = ({ dept }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-md hover:shadow-lg flex flex-col justify-between hover:border-slate-300 transition-all">
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <span className="text-[10px] font-semibold text-doff-terracotta uppercase tracking-wider">
            {dept.scope}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        </div>
        <h3 className="font-bold text-doff-navy text-base tracking-tight">
          {dept.title}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          {dept.description}
        </p>
      </div>
    </div>
  );
};
