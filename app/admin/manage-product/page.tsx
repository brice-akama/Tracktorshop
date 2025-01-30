"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

// Define the product type
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

const ManageProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editedFields, setEditedFields] = useState<Partial<Product>>({});

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product");
        const data = await response.json();

        if (response.ok) {
          setProducts(data.products);
        } else {
          toast.error("Failed to fetch products");
        }
      } catch (error) {
        toast.error("An error occurred while fetching products");
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (productId: string) => {
    try {
      const response = await fetch(`/api/product?productId=${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Product deleted successfully!");
        setProducts((prev) => prev.filter((product) => product._id !== productId));
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("An error occurred while deleting product");
      console.error(error);
    }
  };

  // Handle product editing
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setEditedFields({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      specialOffer: product.specialOffer,
      popularSet: product.popularSet,
      quantity: product.quantity,
    });
  };

  // Submit edited product details
  const handleSave = async () => {
    if (!editingProduct) return;

    try {
      console.log("Submitting edit for product:", editingProduct._id);
      console.log("Edited fields:", editedFields);

      const formData = new FormData();

      // Append edited fields to formData with explicit type checks
      Object.keys(editedFields).forEach((key) => {
        const value = editedFields[key as keyof Product];

        // Check if value is undefined, if so, skip appending it
        if (value !== undefined) {
          formData.append(key, value.toString()); // Ensure the value is converted to string
        }
      });

      formData.append("productId", editingProduct._id);

      const response = await fetch(`/api/product?productId=${editingProduct._id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        toast.success("Product updated successfully!");

        const updatedProduct = { ...editingProduct, ...editedFields };
        console.log("Updated product:", updatedProduct);

        setProducts((prev) => {
          const updatedProducts = [
            updatedProduct,
            ...prev.filter((product) => product._id !== editingProduct._id),
          ];
          console.log("Updated product list:", updatedProducts);
          return updatedProducts;
        });

        setEditingProduct(null); // Exit edit mode
      } else {
        toast.error("Failed to update product");
        console.log("Failed to update product:", response);
      }
    } catch (error) {
      toast.error("An error occurred while updating product");
      console.error("Error occurred:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2 flex items-center">
                <Image
                  src={product.mainImage}
                  alt={product.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
                <span className="ml-2">{product.name}</span>
              </td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">
                {editingProduct?._id === product._id ? (
                  <div>
                    <input
                      type="text"
                      value={editedFields.name}
                      onChange={(e) => setEditedFields({ ...editedFields, name: e.target.value })}
                      className="mb-2 p-2 border rounded"
                    />
                    <textarea
                      value={editedFields.description}
                      onChange={(e) => setEditedFields({ ...editedFields, description: e.target.value })}
                      className="mb-2 p-2 border rounded"
                    />
                    <input
                      type="number"
                      value={editedFields.price}
                      onChange={(e) => setEditedFields({ ...editedFields, price: parseFloat(e.target.value) })}
                      className="mb-2 p-2 border rounded"
                    />
                    <div className="flex space-x-4 mt-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <Link
                      href={`/admin/manage-product/edit-product/${product._id}`} // Use href for Next.js navigation
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProductPage;
