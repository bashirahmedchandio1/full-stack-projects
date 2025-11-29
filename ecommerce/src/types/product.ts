export interface Product {
  id: string;
  title: string;
  price: number;
  discountPercentage?: number;
  isOnSale: boolean;
  saleEndsAt?: string; // ISO date for countdown
  category: string;
  imageUrl: string;
  description: string;
}

export type ProductCategory =
  | "wall-art"
  | "canvas-prints"
  | "framed-posters"
  | "abstract-art"
  | "nature-landscape"
  | "vintage-posters"
  | "minimalist-art"
  | "pop-culture";

export interface ProductFilters {
  category?: ProductCategory | string;
  onSale?: boolean;
  search?: string;
}

export interface CreateProductRequest {
  title: string;
  price: number;
  discountPercentage?: number;
  isOnSale: boolean;
  saleEndsAt?: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}
