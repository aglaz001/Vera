import React, { useState, useRef, useEffect } from 'react';
import { ProgressRing } from '../components/ui/ProgressRing';
import { aiSuggestions, aiChatHistory, dashboardKPIs } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
  sources?: string[];
}

const QUICK_ACTIONS_DATA = [
  { icon: 'analytics', en: 'Gap Analysis', pt: 'Análise de Lacunas', promptEn: 'Run a gap analysis on my CSRD readiness', promptPt: 'Executar uma análise de lacunas na minha prontidão CSRD' },
  { icon: 'description', en: 'Draft Report', pt: 'Redigir Relatório', promptEn: 'Draft an executive summary for our ESG report', promptPt: 'Redigir um resumo executivo do relatório ESG' },
  { icon: 'checklist', en: 'Action Plan', pt: 'Plano de Ação', promptEn: 'Create an action plan for Scope 3 emissions', promptPt: 'Criar um plano de ação para emissões Scope 3' },
  { icon: 'lightbulb', en: 'Recommendations', pt: 'Recomendações', promptEn: 'What are the top 5 improvements we should prioritize?', promptPt: 'Quais as 5 melhorias que devemos priorizar?' },
  { icon: 'gavel', en: 'Regulation Check', pt: 'Verificação Regulatória', promptEn: 'Check our compliance status across all frameworks', promptPt: 'Verificar o estado de conformidade em todos os frameworks' },
  { icon: 'trending_up', en: 'Predict Trends', pt: 'Prever Tendências', promptEn: 'Predict our emissions trajectory for 2026', promptPt: 'Prever a trajetória de emissões para 2026' },
];

