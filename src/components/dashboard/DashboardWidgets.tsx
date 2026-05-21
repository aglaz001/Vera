import React from 'react';
import { ProgressRing } from '../ui/ProgressRing';
import { StatusBadge } from '../ui/StatusBadge';
import { TrendArrow } from '../ui/Sparkline';
import { useDrawer } from '../ui/DetailDrawer';
import { dashboardKPIs, emissionsTrend, frameworkReadiness, deadlines, doNextTasks, activityFeed } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';

/* ═══════════════════════════════════════════════════════════════════════════ */
export const WelcomeBand: React.FC = () => {
  const { user, company } = useAppContext();
  
  return (
  <div className="vera-fade-up d-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #1a4d2e, transparent)' }} />
        <span className="text-[9px] font-bold uppercase tracking-[0.3em]" style={{ color: '#1a4d2e', opacity: 0.75 }}>
          FY 2025 · Jan – Dec 2024
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl text-primary font-headline italic leading-tight mb-2">Bom dia, {user.firstName}</h2>
      <p className="text-on-surface-variant text-sm leading-relaxed">
        {company.name} · {company.sector} · {company.country} · {company.employees} employees
      </p>
    </div>
    <div className="flex items-center gap-5">
      <div className="text-right">
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">ESG Readiness</p>
        <p className="text-4xl font-bold text-primary">{dashboardKPIs.esgReadiness}<span className="text-lg opacity-40">%</span></p>
        <TrendArrow value={4.2} suffix="% vs last quarter" />
      </div>
      <ProgressRing percentage={dashboardKPIs.esgReadiness} size={64} strokeWidth={5} color="#1a4d2e" showValue={false} />
    </div>
  </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════ */
const KPI_ITEMS = [
  { label: 'Environment', value: dashboardKPIs.environment, color: '#2d6a3f', icon: 'eco', trend: -3.8, detail: '506.6 tCO₂e total' },
  { label: 'Social', value: dashboardKPIs.social, color: '#5b7fde', icon: 'group', trend: 2.1, detail: '342 employees tracked' },
  { label: 'Governance', value: dashboardKPIs.governance, color: '#8a6d3b', icon: 'gavel', trend: 1.5, detail: '60% board independence' },
  { label: 'Cost Savings vs Target', value: dashboardKPIs.costSavingsVsTarget, color: '#e8a200', icon: 'savings', trend: 8.5, detail: 'USD 142k of 350k' },
];

export const KPIRow: React.FC = () => (
  <div className="vera-fade-up d-100 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {KPI_ITEMS.map((kpi, idx) => (
      <div key={kpi.label} className="vera-card bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20 cursor-pointer vera-fade-up" style={{ animationDelay: `${120 + idx * 80}ms` }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
              <span className="material-symbols-outlined text-[14px]" style={{ color: kpi.color }}>{kpi.icon}</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">{kpi.label}</span>
          </div>
          <TrendArrow value={kpi.trend} />
        </div>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">{kpi.value}<span className="text-sm opacity-40 ml-0.5">%</span></span>
            <p className="text-[9px] text-on-surface-variant mt-0.5">{kpi.detail}</p>
          </div>
          <ProgressRing percentage={kpi.value} size={44} strokeWidth={4} color={kpi.color} showValue={false} />
        </div>
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
export const EmissionsChart: React.FC = () => {
  const data = emissionsTrend;
  const maxVal = Math.max(...data.flatMap(d => [d.scope1 + d.scope2, d.benchmark]));
  const chartH = 200;
  const barW = 30;
  const gap = 12;
  const totalW = data.length * (barW + gap) + 20;

  // Benchmark line path for animated drawing
  const benchPoints = data.map((d, i) => {
    const x = i * (barW + gap) + 10 + barW / 2;
    const y = chartH - (d.benchmark / maxVal) * chartH;
    return `${x},${y}`;
  });
  const benchPath = `M${benchPoints.join(' L')}`;

  // Totals for header
  const totalCurrent = data[data.length - 1].scope1 + data[data.length - 1].scope2;
  const totalPrev = data[0].scope1 + data[0].scope2;
  const changePct = -Math.round(((totalPrev - totalCurrent) / totalPrev) * 100);

  return (
    <div className="vera-fade-up d-200 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 mb-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-primary">Emissions Trend</h3>
          <p className="text-[11px] text-on-surface-variant">Monthly Scope 1 + 2 vs Benchmark (tCO₂e)</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-primary" />Scope 1</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-secondary" />Scope 2</span>
            <span className="flex items-center gap-1.5"><span className="w-8 h-0.5 rounded-sm bg-error/60" />Benchmark</span>
          </div>
          <div className="text-right pl-4 border-l border-outline-variant/20">
            <p className="text-lg font-bold text-primary">{totalCurrent} <span className="text-xs opacity-50">tCO₂e</span></p>
            <TrendArrow value={changePct} suffix="% YoY" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <svg width={totalW} height={chartH + 35} className="block">
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map(pct => (
            <line key={pct} x1={0} y1={chartH * (1 - pct)} x2={totalW} y2={chartH * (1 - pct)} stroke="#e6e2db" strokeWidth={0.5} />
          ))}
          {/* Bars */}
          {data.map((d, i) => {
            const x = i * (barW + gap) + 10;
            const s1H = (d.scope1 / maxVal) * chartH;
            const s2H = (d.scope2 / maxVal) * chartH;
            return (
              <g key={d.month} className="group">
                {/* Hover highlight */}
                <rect x={x - 4} y={0} width={barW + 8} height={chartH} fill="transparent" className="cursor-pointer" />
                {/* Scope 2 (top) */}
                <rect x={x} y={chartH - s1H - s2H} width={barW} height={s2H} rx={5} ry={5} fill="#1a4d2e" className="vera-chart-bar" style={{ animationDelay: `${i * 60}ms` }}>
                  <animate attributeName="opacity" from="0.6" to="1" dur="0.4s" begin={`${i * 60}ms`} fill="freeze" />
                </rect>
                {/* Scope 1 (bottom) */}
                <rect x={x} y={chartH - s1H} width={barW} height={s1H} rx={5} ry={5} fill="#03270e" className="vera-chart-bar" style={{ animationDelay: `${i * 60 + 30}ms` }}>
                  <animate attributeName="opacity" from="0.6" to="1" dur="0.4s" begin={`${i * 60 + 30}ms`} fill="freeze" />
                </rect>
                {/* Value label on hover */}
                <text x={x + barW / 2} y={chartH - s1H - s2H - 8} textAnchor="middle" className="fill-primary text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">{d.scope1 + d.scope2}</text>
                {/* Month label */}
                <text x={x + barW / 2} y={chartH + 18} textAnchor="middle" className="fill-on-surface-variant text-[9px] font-bold uppercase">{d.month}</text>
              </g>
            );
          })}
          {/* Animated benchmark line */}
          <path d={benchPath} fill="none" stroke="#ba1a1a" strokeWidth={2} strokeDasharray="6 4" opacity={0.5} strokeLinecap="round">
            <animate attributeName="stroke-dashoffset" from="600" to="0" dur="2s" fill="freeze" />
          </path>
          {/* Benchmark dots */}
          {data.map((d, i) => {
            const cx = i * (barW + gap) + 10 + barW / 2;
            const cy = chartH - (d.benchmark / maxVal) * chartH;
            return <circle key={i} cx={cx} cy={cy} r={2.5} fill="#ba1a1a" opacity={0.5}><animate attributeName="r" from="0" to="2.5" dur="0.3s" begin={`${1.5 + i * 0.05}s`} fill="freeze" /></circle>;
          })}
        </svg>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════ */
export const PillarScores: React.FC = () => (
  <div className="vera-fade-up d-300 flex gap-4 mb-8">
    {[
      { label: 'Environment', score: dashboardKPIs.environment, color: '#2d6a3f', icon: 'eco' },
      { label: 'Social', score: dashboardKPIs.social, color: '#5b7fde', icon: 'group' },
      { label: 'Governance', score: dashboardKPIs.governance, color: '#8a6d3b', icon: 'gavel' },
    ].map((p) => (
      <div key={p.label} className="flex flex-col items-center gap-2">
        <ProgressRing percentage={p.score} size={64} strokeWidth={5} color={p.color} />
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[12px]" style={{ color: p.color }}>{p.icon}</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">{p.label}</span>
        </div>
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
export const FrameworkReadiness: React.FC = () => (
  <div className="vera-fade-up d-350 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 mb-8">
    <h3 className="text-lg font-bold text-primary mb-5">Framework Readiness</h3>
    <div className="space-y-4">
      {frameworkReadiness.map((fw) => (
        <div key={fw.name} className="flex items-center gap-4">
          <span className="text-sm font-bold text-primary w-14">{fw.name}</span>
          <div className="flex-1 h-2.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full vera-bar" style={{ width: `${fw.progress}%` }} />
          </div>
          <span className="text-sm font-bold text-primary w-10 text-right">{fw.progress}%</span>
          <StatusBadge status={fw.status} size="sm" />
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
export const DoNextPanel: React.FC = () => (
  <div className="vera-fade-up d-400 bg-primary-container text-white rounded-2xl p-6 mb-8 relative overflow-hidden">
    <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-60 mb-5">Do Next</h3>
    <div className="space-y-3 relative z-10">
      {doNextTasks.map((task) => (
        <div key={task.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/8 hover:bg-white/15 transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[16px]">{task.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{task.title}</p>
            <span className="text-[9px] uppercase tracking-widest opacity-50">{task.framework}</span>
          </div>
          <span className="material-symbols-outlined text-[14px] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward</span>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
export const DeadlinesTable: React.FC = () => {
  const { openDrawer } = useDrawer();
  return (
    <div className="vera-fade-up d-450 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-outline-variant/15">
        <h3 className="text-lg font-bold text-primary">Upcoming Deadlines</h3>
      </div>
      <table className="w-full text-left">
        <thead><tr className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant border-b border-outline-variant/15">
          <th className="px-6 py-3">Framework</th><th className="px-6 py-3">Obligation</th><th className="px-6 py-3">Deadline</th><th className="px-6 py-3">Owner</th><th className="px-6 py-3">Urgency</th>
        </tr></thead>
        <tbody>{deadlines.map((d, i) => (
          <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
            onClick={() => openDrawer(d.obligation, (
              <div className="space-y-5">
                <div><span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Framework</span><p className="text-primary font-bold mt-1">{d.framework}</p></div>
                <div><span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Deadline</span><p className="text-primary font-bold mt-1">{d.deadline}</p></div>
                <div><span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Owner</span><p className="text-primary font-bold mt-1">{d.owner}</p></div>
              </div>
            ))}>
            <td className="px-6 py-3.5 text-xs font-bold text-primary">{d.framework}</td>
            <td className="px-6 py-3.5 text-sm text-on-surface">{d.obligation}</td>
            <td className="px-6 py-3.5 text-xs text-on-surface-variant">{d.deadline}</td>
            <td className="px-6 py-3.5 text-xs text-on-surface-variant">{d.owner}</td>
            <td className="px-6 py-3.5"><StatusBadge status={d.urgency} size="sm" /></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════ */
export const ActivityFeed: React.FC = () => (
  <div className="vera-fade-up d-500 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
    <h3 className="text-lg font-bold text-primary mb-5">Activity Feed</h3>
    <div className="space-y-1">
      {activityFeed.map((item) => (
        <div key={item.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-container-low/50 transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-primary/8">
            <span className="material-symbols-outlined text-[15px] text-primary">{item.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-on-surface group-hover:text-primary transition-colors">{item.action}</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5">{item.user} · {item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
