import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t mt-12">
      <div className="container mx-auto px-4 text-center">
        <small className="text-sm text-gray-500">© {new Date().getFullYear()} Leyde</small>
      </div>
    </footer>
  );
}
