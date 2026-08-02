"use client";

import React from 'react';
import clsx from 'clsx';

export default function FormField({ label, children, hint }: { label?: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <div>{children}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}
