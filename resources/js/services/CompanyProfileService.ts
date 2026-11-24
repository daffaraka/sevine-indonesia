import {
  METRIC_STATS,
  CORE_VALUES,
  VISION_DATA,
  MISSION_LIST,
  BRAND_ITEMS,
  ADVANTAGES_LIST,
  WORKFLOW_STEPS,
  DEPARTMENTS_LIST,
  PORTFOLIO_SAMPLES,
  OFFLINE_EVENTS,
  CLIENT_PARTNER_GROUPS,
  ALL_PARTNER_BRANDS,
  TESTIMONIALS_LIST,
  OFFICE_LOCATIONS,
  CONTACT_INFO,
  FAQ_ITEMS
} from '../data/SevineProfileData';

import {
  BrandItem,
  InquiryFormData,
  PortfolioSample,
  PartnerBrandItem,
  FaqItem
} from '../types/CompanyProfileTypes';

export const CompanyProfileService = {
  getMetricStats: () => METRIC_STATS,
  getCoreValues: () => CORE_VALUES,
  getVisionMission: () => ({ vision: VISION_DATA, missions: MISSION_LIST }),
  
  getBrands: (category?: string): BrandItem[] => {
    if (!category || category === 'all') return BRAND_ITEMS;
    return BRAND_ITEMS.filter(brand => brand.category === category);
  },
  
  getBrandById: (id: string): BrandItem | undefined => {
    return BRAND_ITEMS.find(brand => brand.id === id);
  },

  getAdvantages: () => ADVANTAGES_LIST,
  getWorkflowSteps: () => WORKFLOW_STEPS,
  getDepartments: () => DEPARTMENTS_LIST,

  getPortfolioSamples: (filter?: string): PortfolioSample[] => {
    if (!filter || filter === 'all') return PORTFOLIO_SAMPLES;
    return PORTFOLIO_SAMPLES.filter(p => p.category === filter);
  },

  getOfflineEvents: () => OFFLINE_EVENTS,
  getClientPartnerGroups: () => CLIENT_PARTNER_GROUPS,
  getAllPartnerBrands: (): PartnerBrandItem[] => ALL_PARTNER_BRANDS,
  getTestimonials: () => TESTIMONIALS_LIST,
  getOfficeLocations: () => OFFICE_LOCATIONS,
  getContactInfo: () => CONTACT_INFO,
  getFaqItems: (): FaqItem[] => FAQ_ITEMS,

  generateWhatsAppInquiryUrl: (formData: InquiryFormData): string => {
    const isReseller = formData.partnershipType === 'reseller';
    const targetPhone = isReseller
      ? CONTACT_INFO.resellerHotline
      : CONTACT_INFO.collaborationHotline;

    const partnerTypeLabels: Record<string, string> = {
      reseller: 'Kemitraan Reseller Resmi',
      corporate_b2b: 'Pesanan Korporasi / B2B',
      custom_order: 'Custom Order & Merchandise',
      distributor: 'Distributor Wilayah'
    };

    const typeLabel = partnerTypeLabels[formData.partnershipType] || formData.partnershipType;

    const textLines = [
      `Halo Tim CV. SEVINE INDONESIA,`,
      ``,
      `Saya ingin mengajukan permohonan kemitraan:`,
      `*Nama Lengkap:* ${formData.fullName}`,
      `*Nama Instansi/Toko:* ${formData.companyOrStoreName || '-'}`,
      `*No. WhatsApp:* ${formData.whatsappNumber}`,
      `*Jenis Kemitraan:* ${typeLabel}`,
      `*Brand Pilihan:* ${formData.preferredBrand || 'Semua Brand'}`,
      `*Catatan/Pesan:* ${formData.messageNotes || '-'}`,
      ``,
      `Mohon informasi katalog, ketentuan kerjasama, dan penawaran lebih lanjut. Terima kasih!`
    ];

    const encodedText = encodeURIComponent(textLines.join('\n'));
    return `https://wa.me/62${targetPhone.replace(/^0/, '')}?text=${encodedText}`;
  }
};
