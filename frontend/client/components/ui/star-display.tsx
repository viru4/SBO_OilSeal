import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarDisplayProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg" | "xl";
  showValue?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4", 
  lg: "h-5 w-5",
  xl: "h-6 w-6"
} as const;

export function StarDisplay({ 
  rating, 
  maxRating = 5, 
  size = "md", 
  showValue = false,
  className 
}: StarDisplayProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = Math.max(0, maxRating - Math.ceil(rating));

  return (
    <div className={cn("flex items-center gap-1", className)} role="img" aria-label={`Rating: ${rating.toFixed(1)} out of ${maxRating} stars`}>
      <div className="flex items-center">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star
            key={`full-${index}`}
            className={cn(
              sizeClasses[size],
              "fill-yellow-400 text-yellow-400"
            )}
            aria-hidden="true"
          />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star
              className={cn(
                sizeClasses[size],
                "text-gray-300 fill-gray-300"
              )}
              aria-hidden="true"
            />
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${(rating % 1) * 100}%` }}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "fill-yellow-400 text-yellow-400"
                )}
                aria-hidden="true"
              />
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Star
            key={`empty-${index}`}
            className={cn(
              sizeClasses[size],
              "text-gray-300 fill-gray-300"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      
      {showValue && (
        <span className="text-sm font-medium text-muted-foreground ml-1" aria-label={`${rating.toFixed(1)} stars`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}