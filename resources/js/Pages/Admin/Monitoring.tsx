import { Head } from '@inertiajs/react';
import {
  AdminBrandItem,
  AdminCareerItem,
  AdminMonitoringServerPayload,
} from '../../types/AdminDashboardTypes';
import { renderAdminPersistentLayout } from '../../Layouts/AdminInertiaShell';
import { useAdminShell } from '../../Layouts/AdminShellContext';
import { AdminMonitoringSection } from '../../admin/admin-monitoring/AdminMonitoringSection';

interface MonitoringPageProps {
  brands: AdminBrandItem[];
  careers: AdminCareerItem[];
  monitoring: AdminMonitoringServerPayload;
  liveOnlineVisitors?: number;
}

function MonitoringPage({
  brands,
  careers,
  monitoring,
  liveOnlineVisitors,
}: MonitoringPageProps) {
  const { showAlert } = useAdminShell();

  return (
    <>
      <Head title="Laporan Kunjungan & Kondisi Website" />
      <AdminMonitoringSection
        brands={brands}
        careers={careers}
        liveOnlineVisitors={monitoring?.liveOnlineVisitors ?? liveOnlineVisitors ?? 0}
        activityLogs={monitoring?.recentActivities ?? []}
        serverMonitoring={monitoring}
        isInertiaMode
        onPulseLiveVisitors={() => undefined}
        onLogMonitoringEvent={(_actionLabel, targetLabel) => showAlert(targetLabel, 'info')}
      />
    </>
  );
}

MonitoringPage.layout = renderAdminPersistentLayout;

export default MonitoringPage;
