import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface DrawerState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
}

interface DrawerContextType {
  openDrawer: (title: string, content: React.ReactNode) => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType>({ openDrawer: () => {}, closeDrawer: () => {} });

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DrawerState>({ isOpen: false, title: '', content: null });

  const openDrawer = useCallback((title: string, content: React.ReactNode) => {
    setState({ isOpen: true, title, content });
  }, []);

  const closeDrawer = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeDrawer]);

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      {children}

      {/* Backdrop */}
      {state.isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity duration-300"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <aside
        className={`
          fixed right-0 top-0 h-screen w-full max-w-[440px] z-[61]
          bg-white shadow-2xl flex flex-col
          transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${state.isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ boxShadow: '-8px 0 40px rgba(3, 39, 14, 0.12)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-outline-variant/20">
          <h3 className="text-lg font-bold text-primary">{state.title}</h3>
          <button
            onClick={closeDrawer}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-container-high transition-colors cursor-pointer outline-none active:scale-90"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {state.content}
        </div>
      </aside>
    </DrawerContext.Provider>
  );
};
