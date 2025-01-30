'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog'); // No need for an ID
        const data = await res.json();
        console.log('API Response:', data);
  
        if (Array.isArray(data)) {
          setPosts(
            data.map((post: any) => ({
              id: post._id,
              title: post.title,
              content: post.content.slice(0, 100) + '...', // Preview of content
              author: post.author,
              imageUrl: post.imageUrl,
              createdAt: new Date(post.createdAt).toISOString(),
            }))
          );
        } else {
          console.error('Unexpected API response format:', data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);
  
  return (
    <div>
      <h1 className="text-3xl font-bold mt-10">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="border rounded-lg shadow-md p-4">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(post.createdAt).toLocaleDateString()} - By {post.author}
              </p>
              <p className="text-gray-700 line-clamp-3">{post.content}</p>
              <Link href={`/blog/${post.id}`}>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Read More
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p>No blog posts available</p>
        )}
      </div>
    </div>
  );
}
