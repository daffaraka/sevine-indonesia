import React from 'react';
import { Instagram, Mail, ShoppingBag } from 'lucide-react';
import { CONTACT_INFO } from '../../data/SevineProfileData';
import { FooterOfficeContacts } from './FooterOfficeContacts';

interface MainFooterProps {
  id?: string;
  onNavigate: (sectionId: string) => void;
}

export const MainFooter: React.FC<MainFooterProps> = ({ id = 'classic-main-footer', onNavigate }) => {
  return (
    <footer id={id} className="bg-doff-navy text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Kolom 1: Profil Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-doff-navy flex items-center justify-center font-black text-lg">
                SI
              </div>
              <div>
                <div className="font-bold text-white text-base">CV. SEVINE INDONESIA</div>
                <div className="text-[11px] text-slate-400">Apparel & Lifestyle Manufacturer</div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Membangun ekosistem apparel dan lifestyle terpercaya di Indonesia melalui inovasi produk, manufaktur mandiri, dan kemitraan strategis berkelanjutan.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/sevine.id"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://shopee.co.id/sevine.id"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Shopee"
              >
                <ShoppingBag className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Jelajahi Profil
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Tentang & Visi Misi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('brands')} className="hover:text-white transition-colors">
                  5 Brand Unggulan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workflow')} className="hover:text-white transition-colors">
                  Alur Kinerja Manufaktur
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-white transition-colors">
                  Katalog & Pameran
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('partners')} className="hover:text-white transition-colors">
                  Klien & Kemitraan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-white transition-colors">
                  Testimoni Pelanggan
                </button>
              </li>
            </ul>
          </div>

          {/* Kolom 3 & 4: Sub-komponen Kontak & Kantor */}
          <FooterOfficeContacts />
        </div>

        {/* Baris Bawah */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} CV. SEVINE INDONESIA. Seluruh Hak Cipta Dilindungi.
          </div>
          <div className="flex items-center gap-6">
            <span>Service Excellent</span>
            <span>&bull;</span>
            <span>Vision Achievement</span>
            <span>&bull;</span>
            <span>Never Give Up</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
