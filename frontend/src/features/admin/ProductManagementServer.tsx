import React from 'react';
import { fetchAdminProductsServer } from './productAdminApi';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/ui/Button';
import dynamic from 'next/dynamic';
const CreateProductForm = dynamic(() => import('./CreateProductForm'), { ssr: false });

export default async function ProductManagementServer() {
  const page = 1;
  const data = await fetchAdminProductsServer({ page, size: 100 });
  const products = data.content ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <CreateProductForm />
      </div>

      <DataTable
        columns={[
          { key: 'title', label: 'Title', render: (r: any) => r.title },
          { key: 'brand', label: 'Brand', render: (r: any) => r.brand?.name ?? '-' },
          { key: 'category', label: 'Category', render: (r: any) => r.category?.name ?? '-' },
          { key: 'price', label: 'Price', render: (r: any) => `R$ ${r.price.toFixed(2)}` }
        ]}
        data={products}
      />
    </div>
  );
}
