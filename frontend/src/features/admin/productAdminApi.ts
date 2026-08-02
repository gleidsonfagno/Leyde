const API = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchAdminProductsServer({ page = 1, size = 50 }:{page?:number; size?:number}){
  const params = new URLSearchParams();
  params.set('page', String(Math.max(0, page-1)));
  params.set('size', String(size));
  const res = await fetch(`${API}/api/v1/products?${params.toString()}`, { cache: 'no-store' });
  if(!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
