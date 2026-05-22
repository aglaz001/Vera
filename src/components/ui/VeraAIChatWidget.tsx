import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const PAGE_CONTEXT: Record<string, { en: string; pt: string; suggestions: { en: string; pt: string }[] }> = {
  '/': {
    en: 'Dashboard overview — KPIs, emissions, deadlines',
    pt: 'Visão geral do Dashboard — KPIs, emissões, prazos',
    suggestions: [
      { en: 'Summarize my ESG performance', pt: 'Resumir o meu desempenho ESG' },
      { en: 'What should I prioritize this week?', pt: 'O que devo priorizar esta semana?' },
      { en: 'Explain my readiness score', pt: 'Explicar a minha pontuação de prontidão' },
    ],
  },
  '/environment': {
    en: 'Environmental data — emissions, energy, water, waste',
    pt: 'Dados ambientais — emissões, energia, água, resíduos',
    suggestions: [
      { en: 'How can I reduce Scope 1 emissions?', pt: 'Como posso reduzir emissões Scope 1?' },
      { en: 'What data is missing for Scope 3?', pt: 'Que dados faltam para o Scope 3?' },
      { en: 'Compare my energy intensity to benchmarks', pt: 'Comparar a minha intensidade energética com benchmarks' },
    ],
  },
  '/social': {
    en: 'Social metrics — workforce, safety, community',
    pt: 'Métricas sociais — força de trabalho, segurança, comunidade',
    suggestions: [
      { en: 'Analyze my gender diversity metrics', pt: 'Analisar as métricas de diversidade de género' },
      { en: 'How can I improve my safety record?', pt: 'Como posso melhorar o meu registo de segurança?' },
      { en: 'Suggest community investment targets', pt: 'Sugerir metas de investimento comunitário' },
    ],
  },
  '/governance': {
    en: 'Governance data — board, policies, risks',
    pt: 'Dados de governança — conselho, políticas, riscos',
    suggestions: [
      { en: 'Is my board composition CSRD-compliant?', pt: 'A composição do meu conselho está em conformidade com a CSRD?' },
      { en: 'Which policies need review?', pt: 'Quais políticas precisam de revisão?' },
      { en: 'Assess my top governance risks', pt: 'Avaliar os principais riscos de governança' },
    ],
  },
  '/strategy': {
    en: 'Strategy & roadmap — targets, tasks, milestones',
    pt: 'Estratégia e roadmap — metas, tarefas, marcos',
    suggestions: [
      { en: 'Am I on track to meet my targets?', pt: 'Estou no caminho certo para atingir as metas?' },
      { en: 'Suggest a realistic 2026 target', pt: 'Sugerir uma meta realista para 2026' },
      { en: 'What tasks are overdue?', pt: 'Que tarefas estão atrasadas?' },
    ],
  },
  '/cost-savings': {
    en: 'Cost savings — interventions, ROI, targets',
    pt: 'Poupanças — intervenções, ROI, metas',
    suggestions: [
      { en: 'Which intervention has the best ROI?', pt: 'Qual intervenção tem o melhor ROI?' },
      { en: 'How much more can I save this year?', pt: 'Quanto mais posso poupar este ano?' },
      { en: 'Suggest new cost-saving opportunities', pt: 'Sugerir novas oportunidades de poupança' },
    ],
  },
  '/frameworks': {
    en: 'Compliance frameworks — CSRD, GRI, CBAM',
    pt: 'Frameworks de conformidade — CSRD, GRI, CBAM',
    suggestions: [
      { en: 'What CSRD disclosures am I missing?', pt: 'Quais divulgações CSRD estão em falta?' },
      { en: 'Explain CBAM requirements for my sector', pt: 'Explicar requisitos CBAM para o meu setor' },
      { en: 'Compare GRI vs CSRD requirements', pt: 'Comparar requisitos GRI vs CSRD' },
    ],
  },
  '/reports': {
    en: 'Reports — generation, export, templates',
    pt: 'Relatórios — geração, exportação, modelos',
    suggestions: [
      { en: 'Draft an executive summary', pt: 'Redigir um resumo executivo' },
      { en: 'What sections are ready to publish?', pt: 'Que secções estão prontas para publicar?' },
      { en: 'Generate a compliance checklist', pt: 'Gerar uma checklist de conformidade' },
    ],
  },
  '/data-ingestion': {
    en: 'Data ingestion — uploads, gaps, status',
    pt: 'Ingestão de dados — uploads, lacunas, estado',
    suggestions: [
      { en: 'What data is still missing?', pt: 'Que dados ainda estão em falta?' },
      { en: 'Help me prepare my upload list', pt: 'Ajudar-me a preparar a lista de uploads' },
      { en: 'Validate my uploaded data', pt: 'Validar os dados carregados' },
    ],
  },
  '/settings': {
    en: 'Settings — profile, team, preferences',
    pt: 'Definições — perfil, equipa, preferências',
    suggestions: [
      { en: 'How do I add a team member?', pt: 'Como adiciono um membro da equipa?' },
      { en: 'Explain the role permissions', pt: 'Explicar as permissões dos papéis' },
      { en: 'Can I change my reporting currency?', pt: 'Posso alterar a minha moeda de relatório?' },
    ],
  },
};

