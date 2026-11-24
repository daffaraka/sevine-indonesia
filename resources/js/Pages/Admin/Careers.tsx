import { Head } from '@inertiajs/react';
import { AdminCareerItem } from '../../types/AdminDashboardTypes';
import { renderAdminPersistentLayout } from '../../Layouts/AdminInertiaShell';
import { useAdminShell } from '../../Layouts/AdminShellContext';
import { submitInertiaMutation } from '../../services/AdminInertiaBridge';
import { AdminCareersSection } from '../../admin/admin-careers/AdminCareersSection';

interface CareersPageProps {
  careers: AdminCareerItem[];
}

function CareersPage({ careers }: CareersPageProps) {
  const { headerSearch, showAlert } = useAdminShell();
  const handleError = (message: string) => showAlert(message, 'warning');

  const handleSaveCareer = (
    payload: Omit<AdminCareerItem, 'id' | 'updatedAt'>,
    editId?: string,
  ) => {
    if (editId) {
      submitInertiaMutation('put', `/admin/careers/${editId}`, payload, handleError);
      return;
    }
    submitInertiaMutation('post', '/admin/careers', payload, handleError);
  };

  const handleDeleteCareer = (id: string) => {
    submitInertiaMutation('delete', `/admin/careers/${id}`, undefined, handleError);
  };

  const handleToggleStatus = (id: string) => {
    submitInertiaMutation('patch', `/admin/careers/${id}/toggle-status`, {}, handleError);
  };

  return (
    <>
      <Head title="Karir & Lowongan Kerja" />
      <AdminCareersSection
        careers={careers}
        externalSearch={headerSearch}
        onSaveCareer={handleSaveCareer}
        onDeleteCareer={handleDeleteCareer}
        onToggleStatus={handleToggleStatus}
      />
    </>
  );
}

CareersPage.layout = renderAdminPersistentLayout;

export default CareersPage;
