// components/OrdersList.tsx
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  _id: string;
  paymentMethod: string;
  cart: {
    _id: string;
    guestId: string;
    items: CartItem[];
  };
  total: number;
  billingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    postalCode: string;
    region: string;
  };
  status: string;
  createdAt: string;
}

const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const loadingToastId = toast.loading('Fetching orders...');
        const response = await fetch('/api/checkout', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data.orders);
        toast.dismiss(loadingToastId);
        toast.success('Orders fetched successfully!');
      } catch (error: any) {
        toast.error(error.message || 'Something went wrong while fetching orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Orders List</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h2>
                <span
                  className={`px-3 py-1 text-sm rounded ${
                    order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-gray-700 space-y-2">
                <p>
                  <strong>Payment Method:</strong> {order.paymentMethod}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </p>
                <p>
                  <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Billing Details</h3>
                <p>
                  <strong>Name:</strong> {order.billingDetails.firstName}{' '}
                  {order.billingDetails.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {order.billingDetails.email}
                </p>
                <p>
                  <strong>Phone:</strong> {order.billingDetails.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.billingDetails.address},{' '}
                  {order.billingDetails.region}, {order.billingDetails.country} (
                  {order.billingDetails.postalCode})
                </p>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Cart Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.cart.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p>
                          <strong>Name:</strong> {item.name}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {item.quantity}
                        </p>
                        <p>
                          <strong>Price:</strong> ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersList;
