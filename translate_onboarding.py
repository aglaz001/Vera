import os

filepath = 'src/pages/Onboarding.tsx'
with open(filepath, 'r') as f:
    code = f.read()

# Emojis and function
code = code.replace("const navigate = useNavigate();", "const navigate = useNavigate();\n  const t = (en: string, pt: string) => personalData.language === 'pt' ? pt : en;")
code = code.replace("🇺🇸 English", "English")
code = code.replace("🇵🇹 Português", "Português")

# Header
code = code.replace("'Skip Setup'", "t('Skip Setup', 'Ignorar Configuração')")
code = code.replace(">\\n             Skip Setup", ">\\n             {t('Skip Setup', 'Ignorar Configuração')}")
code = code.replace(">\\n             {t('Skip Setup', 'Ignorar Configuração')} Setup", ">\\n             {t('Skip Setup', 'Ignorar Configuração')}")

# Welcome
code = code.replace(">Welcome to Vera<", ">{t('Welcome to Vera', 'Bem-vindo à Vera')}<")
code = code.replace(
    ">\\n        ESG reporting tailored for companies that actually make things. Let's personalize your workspace to establish an accurate, automated reporting baseline.\\n      </p>",
    ">\\n        {t(\\"ESG reporting tailored for companies that actually make things. Let's personalize your workspace to establish an accurate, automated reporting baseline.\\", \\"Relatórios ESG adaptados para empresas que realmente produzem. Vamos personalizar o seu espaço para estabelecer uma base automatizada e precisa.\\")}\\n      </p>"
)
code = code.replace(">\\n          Begin Setup\\n        </button>", ">\\n          {t('Begin Setup', 'Iniciar Configuração')}\\n        </button>")

# Personal
code = code.replace(">About You<", ">{t('About You', 'Sobre Si')}<")
code = code.replace(">How should we address you in notifications and reports?<", ">{t('How should we address you in notifications and reports?', 'Como devemos tratá-lo nas notificações e relatórios?')}<")
code = code.replace(">First Name<", ">{t('First Name', 'Nome')}<")
code = code.replace('placeholder="e.g. Carlos"', 'placeholder={t(\\'e.g. Carlos\\', \\'ex: Carlos\\')}')
code = code.replace(">Last Name<", ">{t('Last Name', 'Apelido')}<")
code = code.replace('placeholder="e.g. Andrade"', 'placeholder={t(\\'e.g. Andrade\\', \\'ex: Andrade\\')}')
code = code.replace(">Your Role<", ">{t('Your Role', 'O Seu Cargo')}<")
code = code.replace('placeholder="e.g. ESG Manager, CFO, HR Director"', 'placeholder={t(\\'e.g. ESG Manager, CFO, HR Director\\', \\'ex: Gestor ESG, Diretor Financeiro\\')}')

# KYC Company
code = code.replace(">About Your Company<", ">{t('About Your Company', 'Sobre a Sua Empresa')}<")
code = code.replace(">Vera uses this to figure out which frameworks apply to you and what regulators expect.<", ">{t('Vera uses this to figure out which frameworks apply to you and what regulators expect.', 'A Vera usa isto para descobrir quais frameworks se aplicam a si e o que os reguladores esperam.')}<")
code = code.replace(">Company Name<", ">{t('Company Name', 'Nome da Empresa')}<")
code = code.replace('placeholder="e.g., Mabor Industrial, S.A."', 'placeholder={t(\\'e.g., Mabor Industrial, S.A.\\', \\'ex: Mabor Industrial, S.A.\\')}')
code = code.replace(">The legal entity name as it appears on official documents.<", ">{t('The legal entity name as it appears on official documents.', 'O nome da entidade legal conforme consta nos documentos oficiais.')}<")
code = code.replace(">Sector<", ">{t('Sector', 'Setor')}<")
code = code.replace(">Choose the closest match. You can refine sub-activities later.<", ">{t('Choose the closest match. You can refine sub-activities later.', 'Escolha a correspondência mais próxima. Poderá refinar as atividades mais tarde.')}<")
code = code.replace(">Select sector<", ">{t('Select sector', 'Selecione o setor')}<")
code = code.replace(">Country of Headquarters<", ">{t('Country of Headquarters', 'País Sede')}<")
code = code.replace(">We default to your detected country. Change it if your headquarters is elsewhere.<", ">{t('We default to your detected country. Change it if your headquarters is elsewhere.', 'Usamos o seu país detetado por defeito. Altere-o se a sede for noutro local.')}<")
code = code.replace(">Employees<", ">{t('Employees', 'Empregados')}<")
code = code.replace(">Select range<", ">{t('Select range', 'Selecionar intervalo')}<")
code = code.replace(">Full-time equivalent across all sites.<", ">{t('Full-time equivalent across all sites.', 'Equivalente a tempo inteiro em todas as instalações.')}<")
code = code.replace(">Annual Turnover<", ">{t('Annual Turnover', 'Faturação Anual')}<")
code = code.replace(">Approximate. We use this to assess regulatory thresholds.<", ">{t('Approximate. We use this to assess regulatory thresholds.', 'Aproximado. Usamos isto para avaliar os limites regulatórios.')}<")

