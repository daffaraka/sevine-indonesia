import React from 'react';
import { MetricStatItem } from '../../types/AdminDashboardTypes';
import { AdminMetricCardItem } from './AdminMetricCardItem';

interface AdminMetricStatGridProps {
  stats: MetricStatItem[];
}

export const AdminMetricStatGrid: React.FC<AdminMetricStatGridProps> = ({ stats }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Metrik Operasional">
      {stats.map((stat) => (
        <AdminMetricCardItem key={stat.id} stat={stat} />
      ))}
    </section>
  );
};
