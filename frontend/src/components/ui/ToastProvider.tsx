"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type Toast = { id: string; message: string; type?: 'info' | 'success' | 'error' };

type ToastContextValue = {
  toasts: Toast[];
  push: (t: Omit<Toast, 'id'>) => void;
  remove: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    setToasts((s) => [...s, { id, ...t }]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 5000);
  }, []);

  const remove = useCallback((id: string) => setToasts((s) => s.filter((x) => x.id !== id)), []);

  return (
    <ToastContext.Provider value={{ toasts, push, remove }}>
      {children}
      <div aria-live="polite" className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} className={`px-4 py-2 rounded shadow ${t.type === 'error' ? 'bg-red-600 text-white' : t.type === 'success' ? 'bg-green-600 text-white' : 'bg-slate-800 text-white'}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
