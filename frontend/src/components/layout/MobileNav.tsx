"use client";

import React from 'react';
import Link from 'next/link';

export default function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-3/4 max-w-xs bg-white dark:bg-slate-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold">Menu</div>
          <button onClick={onClose} aria-label="Close menu" className="p-2">
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          <Link href="/products"><a className="px-2 py-2 rounded hover:bg-gray-100">Produtos</a></Link>
          <Link href="/categories"><a className="px-2 py-2 rounded hover:bg-gray-100">Categorias</a></Link>
          <Link href="/brands"><a className="px-2 py-2 rounded hover:bg-gray-100">Marcas</a></Link>
        </nav>
      </div>
    </div>
  );
}
