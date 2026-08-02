import React from 'react';
import clsx from 'clsx';

export default function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={clsx('ds-badge', className)}>{children}</span>;
}
