import { Head } from '@inertiajs/react';
import { AdminEventItem } from '../../types/AdminDashboardTypes';
import { renderAdminPersistentLayout } from '../../Layouts/AdminInertiaShell';
import { useAdminShell } from '../../Layouts/AdminShellContext';
import { submitInertiaMutation } from '../../services/AdminInertiaBridge';
import { AdminEventsDatatable } from '../../admin/admin-events/AdminEventsDatatable';

interface EventsPageProps {
  events: AdminEventItem[];
}

function EventsPage({ events }: EventsPageProps) {
  const { headerSearch, showAlert } = useAdminShell();
  const handleError = (message: string) => showAlert(message, 'warning');

  const handleSaveEvent = (payload: Omit<AdminEventItem, 'id'>, editId?: string) => {
    if (editId) {
      submitInertiaMutation('put', `/admin/events/${editId}`, payload, handleError);
      return;
    }
    submitInertiaMutation('post', '/admin/events', payload, handleError);
  };

  const handleDeleteEvent = (id: string) => {
    submitInertiaMutation('delete', `/admin/events/${id}`, undefined, handleError);
  };

  return (
    <>
      <Head title="Event & Dokumentasi" />
      <AdminEventsDatatable
        events={events}
        externalSearch={headerSearch}
        onSaveEvent={handleSaveEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </>
  );
}

EventsPage.layout = renderAdminPersistentLayout;

export default EventsPage;
