import React, { useState } from 'react';
import { SubTabNav } from '../components/ui/SubTabNav';
import { StatusBadge } from '../components/ui/StatusBadge';

const TABS = [
  { key: 'generate', label: 'Generate', icon: 'add_circle' },
  { key: 'history', label: 'History', icon: 'history' },
];

const REPORT_TYPES = [
  { key: 'csrd', label: 'CSRD', desc: 'European Sustainability Reporting Standards' },
  { key: 'gri', label: 'GRI', desc: 'Global Reporting Initiative Standards' },
  { key: 'cbam', label: 'CBAM', desc: 'Carbon Border Adjustment Mechanism' },
  { key: 'custom', label: 'Custom', desc: 'Custom report with selected sections' },
];

const REPORT_HISTORY = [
  { id: '1', name: 'GRI Annual Report 2024 (Draft)', type: 'GRI', date: '2025-04-15', status: 'draft' as const },
  { id: '2', name: 'CBAM Q4 2024 Declaration', type: 'CBAM', date: '2025-01-20', status: 'completed' as const },
  { id: '3', name: 'CSRD Preliminary Assessment', type: 'CSRD', date: '2024-12-10', status: 'completed' as const },
];

export const Reports: React.FC = () => {
  const [tab, setTab] = useState('generate');
  const [selectedType, setSelectedType] = useState('csrd');
  const [language, setLanguage] = useState('en');

  return (
    <div className="w-full">
      <div className="pb-20 px-4 md:px-8 pt-8 max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-headline italic text-primary mb-2">Reports</h1>
          <p className="text-on-surface-variant text-sm max-w-xl">Generate and manage ESG compliance reports.</p>
        </header>

        <SubTabNav tabs={TABS} activeTab={tab} onChange={setTab} />

        {tab === 'generate' && (
          <div className="vera-fade-up space-y-6">
            {/* Report type selection */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Report Type</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {REPORT_TYPES.map((rt) => (
                  <button
                    key={rt.key}
                    onClick={() => setSelectedType(rt.key)}
                    className={`p-5 rounded-2xl text-left transition-all cursor-pointer outline-none ${
                      selectedType === rt.key
                        ? 'bg-primary-container text-white shadow-lg border-2 border-transparent'
                        : 'bg-surface-container-lowest border-2 border-outline-variant/20 hover:border-primary/30'
                    }`}
                  >
                    <h4 className="text-lg font-bold mb-1">{rt.label}</h4>
                    <p className={`text-xs ${selectedType === rt.key ? 'opacity-70' : 'text-on-surface-variant'}`}>{rt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Configuration */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
              <h3 className="text-sm font-bold text-primary mb-5">Report Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-2">Entity</label>
                  <div className="bg-surface-container-low rounded-xl px-4 py-3 text-sm font-medium text-primary border border-outline-variant/20">Mabor Industrial, S.A.</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-2">Period</label>
                  <select className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm font-medium text-primary border border-outline-variant/20 outline-none cursor-pointer appearance-none">
                    <option>FY 2024 (Jan–Dec)</option>
                    <option>H1 2024</option>
                    <option>H2 2024</option>
                    <option>Q4 2024</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-2">Language</label>
                  <div className="flex gap-2">
                    {[{ key: 'en', label: 'English' }, { key: 'pt', label: 'Português' }].map((l) => (
                      <button
                        key={l.key}
                        onClick={() => setLanguage(l.key)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-center transition-all cursor-pointer outline-none ${
                          language === l.key ? 'bg-primary-container text-white shadow-sm' : 'bg-surface-container-low text-on-surface-variant border border-outline-variant/20'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border border-outline-variant/30 text-primary hover:bg-surface-container-low transition-all cursor-pointer outline-none">
                  Preview
                </button>
                <button className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-primary-container text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer outline-none">
                  Generate Report
                </button>
              </div>
            </div>

            {/* Export options */}
            <div className="flex gap-3">
              {[
                { label: 'Export PDF', icon: 'picture_as_pdf' },
                { label: 'Export Word', icon: 'description' },
                { label: 'Share with Auditors', icon: 'share' },
              ].map((opt) => (
                <button key={opt.label} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-lowest border border-outline-variant/20 text-xs font-bold uppercase tracking-widest text-primary hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer outline-none">
                  <span className="material-symbols-outlined text-[14px]">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'history' && (
          <div className="vera-fade-up">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <table className="w-full text-left">
                <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/15">
                  <th className="px-6 py-3">Report</th><th className="px-6 py-3">Type</th><th className="px-6 py-3">Date</th><th className="px-6 py-3">Status</th><th className="px-6 py-3 text-right">Actions</th>
                </tr></thead>
                <tbody>{REPORT_HISTORY.map((r) => (
                  <tr key={r.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 text-sm font-medium text-primary">{r.name}</td>
                    <td className="px-6 py-4 text-xs font-bold text-primary">{r.type}</td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">{r.date}</td>
                    <td className="px-6 py-4"><StatusBadge status={r.status} size="sm" /></td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer outline-none">
                        <span className="material-symbols-outlined text-[16px] text-primary">download</span>
                      </button>
                    </td>
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
