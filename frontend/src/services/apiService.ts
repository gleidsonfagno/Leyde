import api from '../lib/apiClient';
import type { ApiResponse } from '../types/api';

export async function fetchJson<T = any>(path: string) {
  const res = await api.get<T>(path);
  return res.data as T;
}

export async function fetchApi<T = any>(path: string) : Promise<ApiResponse<T>> {
  const res = await api.get<ApiResponse<T>>(path);
  return res.data;
}
