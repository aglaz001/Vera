import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

type Step = 'language' | 'welcome' | 'personal' | 'kyc-company' | 'kyc-regulatory' | 'kyc-context' | 'erp-select' | 'erp-sync' | 'ai-frameworks' | 'done';

const erpOptions = [
  { id: 'primavera', name: 'Primavera BSS', ptName: 'Primavera BSS', icon: 'business_center' },
  { id: 'phc', name: 'PHC Software', ptName: 'PHC Software', icon: 'account_tree' },
  { id: 'sap', name: 'SAP S/4HANA', ptName: 'SAP S/4HANA', icon: 'corporate_fare' },
  { id: 'dynamics', name: 'Microsoft Dynamics', ptName: 'Microsoft Dynamics', icon: 'grid_view' },
  { id: 'odoo', name: 'Odoo', ptName: 'Odoo', icon: 'widgets' },
  { id: 'sage', name: 'Sage X3', ptName: 'Sage X3', icon: 'point_of_sale' },
  { id: 'other', name: 'Other / CSV Upload', ptName: 'Outro / Upload CSV', icon: 'upload_file' }
];

export const Onboarding: React.FC = () => {
  const [step, setStep] = useState<Step>('language');
  const [personalData, setPersonalData] = useState({ firstName: '', lastName: '', role: '', language: 'en' as 'en'|'pt' });
  
  // Extended KYC Data
  const [kycData, setKycData] = useState({ 
    name: '', sector: '', country: 'Angola', employees: '', turnover: '',
    euParent: '', dfi: '', listed: '', fiscalYear: 'January', currency: 'AOA - Angolan Kwanza',
    materiality: '', reportingHistory: ''
  });
  
  const [exportMarkets, setExportMarkets] = useState<string[]>([]);
  const [drivers, setDrivers] = useState<string[]>([]);

  const [selectedErp, setSelectedErp] = useState<string>('');
  const [erpProgress, setErpProgress] = useState(0);
  const [aiAnalyzing, setAiAnalyzing] = useState(true);
  const { setUser, setCompany } = useAppContext();
  const navigate = useNavigate();

  const t = (en: string, pt: string) => personalData.language === 'pt' ? pt : en;

  // ERP Sync Animation
  useEffect(() => {
    if (step === 'erp-sync') {
      const interval = setInterval(() => {
        setErpProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('ai-frameworks'), 800);
            return 100;
          }
          return p + Math.floor(Math.random() * 12) + 4;
        });
      }, 350);
      return () => clearInterval(interval);
    }
  }, [step]);

  // AI Frameworks Animation
  useEffect(() => {
    if (step === 'ai-frameworks') {
      setAiAnalyzing(true);
      const timer = setTimeout(() => {
        setAiAnalyzing(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNext = (nextStep: Step) => {
    window.scrollTo(0, 0);
    setStep(nextStep);
  };

  const completeOnboarding = () => {
    setUser({
      firstName: personalData.firstName || 'Carlos',
      lastName: personalData.lastName || 'Andrade',
      role: personalData.role || 'ESG Manager',
      language: personalData.language
    });
    setCompany({
      name: kycData.name || 'Mabor Industrial, S.A.',
      sector: kycData.sector || 'Manufacturing',
      country: kycData.country || 'Angola',
      employees: kycData.employees || '250 - 499',
      turnover: kycData.turnover || '$10M - $50M',
      erp: erpOptions.find(e => e.id === selectedErp)?.name || 'Primavera BSS'
    });
    navigate('/');
  };

  const toggleArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const renderLanguage = () => (
    <div className="vera-fade-up max-w-xl mx-auto text-center space-y-8 mt-24">
      <div className="w-20 h-20 bg-primary/10 rounded-3xl mx-auto flex items-center justify-center mb-10">
        <span className="material-symbols-outlined text-4xl text-primary">language</span>
      </div>
      <h1 className="text-4xl font-headline italic text-primary">Choose your language</h1>
      <p className="text-on-surface-variant text-sm mb-2">Escolha o seu idioma</p>
      
      <div className="flex flex-col gap-4 max-w-xs mx-auto pt-8">
        <button 
          onClick={() => { setPersonalData({...personalData, language: 'en'}); handleNext('welcome'); }}
          className="px-8 py-4 bg-white border border-outline-variant/30 text-primary rounded-2xl text-sm font-bold shadow-sm hover:border-primary/50 hover:bg-surface-container-lowest transition-all outline-none cursor-pointer flex items-center justify-center gap-3"
        >
          English
        </button>
        <button 
          onClick={() => { setPersonalData({...personalData, language: 'pt'}); handleNext('welcome'); }}
          className="px-8 py-4 bg-white border border-outline-variant/30 text-primary rounded-2xl text-sm font-bold shadow-sm hover:border-primary/50 hover:bg-surface-container-lowest transition-all outline-none cursor-pointer flex items-center justify-center gap-3"
        >
          Português
        </button>
      </div>
    </div>
  );

  const renderWelcome = () => (
    <div className="vera-fade-up max-w-xl mx-auto text-center space-y-8 mt-20">
      <div className="w-20 h-20 bg-primary/10 rounded-3xl mx-auto flex items-center justify-center mb-10">
        <span className="material-symbols-outlined text-4xl text-primary">eco</span>
      </div>
      <h1 className="text-5xl font-headline italic text-primary">{t('Welcome to Vera', 'Bem-vindo à Vera')}</h1>
      <p className="text-on-surface-variant text-lg leading-relaxed">
        {t("ESG reporting tailored for companies that actually make things. Let's personalize your workspace to establish an accurate, automated reporting baseline.", "Relatórios ESG adaptados para empresas que realmente produzem. Vamos personalizar o seu espaço para estabelecer uma base automatizada e precisa.")}
      </p>
      <div className="pt-8">
        <button 
          onClick={() => handleNext('personal')}
          className="px-8 py-3.5 bg-primary-container text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all outline-none cursor-pointer"
        >
          Begin Setup
        </button>
      </div>
    </div>
  );

  const renderPersonal = () => (
    <div className="vera-fade-up max-w-2xl mx-auto mt-12">
      <div className="mb-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline opacity-70 mb-2 block">{t('Step 1 of 6', 'Passo 1 de 6')}</span>
        <h2 className="text-4xl font-headline italic text-primary">{t('About You', 'Sobre Si')}</h2>
        <p className="text-on-surface-variant mt-2">{t('How should we address you in notifications and reports?', 'Como devemos tratá-lo nas notificações e relatórios?')}</p>
      </div>
      
      <div className="bg-white rounded-3xl p-8 border border-outline-variant/20 shadow-sm space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('First Name', 'Nome')}</label>
            <input 
              className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 focus:border-primary transition-all py-2.5 px-0 text-primary font-bold text-base outline-none" 
              type="text" 
              placeholder={t('e.g. Carlos', 'ex: Carlos')}
              value={personalData.firstName}
              onChange={e => setPersonalData({...personalData, firstName: e.target.value})}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('Last Name', 'Apelido')}</label>
            <input 
              className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 focus:border-primary transition-all py-2.5 px-0 text-primary font-bold text-base outline-none" 
              type="text" 
              placeholder={t('e.g. Andrade', 'ex: Andrade')}
              value={personalData.lastName}
              onChange={e => setPersonalData({...personalData, lastName: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('Your Role', 'O Seu Cargo')}</label>
          <input 
            className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 focus:border-primary transition-all py-2.5 px-0 text-primary font-bold text-base outline-none" 
            type="text" 
            placeholder={t('e.g. ESG Manager, CFO, HR Director', 'ex: Gestor ESG, Diretor Financeiro')}
            value={personalData.role}
            onChange={e => setPersonalData({...personalData, role: e.target.value})}
          />
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button 
          onClick={() => handleNext('welcome')}
          className="px-6 py-3 bg-transparent text-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-outline-variant/10 transition-all outline-none cursor-pointer"
        >
          {t('Back', 'Voltar')}
        </button>
        <button 
          onClick={() => handleNext('kyc-company')}
          disabled={!personalData.firstName || !personalData.role}
          className="px-8 py-3 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:scale-[1.02] active:scale-95 transition-all outline-none cursor-pointer flex items-center gap-2"
        >
          {t('Continue', 'Continuar')} <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );

  const renderKYCCompany = () => (
    <div className="vera-fade-up max-w-2xl mx-auto mt-12">
      <div className="mb-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline opacity-70 mb-2 block">{t('Step 2 of 6', 'Passo 2 de 6')}</span>
        <h2 className="text-4xl font-headline italic text-primary">{t('About Your Company', 'Sobre a Sua Empresa')}</h2>
        <p className="text-on-surface-variant mt-2">{t('Vera uses this to figure out which frameworks apply to you and what regulators expect.', 'A Vera usa isto para descobrir quais frameworks se aplicam a si e o que os reguladores esperam.')}</p>
      </div>
      
      <div className="space-y-8">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('Company Name', 'Nome da Empresa')}</label>
          <input 
            className="w-full bg-white border border-outline-variant/30 focus:border-primary rounded-xl py-3 px-4 text-primary font-medium text-sm outline-none transition-all shadow-sm" 
            type="text" 
            placeholder={t('e.g., Mabor Industrial, S.A.', 'ex: Mabor Industrial, S.A.')}
            value={kycData.name}
            onChange={e => setKycData({...kycData, name: e.target.value})}
          />
          <p className="text-xs text-on-surface-variant mt-2">{t('The legal entity name as it appears on official documents.', 'O nome da entidade legal conforme consta nos documentos oficiais.')}</p>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('Sector', 'Setor')}</label>
          <select 
            className="w-full bg-white border border-outline-variant/30 focus:border-primary rounded-xl py-3 px-4 text-primary font-medium text-sm outline-none transition-all shadow-sm appearance-none"
            value={kycData.sector}
            onChange={e => setKycData({...kycData, sector: e.target.value})}
          >
            <option value="" disabled>{t('Select sector', 'Selecione o setor')}</option>
            <option value="Manufacturing">{t('Manufacturing', 'Manufatura')}</option>
            <option value="Mining & Resources">{t('Mining & Resources', 'Mineração e Recursos')}</option>
            <option value="Agriculture">{t('Agriculture', 'Agricultura')}</option>
            <option value="Logistics & Transport">{t('Logistics & Transport', 'Logística e Transportes')}</option>
            <option value="Energy">{t('Energy', 'Energia')}</option>
            <option value="Technology & Services">{t('Technology & Services', 'Tecnologia e Serviços')}</option>
          </select>
          <p className="text-xs text-on-surface-variant mt-2">{t('Choose the closest match. You can refine sub-activities later.', 'Escolha a correspondência mais próxima. Poderá refinar as atividades mais tarde.')}</p>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('Country of Headquarters', 'País Sede')}</label>
          <select 
            className="w-full bg-white border border-outline-variant/30 focus:border-primary rounded-xl py-3 px-4 text-primary font-medium text-sm outline-none transition-all shadow-sm appearance-none"
            value={kycData.country}
            onChange={e => setKycData({...kycData, country: e.target.value})}
          >
            <option value="Angola">{t('Angola', 'Angola')}</option>
            <option value="Portugal">{t('Portugal', 'Portugal')}</option>
            <option value="South Africa">{t('South Africa', 'África do Sul')}</option>
            <option value="Brazil">{t('Brazil', 'Brasil')}</option>
            <option value="United Kingdom">{t('United Kingdom', 'Reino Unido')}</option>
          </select>
          <p className="text-xs text-on-surface-variant mt-2">{t('We default to your detected country. Change it if your headquarters is elsewhere.', 'Usamos o seu país detetado por defeito. Altere-o se a sede for noutro local.')}</p>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('Employees', 'Empregados')}</label>
          <select 
            className="w-full bg-white border border-outline-variant/30 focus:border-primary rounded-xl py-3 px-4 text-primary font-medium text-sm outline-none transition-all shadow-sm appearance-none"
            value={kycData.employees}
            onChange={e => setKycData({...kycData, employees: e.target.value})}
          >
            <option value="" disabled>{t('Select range', 'Selecionar intervalo')}</option>
            <option>1 - 49</option>
            <option>50 - 249</option>
            <option>250 - 499</option>
            <option>500 - 999</option>
            <option>1000+</option>
          </select>
          <p className="text-xs text-on-surface-variant mt-2">{t('Full-time equivalent across all sites.', 'Equivalente a tempo inteiro em todas as instalações.')}</p>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('Annual Turnover', 'Faturação Anual')}</label>
          <select 
            className="w-full bg-white border border-outline-variant/30 focus:border-primary rounded-xl py-3 px-4 text-primary font-medium text-sm outline-none transition-all shadow-sm appearance-none"
            value={kycData.turnover}
            onChange={e => setKycData({...kycData, turnover: e.target.value})}
          >
            <option value="" disabled>{t('Select range', 'Selecionar intervalo')}</option>
            <option value="Under $10M">{t('Under $10M', 'Abaixo de 10M$')}</option>
            <option value="$10M - $50M">{t('$10M - $50M', '10M$ - 50M$')}</option>
            <option value="$50M - $250M">{t('$50M - $250M', '50M$ - 250M$')}</option>
            <option value="Over $250M">{t('Over $250M', 'Acima de 250M$')}</option>
          </select>
          <p className="text-xs text-on-surface-variant mt-2">{t('Approximate. We use this to assess regulatory thresholds.', 'Aproximado. Usamos isto para avaliar os limites regulatórios.')}</p>
        </div>
      </div>
      
      <div className="mt-10 flex justify-between">
        <button 
          onClick={() => handleNext('personal')}
          className="px-6 py-3 bg-transparent text-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-outline-variant/10 transition-all outline-none cursor-pointer"
        >
          {t('Back', 'Voltar')}
        </button>
        <button 
          onClick={() => handleNext('kyc-regulatory')}
          disabled={!kycData.name || !kycData.sector || !kycData.employees || !kycData.turnover}
          className="px-8 py-3 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:scale-[1.02] active:scale-95 transition-all outline-none cursor-pointer flex items-center gap-2"
        >
          {t('Continue', 'Continuar')} <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );

  const YesNoToggle = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
    <div className="flex rounded-xl overflow-hidden border border-outline-variant/30 bg-white shadow-sm w-full">
      <button 
        onClick={() => onChange('Yes')}
        className={`flex-1 py-3 text-sm font-bold transition-colors ${value === 'Yes' ? 'bg-primary text-white' : 'text-primary hover:bg-surface-container-low'}`}
      >
        {t('Yes', 'Sim')}
      </button>
      <div className="w-[1px] bg-outline-variant/30"></div>
      <button 
        onClick={() => onChange('No')}
        className={`flex-1 py-3 text-sm font-bold transition-colors ${value === 'No' ? 'bg-primary text-white' : 'text-primary hover:bg-surface-container-low'}`}
      >
        {t('No', 'Não')}
      </button>
    </div>
  );

  const renderKYCRegulatory = () => (
    <div className="vera-fade-up max-w-2xl mx-auto mt-12">
      <div className="mb-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline opacity-70 mb-2 block">{t('Step 3 of 6', 'Passo 3 de 6')}</span>
        <h2 className="text-4xl font-headline italic text-primary">{t('Your Regulatory Exposure', 'A Sua Exposição Regulatória')}</h2>
        <p className="text-on-surface-variant mt-2">{t('These answers determine which frameworks Vera analyzes for you.', 'Estas respostas determinam quais os frameworks que a Vera analisa para si.')}</p>
      </div>
      
      <div className="space-y-8">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('EU Parent Company', 'Empresa-Mãe na UE')}</label>
          <YesNoToggle value={kycData.euParent} onChange={(val) => setKycData({...kycData, euParent: val})} />
          <p className="text-xs text-on-surface-variant mt-2">{t("Yes if your group's ultimate parent is established in the EU. This affects whether CSRD applies.", "Sim se a empresa-mãe final do grupo for na UE. Afeta a aplicação da CSRD.")}</p>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('DFI or Development Bank Financing', 'Financiamento de Bancos de Desenvolvimento')}</label>
          <YesNoToggle value={kycData.dfi} onChange={(val) => setKycData({...kycData, dfi: val})} />
          <p className="text-xs text-on-surface-variant mt-2">{t('Yes if you have an active loan or equity investment from IFC, AfDB, EIB, BII, or similar.', 'Sim se tiver um empréstimo ou investimento da IFC, AfDB, BEI ou similar.')}</p>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('Export Markets', 'Mercados de Exportação')}</label>
          <div className="flex flex-wrap gap-2 mt-3">
            {['European Union', 'United Kingdom', 'United States', 'China', 'Other African markets', 'Domestic only'].map(market => {
              const isSelected = exportMarkets.includes(market);
              const label = market === 'European Union' ? t('European Union', 'União Europeia') : market === 'United Kingdom' ? t('United Kingdom', 'Reino Unido') : market === 'United States' ? t('United States', 'Estados Unidos') : market === 'China' ? t('China', 'China') : market === 'Other African markets' ? t('Other African markets', 'Outros mercados Africanos') : market === 'Domestic only' ? t('Domestic only', 'Apenas mercado interno') : market;
              return (
                <button
                  key={market}
                  onClick={() => toggleArrayItem(setExportMarkets, market)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${isSelected ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface-variant border-outline-variant/30 hover:border-primary/50'}`}
                >
                  {isSelected ? '✓ ' : '+ '}{label}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-on-surface-variant mt-3">{t('Where do your products or services reach end customers? Select all that apply.', 'Onde chegam os seus produtos/serviços? Selecione todos os aplicáveis.')}</p>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('Listed on a Stock Exchange', 'Cotada na Bolsa de Valores')}</label>
          <YesNoToggle value={kycData.listed} onChange={(val) => setKycData({...kycData, listed: val})} />
          <p className="text-xs text-on-surface-variant mt-2">{t("Yes if your company's shares trade on any public exchange.", "Sim se as ações da sua empresa forem negociadas em bolsa pública.")}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('Fiscal Year Start', 'Início do Ano Fiscal')}</label>
            <select 
              className="w-full bg-white border border-outline-variant/30 focus:border-primary rounded-xl py-3 px-4 text-primary font-medium text-sm outline-none transition-all shadow-sm appearance-none"
              value={kycData.fiscalYear}
              onChange={e => setKycData({...kycData, fiscalYear: e.target.value})}
            >
              <option value="January">{t('January', 'Janeiro')}</option>
              <option value="April">{t('April', 'Abril')}</option>
              <option value="July">{t('July', 'Julho')}</option>
              <option value="October">{t('October', 'Outubro')}</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('Reporting Currency', 'Moeda de Relatório')}</label>
            <select 
              className="w-full bg-white border border-outline-variant/30 focus:border-primary rounded-xl py-3 px-4 text-primary font-medium text-sm outline-none transition-all shadow-sm appearance-none"
              value={kycData.currency}
              onChange={e => setKycData({...kycData, currency: e.target.value})}
            >
              <option>AOA - Angolan Kwanza</option>
              <option>USD - US Dollar</option>
              <option>EUR - Euro</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mt-10 flex justify-between">
        <button 
          onClick={() => handleNext('kyc-company')}
          className="px-6 py-3 bg-transparent text-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-outline-variant/10 transition-all outline-none cursor-pointer"
        >
          {t('Back', 'Voltar')}
        </button>
        <button 
          onClick={() => handleNext('kyc-context')}
          disabled={!kycData.euParent || !kycData.dfi || !kycData.listed || exportMarkets.length === 0}
          className="px-8 py-3 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:scale-[1.02] active:scale-95 transition-all outline-none cursor-pointer flex items-center gap-2"
        >
          {t('Continue', 'Continuar')} <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );

  const renderKYCContext = () => (
    <div className="vera-fade-up max-w-2xl mx-auto mt-12">
      <div className="mb-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline opacity-70 mb-2 block">{t('Step 4 of 6', 'Passo 4 de 6')}</span>
        <h2 className="text-4xl font-headline italic text-primary">{t('Your ESG Context', 'O Seu Contexto ESG')}</h2>
        <p className="text-on-surface-variant mt-2">{t('Tells Vera how to position your starting point.', 'Diz à Vera como posicionar o seu ponto de partida.')}</p>
      </div>
      
      <div className="space-y-8">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('Materiality Assessment', 'Avaliação de Materialidade')}</label>
          <select 
            className="w-full bg-white border border-outline-variant/30 focus:border-primary rounded-xl py-3 px-4 text-primary font-medium text-sm outline-none transition-all shadow-sm appearance-none"
            value={kycData.materiality}
            onChange={e => setKycData({...kycData, materiality: e.target.value})}
          >
            <option value="" disabled>{t('Select...', 'Selecionar...')}</option>
            <option value="We have completed a Double Materiality Assessment">{t('We have completed a Double Materiality Assessment', 'Concluímos uma Dupla Avaliação de Materialidade')}</option>
            <option value="We have completed a Single Materiality Assessment">{t('We have completed a Single Materiality Assessment', 'Concluímos uma Avaliação de Materialidade Simples')}</option>
            <option value="We are currently conducting one">{t('We are currently conducting one', 'Estamos atualmente a realizar uma')}</option>
            <option value="We haven't done this yet">{t("We haven't done this yet", 'Ainda não o fizemos')}</option>
          </select>
          <p className="text-xs text-on-surface-variant mt-2">{t('Have you assessed which ESG topics are material to your business? This is foundational for CSRD and GRI.', 'Já avaliou quais tópicos ESG são materiais? Isto é base para CSRD e GRI.')}</p>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('Reporting History', 'Histórico de Relatórios')}</label>
          <select 
            className="w-full bg-white border border-outline-variant/30 focus:border-primary rounded-xl py-3 px-4 text-primary font-medium text-sm outline-none transition-all shadow-sm appearance-none"
            value={kycData.reportingHistory}
            onChange={e => setKycData({...kycData, reportingHistory: e.target.value})}
          >
            <option value="" disabled>{t('Select...', 'Selecionar...')}</option>
            <option value="We publish an annual ESG/Sustainability report">{t('We publish an annual ESG/Sustainability report', 'Publicamos um relatório ESG/Sustentabilidade anual')}</option>
            <option value="We report specific metrics but no formal report">{t('We report specific metrics but no formal report', 'Reportamos métricas específicas mas sem relatório formal')}</option>
            <option value="This will be our first ESG report">{t('This will be our first ESG report', 'Este será o nosso primeiro relatório ESG')}</option>
          </select>
          <p className="text-xs text-on-surface-variant mt-2">{t('Have you published a sustainability report before? Returning reporters get year-on-year comparison features.', 'Já publicou um relatório de sustentabilidade antes? Repetentes têm comparação homóloga.')}</p>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">{t('What is driving your ESG work?', 'O que motiva o seu trabalho ESG?')}</label>
          <div className="flex flex-wrap gap-2 mt-3">
            {['Investor pressure', 'Bank or lender requirements', 'Customer demands', 'Regulatory deadlines', 'Employee expectations', 'Leadership initiative', 'Reputation and brand'].map(driver => {
              const isSelected = drivers.includes(driver);
              const label = driver === 'Investor pressure' ? t('Investor pressure', 'Pressão de Investidores') : driver === 'Bank or lender requirements' ? t('Bank or lender requirements', 'Requisitos do Banco') : driver === 'Customer demands' ? t('Customer demands', 'Exigências de Clientes') : driver === 'Regulatory deadlines' ? t('Regulatory deadlines', 'Prazos Regulatórios') : driver === 'Employee expectations' ? t('Employee expectations', 'Expectativas dos Funcionários') : driver === 'Leadership initiative' ? t('Leadership initiative', 'Iniciativa da Liderança') : driver === 'Reputation and brand' ? t('Reputation and brand', 'Reputação e Marca') : driver;
              return (
                <button
                  key={driver}
                  onClick={() => toggleArrayItem(setDrivers, driver)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${isSelected ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface-variant border-outline-variant/30 hover:border-primary/50'}`}
                >
                  {isSelected ? '✓ ' : '+ '}{label}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-on-surface-variant mt-3">{t('Select all that apply. This helps Vera prioritise what matters most to you.', 'Selecione todos os aplicáveis. Ajuda a Vera a priorizar.')}</p>
        </div>
      </div>
      
      <div className="mt-10 flex justify-between">
        <button 
          onClick={() => handleNext('kyc-regulatory')}
          className="px-6 py-3 bg-transparent text-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-outline-variant/10 transition-all outline-none cursor-pointer"
        >
          {t('Back', 'Voltar')}
        </button>
        <button 
          onClick={() => handleNext('erp-select')}
          disabled={!kycData.materiality || !kycData.reportingHistory || drivers.length === 0}
          className="px-8 py-3 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:scale-[1.02] active:scale-95 transition-all outline-none cursor-pointer flex items-center gap-2"
        >
          {t('Continue to ERP', 'Continuar para o ERP')} <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );

  const renderERPSelect = () => (
    <div className="vera-fade-up max-w-3xl mx-auto mt-12">
      <div className="mb-10 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline opacity-70 mb-2 block">{t('Step 5 of 6', 'Passo 5 de 6')}</span>
        <h2 className="text-4xl font-headline italic text-primary">{t('Connect Your ERP', 'Conecte o seu ERP')}</h2>
        <p className="text-on-surface-variant mt-2 max-w-xl mx-auto">
          {t('Vera automates ESG reporting by extracting operational and financial data directly from your existing systems. Choose your ERP provider below.', 'A Vera automatiza relatórios ESG extraindo dados operacionais e financeiros dos seus sistemas atuais. Escolha o seu fornecedor de ERP abaixo.')}
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {erpOptions.map(erp => (
          <div 
            key={erp.id}
            onClick={() => setSelectedErp(erp.id)}
            className={`
              p-6 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-4 text-center
              ${selectedErp === erp.id 
                ? 'bg-primary/5 border-primary shadow-md transform scale-[1.02]' 
                : 'bg-white border-outline-variant/20 hover:border-primary/40 hover:bg-surface-container-low'}
            `}
          >
            <span className={`material-symbols-outlined text-4xl ${selectedErp === erp.id ? 'text-primary' : 'text-outline'}`}>
              {erp.icon}
            </span>
            <span className={`font-bold text-sm ${selectedErp === erp.id ? 'text-primary' : 'text-on-surface-variant'}`}>
              {erp.name}
            </span>
            {selectedErp === erp.id && (
              <div className="absolute top-3 right-3">
                <span className="material-symbols-outlined text-[18px] text-accent" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-between">
        <button 
          onClick={() => handleNext('kyc-context')}
          className="px-6 py-3 bg-transparent text-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-outline-variant/10 transition-all outline-none cursor-pointer"
        >
          {t('Back', 'Voltar')}
        </button>
        <button 
          onClick={() => handleNext('erp-sync')}
          disabled={!selectedErp}
          className="px-8 py-3 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:scale-[1.02] active:scale-95 transition-all outline-none cursor-pointer flex items-center gap-2"
        >
          {t('Authenticate & Sync', 'Autenticar e Sincronizar')} <span className="material-symbols-outlined text-[14px]">sync</span>
        </button>
      </div>
    </div>
  );

  const renderERPSync = () => {
    const activeErp = erpOptions.find(e => e.id === selectedErp);
    
    return (
      <div className="max-w-xl mx-auto mt-20 text-center">
        <div className="mb-12 relative h-32 flex items-center justify-center">
          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: '2s' }}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-primary/10 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
          </div>
          
          {/* Icons */}
          <div className="flex items-center gap-8 z-10 relative">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-outline-variant/20 relative">
              <span className="material-symbols-outlined text-3xl text-primary">{activeErp?.icon || 'database'}</span>
              <span className="absolute -bottom-6 text-[10px] font-bold uppercase tracking-widest text-primary whitespace-nowrap">
                {activeErp?.name}
              </span>
            </div>
            <div className="flex flex-col gap-1.5 items-center">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '200ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '400ms' }}></div>
            </div>
            <div className="w-16 h-16 bg-primary-container rounded-2xl shadow-md flex items-center justify-center text-white relative">
              <span className="font-headline italic text-2xl">V</span>
              <span className="absolute -bottom-6 text-[10px] font-bold uppercase tracking-widest text-primary">
                Vera
              </span>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-headline italic text-primary mb-4 mt-8">{t('Syncing Enterprise Data', 'Sincronizando Dados Empresariais')}</h2>
        <p className="text-on-surface-variant mb-8">
          {t(`Securely extracting operations, HR, and utility records from ${activeErp?.name} to build your ESG baseline.`, `Extraindo de forma segura operações, RH e registos de utilidades do ${activeErp?.name} para construir a base ESG.`)}
        </p>
        
        <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${erpProgress}%` }}
          ></div>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
          {erpProgress < 20 ? t('Authenticating API...', 'Autenticando API...') : 
           erpProgress < 40 ? t('Fetching organizational structure...', 'Obtendo estrutura organizacional...') : 
           erpProgress < 70 ? t('Ingesting HR & payroll records...', 'Ingerindo registos de RH e salários...') : 
           erpProgress < 90 ? t('Parsing utility and vendor invoices...', 'Analisando faturas de fornecedores...') : t('Finalizing baseline mappings...', 'Finalizando mapeamentos da base...')} 
          ({erpProgress}%)
        </p>
      </div>
    );
  };

  const renderAIFrameworks = () => (
    <div className="vera-fade-up max-w-3xl mx-auto mt-12">
      <div className="mb-10 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline opacity-70 mb-2 block">{t('Step 6 of 6', 'Passo 6 de 6')}</span>
        <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-2xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        </div>
        <h2 className="text-4xl font-headline italic text-primary">{t('Vera AI Analysis', 'Análise Vera AI')}</h2>
        <p className="text-on-surface-variant mt-3 max-w-xl mx-auto">
          {t(`We've analyzed your ${kycData.sector || 'industry'} profile and the preliminary data mapped from ${erpOptions.find(e => e.id === selectedErp)?.name} to determine your reporting obligations.`, `Analisámos o perfil da sua indústria (${kycData.sector || 'indústria'}) e os dados preliminares do ${erpOptions.find(e => e.id === selectedErp)?.name} para determinar as obrigações.`)}
        </p>
      </div>

      {aiAnalyzing ? (
        <div className="bg-white rounded-3xl p-12 border border-outline-variant/20 shadow-sm flex flex-col items-center justify-center space-y-6">
          <div className="w-8 h-8 border-3 border-outline-variant/30 border-t-accent rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-primary animate-pulse">{t('Cross-referencing global standards and extracting metrics...', 'Cruzando padrões globais e extraindo métricas...')}</p>
        </div>
      ) : (
        <div className="vera-fade-up">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border-l-4 border-l-accent border-y border-r border-outline-variant/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <span className="material-symbols-outlined text-8xl">account_balance</span>
              </div>
              <span className="inline-block px-3 py-1 bg-accent/10 text-primary text-[9px] font-bold uppercase tracking-widest rounded-full mb-4">{t('Mandatory', 'Obrigatório')}</span>
              <h3 className="text-xl font-bold text-primary mb-2">CSRD</h3>
              <p className="text-sm text-on-surface-variant mb-4">{t('Required due to your projected revenue size and EU market exposure context.', 'Obrigatório devido ao tamanho da sua faturação projetada e exposição ao mercado da UE.')}</p>
              <div className="flex items-center gap-2 text-xs text-primary font-medium">
                <span className="material-symbols-outlined text-[16px] text-accent">check_circle</span> {t('Industry match:', 'Correspondência de indústria:')} {kycData.sector || 'Manufacturing'}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border-l-4 border-l-primary border-y border-r border-outline-variant/20 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                 <span className="material-symbols-outlined text-8xl">language</span>
              </div>
              <span className="inline-block px-3 py-1 bg-surface-container-high text-primary text-[9px] font-bold uppercase tracking-widest rounded-full mb-4">{t('Recommended', 'Recomendado')}</span>
              <h3 className="text-xl font-bold text-primary mb-2">GRI</h3>
              <p className="text-sm text-on-surface-variant mb-4">{t(`Global best practice. Excellent for establishing a robust baseline in ${kycData.country || 'your region'}.`, `Melhor prática global. Excelente para estabelecer uma base robusta em ${kycData.country || 'sua região'}.`)}</p>
              <div className="flex items-center gap-2 text-xs text-primary font-medium">
                <span className="material-symbols-outlined text-[16px] text-primary/60">add_task</span> {t('Voluntary but high impact', 'Voluntário mas de alto impacto')}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <p className="text-sm text-primary max-w-lg">
              <span className="font-bold">{t('Recommendation:', 'Recomendação:')}</span> {t('We will configure your workspace to collect data compatible with both CSRD and GRI simultaneously.', 'Vamos configurar o seu espaço para recolher dados compatíveis com a CSRD e GRI em simultâneo.')}
            </p>
            <button 
              onClick={() => handleNext('done')}
              className="px-6 py-2.5 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all outline-none cursor-pointer"
            >
              {t('Continue', 'Continuar')}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderDone = () => (
    <div className="vera-fade-up max-w-xl mx-auto text-center space-y-8 mt-24">
      <div className="w-24 h-24 bg-accent/20 rounded-full mx-auto flex items-center justify-center mb-6 relative">
        <div className="absolute inset-0 border-4 border-accent rounded-full vera-ring" style={{ '--ring-target': '100' } as any}></div>
        <span className="material-symbols-outlined text-5xl text-primary">done</span>
      </div>
      <h1 className="text-4xl font-headline italic text-primary">You're All Set, {personalData.firstName}</h1>
      <p className="text-on-surface-variant text-lg">
        {kycData.name || 'Your organization'} is now configured for {kycData.sector || 'your sector'}. We've established baseline metrics from {erpOptions.find(e => e.id === selectedErp)?.name} and prioritized your tasks.
      </p>
      <div className="pt-6">
        <button 
          onClick={completeOnboarding}
          className="px-8 py-4 bg-primary text-white rounded-full text-sm font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all outline-none cursor-pointer shadow-lg shadow-primary/20"
        >
          {t('Enter Dashboard', 'Entrar no Dashboard')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      {/* Header */}
      <header className="px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-headline text-2xl italic tracking-tight text-primary">Vera</span>
        </div>
        {step !== 'welcome' && step !== 'done' && step !== 'erp-sync' && (
           <button onClick={() => navigate('/')} className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors cursor-pointer outline-none">
             {t('Skip Setup', 'Ignorar Configuração')}
           </button>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 pb-20">
        {step === 'language' && renderLanguage()}
        {step === 'welcome' && renderWelcome()}
        {step === 'personal' && renderPersonal()}
        {step === 'kyc-company' && renderKYCCompany()}
        {step === 'kyc-regulatory' && renderKYCRegulatory()}
        {step === 'kyc-context' && renderKYCContext()}
        {step === 'erp-select' && renderERPSelect()}
        {step === 'erp-sync' && renderERPSync()}
        {step === 'ai-frameworks' && renderAIFrameworks()}
        {step === 'done' && renderDone()}
      </main>
    </div>
  );
};
