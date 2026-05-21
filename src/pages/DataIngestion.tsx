import React, { useState, useRef } from 'react';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ingestionCategories } from '../data/mockData';

export const DataIngestion: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSub, setSelectedSub] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cat = ingestionCategories[selectedCategory];
  const sub = cat.subcategories[selectedSub];
  const totalRequired = ingestionCategories.flatMap(c => c.subcategories).reduce((a, s) => a + s.required, 0);
  const totalUploaded = ingestionCategories.flatMap(c => c.subcategories).reduce((a, s) => a + s.uploaded, 0);
  const overallPct = Math.round((totalUploaded / totalRequired) * 100);

  return (
    <div className="w-full">
      <div className="pb-20 px-4 md:px-8 pt-8 max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-headline italic text-primary mb-2">Data Ingestion</h1>
          <p className="text-on-surface-variant text-sm max-w-xl">Collect and validate ESG evidence. {totalUploaded}/{totalRequired} documents uploaded ({overallPct}%).</p>
        </header>

        {/* Overall progress */}
        <div className="vera-fade-up d-0 mb-8">
          <div className="h-3 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full vera-bar" style={{ width: `${overallPct}%` }} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-2">{overallPct}% Document Completeness</p>
        </div>

        <div className="flex gap-6">
          {/* Left: Category tree */}
          <div className="w-64 shrink-0 space-y-2 vera-fade-up d-100">
            {ingestionCategories.map((c, ci) => (
              <div key={c.name}>
                <button
                  onClick={() => { setSelectedCategory(ci); setSelectedSub(0); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all cursor-pointer outline-none ${
                    selectedCategory === ci ? 'bg-primary-container text-white shadow-md' : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{c.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.06em]">{c.name}</span>
                </button>
                {selectedCategory === ci && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {c.subcategories.map((s, si) => (
                      <button
                        key={s.name}
                        onClick={() => setSelectedSub(si)}
                        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-left transition-all cursor-pointer outline-none text-xs ${
                          selectedSub === si ? 'bg-primary/8 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'
                        }`}
                      >
                        <span className="truncate">{s.name}</span>
                        <StatusBadge status={s.status} size="sm" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Document requirements */}
          <div className="flex-1 vera-fade-up d-200">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-primary">{sub.name}</h3>
                  <p className="text-xs text-on-surface-variant">{sub.uploaded} of {sub.required} documents uploaded</p>
                </div>
                <StatusBadge status={sub.status} />
              </div>

              {/* Progress */}
              <div className="h-2.5 bg-surface-container-high rounded-full overflow-hidden mb-6">
                <div className="h-full bg-secondary rounded-full vera-bar" style={{ width: `${Math.round((sub.uploaded / sub.required) * 100)}%` }} />
              </div>

              {/* Upload Zone */}
              <div
                className={`rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer group ${
                  isDragging ? 'bg-secondary/10 border-2 border-secondary shadow-lg' : 'bg-surface-container-low/60 border-2 border-dashed border-outline-variant/50 hover:border-primary/40'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
                onClick={() => fileInputRef.current?.click()}
              >
                <input ref={fileInputRef} type="file" className="hidden" multiple accept=".pdf,.xlsx,.xls,.csv,.doc,.docx" />
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all ${isDragging ? 'bg-secondary/20 scale-110' : 'bg-surface-container-highest group-hover:scale-110 group-hover:bg-primary/10'}`}>
                  <span className={`material-symbols-outlined text-2xl ${isDragging ? 'text-secondary' : 'text-primary/60 group-hover:text-primary'}`}>
                    {isDragging ? 'file_download' : 'cloud_upload'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-primary mb-1">{isDragging ? 'Drop files here' : 'Upload Documents'}</h4>
                <p className="text-xs text-on-surface-variant max-w-xs">Drag and drop files, or click to browse. PDF, Excel, CSV, Word.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
