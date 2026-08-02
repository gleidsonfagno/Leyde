"use client";

import React from 'react';
import clsx from 'clsx';

type Option = { label: string; value: string | number };

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: Option[];
  error?: string | null;
};

export default function Select({ label, options, error, className, ...rest }: Props) {
  return (
    <label className="block text-sm">
      {label && <div className="mb-1 text-sm text-slate-700 dark:text-slate-200">{label}</div>}
      <select className={clsx('w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700', className)} {...rest}>
        {options.map((o) => (
          <option key={String(o.value)} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </label>
  );
}
