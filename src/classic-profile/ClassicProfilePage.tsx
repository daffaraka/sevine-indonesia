import React, { useState, useEffect } from 'react';
import { MainNavbar } from '../Layouts/components/MainNavbar';
import { MobileNavigationDrawer } from '../Layouts/components/MobileNavigationDrawer';
import { MainFooter } from '../Layouts/components/MainFooter';
import { BackToTopButton } from '../Layouts/components/BackToTopButton';
import { QuickWhatsAppFloatingButton } from '../Layouts/components/QuickWhatsAppFloatingButton';

import { HeroBannerView } from '../hero-banner/HeroBannerView';
import { CompanyAboutStory } from '../company-about/CompanyAboutStory';
import { BrandShowcaseGrid } from '../brand-showcase/BrandShowcaseGrid';
import { CompanyAdvantageGrid } from '../company-advantages/CompanyAdvantageGrid';
import { WorkflowProcessTimeline } from '../workflow-process/WorkflowProcessTimeline';
import { DepartmentTeamGrid } from '../organization-team/DepartmentTeamGrid';
import { PortfolioGalleryTabs } from '../portfolio-gallery/PortfolioGalleryTabs';
import { ClientPartnershipSection } from '../client-partners/ClientPartnershipSection';
import { CustomerTestimonialSlider } from '../client-testimonials/CustomerTestimonialSlider';
import { ContactOfficeLocations } from '../contact-location/ContactOfficeLocations';

export const ClassicProfilePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero',
        'about',
        'brands',
        'advantages',
        'workflow',
        'team',
        'portfolio',
        'partners',
        'testimonials',
        'contact'
      ];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1B2E4B] selection:bg-[#1B2E4B] selection:text-white">
      <MainNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <MobileNavigationDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        <HeroBannerView onNavigate={handleNavigate} />
        <CompanyAboutStory />
        <BrandShowcaseGrid />
        <CompanyAdvantageGrid />
        <WorkflowProcessTimeline />
        <DepartmentTeamGrid />
        <PortfolioGalleryTabs />
        <ClientPartnershipSection />
        <CustomerTestimonialSlider />
        <ContactOfficeLocations />
      </main>

      <MainFooter onNavigate={handleNavigate} />

      <BackToTopButton />
      <QuickWhatsAppFloatingButton />
    </div>
  );
};
