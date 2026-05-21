import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="text-center">
        <p className="text-8xl font-headline italic text-primary/20 mb-4">404</p>
        <h2 className="text-xl font-bold text-primary mb-2">Page not found</h2>
        <p className="text-sm text-on-surface-variant mb-8">The page you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-primary-container text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer outline-none"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};
