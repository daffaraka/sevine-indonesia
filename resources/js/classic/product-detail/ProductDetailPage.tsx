import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { BackToTopButton } from '../../Layouts/components/BackToTopButton';
import { MainFooter } from '../../Layouts/components/MainFooter';
import { MainNavbar } from '../../Layouts/components/MainNavbar';
import { MobileNavigationDrawer } from '../../Layouts/components/MobileNavigationDrawer';
import { QuickWhatsAppFloatingButton } from '../../Layouts/components/QuickWhatsAppFloatingButton';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { CatalogProductItem } from '../product-catalog/types/ProductCatalogTypes';
import { ProductDetailGallery } from './ProductDetailGallery';
import { ProductDetailInfoPanel } from './ProductDetailInfoPanel';
import { ProductDetailSpecsCard } from './ProductDetailSpecsCard';
import { ProductRelatedGrid } from './ProductRelatedGrid';

interface ProductDetailPageProps {
  id?: string;
  product: CatalogProductItem;
  relatedProducts?: CatalogProductItem[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  id = 'product-detail-page',
  product,
  relatedProducts = [],
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useSmoothScroll(true);

  const handleNavigate = (sectionId: string) => {
    router.visit(sectionId === 'hero' ? '/' : `/#${sectionId}`);
  };

  return (
    <div
      id={id}
      className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1B2E4B] selection:bg-[#1B2E4B] selection:text-white"
    >
      <MainNavbar
        id="product-detail-navbar"
        activeSection="portfolio"
        onNavigate={handleNavigate}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <MobileNavigationDrawer
        id="product-detail-mobile-drawer"
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection="portfolio"
        onNavigate={handleNavigate}
      />

      <header className="bg-white border-b border-slate-200/80 py-4">
        <div className="w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 min-w-0">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-doff-navy transition-colors shrink-0">
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <Link href="/catalog" className="hover:text-doff-navy transition-colors shrink-0">
              Katalog Produk
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <Link
              href={`/catalog?category=${encodeURIComponent(product.category)}`}
              className="hover:text-doff-navy transition-colors hidden sm:inline shrink-0"
            >
              {product.categoryLabel}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400 hidden sm:inline shrink-0" />
            <span className="font-mono font-semibold text-doff-navy truncate">{product.sku}</span>
          </nav>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-doff-navy hover:text-doff-terracotta transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Katalog</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-6 sm:py-10">
        <div className="w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-5 min-w-0">
              <ProductDetailGallery product={product} />
            </div>
            <div className="lg:col-span-7 min-w-0 space-y-5">
              <ProductDetailInfoPanel product={product} />
              <ProductDetailSpecsCard product={product} />
            </div>
          </div>

          <ProductRelatedGrid
            products={relatedProducts}
            categorySlug={product.category}
            categoryLabel={product.categoryLabel}
          />
        </div>
      </main>

      <MainFooter id="product-detail-footer" onNavigate={handleNavigate} />
      <BackToTopButton />
      <QuickWhatsAppFloatingButton />
    </div>
  );
};
