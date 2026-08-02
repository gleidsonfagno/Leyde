import React from 'react';
import clsx from 'clsx';

export default function Skeleton({ className = 'h-4 w-full rounded bg-slate-200 dark:bg-slate-700', count = 1 }: { className?: string; count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={clsx('animate-pulse', className)} />
      ))}
    </div>
  );
}
