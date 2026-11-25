import { useMemo } from 'react';
import { router } from '@inertiajs/react';
import { ClassicProfilePage } from '../../classic/classic-profile/ClassicProfilePage';
import {
  BackendBrand,
  BackendCareer,
  BackendEvent,
  BackendFaq,
  BackendPartner,
  BackendProduct,
  BackendTestimonial,
  mapBrandsFromDb,
  mapCareersFromDb,
  mapEventsFromDb,
  mapFaqsFromDb,
  mapPartnersFromDb,
  mapProductsFromDb,
  mapTestimonialsFromDb,
} from '../../services/PublicSyncMapper';

interface ClassicProfileProps {
  brands?: BackendBrand[];
  products?: BackendProduct[];
  events?: BackendEvent[];
  partners?: BackendPartner[];
  careers?: BackendCareer[];
  testimonials?: BackendTestimonial[];
  faqs?: BackendFaq[];
}

export default function ClassicProfile({
  brands: dbBrands,
  products: dbProducts,
  events: dbEvents,
  partners: dbPartners,
  careers: dbCareers,
  testimonials: dbTestimonials,
  faqs: dbFaqs,
}: ClassicProfileProps) {
  const brands = useMemo(() => mapBrandsFromDb(dbBrands), [dbBrands]);
  const products = useMemo(() => mapProductsFromDb(dbProducts), [dbProducts]);
  const events = useMemo(() => mapEventsFromDb(dbEvents), [dbEvents]);
  const partnerData = useMemo(() => mapPartnersFromDb(dbPartners), [dbPartners]);
  const careers = useMemo(() => mapCareersFromDb(dbCareers), [dbCareers]);
  const testimonials = useMemo(() => mapTestimonialsFromDb(dbTestimonials), [dbTestimonials]);
  const faqs = useMemo(() => mapFaqsFromDb(dbFaqs), [dbFaqs]);

  return (
    <ClassicProfilePage
      id="classic-view"
      onNavigateToCatalog={() => router.visit('/catalog')}
      brands={brands}
      products={products}
      events={events}
      partnerBrands={partnerData.allBrands}
      partnerGroups={partnerData.groups}
      careers={careers}
      testimonials={testimonials}
      faqs={faqs}
    />
  );
}
