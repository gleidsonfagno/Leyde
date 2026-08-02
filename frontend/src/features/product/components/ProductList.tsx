import React from 'react';
import { Product } from '../../../types/product';
import Price from '../../../components/ui/Price';
import Image from 'next/image';

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="space-y-4">
      {products.map((p) => (
        <div key={p.id} className="flex gap-4 items-start bg-white dark:bg-slate-800 p-4 rounded-md shadow-sm">
          <div className="w-24 h-24 relative bg-slate-100 dark:bg-slate-700 flex-shrink-0">
            {p.images && p.images.length ? (
              <Image src={p.images[0].url} alt={p.title} fill className="object-cover rounded" />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">No image</div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">{p.title}</h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-3">{p.description}</p>
            <div className="mt-3 text-lg font-semibold">
              <Price value={p.price} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
