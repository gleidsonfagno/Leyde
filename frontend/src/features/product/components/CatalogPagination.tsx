import React from 'react';
import Link from 'next/link';

export default function CatalogPagination({ page, totalPages, currentQuery }: { page: number; totalPages: number; currentQuery: URLSearchParams }) {
  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  const build = (p: number) => {
    const qs = new URLSearchParams(currentQuery.toString());
    qs.set('page', String(p));
    return `/products?${qs.toString()}`;
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <div>
        <Link href={build(prevPage)} className={`px-3 py-1 rounded-md border ${page <= 1 ? 'opacity-50 pointer-events-none' : ''}`}>Previous</Link>
      </div>
      <div className="text-sm text-slate-600">Page {page} of {totalPages}</div>
      <div>
        <Link href={build(nextPage)} className={`px-3 py-1 rounded-md border ${page >= totalPages ? 'opacity-50 pointer-events-none' : ''}`}>Next</Link>
      </div>
    </div>
  );
}
