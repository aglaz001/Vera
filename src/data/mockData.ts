// ─── Vera by Compass · Mock Data ─────────────────────────────────────────────
// Demo Company: Mabor Industrial, S.A. — Manufacturing — Luanda, Angola
// User: Carlos Andrade, ESG Manager

export const company = {
  name: 'Mabor Industrial, S.A.',
  sector: 'Manufacturing',
  location: 'Luanda, Angola',
  employees: 342,
  revenue: 'USD 28.4M',
  fiscalYear: 'FY 2025',
  reportingPeriod: 'Jan – Dec 2024',
};

export const user = {
  name: 'Carlos Andrade',
  role: 'ESG Manager',
  email: 'c.andrade@maborindustrial.co.ao',
  initials: 'CA',
};

export const team = [
  { name: 'Carlos Andrade', role: 'Admin', email: 'c.andrade@maborindustrial.co.ao', initials: 'CA', status: 'active' as const },
  { name: 'Ana Sousa', role: 'Contributor', email: 'a.sousa@maborindustrial.co.ao', initials: 'AS', status: 'active' as const },
  { name: 'Pedro Mendes', role: 'Viewer', email: 'p.mendes@maborindustrial.co.ao', initials: 'PM', status: 'pending' as const },
];

// ─── Dashboard ───────────────────────────────────────────────────────────────

export const dashboardKPIs = {
  esgReadiness: 64,
  environment: 58,
  social: 72,
  governance: 68,
  costSavingsVsTarget: 41,
};

export const emissionsTrend = [
  { month: 'Jan', scope1: 120, scope2: 85, benchmark: 180 },
  { month: 'Feb', scope1: 115, scope2: 82, benchmark: 178 },
  { month: 'Mar', scope1: 118, scope2: 80, benchmark: 175 },
  { month: 'Apr', scope1: 110, scope2: 78, benchmark: 172 },
  { month: 'May', scope1: 105, scope2: 75, benchmark: 170 },
  { month: 'Jun', scope1: 108, scope2: 74, benchmark: 168 },
  { month: 'Jul', scope1: 102, scope2: 72, benchmark: 165 },
  { month: 'Aug', scope1: 98, scope2: 70, benchmark: 163 },
  { month: 'Sep', scope1: 95, scope2: 68, benchmark: 160 },
  { month: 'Oct', scope1: 92, scope2: 66, benchmark: 158 },
  { month: 'Nov', scope1: 90, scope2: 65, benchmark: 155 },
  { month: 'Dec', scope1: 88, scope2: 63, benchmark: 152 },
];

export const frameworkReadiness = [
  { name: 'CSRD', progress: 38, deadline: '2025-12-31', status: 'in-progress' as const },
  { name: 'GRI', progress: 52, deadline: '2025-09-30', status: 'in-progress' as const },
  { name: 'CBAM', progress: 25, deadline: '2026-01-31', status: 'not-started' as const },
];

export const deadlines = [
  { framework: 'GRI', obligation: 'Annual Sustainability Report', deadline: '2025-09-30', urgency: 'high' as const, owner: 'Carlos Andrade' },
  { framework: 'CSRD', obligation: 'ESRS E1 Climate Disclosure', deadline: '2025-12-31', urgency: 'medium' as const, owner: 'Ana Sousa' },
  { framework: 'CBAM', obligation: 'Quarterly CBAM Report', deadline: '2025-06-30', urgency: 'critical' as const, owner: 'Carlos Andrade' },
  { framework: 'GRI', obligation: 'Scope 3 Emissions Inventory', deadline: '2025-08-15', urgency: 'high' as const, owner: 'Pedro Mendes' },
  { framework: 'CSRD', obligation: 'Double Materiality Assessment', deadline: '2025-11-15', urgency: 'medium' as const, owner: 'Ana Sousa' },
];

export const doNextTasks = [
  { id: '1', title: 'Complete Scope 3 emissions inventory', framework: 'GRI', priority: 'high' as const, icon: 'cloud' },
  { id: '2', title: 'Upload Q1 electricity invoices', framework: 'CSRD', priority: 'high' as const, icon: 'upload_file' },
  { id: '3', title: 'Review board independence metrics', framework: 'GRI', priority: 'medium' as const, icon: 'groups' },
  { id: '4', title: 'Submit CBAM quarterly declaration', framework: 'CBAM', priority: 'critical' as const, icon: 'assignment' },
  { id: '5', title: 'Update waste management policy', framework: 'GRI', priority: 'medium' as const, icon: 'delete_sweep' },
];

