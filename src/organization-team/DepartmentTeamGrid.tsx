import React from 'react';
import { DepartmentCardItem } from './DepartmentCardItem';
import { CompanyProfileService } from '../services/CompanyProfileService';

export const DepartmentTeamGrid: React.FC = () => {
  const departments = CompanyProfileService.getDepartments();

  return (
    <section id="team" className="py-16 md:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Seksi */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
            Struktur Organisasi
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
            Tim Sevine Indonesia
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Tim kami terdiri dari para profesional yang kompeten di bidang kreatif, pemasaran, penjualan, pengembangan produk, produksi massal, dan operasional bisnis.
          </p>
        </div>

        {/* Grid 6 Departemen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <DepartmentCardItem key={dept.id} dept={dept} />
          ))}
        </div>
      </div>
    </section>
  );
};
