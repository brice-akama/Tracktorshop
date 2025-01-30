'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  imageUrl: string;
}

export default function RecentPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog?limit=3');
        const data = await res.json();

        if (Array.isArray(data)) {
          setPosts(
            data.map((post: any) => ({
              id: post._id, // Map _id from the API to id
              title: post.title,
              imageUrl: post.imageUrl,
            }))
          );
        } else {
          console.error('Unexpected API response format:', data);
        }
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-6 mt-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-extrabold mb-4 text-center">Recent Blog Posts</h2>
      {/* Grid with responsive columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="relative w-full h-32 mb-4">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3 className="text-lg font-bold">{post.title}</h3>
            <Link href={`/blog/${post.id}`}>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Read More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
