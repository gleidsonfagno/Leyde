import React from 'react';
import { fetchProductsServer, fetchBrandsServer, fetchCategoriesServer } from './productApi';
import ProductGrid from './components/ProductGrid';
import ProductList from './components/ProductList';
import FiltersSidebar from './components/FiltersSidebar';
import TopBar from './components/TopBar';
import CatalogPagination from './components/CatalogPagination';
import SearchBar from '../../components/ui/SearchBar';

type Props = { searchParams: { [key: string]: string | string[] | undefined } };

export default async function ProductsCatalogServer({ searchParams }: Props) {
  const page = Number(Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page) || 1;
  const pageSize = Number(Array.isArray(searchParams.pageSize) ? searchParams.pageSize[0] : searchParams.pageSize) || 24;
  const sort = Array.isArray(searchParams.sort) ? searchParams.sort[0] : searchParams.sort;
  const brand = Array.isArray(searchParams.brand) ? searchParams.brand[0] : searchParams.brand;
  const category = Array.isArray(searchParams.category) ? searchParams.category[0] : searchParams.category;
  const q = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;
  const view = (Array.isArray(searchParams.view) ? searchParams.view[0] : searchParams.view) === 'list' ? 'list' : 'grid';

  const [productsPage, brands, categories] = await Promise.all([
    fetchProductsServer({ page, pageSize, sort, brand, category, q }),
    fetchBrandsServer(),
    fetchCategoriesServer()
  ]);

  const products = productsPage.content ?? [];
  const totalPages = productsPage.totalPages ?? 1;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <SearchBar />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden lg:block w-64">
          <FiltersSidebar brands={brands} categories={categories} current={{ brand: brand ?? undefined, category: category ?? undefined }} />
        </div>
        <div className="flex-1">
          <TopBar view={view} />
          {view === 'grid' ? <ProductGrid products={products} /> : <ProductList products={products} />}

          <CatalogPagination page={page} totalPages={totalPages} currentQuery={new URLSearchParams(Object.entries(Object.fromEntries(Object.entries(searchParams).map(([k, v]) => [k, Array.isArray(v) ? v[0] : (v ?? '')]))))} />
        </div>
      </div>
    </div>
  );
}
