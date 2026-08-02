import React from 'react';
import SearchBar from '../ui/SearchBar';
import ThemeToggle from '../ui/ThemeToggle';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white dark:bg-slate-900 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <a className="text-xl font-semibold">Leyde</a>
          </Link>
        </div>

        <div className="flex-1 px-4 hidden md:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Mobile menu button will be visible on small screens */}
          <div className="md:hidden">
            <button aria-label="Open menu" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          <div className="hidden md:block">
            <Link href="/cart"><a className="px-3 py-2 rounded-md hover:bg-gray-100">Cart</a></Link>
          </div>
        </div>
      </div>

      {/* Mobile navigation placeholder - actual offcanvas handled by MobileNav component */}
    </nav>
  );
}
