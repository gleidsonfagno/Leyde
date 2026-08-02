"use client";

import React from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
};

const sizeClasses: Record<string, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-5 py-3'
};

export default function Button({ variant = 'primary', size = 'md', className, as = 'button', href, children, ...rest }: Props) {
  const classes = clsx('ds-btn', sizeClasses[size], className);

  if (as === 'a') {
    return (
      <a href={href} className={classes} data-variant={variant} {...(rest as any)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} data-variant={variant} {...rest}>
      {children}
    </button>
  );
}
