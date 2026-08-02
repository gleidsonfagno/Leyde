import React from 'react';
import Skeleton from '../../components/ui/Skeleton';

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4"><Skeleton count={1} className="h-8 w-1/3" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-md">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-4 w-3/4 mt-3" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
