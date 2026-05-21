import React from 'react';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ProgressRing } from '../components/ui/ProgressRing';
import { useDrawer } from '../components/ui/DetailDrawer';
import { frameworks } from '../data/mockData';

const CATEGORY_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  mandatory:   { label: 'Mandatory', color: '#ba1a1a', bg: '#ba1a1a12' },
  recommended: { label: 'Recommended', color: '#5b7fde', bg: '#5b7fde12' },
  monitoring:  { label: 'Monitoring', color: '#8a9a8e', bg: '#8a9a8e12' },
};

export const Frameworks: React.FC = () => {
  const { openDrawer } = useDrawer();

  return (
    <div className="w-full">
      <div className="pb-20 px-4 md:px-8 pt-8 max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-headline italic text-primary mb-2">Frameworks</h1>
          <p className="text-on-surface-variant text-sm max-w-xl">Applicable ESG frameworks identified by Vera AI based on your company profile.</p>
        </header>

        {/* AI Identification Banner */}
        <div className="vera-fade-up d-0 bg-primary/5 rounded-2xl p-5 border border-primary/15 mb-8 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div>
            <p className="text-sm font-bold text-primary">AI-Identified Frameworks</p>
            <p className="text-xs text-on-surface-variant">Based on Mabor Industrial's sector (Manufacturing), location (Angola), and EU export activity.</p>
          </div>
        </div>

        {/* Framework Cards */}
        <div className="space-y-6">
          {frameworks.map((fw) => {
            const cat = CATEGORY_STYLES[fw.category];
            return (
              <div key={fw.name} className="vera-fade-up bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden vera-card">
                {/* Card Header */}
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-primary">{fw.name}</h3>
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border" style={{ color: cat.color, backgroundColor: cat.bg, borderColor: `${cat.color}25` }}>{cat.label}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mb-1">{fw.fullName}</p>
                    <p className="text-xs text-on-surface-variant italic">{fw.reason}</p>
                  </div>
                  <div className="shrink-0">
                    <ProgressRing percentage={fw.progress} size={64} strokeWidth={5} color="#1a4d2e" />
                  </div>
                </div>

                {/* Key Requirements */}
                <div className="px-6 pb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Key Requirements</p>
                  <div className="flex flex-wrap gap-2">
                    {fw.keyRequirements.map((req) => (
                      <span key={req} className="text-[10px] bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-full border border-outline-variant/20">{req}</span>
                    ))}
                  </div>
                </div>

                {/* Indicator Table */}
                <div className="border-t border-outline-variant/15 mt-3">
                  <table className="w-full text-left">
                    <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/10">
                      <th className="px-6 py-2.5">Code</th><th className="px-6 py-2.5">Indicator</th><th className="px-6 py-2.5">Owner</th><th className="px-6 py-2.5">Status</th>
                    </tr></thead>
                    <tbody>{fw.indicators.map((ind) => (
                      <tr key={ind.code} className="border-b border-outline-variant/8 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                        onClick={() => openDrawer(`${ind.code}: ${ind.name}`, <div className="space-y-4">
                          <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Framework</p><p className="text-primary font-bold mt-1">{fw.name}</p></div>
                          <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Status</p><div className="mt-1"><StatusBadge status={ind.status} /></div></div>
                          <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Owner</p><p className="text-primary font-medium mt-1">{ind.owner}</p></div>
                          <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Deadline</p><p className="text-primary font-medium mt-1">{fw.deadline}</p></div>
                        </div>)}>
                        <td className="px-6 py-3 text-xs font-bold text-primary">{ind.code}</td>
                        <td className="px-6 py-3 text-sm text-on-surface">{ind.name}</td>
                        <td className="px-6 py-3 text-xs text-on-surface-variant">{ind.owner}</td>
                        <td className="px-6 py-3"><StatusBadge status={ind.status} size="sm" /></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
