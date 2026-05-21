import React, { createContext, useContext, useState, useCallback } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  icon?: string;
}

interface ToastContextType {
  toast: (message: string, type?: Toast['type'], icon?: string) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'success', icon?: string) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col-reverse gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`
              pointer-events-auto px-6 py-3.5 rounded-2xl shadow-2xl
              flex items-center gap-3 min-w-[280px]
              animate-[slideUp_0.3s_ease-out] transition-all
              ${t.type === 'success' ? 'bg-primary text-white' :
                t.type === 'warning' ? 'bg-[#9c6200] text-white' :
                'bg-primary-container text-white'}
            `}
            style={{ boxShadow: '0 12px 40px rgba(3,39,14,0.35)' }}
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {t.icon || (t.type === 'success' ? 'check_circle' : t.type === 'warning' ? 'warning' : 'info')}
            </span>
            <span className="text-sm font-bold">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
