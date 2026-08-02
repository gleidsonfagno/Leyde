import { getJson } from '../lib/api';
import type { Product } from '../types/product';
import type { Page } from '../types/page';

export async function listProducts(page = 0, size = 20): Promise<Page<Product>> {
  return getJson(`/api/v1/products?page=${page}&size=${size}`);
}

export async function getProduct(id: string): Promise<Product> {
  return getJson(`/api/v1/products/${id}`);
}
