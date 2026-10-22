import React from 'react';
import { Instagram, Mail, ShoppingBag, PhoneCall, Handshake } from 'lucide-react';
import { OfficeBranchCard } from './OfficeBranchCard';
import { PartnershipInquiryForm } from './PartnershipInquiryForm';
import { CompanyProfileService } from '../services/CompanyProfileService';

interface ContactOfficeLocationsProps {
  id?: string;
}

export const ContactOfficeLocations: React.FC<ContactOfficeLocationsProps> = ({ id = 'contact' }) => {
  const offices = CompanyProfileService.getOfficeLocations();
  const contact = CompanyProfileService.getContactInfo();

  return (
    <section id={id} className="py-16 md:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Seksi */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-bold text-doff-terracotta uppercase tracking-wider">
            Hubungi & Kunjungi Kami
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">
            Sentra Operasional & Kemitraan
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Kami siap melayani konsultasi pesanan korporasi, pendaftaran reseller, dan kolaborasi strategis melalui dua hub kantor resmi serta kanal digital.
          </p>
        </div>

        {/* 2 Hub Kantor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offices.map((office) => (
            <OfficeBranchCard key={office.id} office={office} />
          ))}
        </div>

        {/* Grid Kanal Kontak & Formulir Inquiry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          {/* Kolom Kiri: Quick Contacts */}
          <div className="lg:col-span-5 space-y-4">
            <div className="doff-card rounded-2xl p-6 border border-slate-200/80 space-y-4">
              <div className="text-xs font-bold text-doff-navy uppercase tracking-wider">
                Saluran Resmi Sevine
              </div>

              <div className="space-y-2 text-xs">
                <a
                  href={`https://wa.me/62${contact.resellerHotline.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-white text-doff-navy border border-slate-200 shrink-0 group-hover:border-slate-300">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-doff-navy">Hotline Reseller & Agen</div>
                    <div className="text-slate-500">{contact.resellerHotline}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/62${contact.collaborationHotline.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-white text-doff-navy border border-slate-200 shrink-0 group-hover:border-slate-300">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-doff-navy">Hotline B2B & Kolaborasi</div>
                    <div className="text-slate-500">{contact.collaborationHotline}</div>
                  </div>
                </a>

                <a
                  href="https://shopee.co.id/sevine.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-white text-doff-navy border border-slate-200 shrink-0 group-hover:border-slate-300">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-doff-navy">Marketplace Resmi</div>
                    <div className="text-slate-500">{contact.shopeeShop}</div>
                  </div>
                </a>

                <a
                  href="https://instagram.com/sevine.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-white text-doff-navy border border-slate-200 shrink-0 group-hover:border-slate-300">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-doff-navy">Instagram Resmi</div>
                    <div className="text-slate-500">{contact.instagram}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-white text-doff-navy border border-slate-200 shrink-0 group-hover:border-slate-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-doff-navy">Email Resmi</div>
                    <div className="text-slate-500">{contact.email}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Form */}
          <div className="lg:col-span-7">
            <PartnershipInquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
};
