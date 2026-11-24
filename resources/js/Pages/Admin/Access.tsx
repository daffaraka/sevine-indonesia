import { Head } from '@inertiajs/react';
import { AdminRoleItem } from '../../types/AdminDashboardTypes';
import { renderAdminPersistentLayout } from '../../Layouts/AdminInertiaShell';
import { useAdminShell } from '../../Layouts/AdminShellContext';
import { submitInertiaMutation } from '../../services/AdminInertiaBridge';
import { AdminRbacSection } from '../../admin/admin-access/AdminRbacSection';

interface AccessPageProps {
  roles: AdminRoleItem[];
}

function AccessPage({ roles }: AccessPageProps) {
  const { activeRole, switchActiveRole, showAlert } = useAdminShell();
  const handleError = (message: string) => showAlert(message, 'warning');

  const handleSaveRole = (payload: Omit<AdminRoleItem, 'id'>, editId?: string) => {
    if (editId) {
      submitInertiaMutation('put', `/admin/roles/${editId}`, payload, handleError);
      return;
    }
    submitInertiaMutation('post', '/admin/roles', payload, handleError);
  };

  const handleDeleteRole = (id: string) => {
    submitInertiaMutation('delete', `/admin/roles/${id}`, undefined, handleError);
  };

  return (
    <>
      <Head title="Hak Akses & Role (RBAC)" />
      <AdminRbacSection
        roles={roles}
        activeRoleId={activeRole.id}
        onSwitchRole={switchActiveRole}
        onSaveRole={handleSaveRole}
        onDeleteRole={handleDeleteRole}
      />
    </>
  );
}

AccessPage.layout = renderAdminPersistentLayout;

export default AccessPage;
