'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ReactQRCode from 'react-qr-code';

interface CartItem {
  productId: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [cart, setCart] = useState<{ items: CartItem[] } | null>(null);
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    postalCode: '',                                 // /api/checkout
    region: '',
  });

  const handlePlaceOrder = async () => {
    if (!isAgreed) {
      toast.error('You must agree to the terms.');
      return;
    }
  
    if (!paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }
  
    const orderData = {
      paymentMethod,
      cart,
      billingDetails,
      agreedTerms: isAgreed,
    };
  
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
      console.log("Response data:", data);
  
      if (response.ok) {
        toast.success(`Order placed! Order ID: ${data.orderId}`);
      } else {
        toast.error(data.error || 'Order placement failed.');
      }
    } catch (error) {
      toast.error('Failed to place order.');
    }
  };
  
  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch('/api/cart');
      const data = await response.json();
      if (data.cart) {
        setCart(data.cart);
      }
    };
    fetchCart();
  }, []);

  if (!cart) {
    return <p>Loading cart...</p>;
  }

  const total = cart.items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  const bitcoinWalletAddress = '1BitcoinWalletAddressExample123456';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 mt-10">Billing Details</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
                onChange={(e) => setBillingDetails({ ...billingDetails, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
                onChange={(e) => setBillingDetails({ ...billingDetails, lastName: e.target.value })}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => setBillingDetails({ ...billingDetails, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => setBillingDetails({ ...billingDetails, country: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Postal Code"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
                onChange={(e) => setBillingDetails({ ...billingDetails, postalCode: e.target.value })}
              />
              <input
                type="text"
                placeholder="Region/State"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
                onChange={(e) => setBillingDetails({ ...billingDetails, region: e.target.value })}
              />
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-semibold mb-4">Delivery Method</h2>
          <p className="text-red-600 font-bold">
            ⚠️ Warning: No shipping options are available.{' '}
            <Link href="/contact-us" className="text-blue-600 underline">
              Please contact us
            </Link>{' '}
            for assistance.
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
            <p className="mb-4">Select your preferred payment method for this order.</p>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bitcoin"
                  onChange={() => setPaymentMethod('bitcoin')}
                  className="h-4 w-4"
                />
                Bitcoin
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  onChange={() => setPaymentMethod('paypal')}
                  className="h-4 w-4"
                />
                PayPal (contact support for details)
              </label>
              {paymentMethod === 'paypal' && (
                <p className="text-red-600 font-bold mt-2">
                  Note: Additional fees may apply for PayPal.
                </p>
              )}
              {paymentMethod === 'bitcoin' && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                  <p className="font-bold">Bitcoin Wallet Address:</p>
                  <p className="text-gray-700 break-words">{bitcoinWalletAddress}</p>
                  <div className="mt-4">
                    <ReactQRCode
                      value={bitcoinWalletAddress}
                      size={150}
                      bgColor="#ffffff"
                      fgColor="#000000"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Scan this QR code or copy the wallet address to make your payment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-semibold mb-6">Confirm Order</h2>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4">
                <img
                  src={item.image || '/placeholder.png'}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500">Price: ${item.price}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
            <hr className="my-4 border-gray-300" />
            <p className="text-xl font-bold">Total: ${total}</p>
          </div>

          <div className="mt-8">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="whitespace-nowrap">
                I have read and agreed to the{' '}
                <Link href="/terms-of-use" className="text-blue-600 underline whitespace-nowrap text-base">
                  terms of use
                </Link>
                .
              </span>
            </label>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md mt-4 hover:bg-blue-700 transition"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
