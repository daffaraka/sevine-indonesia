import React from 'react';
import { Menu, ArrowUpRight } from 'lucide-react';

interface MainNavbarProps {
  id?: string;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenMobileMenu: () => void;
}

export const MainNavbar: React.FC<MainNavbarProps> = ({
  id = 'main-navbar',
  activeSection,
  onNavigate,
  onOpenMobileMenu
}) => {
  const navLinks = [
    { id: 'hero', label: 'Beranda' },
    { id: 'about', label: 'Tentang' },
    { id: 'brands', label: '5 Brand' },
    { id: 'advantages', label: 'Keunggulan' },
    { id: 'workflow', label: 'Alur Kinerja' },
    { id: 'portfolio', label: 'Portofolio' },
    { id: 'partners', label: 'Kemitraan' },
    { id: 'contact', label: 'Kontak' }
  ];

  return (
    <header id={id} className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Name */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-doff-navy text-white flex items-center justify-center font-black text-lg shadow-doff-sm group-hover:bg-doff-navydark transition-colors">
              SI
            </div>
            <div>
              <div className="font-extrabold text-doff-navy text-base sm:text-lg leading-tight tracking-tight">
                SEVINE
              </div>
              <div className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
                CV. SEVINE INDONESIA
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-100 text-doff-navy font-semibold'
                      : 'text-slate-600 hover:text-doff-navy hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-doff-navy text-white text-xs font-semibold hover:bg-doff-navydark transition-colors shadow-doff-sm"
            >
              <span>Konsultasi B2B</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-lg text-slate-600 hover:text-doff-navy hover:bg-slate-100 lg:hidden focus:outline-none"
            aria-label="Buka menu navigasi"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
