import Link from 'next/link';

export default function AdminIndex() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/products" className="p-4 bg-white dark:bg-slate-800 rounded shadow">Manage Products</Link>
        <Link href="/admin/brands" className="p-4 bg-white dark:bg-slate-800 rounded shadow">Manage Brands</Link>
        <Link href="/admin/categories" className="p-4 bg-white dark:bg-slate-800 rounded shadow">Manage Categories</Link>
        <Link href="/admin/inventory" className="p-4 bg-white dark:bg-slate-800 rounded shadow">Inventory</Link>
        <Link href="/admin/promotions" className="p-4 bg-white dark:bg-slate-800 rounded shadow">Promotions</Link>
      </div>
    </div>
  );
}
