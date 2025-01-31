// app/product/[productId]/page.tsx

import { NextPage } from 'next';
import ProductDetailsServer from "./ProductDetailsServer";
import MetaTags from "@/app/components/MetaTags";

interface ProductPageProps {
  params: { productId: string };
}

// Use NextPage to automatically type `params`
const ProductPage: NextPage<ProductPageProps> = async ({ params }) => {
  const { productId } = params; // No need to await params

  const pagePath = `/product/${productId}`;

  return (
    <>
      <MetaTags pagePath={pagePath} />
      <ProductDetailsServer params={{ productId }} />
    </>
  );
};

export default ProductPage;




