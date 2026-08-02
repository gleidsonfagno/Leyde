"use client";

import React from 'react';
import clsx from 'clsx';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

export default function Input({ label, error, prefix, suffix, className, ...rest }: Props) {
  return (
    <label className="block text-sm">
      {label && <div className="mb-1 text-sm text-slate-700 dark:text-slate-200">{label}</div>}
      <div className="relative">
        {prefix && <div className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500">{prefix}</div>}
        <input
          className={clsx('w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-200', prefix ? 'pl-10' : '', suffix ? 'pr-10' : '', className)}
          {...rest}
        />
        {suffix && <div className="absolute right-2 top-1/2 -translate-y-1/2">{suffix}</div>}
      </div>
      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </label>
  );
}
