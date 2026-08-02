import React from 'react';
import Link from 'next/link';

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {items.map((it, idx) => (
          <li key={idx} className="inline-flex items-center">
            {it.href ? <Link href={it.href} className="text-slate-600 hover:underline">{it.label}</Link> : <span className="text-slate-500">{it.label}</span>}
            {idx < items.length - 1 && <span className="mx-2 text-slate-400">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
