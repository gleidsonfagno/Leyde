// Placeholder for API client utilities
// Keep all REST calls to the backend here (fetch wrappers, error handling, auth hooks, etc.)

export const apiBase = process.env.NEXT_PUBLIC_API_URL || '';

export async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, init);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  return res.json();
}
