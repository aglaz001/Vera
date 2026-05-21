import React, { useState } from 'react';
import { SubTabNav } from '../components/ui/SubTabNav';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ProgressRing } from '../components/ui/ProgressRing';
import { TrendArrow, LiveDot, Sparkline } from '../components/ui/Sparkline';
import { useDrawer } from '../components/ui/DetailDrawer';
import { boardComposition, policies, risks } from '../data/mockData';

const TABS = [
  { key: 'board', label: 'Board & Leadership', icon: 'groups' },
  { key: 'ethics', label: 'Ethics & Compliance', icon: 'verified_user' },
  { key: 'policies', label: 'Policies', icon: 'policy' },
  { key: 'risk', label: 'Risk', icon: 'warning' },
];

const independentCount = boardComposition.filter(b => b.independent).length;
const independentPct = Math.round((independentCount / boardComposition.length) * 100);
const avgTenure = (boardComposition.reduce((a, b) => a + b.tenure, 0) / boardComposition.length).toFixed(1);
const SPARK_ETHICS = [82, 85, 87, 88, 90, 91, 92];
const SPARK_POLICY = [40, 45, 48, 50, 52, 55, 60];

export const Governance: React.FC = () => {
  const [tab, setTab] = useState('board');
  const { openDrawer } = useDrawer();
  const approvedPolicies = policies.filter(p => p.status === 'approved').length;
  const policyPct = Math.round((approvedPolicies / policies.length) * 100);

  return (
    <div className="w-full">
      <div className="pb-20 px-4 md:px-8 pt-8 max-w-[1200px] mx-auto">
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-headline italic text-primary mb-2">Governance</h1>
            <p className="text-on-surface-variant text-sm max-w-xl">Board composition, ethics, policies, and risk management.</p>
          </div>
          <div className="flex items-center gap-4">
            <LiveDot label="Live" />
            <ProgressRing percentage={68} size={52} strokeWidth={4} color="#8a6d3b" label="Score" />
          </div>
        </header>

        <SubTabNav tabs={TABS} activeTab={tab} onChange={setTab} />

        {tab === 'board' && (
          <div className="vera-fade-up space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Board Size', value: `${boardComposition.length}`, color: '#8a6d3b' },
                { label: 'Independent', value: `${independentPct}%`, color: independentPct >= 50 ? '#2d6a3f' : '#e8a200' },
                { label: 'Avg Tenure', value: `${avgTenure} yrs`, color: '#1a4d2e' },
                { label: 'Committees', value: '3', color: '#5b7fde' },
                { label: 'Female Directors', value: `${Math.round(boardComposition.filter(b => ['Maria Fernandes', 'Luísa Mendes', 'Beatriz Costa'].includes(b.name)).length / boardComposition.length * 100)}%`, color: '#8a6d3b' },
              ].map((m) => (
                <div key={m.label} className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{m.label}</p>
                  <p className="text-xl font-bold" style={{ color: m.color }}>{m.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 flex flex-col items-center">
                <ProgressRing percentage={independentPct} size={80} strokeWidth={6} color="#2d6a3f" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-3">Independence</p>
                <p className="text-[9px] text-on-surface-variant">{independentCount} of {boardComposition.length} independent</p>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 flex flex-col items-center">
                <ProgressRing percentage={60} size={80} strokeWidth={6} color="#5b7fde" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-3">Gender Diversity</p>
                <p className="text-[9px] text-on-surface-variant">60% female directors</p>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 flex flex-col items-center">
                <ProgressRing percentage={85} size={80} strokeWidth={6} color="#8a6d3b" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-3">ESG Oversight</p>
                <p className="text-[9px] text-on-surface-variant">2 directors on ESG committee</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-outline-variant/15"><h3 className="text-sm font-bold text-primary">Board Members</h3></div>
              <table className="w-full text-left">
                <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/15">
                  <th className="px-6 py-3">Name</th><th className="px-6 py-3">Role</th><th className="px-6 py-3">Independent</th><th className="px-6 py-3">Tenure</th><th className="px-6 py-3">Committees</th>
                </tr></thead>
                <tbody>{boardComposition.map((row, i) => (
                  <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                    onClick={() => openDrawer(row.name, <div className="space-y-4">
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Role</p><p className="text-primary font-bold mt-1">{row.role}</p></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Independent</p><div className="mt-1"><StatusBadge status={row.independent ? 'complete' : 'pending'} label={row.independent ? 'Yes' : 'No'} /></div></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Tenure</p><p className="text-primary font-bold mt-1">{row.tenure} years</p></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Committees</p><div className="flex flex-wrap gap-2 mt-1">{row.committees.map(c => <span key={c} className="text-xs bg-primary/8 text-primary px-3 py-1 rounded-full font-medium">{c}</span>)}</div></div>
                    </div>)}>
                    <td className="px-6 py-3.5 text-sm font-medium text-primary">{row.name}</td>
                    <td className="px-6 py-3.5 text-xs text-on-surface-variant">{row.role}</td>
                    <td className="px-6 py-3.5">{row.independent ? <StatusBadge status="complete" label="Yes" size="sm" /> : <span className="text-xs text-on-surface-variant">No</span>}</td>
                    <td className="px-6 py-3.5 text-sm text-on-surface-variant">{row.tenure} yrs</td>
                    <td className="px-6 py-3.5"><div className="flex gap-1.5 flex-wrap">{row.committees.map(c => <span key={c} className="text-[9px] bg-primary/8 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{c}</span>)}</div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'ethics' && (
          <div className="vera-fade-up space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Anti-Corruption Training', value: '92%', color: '#2d6a3f', trend: 4, spark: SPARK_ETHICS },
                { label: 'Code of Conduct', value: '97%', color: '#1a4d2e', trend: 2 },
                { label: 'Compliance Violations', value: '0', color: '#2d6a3f', trend: 0 },
                { label: 'Whistleblower Reports', value: '0', color: '#2d6a3f', trend: 0 },
                { label: 'Political Contributions', value: 'None', color: '#1a4d2e', trend: 0 },
                { label: 'Last Ethics Audit', value: 'Nov 2024', color: '#5b7fde', trend: 0 },
              ].map((m) => (
                <div key={m.label} className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{m.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-xl font-bold" style={{ color: m.color }}>{m.value}</p>
                    <div className="flex flex-col items-end gap-1">
                      {m.spark && <Sparkline data={m.spark} width={48} height={18} color={m.color} strokeWidth={1} showDot={false} />}
                      {m.trend !== 0 && <TrendArrow value={m.trend} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Training Completion by Dept + Compliance Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
                <h3 className="text-sm font-bold text-primary mb-4">Training Completion by Department</h3>
                <div className="space-y-3">
                  {[
                    { dept: 'Production', pct: 88 },
                    { dept: 'Admin & Finance', pct: 100 },
                    { dept: 'Logistics', pct: 92 },
                    { dept: 'Quality & HSE', pct: 100 },
                    { dept: 'Sales', pct: 78 },
                    { dept: 'R&D / Engineering', pct: 85 },
                  ].map(d => (
                    <div key={d.dept} className="flex items-center gap-3">
                      <span className="text-xs text-on-surface-variant w-28 truncate">{d.dept}</span>
                      <div className="flex-1 h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full rounded-full vera-bar" style={{ width: `${d.pct}%`, backgroundColor: d.pct === 100 ? '#2d6a3f' : d.pct >= 90 ? '#1a4d2e' : '#e8a200' }} />
                      </div>
                      <span className={`text-xs font-bold w-10 text-right ${d.pct === 100 ? 'text-secondary' : 'text-primary'}`}>{d.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
                <h3 className="text-sm font-bold text-primary mb-4">Compliance Timeline</h3>
                <div className="space-y-4">
                  {[
                    { date: 'Nov 2024', event: 'Ethics audit completed', status: 'complete', icon: 'task_alt' },
                    { date: 'Sep 2024', event: 'Anti-corruption training cycle', status: 'complete', icon: 'school' },
                    { date: 'Jul 2024', event: 'Code of conduct refresh', status: 'complete', icon: 'description' },
                    { date: 'Mar 2025', event: 'Next scheduled audit', status: 'pending', icon: 'event' },
                    { date: 'Jun 2025', event: 'Policy review cycle', status: 'pending', icon: 'policy' },
                  ].map((e, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${e.status === 'complete' ? 'bg-secondary/10' : 'bg-[#e8a200]/10'}`}>
                          <span className="material-symbols-outlined text-[13px]" style={{ color: e.status === 'complete' ? '#2d6a3f' : '#e8a200' }}>{e.icon}</span>
                        </div>
                        {i < 4 && <div className="w-px h-4 bg-outline-variant/20 mt-1" />}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-primary">{e.event}</p>
                        <p className="text-[9px] text-on-surface-variant">{e.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Whistleblower Channel */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-primary">Whistleblower & Ethics Channels</h3>
                <StatusBadge status="complete" label="Active" size="sm" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Anonymous Hotline', status: 'Active', reports: 0, icon: 'phone_in_talk' },
                  { label: 'Online Portal', status: 'Active', reports: 0, icon: 'language' },
                  { label: 'Ethics Officer', status: 'Designated', reports: 0, icon: 'person' },
                ].map(c => (
                  <div key={c.label} className="p-4 bg-surface-container-low rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[14px] text-secondary">{c.icon}</span>
                      <span className="text-xs font-medium text-primary">{c.label}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-on-surface-variant">{c.status}</span>
                      <span className="text-xs font-bold text-secondary">{c.reports} reports</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'policies' && (
          <div className="vera-fade-up space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Total Policies</p>
                <p className="text-2xl font-bold text-primary">{policies.length}</p>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Approved</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-secondary">{policyPct}%</p>
                  <Sparkline data={SPARK_POLICY} width={48} height={18} color="#1a4d2e" strokeWidth={1} showDot={false} />
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Needs Review</p>
                <p className="text-2xl font-bold text-[#e8a200]">{policies.filter(p => p.status !== 'approved').length}</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-outline-variant/15"><h3 className="text-sm font-bold text-primary">Policy Registry</h3></div>
              <table className="w-full text-left">
                <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/15">
                  <th className="px-6 py-3">Policy</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Last Review</th><th className="px-6 py-3">Next Review</th><th className="px-6 py-3">Owner</th>
                </tr></thead>
                <tbody>{policies.map((row, i) => (
                  <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                    onClick={() => openDrawer(row.name, <div className="space-y-4">
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Status</p><div className="mt-1"><StatusBadge status={row.status} /></div></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Owner</p><p className="text-primary font-bold mt-1">{row.owner}</p></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Next Review</p><p className="text-primary font-medium mt-1">{row.nextReview}</p></div>
                    </div>)}>
                    <td className="px-6 py-3.5 text-sm font-medium text-primary">{row.name}</td>
                    <td className="px-6 py-3.5"><StatusBadge status={row.status} size="sm" /></td>
                    <td className="px-6 py-3.5 text-xs text-on-surface-variant">{row.lastReview || '—'}</td>
                    <td className="px-6 py-3.5 text-xs text-on-surface-variant">{row.nextReview}</td>
                    <td className="px-6 py-3.5 text-xs text-on-surface-variant">{row.owner}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'risk' && (
          <div className="vera-fade-up space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Total Risks</p>
                <p className="text-2xl font-bold text-primary">{risks.length}</p>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">High Impact</p>
                <p className="text-2xl font-bold text-error">{risks.filter(r => r.impact === 'high').length}</p>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Mitigated</p>
                <p className="text-2xl font-bold text-secondary">{risks.length}</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-outline-variant/15"><h3 className="text-sm font-bold text-primary">Risk Register</h3></div>
              <table className="w-full text-left">
                <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/15">
                  <th className="px-6 py-3">Risk</th><th className="px-6 py-3">Likelihood</th><th className="px-6 py-3">Impact</th><th className="px-6 py-3">Mitigation</th><th className="px-6 py-3">Owner</th><th className="px-6 py-3">Score</th>
                </tr></thead>
                <tbody>{risks.map((row, i) => {
                  const lMap: Record<string, number> = { low: 1, medium: 2, high: 3 };
                  const score = (lMap[row.likelihood] || 1) * (lMap[row.impact] || 1);
                  return (
                    <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                      onClick={() => openDrawer(row.risk, <div className="space-y-4">
                        <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Risk Score</p><p className="text-3xl font-bold text-primary mt-1">{score}</p></div>
                        <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Likelihood</p><div className="mt-1"><StatusBadge status={row.likelihood} /></div></div>
                        <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Impact</p><div className="mt-1"><StatusBadge status={row.impact} /></div></div>
                        <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Mitigation</p><p className="text-primary font-medium mt-1">{row.mitigation}</p></div>
                      </div>)}>
                      <td className="px-6 py-3.5 text-sm font-medium text-primary max-w-[200px]">{row.risk}</td>
                      <td className="px-6 py-3.5"><StatusBadge status={row.likelihood} size="sm" /></td>
                      <td className="px-6 py-3.5"><StatusBadge status={row.impact} size="sm" /></td>
                      <td className="px-6 py-3.5 text-xs text-on-surface-variant max-w-[200px] truncate">{row.mitigation}</td>
                      <td className="px-6 py-3.5 text-xs text-on-surface-variant">{row.owner}</td>
                      <td className="px-6 py-3.5"><span className={`text-sm font-bold ${score >= 6 ? 'text-error' : score >= 4 ? 'text-[#e8a200]' : 'text-secondary'}`}>{score}</span></td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
