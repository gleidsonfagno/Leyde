import React from 'react';
import { Product } from '../../../types/product';
import Price from '../../../components/ui/Price';
import Image from 'next/image';

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="space-y-4">
      {products.map((p) => (
        <article key={p.id} className="ds-card flex gap-4 items-start">
          <div className="w-24 h-24 relative flex-shrink-0" style={{background: 'var(--surface-warm)'}}>
            {p.images && p.images.length ? (
              <Image src={p.images[0].url} alt={p.title} fill className="ds-img-cover rounded" />
            ) : (
              <div className="flex items-center justify-center h-full text-meta">No image</div>
            )}
          </div>
          <div className="ds-card__content flex-1">
            <h3 className="text-xl" style={{fontFamily: 'var(--font-display)'}}>{p.title}</h3>
            <p className="text-sm text-meta mt-1 line-clamp-3">{p.description}</p>
            <div className="mt-3 text-lg font-semibold">
              <Price value={p.price} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
