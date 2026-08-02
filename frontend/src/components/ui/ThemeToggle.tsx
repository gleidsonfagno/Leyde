"use client";

import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded-md">
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
