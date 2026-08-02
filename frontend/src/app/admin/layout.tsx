import '../styles/globals.css';
import type { ReactNode } from 'react';
import AdminSidebar from '../../features/admin/components/AdminSidebar';
import AdminTopbar from '../../features/admin/components/AdminTopbar';

export const metadata = { title: 'Admin - Leyde' };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <div className="flex">
            <AdminSidebar />
            <div className="flex-1 min-h-screen">
              <AdminTopbar />
              <main className="p-6">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
