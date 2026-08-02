"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../../components/ui/Button';

export default function AdminTopbar() {
  const router = useRouter();
  function logout() {
    try { localStorage.removeItem('accessToken'); localStorage.removeItem('refreshToken'); } catch {};
    router.push('/admin/login');
  }
  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => router.push('/admin/profile')}>Profile</Button>
        <Button variant="secondary" onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}
