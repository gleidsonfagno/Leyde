"use client";

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import clsx from 'clsx';
import Button from '../../../components/ui/Button';
import { useState } from 'react';

export default function TopBar({ view }: { view: 'grid' | 'list' }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sort, setSort] = useState(searchParams.get('sort') || '');

  function setParam(key: string, value?: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value === undefined || value === '') params.delete(key);
    else params.set(key, value);
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-2">
        <Button variant={view === 'grid' ? 'primary' : 'ghost'} onClick={() => setParam('view', 'grid')}>Grid</Button>
        <Button variant={view === 'list' ? 'primary' : 'ghost'} onClick={() => setParam('view', 'list')}>List</Button>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-600">Sort:</label>
        <select className="rounded-md border px-2 py-1 text-sm" value={sort} onChange={(e) => { setSort(e.target.value); setParam('sort', e.target.value); }}>
          <option value="">Relevance</option>
          <option value="price,asc">Price: Low to High</option>
          <option value="price,desc">Price: High to Low</option>
          <option value="createdAt,desc">Newest</option>
        </select>
      </div>
    </div>
  );
}
