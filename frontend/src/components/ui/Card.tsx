import React from 'react';
import clsx from 'clsx';

export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('ds-card', className)}>
      <div className="ds-card__content">{children}</div>
    </div>
  );
}
