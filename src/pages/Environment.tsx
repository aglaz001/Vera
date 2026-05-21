import React, { useState } from 'react';
import { SubTabNav } from '../components/ui/SubTabNav';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Sparkline, TrendArrow, LiveDot } from '../components/ui/Sparkline';
import { useDrawer } from '../components/ui/DetailDrawer';
import { emissionsSources, energyData, waterData, wasteData } from '../data/mockData';

const TABS = [
  { key: 'emissions', label: 'Emissions', icon: 'cloud' },
  { key: 'energy', label: 'Energy', icon: 'bolt' },
  { key: 'water', label: 'Water', icon: 'water_drop' },
  { key: 'waste', label: 'Waste', icon: 'delete_sweep' },
];

const SPARK_E = [210, 200, 198, 192, 185, 182, 174, 168, 163, 158, 155, 151];
const SPARK_NRG = [860, 840, 830, 820, 815, 810, 808, 820, 805, 798, 790, 785];
const SPARK_W = [1450, 1420, 1380, 1350, 1320, 1340, 1310, 1280, 1260, 1240, 1230, 1210];
const SPARK_WS = [48, 45, 42, 40, 38, 36, 35, 34, 33, 32, 31, 30];

export const Environment: React.FC = () => {
  const [tab, setTab] = useState('emissions');
  const { openDrawer } = useDrawer();
  const totalS1 = emissionsSources.filter(e => e.scope === 1).reduce((a, e) => a + e.co2, 0);
  const totalS2 = emissionsSources.filter(e => e.scope === 2).reduce((a, e) => a + e.co2, 0);
  const totalAll = totalS1 + totalS2;
  const completeness = Math.round(emissionsSources.filter(e => e.completeness > 0).length / emissionsSources.length * 100);

  return (
    <div className="w-full">
      <div className="pb-20 px-4 md:px-8 pt-8 max-w-[1200px] mx-auto">
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-headline italic text-primary mb-2">Environment</h1>
            <p className="text-on-surface-variant text-sm max-w-xl">Track environmental performance — emissions, energy, water, and waste.</p>
          </div>
          <div className="flex items-center gap-4">
            <LiveDot label="Updated 12 min ago" />
            <ProgressRing percentage={58} size={52} strokeWidth={4} color="#2d6a3f" label="Score" />
          </div>
        </header>

        <SubTabNav tabs={TABS} activeTab={tab} onChange={setTab} />

        {/* ── EMISSIONS ────────────────────────────────────────────── */}
        {tab === 'emissions' && (
          <div className="vera-fade-up space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Total Emissions', value: totalAll.toFixed(1), unit: 'tCO₂e', color: '#03270e', trend: -8.2, spark: SPARK_E },
                { label: 'Scope 1', value: totalS1.toFixed(1), unit: 'tCO₂e', color: '#1a4d2e', trend: -5.1 },
                { label: 'Scope 2', value: totalS2.toFixed(1), unit: 'tCO₂e', color: '#2d6a3f', trend: -3.8 },
                { label: 'Scope 3', value: '—', unit: 'tCO₂e', color: '#ba1a1a', trend: 0 },
                { label: 'Data Completeness', value: `${completeness}`, unit: '%', color: '#e8a200', trend: 12 },
              ].map((s) => (
                <div key={s.label} className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{s.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}<span className="text-xs opacity-50 ml-1">{s.unit}</span></p>
                    {s.trend !== 0 && <TrendArrow value={s.trend} />}
                  </div>
                  {s.spark && <div className="mt-2"><Sparkline data={s.spark} width={120} height={22} color={s.color} fillColor={s.color} strokeWidth={1} /></div>}
                </div>
              ))}
            </div>

            {/* Scope breakdown donut-like visual */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-primary">Scope Breakdown</h3>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{totalAll.toFixed(1)} tCO₂e total</span>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex gap-6">
                  {[
                    { label: 'Scope 1', value: totalS1, pct: Math.round(totalS1/totalAll*100), color: '#03270e' },
                    { label: 'Scope 2', value: totalS2, pct: Math.round(totalS2/totalAll*100), color: '#1a4d2e' },
                    { label: 'Scope 3', value: 0, pct: 0, color: '#ba1a1a' },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <ProgressRing percentage={s.pct} size={48} strokeWidth={4} color={s.color} />
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">{s.label}</p>
                        <p className="text-sm font-bold text-primary">{s.value > 0 ? `${s.value.toFixed(1)} t` : '—'}</p>
                        <p className="text-[9px] text-on-surface-variant">{s.pct}% of total</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-1"><Sparkline data={SPARK_E} width={200} height={40} color="#1a4d2e" fillColor="#1a4d2e" /></div>
              </div>
            </div>

            {/* Emissions Sources Table */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-outline-variant/15 flex items-center justify-between">
                <h3 className="text-sm font-bold text-primary">Emissions Sources</h3>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{emissionsSources.length} sources</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/15">
                    <th className="px-6 py-3">Source</th><th className="px-6 py-3">Scope</th><th className="px-6 py-3">Quantity</th><th className="px-6 py-3">Factor</th><th className="px-6 py-3">CO₂ (t)</th><th className="px-6 py-3">Evidence</th><th className="px-6 py-3">Status</th>
                  </tr></thead>
                  <tbody>{emissionsSources.map((row, i) => (
                    <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                      onClick={() => openDrawer(row.source, (
                        <div className="space-y-5">
                          <div><span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Scope</span><p className="text-primary font-bold mt-1">Scope {row.scope}</p></div>
                          <div><span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Quantity</span><p className="text-primary font-bold mt-1">{row.quantity.toLocaleString()} {row.unit}</p></div>
                          <div><span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Emission Factor</span><p className="text-primary font-bold mt-1">{row.factor} kgCO₂e/{row.unit}</p></div>
                          <div><span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Calculated CO₂</span><p className="text-2xl font-bold text-primary mt-1">{row.co2} tCO₂e</p></div>
                          <div><span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Completeness</span><div className="h-2 bg-surface-container-high rounded-full overflow-hidden mt-1"><div className="h-full bg-secondary rounded-full vera-bar" style={{ width: `${row.completeness}%` }} /></div><p className="text-[10px] text-on-surface-variant mt-1">{row.completeness}%</p></div>
                          {row.evidence && <div className="p-4 bg-surface-container-low rounded-xl flex items-center gap-3"><span className="material-symbols-outlined text-[16px] text-secondary">attach_file</span><span className="text-sm text-primary font-medium">{row.evidence}</span></div>}
                        </div>
                      ))}>
                      <td className="px-6 py-3.5 text-sm font-medium text-primary">{row.source}</td>
                      <td className="px-6 py-3.5"><span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ color: row.scope === 3 ? '#ba1a1a' : '#1a4d2e', backgroundColor: row.scope === 3 ? '#ba1a1a12' : '#1a4d2e12' }}>Scope {row.scope}</span></td>
                      <td className="px-6 py-3.5 text-xs text-on-surface">{row.quantity > 0 ? row.quantity.toLocaleString() + ' ' + row.unit : '—'}</td>
                      <td className="px-6 py-3.5 text-xs text-on-surface-variant">{row.factor}</td>
                      <td className="px-6 py-3.5 text-sm font-bold text-primary">{row.co2 > 0 ? row.co2.toFixed(1) : '—'}</td>
                      <td className="px-6 py-3.5">{row.evidence ? <span className="material-symbols-outlined text-[14px] text-secondary">attach_file</span> : <span className="text-[10px] text-error font-bold uppercase tracking-widest">Missing</span>}</td>
                      <td className="px-6 py-3.5"><StatusBadge status={row.completeness === 100 ? 'complete' : row.completeness > 0 ? 'partial' : 'missing'} size="sm" /></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── ENERGY ─────────────────────────────────────────────── */}
        {tab === 'energy' && (
          <div className="vera-fade-up space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Consumption', value: '820,000', unit: 'kWh', trend: -4.5, color: '#e8a200' },
                { label: 'Avg Intensity', value: '95.3', unit: 'kWh/m²', trend: -2.1, color: '#1a4d2e' },
                { label: 'Renewable Mix', value: '5', unit: '%', trend: 5, color: '#2d6a3f' },
                { label: 'Cost', value: 'USD 98k', unit: '/year', trend: -3.2, color: '#8a6d3b' },
              ].map((m) => (
                <div key={m.label} className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{m.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-xl font-bold" style={{ color: m.color }}>{m.value}<span className="text-xs opacity-50 ml-1">{m.unit}</span></p>
                    <TrendArrow value={m.trend} />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
              <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-primary">12-Month Trend</h3><LiveDot /></div>
              <Sparkline data={SPARK_NRG} width={700} height={60} color="#e8a200" fillColor="#e8a200" />
              <p className="text-[10px] text-on-surface-variant mt-2">Monthly energy consumption (MWh) — downward trend due to LED retrofit and efficiency programs</p>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-outline-variant/15"><h3 className="text-sm font-bold text-primary">Energy by Facility</h3></div>
              <table className="w-full text-left">
                <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/15">
                  <th className="px-6 py-3">Facility</th><th className="px-6 py-3">Consumption</th><th className="px-6 py-3">Intensity</th><th className="px-6 py-3">Source</th><th className="px-6 py-3">Renewable</th><th className="px-6 py-3">Share</th>
                </tr></thead>
                <tbody>{energyData.map((row, i) => {
                  const share = Math.round(row.consumption / 820000 * 100);
                  return (
                    <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                      onClick={() => openDrawer(row.facility, (<div className="space-y-4">
                        <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Consumption</p><p className="text-xl font-bold text-primary mt-1">{row.consumption.toLocaleString()} {row.unit}</p></div>
                        <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Energy Source</p><p className="text-primary font-medium mt-1">{row.source}</p></div>
                        <div className="h-2 bg-surface-container-high rounded-full overflow-hidden"><div className="h-full bg-[#e8a200] rounded-full vera-bar" style={{ width: `${share}%` }} /></div>
                        <p className="text-[10px] text-on-surface-variant">{share}% of total consumption</p>
                      </div>))}>
                      <td className="px-6 py-3.5 text-sm font-medium text-primary">{row.facility}</td>
                      <td className="px-6 py-3.5 text-sm text-on-surface">{row.consumption.toLocaleString()} {row.unit}</td>
                      <td className="px-6 py-3.5 text-sm text-on-surface-variant">{row.intensity}</td>
                      <td className="px-6 py-3.5 text-xs text-on-surface-variant">{row.source}</td>
                      <td className="px-6 py-3.5"><span className={`text-sm font-bold ${row.renewablePercent > 0 ? 'text-secondary' : 'text-on-surface-variant'}`}>{row.renewablePercent}%</span></td>
                      <td className="px-6 py-3.5"><div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden"><div className="h-full bg-[#e8a200] rounded-full" style={{ width: `${share}%` }} /></div></td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── WATER ──────────────────────────────────────────────── */}
        {tab === 'water' && (
          <div className="vera-fade-up space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Consumption', value: '16,500', unit: 'm³', trend: -6.2, color: '#5b7fde' },
                { label: 'Avg Intensity', value: '48.2', unit: 'm³/employee', trend: -3.1, color: '#1a4d2e' },
                { label: 'Recycled', value: '12', unit: '%', trend: 12, color: '#2d6a3f' },
                { label: 'Cost', value: 'USD 24k', unit: '/year', trend: -4.8, color: '#8a6d3b' },
              ].map((m) => (
                <div key={m.label} className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{m.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-xl font-bold" style={{ color: m.color }}>{m.value}<span className="text-xs opacity-50 ml-1">{m.unit}</span></p>
                    <TrendArrow value={m.trend} />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
              <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-primary">12-Month Trend</h3><LiveDot /></div>
              <Sparkline data={SPARK_W} width={700} height={60} color="#5b7fde" fillColor="#5b7fde" />
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-outline-variant/15"><h3 className="text-sm font-bold text-primary">Water by Facility</h3></div>
              <table className="w-full text-left">
                <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/15">
                  <th className="px-6 py-3">Facility</th><th className="px-6 py-3">Consumption</th><th className="px-6 py-3">Intensity</th><th className="px-6 py-3">Source</th><th className="px-6 py-3">Share</th>
                </tr></thead>
                <tbody>{waterData.map((row, i) => {
                  const share = Math.round(row.consumption / 16500 * 100);
                  return (
                    <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                      onClick={() => openDrawer(row.facility, (<div className="space-y-4">
                        <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Consumption</p><p className="text-xl font-bold text-primary mt-1">{row.consumption.toLocaleString()} {row.unit}</p></div>
                        <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Source</p><p className="text-primary font-medium mt-1">{row.source}</p></div>
                      </div>))}>
                      <td className="px-6 py-3.5 text-sm font-medium text-primary">{row.facility}</td>
                      <td className="px-6 py-3.5 text-sm text-on-surface">{row.consumption.toLocaleString()} {row.unit}</td>
                      <td className="px-6 py-3.5 text-sm text-on-surface-variant">{row.intensity}</td>
                      <td className="px-6 py-3.5 text-xs text-on-surface-variant">{row.source}</td>
                      <td className="px-6 py-3.5"><div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden"><div className="h-full bg-[#5b7fde] rounded-full" style={{ width: `${share}%` }} /></div></td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── WASTE ──────────────────────────────────────────────── */}
        {tab === 'waste' && (
          <div className="vera-fade-up space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Waste', value: '518', unit: 'tonnes', trend: -8.5, color: '#2d6a3f' },
                { label: 'Diversion Rate', value: '78', unit: '%', trend: 5.2, color: '#1a4d2e' },
                { label: 'Hazardous', value: '18', unit: 'tonnes', trend: -12, color: '#ba1a1a' },
                { label: 'Revenue from Scrap', value: 'USD 25k', unit: '', trend: 15, color: '#e8a200' },
              ].map((m) => (
                <div key={m.label} className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{m.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-xl font-bold" style={{ color: m.color }}>{m.value}<span className="text-xs opacity-50 ml-1">{m.unit}</span></p>
                    <TrendArrow value={m.trend} />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
              <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-primary">Waste Generation Trend</h3><LiveDot /></div>
              <Sparkline data={SPARK_WS} width={700} height={60} color="#2d6a3f" fillColor="#2d6a3f" />
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-outline-variant/15"><h3 className="text-sm font-bold text-primary">Waste by Category</h3></div>
              <table className="w-full text-left">
                <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/15">
                  <th className="px-6 py-3">Category</th><th className="px-6 py-3">Quantity</th><th className="px-6 py-3">Method</th><th className="px-6 py-3">Hazardous</th><th className="px-6 py-3">Recovery</th><th className="px-6 py-3">Share</th>
                </tr></thead>
                <tbody>{wasteData.map((row, i) => {
                  const share = Math.round(row.quantity / 518 * 100);
                  return (
                    <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                      onClick={() => openDrawer(row.category, (<div className="space-y-4">
                        <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Quantity</p><p className="text-xl font-bold text-primary mt-1">{row.quantity} {row.unit}</p></div>
                        <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Method</p><p className="text-primary font-medium mt-1">{row.method}</p></div>
                        <div><p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Recovery Rate</p><div className="h-2.5 bg-surface-container-high rounded-full overflow-hidden mt-1"><div className="h-full bg-secondary rounded-full vera-bar" style={{ width: `${row.rate}%` }} /></div><p className="text-[10px] text-on-surface-variant mt-1">{row.rate}%</p></div>
                      </div>))}>
                      <td className="px-6 py-3.5 text-sm font-medium text-primary">{row.category}</td>
                      <td className="px-6 py-3.5 text-sm text-on-surface">{row.quantity} {row.unit}</td>
                      <td className="px-6 py-3.5 text-xs text-on-surface-variant">{row.method}</td>
                      <td className="px-6 py-3.5">{row.hazardous ? <StatusBadge status="critical" label="Hazardous" size="sm" /> : <span className="text-xs text-on-surface-variant">No</span>}</td>
                      <td className="px-6 py-3.5"><div className="flex items-center gap-2"><div className="w-12 h-1.5 bg-surface-container-high rounded-full overflow-hidden"><div className="h-full bg-secondary rounded-full" style={{ width: `${row.rate}%` }} /></div><span className="text-xs font-bold text-primary">{row.rate}%</span></div></td>
                      <td className="px-6 py-3.5 text-xs text-on-surface-variant">{share}%</td>
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
