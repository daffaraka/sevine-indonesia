import { useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { CareerDetailPage } from '../../classic/career-detail/CareerDetailPage';
import {
  BackendCareer,
  mapCareerFromDb,
  mapCareersFromDb,
} from '../../services/PublicSyncMapper';

interface CareerDetailProps {
  career: BackendCareer;
  otherCareers?: BackendCareer[];
}

export default function CareerDetail({
  career: dbCareer,
  otherCareers: dbOtherCareers,
}: CareerDetailProps) {
  const career = useMemo(() => mapCareerFromDb(dbCareer), [dbCareer]);
  const otherCareers = useMemo(() => mapCareersFromDb(dbOtherCareers), [dbOtherCareers]);

  return (
    <>
      <Head title={`${career.title} - Karir`} />
      <CareerDetailPage
        id="career-detail-view"
        career={career}
        otherCareers={otherCareers}
      />
    </>
  );
}
