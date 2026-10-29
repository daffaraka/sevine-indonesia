import React from 'react';
import { DepartmentCardItem } from './DepartmentCardItem';
import { CompanyProfileService } from '../../services/CompanyProfileService';

interface DepartmentTeamGridProps {
  id?: string;
}

export const DepartmentTeamGrid: React.FC<DepartmentTeamGridProps> = ({ id = 'team' }) => {
  const departments = CompanyProfileService.getDepartments();

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="relative py-16 md:py-24 bg-blue-mesh-gradient overflow-hidden">
      {/* Top and Bottom Subtle Transition Blurs */}
      <div className="section-seam-blur-top" />
      <div className="section-seam-blur-bottom" />

      {/* Flowing Sevine Navy Ribbon Wave Background */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-100 420 C 320 120, 720 520, 1540 160"
          stroke="#1B2E4B"
          strokeWidth="64"
          strokeLinecap="round"
          className="opacity-[0.06]"
        />
        <path
          d="M-80 520 C 400 280, 860 540, 1560 300"
          stroke="#132238"
          strokeWidth="28"
          strokeLinecap="round"
          className="opacity-[0.08]"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Seksi */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
            Struktur Organisasi
          </div>
          <h2 id={`${id}-heading`} className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
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
