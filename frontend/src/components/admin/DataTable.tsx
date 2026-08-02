"use client";

import React from 'react';

type Column<T> = { key: string; label: string; render?: (row: T) => React.ReactNode };

export default function DataTable<T>({ columns, data }: { columns: Column<T>[]; data: T[] }) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-md shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-2 text-slate-600">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 align-top">{c.render ? c.render(row) : (row as any)[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
