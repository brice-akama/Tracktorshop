"use client";

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image'; // Import Image component from next/image

export default function CreateBlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState<File | null>(null); // State for selected image
  const [preview, setPreview] = useState<string | null>(null); // State for image preview

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate a local preview URL
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);

    if (image) {
      formData.append('image', image); // Append the image file
    }

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        toast.success('Blog post created successfully');
        setTitle('');
        setContent('');
        setAuthor('');
        setImage(null);
        setPreview(null);
      } else {
        toast.error('Failed to create blog post');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {preview && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Image Preview:</p>
              {/* Using next/image for optimized image loading */}
              <Image
                src={preview}
                alt="Preview"
                className="max-w-xs rounded-lg border border-gray-300"
                width={300} // Set a specific width
                height={200} // Set a specific height
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
