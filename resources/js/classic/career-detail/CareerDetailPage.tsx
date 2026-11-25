import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { BackToTopButton } from '../../Layouts/components/BackToTopButton';
import { MainFooter } from '../../Layouts/components/MainFooter';
import { MainNavbar } from '../../Layouts/components/MainNavbar';
import { MobileNavigationDrawer } from '../../Layouts/components/MobileNavigationDrawer';
import { QuickWhatsAppFloatingButton } from '../../Layouts/components/QuickWhatsAppFloatingButton';
import { sanitizeRichHtml } from '../../admin/admin-shared/richTextSanitizer';
import { CareerPublicItem } from '../../types/CompanyProfileTypes';
import { CareerDetailApplyCard } from './CareerDetailApplyCard';
import { CareerDetailHero } from './CareerDetailHero';

interface CareerDetailPageProps {
  id?: string;
  career: CareerPublicItem;
  otherCareers?: CareerPublicItem[];
}

const RICH_PROSE_CLASS =
  'text-xs sm:text-sm text-slate-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_p]:my-1.5 [&_strong]:text-doff-navy break-words';

export const CareerDetailPage: React.FC<CareerDetailPageProps> = ({
  id = 'career-detail-page',
  career,
  otherCareers = [],
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleNavigate = (sectionId: string) => {
    router.visit(sectionId === 'hero' ? '/' : `/#${sectionId}`);
  };

  return (
    <div
      id={id}
      className="min-h-screen flex flex-col bg-doff-subtle text-[#1B2E4B] selection:bg-[#1B2E4B] selection:text-white"
    >
      <MainNavbar
        id="career-detail-navbar"
        activeSection="contact"
        onNavigate={handleNavigate}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <MobileNavigationDrawer
        id="career-detail-mobile-drawer"
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection="contact"
        onNavigate={handleNavigate}
      />

      <CareerDetailHero career={career} />

      <main className="flex-1 py-8 sm:py-12">
        <div className="w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-8 space-y-5 min-w-0">
              {career.responsibilitiesHtml && (
                <section className="bg-white rounded-lg border border-slate-200/90 shadow-doff-sm p-5 sm:p-6 space-y-3">
                  <h2 className="text-sm sm:text-base font-bold text-doff-navy pb-2.5 border-b border-slate-100">
                    Tanggung Jawab Pekerjaan
                  </h2>
                  <div
                    className={RICH_PROSE_CLASS}
                    dangerouslySetInnerHTML={{
                      __html: sanitizeRichHtml(career.responsibilitiesHtml),
                    }}
                  />
                </section>
              )}

              {career.qualificationsHtml && (
                <section className="bg-white rounded-lg border border-slate-200/90 shadow-doff-sm p-5 sm:p-6 space-y-3">
                  <h2 className="text-sm sm:text-base font-bold text-doff-navy pb-2.5 border-b border-slate-100">
                    Kualifikasi Pelamar
                  </h2>
                  <div
                    className={RICH_PROSE_CLASS}
                    dangerouslySetInnerHTML={{
                      __html: sanitizeRichHtml(career.qualificationsHtml),
                    }}
                  />
                </section>
              )}
            </div>

            <div className="lg:col-span-4 min-w-0">
              <CareerDetailApplyCard career={career} otherCareers={otherCareers} />
            </div>
          </div>
        </div>
      </main>

      <MainFooter id="career-detail-footer" onNavigate={handleNavigate} />
      <BackToTopButton />
      <QuickWhatsAppFloatingButton />
    </div>
  );
};
