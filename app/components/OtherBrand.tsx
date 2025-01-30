

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import Image component
import Link from "next/link";
import { toast } from 'react-hot-toast'; // Import Link component for navigation

// Define the types for product data
interface Popular {
  _id: string;
  name: string;
  price: number;
  mainImage: string;
  description: string;
  tractorBrands: boolean;
}

const OtherBrand = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [tractorBrandsProducts, setTractorBrandsProducts] = useState<Popular[]>([]); 
  const router = useRouter();

  // Fetch special offer products from the backend API
  useEffect(() => {
    const fetchtractorBrands = async () => {
      try {
        const response = await fetch("/api/product?tractorBrands=true"); // Your API endpoint
        if (response.ok) {
          const data = await response.json();
          setTractorBrandsProducts(data.products); // Set fetched data to state
        } else {
          console.error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchtractorBrands();
  }, []);

  // Update itemsPerPage based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(4); // Large screens
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2); // Medium screens
      } else {
        setItemsPerPage(1); // Small screens
      }
    };

    updateItemsPerPage(); // Initial setup
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Auto-shift the carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (startIndex + itemsPerPage < tractorBrandsProducts.length) {
        setStartIndex((prev) => prev + 1);
      } else {
        setStartIndex(0); // Reset to the beginning
      }
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [startIndex, itemsPerPage, tractorBrandsProducts.length]); // Added dependency on tractorBrandsProducts.length

  const handleNext = () => {
    if (startIndex + itemsPerPage < tractorBrandsProducts.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleProducts = tractorBrandsProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle Add to Cart action
  const handleAddToCart = async (product: Popular) => {  // Accept the product as a parameter
    const cartItem = {
      productId: product._id,
      quantity: 1,  // Fixed quantity, as it's not being used for dynamic updates
    };
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error, { position: 'top-center', duration: 3000 });
      } else {
        toast.success('Item added to cart!', { position: 'top-center', duration: 3000 });
        window.dispatchEvent(new Event('cartUpdated'));
        router.push('/cart');
      }
    } catch (err) {
      toast.error('Failed to add item to cart. Please try again later.', { position: 'top-center', duration: 3000 });
    }
  };

  return (
    <div className="w-full py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          OTHER TRACTOR BRANDS
        </h2>

        <div className="flex justify-between items-center">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={startIndex === 0}
            className={`text-2xl px-4 ${startIndex === 0 ? "text-gray-400" : "text-gray-800"}`}
          >
            &lt;
          </button>

          {/* Products */}
          <div className="flex justify-center gap-6">
            {visibleProducts.map((product) => (
              <div
                key={product._id}
                className="relative border border-gray-300 rounded-lg p-4 w-64 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Product Image - Clickable to Product Details Page */}
                <Link href={`/product/${product._id}`}>
                  <div className="relative group cursor-pointer">
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="rounded-lg object-cover w-full h-auto"
                      sizes="(max-width: 768px) 100vw, 300px" // Ensure responsive scaling
                    />

                    {/* Add to Cart Button */}
                    <button
                      className="absolute bottom-0 left-0 w-full bg-blue-500 text-white px-4 py-2 rounded-b-lg 
                      opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity text-center"
                      onClick={() => handleAddToCart(product)}  // Handle click event
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>

                {/* Product Name */}
                <p className="mt-4 text-lg font-semibold text-gray-800">
                  {product.name}
                </p>

                {/* Product Price */}
                <p className="text-md font-bold text-blue-500">
                  ${product.price}
                </p>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= tractorBrandsProducts.length}
            className={`text-2xl px-4 ${startIndex + itemsPerPage >= tractorBrandsProducts.length
              ? "text-gray-400"
              : "text-gray-800"
              }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherBrand;
