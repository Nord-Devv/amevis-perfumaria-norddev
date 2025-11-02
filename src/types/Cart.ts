import type { Product } from "./Product";

export interface Cart {
  name: string;
  brand: string;
  price: string;
  image: string;
  category: string;
  productType?: string;
  quantity: number;
}
export interface CartItem extends
  Omit<Product, "description" | "notes" | "subcategory"> { quantity: number }
