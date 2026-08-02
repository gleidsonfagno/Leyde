import React from 'react';
import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-100 dark:border-slate-700 h-screen sticky top-0 p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Admin</h3>
      </div>
      <nav className="space-y-2 text-sm">
        <Link href="/admin" className="block px-2 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-900">Dashboard</Link>
        <Link href="/admin/products" className="block px-2 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-900">Products</Link>
        <Link href="/admin/brands" className="block px-2 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-900">Brands</Link>
        <Link href="/admin/categories" className="block px-2 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-900">Categories</Link>
        <Link href="/admin/inventory" className="block px-2 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-900">Inventory</Link>
        <Link href="/admin/promotions" className="block px-2 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-900">Promotions</Link>
      </nav>
    </aside>
  );
}
