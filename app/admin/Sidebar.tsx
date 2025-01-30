// components/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

const menuItems = [
  { name: 'Dashboard', path: '/admin/admin-dashboard' },
  { name: 'Add Product', path: '/admin/add-product' },
  { name: 'Manage Products', path: '/admin/manage-product' },
  { name: 'Users', path: '/admin/users' },
  { name: 'Manage Reviews', path: '/admin/reviews' },
  { name: 'Orders', path: '/admin/checkout' },
  { name: 'Blog Management', path: '/admin/blog' },
  { name: 'Reports', path: '/admin/reports' },
  { name: 'SEO Settings', path: '/admin/seo-settings' },
  { name: 'List Product', path: '/admin/manage-product/edit-product' },
  { name: 'Coupon', path: '/admin/coupon' },
  { name: 'Media', path: '/admin/media' },
  { name: 'Settings', path: '/admin/settings' },
  { name: 'Logout', path: '/admin/logout' },
];

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Header with Menu Icon */}
      <header className="sm:hidden fixed top-0 left-0 w-full bg-gray-900 text-white z-50 flex items-center justify-between p-4 shadow-md">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-screen w-64 fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 sm:static`}
      >
        {/* Logo Section */}
        <div className="p-4 text-center border-b border-gray-700">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`block p-2 rounded hover:bg-gray-700 whitespace-nowrap overflow-hidden truncate ${
                pathname === item.path ? 'bg-gray-700' : ''
              }`}
              onClick={() => setIsSidebarOpen(false)} // Close on click
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
