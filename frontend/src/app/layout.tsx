import '../styles/globals.css';
import type { ReactNode } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ThemeProvider } from '../providers/ThemeProvider';
import { ToastProvider } from '../components/ui/ToastProvider';

export const metadata = {
  title: 'Leyde',
  description: 'Leyde - Online Perfume Store',
  openGraph: {
    title: 'Leyde - Perfumes & Cosmetics',
    description: 'Shop premium perfumes and cosmetics at Leyde',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Leyde',
    images: [{ url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') + '/og-image.png', width: 1200, height: 630 }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leyde - Perfumes & Cosmetics',
    description: 'Shop premium perfumes and cosmetics at Leyde'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          <ToastProvider>
            <Navbar />
            <main className="min-h-[60vh]">{children}</main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
