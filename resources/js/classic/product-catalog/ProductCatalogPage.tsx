import React, { useState } from 'react';
import { ChevronRight, Home, ShieldCheck, Sparkles } from 'lucide-react';
import { BackToTopButton } from '../../Layouts/components/BackToTopButton';
import { MainFooter } from '../../Layouts/components/MainFooter';
import { MainNavbar } from '../../Layouts/components/MainNavbar';
import { MobileNavigationDrawer } from '../../Layouts/components/MobileNavigationDrawer';
import { QuickWhatsAppFloatingButton } from '../../Layouts/components/QuickWhatsAppFloatingButton';
import { scrollToSmoothTarget, useSmoothScroll } from '../../hooks/useSmoothScroll';
import { ProductCatalogSection } from './ProductCatalogSection';
import { CatalogBrand, CatalogCategory, CatalogProductItem } from './types/ProductCatalogTypes';

interface ProductCatalogPageProps {
  id?: string;
  onNavigateHome?: () => void;
  products?: CatalogProductItem[];
  categoryOptions?: Array<{ id: CatalogCategory; label: string }>;
  brandOptions?: Array<{ id: CatalogBrand; name: string; subtitle: string }>;
}

const CatalogPageHero: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => (
  <header className="bg-gradient-to-b from-white to-slate-100/60 border-b border-slate-200/80 pt-8 pb-10">
    <div className="w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
        <button type="button" onClick={onNavigateHome} className="flex items-center gap-1 hover:text-doff-navy transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Beranda</span>
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-semibold text-doff-navy">Katalog Produk</span>
      </nav>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-doff-navy/5 text-doff-navy border border-doff-navy/10 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-doff-terracotta" />
            <span>Etalase Resmi CV. Sevine Indonesia</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-doff-navy tracking-tight">Katalog Produk & Portofolio</h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Temukan model tas, pakaian basic, dan busana muslim berkualitas langsung dari lini manufaktur mandiri kami. Dilengkapi filter Shopee interaktif, checkout toko resmi, serta pemesanan grosir pabrik.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Original Sevine</span>
          </span>
        </div>
      </div>
    </div>
  </header>
);

export const ProductCatalogPage: React.FC<ProductCatalogPageProps> = ({
  id = 'catalog-page',
  onNavigateHome,
  products,
  categoryOptions,
  brandOptions,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useSmoothScroll(true);

  const handleNavigate = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      scrollToSmoothTarget(sectionId);
      return;
    }
    if (onNavigateHome) {
      onNavigateHome();
      setTimeout(() => scrollToSmoothTarget(sectionId), 120);
    } else {
      window.history.pushState({}, '', '/');
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <div id={id} className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1B2E4B] selection:bg-[#1B2E4B] selection:text-white">
      <MainNavbar id="catalog-navbar" activeSection="portfolio" onNavigate={handleNavigate} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <MobileNavigationDrawer id="catalog-mobile-drawer" isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} activeSection="portfolio" onNavigate={handleNavigate} />
      <CatalogPageHero onNavigateHome={() => handleNavigate('hero')} />
      <main className="flex-1">
        <ProductCatalogSection
          id="portfolio"
          products={products}
          categoryOptions={categoryOptions}
          brandOptions={brandOptions}
        />
      </main>
      <MainFooter id="catalog-footer" onNavigate={handleNavigate} />
      <BackToTopButton />
      <QuickWhatsAppFloatingButton />
    </div>
  );
};
