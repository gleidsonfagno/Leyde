"use client";

import React from 'react';
import Button from './Button';
import clsx from 'clsx';

export default function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (p: number) => void }) {
  const prev = () => onPageChange(Math.max(1, currentPage - 1));
  const next = () => onPageChange(Math.min(totalPages, currentPage + 1));

  return (
    <nav className="flex items-center justify-between">
      <div>
        <Button variant="ghost" onClick={prev} disabled={currentPage <= 1}>
          Previous
        </Button>
      </div>
      <div className="text-sm text-slate-600">Page {currentPage} of {totalPages}</div>
      <div>
        <Button variant="ghost" onClick={next} disabled={currentPage >= totalPages}>
          Next
        </Button>
      </div>
    </nav>
  );
}