export const activityFeed = [
  { id: '1', action: 'Uploaded electricity invoice for Q4 2024', user: 'Ana Sousa', time: '2 hours ago', icon: 'upload_file', type: 'data' as const },
  { id: '2', action: 'Updated Scope 1 emissions — diesel generators', user: 'Carlos Andrade', time: '4 hours ago', icon: 'edit', type: 'update' as const },
  { id: '3', action: 'CBAM framework marked as applicable', user: 'Vera AI', time: '1 day ago', icon: 'auto_awesome', type: 'ai' as const },
  { id: '4', action: 'Board composition data verified', user: 'Carlos Andrade', time: '1 day ago', icon: 'verified', type: 'verification' as const },
  { id: '5', action: 'Water consumption report generated', user: 'Ana Sousa', time: '2 days ago', icon: 'description', type: 'report' as const },
  { id: '6', action: 'Safety incident logged — minor, resolved', user: 'Pedro Mendes', time: '3 days ago', icon: 'health_and_safety', type: 'incident' as const },
];

// ─── Environment ─────────────────────────────────────────────────────────────

export const emissionsSources = [
  { source: 'Diesel Generators', scope: 1 as const, quantity: 45000, unit: 'litres', factor: 2.68, co2: 120.6, evidence: 'fuel_purchase_records_2024.pdf', completeness: 100 },
  { source: 'Company Vehicles', scope: 1 as const, quantity: 18000, unit: 'litres', factor: 2.31, co2: 41.6, evidence: 'fleet_log_2024.xlsx', completeness: 100 },
  { source: 'Grid Electricity', scope: 2 as const, quantity: 820000, unit: 'kWh', factor: 0.42, co2: 344.4, evidence: 'utility_bills_2024.pdf', completeness: 85 },
  { source: 'Raw Material Transport', scope: 3 as const, quantity: 0, unit: 'tkm', factor: 0.062, co2: 0, evidence: '', completeness: 0 },
  { source: 'Employee Commuting', scope: 3 as const, quantity: 0, unit: 'km', factor: 0.17, co2: 0, evidence: '', completeness: 0 },
];

export const energyData = [
  { facility: 'Main Factory', consumption: 520000, unit: 'kWh', intensity: 142.5, source: 'Grid + Diesel', renewablePercent: 0 },
  { facility: 'Warehouse A', consumption: 180000, unit: 'kWh', intensity: 98.2, source: 'Grid', renewablePercent: 0 },
  { facility: 'Admin Building', consumption: 120000, unit: 'kWh', intensity: 45.3, source: 'Grid', renewablePercent: 15 },
];

export const waterData = [
  { facility: 'Main Factory', consumption: 12500, unit: 'm³', intensity: 3.42, source: 'Municipal + Borehole' },
  { facility: 'Warehouse A', consumption: 2800, unit: 'm³', intensity: 1.53, source: 'Municipal' },
  { facility: 'Admin Building', consumption: 1200, unit: 'm³', intensity: 0.45, source: 'Municipal' },
];

export const wasteData = [
  { category: 'Metal Scrap', quantity: 285, unit: 'tonnes', method: 'Recycled', hazardous: false, rate: 92 },
  { category: 'Packaging Waste', quantity: 120, unit: 'tonnes', method: 'Recycled', hazardous: false, rate: 78 },
  { category: 'Chemical Waste', quantity: 18, unit: 'tonnes', method: 'Licensed Disposal', hazardous: true, rate: 100 },
  { category: 'General Waste', quantity: 95, unit: 'tonnes', method: 'Landfill', hazardous: false, rate: 0 },
];

// ─── Social ──────────────────────────────────────────────────────────────────

export const workforceMetrics = {
  totalEmployees: 342,
  fullTime: 298,
  partTime: 24,
  contractors: 20,
  malePercent: 72,
  femalePercent: 28,
  avgSalary: 'AOA 385,000',
  turnoverRate: 11.2,
  trainingHours: 18.5,
  avgAge: 34,
};

