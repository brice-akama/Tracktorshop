'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';

interface MetaTag {
  title: string;
  description: string;
  keywords?: string[]; // Optional to prevent errors
  canonical: string;
  robots: string;
  openGraph?: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
}

const MetaTags = ({ pagePath }: { pagePath: string }) => {
  const [metaTags, setMetaTags] = useState<MetaTag | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch meta tags from the API route
    fetch(`/api/meta-tags${pagePath.startsWith('/') ? pagePath : `/${pagePath}`}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          console.error("Meta tags data is empty or invalid", data);
          setMetaTags(null);
        } else {
          setMetaTags(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching meta tags:', error);
        setLoading(false);
      });
  }, [pagePath]);

  if (loading) return <div>Loading...</div>;
  if (!metaTags) return <div>Error loading meta tags</div>;

  return (
    <Head>
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      <meta name="keywords" content={metaTags?.keywords?.join(', ') || ''} />
      <meta name="robots" content={metaTags.robots} />
      <link rel="canonical" href={metaTags.canonical} />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={metaTags?.openGraph?.title || ''} />
      <meta property="og:description" content={metaTags?.openGraph?.description || ''} />
      <meta property="og:image" content={metaTags?.openGraph?.image || ''} />
      <meta property="og:url" content={metaTags?.openGraph?.url || ''} />
    </Head>
  );
};

export default MetaTags;
