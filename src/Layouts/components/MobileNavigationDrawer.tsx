import React from 'react';
import { X, ArrowRight, Instagram, Mail, ShoppingBag } from 'lucide-react';
import { CONTACT_INFO } from '../../data/SevineProfileData';

interface MobileDrawerProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const MobileNavigationDrawer: React.FC<MobileDrawerProps> = ({
  id = 'classic-mobile-drawer',
  isOpen,
  onClose,
  activeSection,
  onNavigate
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'hero', label: 'Beranda' },
    { id: 'about', label: 'Tentang Kami' },
    { id: 'brands', label: 'Brand Kami' },
    { id: 'advantages', label: 'Keunggulan' },
    { id: 'workflow', label: 'Alur Kinerja' },
    { id: 'team', label: 'Tim Sevine' },
    { id: 'portfolio', label: 'Portofolio' },
    { id: 'partners', label: 'Klien & Mitra' },
    { id: 'testimonials', label: 'Testimoni' },
    { id: 'contact', label: 'Kontak & Kantor' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div id={id} className="relative ml-auto w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-doff-navy flex items-center justify-center p-1.5 shadow-xs">
                <img
                  src="/assets/brands/logo-sevine-white.webp"
                  alt="Logo CV. Sevine Indonesia"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-doff-navy tracking-tight text-sm">
                SEVINE INDONESIA
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
              aria-label="Tutup menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-doff-navy font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-doff-navy'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <ArrowRight className="w-4 h-4 text-doff-navy" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Saluran Resmi
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <a
              href="https://instagram.com/sevine.id"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-doff-navy"
              aria-label="Instagram Sevine"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-doff-navy"
              aria-label="Email Sevine"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://shopee.co.id/sevine.id"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-doff-navy"
              aria-label="Shopee Sevine"
            >
              <ShoppingBag className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