export const safetyMetrics = {
  totalIncidents: 8,
  lostTimeInjuries: 2,
  nearMisses: 14,
  fatalities: 0,
  lostDays: 22,
  safetyTrainingCompletion: 89,
  lastAuditDate: '2024-11-15',
  incidentRate: 2.34,
};

export const communityInvestments = [
  { project: 'Local School Renovation', amount: 45000, currency: 'USD', status: 'completed' as const, beneficiaries: 320 },
  { project: 'Clean Water Initiative', amount: 28000, currency: 'USD', status: 'in-progress' as const, beneficiaries: 1200 },
  { project: 'Youth Skills Training', amount: 15000, currency: 'USD', status: 'planned' as const, beneficiaries: 50 },
];

export const supplyChainRisks = [
  { supplier: 'MetalCorp Angola', category: 'Raw Materials', riskLevel: 'low' as const, lastAudit: '2024-08-20', issues: 0 },
  { supplier: 'Luanda Logistics', category: 'Transport', riskLevel: 'medium' as const, lastAudit: '2024-06-15', issues: 2 },
  { supplier: 'ChemSupply Ltd', category: 'Chemicals', riskLevel: 'high' as const, lastAudit: '2024-03-10', issues: 4 },
];

// ─── Governance ──────────────────────────────────────────────────────────────

export const boardComposition = [
  { name: 'Maria Fernandes', role: 'Chairperson', independent: true, tenure: 5, committees: ['Audit', 'ESG'] },
  { name: 'João Silva', role: 'CEO', independent: false, tenure: 8, committees: [] },
  { name: 'Luísa Mendes', role: 'Non-Executive Director', independent: true, tenure: 3, committees: ['Risk', 'ESG'] },
  { name: 'António Pereira', role: 'CFO', independent: false, tenure: 6, committees: ['Audit'] },
  { name: 'Beatriz Costa', role: 'Non-Executive Director', independent: true, tenure: 2, committees: ['Audit', 'Risk'] },
];

export const policies = [
  { name: 'Anti-Corruption Policy', status: 'approved' as const, lastReview: '2024-06-15', nextReview: '2025-06-15', owner: 'Legal' },
  { name: 'Environmental Management Policy', status: 'under-review' as const, lastReview: '2023-12-01', nextReview: '2025-01-01', owner: 'ESG' },
  { name: 'Human Rights Policy', status: 'draft' as const, lastReview: '', nextReview: '2025-03-01', owner: 'HR' },
  { name: 'Whistleblower Policy', status: 'approved' as const, lastReview: '2024-09-10', nextReview: '2025-09-10', owner: 'Legal' },
  { name: 'Data Privacy Policy', status: 'approved' as const, lastReview: '2024-04-20', nextReview: '2025-04-20', owner: 'IT' },
];

export const risks = [
  { risk: 'Regulatory non-compliance (CBAM)', likelihood: 'high' as const, impact: 'high' as const, mitigation: 'CBAM reporting process underway', owner: 'Carlos Andrade' },
  { risk: 'Supply chain disruption', likelihood: 'medium' as const, impact: 'high' as const, mitigation: 'Diversification strategy in place', owner: 'Operations' },
  { risk: 'Water scarcity impact', likelihood: 'medium' as const, impact: 'medium' as const, mitigation: 'Borehole backup + efficiency program', owner: 'Facilities' },
  { risk: 'Workplace safety incident', likelihood: 'low' as const, impact: 'high' as const, mitigation: 'Safety training program active', owner: 'HR' },
];

// ─── Strategy ────────────────────────────────────────────────────────────────

export const roadmapTargets = [
  { pillar: 'E' as const, target: 'Reduce Scope 1+2 emissions by 20%', baseline: '506 tCO2e', targetValue: '405 tCO2e', deadline: '2026-12-31', progress: 32 },
  { pillar: 'E' as const, target: 'Achieve 25% renewable energy', baseline: '0%', targetValue: '25%', deadline: '2027-06-30', progress: 5 },
  { pillar: 'S' as const, target: 'Reduce turnover below 8%', baseline: '11.2%', targetValue: '8%', deadline: '2026-06-30', progress: 28 },
  { pillar: 'S' as const, target: 'Zero fatalities, <5 LTI/year', baseline: '2 LTI', targetValue: '0 LTI', deadline: '2025-12-31', progress: 60 },
  { pillar: 'G' as const, target: 'Board independence >60%', baseline: '60%', targetValue: '60%', deadline: '2025-06-30', progress: 100 },
  { pillar: 'G' as const, target: 'All policies reviewed annually', baseline: '60%', targetValue: '100%', deadline: '2025-12-31', progress: 45 },
];

