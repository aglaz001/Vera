import React, { useState } from 'react';
import { SubTabNav } from '../components/ui/SubTabNav';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Sparkline, TrendArrow, LiveDot } from '../components/ui/Sparkline';
import { useDrawer } from '../components/ui/DetailDrawer';
import { workforceMetrics, safetyMetrics, communityInvestments, supplyChainRisks } from '../data/mockData';

const TABS = [
  { key: 'workforce', label: 'Workforce', icon: 'badge' },
  { key: 'safety', label: 'Health & Safety', icon: 'health_and_safety' },
  { key: 'community', label: 'Community', icon: 'volunteer_activism' },
  { key: 'supply', label: 'Supply Chain', icon: 'local_shipping' },
];

const SPARK_TURNOVER = [14.5, 13.8, 13.2, 12.8, 12.3, 12.0, 11.8, 11.5, 11.2];
const SPARK_TRAINING = [10, 12, 13, 14, 15, 16, 17, 18, 18.5];
const SPARK_INCIDENTS = [4, 3, 2, 3, 1, 2, 1, 1, 0];
const SPARK_SAFE_DAYS = [12, 18, 25, 8, 30, 15, 22, 35, 42];

export const Social: React.FC = () => {
  const [tab, setTab] = useState('workforce');
  const { openDrawer } = useDrawer();
  const wf = workforceMetrics;
  const sf = safetyMetrics;

  return (
    <div className="w-full">
      <div className="pb-20 px-4 md:px-8 pt-8 max-w-[1200px] mx-auto">
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-headline italic text-primary mb-2">Social</h1>
            <p className="text-on-surface-variant text-sm max-w-xl">Workforce, safety, community impact, and supply chain responsibility.</p>
          </div>
          <div className="flex items-center gap-4">
            <LiveDot label="Live" />
            <ProgressRing percentage={72} size={52} strokeWidth={4} color="#5b7fde" label="Score" />
          </div>
        </header>

        <SubTabNav tabs={TABS} activeTab={tab} onChange={setTab} />

        {tab === 'workforce' && (
          <div className="vera-fade-up space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Total Employees', value: `${wf.totalEmployees}`, icon: 'group', color: '#5b7fde', trend: 3.2 },
                { label: 'Turnover Rate', value: `${wf.turnoverRate}%`, icon: 'trending_down', color: '#2d6a3f', trend: -2.8, spark: SPARK_TURNOVER },
                { label: 'Avg Training Hrs', value: `${wf.trainingHours}`, icon: 'school', color: '#e8a200', trend: 8.5, spark: SPARK_TRAINING },
                { label: 'Gender (Female)', value: `${wf.femalePercent}%`, icon: 'wc', color: '#8a6d3b', trend: 2.0 },
                { label: 'Avg Age', value: `${wf.avgAge}`, icon: 'person', color: '#1a4d2e', trend: 0 },
              ].map((m) => (
                <div key={m.label} className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `${m.color}12` }}>
                      <span className="material-symbols-outlined text-[12px]" style={{ color: m.color }}>{m.icon}</span>
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">{m.label}</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-xl font-bold text-primary">{m.value}</p>
                    <div className="flex flex-col items-end gap-1">
                      {m.spark && <Sparkline data={m.spark} width={48} height={18} color={m.color} strokeWidth={1} showDot={false} />}
                      <TrendArrow value={m.trend} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Workforce composition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
                <h3 className="text-sm font-bold text-primary mb-4">Employment Type</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Full-Time', value: wf.fullTime, pct: Math.round(wf.fullTime / wf.totalEmployees * 100) },
                    { label: 'Part-Time', value: wf.partTime, pct: Math.round(wf.partTime / wf.totalEmployees * 100) },
                    { label: 'Contractors', value: wf.contractors, pct: Math.round(wf.contractors / wf.totalEmployees * 100) },
                  ].map((e) => (
                    <div key={e.label} className="flex items-center gap-3">
                      <span className="text-xs text-on-surface-variant w-20">{e.label}</span>
                      <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-[#5b7fde] rounded-full vera-bar" style={{ width: `${e.pct}%` }} />
                      </div>
                      <span className="text-xs font-bold text-primary w-8 text-right">{e.value}</span>
                      <span className="text-[9px] text-on-surface-variant w-8 text-right">{e.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
                <h3 className="text-sm font-bold text-primary mb-4">Gender Distribution</h3>
                <div className="flex items-center gap-6">
                  <ProgressRing percentage={wf.femalePercent} size={72} strokeWidth={5} color="#5b7fde" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><span className="w-3 h-2 rounded-sm bg-[#5b7fde]" /><span className="text-xs text-on-surface-variant">Female: {wf.femalePercent}%</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-2 rounded-sm bg-primary" /><span className="text-xs text-on-surface-variant">Male: {wf.malePercent}%</span></div>
                    <p className="text-[10px] text-on-surface-variant mt-2">Avg Salary: {wf.avgSalary}/month</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Age Distribution + Department Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
                <h3 className="text-sm font-bold text-primary mb-4">Age Distribution</h3>
                <div className="space-y-3">
                  {[
                    { range: '18–25', count: 48, pct: 14 },
                    { range: '26–35', count: 112, pct: 33 },
                    { range: '36–45', count: 98, pct: 29 },
                    { range: '46–55', count: 58, pct: 17 },
                    { range: '56+', count: 26, pct: 7 },
                  ].map(a => (
                    <div key={a.range} className="flex items-center gap-3">
                      <span className="text-xs text-on-surface-variant w-12">{a.range}</span>
                      <div className="flex-1 h-3 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-[#5b7fde] rounded-full vera-bar" style={{ width: `${a.pct}%`, opacity: 0.5 + a.pct / 66 }} />
                      </div>
                      <span className="text-xs font-bold text-primary w-8 text-right">{a.count}</span>
                      <span className="text-[9px] text-on-surface-variant w-8 text-right">{a.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
                <h3 className="text-sm font-bold text-primary mb-4">Department Headcount</h3>
                <div className="space-y-3">
                  {[
                    { dept: 'Production', count: 142, color: '#1a4d2e' },
                    { dept: 'Admin & Finance', count: 58, color: '#5b7fde' },
                    { dept: 'Logistics', count: 45, color: '#e8a200' },
                    { dept: 'Quality & HSE', count: 38, color: '#2d6a3f' },
                    { dept: 'Sales', count: 32, color: '#8a6d3b' },
                    { dept: 'R&D / Engineering', count: 27, color: '#ba1a1a' },
                  ].map(d => (
                    <div key={d.dept} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="text-xs text-on-surface-variant flex-1">{d.dept}</span>
                      <div className="w-20 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full rounded-full vera-bar" style={{ width: `${Math.round(d.count / 342 * 100)}%`, backgroundColor: d.color }} />
                      </div>
                      <span className="text-xs font-bold text-primary w-8 text-right">{d.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Training Hours by Category */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-primary">Training Hours by Category</h3>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">6,327 total hours</span>
              </div>
              <div className="overflow-x-auto">
                <svg width={480} height={130} className="block">
                  {[
                    { label: 'H&S', hours: 2100, color: '#2d6a3f' },
                    { label: 'Technical', hours: 1800, color: '#1a4d2e' },
                    { label: 'ESG', hours: 950, color: '#5b7fde' },
                    { label: 'Leadership', hours: 680, color: '#8a6d3b' },
                    { label: 'Compliance', hours: 520, color: '#e8a200' },
                    { label: 'Other', hours: 277, color: '#ba1a1a' },
                  ].map((t, i) => {
                    const maxH = 2100;
                    const h = (t.hours / maxH) * 80;
                    const x = i * 76 + 10;
                    return (
                      <g key={t.label} className="group cursor-pointer">
                        <rect x={x} y={100 - h} width={50} height={h} rx={6} fill={t.color} className="vera-chart-bar" style={{ animationDelay: `${i * 80}ms` }} opacity={0.85} />
                        <text x={x + 25} y={95 - h} textAnchor="middle" className="fill-primary text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">{t.hours}</text>
                        <text x={x + 25} y={120} textAnchor="middle" className="fill-on-surface-variant text-[8px] font-bold uppercase">{t.label}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        )}

        {tab === 'safety' && (
          <div className="vera-fade-up space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Total Incidents', value: sf.totalIncidents, color: '#e8a200', spark: SPARK_INCIDENTS, trend: -25 },
                { label: 'Lost Time Injuries', value: sf.lostTimeInjuries, color: '#ba1a1a', trend: -50 },
                { label: 'Fatalities', value: sf.fatalities, color: sf.fatalities === 0 ? '#2d6a3f' : '#ba1a1a', trend: 0 },
                { label: 'Near Misses', value: sf.nearMisses, color: '#8a6d3b', trend: -15 },
                { label: 'Training Done', value: `${sf.safetyTrainingCompletion}%`, color: '#5b7fde', trend: 8 },
              ].map((m) => (
                <div key={m.label} className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{m.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-xl font-bold" style={{ color: m.color }}>{m.value}</p>
                    <div className="flex flex-col items-end gap-1">
                      {m.spark && <Sparkline data={m.spark} width={48} height={18} color={m.color} strokeWidth={1} showDot={false} />}
                      <TrendArrow value={m.trend} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
                <h3 className="text-sm font-bold text-primary mb-4">Safety Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Incident Rate</p><p className="text-xl font-bold text-primary mt-1">{sf.incidentRate}</p><p className="text-[9px] text-on-surface-variant">per 200k hours</p></div>
                  <div><p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Lost Days</p><p className="text-xl font-bold text-error mt-1">{sf.lostDays}</p><p className="text-[9px] text-on-surface-variant">total days lost</p></div>
                  <div><p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Days Since Last LTI</p><p className="text-xl font-bold text-secondary mt-1">42</p></div>
                  <div><p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Last Audit</p><p className="text-sm font-bold text-primary mt-1">{sf.lastAuditDate}</p></div>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
                <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-primary">Safe Days Streak</h3><LiveDot /></div>
                <Sparkline data={SPARK_SAFE_DAYS} width={300} height={50} color="#2d6a3f" fillColor="#2d6a3f" />
                <p className="text-[10px] text-on-surface-variant mt-2">Days between incidents — current streak: 42 days</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'community' && (
          <div className="vera-fade-up space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Total Investment</p>
                <p className="text-2xl font-bold text-primary">USD 88k</p><TrendArrow value={22} suffix="% vs prev year" />
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Beneficiaries</p>
                <p className="text-2xl font-bold text-[#5b7fde]">1,570</p><TrendArrow value={35} suffix="% reach" />
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Active Projects</p>
                <p className="text-2xl font-bold text-secondary">{communityInvestments.length}</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-outline-variant/15"><h3 className="text-sm font-bold text-primary">Community Investments</h3></div>
              <table className="w-full text-left">
                <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/15">
                  <th className="px-6 py-3">Project</th><th className="px-6 py-3">Amount</th><th className="px-6 py-3">Beneficiaries</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Impact</th>
                </tr></thead>
                <tbody>{communityInvestments.map((row, i) => (
                  <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                    onClick={() => openDrawer(row.project, <div className="space-y-4">
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Investment</p><p className="text-xl font-bold text-primary mt-1">{row.currency} {row.amount.toLocaleString()}</p></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Beneficiaries</p><p className="text-primary font-bold mt-1">{row.beneficiaries.toLocaleString()} people</p></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Cost per Beneficiary</p><p className="text-primary font-bold mt-1">USD {Math.round(row.amount / row.beneficiaries)}</p></div>
                    </div>)}>
                    <td className="px-6 py-3.5 text-sm font-medium text-primary">{row.project}</td>
                    <td className="px-6 py-3.5 text-sm text-on-surface">{row.currency} {row.amount.toLocaleString()}</td>
                    <td className="px-6 py-3.5 text-sm text-on-surface-variant">{row.beneficiaries.toLocaleString()}</td>
                    <td className="px-6 py-3.5"><StatusBadge status={row.status} size="sm" /></td>
                    <td className="px-6 py-3.5 text-xs text-on-surface-variant">USD {Math.round(row.amount / row.beneficiaries)}/person</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'supply' && (
          <div className="vera-fade-up space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Total Suppliers</p>
                <p className="text-2xl font-bold text-primary">{supplyChainRisks.length}</p>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">High Risk</p>
                <p className="text-2xl font-bold text-error">{supplyChainRisks.filter(s => s.riskLevel === 'high').length}</p>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Open Issues</p>
                <p className="text-2xl font-bold text-[#e8a200]">{supplyChainRisks.reduce((a, s) => a + s.issues, 0)}</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-outline-variant/15"><h3 className="text-sm font-bold text-primary">Supplier Risk Assessment</h3></div>
              <table className="w-full text-left">
                <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/15">
                  <th className="px-6 py-3">Supplier</th><th className="px-6 py-3">Category</th><th className="px-6 py-3">Risk</th><th className="px-6 py-3">Last Audit</th><th className="px-6 py-3">Issues</th><th className="px-6 py-3">Due Diligence</th>
                </tr></thead>
                <tbody>{supplyChainRisks.map((row, i) => (
                  <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                    onClick={() => openDrawer(row.supplier, <div className="space-y-4">
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Category</p><p className="text-primary font-medium mt-1">{row.category}</p></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Risk</p><div className="mt-1"><StatusBadge status={row.riskLevel} /></div></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Open Issues</p><p className="text-xl font-bold text-primary mt-1">{row.issues}</p></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Last Audit</p><p className="text-primary font-medium mt-1">{row.lastAudit}</p></div>
                    </div>)}>
                    <td className="px-6 py-3.5 text-sm font-medium text-primary">{row.supplier}</td>
                    <td className="px-6 py-3.5 text-xs text-on-surface-variant">{row.category}</td>
                    <td className="px-6 py-3.5"><StatusBadge status={row.riskLevel} size="sm" /></td>
                    <td className="px-6 py-3.5 text-xs text-on-surface-variant">{row.lastAudit}</td>
                    <td className="px-6 py-3.5 text-sm font-bold text-primary">{row.issues}</td>
                    <td className="px-6 py-3.5"><div className="w-12 h-1.5 bg-surface-container-high rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: row.riskLevel === 'low' ? '100%' : row.riskLevel === 'medium' ? '60%' : '25%', backgroundColor: row.riskLevel === 'low' ? '#2d6a3f' : row.riskLevel === 'medium' ? '#e8a200' : '#ba1a1a' }} /></div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
