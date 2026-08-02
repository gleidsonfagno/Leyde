"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from '../../utils/debounce';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const router = useRouter();

  const doSearch = debounce((value: string) => {
    // Navigate to search route (not implemented) with query param
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }, 300);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQ(e.target.value);
    doSearch(e.target.value);
  }

  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">Search products</label>
      <div className="relative">
        <input id="search" value={q} onChange={onChange} placeholder="Search perfumes, brands or categories" className="w-full border rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500" />
        <div className="absolute right-2 top-2 text-gray-400">⌕</div>
      </div>
    </div>
  );
}
