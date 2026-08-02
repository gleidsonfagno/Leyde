import React from 'react';
import Link from 'next/link';

export default function FiltersSidebar({ brands, categories, current }: { brands: { id: string; name: string }[]; categories: { id: string; name: string }[]; current: { brand?: string; category?: string } }) {
  const buildQuery = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    if (overrides.brand) params.set('brand', overrides.brand);
    if (overrides.category) params.set('category', overrides.category);
    return `?${params.toString()}`;
  };

  return (
    <aside className="w-full sm:w-64">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">Brands</h4>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href={`/products${buildQuery({ brand: undefined, category: current.category })}`} className={current.brand ? 'text-slate-600' : 'font-semibold'}>
              All
            </Link>
          </li>
          {brands.map((b) => (
            <li key={b.id}>
              <Link href={`/products${buildQuery({ brand: b.id, category: current.category })}`} className={current.brand === b.id ? 'font-semibold' : 'text-slate-600'}>
                {b.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Categories</h4>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href={`/products${buildQuery({ category: undefined, brand: current.brand })}`} className={current.category ? 'text-slate-600' : 'font-semibold'}>
              All
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <Link href={`/products${buildQuery({ category: c.id, brand: current.brand })}`} className={current.category === c.id ? 'font-semibold' : 'text-slate-600'}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
