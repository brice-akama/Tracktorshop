"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

interface SEOFormProps {
  productId: string;
  initialData?: {
    title: string;
    description: string;
    keywords: string[];
    canonical: string;
    productDescription: string;
  };
}

export default function SEOForm({ productId, initialData }: SEOFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [keywords, setKeywords] = useState(initialData?.keywords?.join(", ") || "");
  const [canonical, setCanonical] = useState(initialData?.canonical || "");
  const [productDescription, setProductDescription] = useState(initialData?.productDescription || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/meta-tags/product/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          keywords: keywords.split(",").map((k) => k.trim()),
          canonical,
          productDescription,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "SEO settings saved successfully!");
      } else {
        toast.error(result.error || "An error occurred while saving.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">SEO Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Meta Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Meta Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Keywords (comma-separated)</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Canonical URL</label>
          <input
            type="text"
            value={canonical}
            onChange={(e) => setCanonical(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Product Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full border rounded-lg p-2 h-40 resize"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
}
