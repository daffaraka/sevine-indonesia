import React, { useMemo } from 'react';
import { PartnerBrandItem } from '../../types/CompanyProfileTypes';
import { EditorialPartnerCardItem } from './EditorialPartnerCardItem';

interface EditorialPartnerCarouselRowProps {
  brands: PartnerBrandItem[];
  direction: 'left' | 'right';
  speedSeconds?: number;
  priorityIds?: string[];
}

export const EditorialPartnerCarouselRow: React.FC<EditorialPartnerCarouselRowProps> = ({
  brands,
  direction,
  speedSeconds = 60,
  priorityIds = []
}) => {
  // Duplicate the array to create a continuous, seamless infinite loop
  const duplicatedBrands = useMemo(() => {
    // If fewer than 8 brands, repeat 3 times to ensure ample width on ultrawide screens
    if (brands.length < 8) {
      return [...brands, ...brands, ...brands, ...brands];
    }
    return [...brands, ...brands];
  }, [brands]);

  const animationClass =
    direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="overflow-hidden w-full select-none py-3.5 sm:py-4.5">
      <div
        className={`${animationClass} flex items-center gap-4 sm:gap-5`}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {duplicatedBrands.map((brand, index) => {
          const isPriority = priorityIds.includes(brand.id);
          return (
            <EditorialPartnerCardItem
              key={`${brand.id}-${index}`}
              brand={brand}
              isPriority={isPriority}
            />
          );
        })}
      </div>
    </div>
  );
};
