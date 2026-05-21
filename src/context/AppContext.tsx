import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface UserData {
  firstName: string;
  lastName: string;
  role: string;
  language: 'en' | 'pt';
}

export interface CompanyData {
  name: string;
  sector: string;
  country: string;
  employees: string;
  turnover: string;
  erp: string;
}

interface AppContextType {
  user: UserData;
  company: CompanyData;
  setUser: (user: UserData) => void;
  setCompany: (company: CompanyData) => void;
}

const defaultUser: UserData = {
  firstName: 'Carlos',
  lastName: 'Andrade',
  role: 'ESG Manager',
  language: 'en'
};

const defaultCompany: CompanyData = {
  name: 'Mabor Industrial, S.A.',
  sector: 'Manufacturing',
  country: 'Angola',
  employees: '250 - 499',
  turnover: '$10M - $50M',
  erp: 'Primavera BSS'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData>(defaultUser);
  const [company, setCompany] = useState<CompanyData>(defaultCompany);

  return (
    <AppContext.Provider value={{ user, company, setUser, setCompany }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
