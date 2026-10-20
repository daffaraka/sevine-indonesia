import React from 'react';
import { CompanyProfileService } from '../services/CompanyProfileService';
import { EditorialInquiryForm } from './EditorialInquiryForm';

export const EditorialContactAtelier: React.FC = () => {
  const offices = CompanyProfileService.getOfficeLocations();
  const contact = CompanyProfileService.getContactInfo();

  return (
    <section id="ed-contact" className="py-16 sm:py-24 bg-[#132238] border-b border-white/10 text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-14">
        {/* Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#C27B66] block">
              DIREKTORI ATELIER &amp; PABRIK • JAWA TIMUR
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white mt-1">
              Kunjungi Pabrik &amp; Studio Kami
            </h2>
          </div>
          <div className="font-mono text-xs text-[#CBD5E1] space-y-1 md:text-right">
            <div>HOTLINE RESELLER: {contact.resellerHotline}</div>
            <div>HOTLINE B2B &amp; KOLABORASI: {contact.collaborationHotline}</div>
          </div>
        </div>

        {/* Main Grid: Left Locations, Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: 2 Architectural Location Cards with shadow-md */}
          <div className="lg:col-span-5 space-y-6">
            {offices.map((office, idx) => (
              <article
                key={office.id}
                className="p-7 rounded-2xl bg-[#1B2E4B] border border-white/10 space-y-4 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-[#C27B66]">
                  <span>BASIS 0{idx + 1} • {office.id.toUpperCase()}</span>
                  <span>KODE POS {office.postalCode}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl text-white">
                    {office.name}
                  </h3>
                  <p className="font-mono text-[11px] text-[#94A3B8]">
                    {office.role}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed pt-2 border-t border-white/10">
                  {office.address}, <strong>{office.city}</strong>
                </p>

                <div className="pt-1">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F6F4F0] hover:text-[#C27B66] transition-colors"
                  >
                    <span>Buka Koordinat Peta</span>
                    <span>→</span>
                  </a>
                </div>
              </article>
            ))}

            {/* Official Channels Box with shadow-md */}
            <div className="p-6 rounded-2xl bg-[#17253D] border border-white/10 text-[#F6F4F0] space-y-2 shadow-md">
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#C27B66] block">
                KANAL DIGITAL RESMI
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">INSTAGRAM</span>
                  <span>{contact.instagram}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">MARKETPLACE</span>
                  <span>{contact.shopeeShop}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Minimalist Atelier Inquiry Form */}
          <div className="lg:col-span-7">
            <EditorialInquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
};
