"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Define Product type
type Product = {
    _id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    specialOffer: boolean;
    popularSet: boolean;
    hydraulicPart: boolean;
    tractorBrands: boolean;
    mainImage: string;
    images: string[];
    createdAt: string;
};

const ProductPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [visibleImages, setVisibleImages] = useState(23);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/product");
                const data = await response.json();

                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    console.error("Unexpected API response:", data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const categories = Array.from(
        new Set(products.map((product) => product.category).filter(Boolean))
    );

    const handleCategoryClick = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
            router.push("/product");
        } else {
            setSelectedCategory(category);
            router.push(`/product?category=${encodeURIComponent(category)}`);
        }
    };

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products.slice(0, visibleImages);

    return (
        <div className="container mx-auto p-4 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-10">
                <aside className="md:col-span-3 border-b md:border-r md:border-b-0 border-gray-200 pb-4 md:pb-0 md:pr-4">
                    <h2 className="font-bold text-lg mb-4 text-center md:text-left mt-8">
                        Category
                    </h2>
                    <ul className="space-y-2 md:space-y-0 md:space-x-2 md:flex md:flex-col">
                        {categories.map((category, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleCategoryClick(category)}
                                    className={`block w-full text-left py-2 px-4 rounded-lg ${
                                        selectedCategory === category
                                            ? "bg-blue-500 text-white font-bold"
                                            : "hover:bg-blue-100 text-gray-700"
                                    }`}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="md:col-span-9">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {filteredProducts.map((product) => (
                            <Link key={product._id} href={`/product/${product._id}`}>
                                <div className="border border-gray-300 rounded-lg p-4 text-center shadow-sm hover:shadow-lg transition cursor-pointer">
                                    <div className="relative w-full h-48 mb-4 group overflow-hidden mt-16">
                                        <Image
                                            src={product.mainImage}
                                            alt={product.name}
                                            width={300}
                                            height={300}
                                            className="rounded-lg object-cover"
                                        />
                                    </div>

                                    <h3
                                        className="font-semibold text-lg md:text-xl truncate w-full overflow-hidden whitespace-nowrap text-ellipsis"
                                        title={product.name}
                                    >
                                        {product.name}
                                    </h3>

                                    <p className="text-blue-500 font-bold">
                                        ${product.price}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {!selectedCategory && visibleImages < products.length && (
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

export default function ProductPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductPage />
        </Suspense>
    );
}
