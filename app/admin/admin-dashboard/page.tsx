"use client";



// app/admin/admin-dashboard/page.tsx
import React, { useEffect, useState } from 'react';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token is present in cookies
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome to the Admin Dashboard</h1>
          {/* Your admin dashboard content here */}
        </div>
      ) : (
        <div>
          <h1>You need to log in first</h1>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
