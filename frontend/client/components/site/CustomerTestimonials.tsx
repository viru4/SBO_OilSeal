import { useState, useEffect, useCallback, useMemo } from "react";
import { StarDisplay } from "@/components/ui/star-display";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import type { ReviewResponse } from "@shared/api";
import "./customer-testimonials.css";

interface CustomerTestimonialsProps {
  limit?: number;
  className?: string;
}

export function CustomerTestimonials({ limit = 6, className = "" }: CustomerTestimonialsProps) {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchReviews = useCallback(async (signal: AbortSignal) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reviews?limit=${limit}`, { signal });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.statusText}`);
      }
      
      const data: ReviewResponse[] = await response.json();
      setReviews(data);
      setError(null);
      setRetryCount(0);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Request was cancelled, don't update state
      }
      
      console.error('Error fetching reviews:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch reviews';
      setError(errorMessage);
      
      // Auto-retry up to 3 times with exponential backoff
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, Math.pow(2, retryCount) * 1000);
      }
    } finally {
      setLoading(false);
    }
  }, [limit, retryCount]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchReviews(abortController.signal);
    
    return () => {
      abortController.abort();
    };
  }, [fetchReviews]);

  // Memoize processed review data
  const processedReviews = useMemo(() => {
    return reviews.map(review => ({
      ...review,
      overallRating: (review.productRating + review.deliveryRating + review.responseRating) / 3,
      formattedDate: format(new Date(review.createdAt), "MMM d, yyyy")
    }));
  }, [reviews]);

  if (loading) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-sm text-muted-foreground mt-2">Loading customer reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (processedReviews.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-sm text-muted-foreground">
          No customer reviews available yet.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processedReviews.map((review) => {
          return (
            <Card key={review.id} className="h-full hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6 flex flex-col h-full">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-6 w-6 text-primary/60" />
                </div>

                {/* Review Content */}
                <div className="flex-grow">
                  {/* Overall Rating */}
                  <div className="mb-3">
                    <StarDisplay rating={review.overallRating} size="sm" showValue className="mb-2" />
                  </div>

                  {/* Comment */}
                  {review.comment && (
                    <p className="text-muted-foreground text-sm mb-4 italic max-h-16 overflow-hidden">
                      "{review.comment}"
                    </p>
                  )}

                  {/* Individual Ratings */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Product Quality:</span>
                      <StarDisplay rating={review.productRating} size="sm" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Delivery:</span>
                      <StarDisplay rating={review.deliveryRating} size="sm" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Service:</span>
                      <StarDisplay rating={review.responseRating} size="sm" />
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="mt-4 pt-4 border-t border-muted flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span className="font-medium">{review.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {review.formattedDate}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}