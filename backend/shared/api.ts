/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  product?: string;
  quantity?: number | string;
  message: string;
}

export interface ContactResponse {
  ok: boolean;
}

export interface ReviewRequest {
  productRating: number;
  deliveryRating: number;
  responseRating: number;
  name: string;
  email?: string;
  phone?: string;
  comment?: string;
}

export interface ReviewResponse {
  id: string;
  createdAt: string;
  productRating: number;
  deliveryRating: number;
  responseRating: number;
  name: string;
  email?: string;
  phone?: string;
  comment?: string;
}

export interface ReviewStats {
  totalReviews: number;
  averageProductRating: number;
  averageDeliveryRating: number;
  averageResponseRating: number;
  overallRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

// Product interfaces
export interface Product {
  id: string;
  title: string;
  size: string;
  material: string;
  fits: string;
  sku: string;
  category?: string;
  description?: string;
  price?: number;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProductRequest {
  title: string;
  size: string;
  material: string;
  fits: string;
  sku: string;
  category?: string;
  description?: string;
  price?: number;
  in_stock?: boolean;
}

export interface UpdateProductRequest {
  title?: string;
  size?: string;
  material?: string;
  fits?: string;
  sku?: string;
  category?: string;
  description?: string;
  price?: number;
  in_stock?: boolean;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export interface ProductResponse {
  product: Product;
}
