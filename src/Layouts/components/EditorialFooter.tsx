import React from 'react';
import { CompanyProfileService } from '../../services/CompanyProfileService';

interface EditorialFooterProps {
  onNavigate: (sectionId: string) => void;
}

export const EditorialFooter: React.FC<EditorialFooterProps> = ({ onNavigate }) => {
  const contact = CompanyProfileService.getContactInfo();
  const offices = CompanyProfileService.getOfficeLocations();

  return (
    <footer className="bg-[#0D1826] text-[#F6F4F0] border-t border-white/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-16 pb-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Col 1: Brand Statement */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#C27B66]">
              COLOPHON • CV. SEVINE INDONESIA
            </div>
            <p className="font-serif text-2xl sm:text-3xl leading-snug text-white max-w-md">
              Manufaktur mandiri tas fungsional, pakaian esensial, dan busana muslim kontemporer sejak 2019.
            </p>
            <div className="pt-2 font-mono text-xs text-slate-400">
              {contact.email} &nbsp;/&nbsp; IG {contact.instagram}
            </div>
          </div>

          {/* Col 2: 5 Brand Ecosystem */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-slate-400">
              01 / Lini Portofolio
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>SEVINE — Tas Utilitas Harian</li>
              <li>klou — Pakaian Basic Esensial</li>
              <li>LALUNA — Tas Wanita Elegan</li>
              <li>ASSAIF — Busana Muslim Pria</li>
              <li>NABIRA — Busana Muslimah Flowy</li>
            </ul>
          </div>

          {/* Col 3: Basis Manufaktur & Navigasi */}
          <div className="md:col-span-4 space-y-4">
            <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-slate-400">
              02 / Fasilitas & Direktori
            </div>
            <div className="space-y-3 text-xs text-slate-300">
              {offices.map((office) => (
                <div key={office.id}>
                  <span className="font-semibold text-white block">{office.city}</span>
                  <span className="text-slate-400">{office.address}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono uppercase tracking-[0.16em] text-[#C27B66]">
              <button type="button" onClick={() => onNavigate('ed-hero')} className="hover:text-white transition-colors">
                Atas ↑
              </button>
              <button type="button" onClick={() => onNavigate('ed-brands')} className="hover:text-white transition-colors">
                Katalog
              </button>
              <button type="button" onClick={() => onNavigate('ed-contact')} className="hover:text-white transition-colors">
                Mitra B2B
              </button>
            </div>
          </div>
        </div>

        {/* Giant Editorial Wordmark (Magazine Masthead Style) */}
        <div className="pt-8 select-none">
          <div className="font-serif text-[15vw] leading-[0.82] tracking-[0.08em] text-center text-white/[0.06] font-semibold">
            SEVINE
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">
            <span>© {new Date().getFullYear()} CV. SEVINE INDONESIA. ALL RIGHTS RESERVED.</span>
            <span>30,000+ MONTHLY PRODUCTION CAPACITY • IN-HOUSE FACTORY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
