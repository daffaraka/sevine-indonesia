import React from 'react';
import { CompanyProfileService } from '../services/CompanyProfileService';

export const EditorialPartnersPress: React.FC = () => {
  const partnerGroups = CompanyProfileService.getClientPartnerGroups();
  const testimonials = CompanyProfileService.getTestimonials();

  return (
    <div className="pt-16 border-t border-slate-200 space-y-20">
      {/* Client & Brand Collaborations Ledger with shadow-md cards */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#C27B66] block">
              JEJARING KOLABORASI • B2B &amp; KOMUNITAS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#132238] mt-1">
              Dipercaya Berbagai Institusi &amp; Brand
            </h3>
          </div>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500">
            RETAIL • HOSPITALITY • BEAUTY • CREATIVE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnerGroups.map((group, idx) => (
            <div
              key={group.category}
              className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/90 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between space-y-6"
            >
              <div>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C27B66] font-semibold">
                  0{idx + 1} / {group.category}
                </span>
                <h4 className="font-serif text-xl font-semibold text-[#132238] mt-1">
                  {group.subtitle}
                </h4>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-slate-200">
                {group.clients.map((client) => (
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
          ))}
        </div>
      </div>

      {/* Editorial Pull-Quote Testimonials with shadow-md */}
      <div className="space-y-8">
        <div className="flex items-baseline justify-between border-b border-slate-200 pb-3">
          <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-[#C27B66]">
            TESTIMONI KLIEN &amp; RESELLER
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500">
            PENGALAMAN NYATA
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="p-7 rounded-2xl bg-[#F8F9FA] border border-slate-200/90 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C27B66] font-semibold">
                  {t.highlightAspect}
                </span>
                <blockquote className="font-serif italic text-base text-[#132238] leading-relaxed">
                  “{t.content}”
                </blockquote>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="font-sans font-semibold text-[#132238]">{t.author}</span>
                <span className="font-mono text-[11px] text-slate-500">{t.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
