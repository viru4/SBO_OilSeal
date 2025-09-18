import { CheckCircle2 } from "lucide-react";

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
  );
}
