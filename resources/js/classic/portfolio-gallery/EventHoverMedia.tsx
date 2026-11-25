import React from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface EventHoverMediaProps {
  images: string[];
  activeIndex: number;
  alt: string;
}

/**
 * Menampilkan foto dokumentasi event dengan transisi Blur-Dissolve (Rack Focus) saat berganti gambar.
 */
export const EventHoverMedia: React.FC<EventHoverMediaProps> = ({
  images,
  activeIndex,
  alt,
}) => {
  const safeImages = images.length > 0 ? images : ['/assets/brands/logo-sevine-1.webp'];
  const currentSrc = safeImages[activeIndex % safeImages.length];

  return (
    <AnimatePresence mode="sync">
      <motion.img
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        width={800}
        height={500}
        decoding="async"
        initial={{ opacity: 0, filter: 'blur(4px)', scale: 1.03 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1.0 }}
        exit={{ opacity: 0, filter: 'blur(4px)' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </AnimatePresence>
  );
};
