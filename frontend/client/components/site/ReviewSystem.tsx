import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, Star } from "lucide-react";
import { useCallback } from "react";

// Star Rating Component
function StarRating({ 
  rating, 
  setRating, 
  disabled = false 
}: { 
  rating: number; 
  setRating: (value: number) => void; 
  disabled?: boolean 
}) {
  const handleStarClick = useCallback((star: number) => {
    if (!disabled) setRating(star);
  }, [disabled, setRating]);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          className={`focus:outline-none transition-all ${disabled ? 'cursor-default' : 'hover:scale-110'}`}
          aria-label={`Rate ${star} stars out of 5`}
          disabled={disabled}
        >
          <Star
            className={`h-8 w-8 ${
              rating >= star
                ? "fill-primary text-primary"
                : "fill-none text-muted-foreground"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewSystem() {
  const { toast } = useToast();
  const [productRating, setProductRating] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [responseRating, setResponseRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmitReview = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    
    // Validation
    if (productRating === 0 || deliveryRating === 0 || responseRating === 0) {
      setValidationError("Please provide a rating for all three categories");
      return;
    }
    
    if (!name.trim()) {
      setValidationError("Please provide your name");
      return;
    }
    
    // Phone validation - must have either phone or email
    if (!phone.trim() && !email.trim()) {
      setValidationError("Please provide either a phone number or an email address");
      return;
    }
    
    // Email validation (only if provided)
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError("Please provide a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
      const response = await fetch(`${API_BASE_URL}/api/reviews`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productRating, 
          deliveryRating, 
          responseRating, 
          name,
          email: email || undefined,
          phone: phone || undefined,
          comment: reviewComment || undefined
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit review');
      }
      
      // Success state
      setSubmitted(true);
      toast({
        title: "Review submitted successfully",
        description: "Thank you for your valuable feedback!",
      });

    } catch (error) {
      toast({
        title: "Error submitting review",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [productRating, deliveryRating, responseRating, name, email, phone, reviewComment, toast]);

  const handleResetForm = useCallback(() => {
    setSubmitted(false);
    setProductRating(0);
    setDeliveryRating(0);
    setResponseRating(0);
    setReviewComment("");
    setName("");
    setEmail("");
    setPhone("");
  }, []);

  return (
    <section id="reviews" className="border-t bg-muted/10 py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Customer Reviews
          </h2>
          <p className="mt-3 text-muted-foreground">
            We value your feedback. Please rate your experience with our products and services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-6 mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Thank You for Your Feedback!</h3>
              <p className="text-muted-foreground mb-8">Your review has been submitted successfully and will help us improve our products and services.</p>
              <Button onClick={handleResetForm}>Submit Another Review</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Product Quality Rating */}
                <div className="rounded-xl border bg-card p-6 flex flex-col items-center">
                  <h3 className="font-semibold text-lg mb-3">Product Quality</h3>
                  <StarRating 
                    rating={productRating} 
                    setRating={setProductRating} 
                    disabled={isSubmitting} 
                  />
                  <p className="mt-2 text-xs text-center text-muted-foreground">
                    Rate the quality & performance of our oil seals
                  </p>
                </div>

                {/* Delivery & Service Rating */}
                <div className="rounded-xl border bg-card p-6 flex flex-col items-center">
                  <h3 className="font-semibold text-lg mb-3">Delivery & Service</h3>
                  <StarRating 
                    rating={deliveryRating} 
                    setRating={setDeliveryRating} 
                    disabled={isSubmitting} 
                  />
                  <p className="mt-2 text-xs text-center text-muted-foreground">
                    Rate our delivery time & overall service
                  </p>
                </div>

                {/* Response Rating */}
                <div className="rounded-xl border bg-card p-6 flex flex-col items-center">
                  <h3 className="font-semibold text-lg mb-3" id="response-rating-label">Response Time</h3>
                  <div role="group" aria-labelledby="response-rating-label">
                    <StarRating 
                      rating={responseRating} 
                      setRating={setResponseRating} 
                      disabled={isSubmitting} 
                    />
                  </div>
                  <p className="mt-2 text-xs text-center text-muted-foreground">
                    Rate how quickly we responded to your inquiries
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your phone number"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email (optional)"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Please provide either a phone number or an email address for contact
                </p>
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-1">
                  Additional Comments
                </label>
                <textarea
                  id="comment"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Share your experience with our products and services (optional)"
                  disabled={isSubmitting}
                />
              </div>

              {validationError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{validationError}</span>
                </div>
              )}

              <div className="flex justify-center">
                <Button 
                  type="submit"
                  size="lg" 
                  disabled={isSubmitting}
                  className="min-w-[200px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-background border-t-transparent rounded-full" />
                      Submitting...
                    </div>
                  ) : "Submit Review"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}