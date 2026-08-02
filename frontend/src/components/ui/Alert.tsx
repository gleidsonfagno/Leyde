"use client";

import React, { useState } from 'react';
import clsx from 'clsx';

type Variant = 'info' | 'success' | 'warning' | 'error';

export default function Alert({ variant = 'info', children, dismissible = false, className }: { variant?: Variant; children: React.ReactNode; dismissible?: boolean; className?: string }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  const base = 'rounded-md p-3 flex items-start gap-3';
  const variantClasses: Record<Variant, string> = {
    info: 'bg-blue-50 text-blue-800',
    success: 'bg-green-50 text-green-800',
    warning: 'bg-amber-50 text-amber-800',
    error: 'bg-red-50 text-red-800'
  };

  return (
    <div className={clsx(base, variantClasses[variant], className)} role="alert">
      <div className="flex-1 text-sm">{children}</div>
      {dismissible && (
        <button aria-label="Close alert" onClick={() => setOpen(false)} className="text-sm opacity-80">×</button>
      )}
    </div>
  );
}
