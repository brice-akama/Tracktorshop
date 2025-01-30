// Add the "use client" directive to mark this file as a client component
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if the current pathname is in the admin/login folder
  const isLoginPage = pathname.startsWith('/admin/login');

  return (
    <div className="flex">
      {/* Conditionally render Sidebar based on the pathname */}
      {!isLoginPage && <Sidebar />}
      
      {/* Main content on the right */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
