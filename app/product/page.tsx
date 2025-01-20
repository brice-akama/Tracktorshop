"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { imagegrid } from "../../utils/products";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js

const ProductPage = () => {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category"); // Get the "category" query parameter
  const [visibleImages, setVisibleImages] = useState(23);

  // Extract unique categories
  const categories = Array.from(
    new Set(imagegrid.map((product) => product.category).filter(Boolean))
  ) as string[];

  // Filter products based on the category from the URL
  const filteredProducts = categoryFromUrl
    ? imagegrid.filter((product) => product.category === categoryFromUrl)
    : imagegrid.slice(0, visibleImages);

  return (
    <div className="container mx-auto p-4 mt-20">
      {/* Responsive Layout Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-10">
        {/* Categories Section */}
        <aside className="md:col-span-3 border-b md:border-r md:border-b-0 border-gray-200 pb-4 md:pb-0 md:pr-4">
          <h2 className="font-bold text-lg mb-4 text-center md:text-left mt-8">
            Category
          </h2>
          <ul className="space-y-2 md:space-y-0 md:space-x-2 md:flex md:flex-col">
            {categories.map((category, index) => (
              <li key={index}>
                <a
                  href={`/product?category=${encodeURIComponent(category)}`} // Update the URL with the selected category
                  className={`block w-full text-left py-2 px-4 rounded-lg ${categoryFromUrl === category
                      ? "bg-blue-500 text-white font-bold"
                      : "hover:bg-blue-100 text-gray-700"
                    }`}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Products Section */}
        <main className="md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`} // Navigate to dynamic product details page
              >
                <div
                  className="border border-gray-300 rounded-lg p-4 text-center shadow-sm hover:shadow-lg transition cursor-pointer"
                >
                  <div className="relative w-full h-48 mb-4 group overflow-hidden mt-16">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="rounded-lg object-cover" // This will ensure the image behaves like "cover"
                    />
                  </div>

                  <h3
                    className="font-semibold text-lg md:text-xl truncate w-full overflow-hidden whitespace-nowrap text-ellipsis"
                    title={product.name} // Optional: Shows full name on hover
                  >
                    {product.name}
                  </h3>

                  <p className="text-blue-500 font-bold">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {!categoryFromUrl && visibleImages < imagegrid.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => setVisibleImages((prev) => prev + 10)}
                className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
              >
                Load More
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
