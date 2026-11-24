import React from 'react';
import { MetricStatItem, MetricColorTheme } from '../../types/AdminDashboardTypes';

interface AdminMetricCardItemProps {
  stat: MetricStatItem;
}

export const AdminMetricCardItem: React.FC<AdminMetricCardItemProps> = ({ stat }) => {
  const theme = stat.colorTheme || 'blue';

  const cardThemeStyles: Record<
    MetricColorTheme,
    { card: string; title: string; value: string; unit: string; desc: string; badge: string }
  > = {
    blue: {
      card: 'bg-blue-50/80 border-blue-200 hover:border-blue-300',
      title: 'text-blue-800',
      value: 'text-blue-950',
      unit: 'text-blue-700',
      desc: 'text-blue-700/80',
      badge: 'bg-blue-600 text-white border-blue-600',
    },
    sky: {
      card: 'bg-sky-50/80 border-sky-200 hover:border-sky-300',
      title: 'text-sky-800',
      value: 'text-sky-950',
      unit: 'text-sky-700',
      desc: 'text-sky-700/80',
      badge: 'bg-sky-600 text-white border-sky-600',
    },
    emerald: {
      card: 'bg-emerald-50/80 border-emerald-200 hover:border-emerald-300',
      title: 'text-emerald-800',
      value: 'text-emerald-950',
      unit: 'text-emerald-700',
      desc: 'text-emerald-700/80',
      badge: 'bg-emerald-600 text-white border-emerald-600',
    },
    amber: {
      card: 'bg-amber-50/80 border-amber-200 hover:border-amber-300',
      title: 'text-amber-800',
      value: 'text-amber-950',
      unit: 'text-amber-700',
      desc: 'text-amber-700/80',
      badge: 'bg-amber-600 text-white border-amber-600',
    },
    rose: {
      card: 'bg-rose-50/80 border-rose-200 hover:border-rose-300',
      title: 'text-rose-800',
      value: 'text-rose-950',
      unit: 'text-rose-700',
      desc: 'text-rose-700/80',
      badge: 'bg-rose-600 text-white border-rose-600',
    },
  };

  const currentStyle = cardThemeStyles[theme];

  return (
    <div
      className={`border rounded-lg p-4 space-y-2 shadow-sm transition-all hover:-translate-y-0.5 ${currentStyle.card}`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${currentStyle.title}`}>
          {stat.title}
        </span>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold shadow-2xs ${currentStyle.badge}`}
        >
          {stat.badgeText}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`font-mono text-2xl sm:text-3xl font-bold tracking-tight ${currentStyle.value}`}>
          {stat.value}
        </span>
        <span className={`text-xs font-mono font-medium ${currentStyle.unit}`}>{stat.unit}</span>
      </div>
      <p className={`text-[11px] font-mono ${currentStyle.desc}`}>{stat.description}</p>
    </div>
  );
};
