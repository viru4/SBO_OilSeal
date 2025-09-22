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
