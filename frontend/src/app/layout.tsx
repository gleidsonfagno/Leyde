import '../styles/globals.css';
import type { ReactNode } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ThemeProvider } from '../providers/ThemeProvider';
import { ToastProvider } from '../components/ui/ToastProvider';

export const metadata = {
  title: 'Leyde',
  description: 'Leyde - Online Perfume Store'
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
