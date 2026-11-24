import React, { useEffect, useState } from "react";

interface EditorialHeaderProps {
  id?: string;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenMobileMenu: () => void;
}

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "ed-hero", label: "Edisi 07" },
  { id: "ed-brands", label: "Katalog Lini" },
  { id: "ed-lookbook", label: "Bento Lookbook" },
  { id: "ed-numbers", label: "By The Numbers" },
  { id: "ed-story", label: "Kisah & Alur" },
  { id: "ed-capsule", label: "Kapsul & Mitra" },
  { id: "ed-contact", label: "Atelier" },
];

/** Jarak scroll (px) sebelum wordmark ringkas muncul di baris menu yang sticky (skala 50%) */
const COMPACT_WORDMARK_THRESHOLD = 48;

const useHasScrolledPast = (threshold: number): boolean => {
  const [hasScrolledPast, setHasScrolledPast] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolledPast(window.scrollY > threshold);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return hasScrolledPast;
};

/* ---------- Row 1: Brand Masthead (tidak sticky - skala 50%) ---------- */
const BrandMastheadRow: React.FC<{
  onNavigate: (sectionId: string) => void;
}> = ({ onNavigate }) => (
  <div className="bg-[#132238] text-[#F6F4F0] border-b border-[#F6F4F0]/10">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-2.5 sm:py-3.5 flex justify-center">
      <button
        type="button"
        onClick={() => onNavigate("ed-hero")}
        className="flex items-center gap-3 sm:gap-4 text-left focus:outline-none group"
        aria-label="SEVINE Indonesia — kembali ke atas"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-white/15 p-1.5 sm:p-2 flex items-center justify-center group-hover:bg-white/15 transition-all">
          <img
            src="/assets/brands/logo-sevine-white.webp"
            alt="Logo CV. Sevine Indonesia"
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <span className="block font-serif xl:text-5xl sm:text-2xl lg:text-3xl font-bold tracking-[0.3em] pl-[0.3em] leading-none group-hover:text-[#C27B66] transition-colors">
            SEVINE
          </span>
          <span className="block font-mono xl:text-[24px] sm:text-[8px] tracking-[0.3em] pl-[0.3em] uppercase text-[#F6F4F0]/55 mt-0.5">
            Indonesia
          </span>
        </div>
      </button>
    </div>
  </div>
);

/* ---------- Row 2: Menu (sticky - skala 50%) ---------- */
const MenuLinkButton: React.FC<{
  item: NavItem;
  isActive: boolean;
  onNavigate: (sectionId: string) => void;
}> = ({ item, isActive, onNavigate }) => (
  <button
    type="button"
    onClick={() => onNavigate(item.id)}
    aria-current={isActive ? "true" : undefined}
    className={`relative px-2 py-1 text-[10px] sm:text-[11px] tracking-wide whitespace-nowrap transition-colors border-b-2 ${
      isActive
        ? "border-[#C27B66] text-[#F6F4F0] font-semibold bg-[#F6F4F0]/[0.06]"
        : "border-transparent text-[#F6F4F0]/60 hover:text-[#F6F4F0]"
    }`}
  >
    {item.label}
  </button>
);

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({
  id = "editorial-header",
  activeSection,
  onNavigate,
  onOpenMobileMenu,
}) => {
  const showCompactWordmark = useHasScrolledPast(COMPACT_WORDMARK_THRESHOLD);

  return (
    <>
      <div id={`${id}-masthead`}>
        <BrandMastheadRow onNavigate={onNavigate} />
      </div>

      <nav
        id={id}
        aria-label="Navigasi Editorial"
        className={`sticky top-0 z-40 bg-[#132238]/95 backdrop-blur-md text-[#F6F4F0] border-b border-[#F6F4F0]/10 transition-shadow ${
          showCompactWordmark ? "shadow-[0_4px_12px_rgba(19,34,56,0.25)]" : ""
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-8 py-8 sm:h-9 flex items-center justify-between gap-3">
          {/* Kiri: trigger mobile + wordmark ringkas saat sticky */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="lg:hidden inline-flex items-center gap-1.5 py-1 pr-1 text-[10px] font-mono uppercase tracking-[0.16em]"
              aria-label="Buka navigasi editorial"
            >
              <span className="flex flex-col gap-0.5 w-3" aria-hidden="true">
                <span className="w-full h-[1px] bg-[#F6F4F0]" />
                <span className="w-3/4 h-[1px] bg-[#F6F4F0]" />
              </span>
              <span>Menu</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("ed-hero")}
              tabIndex={showCompactWordmark ? 0 : -1}
              aria-hidden={!showCompactWordmark}
              className={`inline-flex items-center gap-2 font-serif text-xs sm:text-sm font-semibold tracking-[0.24em] transition-all duration-300 ${
                showCompactWordmark
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2 pointer-events-none w-0 overflow-hidden lg:w-auto"
              }`}
            >
              <span className="w-4 h-4 rounded bg-white/10 p-0.5 inline-flex items-center justify-center">
                <img
                  src="/assets/brands/logo-sevine-white.webp"
                  alt="Ikon Sevine Indonesia"
                  width={16}
                  height={16}
                  className="w-full h-full object-contain"
                />
              </span>
              <span>SEVINE</span>
            </button>
          </div>

          {/* Tengah: menu desktop */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {NAV_ITEMS.map((item) => (
              <MenuLinkButton
                key={item.id}
                item={item}
                isActive={activeSection === item.id}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          {/* Kanan: CTA */}
          <button
            type="button"
            onClick={() => onNavigate("ed-contact")}
            className="shrink-0 px-2.5 py-1 rounded-full bg-[#F6F4F0] text-[#132238] text-[9px] sm:text-[10px] font-medium tracking-[0.1em] uppercase hover:bg-[#C27B66] hover:text-[#F6F4F0] transition-colors"
          >
            <span className="hidden sm:inline">Kemitraan B2B</span>
            <span className="sm:hidden">B2B</span>
          </button>
        </div>
      </nav>
    </>
  );
};