const SIMULATED_RESPONSES: Record<string, { en: string; pt: string }> = {
  '/': {
    en: `Based on your current dashboard metrics:\n\n**ESG Readiness: 64%** (+4.2% vs last quarter)\n\n• **Environment (58%)** — Scope 1+2 on track, but Scope 3 at 0% is your biggest gap\n• **Social (72%)** — Strong community investment; safety training needs completion\n• **Governance (68%)** — Board independence good; 2 policies need review\n\n**Priority this week:** Submit CBAM quarterly declaration (critical deadline) and upload missing electricity invoices.`,
    pt: `Com base nas suas métricas atuais:\n\n**Prontidão ESG: 64%** (+4.2% vs trimestre anterior)\n\n• **Ambiente (58%)** — Scope 1+2 no caminho certo, mas Scope 3 a 0% é a maior lacuna\n• **Social (72%)** — Investimento comunitário forte; formação em segurança precisa de conclusão\n• **Governança (68%)** — Independência do conselho boa; 2 políticas precisam de revisão\n\n**Prioridade esta semana:** Submeter declaração trimestral CBAM (prazo crítico) e carregar faturas de eletricidade em falta.`,
  },
  '/environment': {
    en: `Environmental analysis for Mabor Industrial:\n\n**Total Emissions: 506.6 tCO₂e** (↓8.2% YoY)\n• Scope 1: 162.2t (diesel generators + vehicles)\n• Scope 2: 344.4t (grid electricity)\n• Scope 3: ⚠️ Not yet measured\n\n**Key recommendations:**\n1. Start Scope 3 inventory — transport \u0026 commuting data needed\n2. LED retrofit saving ~12,000 kWh/year\n3. Solar PV could cut Scope 2 by ~35%\n\nYour emission factor (0.42 kgCO₂/kWh) is typical for Angola's grid mix.`,
    pt: `Análise ambiental da Mabor Industrial:\n\n**Emissões Totais: 506.6 tCO₂e** (↓8.2% homólogo)\n• Scope 1: 162.2t (geradores diesel + veículos)\n• Scope 2: 344.4t (eletricidade da rede)\n• Scope 3: ⚠️ Ainda não medido\n\n**Recomendações principais:**\n1. Iniciar inventário Scope 3 — dados de transporte e deslocações necessários\n2. Retrofit LED a poupar ~12.000 kWh/ano\n3. Solar PV pode cortar Scope 2 em ~35%\n\nO seu fator de emissão (0.42 kgCO₂/kWh) é típico para a rede de Angola.`,
  },
};

const getDefaultResponse = (lang: 'en' | 'pt', pageName: string) => {
  return lang === 'pt'
    ? `Com base no contexto da página **${pageName}** e no perfil da Mabor Industrial, analisei os seus dados.\n\nEsta é uma resposta simulada. Na versão de produção, a Vera AI fornecerá respostas contextualizadas usando os dados da sua empresa, requisitos de frameworks e contexto regulatório relevante para Angola.\n\n💡 *Dica: Experimente perguntas específicas sobre métricas, lacunas ou obrigações regulatórias.*`
    : `Based on the **${pageName}** context and Mabor Industrial's profile, I've analyzed your data.\n\nThis is a simulated response. In production, Vera AI would provide context-aware answers using your company data, framework requirements, and regulatory context relevant to Angola.\n\n💡 *Tip: Try asking specific questions about metrics, gaps, or regulatory obligations.*`;
};

