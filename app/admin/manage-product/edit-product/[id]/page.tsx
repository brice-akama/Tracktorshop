"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter for navigation
import { toast } from "react-hot-toast";
import Image from "next/image";  // Import Image from next/image

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  specialOffer: boolean;
  popularSet: boolean;
  mainImage: string;
  quantity: number;
};

const EditProductPage = () => {
  const { id } = useParams(); // Get the dynamic segment from the URL
  const router = useRouter(); // Initialize router
  const [product, setProduct] = useState<Product | null>(null);
  const [editedFields, setEditedFields] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState(true);

  const [seoFields, setSeoFields] = useState({
    title: "",
    description: "",
    keywords: "",
    canonical: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        toast.error("No product ID found in the URL");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/product?productId=${id}`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data.product);
          setEditedFields({
            name: data.product.name,
            description: data.product.description,
            price: data.product.price,
            category: data.product.category,
            specialOffer: data.product.specialOffer,
            popularSet: data.product.popularSet,
            mainImage: data.product.mainImage,
            quantity: data.product.quantity,
          });

          // Fetch SEO data
          const seoResponse = await fetch(`/api/meta-tags/product/${id}`);
          const seoData = await seoResponse.json();
          if (seoResponse.ok) {
            setSeoFields({
              title: seoData.title,
              description: seoData.description,
              keywords: seoData.keywords.join(", "), // Assuming the keywords are an array
              canonical: seoData.canonical,
            });
          } else {
            toast.error("Failed to fetch SEO data");
          }
        } else {
          toast.error("Failed to fetch product");
        }
      } catch (error) {
        toast.error("An error occurred while fetching the product");
        console.error("Error occurred:", error);  // Logs the error
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // Append edited fields to formData
      Object.keys(editedFields).forEach((key) => {
        const value = editedFields[key as keyof Product];
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      formData.append("productId", product._id);

      const response = await fetch(`/api/product?productId=${product._id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        toast.success("Product updated successfully!");
        router.push("/admin/manage-product"); // Redirect to the manage products page
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      toast.error("An error occurred while updating product");
      console.error("Error occurred:", error);
    }
  };

  const handleSeoSave = async () => {
    try {
      const seoData = {
        title: seoFields.title,
        description: seoFields.description,
        keywords: seoFields.keywords.split(",").map((keyword) => keyword.trim()),
        canonical: seoFields.canonical,
        productDescription: editedFields.description, // Using the product description here
      };

      const response = await fetch(`/api/meta-tags/product/${product._id}`, {
        method: "POST",
        body: JSON.stringify(seoData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("SEO settings saved successfully!");
      } else {
        toast.error("Failed to save SEO settings");
      }
    } catch (error) {
      toast.error("An error occurred while saving SEO settings");
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={editedFields.name || ""}
            onChange={(e) => setEditedFields({ ...editedFields, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={editedFields.description || ""}
            onChange={(e) =>
              setEditedFields({ ...editedFields, description: e.target.value })
            }
            className="w-full p-2 border rounded"
            rows={4}
          ></textarea>
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            value={editedFields.mainImage || ""}
            onChange={(e) => setEditedFields({ ...editedFields, mainImage: e.target.value })}
            className="w-full p-2 border rounded"
          />
          {editedFields.mainImage && (
            <Image
              src={editedFields.mainImage}
              alt="Product Preview"
              width={128}
              height={128}
              className="mt-2 object-cover rounded border"
            />
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={editedFields.price || ""}
            onChange={(e) => setEditedFields({ ...editedFields, price: parseFloat(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            value={editedFields.category || ""}
            onChange={(e) => setEditedFields({ ...editedFields, category: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Special Offer */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Special Offer</label>
          <input
            type="checkbox"
            checked={editedFields.specialOffer || false}
            onChange={(e) => setEditedFields({ ...editedFields, specialOffer: e.target.checked })}
            className="ml-2"
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            value={editedFields.quantity || ""}
            onChange={(e) => setEditedFields({ ...editedFields, quantity: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Product
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">SEO Settings</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSeoSave();
          }}
        >
          {/* SEO Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">SEO Title</label>
            <input
              type="text"
              value={seoFields.title}
              onChange={(e) => setSeoFields({ ...seoFields, title: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* SEO Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">SEO Description</label>
            <textarea
              value={seoFields.description}
              onChange={(e) => setSeoFields({ ...seoFields, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows={4}
            ></textarea>
          </div>

          {/* SEO Keywords */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">SEO Keywords (comma-separated)</label>
            <input
              type="text"
              value={seoFields.keywords}
              onChange={(e) => setSeoFields({ ...seoFields, keywords: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* SEO Canonical */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Canonical URL</label>
            <input
              type="text"
              value={seoFields.canonical}
              onChange={(e) => setSeoFields({ ...seoFields, canonical: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save SEO Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
