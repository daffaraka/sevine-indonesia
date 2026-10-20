import React, { useState, useEffect } from 'react';
import { EditorialHeader } from '../Layouts/components/EditorialHeader';
import { EditorialMobileDrawer } from '../Layouts/components/EditorialMobileDrawer';
import { EditorialFooter } from '../Layouts/components/EditorialFooter';
import { EditorialHeroCover } from '../editorial-hero/EditorialHeroCover';
import { EditorialBrandShowcase } from '../editorial-brands/EditorialBrandShowcase';
import { EditorialBentoLookbook } from '../editorial-brands/EditorialBentoLookbook';
import { KineticNumbersSection } from '../editorial-numbers/KineticNumbersSection';
import { EditorialStoryManifesto } from '../editorial-story/EditorialStoryManifesto';
import { EditorialCapsulePortfolio } from '../editorial-portfolio/EditorialCapsulePortfolio';
import { EditorialContactAtelier } from '../editorial-contact/EditorialContactAtelier';

export const EditorialProfilePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('ed-hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        'ed-hero',
        'ed-brands',
        'ed-lookbook',
        'ed-numbers',
        'ed-story',
        'ed-capsule',
        'ed-contact'
      ];
      const scrollPosition = window.scrollY + 220;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
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
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4F0] text-[#171715] selection:bg-[#9E4738] selection:text-[#F6F4F0]">
      <EditorialHeader
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <EditorialMobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        <EditorialHeroCover onNavigate={handleNavigate} />
        <EditorialBrandShowcase />
        <EditorialBentoLookbook onNavigate={handleNavigate} />
        <KineticNumbersSection />
        <EditorialStoryManifesto />
        <EditorialCapsulePortfolio />
        <EditorialContactAtelier />
      </main>

      <EditorialFooter onNavigate={handleNavigate} />
    </div>
  );
};
