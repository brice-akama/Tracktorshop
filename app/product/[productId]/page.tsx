// app/product/[productId]/page.tsx

import ProductDetailsServer from "./ProductDetailsServer";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  return <ProductDetailsServer params={params} />;
};

export default ProductPage;
