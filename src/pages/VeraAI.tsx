import React, { useState, useRef, useEffect } from 'react';
import { ProgressRing } from '../components/ui/ProgressRing';
import { aiSuggestions, aiChatHistory, dashboardKPIs } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const QUICK_ACTIONS = [
  { icon: 'analytics', label: 'Gap Analysis', prompt: 'Run a gap analysis on my CSRD readiness' },
  { icon: 'description', label: 'Draft Report', prompt: 'Draft an executive summary for our ESG report' },
  { icon: 'checklist', label: 'Action Plan', prompt: 'Create an action plan for Scope 3 emissions' },
  { icon: 'lightbulb', label: 'Recommendations', prompt: 'What are the top 5 improvements we should prioritize?' },
];

export const VeraAI: React.FC = () => {
  const { company, user } = useAppContext();
  const [messages, setMessages] = useState<Message[]>(aiChatHistory);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        role: 'assistant',
        content: `Based on ${company.name}'s current profile (ESG readiness: ${dashboardKPIs.esgReadiness}%), here's my analysis:\n\nThis is a simulated response. In production, Vera AI would provide context-aware answers using your company data, framework requirements, and regulatory context relevant to ${company.country}.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 2000);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="w-full h-[calc(100vh-64px)] flex">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
          <div className="max-w-[720px] mx-auto">
            {isEmpty && (
              <div className="vera-fade-up text-center pt-12 pb-8">
                {/* Hero graphic */}
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1a4d2e] to-[#03270e] opacity-10 animate-pulse" />
                  <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-[#1a4d2e] to-[#03270e] opacity-15" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-primary/30" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  </div>
                </div>
                <h2 className="text-3xl font-headline italic text-primary mb-3">Ask Vera AI</h2>
                <p className="text-on-surface-variant text-sm mb-10 max-w-md mx-auto leading-relaxed">
                  Your ESG intelligence assistant. Get help with framework compliance, gap analysis, report drafting, and sustainability strategy.
                </p>

                {/* Quick actions */}
                <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto mb-8">
                  {QUICK_ACTIONS.map((a) => (
                    <button key={a.label} onClick={() => sendMessage(a.prompt)}
                      className="vera-card group flex items-center gap-3 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 text-left hover:border-primary/30 transition-all cursor-pointer outline-none">
                      <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                        <span className="material-symbols-outlined text-[16px] text-secondary">{a.icon}</span>
                      </div>
                      <span className="text-sm font-medium text-primary">{a.label}</span>
                    </button>
                  ))}
                </div>

                {/* Suggestion chips */}
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4">Or try these</p>
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
                  <p className={`text-[10px] mt-2.5 ${msg.role === 'user' ? 'opacity-50' : 'text-on-surface-variant'}`}>{msg.time}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-[10px] font-bold text-primary">{user.firstName[0]}{user.lastName[0]}</div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3 mb-5 vera-fade-up">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1a4d2e] to-[#03270e] flex items-center justify-center shrink-0 mt-1 shadow-md">
                  <span className="material-symbols-outlined text-[13px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl px-5 py-4 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map(d => (
                      <div key={d} className="w-2 h-2 rounded-full bg-primary/30" style={{ animation: `pulse 1.4s ease-in-out ${d * 0.2}s infinite` }} />
                    ))}
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
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask Vera AI about ESG, compliance, reports..."
                className="flex-1 bg-transparent text-sm text-primary placeholder:text-on-surface-variant/40 outline-none py-2"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer outline-none ${
                  input.trim() ? 'bg-primary-container text-white shadow-md hover:shadow-lg active:scale-95' : 'bg-surface-container-high text-on-surface-variant/30'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              </button>
            </div>
            <p className="text-[9px] text-on-surface-variant/50 text-center mt-2">Vera AI uses your company data to provide context-aware ESG guidance</p>
          </div>
        </div>
      </div>

      {/* Context sidebar */}
      <aside className="hidden xl:block w-72 border-l border-outline-variant/20 bg-surface-container-low/30 overflow-y-auto">
        <div className="p-6 space-y-5">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Context</h3>

          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/15">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Company</p>
            <p className="text-sm font-bold text-primary">{company.name}</p>
            <p className="text-xs text-on-surface-variant">{company.sector} · {company.country}</p>
            <p className="text-xs text-on-surface-variant">{company.employees} employees · {company.turnover}</p>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/15">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">ESG Scores</p>
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
              <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Overall</p>
              <p className="text-lg font-bold text-primary">{dashboardKPIs.esgReadiness}%</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/15">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Data Gaps</p>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              {[
                { label: 'Scope 3 emissions', level: 'critical' },
                { label: 'Training records', level: 'critical' },
                { label: '4 electricity invoices', level: 'warning' },
                { label: 'Supply chain audits', level: 'warning' },
              ].map(g => (
                <li key={g.label} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: g.level === 'critical' ? '#ba1a1a' : '#e8a200' }} />
                  {g.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/15">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Frameworks</p>
            <div className="space-y-2">
              {['CSRD', 'GRI', 'CBAM'].map(f => (
                <div key={f} className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">{f}</span>
                  <span className="text-[9px] text-on-surface-variant">{f === 'CSRD' ? '38%' : f === 'GRI' ? '52%' : '25%'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
