"use client";

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Price from './Price';
import Badge from './Badge';
import Link from 'next/link';

type Props = {
  id?: string;
  href?: string;
  title: string;
  image?: string;
  price: number;
  oldPrice?: number | null;
  badge?: string | null;
  onClick?: () => void;
  className?: string;
};

export default function ProductCard({ title, image, price, oldPrice, badge, onClick, className, href }: Props) {
  const card = (
    <article className={clsx('ds-card overflow-hidden', className)} onClick={onClick} role={onClick ? 'button' : undefined}>
      <div className="relative w-full h-56" style={{ background: 'var(--surface-warm)' }}>
        {image ? (
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="ds-img-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-meta">No image</div>
        )}
        {badge && <div className="absolute top-3 left-3"><Badge>{badge}</Badge></div>}
      </div>
      <div className="ds-card__content">
        <h3 className="text-xl" style={{ fontFamily: 'var(--font-display)', letterSpacing: 'var(--tracking-display)' }}>{title}</h3>
        <div className="mt-2 flex items-baseline gap-3">
          <Price value={price} className="text-lg font-semibold" />
          {oldPrice && <Price value={oldPrice} className="text-sm" />}
        </div>
      </div>
    </article>
  );

  if (href) return <Link href={href} className="block">{card}</Link>;
  return card;
}