const SIMULATED_RESPONSES: Record<string, { en: string; pt: string; sources: string[] }> = {
  'gap': {
    en: `## CSRD Gap Analysis — Mabor Industrial\n\n**Overall Readiness: 38%** ⚠️\n\n### Critical Gaps\n| Disclosure | Status | Gap |\n|---|---|---|\n| ESRS E1 — Climate | 🟡 Partial | Scope 3 missing (0%) |\n| ESRS E2 — Pollution | 🔴 Missing | No data collected |\n| ESRS S1 — Workforce | 🟡 Partial | Training records absent |\n| ESRS G1 — Conduct | 🟢 Complete | All data verified |\n\n### Recommended Actions\n1. **Immediate**: Start Scope 3 emissions survey (supplier questionnaire)\n2. **This month**: Upload remaining 4 electricity invoices\n3. **Q3 2025**: Complete Double Materiality Assessment\n4. **Q4 2025**: Commission external verification\n\n*Estimated time to full compliance: 4-6 months with current team capacity.*`,
    pt: `## Análise de Lacunas CSRD — Mabor Industrial\n\n**Prontidão Geral: 38%** ⚠️\n\n### Lacunas Críticas\n| Divulgação | Estado | Lacuna |\n|---|---|---|\n| ESRS E1 — Clima | 🟡 Parcial | Scope 3 em falta (0%) |\n| ESRS E2 — Poluição | 🔴 Em falta | Sem dados recolhidos |\n| ESRS S1 — Força de Trabalho | 🟡 Parcial | Registos de formação ausentes |\n| ESRS G1 — Conduta | 🟢 Completo | Todos dados verificados |\n\n### Ações Recomendadas\n1. **Imediato**: Iniciar inquérito emissões Scope 3\n2. **Este mês**: Carregar 4 faturas de eletricidade em falta\n3. **T3 2025**: Concluir Avaliação de Dupla Materialidade\n4. **T4 2025**: Comissionar verificação externa\n\n*Tempo estimado para conformidade total: 4-6 meses com capacidade atual.*`,
    sources: ['ESRS Standards 2023', 'Company data — FY2024', 'Angola regulatory database'],
  },
  'draft': {
    en: `## Executive Summary — ESG Report FY2024\n### Mabor Industrial, S.A.\n\n---\n\n**Dear Stakeholders,**\n\nMabor Industrial continues its commitment to sustainable operations in Angola's manufacturing sector. In FY2024, we achieved:\n\n**Environmental Performance**\n- Total emissions reduced **8.2% YoY** to 506.6 tCO₂e\n- LED retrofit delivered USD 12,000 annual savings\n- Water consumption decreased 6.2% through efficiency programs\n\n**Social Impact**\n- 342 employees across 3 facilities\n- USD 88,000 invested in community projects\n- Safety incident rate: 2.34 (industry avg: 3.8)\n\n**Governance**\n- 60% board independence achieved\n- Anti-corruption \u0026 whistleblower policies active\n- First CSRD-aligned reporting cycle initiated\n\n**Looking Ahead**: We target 20% emissions reduction by 2026, 25% renewable energy by 2027, and full CSRD compliance by December 2025.\n\n*This report was prepared in accordance with GRI Standards and aligned with CSRD/ESRS requirements.*`,
    pt: `## Resumo Executivo — Relatório ESG FY2024\n### Mabor Industrial, S.A.\n\n---\n\n**Caros Stakeholders,**\n\nA Mabor Industrial continua o seu compromisso com operações sustentáveis no setor manufatureiro de Angola. No FY2024, alcançámos:\n\n**Desempenho Ambiental**\n- Emissões totais reduzidas **8.2% homólogo** para 506.6 tCO₂e\n- Retrofit LED entregou USD 12.000 de poupança anual\n- Consumo de água diminuiu 6.2%\n\n**Impacto Social**\n- 342 colaboradores em 3 instalações\n- USD 88.000 investidos em projetos comunitários\n- Taxa de incidentes: 2.34 (média do setor: 3.8)\n\n**Governança**\n- 60% de independência do conselho alcançada\n- Políticas anticorrupção e denúncia ativas\n- Primeiro ciclo de reporte alinhado à CSRD iniciado\n\n**Perspetivas**: Meta de redução de 20% nas emissões até 2026, 25% energia renovável até 2027, e conformidade CSRD total até Dezembro 2025.`,
    sources: ['Mabor Industrial FY2024 data', 'GRI Standards 2021', 'ESRS Guidelines'],
  },
  'default': {
    en: `Based on Mabor Industrial's current profile (ESG readiness: ${dashboardKPIs.esgReadiness}%), here's my analysis:\n\n**Key Insights:**\n- Your environmental score (58%) is held back by missing Scope 3 data\n- Social pillar (72%) is your strongest — community investment is above sector average\n- Governance (68%) needs 2 policy reviews to reach target\n\n**Cost-Saving Opportunity**: Your planned solar PV installation could save USD 45,000/year and reduce Scope 2 emissions by ~35%.\n\n**Regulatory Alert**: CBAM quarterly declaration is due June 30 — this should be your top priority.\n\n*Would you like me to create a detailed action plan for any of these areas?*`,
    pt: `Com base no perfil atual da Mabor Industrial (prontidão ESG: ${dashboardKPIs.esgReadiness}%), aqui está a minha análise:\n\n**Principais Insights:**\n- A pontuação ambiental (58%) é limitada por dados Scope 3 em falta\n- O pilar social (72%) é o mais forte — investimento comunitário acima da média\n- Governança (68%) precisa de 2 revisões de políticas\n\n**Oportunidade de Poupança**: A instalação solar PV planeada pode poupar USD 45.000/ano e reduzir emissões Scope 2 em ~35%.\n\n**Alerta Regulatório**: Declaração trimestral CBAM com prazo a 30 de Junho — deve ser prioridade máxima.\n\n*Deseja que crie um plano de ação detalhado para alguma destas áreas?*`,
    sources: ['Company profile data', 'Framework analysis engine'],
  },
};

