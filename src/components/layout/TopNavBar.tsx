import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

interface TopNavBarProps {
  toggleSidebar: () => void;
}

const PAGE_META: Record<string, { title: { en: string; pt: string }; breadcrumb: { en: string; pt: string } }> = {
  '/':              { title: { en: 'Dashboard', pt: 'Painel' }, breadcrumb: { en: 'Overview', pt: 'Visão Geral' } },
  '/environment':   { title: { en: 'Environment', pt: 'Ambiente' }, breadcrumb: { en: 'ESG · Environment', pt: 'ESG · Ambiente' } },
  '/social':        { title: { en: 'Social', pt: 'Social' }, breadcrumb: { en: 'ESG · Social', pt: 'ESG · Social' } },
  '/governance':    { title: { en: 'Governance', pt: 'Governança' }, breadcrumb: { en: 'ESG · Governance', pt: 'ESG · Governança' } },
  '/strategy':      { title: { en: 'Strategy', pt: 'Estratégia' }, breadcrumb: { en: 'Planning · Strategy', pt: 'Planeamento · Estratégia' } },
  '/cost-savings':  { title: { en: 'Cost Savings', pt: 'Poupanças' }, breadcrumb: { en: 'Planning · Cost Savings', pt: 'Planeamento · Poupanças' } },
  '/frameworks':    { title: { en: 'Frameworks', pt: 'Frameworks' }, breadcrumb: { en: 'Compliance · Frameworks', pt: 'Conformidade · Frameworks' } },
  '/reports':       { title: { en: 'Reports', pt: 'Relatórios' }, breadcrumb: { en: 'Compliance · Reports', pt: 'Conformidade · Relatórios' } },
  '/data-ingestion': { title: { en: 'Data Ingestion', pt: 'Ingestão de Dados' }, breadcrumb: { en: 'Data · Ingestion', pt: 'Dados · Ingestão' } },
  '/vera-ai':       { title: { en: 'Vera AI', pt: 'Vera AI' }, breadcrumb: { en: 'Data · AI Assistant', pt: 'Dados · Assistente IA' } },
  '/settings':      { title: { en: 'Settings', pt: 'Definições' }, breadcrumb: { en: 'System · Settings', pt: 'Sistema · Definições' } },
};

