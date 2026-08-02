import React from 'react';

export default function Header() {
  // Server component - minimal placeholder
  return (
    <header className="w-full py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Leyde</div>
          <nav aria-label="Main navigation">{/* nav links will go here */}</nav>
        </div>
      </div>
    </header>
  );
}
