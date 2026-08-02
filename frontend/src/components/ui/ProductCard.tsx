"use client";

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Price from './Price';
import Badge from './Badge';

type Props = {
  id?: string;
  title: string;
  image?: string;
  price: number;
  oldPrice?: number | null;
  badge?: string | null;
  onClick?: () => void;
  className?: string;
};

import Link from 'next/link';

export default function ProductCard({ title, image, price, oldPrice, badge, onClick, className, id, href }: Props & { id?: string; href?: string }) {
  const content = (
    <article className={clsx('bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm', className)} onClick={onClick} role={onClick ? 'button' : undefined}>
      <div className="relative w-full h-56 bg-slate-100 dark:bg-slate-700">
        {image ? (
          // next/image requires width/height — use fill
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">No image</div>
        )}
        {badge && <div className="absolute top-3 left-3"><Badge>{badge}</Badge></div>}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{title}</h3>
        <div className="mt-2 flex items-baseline gap-3">
          <Price value={price} className="text-lg font-semibold" />
          {oldPrice && <Price value={oldPrice} className="text-sm line-through text-slate-500" />}
        </div>
      </div>
    </article>
  );

  if (href) return <Link href={href} className="block">{content}</Link>;
  return content;
}
