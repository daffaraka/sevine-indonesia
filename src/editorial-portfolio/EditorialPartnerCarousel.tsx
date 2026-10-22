import React, { useMemo } from 'react';
import { PartnerBrandItem } from '../types/CompanyProfileTypes';
import { EditorialPartnerCarouselRow } from './EditorialPartnerCarouselRow';

interface EditorialPartnerCarouselProps {
  brands: PartnerBrandItem[];
}

const PRIORITY_IDS = ['paragon', 'wardah', 'emina', 'light-plus'];

export const EditorialPartnerCarousel: React.FC<EditorialPartnerCarouselProps> = ({ brands }) => {
  // Extract priority featured brands
  const brandMap = useMemo(() => {
    const map = new Map<string, PartnerBrandItem>();
    brands.forEach((b) => map.set(b.id, b));
    return map;
  }, [brands]);

  // Construct 3 curated rows ensuring Paragon, Wardah, Emina, Light+ lead Row 1
  const { row1, row2, row3 } = useMemo(() => {
    const paragon = brandMap.get('paragon');
    const wardah = brandMap.get('wardah');
    const emina = brandMap.get('emina');
    const lightPlus = brandMap.get('light-plus');
    const tomoro = brandMap.get('tomoro-coffee');
    const yogya = brandMap.get('yogya-heritage');

    const mooncha = brandMap.get('mooncha');
    const hella = brandMap.get('hella-coffee');
    const pleasure = brandMap.get('pleasure-please');
    const monic = brandMap.get('monic');
    const callysta = brandMap.get('callysta');

    const hello = brandMap.get('hello-market');
    const buddies = brandMap.get('the-buddies');
    const mula = brandMap.get('mula-mula');
    const aranya = brandMap.get('aranya-flow');
    const bynana = brandMap.get('bynana-gift');
    const waktu = brandMap.get('waktu-luang');

    // Row 1: Featured Brands first (Paragon -> Wardah -> Emina -> Light+), followed by Tomoro & Yogya
    const r1 = [paragon, wardah, emina, lightPlus, tomoro, yogya].filter(
      Boolean
    ) as PartnerBrandItem[];

    // Row 2: F&B & Lifestyle Partners
    const r2 = [mooncha, hella, pleasure, monic, callysta, paragon, wardah].filter(
      Boolean
    ) as PartnerBrandItem[];

    // Row 3: Creative Community & Event Partners
    const r3 = [hello, buddies, mula, aranya, bynana, waktu, emina].filter(
      Boolean
    ) as PartnerBrandItem[];

    return { row1: r1, row2: r2, row3: r3 };
  }, [brandMap]);

  return (
    <div className="relative space-y-1 sm:space-y-2 py-2 hover-pause">
      {/* Left Gradient Edge Mask for Smooth Fade-In */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8F9FA] via-[#F8F9FA]/80 to-transparent z-10" />

      {/* Right Gradient Edge Mask for Smooth Fade-Out */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8F9FA] via-[#F8F9FA]/80 to-transparent z-10" />

      {/* Row 1: Leftward (Paragon, Wardah, Emina, Light+ first) - Smooth & Relaxed Speed (55s) */}
      <EditorialPartnerCarouselRow
        brands={row1}
        direction="left"
        speedSeconds={55}
        priorityIds={PRIORITY_IDS}
      />

      {/* Row 2: Rightward (Hospitality & Lifestyle) - Smooth & Relaxed Speed (68s) */}
      <EditorialPartnerCarouselRow
        brands={row2}
        direction="right"
        speedSeconds={68}
        priorityIds={PRIORITY_IDS}
      />

      {/* Row 3: Leftward (Creative Communities & Events) - Smooth & Relaxed Speed (62s) */}
      <EditorialPartnerCarouselRow
        brands={row3}
        direction="left"
        speedSeconds={62}
        priorityIds={PRIORITY_IDS}
      />
    </div>
  );
};
