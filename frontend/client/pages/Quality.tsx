import { CheckCircle2 } from "lucide-react";
import { ReviewsStats } from "@/components/site/ReviewsStats";
import { CustomerTestimonials } from "@/components/site/CustomerTestimonials";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Quality() {
  const features = [
    "ISO 9001-aligned production controls",
    "PPAP and material traceability",
    "Dimensional & visual inspection reports",
    "Functional testing on request",
  ];
  const stats = [
    { k: "±0.02mm", v: "Typical Tolerances" },
    { k: "AQL 1.0", v: "Inspection Levels" },
    { k: "24–72h", v: "Prototype Leadtime" },
    { k: "10K+/mo", v: "Scalable Output" },
  ];
  return (
    <>
      <section className="container py-14 sm:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Quality
            </h1>
            <p className="mt-3 text-muted-foreground">
              Our quality system is built for consistency: certified raw
              materials, controlled processes, and rigorous inspection at each
              stage.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/10 via-accent/10 to-transparent p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                {stats.map((s) => (
                  <div key={s.v} className="rounded-lg border bg-background p-6">
                    <div className="text-xl font-bold text-primary">{s.k}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Customers Say Section */}
      <section className="testimonials-section py-16 sm:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about our oil seals and service.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Overall Ratings Statistics */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h3 className="text-xl font-semibold mb-6 text-center lg:text-left">
                  Overall Rating
                </h3>
                <ErrorBoundary>
                  <ReviewsStats />
                </ErrorBoundary>
              </div>
            </div>

            {/* Customer Testimonials */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold mb-6 text-center lg:text-left">
                Recent Reviews
              </h3>
              <ErrorBoundary>
                <CustomerTestimonials limit={6} />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
