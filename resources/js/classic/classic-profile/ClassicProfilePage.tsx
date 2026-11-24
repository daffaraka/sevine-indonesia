import React, { useState, useEffect } from 'react';
import { MainNavbar } from '../../Layouts/components/MainNavbar';
import { MobileNavigationDrawer } from '../../Layouts/components/MobileNavigationDrawer';
import { MainFooter } from '../../Layouts/components/MainFooter';
import { BackToTopButton } from '../../Layouts/components/BackToTopButton';
import { QuickWhatsAppFloatingButton } from '../../Layouts/components/QuickWhatsAppFloatingButton';

import { HeroBannerView } from '../hero-banner/HeroBannerView';
import { CompanyAboutStory } from '../company-about/CompanyAboutStory';
import { BrandShowcaseGrid } from '../brand-showcase/BrandShowcaseGrid';
import { CompanyAdvantageGrid } from '../company-advantages/CompanyAdvantageGrid';
import { WorkflowProcessTimeline } from '../workflow-process/WorkflowProcessTimeline';
import { DepartmentTeamGrid } from '../organization-team/DepartmentTeamGrid';
import { ProductCatalogSection } from '../product-catalog/ProductCatalogSection';
import { EventDocumentationSection } from '../event-documentation/EventDocumentationSection';
import { ClientPartnershipSection } from '../client-partners/ClientPartnershipSection';
import { CustomerTestimonialSlider } from '../client-testimonials/CustomerTestimonialSlider';
import { FaqAccordionSection } from '../faq-section/FaqAccordionSection';
import { ContactOfficeLocations } from '../contact-location/ContactOfficeLocations';

interface ClassicProfilePageProps {
  id?: string;
  onNavigateToCatalog?: () => void;
}

export const ClassicProfilePage: React.FC<ClassicProfilePageProps> = ({
  id = 'classic-profile-page',
  onNavigateToCatalog,
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const hashId = window.location.hash.replace('#', '').trim();
    if (hashId) {
      const target = document.getElementById(hashId);
      if (target) {
        window.setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(hashId);
        }, 80);
      }
    }

    const handleScroll = () => {
      const sections = [
        'hero',
        'about',
        'brands',
        'advantages',
        'workflow',
        'team',
        'portfolio',
        'events',
        'partners',
        'testimonials',
        'faq',
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
    <div id={id} className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1B2E4B] selection:bg-[#1B2E4B] selection:text-white">
      <MainNavbar
        id="classic-navbar"
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <MobileNavigationDrawer
        id="classic-mobile-drawer"
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main id={`${id}-main`} className="flex-1">
        <HeroBannerView id="hero" onNavigate={handleNavigate} />
        <CompanyAboutStory id="about" />
        <BrandShowcaseGrid id="brands" />
        <CompanyAdvantageGrid id="advantages" />
        <WorkflowProcessTimeline id="workflow" />
        <DepartmentTeamGrid id="team" />
        <ProductCatalogSection
          id="portfolio"
          showFilters={false}
          maxPreviewCount={8}
          onViewMoreProducts={onNavigateToCatalog}
        />
        <EventDocumentationSection id="events" />
        <ClientPartnershipSection id="partners" />
        <CustomerTestimonialSlider id="testimonials" />
        <FaqAccordionSection id="faq" />
        <ContactOfficeLocations id="contact" />
      </main>

      <MainFooter id="classic-footer" onNavigate={handleNavigate} />

      <BackToTopButton />
      <QuickWhatsAppFloatingButton />
    </div>
  );
};
