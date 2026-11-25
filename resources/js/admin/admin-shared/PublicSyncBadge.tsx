import React from 'react';
import { ExternalLink } from 'lucide-react';
import { AdminMenuKey } from '../../types/AdminDashboardTypes';

interface PublicVisibilityBadgeProps {
  isPublished: boolean;
  publishedLabel?: string;
  hiddenLabel?: string;
}

export const PublicVisibilityBadge: React.FC<PublicVisibilityBadgeProps> = ({
  isPublished,
  publishedLabel = 'Tayang Publik',
  hiddenLabel = 'Tersembunyi',
}) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border whitespace-nowrap ${
      isPublished
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-slate-100 text-slate-500 border-slate-200'
    }`}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-emerald-500' : 'bg-slate-400'}`}
    />
    <span>{isPublished ? publishedLabel : hiddenLabel}</span>
  </span>
);

interface PublicSectionLinkProps {
  href: string;
  label?: string;
  compact?: boolean;
}

export const PublicSectionLink: React.FC<PublicSectionLinkProps> = ({
  href,
  label = 'Lihat di Website',
  compact = false,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
    className={`inline-flex items-center gap-1.5 rounded-lg border font-semibold transition-colors cursor-pointer ${
      compact
        ? 'p-1.5 text-doff-muted border-transparent hover:text-doff-navy hover:bg-doff-subtle'
        : 'px-2.5 py-1.5 text-xs text-doff-navy bg-white border-doff-border hover:bg-doff-subtle'
    }`}
  >
    {!compact && <span>{label}</span>}
    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
  </a>
);

export const PUBLIC_URL_BY_MENU: Record<AdminMenuKey, { href: string; label: string }> = {
  overview: { href: '/', label: 'Lihat Website' },
  monitoring: { href: '/', label: 'Lihat Website' },
  products: { href: '/catalog', label: 'Lihat Katalog Publik' },
  categories: { href: '/catalog', label: 'Lihat Filter Katalog' },
  brands: { href: '/#brands', label: 'Lihat 5 Brand Publik' },
  careers: { href: '/#careers', label: 'Lihat Portal Publik' },
  events: { href: '/#events', label: 'Lihat Galeri Event' },
  collaborations: { href: '/#partners', label: 'Lihat Bagian Mitra' },
  access: { href: '/', label: 'Lihat Website' },
};
