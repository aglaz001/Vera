import React, { useState } from 'react';
import { SubTabNav } from '../components/ui/SubTabNav';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ProgressRing } from '../components/ui/ProgressRing';
import { useDrawer } from '../components/ui/DetailDrawer';
import { roadmapTargets, strategyTasks } from '../data/mockData';

const TABS = [
  { key: 'roadmap', label: 'Roadmap', icon: 'map' },
  { key: 'tasks', label: 'Tasks', icon: 'task_alt' },
  { key: 'progress', label: 'Progress', icon: 'trending_up' },
];

const PILLAR_COLORS: Record<string, string> = { E: '#2d6a3f', S: '#5b7fde', G: '#8a6d3b' };
const PILLAR_LABELS: Record<string, string> = { E: 'Environment', S: 'Social', G: 'Governance' };

export const Strategy: React.FC = () => {
  const [tab, setTab] = useState('roadmap');
  const { openDrawer } = useDrawer();

  return (
    <div className="w-full">
      <div className="pb-20 px-4 md:px-8 pt-8 max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-headline italic text-primary mb-2">Strategy</h1>
          <p className="text-on-surface-variant text-sm max-w-xl">Plan and execute your ESG strategy — targets, tasks, and progress.</p>
        </header>

        <SubTabNav tabs={TABS} activeTab={tab} onChange={setTab} />

        {tab === 'roadmap' && (
          <div className="vera-fade-up space-y-4">
            {roadmapTargets.map((t, i) => (
              <div key={i} className="vera-card bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 flex items-center gap-6 cursor-pointer"
                onClick={() => openDrawer(t.target, <div className="space-y-4">
                  <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Pillar</p><p className="text-primary font-bold mt-1" style={{ color: PILLAR_COLORS[t.pillar] }}>{PILLAR_LABELS[t.pillar]}</p></div>
                  <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Baseline</p><p className="text-primary font-bold mt-1">{t.baseline}</p></div>
                  <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Target</p><p className="text-primary font-bold mt-1">{t.targetValue}</p></div>
                  <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Deadline</p><p className="text-primary font-medium mt-1">{t.deadline}</p></div>
                </div>)}>
                <ProgressRing percentage={t.progress} size={56} strokeWidth={5} color={PILLAR_COLORS[t.pillar]} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ color: PILLAR_COLORS[t.pillar], backgroundColor: `${PILLAR_COLORS[t.pillar]}12` }}>{PILLAR_LABELS[t.pillar]}</span>
                  </div>
                  <p className="text-sm font-bold text-primary truncate">{t.target}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{t.baseline} → {t.targetValue} · Due {t.deadline}</p>
                </div>
                <span className="text-lg font-bold text-primary">{t.progress}%</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'tasks' && (
          <div className="vera-fade-up">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-outline-variant/15 flex items-center justify-between">
                <h3 className="text-sm font-bold text-primary">Task Management</h3>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{strategyTasks.length} tasks</span>
              </div>
              <table className="w-full text-left">
                <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/15">
                  <th className="px-6 py-3">Task</th><th className="px-6 py-3">Pillar</th><th className="px-6 py-3">Priority</th><th className="px-6 py-3">Owner</th><th className="px-6 py-3">Deadline</th><th className="px-6 py-3">Framework</th><th className="px-6 py-3">Status</th>
                </tr></thead>
                <tbody>{strategyTasks.map((t) => (
                  <tr key={t.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                    onClick={() => openDrawer(t.title, <div className="space-y-4">
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Priority</p><div className="mt-1"><StatusBadge status={t.priority} /></div></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Owner</p><p className="text-primary font-bold mt-1">{t.owner}</p></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Framework</p><p className="text-primary font-medium mt-1">{t.framework}</p></div>
                      <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Deadline</p><p className="text-primary font-medium mt-1">{t.deadline}</p></div>
                    </div>)}>
                    <td className="px-6 py-3.5 text-sm font-medium text-primary max-w-[240px] truncate">{t.title}</td>
                    <td className="px-6 py-3.5"><span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: PILLAR_COLORS[t.pillar] }}>{PILLAR_LABELS[t.pillar]}</span></td>
                    <td className="px-6 py-3.5"><StatusBadge status={t.priority} size="sm" /></td>
                    <td className="px-6 py-3.5 text-xs text-on-surface-variant">{t.owner}</td>
                    <td className="px-6 py-3.5 text-xs text-on-surface-variant">{t.deadline}</td>
                    <td className="px-6 py-3.5 text-xs font-bold text-primary">{t.framework}</td>
                    <td className="px-6 py-3.5"><StatusBadge status={t.status} size="sm" /></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'progress' && (
          <div className="vera-fade-up space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {['E', 'S', 'G'].map((p) => {
                const targets = roadmapTargets.filter(t => t.pillar === p);
                const avgProgress = Math.round(targets.reduce((a, t) => a + t.progress, 0) / targets.length);
                return (
                  <div key={p} className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 flex flex-col items-center">
                    <ProgressRing percentage={avgProgress} size={90} strokeWidth={7} color={PILLAR_COLORS[p]} />
                    <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mt-3">{PILLAR_LABELS[p]}</p>
                    <p className="text-xs text-on-surface-variant mt-1">{targets.length} targets</p>
                  </div>
                );
              })}
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
              <h3 className="text-sm font-bold text-primary mb-4">Performance vs Targets</h3>
              <div className="space-y-4">
                {roadmapTargets.map((t, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xs font-bold w-20 truncate" style={{ color: PILLAR_COLORS[t.pillar] }}>{PILLAR_LABELS[t.pillar]}</span>
                    <div className="flex-1 h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full rounded-full vera-bar" style={{ width: `${t.progress}%`, backgroundColor: PILLAR_COLORS[t.pillar] }} />
                    </div>
                    <span className="text-sm font-bold text-primary w-12 text-right">{t.progress}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
