// app/product/[productId]/ProductDetails.tsx
'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReviewForm from './reviewForm';
import ReviewList from "./reviewList";
import { toast } from 'react-hot-toast'; 
import MetaTags from "@/app/components/MetaTags";

// Define Product and Props types
type Product = {
  _id: string;
  name: string;
  price: string;
  mainImage: string;
  description: string;
  category?: string;
  images: string[];
};

type ProductDetailsProps = {
  product: Product;
  relatedProducts: Product[];
};

const ProductDetails = ({ product, relatedProducts }: ProductDetailsProps) => {
  const [mainImage, setMainImage] = useState(product.mainImage);
  const [quantity, setQuantity] = useState(1);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [isReviewListVisible, setIsReviewListVisible] = useState(false);
  
  const router = useRouter();

  // Toggle Review Form visibility
  const toggleReviewForm = () => {
    setIsReviewFormVisible((prev) => !prev);
  };

  // Toggle Review List visibility
  const toggleReviewList = () => {
    setIsReviewListVisible(!isReviewListVisible);
  };

  // Handle Add to Cart action
  const handleAddToCart = async () => {
    const cartItem = {
      productId: product._id,
      quantity,
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
    } catch {
      toast.error('Failed to add item to cart. Please try again later.', { position: 'top-center', duration: 3000 });
   }
   
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10 lg:pl-6 lg:ml-17">
      {/* Meta Tags for SEO */}
      <MetaTags pagePath={`/product/${product._id}`} /> 

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": product.mainImage,
            "description": product.description,
            "sku": product._id,
            "offers": {
              "@type": "Offer",
              "url": `/product/${product._id}`,
              "priceCurrency": "USD",
              "price": product.price,
              "priceValidUntil": "2025-12-31",
              "itemCondition": "https://schema.org/NewCondition",
              "availability": "https://schema.org/InStock",
            },
          }),
        }}
      ></script>

      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row gap-8 mt-10">
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
            {[product.mainImage, ...product.images].map((image, index) => (
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
              onClick={handleAddToCart}
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

      {/* Customer Reviews Section */}
      <div className="mt-12">
        <h2
          className="text-xl font-bold mb-4 cursor-pointer text-blue-600"
          onClick={toggleReviewList}
        >
          Customer Reviews
        </h2>
        {isReviewListVisible && <ReviewList productId={product._id} />}
        <div className="mt-4">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={toggleReviewForm}
          >
            {isReviewFormVisible ? 'Hide Review Form' : 'Write a Review'}
          </button>
          {isReviewFormVisible && <ReviewForm productId={String(product._id)} />}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-center mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct._id}
              className="border rounded-md p-2 group relative"
            >
              <Image
                src={relatedProduct.mainImage}
                alt={relatedProduct.name}
                width={200}
                height={200}
                className="object-cover w-full h-40 group-hover:scale-105 transition-transform"
              />
              <h3 className="text-lg font-semibold mt-2">{relatedProduct.name}</h3>
              <p className="text-gray-600">{relatedProduct.price}</p>
              <Link
                href={`/product/${relatedProduct._id}`}
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
