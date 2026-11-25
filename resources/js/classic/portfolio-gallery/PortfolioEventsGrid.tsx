import React, { useEffect, useState } from 'react';
import { MapPin, ZoomIn } from 'lucide-react';
import { OfflineEvent } from '../../types/CompanyProfileTypes';
import { EventHoverMedia } from './EventHoverMedia';

interface PortfolioEventsGridProps {
  events: OfflineEvent[];
  onZoom: (img: string, title: string) => void;
}

interface EventCardProps {
  event: OfflineEvent;
  onZoom: (img: string, title: string) => void;
}

const EventAnimatedCard: React.FC<EventCardProps> = ({ event, onZoom }) => {
  const images = event.gallery && event.gallery.length > 0 ? event.gallery : [event.image];
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isHovered || images.length <= 1) {
      return;
    }

    setActiveIndex((prev) => (prev === 0 ? 1 : (prev + 1) % images.length));
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 1700);

    return () => window.clearInterval(timer);
  }, [isHovered, images.length]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveIndex(0);
  };

  const activePhoto = images[activeIndex % images.length] || event.image;

  return (
    <article
      className="bg-white rounded-lg border border-slate-200/90 shadow-doff-sm doff-card-hover overflow-hidden group cursor-pointer flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onZoom(activePhoto, event.title)}
    >
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <EventHoverMedia
          images={images}
          activeIndex={activeIndex}
          alt={event.imageAlt || event.title}
        />

        <div className="pointer-events-none absolute inset-0 bg-slate-900/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
          <div className="p-2.5 rounded-full bg-white/90 text-doff-navy shadow-md">
            <ZoomIn className="w-4 h-4" />
          </div>
        </div>

        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-doff-navy text-white shadow-xs">
            {event.year}
          </span>
        </div>

        {images.length > 1 && (
          <div className="absolute inset-x-3 bottom-2.5 flex items-center gap-1 z-20 pointer-events-none">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                  idx === activeIndex ? 'bg-white shadow-xs' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-5 space-y-2">
        <h3 className="font-bold text-doff-navy text-base leading-snug">
          {event.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-doff-terracotta shrink-0" />
          <span>{event.location}</span>
        </div>
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
          {event.description}
        </p>
      </div>
    </article>
  );
};

export const PortfolioEventsGrid: React.FC<PortfolioEventsGridProps> = ({ events, onZoom }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((evt) => (
        <EventAnimatedCard key={evt.id} event={evt} onZoom={onZoom} />
      ))}
    </div>
  );
};