export const VeraAIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const { user } = useAppContext();

  const lang = user.language;
  const t = (en: string, pt: string) => lang === 'pt' ? pt : en;
  const pageCtx = PAGE_CONTEXT[location.pathname] || PAGE_CONTEXT['/']!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Reset messages when navigating to a new page
  useEffect(() => {
    setMessages([]);
    setHasNewMessage(false);
  }, [location.pathname]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response with context-aware answers
    setTimeout(() => {
      const pageResponses = SIMULATED_RESPONSES[location.pathname];
      const pageMeta = PAGE_CONTEXT[location.pathname];
      const responseText = pageResponses
        ? pageResponses[lang]
        : getDefaultResponse(lang, pageMeta?.en || 'this page');

      const aiMsg: Message = {
        role: 'assistant',
        content: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      if (!isOpen) setHasNewMessage(true);
    }, 1500 + Math.random() * 1000);
  };

  // Don't show widget on Vera AI page itself
  if (location.pathname === '/vera-ai') return null;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setHasNewMessage(false); }}
        className="fixed bottom-6 right-6 z-50 group outline-none cursor-pointer"
        aria-label="Ask Vera AI"
      >
        <div className={`
          w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center
          transition-all duration-300 ease-out
          ${isOpen
            ? 'bg-white border border-outline-variant/30 rotate-0 scale-95'
            : 'bg-gradient-to-br from-[#1a4d2e] to-[#03270e] hover:shadow-2xl hover:scale-105 active:scale-95'
          }
        `}>
          <span
            className={`material-symbols-outlined text-[22px] transition-all duration-300 ${
              isOpen ? 'text-primary rotate-45' : 'text-white'
            }`}
            style={{ fontVariationSettings: isOpen ? undefined : "'FILL' 1" }}
          >
            {isOpen ? 'close' : 'auto_awesome'}
          </span>
        </div>

        {/* Pulse ring when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-2xl border-2 border-[#1a4d2e]/30 animate-ping" style={{ animationDuration: '2s' }} />
        )}

        {/* New message dot */}
        {hasNewMessage && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e8a200] rounded-full border-2 border-white animate-bounce" />
        )}

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-xl whitespace-nowrap shadow-lg">
              {t('Ask Vera AI', 'Perguntar à Vera AI')}
            </div>
          </div>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[520px] bg-white rounded-3xl shadow-2xl border border-outline-variant/20 flex flex-col overflow-hidden"
          style={{
            animation: 'vera-chat-slide-up 0.3s ease-out',
            boxShadow: '0 24px 80px rgba(3, 39, 14, 0.2), 0 8px 24px rgba(3, 39, 14, 0.1)',
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 flex items-center gap-3 shrink-0"
            style={{ borderBottom: '1px solid rgba(168, 175, 170, 0.2)' }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a4d2e] to-[#03270e] flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[15px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-primary leading-none">Vera AI</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mt-0.5">
                {lang === 'pt' ? pageCtx.pt : pageCtx.en}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2d6a3f] animate-pulse" />
              <span className="text-[9px] font-bold text-[#2d6a3f] uppercase tracking-widest">{t('Online', 'Online')}</span>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[200px]">
            {messages.length === 0 && (
              <div className="text-center py-4">
                <span className="material-symbols-outlined text-4xl text-primary/15 mb-3 block" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <p className="text-xs text-on-surface-variant mb-4">
                  {t(
                    'Ask anything about this page\'s data',
                    'Pergunte qualquer coisa sobre os dados desta página'
                  )}
                </p>
                {/* Quick suggestions */}
                <div className="space-y-2">
                  {pageCtx.suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(lang === 'pt' ? s.pt : s.en)}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/15 text-[11px] text-primary hover:bg-surface-container-lowest hover:border-primary/25 transition-all cursor-pointer outline-none flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[12px] text-secondary">arrow_forward</span>
                      {lang === 'pt' ? s.pt : s.en}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#1a4d2e] to-[#03270e] flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <span className="material-symbols-outlined text-[10px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  </div>
                )}
                <div className={`max-w-[260px] rounded-2xl px-3.5 py-2.5 ${
                  msg.role === 'user'
                    ? 'bg-primary-container text-white shadow-md'
                    : 'bg-surface-container-lowest border border-outline-variant/15'
                }`}>
                  <p className="text-[11px] leading-relaxed whitespace-pre-line">{msg.content}</p>
                  <p className={`text-[8px] mt-1.5 ${msg.role === 'user' ? 'opacity-50' : 'text-on-surface-variant'}`}>{msg.time}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#1a4d2e] to-[#03270e] flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <span className="material-symbols-outlined text-[10px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map(d => (
                      <div key={d} className="w-1.5 h-1.5 rounded-full bg-primary/30" style={{ animation: `pulse 1.4s ease-in-out ${d * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 shrink-0" style={{ borderTop: '1px solid rgba(168, 175, 170, 0.2)' }}>
            <div className="flex items-center gap-2 bg-surface-container-low border border-outline-variant/20 rounded-xl px-3 py-1.5 focus-within:border-primary/40 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder={t('Ask about this page...', 'Pergunte sobre esta página...')}
                className="flex-1 bg-transparent text-[11px] text-primary placeholder:text-on-surface-variant/40 outline-none py-1.5"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer outline-none ${
                  input.trim() ? 'bg-primary-container text-white shadow-sm hover:shadow-md active:scale-90' : 'bg-surface-container-high text-on-surface-variant/30'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes vera-chat-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
};
