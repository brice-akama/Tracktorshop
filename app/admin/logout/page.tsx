"use client";

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter(); // Correct way to use router in the App Router

  const handleRedirect = () => {
    router.push('/'); // Redirect to the homepage
  };

  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <button
          onClick={handleRedirect}
          className="bg-blue-500 text-white p-2 mt-2 rounded"
        >
          Go to Home
        </button>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
