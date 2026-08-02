"use client";

import React from 'react';

export default function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="4" stroke="#cbd5e1" fill="none" />
      <path d="M4 12a8 8 0 018-8" strokeWidth="4" stroke="#1e3a8a" fill="none" strokeLinecap="round" />
    </svg>
  );
}
