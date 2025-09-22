import { z } from "zod";
import type { ReviewRequest, ReviewResponse, ReviewStats } from "@shared/api";
import { getSupabaseAdmin } from "../services/supabase";

const Table = "reviews";

const Row = z.object({
  id: z.string(),
  created_at: z.string(),
  product_rating: z.number().min(1).max(5),
  delivery_rating: z.number().min(1).max(5),
  response_rating: z.number().min(1).max(5),
  name: z.string(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
});

type RowT = z.infer<typeof Row>;

function map(row: RowT): ReviewResponse {
  return {
    id: row.id,
    createdAt: row.created_at,
    productRating: row.product_rating,
    deliveryRating: row.delivery_rating,
    responseRating: row.response_rating,
    name: row.name,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    comment: row.comment ?? undefined,
  };
}

export async function addReview(
  input: ReviewRequest
): Promise<ReviewResponse> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");
  
  const now = new Date().toISOString();
  const insert = {
    product_rating: input.productRating,
    delivery_rating: input.deliveryRating,
    response_rating: input.responseRating,
    name: input.name,
    email: input.email ?? null,
    phone: input.phone ?? null,
    comment: input.comment ?? null,
    created_at: now,
  };
  
  const { data, error } = await db.from(Table).insert(insert).select().single();
  if (error) throw error;
  return map(Row.parse(data));
}

export async function listReviews(
  limit?: number,
  offset?: number
): Promise<ReviewResponse[]> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");
  
  let q = db.from(Table)
    .select("*")
    .order("created_at", { ascending: false });
    
  if (limit) q = q.limit(limit);
  if (offset) q = q.range(offset, offset + (limit || 50) - 1);
  
  const { data, error } = await q;
  if (error) throw error;
  return (data as any[]).map((r) => map(Row.parse(r)));
}

export async function getReviewStats(): Promise<ReviewStats> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");
  
  const { data, error } = await db.from(Table).select("*");
  if (error) throw error;
  
  const reviews = (data as any[]).map((r) => map(Row.parse(r)));
  
  if (reviews.length === 0) {
    return {
      totalReviews: 0,
      averageProductRating: 0,
      averageDeliveryRating: 0,
      averageResponseRating: 0,
      overallRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  }
  
  const totalReviews = reviews.length;
  
  // Calculate averages
  const avgProductRating = reviews.reduce((sum, r) => sum + r.productRating, 0) / totalReviews;
  const avgDeliveryRating = reviews.reduce((sum, r) => sum + r.deliveryRating, 0) / totalReviews;
  const avgResponseRating = reviews.reduce((sum, r) => sum + r.responseRating, 0) / totalReviews;
  
  // Calculate overall rating as average of all three categories
  const overallRating = (avgProductRating + avgDeliveryRating + avgResponseRating) / 3;
  
  // Calculate rating distribution based on overall rating per review
  const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach(review => {
    const reviewOverall = (review.productRating + review.deliveryRating + review.responseRating) / 3;
    const roundedRating = Math.round(reviewOverall) as 1 | 2 | 3 | 4 | 5;
    ratingDistribution[roundedRating]++;
  });
  
  return {
    totalReviews,
    averageProductRating: Number(avgProductRating.toFixed(2)),
    averageDeliveryRating: Number(avgDeliveryRating.toFixed(2)),
    averageResponseRating: Number(avgResponseRating.toFixed(2)),
    overallRating: Number(overallRating.toFixed(2)),
    ratingDistribution
  };
}