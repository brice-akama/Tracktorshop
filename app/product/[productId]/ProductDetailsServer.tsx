// app/product/[productId]/ProductDetailsServer.tsx
import { ProductDetailsServerProps } from "../../../types/ProductDetailsServerProps"; // Adjust the relative path
import { Product } from "../../../types/Product"; // Adjust the relative path
import ProductDetails from "./ProductDetails";

const ProductDetailsServer = async ({ params }: ProductDetailsServerProps) => {
  const { productId } = await params;  // Awaiting params before destructuring

  try {
    // Fetch product details and related products using the productId
    const productResponse = await fetch(
      `/api/product?productId=${productId}`  // Using relative API path
    );

    if (!productResponse.ok) {
      return <p>Product not found</p>;
    }

    const { product, relatedProducts } = await productResponse.json();

    // Filter related products, excluding the current one, limiting to 4 products
    const filteredRelatedProducts = relatedProducts
      .filter((relatedProduct: Product) => relatedProduct._id !== product._id)
      .slice(0, 4);

    return (
      <ProductDetails
        product={{
          ...product,
          imageUrl: product.mainImage,  // Mapping mainImage to imageUrl
          thumbnails: product.images,  // Mapping images to thumbnails
        }}
        relatedProducts={filteredRelatedProducts}
      />
    );
  } catch (error) {
    console.error("Error fetching product details:", error);
    return <p>Unable to fetch product details. Please try again later.</p>;
  }
};

export default ProductDetailsServer;
