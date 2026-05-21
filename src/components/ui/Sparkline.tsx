import React from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillColor?: string;
  strokeWidth?: number;
  showDot?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 100,
  height = 32,
  color = '#1a4d2e',
  fillColor,
  strokeWidth = 1.5,
  showDot = true,
}) => {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 4;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const points = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * w,
    y: pad + h - ((v - min) / range) * h,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const fillD = `${pathD} L${points[points.length - 1].x.toFixed(1)},${height} L${points[0].x.toFixed(1)},${height} Z`;
  const last = points[points.length - 1];

  return (
    <svg width={width} height={height} className="block overflow-visible">
      {/* Fill area */}
      {fillColor && (
        <path d={fillD} fill={fillColor} opacity={0.15} />
      )}
      {/* Line */}
      <path d={pathD} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {/* End dot */}
      {showDot && (
        <>
          <circle cx={last.x} cy={last.y} r={3} fill={color} />
          <circle cx={last.x} cy={last.y} r={6} fill={color} opacity={0.15}>
            <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
};

/* ─── Trend Arrow ─────────────────────────────────────────────────────────── */

interface TrendProps {
  value: number; // positive = up, negative = down
  suffix?: string;
}

export const TrendArrow: React.FC<TrendProps> = ({ value, suffix = '%' }) => {
  const isUp = value > 0;
  const isFlat = value === 0;
  const color = isFlat ? '#8a9a8e' : isUp ? '#2d6a3f' : '#ba1a1a';
  const icon = isFlat ? 'remove' : isUp ? 'trending_up' : 'trending_down';

  return (
    <span className="inline-flex items-center gap-0.5 text-[11px] font-bold" style={{ color }}>
      <span className="material-symbols-outlined text-[13px]">{icon}</span>
      {Math.abs(value)}{suffix}
    </span>
  );
};

/* ─── Live Dot ────────────────────────────────────────────────────────────── */

export const LiveDot: React.FC<{ label?: string }> = ({ label = 'Live' }) => (
  <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: '#2d6a3f' }}>
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2d6a3f] opacity-40" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2d6a3f]" />
    </span>
    {label}
  </span>
);

/* ─── Mini Bar Chart ──────────────────────────────────────────────────────── */

interface MiniBarProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  barWidth?: number;
}

export const MiniBar: React.FC<MiniBarProps> = ({
  data,
  width = 80,
  height = 28,
  color = '#1a4d2e',
  barWidth = 4,
}) => {
  const max = Math.max(...data) || 1;
  const gap = (width - data.length * barWidth) / (data.length - 1 || 1);

  return (
    <svg width={width} height={height} className="block">
      {data.map((v, i) => {
        const h = (v / max) * (height - 2);
        const x = i * (barWidth + gap);
        return (
          <rect
            key={i}
            x={x}
            y={height - h}
            width={barWidth}
            height={h}
            rx={1.5}
            fill={color}
            opacity={i === data.length - 1 ? 1 : 0.4}
          />
        );
      })}
    </svg>
  );
};
