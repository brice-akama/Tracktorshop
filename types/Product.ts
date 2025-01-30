// types/Product.ts
export type Product = {
  _id: string;
  name: string;
  category: string;
  mainImage: string;
  images: string[];
  price: number;
  description: string;
  [key: string]: any; // Allow for additional fields
};
