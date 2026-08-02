"use client";

import React from 'react';

export default function ErrorFallback({ error, reset }: { error: Error | null; reset?: () => void }) {
  return (
    <div className="p-6 bg-red-50 text-red-700 rounded-md">
      <h4 className="font-semibold">Something went wrong</h4>
      <p className="text-sm mt-2">{error?.message ?? 'Unexpected error'}</p>
      {reset && <button onClick={reset} className="mt-4 px-3 py-2 bg-red-600 text-white rounded">Try again</button>}
    </div>
  );
}
