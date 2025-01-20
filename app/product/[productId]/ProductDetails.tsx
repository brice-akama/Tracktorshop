// app/product/[productId]/ProductDetails.tsx
'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import ReviewForm from './reviewForm';

type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  category?: string;
  thumbnails: string[];
};

type ProductDetailsProps = {
  product: Product;
  relatedProducts: Product[];
};

const ProductDetails = ({ product, relatedProducts }: ProductDetailsProps) => {
  const [mainImage, setMainImage] = useState(product.imageUrl);
  const [quantity, setQuantity] = useState(1); // Track the selected quantity
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const router = useRouter(); // Initialize the useRouter hook

  // Function to toggle the visibility of the review form
  const toggleReviewForm = () => {
    setIsReviewFormVisible((prev) => !prev);
  };

  // Handle Add to Cart functionality
  const handleAddToCart = () => {
    // Simulate adding the product to the cart
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl,
    };

    // Save the cart item to localStorage or your desired state management
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    localStorage.setItem('cart', JSON.stringify([...existingCart, cartItem]));

    // Navigate to the cart page
    router.push('/cart');
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10 lg:pl-6 lg:ml-17">
      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        {/* Left Section: Images */}
        <div className="flex-1 flex flex-col gap-4 mt-10">
          <div className="border rounded-md mt-8">
            <Image
              src={mainImage}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-cover md:w-[450px] mt-8"
            />
          </div>
          <div className="flex gap-4">
            {[product.imageUrl, ...product.thumbnails].map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImage(image)}
                className="border rounded-md overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={120}
                  height={120}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Product Info */}
        <div className="flex-1 mt-12">
          <h1 className="text-3xl font-bold mt-8">{product.name}</h1>
          <p className="text-xl font-semibold mt-4">{product.price}</p>
          <div className="mt-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 block w-16 border rounded-md px-2 py-1 text-center"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handleAddToCart} // Attach the click handler
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Product Description</h2>
        <p>{product.description}</p>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2
          className="text-xl font-bold mb-4 cursor-pointer text-blue-600"
          onClick={toggleReviewForm}
        >
          Customer Reviews
        </h2>
        <p className="text-gray-500 mt-4">No reviews yet. Be the first to write a review!</p>
        {isReviewFormVisible && <ReviewForm productId={String(product.id)} />}
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-center mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="border rounded-md p-2 group relative"
            >
              <Image
                src={relatedProduct.imageUrl}
                alt={relatedProduct.name}
                width={200}
                height={200}
                className="object-cover w-full h-40 group-hover:scale-105 transition-transform"
              />
              <h3 className="text-lg font-semibold mt-2">{relatedProduct.name}</h3>
              <p className="text-gray-600">{relatedProduct.price}</p>
              <Link
                href={`/product/${relatedProduct.id}`}
                className="absolute inset-0 z-10"
                aria-label={`View details of ${relatedProduct.name}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
