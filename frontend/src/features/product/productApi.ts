const API = process.env.NEXT_PUBLIC_API_URL || '';

function buildQuery(params: Record<string, any>) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    if (Array.isArray(v)) v.forEach((x) => qs.append(k, String(x)));
    else qs.set(k, String(v));
  });
  return qs.toString() ? `?${qs.toString()}` : '';
}

export async function fetchProductsServer({ page = 1, pageSize = 24, sort, brand, category, q, view }: { page?: number; pageSize?: number; sort?: string; brand?: string; category?: string; q?: string; view?: 'grid' | 'list' }) {
  const params: Record<string, any> = { page: Math.max(1, page) - 1, size: pageSize }; // backend 0-based
  if (sort) params.sort = sort;
  if (brand) params.brand = brand;
  if (category) params.category = category;
  if (q) params.q = q;

  const url = `${API}/api/v1/products${buildQuery(params)}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  return res.json();
}

export async function fetchBrandsServer() {
  const url = `${API}/api/v1/brands`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch brands');
  return res.json();
}

export async function fetchCategoriesServer() {
  const url = `${API}/api/v1/categories`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}