# Options replacing
options_map = {
    "Manufacturing": "Manufatura",
    "Mining & Resources": "Mineração e Recursos",
    "Agriculture": "Agricultura",
    "Logistics & Transport": "Logística e Transportes",
    "Energy": "Energia",
    "Technology & Services": "Tecnologia e Serviços",
    "Portugal": "Portugal",
    "South Africa": "África do Sul",
    "Brazil": "Brasil",
    "United Kingdom": "Reino Unido",
    "Under $10M": "Abaixo de 10M$",
    "$10M - $50M": "10M$ - 50M$",
    "$50M - $250M": "50M$ - 250M$",
    "Over $250M": "Acima de 250M$",
    "January": "Janeiro",
    "April": "Abril",
    "July": "Julho",
    "October": "Outubro",
    "We have completed a Double Materiality Assessment": "Concluímos uma Dupla Avaliação de Materialidade",
    "We have completed a Single Materiality Assessment": "Concluímos uma Avaliação de Materialidade Simples",
    "We are currently conducting one": "Estamos atualmente a realizar uma",
    "We haven\\'t done this yet": "Ainda não o fizemos",
    "We publish an annual ESG/Sustainability report": "Publicamos um relatório ESG/Sustentabilidade anual",
    "We report specific metrics but no formal report": "Reportamos métricas específicas mas sem relatório formal",
    "This will be our first ESG report": "Este será o nosso primeiro relatório ESG"
}
for en, pt in options_map.items():
    code = code.replace(f"<option>{en}</option>", f"<option value=\\"{en}\\">{{t('{en}', '{pt}')}}</option>")
code = code.replace("<option>We haven't done this yet</option>", f"<option value=\\"We haven't done this yet\\">{{t(\\"We haven't done this yet\\", 'Ainda não o fizemos')}}</option>")

