"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import apiClient from '../../../lib/apiClient';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.post('/api/v1/auth/login', { username, password });
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      router.push('/admin');
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <form onSubmit={submit} className="w-full max-w-sm bg-white dark:bg-slate-800 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Admin Login</h2>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="mt-4">
          <Button type="submit" disabled={loading}>{loading ? 'Signing...' : 'Sign in'}</Button>
        </div>
      </form>
    </div>
  );
}
