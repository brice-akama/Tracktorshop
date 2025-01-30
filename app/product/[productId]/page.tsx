// app/product/[productId]/page.tsx

import ProductDetailsServer from "./ProductDetailsServer";
import MetaTags from "@/app/components/MetaTags";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
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