# KYC Regulatory
code = code.replace(">Your Regulatory Exposure<", ">{t('Your Regulatory Exposure', 'A Sua Exposição Regulatória')}<")
code = code.replace(">These answers determine which frameworks Vera analyzes for you.<", ">{t('These answers determine which frameworks Vera analyzes for you.', 'Estas respostas determinam quais os frameworks que a Vera analisa para si.')}<")
code = code.replace(">EU Parent Company<", ">{t('EU Parent Company', 'Empresa-Mãe na UE')}<")
code = code.replace(">Yes if your group's ultimate parent is established in the EU. This affects whether CSRD applies.<", ">{t(\\"Yes if your group's ultimate parent is established in the EU. This affects whether CSRD applies.\\", \\"Sim se a empresa-mãe final do grupo for na UE. Afeta a aplicação da CSRD.\\")}<")
code = code.replace(">DFI or Development Bank Financing<", ">{t('DFI or Development Bank Financing', 'Financiamento de Bancos de Desenvolvimento (DFI)')}<")
code = code.replace(">Yes if you have an active loan or equity investment from IFC, AfDB, EIB, BII, or similar.<", ">{t('Yes if you have an active loan or equity investment from IFC, AfDB, EIB, BII, or similar.', 'Sim se tiver um empréstimo ou investimento da IFC, AfDB, BEI ou similar.')}<")
code = code.replace(">Export Markets<", ">{t('Export Markets', 'Mercados de Exportação')}<")
code = code.replace(">Where do your products or services reach end customers? Select all that apply.<", ">{t('Where do your products or services reach end customers? Select all that apply.', 'Onde chegam os seus produtos/serviços? Selecione todos os aplicáveis.')}<")
code = code.replace(">Listed on a Stock Exchange<", ">{t('Listed on a Stock Exchange', 'Cotada na Bolsa de Valores')}<")
code = code.replace(">Yes if your company's shares trade on any public exchange.<", ">{t(\\"Yes if your company's shares trade on any public exchange.\\", \\"Sim se as ações da sua empresa forem negociadas em bolsa pública.\\")}<")
code = code.replace(">Fiscal Year Start<", ">{t('Fiscal Year Start', 'Início do Ano Fiscal')}<")
code = code.replace(">Reporting Currency<", ">{t('Reporting Currency', 'Moeda de Relatório')}<")

code = code.replace("{market}", "{market === 'European Union' ? t('European Union', 'União Europeia') : market === 'United Kingdom' ? t('United Kingdom', 'Reino Unido') : market === 'United States' ? t('United States', 'Estados Unidos') : market === 'China' ? t('China', 'China') : market === 'Other African markets' ? t('Other African markets', 'Outros mercados Africanos') : market === 'Domestic only' ? t('Domestic only', 'Apenas mercado interno') : market}")

# KYC Context
code = code.replace(">Your ESG Context<", ">{t('Your ESG Context', 'O Seu Contexto ESG')}<")
code = code.replace(">Tells Vera how to position your starting point.<", ">{t('Tells Vera how to position your starting point.', 'Diz à Vera como posicionar o seu ponto de partida.')}<")
code = code.replace(">Materiality Assessment<", ">{t('Materiality Assessment', 'Avaliação de Materialidade')}<")
code = code.replace(">Select...<", ">{t('Select...', 'Selecionar...')}<")
code = code.replace(">Have you assessed which ESG topics are material to your business? This is foundational for CSRD and GRI.<", ">{t('Have you assessed which ESG topics are material to your business? This is foundational for CSRD and GRI.', 'Já avaliou quais tópicos ESG são materiais? Isto é base para CSRD e GRI.')}<")
code = code.replace(">Reporting History<", ">{t('Reporting History', 'Histórico de Relatórios')}<")
code = code.replace(">Have you published a sustainability report before? Returning reporters get year-on-year comparison features.<", ">{t('Have you published a sustainability report before? Returning reporters get year-on-year comparison features.', 'Já publicou um relatório de sustentabilidade antes? Repetentes têm comparação homóloga.')}<")
code = code.replace(">What is driving your ESG work?<", ">{t('What is driving your ESG work?', 'O que motiva o seu trabalho ESG?')}<")
code = code.replace(">Select all that apply. This helps Vera prioritise what matters most to you.<", ">{t('Select all that apply. This helps Vera prioritise what matters most to you.', 'Selecione todos os aplicáveis. Ajuda a Vera a priorizar.')}<")

code = code.replace("{driver}", "{driver === 'Investor pressure' ? t('Investor pressure', 'Pressão de Investidores') : driver === 'Bank or lender requirements' ? t('Bank or lender requirements', 'Requisitos do Banco') : driver === 'Customer demands' ? t('Customer demands', 'Exigências de Clientes') : driver === 'Regulatory deadlines' ? t('Regulatory deadlines', 'Prazos Regulatórios') : driver === 'Employee expectations' ? t('Employee expectations', 'Expectativas dos Funcionários') : driver === 'Leadership initiative' ? t('Leadership initiative', 'Iniciativa da Liderança') : driver === 'Reputation and brand' ? t('Reputation and brand', 'Reputação e Marca') : driver}")

# ERP Select
code = code.replace(">Connect Your ERP<", ">{t('Connect Your ERP', 'Conecte o seu ERP')}<")
code = code.replace(">\\n          Vera automates ESG reporting by extracting operational and financial data directly from your existing systems. Choose your ERP provider below.\\n        </p>", ">\\n          {t('Vera automates ESG reporting by extracting operational and financial data directly from your existing systems. Choose your ERP provider below.', 'A Vera automatiza relatórios ESG extraindo dados operacionais e financeiros dos seus sistemas atuais. Escolha o seu fornecedor de ERP abaixo.')}\\n        </p>")

# ERP Sync
code = code.replace(">Syncing Enterprise Data<", ">{t('Syncing Enterprise Data', 'Sincronizando Dados Empresariais')}<")
code = code.replace(">\\n          Securely extracting operations, HR, and utility records from {activeErp?.name} to build your ESG baseline.\\n        </p>", ">\\n          {t(`Securely extracting operations, HR, and utility records from ${activeErp?.name} to build your ESG baseline.`, `Extraindo de forma segura operações, RH e registos de utilidades do ${activeErp?.name} para construir a base ESG.`)}\\n        </p>")
code = code.replace("{erpProgress < 20 ? 'Authenticating API...' : \\n           erpProgress < 40 ? 'Fetching organizational structure...' : \\n           erpProgress < 70 ? 'Ingesting HR & payroll records...' : \\n           erpProgress < 90 ? 'Parsing utility and vendor invoices...' : 'Finalizing baseline mappings...'}", "{erpProgress < 20 ? t('Authenticating API...', 'Autenticando API...') : \\n           erpProgress < 40 ? t('Fetching organizational structure...', 'Obtendo estrutura organizacional...') : \\n           erpProgress < 70 ? t('Ingesting HR & payroll records...', 'Ingerindo registos de RH e salários...') : \\n           erpProgress < 90 ? t('Parsing utility and vendor invoices...', 'Analisando faturas de fornecedores...') : t('Finalizing baseline mappings...', 'Finalizando mapeamentos da base...')}")

# AI Frameworks
code = code.replace(">Vera AI Analysis<", ">{t('Vera AI Analysis', 'Análise Vera AI')}<")
code = code.replace(">\\n          We've analyzed your {kycData.sector || 'industry'} profile and the preliminary data mapped from {erpOptions.find(e => e.id === selectedErp)?.name} to determine your reporting obligations.\\n        </p>", ">\\n          {t(`We've analyzed your ${kycData.sector || 'industry'} profile and the preliminary data mapped from ${erpOptions.find(e => e.id === selectedErp)?.name} to determine your reporting obligations.`, `Analisámos o perfil da sua indústria (${kycData.sector || 'indústria'}) e os dados preliminares do ${erpOptions.find(e => e.id === selectedErp)?.name} para determinar as obrigações.`)}\\n        </p>")
code = code.replace(">Cross-referencing global standards and extracting metrics...<", ">{t('Cross-referencing global standards and extracting metrics...', 'Cruzando padrões globais e extraindo métricas...')}<")
code = code.replace(">Mandatory<", ">{t('Mandatory', 'Obrigatório')}<")
code = code.replace(">Recommended<", ">{t('Recommended', 'Recomendado')}<")
code = code.replace(">Required due to your projected revenue size and EU market exposure context.<", ">{t('Required due to your projected revenue size and EU market exposure context.', 'Obrigatório devido ao tamanho da sua faturação projetada e exposição ao mercado da UE.')}<")
code = code.replace("Industry match:", "{t('Industry match:', 'Correspondência de indústria:')}")
code = code.replace("Voluntary but high impact", "{t('Voluntary but high impact', 'Voluntário mas de alto impacto')}")
code = code.replace("Recommendation:", "{t('Recommendation:', 'Recomendação:')}")
code = code.replace("We will configure your workspace to collect data compatible with both CSRD and GRI simultaneously.", "{t('We will configure your workspace to collect data compatible with both CSRD and GRI simultaneously.', 'Vamos configurar o seu espaço para recolher dados compatíveis com a CSRD e GRI em simultâneo.')}")
code = code.replace("Global best practice. Excellent for establishing a robust baseline in {kycData.country || 'your region'}.", "{t(`Global best practice. Excellent for establishing a robust baseline in ${kycData.country || 'your region'}.`, `Melhor prática global. Excelente para estabelecer uma base robusta em ${kycData.country || 'sua região'}.`)}")

# Done
code = code.replace("You're All Set, {personalData.firstName}", "{t(\\"You're All Set\\", \\"Tudo Pronto\\")}, {personalData.firstName}")
code = code.replace(
    "{kycData.name || 'Your organization'} is now configured for {kycData.sector || 'your sector'}. We've established baseline metrics from {erpOptions.find(e => e.id === selectedErp)?.name} and prioritized your tasks.",
    "{t(`${kycData.name || 'Your organization'} is now configured for ${kycData.sector || 'your sector'}. We've established baseline metrics from ${erpOptions.find(e => e.id === selectedErp)?.name} and prioritized your tasks.`, `${kycData.name || 'A sua organização'} está configurada para o setor de ${kycData.sector || 'seu setor'}. Estabelecemos métricas base a partir do ${erpOptions.find(e => e.id === selectedErp)?.name} e priorizámos tarefas.`)}"
)

# Common buttons
code = code.replace(">\\n          Back\\n        </button>", ">\\n          {t('Back', 'Voltar')}\\n        </button>")
code = code.replace(">\\n          Continue <span", ">\\n          {t('Continue', 'Continuar')} <span")
code = code.replace(">\\n          Continue to ERP <span", ">\\n          {t('Continue to ERP', 'Continuar para o ERP')} <span")
code = code.replace(">\\n          Authenticate & Sync <span", ">\\n          {t('Authenticate & Sync', 'Autenticar e Sincronizar')} <span")
code = code.replace(">\\n              Continue\\n            </button>", ">\\n              {t('Continue', 'Continuar')}\\n            </button>")
code = code.replace(">\\n          Enter Dashboard\\n        </button>", ">\\n          {t('Enter Dashboard', 'Entrar no Dashboard')}\\n        </button>")

# Steps
for i in range(1, 7):
    code = code.replace(f">Step {i} of 6<", f">{{t('Step {i} of 6', 'Passo {i} de 6')}}")

# Yes/No
code = code.replace(">\\n        Yes\\n      </button>", ">\\n        {t('Yes', 'Sim')}\\n      </button>")
code = code.replace(">\\n        No\\n      </button>", ">\\n        {t('No', 'Não')}\\n      </button>")

with open(filepath, 'w') as f:
    f.write(code)
print("Done")
