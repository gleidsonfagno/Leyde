import ProductsCatalogServer from '../../../features/product/ProductsCatalogServer';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return <ProductsCatalogServer searchParams={searchParams} />;
}
