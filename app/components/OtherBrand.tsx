"use client";

import React, { useState, useEffect } from "react";
import { diesel } from "../../utils/products"; // Import product data from the utils folder
import Image from "next/image"; // Import Image component
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Link from "next/link"; // Import Link for navigation

const OtherBrand = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default to 4 items
  const router = useRouter(); // Use Next.js useRouter hook for navigation

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
      if (startIndex + itemsPerPage < visibleProducts.length) {
        setStartIndex((prev) => prev + 1);
      } else {
        setStartIndex(0); // Reset to the beginning
      }
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [startIndex, itemsPerPage]);

  const handleNext = () => {
    if (startIndex + itemsPerPage < visibleProducts.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleAddToCart = (productId: string | number) => {
    // Assuming you have some cart management logic here to add the product
    // Add product to cart (you can implement cart logic here)
    // Example: cart.addProduct(productId);

    router.push("/cart"); // Navigate to the cart page without reloading
  };

  // Filter only products with tractorBrands: true
  const visibleProducts = diesel.filter(product => product.tractorBrands === true).slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
            className={`text-2xl px-4 ${startIndex === 0 ? "text-gray-400" : "text-gray-800"
              }`}
          >
            &lt;
          </button>

          {/* Products */}
          <div className="flex justify-center gap-6">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="relative border border-gray-300 rounded-lg p-4 w-64 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Product Image */}
                <div className="relative group">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={300}
                    height={300}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="rounded-lg"
                  />

                  {/* Add to Cart Button */}
                  <Link
                    href="/cart"
                    className="absolute bottom-0 left-0 w-full bg-blue-500 text-white px-4 py-2 rounded-b-lg 
                      opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity text-center"
                    onClick={() => handleAddToCart(product.id)} // Handle click event
                  >
                    Add to Cart
                  </Link>
                </div>

                {/* Product Name */}
                <p className="mt-4 text-lg font-semibold text-gray-800">
                  {product.name}
                </p>

                {/* Product Price */}
                <p className="text-md font-bold text-blue-500">
                  {product.price}
                </p>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= visibleProducts.length}
            className={`text-2xl px-4 ${startIndex + itemsPerPage >= visibleProducts.length
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
