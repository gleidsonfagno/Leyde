// Hook for client-side interactions if needed (e.g., infinite scroll). For server rendering prefer calling services from server components.

import useSWR from 'swr';
import { Product } from '../../types/product';
import { fetcher } from '../../lib/api';

export function useProducts(page = 0, size = 20) {
  const { data, error } = useSWR(`/api/v1/products?page=${page}&size=${size}`, fetcher);
  return {
    products: (data?.content ?? []) as Product[],
    isLoading: !error && !data,
    isError: !!error
  };
}
