"use client";


import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Keep the Image import
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]); // For storing Base64 images
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    specialOffer: false,
    popularSet: false,
    hydraulicPart: false,
    tractorBrands: false,
  });

  const router = useRouter();
  

  // Utility function to convert file to Base64
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = e.target.files;
    if (files) {
      const base64Array = await Promise.all(Array.from(files).map(fileToBase64));

      if (type === "main") {
        setMainImage(base64Array[0]); // Set the main image
        console.log("Main Image (Base64):", base64Array[0]);
      } else {
        setImages((prevImages) => {
          const newImages = [...prevImages, ...base64Array];
          console.log("Additional Images (Base64):", newImages);
          return newImages;
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement; // Type assertion here
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("category", formData.category);
    productData.append("price", formData.price);
    productData.append("quantity", formData.quantity);
    productData.append("description", formData.description);
    productData.append("specialOffer", String(formData.specialOffer));
    productData.append("popularSet", String(formData.popularSet));
    productData.append("hydraulicPart", String(formData.hydraulicPart));
    productData.append("tractorBrands", String(formData.tractorBrands));

    if (mainImage) productData.append("mainImage", mainImage); // Append main image (Base64)
    images.forEach((image, index) => productData.append(`images[${index}]`, image)); // Append additional images (Base64)

    console.log("Product Data Prepared for API:", {
      ...formData,
      mainImage,
      images,
    });

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        body: productData,
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        router.push("/admin/admin-dashboard");
      } else {
        toast.error("Failed to add product! Please try again.");
        console.error("Failed to add product");
      }
    } catch (error) {
      toast.error("An error occurred while adding the product.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Upload Images</label>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "main")}
              />
              {mainImage && <Image src={mainImage} alt="Main Product" width={200} height={200} className="w-full h-32 object-cover mt-2" />}
            </div>
            {Array(3).fill(null).map((_, index) => (
              <div key={index} className="col-span-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "additional")}
                />
                {images[index] && <Image src={images[index]} alt={`Product Image ${index + 1}`} width={200} height={200} className="w-full h-32 object-cover mt-2" />}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Choose Your Options</label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="specialOffer"
                checked={formData.specialOffer}
                onChange={handleInputChange}
              />
              <span className="ml-2">Special Offer</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="popularSet"
                checked={formData.popularSet}
                onChange={handleInputChange}
              />
              <span className="ml-2">Popular Set</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="hydraulicPart"
                checked={formData.hydraulicPart}
                onChange={handleInputChange}
              />
              <span className="ml-2">Hydraulic Part</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="tractorBrands"
                checked={formData.tractorBrands}
                onChange={handleInputChange}
              />
              <span className="ml-2">Tractor Brands</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
