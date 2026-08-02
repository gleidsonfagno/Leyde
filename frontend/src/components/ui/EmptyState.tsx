import React from 'react';

export default function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="text-center py-12">
      <div className="text-3xl mb-4">—</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      {description && <p className="text-sm text-gray-500 mt-2">{description}</p>}
    </div>
  );
}
