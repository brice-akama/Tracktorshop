// app/product/[productId]/ProductDetailsServer.tsx

import { imagegrid, products, popularSet, diesel, hydraulic } from "../../../utils/products";
import ProductDetails from "./ProductDetails";

// Server-side logic for fetching product data
const ProductDetailsServer = async ({ params }: { params: { productId: string } }) => {
  const productId = parseInt(params.productId);
  const allProducts = [...imagegrid, ...products, ...popularSet, ...diesel, ...hydraulic];

  const product = allProducts.find((p) => p.id === productId);
  if (!product) {
    return <p>Product not found</p>;
  }

  // Filter related products based on the same category
  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
};

export default ProductDetailsServer;
