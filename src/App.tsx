import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Environment } from './pages/Environment';
import { Social } from './pages/Social';
import { Governance } from './pages/Governance';
import { Strategy } from './pages/Strategy';
import { CostSavings } from './pages/CostSavings';
import { Frameworks } from './pages/Frameworks';
import { Reports } from './pages/Reports';
import { DataIngestion } from './pages/DataIngestion';
import { VeraAI } from './pages/VeraAI';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import { Onboarding } from './pages/Onboarding';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="environment" element={<Environment />} />
          <Route path="social" element={<Social />} />
          <Route path="governance" element={<Governance />} />
          <Route path="strategy" element={<Strategy />} />
          <Route path="cost-savings" element={<CostSavings />} />
          <Route path="frameworks" element={<Frameworks />} />
          <Route path="reports" element={<Reports />} />
          <Route path="data-ingestion" element={<DataIngestion />} />
          <Route path="vera-ai" element={<VeraAI />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