export const VeraAI: React.FC = () => {
  const { company, user } = useAppContext();
  const lang = user.language;
  const t = (en: string, pt: string) => lang === 'pt' ? pt : en;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInsights, setShowInsights] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const getResponse = (text: string): { content: string; sources: string[] } => {
    const lower = text.toLowerCase();
    if (lower.includes('gap') || lower.includes('readiness') || lower.includes('lacuna') || lower.includes('prontidão')) {
      const r = SIMULATED_RESPONSES['gap'];
      return { content: lang === 'pt' ? r.pt : r.en, sources: r.sources };
    }
    if (lower.includes('draft') || lower.includes('summary') || lower.includes('redigir') || lower.includes('resumo')) {
      const r = SIMULATED_RESPONSES['draft'];
      return { content: lang === 'pt' ? r.pt : r.en, sources: r.sources };
    }
    const r = SIMULATED_RESPONSES['default'];
    return { content: lang === 'pt' ? r.pt : r.en, sources: r.sources };
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setShowInsights(false);
    const userMsg: Message = { role: 'user', content: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const { content, sources } = getResponse(text);
      setMessages(prev => [...prev, { role: 'assistant', content, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), sources }]);
      setIsTyping(false);
    }, 2000 + Math.random() * 1500);
  };

  const INSIGHTS = [
    { icon: 'warning', color: '#ba1a1a', en: 'CBAM deadline in 38 days — declaration not started', pt: 'Prazo CBAM em 38 dias — declaração não iniciada' },
    { icon: 'trending_down', color: '#2d6a3f', en: 'Emissions down 8.2% YoY — on track for 2026 target', pt: 'Emissões ↓8.2% homólogo — no caminho para meta 2026' },
    { icon: 'attach_money', color: '#e8a200', en: 'Solar PV could save USD 45k/year (ROI: 2.7 years)', pt: 'Solar PV pode poupar USD 45k/ano (ROI: 2.7 anos)' },
    { icon: 'error_outline', color: '#ba1a1a', en: 'Scope 3 at 0% — biggest compliance gap', pt: 'Scope 3 a 0% — maior lacuna de conformidade' },
  ];

  return (
    <div className="w-full h-[calc(100vh-64px)] flex">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
          <div className="max-w-[720px] mx-auto">
            {showInsights && messages.length === 0 && (
              <div className="vera-fade-up text-center pt-8 pb-6">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1a4d2e] to-[#03270e] opacity-10 animate-pulse" />
                  <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-[#1a4d2e] to-[#03270e] opacity-15" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-primary/30" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  </div>
                </div>
                <h2 className="text-3xl font-headline italic text-primary mb-2">{t('Ask Vera AI', 'Perguntar à Vera AI')}</h2>
                <p className="text-on-surface-variant text-sm mb-8 max-w-md mx-auto leading-relaxed">
                  {t('Your ESG intelligence assistant. Get help with framework compliance, gap analysis, report drafting, and sustainability strategy.',
                     'O seu assistente de inteligência ESG. Obtenha ajuda com conformidade, análise de lacunas, redação de relatórios e estratégia de sustentabilidade.')}
                </p>

                {/* AI Insights Cards */}
                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">{t('AI Insights', 'Insights da IA')}</p>
                  <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                    {INSIGHTS.map((ins, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/15 text-left" style={{ animationDelay: `${i * 100}ms` }}>
                        <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0" style={{ color: ins.color }}>{ins.icon}</span>
                        <span className="text-[11px] text-primary leading-snug">{lang === 'pt' ? ins.pt : ins.en}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-xl mx-auto mb-8">
                  {QUICK_ACTIONS_DATA.map((a) => (
                    <button key={a.en} onClick={() => sendMessage(lang === 'pt' ? a.promptPt : a.promptEn)}
                      className="vera-card group flex items-center gap-3 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 text-left hover:border-primary/30 transition-all cursor-pointer outline-none">
                      <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                        <span className="material-symbols-outlined text-[16px] text-secondary">{a.icon}</span>
                      </div>
                      <span className="text-sm font-medium text-primary">{lang === 'pt' ? a.pt : a.en}</span>
                    </button>
                  ))}
                </div>

                {/* Suggestion chips */}
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4">{t('Or try these', 'Ou experimente')}</p>
                <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
                  {aiSuggestions.map((s) => (
                    <button key={s.id} onClick={() => sendMessage(s.text)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/15 text-xs text-primary hover:bg-surface-container-lowest hover:border-primary/25 transition-all cursor-pointer outline-none">
                      <span className="material-symbols-outlined text-[12px] text-secondary">{s.icon}</span>
                      <span className="truncate max-w-[200px]">{s.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 mb-5 vera-fade-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`} style={{ animationDelay: `${i * 50}ms` }}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1a4d2e] to-[#03270e] flex items-center justify-center shrink-0 mt-1 shadow-md">
                    <span className="material-symbols-outlined text-[13px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  </div>
                )}
                <div className={`max-w-[540px] rounded-2xl px-5 py-4 ${
                  msg.role === 'user'
                    ? 'bg-primary-container text-white shadow-lg'
                    : 'bg-surface-container-lowest border border-outline-variant/20 shadow-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-outline-variant/15">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">{t('Sources', 'Fontes')}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.sources.map((s, j) => (
                          <span key={j} className="text-[9px] px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className={`text-[10px] mt-2.5 ${msg.role === 'user' ? 'opacity-50' : 'text-on-surface-variant'}`}>{msg.time}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-[10px] font-bold text-primary">{user.firstName[0]}{user.lastName[0]}</div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 mb-5 vera-fade-up">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1a4d2e] to-[#03270e] flex items-center justify-center shrink-0 mt-1 shadow-md">
                  <span className="material-symbols-outlined text-[13px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl px-5 py-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map(d => (
                        <div key={d} className="w-2 h-2 rounded-full bg-primary/30" style={{ animation: `pulse 1.4s ease-in-out ${d * 0.2}s infinite` }} />
                      ))}
                    </div>
                    <span className="text-[10px] text-on-surface-variant ml-2">{t('Analyzing your data...', 'Analisando os seus dados...')}</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-outline-variant/20 px-4 md:px-8 py-4 bg-surface/80 backdrop-blur-sm">
          <div className="max-w-[720px] mx-auto">
            <div className="flex items-center gap-3 bg-surface-container-lowest border border-outline-variant/25 rounded-2xl px-4 py-2 focus-within:border-primary/40 focus-within:shadow-lg transition-all">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant/50">chat</span>
              <input
                type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder={t('Ask Vera AI about ESG, compliance, reports...', 'Pergunte à Vera AI sobre ESG, conformidade, relatórios...')}
                className="flex-1 bg-transparent text-sm text-primary placeholder:text-on-surface-variant/40 outline-none py-2"
              />
              <button onClick={() => sendMessage(input)} disabled={!input.trim()}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer outline-none ${
                  input.trim() ? 'bg-primary-container text-white shadow-md hover:shadow-lg active:scale-95' : 'bg-surface-container-high text-on-surface-variant/30'
                }`}>
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              </button>
            </div>
            <p className="text-[9px] text-on-surface-variant/50 text-center mt-2">
              {t('Vera AI uses your company data to provide context-aware ESG guidance', 'A Vera AI usa os dados da sua empresa para orientação ESG contextualizada')}
            </p>
          </div>
        </div>
      </div>

      {/* Context sidebar */}
      <aside className="hidden xl:block w-72 border-l border-outline-variant/20 bg-surface-container-low/30 overflow-y-auto">
        <div className="p-6 space-y-5">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">{t('Context', 'Contexto')}</h3>

          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/15">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{t('Company', 'Empresa')}</p>
            <p className="text-sm font-bold text-primary">{company.name}</p>
            <p className="text-xs text-on-surface-variant">{company.sector} · {company.country}</p>
            <p className="text-xs text-on-surface-variant">{company.employees} {t('employees', 'empregados')} · {company.turnover}</p>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/15">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">{t('ESG Scores', 'Pontuações ESG')}</p>
            <div className="flex justify-center gap-4 mb-3">
              {[
                { label: 'E', score: dashboardKPIs.environment, color: '#2d6a3f' },
                { label: 'S', score: dashboardKPIs.social, color: '#5b7fde' },
                { label: 'G', score: dashboardKPIs.governance, color: '#8a6d3b' },
              ].map(p => (
                <div key={p.label} className="flex flex-col items-center gap-1">
                  <ProgressRing percentage={p.score} size={40} strokeWidth={3} color={p.color} />
                  <span className="text-[9px] font-bold text-on-surface-variant uppercase">{p.label}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">{t('Overall', 'Geral')}</p>
              <p className="text-lg font-bold text-primary">{dashboardKPIs.esgReadiness}%</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/15">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{t('Data Gaps', 'Lacunas de Dados')}</p>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              {[
                { en: 'Scope 3 emissions', pt: 'Emissões Scope 3', level: 'critical' },
                { en: 'Training records', pt: 'Registos de formação', level: 'critical' },
                { en: '4 electricity invoices', pt: '4 faturas de eletricidade', level: 'warning' },
                { en: 'Supply chain audits', pt: 'Auditorias da cadeia', level: 'warning' },
              ].map(g => (
                <li key={g.en} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: g.level === 'critical' ? '#ba1a1a' : '#e8a200' }} />
                  {lang === 'pt' ? g.pt : g.en}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/15">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{t('Frameworks', 'Frameworks')}</p>
            <div className="space-y-2">
              {['CSRD', 'GRI', 'CBAM'].map(f => (
                <div key={f} className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">{f}</span>
                  <span className="text-[9px] text-on-surface-variant">{f === 'CSRD' ? '38%' : f === 'GRI' ? '52%' : '25%'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Capabilities section */}
          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{t('AI Capabilities', 'Capacidades da IA')}</p>
            <ul className="space-y-1.5 text-[10px] text-primary">
              {[
                { icon: 'analytics', en: 'Gap analysis \u0026 readiness', pt: 'Análise de lacunas' },
                { icon: 'description', en: 'Report drafting', pt: 'Redação de relatórios' },
                { icon: 'gavel', en: 'Regulatory guidance', pt: 'Orientação regulatória' },
                { icon: 'trending_up', en: 'Trend prediction', pt: 'Previsão de tendências' },
                { icon: 'lightbulb', en: 'Smart recommendations', pt: 'Recomendações inteligentes' },
              ].map(c => (
                <li key={c.en} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[12px] text-secondary">{c.icon}</span>
                  {lang === 'pt' ? c.pt : c.en}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};