export const strategyTasks = [
  { id: '1', title: 'Install solar panels on factory roof', pillar: 'E' as const, priority: 'high' as const, owner: 'Carlos Andrade', deadline: '2025-09-30', framework: 'CSRD', status: 'in-progress' as const },
  { id: '2', title: 'Conduct Scope 3 supplier survey', pillar: 'E' as const, priority: 'high' as const, owner: 'Ana Sousa', deadline: '2025-07-15', framework: 'GRI', status: 'not-started' as const },
  { id: '3', title: 'Implement safety training program', pillar: 'S' as const, priority: 'medium' as const, owner: 'Pedro Mendes', deadline: '2025-08-01', framework: 'GRI', status: 'in-progress' as const },
  { id: '4', title: 'Draft human rights policy', pillar: 'G' as const, priority: 'medium' as const, owner: 'Ana Sousa', deadline: '2025-06-30', framework: 'CSRD', status: 'not-started' as const },
  { id: '5', title: 'CBAM declaration — Q2', pillar: 'E' as const, priority: 'critical' as const, owner: 'Carlos Andrade', deadline: '2025-06-30', framework: 'CBAM', status: 'not-started' as const },
];

// ─── Cost Savings ────────────────────────────────────────────────────────────

export const savingsSummary = {
  totalSaved: 142000,
  energySaved: 85000,
  waterSaved: 32000,
  wasteSaved: 25000,
  annualTarget: 350000,
  compassShare: 0.25,
};

export const interventions = [
  { name: 'LED Lighting Retrofit', area: 'Energy', investment: 18000, annualSavings: 12000, roi: 1.5, status: 'completed' as const, evidence: 'led_retrofit_report.pdf' },
  { name: 'Compressed Air Leak Repair', area: 'Energy', investment: 4500, annualSavings: 8500, roi: 0.53, status: 'completed' as const, evidence: 'air_audit_2024.pdf' },
  { name: 'Water Recycling System', area: 'Water', investment: 35000, annualSavings: 22000, roi: 1.59, status: 'in-progress' as const, evidence: '' },
  { name: 'Metal Scrap Recovery', area: 'Waste', investment: 12000, annualSavings: 25000, roi: 0.48, status: 'completed' as const, evidence: 'scrap_recovery_q4.xlsx' },
  { name: 'Solar PV Installation', area: 'Energy', investment: 120000, annualSavings: 45000, roi: 2.67, status: 'planned' as const, evidence: '' },
];

// ─── Frameworks ──────────────────────────────────────────────────────────────

