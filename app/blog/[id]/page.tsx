'use client';



'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface BlogPost {
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  createdAt: string;
}

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const resolvedParams = await params; // Resolve the promise
        setId(resolvedParams.id); // Set the ID
      } catch (error) {
        console.error('Error unwrapping params:', error);
      }
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!id) return; // Ensure the ID is available

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog?id=${id}`);
        const data = await res.json();

        if (data.error) {
          console.error('Error fetching blog post:', data.error);
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.createdAt).toLocaleDateString()} - By {post.author}
      </p>
      <div className="mb-6">
        <div className="relative w-full h-72 mb-4">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover rounded-lg mt-3"
            priority // Optimized loading for the main image
          />
        </div>
        <div className="text-lg text-gray-700">{post.content}</div>
      </div>
      <div className="text-sm text-gray-500">
        <p>Written by {post.author}</p>
      </div>
    </div>
  );
}
