import { useState, useEffect, useCallback, useMemo } from "react";
import { StarDisplay } from "@/components/ui/star-display";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Award, Star } from "lucide-react";
import type { ReviewStats } from "@shared/api";

export function ReviewsStats() {
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchStats = useCallback(async (signal: AbortSignal) => {
    try {
      setLoading(true);
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
      const response = await fetch(`${API_BASE_URL}/api/reviews/stats`, { signal });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch review stats: ${response.statusText}`);
      }
      
      const data: ReviewStats = await response.json();
      setStats(data);
      setError(null);
      setRetryCount(0);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Request was cancelled, don't update state
      }
      
      console.error('Error fetching review stats:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch review stats';
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
  }, [retryCount]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchStats(abortController.signal);
    
    return () => {
      abortController.abort();
    };
  }, [fetchStats]);

  // Memoize the rating distribution rendering
  const ratingDistributionItems = useMemo(() => {
    if (!stats) return [];
    
    return [5, 4, 3, 2, 1].map(rating => {
      const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
      const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
      
      return {
        rating,
        count,
        percentage
      };
    });
  }, [stats]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-sm text-muted-foreground mt-2">Loading reviews...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">
          {error || "No review data available"}
        </p>
      </div>
    );
  }

  if (stats.totalReviews === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">
          No reviews available yet. Be the first to leave a review!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {/* Overall Rating Display */}
      <div className="text-center">
        <div className="mb-4">
          <div className="text-4xl font-bold text-primary mb-2">
            {stats.overallRating.toFixed(1)}
          </div>
          <StarDisplay 
            rating={stats.overallRating} 
            size="lg" 
            className="justify-center mb-2"
          />
          <p className="text-sm text-muted-foreground">
            Based on {stats.totalReviews} customer reviews
          </p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-primary/10">
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary mb-1">
              {stats.averageProductRating.toFixed(1)}
            </div>
            <StarDisplay 
              rating={stats.averageProductRating} 
              size="sm" 
              className="justify-center mb-1"
            />
            <p className="text-xs text-muted-foreground">Product Quality</p>
          </CardContent>
        </Card>

        <Card className="border-primary/10">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary mb-1">
              {stats.averageDeliveryRating.toFixed(1)}
            </div>
            <StarDisplay 
              rating={stats.averageDeliveryRating} 
              size="sm" 
              className="justify-center mb-1"
            />
            <p className="text-xs text-muted-foreground">Delivery Speed</p>
          </CardContent>
        </Card>

        <Card className="border-primary/10">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary mb-1">
              {stats.averageResponseRating.toFixed(1)}
            </div>
            <StarDisplay 
              rating={stats.averageResponseRating} 
              size="sm" 
              className="justify-center mb-1"
            />
            <p className="text-xs text-muted-foreground">Customer Service</p>
          </CardContent>
        </Card>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Rating Distribution</h4>
        {ratingDistributionItems.map(({ rating, count, percentage }) => (
          <div key={rating} className="flex items-center gap-2 text-sm">
            <span className="w-3 text-xs">{rating}</span>
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-8 text-xs text-muted-foreground text-right">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}