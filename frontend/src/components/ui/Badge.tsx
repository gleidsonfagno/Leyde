import React from 'react';
import clsx from 'clsx';

export default function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={clsx('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200', className)}>{children}</span>;
}
