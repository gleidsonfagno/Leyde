import { getJson } from '../lib/api';

export async function getCurrentUser() {
  return getJson('/api/v1/me'); // placeholder
}

export async function login() {
  throw new Error('Not implemented');
}

export async function logout() {
  throw new Error('Not implemented');
}
