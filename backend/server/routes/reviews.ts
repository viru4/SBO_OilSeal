import { RequestHandler } from "express";
import { z } from "zod";
import { addReview, listReviews, getReviewStats } from "../store/reviews-supabase";

const reviewSchema = z.object({
  productRating: z.number().min(1).max(5),
  deliveryRating: z.number().min(1).max(5),
  responseRating: z.number().min(1).max(5),
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  comment: z.string().optional()
});

// Validation that requires either email OR phone
const validateContactInfo = (data: any) => {
  if (!data.email && !data.phone) {
    throw new Error("Either email or phone must be provided");
  }
  return data;
};

export const handleAddReview: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const validationResult = reviewSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: "Invalid input", 
        details: validationResult.error.format() 
      });
    }
    
    // Ensure either email or phone is provided
    try {
      validateContactInfo(validationResult.data);
    } catch (error) {
      return res.status(400).json({ 
        error: (error as Error).message 
      });
    }
    
    // Add review to database
    const review = await addReview(validationResult.data);
    res.status(201).json(review);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
};

export const handleListReviews: RequestHandler = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;
    
    const reviews = await listReviews(limit, offset);
    res.json(reviews);
  } catch (error) {
    console.error("Error listing reviews:", error);
    res.status(500).json({ error: "Failed to list reviews" });
  }
};

export const handleGetReviewStats: RequestHandler = async (_req, res) => {
  try {
    const stats = await getReviewStats();
    res.json(stats);
  } catch (error) {
    console.error("Error getting review stats:", error);
    res.status(500).json({ error: "Failed to get review stats" });
  }
};