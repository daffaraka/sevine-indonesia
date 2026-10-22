import React from 'react';

interface EditorialMobileDrawerProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const EditorialMobileDrawer: React.FC<EditorialMobileDrawerProps> = ({
  id = 'editorial-mobile-drawer',
  isOpen,
  onClose,
  activeSection,
  onNavigate
}) => {
  if (!isOpen) return null;

  const sections = [
    { id: 'ed-hero', index: '01', label: 'Sampul Edisi 07' },
    { id: 'ed-brands', index: '02', label: 'Katalog 5 Lini Brand' },
    { id: 'ed-lookbook', index: '03', label: 'Editorial Bento Lookbook' },
    { id: 'ed-numbers', index: '04', label: 'By The Numbers (Kinetik)' },
    { id: 'ed-story', index: '05', label: 'Manifesto & Alur Produksi' },
    { id: 'ed-capsule', index: '06', label: 'Kapsul Arsip & Mitra' },
    { id: 'ed-contact', index: '07', label: 'Atelier & Inkuiri B2B' }
  ];

  const handleSelect = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0D1826]/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Sheet with shadow-2xl */}
      <aside id={id} className="relative w-full max-w-sm bg-[#132238] text-white h-full flex flex-col justify-between p-6 sm:p-8 border-r border-white/10 shadow-2xl z-10">
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="font-serif text-xl font-semibold tracking-[0.28em] block text-white">
                SEVINE
              </span>
              <span className="font-mono text-[10px] tracking-[0.22em] text-[#94A3B8] uppercase">
                Direktori Editorial
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-mono uppercase tracking-[0.2em] border border-white/20 rounded-full hover:bg-white hover:text-[#132238] transition-colors"
            >
              Tutup
            </button>
          </div>

          {/* Navigation Index */}
          <nav className="mt-6 space-y-2" aria-label="Menu Mobile Editorial">
            {sections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleSelect(sec.id)}
                  className={`w-full flex items-baseline justify-between px-4 py-3.5 text-left transition-all rounded-r-xl border-l-4 ${
                    isActive
                      ? 'border-[#C27B66] bg-[#1B2E4B] text-white font-semibold shadow-md'
                      : 'border-transparent text-[#94A3B8] hover:text-white hover:bg-[#1B2E4B]/50'
                  }`}
                >
                  <span className="font-serif text-xl tracking-wide">{sec.label}</span>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-[#C27B66]">
                    /{sec.index}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">
            CV. SEVINE INDONESIA • NGAWI &amp; MALANG
          </div>
          <button
            type="button"
            onClick={() => handleSelect('ed-contact')}
            className="w-full py-3 rounded-full bg-[#C27B66] text-white text-xs font-mono uppercase tracking-[0.18em] font-semibold hover:bg-[#A86452] transition-colors shadow-md"
          >
            Ajukan Kemitraan &amp; Makloon
          </button>
        </div>
      </aside>
    </div>
  );
};
