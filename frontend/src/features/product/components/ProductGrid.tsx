import React from 'react';
import { Product } from '../../../types/product';
import ProductCard from '../../../components/ui/ProductCard';
import clsx from 'clsx';

type Props = { products: Product[] };

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          title={p.title}
          image={p.images && p.images.length ? p.images[0].url : undefined}
          price={p.price}
          oldPrice={p.oldPrice ?? null}
          badge={p.oldPrice ? 'Promo' : undefined}
        />
      ))}
    </div>
  );
}
