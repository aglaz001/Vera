import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const NAV_GROUPS = [
  {
    label: { en: 'Overview', pt: 'Visão Geral' },
    items: [
      { name: { en: 'Dashboard', pt: 'Painel' }, path: '/', icon: 'dashboard' },
    ],
  },
  {
    label: { en: 'ESG Pillars', pt: 'Pilares ESG' },
    items: [
      { name: { en: 'Environment', pt: 'Ambiente' }, path: '/environment', icon: 'eco' },
      { name: { en: 'Social', pt: 'Social' }, path: '/social', icon: 'group' },
      { name: { en: 'Governance', pt: 'Governança' }, path: '/governance', icon: 'gavel' },
    ],
  },
  {
    label: { en: 'Planning', pt: 'Planeamento' },
    items: [
      { name: { en: 'Strategy', pt: 'Estratégia' }, path: '/strategy', icon: 'route' },
      { name: { en: 'Cost Savings', pt: 'Poupanças' }, path: '/cost-savings', icon: 'savings' },
    ],
  },
  {
    label: { en: 'Compliance', pt: 'Conformidade' },
    items: [
      { name: { en: 'Frameworks', pt: 'Frameworks' }, path: '/frameworks', icon: 'fact_check' },
      { name: { en: 'Reports', pt: 'Relatórios' }, path: '/reports', icon: 'description' },
    ],
  },
  {
    label: { en: 'Data', pt: 'Dados' },
    items: [
      { name: { en: 'Data Ingestion', pt: 'Ingestão de Dados' }, path: '/data-ingestion', icon: 'upload_file' },
      { name: { en: 'Vera AI', pt: 'Vera AI' }, path: '/vera-ai', icon: 'auto_awesome' },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const lang = user.language;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-40 lg:hidden"
          style={{ transition: 'opacity 0.3s ease' }}
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 flex flex-col z-40
          pt-6 pb-6
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          background: 'linear-gradient(180deg, #f4f0e9 0%, #efe9e0 100%)',
          borderRight: '1px solid rgba(168, 175, 170, 0.3)',
          boxShadow: '4px 0 32px rgba(3, 39, 14, 0.06)',
        }}
      >
        {/* ── Logo ─────────────────────────────────────────────── */}
        <div className="px-6 mb-8">
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="flex flex-col">
              <span className="font-headline text-2xl italic tracking-tight text-primary leading-none">Vera</span>
              <span
                className="text-[8px] font-bold uppercase tracking-[0.2em] mt-1"
                style={{ color: '#1a4d2e', opacity: 0.65 }}
              >
                by Compass · Find Your Way
              </span>
            </div>
          </div>
        </div>

        {/* ── Nav groups ────────────────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-5">
          {NAV_GROUPS.map((group) => (
            <div key={group.label.en}>
              <div className="px-3 mb-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-outline opacity-70">
                  {lang === 'pt' ? group.label.pt : group.label.en}
                </span>
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.name.en}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => {
                      if (window.innerWidth < 1024) toggleSidebar();
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer
                       outline-none focus-visible:ring-2 focus-visible:ring-primary
                       transition-all duration-200 group/item relative
                       ${isActive
                         ? 'vera-nav-active text-white'
                         : 'text-on-surface-variant hover:bg-white/60 hover:text-primary hover:shadow-sm'
                       }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          className={`
                            w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                            transition-all duration-200
                            ${isActive
                              ? 'bg-white/15'
                              : 'bg-surface-container-high group-hover/item:bg-white group-hover/item:shadow-sm'
                            }
                          `}
                        >
                          <span
                            className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover/item:scale-110"
                            style={{
                              fontVariationSettings: item.icon === 'auto_awesome' ? "'FILL' 1" : undefined,
                            }}
                          >
                            {item.icon}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.06em]">
                          {lang === 'pt' ? item.name.pt : item.name.en}
                        </span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* ── Bottom items ─────────────────────────────────────── */}
        <div
          className="mt-auto pt-3 px-3 space-y-0.5"
          style={{ borderTop: '1px solid rgba(168, 175, 170, 0.25)' }}
        >
          <NavLink
            to="/settings"
            onClick={() => {
              if (window.innerWidth < 1024) toggleSidebar();
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5
               outline-none focus-visible:ring-2 focus-visible:ring-primary
               transition-all duration-200 group/item
               ${isActive
                 ? 'vera-nav-active text-white'
                 : 'text-on-surface-variant hover:bg-white/60 hover:text-primary hover:shadow-sm'
               }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`
                    w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                    transition-all duration-200
                    ${isActive
                      ? 'bg-white/15'
                      : 'bg-surface-container-high group-hover/item:bg-white group-hover/item:shadow-sm'
                    }
                  `}
                >
                  <span className="material-symbols-outlined text-[16px] group-hover/item:rotate-45 transition-transform duration-300">
                    settings
                  </span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.06em]">{lang === 'pt' ? 'Definições' : 'Settings'}</span>
              </>
            )}
          </NavLink>

          {/* User micro-card */}
          <div
            onClick={() => navigate('/settings')}
            className="mt-2 mx-1 p-3 rounded-xl flex items-center gap-3 cursor-pointer group/user transition-all duration-200 hover:bg-white/60"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 ring-1 ring-outline-variant/40 group-hover/user:ring-primary/30 transition-all text-[11px] font-bold text-primary">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-primary truncate leading-none">{user.firstName} {user.lastName}</p>
              <p className="text-[9px] font-bold uppercase tracking-widest mt-0.5 leading-none"
                style={{ color: '#1a4d2e', opacity: 0.7 }}>
                {user.role}
              </p>
            </div>
            <span className="material-symbols-outlined text-[14px] text-outline opacity-50 group-hover/user:opacity-100 transition-opacity">
              chevron_right
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
