// app/product/[productId]/page.tsx

import ProductDetailsServer from "./ProductDetailsServer";
import MetaTags from "@/app/components/MetaTags";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  // Await params before using it
  const { productId } = await params;  // Awaiting params before destructuring

  // Construct the page path dynamically
  const pagePath = `/product/${productId}`;

  return (
    <>
      {/* Fetch and inject meta tags for the current product */}
      <MetaTags pagePath={pagePath} />
      {/* Render the product details */}
      <ProductDetailsServer params={{ productId }} />
    </>
  );
};

export default ProductPage;

