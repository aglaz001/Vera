import React from 'react';

interface Tab {
  key: string;
  label: string;
  icon?: string;
}

interface SubTabNavProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (key: string) => void;
}

export const SubTabNav: React.FC<SubTabNavProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex items-center gap-1 bg-surface-container-low/80 p-1.5 rounded-full border border-outline-variant/25 shadow-inner mb-8 inline-flex flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.08em]
            transition-all duration-200 cursor-pointer outline-none active:scale-95
            ${activeTab === tab.key
              ? 'bg-primary-container text-white shadow-md'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-highest'
            }
          `}
        >
          {tab.icon && (
            <span className="material-symbols-outlined text-[14px]">{tab.icon}</span>
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
};
