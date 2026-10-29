import React, { useState, useEffect } from 'react';
import { EditorialHeader } from '../../Layouts/components/EditorialHeader';
import { EditorialMobileDrawer } from '../../Layouts/components/EditorialMobileDrawer';
import { EditorialFooter } from '../../Layouts/components/EditorialFooter';
import { EditorialHeroCover } from '../editorial-hero/EditorialHeroCover';
import { EditorialBrandShowcase } from '../editorial-brands/EditorialBrandShowcase';
import { EditorialBentoLookbook } from '../editorial-brands/EditorialBentoLookbook';
import { KineticNumbersSection } from '../editorial-numbers/KineticNumbersSection';
import { EditorialStoryManifesto } from '../editorial-story/EditorialStoryManifesto';
import { EditorialCapsulePortfolio } from '../editorial-portfolio/EditorialCapsulePortfolio';
import { EditorialFaqSection } from '../editorial-faq/EditorialFaqSection';
import { EditorialContactAtelier } from '../editorial-contact/EditorialContactAtelier';

interface EditorialProfilePageProps {
  id?: string;
}

export const EditorialProfilePage: React.FC<EditorialProfilePageProps> = ({
  id = 'editorial-profile-page'
}) => {
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
        'ed-faq',
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
    <div id={id} className="min-h-screen flex flex-col bg-[#F6F4F0] text-[#171715] selection:bg-[#9E4738] selection:text-[#F6F4F0]">
      <EditorialHeader
        id="editorial-header"
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <EditorialMobileDrawer
        id="editorial-mobile-drawer"
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main id={`${id}-main`} className="flex-1">
        <EditorialHeroCover id="ed-hero" onNavigate={handleNavigate} />
        <EditorialBrandShowcase id="ed-brands" />
        <EditorialBentoLookbook id="ed-lookbook" onNavigate={handleNavigate} />
        <KineticNumbersSection id="ed-numbers" />
        <EditorialStoryManifesto id="ed-story" />
        <EditorialCapsulePortfolio id="ed-capsule" />
        <EditorialFaqSection id="ed-faq" />
        <EditorialContactAtelier id="ed-contact" />
      </main>

      <EditorialFooter id="editorial-footer" onNavigate={handleNavigate} />
    </div>
  );
};
