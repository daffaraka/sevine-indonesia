import { router } from '@inertiajs/react';
import { ClassicProfilePage } from '../../classic/classic-profile/ClassicProfilePage';

export default function ClassicProfile() {
  return (
    <ClassicProfilePage
      id="classic-view"
      onNavigateToCatalog={() => router.visit('/catalog')}
    />
  );
}
