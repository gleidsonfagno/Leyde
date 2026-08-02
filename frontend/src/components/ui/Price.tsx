import React from 'react';

export default function Price({ value, currency = 'BRL', className = '' }: { value: number; currency?: string; className?: string }) {
  const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(value);
  return <span className={className}>{formatted}</span>;
}