export const frameworks = [
  {
    name: 'CSRD',
    fullName: 'Corporate Sustainability Reporting Directive',
    category: 'mandatory' as const,
    applicability: 'Required for companies with EU market exposure',
    reason: 'Mabor Industrial exports to EU markets and meets CSRD thresholds',
    progress: 38,
    deadline: '2025-12-31',
    keyRequirements: ['Double Materiality Assessment', 'ESRS E1-E5 Disclosures', 'ESRS S1-S4 Disclosures', 'ESRS G1 Governance'],
    indicators: [
      { code: 'ESRS E1', name: 'Climate Change', status: 'partial' as const, owner: 'Carlos Andrade' },
      { code: 'ESRS E2', name: 'Pollution', status: 'missing' as const, owner: 'Ana Sousa' },
      { code: 'ESRS S1', name: 'Own Workforce', status: 'partial' as const, owner: 'Pedro Mendes' },
      { code: 'ESRS G1', name: 'Business Conduct', status: 'complete' as const, owner: 'Carlos Andrade' },
    ],
  },
  {
    name: 'GRI',
    fullName: 'Global Reporting Initiative',
    category: 'recommended' as const,
    applicability: 'Globally recognized sustainability reporting standard',
    reason: 'Best practice for manufacturing sector ESG transparency',
    progress: 52,
    deadline: '2025-09-30',
    keyRequirements: ['GRI 302: Energy', 'GRI 305: Emissions', 'GRI 403: OH&S', 'GRI 2-27: Compliance'],
    indicators: [
      { code: 'GRI 302', name: 'Energy 2016', status: 'complete' as const, owner: 'Ana Sousa' },
      { code: 'GRI 305', name: 'Emissions 2016', status: 'partial' as const, owner: 'Carlos Andrade' },
      { code: 'GRI 403', name: 'OH&S 2018', status: 'missing' as const, owner: 'Pedro Mendes' },
      { code: 'GRI 2-27', name: 'Legal Compliance', status: 'complete' as const, owner: 'Carlos Andrade' },
    ],
  },
  {
    name: 'CBAM',
    fullName: 'Carbon Border Adjustment Mechanism',
    category: 'mandatory' as const,
    applicability: 'Applies to manufacturers exporting to the EU',
    reason: 'Mabor Industrial exports steel products subject to CBAM reporting',
    progress: 25,
    deadline: '2026-01-31',
    keyRequirements: ['Embedded Emissions Calculation', 'Quarterly Reporting', 'Verified Emissions Data', 'CBAM Certificate Procurement'],
    indicators: [
      { code: 'CBAM-1', name: 'Product Emissions', status: 'partial' as const, owner: 'Carlos Andrade' },
      { code: 'CBAM-2', name: 'Quarterly Declaration', status: 'missing' as const, owner: 'Carlos Andrade' },
      { code: 'CBAM-3', name: 'Verification', status: 'missing' as const, owner: 'Ana Sousa' },
    ],
  },
];

// ─── Data Ingestion ──────────────────────────────────────────────────────────

export const ingestionCategories = [
  {
    name: 'Environmental',
    icon: 'eco',
    subcategories: [
      { name: 'Electricity Invoices', required: 12, uploaded: 8, status: 'partial' as const },
      { name: 'Fuel Purchase Records', required: 4, uploaded: 4, status: 'complete' as const },
      { name: 'Water Bills', required: 12, uploaded: 6, status: 'partial' as const },
      { name: 'Waste Manifests', required: 4, uploaded: 2, status: 'partial' as const },
    ],
  },
  {
    name: 'Social',
    icon: 'group',
    subcategories: [
      { name: 'HR Records', required: 2, uploaded: 1, status: 'partial' as const },
      { name: 'Safety Reports', required: 4, uploaded: 3, status: 'partial' as const },
      { name: 'Training Records', required: 2, uploaded: 0, status: 'missing' as const },
      { name: 'Community Reports', required: 1, uploaded: 1, status: 'complete' as const },
    ],
  },
  {
    name: 'Governance',
    icon: 'gavel',
    subcategories: [
      { name: 'Board Minutes', required: 4, uploaded: 4, status: 'complete' as const },
      { name: 'Policy Documents', required: 5, uploaded: 3, status: 'partial' as const },
      { name: 'Audit Reports', required: 1, uploaded: 1, status: 'complete' as const },
      { name: 'Compliance Certificates', required: 3, uploaded: 2, status: 'partial' as const },
    ],
  },
];

// ─── Vera AI ─────────────────────────────────────────────────────────────────

export const aiSuggestions = [
  { id: '1', text: 'What frameworks apply to Mabor Industrial?', icon: 'help' },
  { id: '2', text: 'Show me my biggest emissions gaps', icon: 'analytics' },
  { id: '3', text: 'Help me draft a CBAM declaration', icon: 'edit_note' },
  { id: '4', text: 'What should I prioritize this month?', icon: 'priority_high' },
];

export const aiChatHistory = [
  {
    role: 'user' as const,
    content: 'What frameworks apply to Mabor Industrial?',
    time: '10:30 AM',
  },
  {
    role: 'assistant' as const,
    content: `Based on Mabor Industrial's profile — a manufacturing company in Luanda exporting to EU markets — I've identified three applicable frameworks:\n\n**Mandatory:**\n• **CSRD** — Required due to EU market exposure and company size thresholds\n• **CBAM** — Your steel product exports are subject to carbon border adjustment\n\n**Recommended:**\n• **GRI** — Global best practice for manufacturing sector ESG transparency\n\nWould you like me to create tasks for the most urgent requirements?`,
    time: '10:30 AM',
  },
];
