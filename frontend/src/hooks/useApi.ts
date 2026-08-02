"use client";

import { useState, useEffect } from 'react';
import api from '../lib/apiClient';
import type { ApiError } from '../types/api';

export function useApi<T = any>(config: Parameters<typeof api.request>[0]) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.request<T>(config)
      .then((r) => { if (!cancelled) setData(r.data); })
      .catch((e) => { if (!cancelled) setError(e); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [JSON.stringify(config)]);

  return { data, loading, error };
}
