import { SitemapStream, streamToPromise } from 'sitemap';
import { NextApiRequest, NextApiResponse } from 'next';

const Sitemap = async (req: NextApiRequest, res: NextApiResponse) => {
  const sitemap = new SitemapStream({ hostname: 'https://your-website.com' });

  // Add URLs to the sitemap
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/about', changefreq: 'weekly', priority: 0.8 });
  sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.6 });
  
  // You can dynamically fetch URLs from your database, like product pages:
  // const products = await getProducts(); // fetch products from DB
  // products.forEach(product => sitemap.write({ url: `/product/${product.slug}`, changefreq: 'daily', priority: 0.7 }));

  sitemap.end();

  // Send the sitemap XML response
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(await streamToPromise(sitemap));
};

export default Sitemap;
