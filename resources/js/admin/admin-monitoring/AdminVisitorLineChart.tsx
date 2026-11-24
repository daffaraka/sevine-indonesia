import React, { useMemo, useState } from 'react';
import { DailyVisitorMetricItem } from '../../types/AdminDashboardTypes';

interface AdminVisitorLineChartProps {
  series: DailyVisitorMetricItem[];
  metricMode: 'uniqueVisitors' | 'pageViews';
}

interface ChartPoint {
  x: number;
  y: number;
  value: number;
  prevValue: number | null;
  item: DailyVisitorMetricItem;
  index: number;
}

const CHART_WIDTH = 720;
const CHART_HEIGHT = 248;
const PAD = { top: 28, right: 24, bottom: 34, left: 48 };
const PLOT_W = CHART_WIDTH - PAD.left - PAD.right;
const PLOT_H = CHART_HEIGHT - PAD.top - PAD.bottom;

function calcNiceCeiling(rawMax: number): number {
  if (rawMax <= 10) return 10;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawMax)));
  const step = magnitude / 2;
  return Math.ceil((rawMax * 1.12) / step) * step;
}

function buildSmoothPath(points: ChartPoint[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  return points.reduce((path, point, idx) => {
    if (idx === 0) return `M ${point.x} ${point.y}`;
    const prev = points[idx - 1];
    const midX = (prev.x + point.x) / 2;
    return `${path} C ${midX} ${prev.y}, ${midX} ${point.y}, ${point.x} ${point.y}`;
  }, '');
}

function formatDeltaText(current: number, previous: number | null): string {
  if (previous === null || previous <= 0) return 'Hari awal periode';
  const diff = current - previous;
  const pct = Math.round((diff / previous) * 100);
  if (diff > 0) return `Naik ${pct}% dari hari sebelumnya`;
  if (diff < 0) return `Turun ${Math.abs(pct)}% dari hari sebelumnya`;
  return 'Sama seperti hari sebelumnya';
}

export const AdminVisitorLineChart: React.FC<AdminVisitorLineChartProps> = ({
  series,
  metricMode,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const unitLabel = metricMode === 'uniqueVisitors' ? 'pengunjung' : 'halaman dibuka';
  const baselineY = PAD.top + PLOT_H;

  const { points, yTicks, peakIndex } = useMemo(() => {
    const values = series.map((item) => item[metricMode]);
    const ceiling = calcNiceCeiling(Math.max(1, ...values));
    const ticks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
      value: Math.round(ceiling * ratio),
      y: baselineY - ratio * PLOT_H,
    }));

    let maxIdx = 0;
    values.forEach((v, i) => {
      if (v >= values[maxIdx]) maxIdx = i;
    });

    const stepX = series.length > 1 ? PLOT_W / (series.length - 1) : 0;
    const mapped: ChartPoint[] = series.map((item, idx) => {
      const value = item[metricMode];
      const x = series.length > 1 ? PAD.left + idx * stepX : PAD.left + PLOT_W / 2;
      const y = baselineY - (value / ceiling) * PLOT_H;
      return {
        x,
        y,
        value,
        prevValue: idx > 0 ? series[idx - 1][metricMode] : null,
        item,
        index: idx,
      };
    });

    return { points: mapped, yTicks: ticks, peakIndex: maxIdx };
  }, [series, metricMode, baselineY]);

  const activeIdx = hoveredIdx !== null && hoveredIdx < points.length ? hoveredIdx : points.length - 1;
  const activePoint = points[activeIdx];
  const linePath = useMemo(() => buildSmoothPath(points), [points]);
  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const first = points[0];
    const last = points[points.length - 1];
    return `${linePath} L ${last.x} ${baselineY} L ${first.x} ${baselineY} Z`;
  }, [linePath, points, baselineY]);

  const isDense = points.length > 8;

  return (
    <div className="space-y-2.5">
      {/* Ringkasan Titik Aktif (Hover / Hari Ini) */}
      {activePoint && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
            <span className="font-semibold text-doff-navy">{activePoint.item.label}:</span>
            <span className="font-mono font-bold text-blue-700">
              {activePoint.value.toLocaleString('id-ID')} {unitLabel}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            {formatDeltaText(activePoint.value, activePoint.prevValue)}
          </span>
        </div>
      )}

      {/* SVG Line Chart */}
      <div className="overflow-x-auto pb-1">
        <div className="min-w-[460px]">
          <svg
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            className="w-full h-auto select-none"
            role="img"
            aria-label="Grafik garis perkembangan pengunjung harian"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <defs>
              <linearGradient id="sevineVisitorAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.01" />
              </linearGradient>
            </defs>

            {/* Garis Referensi Horizontal & Label Sumbu Y */}
            {yTicks.map((tick) => (
              <g key={tick.value}>
                <line
                  x1={PAD.left}
                  y1={tick.y}
                  x2={CHART_WIDTH - PAD.right}
                  y2={tick.y}
                  stroke={tick.value === 0 ? '#CBD5E1' : '#E2E8F0'}
                  strokeDasharray={tick.value === 0 ? undefined : '4 4'}
                  strokeWidth="1"
                />
                <text
                  x={PAD.left - 10}
                  y={tick.y + 4}
                  textAnchor="end"
                  className="fill-slate-400 text-[10px] font-mono"
                >
                  {tick.value.toLocaleString('id-ID')}
                </text>
              </g>
            ))}

            {/* Area Gradien di Bawah Garis */}
            {areaPath && <path d={areaPath} fill="url(#sevineVisitorAreaFill)" />}

            {/* Garis Vertikal Penanda Titik Aktif */}
            {activePoint && (
              <line
                x1={activePoint.x}
                y1={PAD.top}
                x2={activePoint.x}
                y2={baselineY}
                stroke="#93C5FD"
                strokeDasharray="3 3"
                strokeWidth="1.25"
              />
            )}

            {/* Garis Tren Utama */}
            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Titik Data, Label Angka, & Area Interaksi */}
            {points.map((point) => {
              const isActive = point.index === activeIdx;
              const isToday = point.index === points.length - 1;
              const showValueLabel =
                !isDense || isActive || point.index === 0 || isToday || point.index === peakIndex;
              const showDateLabel = !isDense || point.index % 2 === 0 || isToday;
              const hitWidth = points.length > 1 ? PLOT_W / (points.length - 1) : PLOT_W;

              return (
                <g
                  key={point.item.date}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(point.index)}
                  onClick={() => setHoveredIdx(point.index)}
                >
                  <rect
                    x={point.x - hitWidth / 2}
                    y={PAD.top}
                    width={hitWidth}
                    height={PLOT_H + PAD.bottom}
                    fill="transparent"
                  />

                  {isActive && (
                    <circle cx={point.x} cy={point.y} r="10" fill="#2563EB" fillOpacity="0.14" />
                  )}

                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isActive ? 5.5 : 4}
                    fill={isActive || isToday ? '#2563EB' : '#FFFFFF'}
                    stroke={isActive || isToday ? '#1D4ED8' : '#1B2E4B'}
                    strokeWidth="2"
                  />

                  {showValueLabel && (
                    <text
                      x={point.x}
                      y={point.y - 12}
                      textAnchor="middle"
                      className={`text-[10px] font-mono ${
                        isActive ? 'fill-blue-700 font-bold' : 'fill-slate-600 font-semibold'
                      }`}
                    >
                      {point.value.toLocaleString('id-ID')}
                    </text>
                  )}

                  {showDateLabel && (
                    <text
                      x={point.x}
                      y={CHART_HEIGHT - 10}
                      textAnchor="middle"
                      className={`text-[10px] font-mono ${
                        isToday || isActive ? 'fill-blue-700 font-bold' : 'fill-slate-500'
                      }`}
                    >
                      {point.item.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
