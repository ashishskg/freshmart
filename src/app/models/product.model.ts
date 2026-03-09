// models/product.model.ts

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  mrp: number;
  discount: number;
  unit: string;
  emoji: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isOrganic: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  description: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
}
