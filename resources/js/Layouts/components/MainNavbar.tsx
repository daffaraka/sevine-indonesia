import React, { useEffect, useRef, useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";

interface MainNavbarProps {
  id?: string;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenMobileMenu: () => void;
}

export const MainNavbar: React.FC<MainNavbarProps> = ({
  id = "main-navbar",
  activeSection,
  onNavigate,
  onOpenMobileMenu,
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement>(null);
  const baseNavHeightRef = useRef<number>(80);

  useEffect(() => {
    const updateBaseHeight = () => {
      if (headerRef.current && window.scrollY <= baseNavHeightRef.current) {
        baseNavHeightRef.current = headerRef.current.offsetHeight || 80;
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > baseNavHeightRef.current);
    };

    updateBaseHeight();
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateBaseHeight, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateBaseHeight);
    };
  }, []);

  const navLinks = [
    { id: "hero", label: "Beranda" },
    { id: "about", label: "Tentang" },
    { id: "brands", label: "5 Brand" },
    { id: "advantages", label: "Keunggulan" },
    { id: "workflow", label: "Alur Kinerja" },
    { id: "portfolio", label: "Katalog" },
    { id: "events", label: "Event" },
    { id: "partners", label: "Kemitraan" },
    { id: "contact", label: "Kontak" },
  ];

  return (
    <header
      ref={headerRef}
      id={id}
      className={`sticky top-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled
          ? "pt-2.5 sm:pt-3.5 px-3 sm:px-6 bg-transparent border-b border-transparent pointer-events-none"
          : "bg-white/95 backdrop-blur-md border-b border-slate-200/80"
      }`}
    >
      <div
        className={`mx-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-auto ${
          isScrolled
            ? "w-fit max-w-full rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-doff-lg px-2.5 sm:px-4 py-1.5"
            : "w-full max-w-7xl 2xl:max-w-[1680px] px-3.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12"
        }`}
      >
        <div
          className={`flex items-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled
              ? "justify-center gap-2 sm:gap-3 h-11 sm:h-12"
              : "justify-between h-16 sm:h-20"
          }`}
        >
          {/* Logo & Brand Name (tampil saat di atas, collapse halus saat scroll) */}
          <button
            type="button"
            onClick={() => onNavigate("hero")}
            className={`flex items-center text-left focus:outline-none group transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
              isScrolled
                ? "lg:max-w-0 lg:opacity-0 lg:scale-90 lg:pointer-events-none gap-2.5 sm:gap-3"
                : "max-w-[260px] opacity-100 scale-100 gap-2.5 sm:gap-3"
            }`}
          >
            <div
              className={`rounded-lg bg-doff-navy flex items-center justify-center shadow-doff-sm group-hover:bg-doff-navydark transition-all duration-300 shrink-0 ${
                isScrolled ? "w-8 h-8 p-1.5" : "w-11 h-11 sm:w-14 sm:h-14 p-1.5 sm:p-2"
              }`}
            >
              <img
                src="/assets/brands/logo-sevine-white.webp"
                alt="Logo CV. Sevine Indonesia"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div
                className={`font-extrabold text-doff-navy leading-tight tracking-tight transition-all duration-300 ${
                  isScrolled ? "text-sm" : "text-base sm:text-lg"
                }`}
              >
                SEVINE
              </div>
              {!isScrolled && (
                <div className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-slate-500 uppercase truncate">
                  CV. SEVINE INDONESIA
                </div>
              )}
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Navigasi utama"
            className={`hidden lg:flex items-center transition-all duration-500 ${
              isScrolled ? "gap-0.5 xl:gap-1" : "gap-1 xl:gap-2"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className={`whitespace-nowrap transition-all duration-300 ${
                    isScrolled
                      ? "px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium"
                      : "px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium"
                  } ${
                    isActive
                      ? isScrolled
                        ? "bg-doff-navy text-white font-semibold shadow-doff-sm"
                        : "bg-slate-100 text-doff-navy font-semibold underline underline-offset-8"
                      : "text-slate-600 hover:text-doff-navy hover:bg-slate-100/80"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action Button (hanya tampil saat layar masih di atas) */}
          <div
            className={`hidden sm:flex items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isScrolled
                ? "max-w-0 opacity-0 scale-90 pointer-events-none"
                : "max-w-[200px] opacity-100 scale-100"
            }`}
          >
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-doff-navy text-white text-xs font-semibold hover:bg-doff-navydark sevine-btn-motion shadow-doff-sm whitespace-nowrap"
            >
              <span>Konsultasi B2B</span>
              <ArrowUpRight className="w-3.5 h-3.5 sevine-arrow-shift" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className={`rounded-full text-slate-600 hover:text-doff-navy hover:bg-slate-100 lg:hidden focus:outline-none transition-colors ${
              isScrolled ? "p-1.5" : "p-2 rounded-md"
            }`}
            aria-label="Buka menu navigasi"
          >
            <Menu className={isScrolled ? "w-5 h-5" : "w-6 h-6"} />
          </button>
        </div>
      </div>
    </header>
  );
};
