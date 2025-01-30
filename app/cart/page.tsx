
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type Cart = {
  guestId: string;
  items: CartItem[];
};

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [newTotal, setNewTotal] = useState(100); // Example total


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch cart data.');
        setCart(data.cart || { guestId: '', items: [] });
      } catch (error: any) {
        setError(error.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const applyCoupon = async () => {
    try {
      const response = await fetch('/api/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coupon }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Coupon applied successfully!');
        setDiscount(data.discount);
        setNewTotal(data.newTotal);
      } else {
        toast.error(data.message || 'Invalid coupon');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };




  const handleRemoveItem = async (productId: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
        credentials: 'include',
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to remove item.');
  
      // Update the local state for the cart after removing the item
      setCart((prevCart) =>
        prevCart
          ? { ...prevCart, items: prevCart.items.filter((item) => item.productId !== productId) }
          : null
      );
  
      // Trigger cart update event to update the cart count in Navbar
      window.dispatchEvent(new Event('cartUpdated'));
  
    } catch (error: any) {
      setError(error.message || 'Failed to remove item.');
    }
  };
  
  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update quantity.');
      setCart((prevCart) =>
        prevCart
          ? {
              ...prevCart,
              items: prevCart.items.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
              ),
            }
          : null
      );
    } catch (error: any) {
      setError(error.message || 'Failed to update quantity.');
    }
  };

  if (loading) return <p>Loading your cart...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!cart || cart.items.length === 0)
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-bold text-black">Your cart is empty</h2>
        <Link href="/product" className="text-blue-500 underline mt-4">
          Continue shopping
        </Link>
      </div>
    );

  const calculateSubtotal = () =>
    cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold mt-20 ">Shopping Cart</h1>
      <div className="space-y-6">
        {/* Cart Details Section */}
        <div className="space-y-6">
          {cart.items.map((item) => (
            <div key={item.productId} className="flex flex-col md:flex-row items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div>
                  
                  <div className="flex items-center space-x-2 ">
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded-sm text-sm"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded-sm text-sm "
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <p className="font-bold mt-4 md:mt-0">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => handleRemoveItem(item.productId)}
                className="px-4 py-2 bg-red-500 text-white rounded mt-4 md:mt-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Coupon and Cart Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Coupon Section */}
          <div className="flex flex-col md:flex-row items-center space-x-4 border p-2 rounded">
  <input
    type="text"
    value={coupon}
    onChange={(e) => setCoupon(e.target.value)}
    placeholder="Enter coupon code"
    className="flex-grow border p-2 rounded-sm text-sm w-full md:w-1/2 lg:w-1/2" // Adjust width for medium and larger devices
  />
  <button  onClick={applyCoupon} className="px-4 py-2 bg-blue-500 text-white rounded-sm text-sm mt-2 md:mt-0 md:ml-2">
  SUBMIT
  </button>
  <p className="mt-4 whitespace-nowrap">Discount: ${discount}</p>
  <p  className="mt-4 whitespace-nowrap">New Total: ${newTotal}</p>
</div>

          {/* Cart Summary Section */}
          <div className="p-4 border rounded shadow">
            <h3 className="font-bold text-lg mb-4">Cart Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded">
            <Link href="/checkout" prefetch={true} className="btn">
  Proceed to Checkout
</Link>

            </button>
            <Link href="/product" className="text-blue-500 no-underline mt-4 block text-center">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

