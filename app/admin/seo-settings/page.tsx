"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

// Ensure the interface is properly defined and exported
export interface SEOFormProps {
  productId: string;
  initialData?: {
    title: string;
    description: string;
    keywords: string[];
    canonical: string;
    productDescription: string;
  };
}

const SEOForm = ({ productId, initialData }: SEOFormProps) => {
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
        {/* Add your form fields here */}
      </form>
    </div>
  );
};

export default SEOForm;
