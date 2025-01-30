"use client";

import React, { useEffect, useState } from 'react';

interface Metrics {
  users: number;
  orders: number;
  sales: number;
  traffic: number;
  openTickets: number;
  totalProducts: number;
}

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  

  // Check authentication token
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    setIsAuthenticated(!!token);
  }, []);

  // Fetch metrics from API
  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true); // Ensure loading state is set before fetching
      try {
        const response = await fetch('/api/metrics');
        const textData = await response.text(); // Read raw response text

        // Safely parse JSON
        try {
          const data = JSON.parse(textData);
          setMetrics(data);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          setMetrics(null); // Handle invalid JSON gracefully
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setMetrics(null); // Handle fetch errors gracefully
      } finally {
        setLoading(false); // Ensure loading stops after attempt
      }
    };

    if (isAuthenticated) {
      fetchMetrics();
    }
  }, [isAuthenticated]); // Dependency ensures this runs after authentication is checked

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {metrics ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700">Total Users</h2>
                <p className="text-3xl font-bold text-blue-600">{metrics.users}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700">Total Orders</h2>
                <p className="text-3xl font-bold text-green-600">{metrics.orders}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700">Total Sales</h2>
                <p className="text-3xl font-bold text-yellow-600">${metrics.sales}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700">Website Traffic</h2>
                <p className="text-3xl font-bold text-purple-600">{metrics.traffic}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700">Open Tickets</h2>
                <p className="text-3xl font-bold text-red-600">{metrics.openTickets}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700">Total Products</h2>
                <p className="text-3xl font-bold text-teal-600">{metrics.totalProducts}</p>
              </div>
            </>
          ) : (
            <p>Error loading metrics. Please try again later.</p>
          )}
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