export const TopNavBar: React.FC<TopNavBarProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const { user } = useAppContext();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUser(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const lang = user.language;
  const rawMeta = PAGE_META[path] || { title: { en: 'Vera', pt: 'Vera' }, breadcrumb: { en: 'Platform', pt: 'Plataforma' } };
  const meta = { title: lang === 'pt' ? rawMeta.title.pt : rawMeta.title.en, breadcrumb: lang === 'pt' ? rawMeta.breadcrumb.pt : rawMeta.breadcrumb.en };
  const t = (en: string, pt: string) => lang === 'pt' ? pt : en;

  return (
    <header
      className="vera-fade-in fixed top-0 w-full z-50"
      style={{
        background: 'rgba(253, 249, 242, 0.88)',
        backdropFilter: 'blur(20px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
        borderBottom: '1px solid rgba(168, 175, 170, 0.30)',
        boxShadow: '0 4px 24px rgba(3, 39, 14, 0.06)',
      }}
    >
      <div className="flex justify-between items-center w-full px-4 lg:px-8 py-3">

        {/* ── Left: hamburger + title ─────────────────────────── */}
        <div className="flex items-center gap-5">
          <button
            className="lg:hidden p-2 hover:bg-primary/8 rounded-xl transition-all cursor-pointer active:scale-90 outline-none"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <span className="material-symbols-outlined text-primary text-[24px]">menu</span>
          </button>

          <div className="flex flex-col select-none">
            <span
              className="text-[9px] font-bold tracking-[0.3em] uppercase mb-0.5 opacity-60"
              style={{ color: '#1a4d2e' }}
            >
              {meta.breadcrumb}
            </span>
            <h1 className="text-xl md:text-2xl font-headline italic text-primary leading-none">
              {meta.title}
            </h1>
          </div>
        </div>

        {/* ── Right: actions + user ───────────────────────────── */}
        <div className="flex items-center gap-3 lg:gap-5">

          {/* Search */}
          <button
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low/80 border border-outline-variant/25 text-on-surface-variant text-[11px] hover:bg-surface-container-high transition-all cursor-pointer outline-none"
            onClick={() => navigate('/vera-ai')}
          >
            <span className="material-symbols-outlined text-[16px]">search</span>
            <span className="hidden md:inline">{t('Ask Vera AI...', 'Perguntar à Vera AI...')}</span>
          </button>

          <div className="h-6 w-px bg-outline-variant/30 hidden sm:block" />

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setShowNotif(v => !v); setShowUser(false); }}
              className="relative group cursor-pointer p-2 rounded-xl hover:bg-primary/5 transition-all active:scale-90 outline-none"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors"
                style={{ color: '#1a4d2e' }}>
                notifications
              </span>
              <span className="vera-notif-dot absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-[#fdf9f2]" />
            </button>
            {showNotif && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-outline-variant/20 overflow-hidden z-50" style={{ boxShadow: '0 16px 56px rgba(3,39,14,0.18)' }}>
                <div className="p-4 border-b border-outline-variant/20">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">{t('Notifications', 'Notificações')}</p>
                </div>
                <div className="divide-y divide-outline-variant/15">
                  <button onClick={() => { navigate('/frameworks'); setShowNotif(false); }} className="w-full text-left p-4 hover:bg-surface-container-lowest transition-colors cursor-pointer flex gap-3 items-start">
                    <span className="material-symbols-outlined text-[16px] text-[#fca311] mt-0.5">warning</span>
                    <div>
                      <p className="text-sm font-bold text-primary">CBAM quarterly deadline approaching</p>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">Due June 30 — declaration not yet started</p>
                    </div>
                  </button>
                  <button onClick={() => { navigate('/data-ingestion'); setShowNotif(false); }} className="w-full text-left p-4 hover:bg-surface-container-lowest transition-colors cursor-pointer flex gap-3 items-start">
                    <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">upload_file</span>
                    <div>
                      <p className="text-sm font-bold text-primary">4 electricity invoices missing</p>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">Q3-Q4 2024 data incomplete</p>
                    </div>
                  </button>
                  <button onClick={() => { navigate('/environment'); setShowNotif(false); }} className="w-full text-left p-4 hover:bg-surface-container-lowest transition-colors cursor-pointer flex gap-3 items-start">
                    <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">eco</span>
                    <div>
                      <p className="text-sm font-bold text-primary">Scope 3 data at 0%</p>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">Transport and commuting data needed</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User avatar */}
          <div className="relative" ref={userRef}>
            <div
              onClick={() => { setShowUser(v => !v); setShowNotif(false); }}
              className="flex items-center gap-2.5 pl-3 group cursor-pointer active:scale-95 transition-transform"
              style={{ borderLeft: '1px solid rgba(168, 175, 170, 0.35)' }}
            >
              <div className="hidden xl:block text-right">
                <p className="text-[11px] font-bold text-primary leading-none mb-0.5">{user.firstName} {user.lastName}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#1a4d2e', opacity: 0.7 }}>
                  {user.role}
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center ring-2 ring-outline-variant/40 group-hover:ring-primary/40 transition-all duration-300 text-[11px] font-bold text-primary">
                {user.firstName[0]}{user.lastName[0]}
              </div>
            </div>
            {showUser && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-outline-variant/20 overflow-hidden z-50" style={{ boxShadow: '0 16px 56px rgba(3,39,14,0.18)' }}>
                <div className="p-5 border-b border-outline-variant/20">
                  <p className="text-sm font-bold text-primary">{user.firstName} {user.lastName}</p>
                  <p className="text-[11px] text-on-surface-variant">{user.firstName.toLowerCase()}.{user.lastName.toLowerCase()}@company.com</p>
                </div>
                <div className="py-1">
                  <button onClick={() => { navigate('/settings'); setShowUser(false); }} className="w-full text-left px-5 py-3 hover:bg-surface-container-lowest transition-colors cursor-pointer flex items-center gap-3 text-sm font-medium text-primary">
                    <span className="material-symbols-outlined text-[18px]">settings</span>
                    {t('Settings', 'Definições')}
                  </button>
                  <button onClick={() => setShowUser(false)} className="w-full text-left px-5 py-3 hover:bg-surface-container-lowest transition-colors cursor-pointer flex items-center gap-3 text-sm font-medium text-error">
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    {t('Sign Out', 'Terminar Sessão')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
