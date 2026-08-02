import React from 'react';
import type { Product } from '../../types/product';

export default function ProductCard({ product }: { product: Product }) {
  // Server component by default; only minimal rendering
  return (
    <article className="border rounded-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.brandName || ''}</p>
        <div className="mt-2 font-semibold">${product.price}</div>
      </div>
    </article>
  );
}
