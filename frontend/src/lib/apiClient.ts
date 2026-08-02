import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { getAccessToken, getRefreshToken, saveAccessToken, clearTokens } from './auth';
import { ApiError } from '../types/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS || 10000);

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Retry strategy: retry on network errors and 5xx (except 501) for idempotent requests
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    // Retry on network errors
    if (axiosRetry.isNetworkOrIdempotentRequestError(error)) return true;
    const status = (error as AxiosError)?.response?.status;
    // Retry on 5xx
    return !!status && status >= 500 && status < 600;
  }
});

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) return refreshPromise;
  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const refresh = getRefreshToken();
      if (!refresh) throw new Error('No refresh token');
      const res = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, { refreshToken: refresh }, { timeout: TIMEOUT });
      const { accessToken, refreshToken } = res.data || {};
      if (accessToken) saveAccessToken(accessToken, refreshToken);
      return accessToken || null;
    } catch (e) {
      clearTokens();
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}

// Request interceptor: attach Authorization header
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401 -> try refresh
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        // set new header and retry
        if (originalRequest.headers) originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }

    // Map to ApiError
    const apiError: ApiError = {
      message: error.message,
      status: error.response?.status,
      details: error.response?.data
    };
    return Promise.reject(apiError);
  }
);

export default api;
