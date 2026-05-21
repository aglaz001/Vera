import React from 'react';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Sparkline, TrendArrow } from '../components/ui/Sparkline';
import { useDrawer } from '../components/ui/DetailDrawer';
import { savingsSummary, interventions } from '../data/mockData';

const MONTHLY_SAVINGS = [8, 10, 12, 11, 14, 12, 13, 15, 14, 16, 15, 17];
const CUMULATIVE = MONTHLY_SAVINGS.reduce((acc: number[], v) => { acc.push((acc[acc.length - 1] || 0) + v); return acc; }, [] as number[]);
const ROI_DATA = interventions.map(i => ({ name: i.name.split(' ').slice(0, 2).join(' '), roi: i.roi, savings: i.annualSavings, invest: i.investment }));

export const CostSavings: React.FC = () => {
  const { openDrawer } = useDrawer();
  const s = savingsSummary;
  const progressPct = Math.round((s.totalSaved / s.annualTarget) * 100);
  const compassRevenue = Math.round(s.totalSaved * s.compassShare);
  const netToCompany = s.totalSaved - compassRevenue;
  const monthlyAvg = Math.round(s.totalSaved / 12 / 1000);

  return (
    <div className="w-full">
      <div className="pb-20 px-4 md:px-8 pt-8 max-w-[1200px] mx-auto">
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-headline italic text-primary mb-2">Cost Savings</h1>
            <p className="text-on-surface-variant text-sm max-w-xl">Financial impact of sustainability interventions — verified operational savings.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Progress to Target</p>
              <p className="text-2xl font-bold text-primary">{progressPct}%</p>
            </div>
            <ProgressRing percentage={progressPct} size={52} strokeWidth={4} color="#e8a200" showValue={false} />
          </div>
        </header>

        {/* Hero financial cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8 vera-fade-up d-0">
          <div className="lg:col-span-1 bg-primary-container text-white rounded-2xl p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Total Saved</p>
            <p className="text-3xl font-bold">USD {(s.totalSaved / 1000).toFixed(0)}k</p>
            <TrendArrow value={22} suffix="% vs prev year" />
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Annual Target</p>
            <p className="text-2xl font-bold text-primary">USD {(s.annualTarget / 1000).toFixed(0)}k</p>
            <div className="h-2 bg-surface-container-high rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#e8a200] rounded-full vera-bar" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Net to Company</p>
            <p className="text-2xl font-bold text-secondary">USD {(netToCompany / 1000).toFixed(0)}k</p>
            <p className="text-[9px] text-on-surface-variant mt-1">After Compass share</p>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Compass Share (25%)</p>
            <p className="text-2xl font-bold text-primary">USD {(compassRevenue / 1000).toFixed(0)}k</p>
            <p className="text-[9px] text-on-surface-variant mt-1">Performance fee</p>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Monthly Avg</p>
            <p className="text-2xl font-bold text-primary">USD {monthlyAvg}k</p>
            <Sparkline data={MONTHLY_SAVINGS} width={80} height={20} color="#e8a200" fillColor="#e8a200" strokeWidth={1} showDot={false} />
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly savings chart */}
          <div className="vera-fade-up d-100 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
            <h3 className="text-sm font-bold text-primary mb-1">Monthly Savings (USD k)</h3>
            <p className="text-[10px] text-on-surface-variant mb-4">Verified savings by month, FY 2024</p>
            <div className="overflow-x-auto">
              <svg width={MONTHLY_SAVINGS.length * 44 + 20} height={140} className="block">
                {[0.25, 0.5, 0.75].map(p => <line key={p} x1={0} y1={140 * (1 - p) - 10} x2={MONTHLY_SAVINGS.length * 44 + 20} y2={140 * (1 - p) - 10} stroke="#e6e2db" strokeWidth={0.5} />)}
                {MONTHLY_SAVINGS.map((v, i) => {
                  const maxV = Math.max(...MONTHLY_SAVINGS);
                  const h = (v / maxV) * 100;
                  const x = i * 44 + 10;
                  return (
                    <g key={i} className="group cursor-pointer">
                      <rect x={x} y={130 - h} width={28} height={h} rx={6} fill="#e8a200" className="vera-chart-bar" style={{ animationDelay: `${i * 60}ms` }} opacity={0.85} />
                      <rect x={x} y={130 - h} width={28} height={h} rx={6} fill="#e8a200" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      <text x={x + 14} y={125 - h} textAnchor="middle" className="fill-primary text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">{v}k</text>
                      <text x={x + 14} y={150} textAnchor="middle" className="fill-on-surface-variant text-[8px] font-bold uppercase">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Cumulative trend */}
          <div className="vera-fade-up d-200 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
            <h3 className="text-sm font-bold text-primary mb-1">Cumulative Savings</h3>
            <p className="text-[10px] text-on-surface-variant mb-4">Running total vs annual target (USD {(s.annualTarget / 1000).toFixed(0)}k)</p>
            <Sparkline data={CUMULATIVE} width={440} height={100} color="#1a4d2e" fillColor="#1a4d2e" strokeWidth={2} />
            <div className="flex items-center justify-between mt-3">
              <span className="text-[9px] text-on-surface-variant">Jan</span>
              <span className="text-[9px] text-on-surface-variant">Dec</span>
            </div>
          </div>
        </div>

        {/* Savings by category */}
        <div className="vera-fade-up d-150 grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Energy', value: s.energySaved, icon: 'bolt', color: '#e8a200', pct: Math.round(s.energySaved / s.totalSaved * 100), detail: 'LED retrofit, efficiency programs' },
            { label: 'Water', value: s.waterSaved, icon: 'water_drop', color: '#5b7fde', pct: Math.round(s.waterSaved / s.totalSaved * 100), detail: 'Recycling, leak repairs' },
            { label: 'Waste', value: s.wasteSaved, icon: 'delete_sweep', color: '#2d6a3f', pct: Math.round(s.wasteSaved / s.totalSaved * 100), detail: 'Scrap revenue, diversion' },
          ].map((item) => (
            <div key={item.label} className="vera-card bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20 cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                  <span className="material-symbols-outlined text-[14px]" style={{ color: item.color }}>{item.icon}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{item.label}</span>
              </div>
              <p className="text-xl font-bold text-primary mb-1">USD {(item.value / 1000).toFixed(0)}k</p>
              <div className="h-2 bg-surface-container-high rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full vera-bar" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
              </div>
              <p className="text-[9px] text-on-surface-variant">{item.pct}% of total · {item.detail}</p>
            </div>
          ))}
        </div>

        {/* ROI comparison */}
        <div className="vera-fade-up d-250 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 mb-8">
          <h3 className="text-sm font-bold text-primary mb-4">ROI Comparison by Intervention</h3>
          <div className="space-y-3">
            {ROI_DATA.map((r) => (
              <div key={r.name} className="flex items-center gap-4">
                <span className="text-xs font-medium text-primary w-28 truncate">{r.name}</span>
                <div className="flex-1 h-3 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full rounded-full vera-bar" style={{ width: `${Math.min(100, (1 / r.roi) * 100)}%`, backgroundColor: r.roi < 2 ? '#2d6a3f' : r.roi < 3 ? '#e8a200' : '#ba1a1a' }} />
                </div>
                <span className="text-xs font-bold text-primary w-14 text-right">{r.roi.toFixed(1)} yrs</span>
                <span className="text-[9px] text-on-surface-variant w-16 text-right">USD {(r.savings / 1000).toFixed(0)}k/yr</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interventions Table */}
        <div className="vera-fade-up d-300 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/15 flex items-center justify-between">
            <h3 className="text-sm font-bold text-primary">Interventions Register</h3>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{interventions.length} interventions</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/15">
                <th className="px-6 py-3">Intervention</th><th className="px-6 py-3">Area</th><th className="px-6 py-3">Investment</th><th className="px-6 py-3">Annual Savings</th><th className="px-6 py-3">ROI</th><th className="px-6 py-3">Net Impact</th><th className="px-6 py-3">Evidence</th><th className="px-6 py-3">Status</th>
              </tr></thead>
              <tbody>{interventions.map((row, i) => {
                const netImpact = row.annualSavings - row.investment;
                return (
                  <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                    onClick={() => openDrawer(row.name, <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-surface-container-low rounded-xl"><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Investment</p><p className="text-xl font-bold text-primary mt-1">USD {row.investment.toLocaleString()}</p></div>
                        <div className="p-4 bg-surface-container-low rounded-xl"><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Annual Savings</p><p className="text-xl font-bold text-secondary mt-1">USD {row.annualSavings.toLocaleString()}</p></div>
                      </div>
                      <div className="p-4 bg-surface-container-low rounded-xl"><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Payback Period</p><p className="text-2xl font-bold text-primary mt-1">{row.roi.toFixed(1)} years</p><div className="h-2.5 bg-surface-container-high rounded-full overflow-hidden mt-2"><div className="h-full rounded-full vera-bar" style={{ width: `${Math.min(100, (1 / row.roi) * 100)}%`, backgroundColor: row.roi < 2 ? '#2d6a3f' : '#e8a200' }} /></div></div>
                      <div className="p-4 bg-surface-container-low rounded-xl"><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Net First-Year Impact</p><p className={`text-xl font-bold mt-1 ${netImpact >= 0 ? 'text-secondary' : 'text-error'}`}>USD {netImpact.toLocaleString()}</p></div>
                      {row.evidence && <div className="p-4 bg-surface-container-low rounded-xl flex items-center gap-3"><span className="material-symbols-outlined text-[16px] text-secondary">attach_file</span><span className="text-sm text-primary font-medium">{row.evidence}</span></div>}
                    </div>)}>
                    <td className="px-6 py-3.5 text-sm font-medium text-primary">{row.name}</td>
                    <td className="px-6 py-3.5"><span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ color: row.area === 'Energy' ? '#e8a200' : row.area === 'Water' ? '#5b7fde' : '#2d6a3f', backgroundColor: row.area === 'Energy' ? '#e8a20012' : row.area === 'Water' ? '#5b7fde12' : '#2d6a3f12' }}>{row.area}</span></td>
                    <td className="px-6 py-3.5 text-sm text-on-surface">USD {row.investment.toLocaleString()}</td>
                    <td className="px-6 py-3.5 text-sm font-bold text-secondary">USD {row.annualSavings.toLocaleString()}</td>
                    <td className="px-6 py-3.5"><span className={`text-sm font-bold ${row.roi < 2 ? 'text-secondary' : 'text-primary'}`}>{row.roi.toFixed(1)} yrs</span></td>
                    <td className="px-6 py-3.5"><span className={`text-sm font-bold ${netImpact >= 0 ? 'text-secondary' : 'text-error'}`}>{netImpact >= 0 ? '+' : ''}USD {(netImpact / 1000).toFixed(0)}k</span></td>
                    <td className="px-6 py-3.5">{row.evidence ? <span className="material-symbols-outlined text-[14px] text-secondary">attach_file</span> : <span className="text-[10px] text-on-surface-variant">—</span>}</td>
                    <td className="px-6 py-3.5"><StatusBadge status={row.status} size="sm" /></td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
