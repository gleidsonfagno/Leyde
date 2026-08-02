import './styles/globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Leyde',
  description: 'Leyde - Online Perfume Store'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Root layout: keep minimal. Use Design System components from src/components when available. */}
        {children}
      </body>
    </html>
  );
}
