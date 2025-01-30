// types/ProductDetailsServerProps.ts
import { Product } from './Product';  // Import Product type

export type ProductDetailsServerProps = {
  params: {
    productId: string;
  };
};
