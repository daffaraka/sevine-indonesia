import { Head } from '@inertiajs/react';
import { AdminPartnerItem } from '../../types/AdminDashboardTypes';
import { renderAdminPersistentLayout } from '../../Layouts/AdminInertiaShell';
import { useAdminShell } from '../../Layouts/AdminShellContext';
import { submitInertiaMutation } from '../../services/AdminInertiaBridge';
import { AdminCollaborationDatatable } from '../../admin/admin-collaboration/AdminCollaborationDatatable';

interface CollaborationsPageProps {
  partners: AdminPartnerItem[];
}

function CollaborationsPage({ partners }: CollaborationsPageProps) {
  const { headerSearch, showAlert } = useAdminShell();
  const handleError = (message: string) => showAlert(message, 'warning');

  const handleSavePartner = (payload: Omit<AdminPartnerItem, 'id'>, editId?: string) => {
    if (editId) {
      submitInertiaMutation('put', `/admin/partners/${editId}`, payload, handleError);
      return;
    }
    submitInertiaMutation('post', '/admin/partners', payload, handleError);
  };

  const handleDeletePartner = (id: string) => {
    submitInertiaMutation('delete', `/admin/partners/${id}`, undefined, handleError);
  };

  return (
    <>
      <Head title="Kolaborasi & Mitra" />
      <AdminCollaborationDatatable
        partners={partners}
        externalSearch={headerSearch}
        onSavePartner={handleSavePartner}
        onDeletePartner={handleDeletePartner}
      />
    </>
  );
}

CollaborationsPage.layout = renderAdminPersistentLayout;

export default CollaborationsPage;
