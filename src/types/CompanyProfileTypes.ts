export interface MetricStat {
  id: string;
  value: string;
  label: string;
  description: string;
  iconName: 'calendar' | 'shopping-bag' | 'users';
}

export interface CoreValue {
  letter: string;
  name: string;
  subtitle: string;
  description: string;
}

export interface BrandItem {
  id: string;
  name: string;
  category: 'bag' | 'apparel' | 'muslim-wear';
  tagline: string;
  description: string;
  highlightPoints: string[];
  badgeColor: string;
  targetMarket: string;
  imageUrl: string;
}

export interface AdvantageItem {
  id: number;
  title: string;
  description: string;
  iconKey: 'expert' | 'factory' | 'trend' | 'transparent' | 'ontime';
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  category: string;
  iconKey: 'analysis' | 'concept' | 'dev' | 'production' | 'evaluation' | 'release' | 'delivery';
}

export interface DepartmentItem {
  id: string;
  title: string;
  description: string;
  scope: string;
}

export interface PortfolioSample {
  id: string;
  title: string;
  brand: string;
  category: 'tas' | 'pakaian' | 'muslim';
  image: string;
  description: string;
}

export interface OfflineEvent {
  id: string;
  title: string;
  location: string;
  year: string;
  image: string;
  description: string;
}

export interface ClientPartnerItem {
  id: string;
  name: string;
  logo: string;
  role?: string;
}

export interface ClientPartnerGroup {
  category: string;
  subtitle: string;
  clients: string[];
  partnerItems?: ClientPartnerItem[];
}

export interface PartnerBrandItem {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  logo: string;
  role: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  date: string;
  rating: number;
  content: string;
  highlightAspect: string;
  screenshotImage: string;
  buyerPhotos?: string[];
  platform?: string;
}

export interface OfficeLocation {
  id: 'pusat' | 'cabang';
  name: string;
  role: string;
  address: string;
  city: string;
  postalCode: string;
  mapsQuery: string;
}

export interface ContactInfo {
  instagram: string;
  email: string;
  shopeeShop: string;
  resellerHotline: string;
  collaborationHotline: string;
}

export interface InquiryFormData {
  fullName: string;
  companyOrStoreName: string;
  whatsappNumber: string;
  partnershipType: 'reseller' | 'corporate_b2b' | 'custom_order' | 'distributor';
  preferredBrand: string;
  messageNotes: string;
}
