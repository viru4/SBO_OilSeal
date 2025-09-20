import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/site/ProductCard";
import { HOME_FEATURED_PRODUCTS } from "@/data/products";
import ContactForm from "@/components/site/ContactForm";
import {
  CheckCircle2,
  Cog,
  Droplets,
  Factory,
  Gauge,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export default function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-screen hero-background">
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-0" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute left-1/2 top-[-10%] aspect-square w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 blur-3xl" />
        </div>
        <div className="container flex flex-col items-center gap-8 py-16 sm:py-24 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-xs text-gray-700 backdrop-blur shadow-lg">
            <ShieldCheck className="h-4 w-4 text-primary" /> Automotive sealing
            specialists — 20+ years
          </div>
          <h1 className="max-w-4xl text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white drop-shadow-lg">
            Automotive Oil Seals — Specialized in Motorcycle Shocker/Fork Seals
          </h1>
          <p className="max-w-2xl text-center text-base text-gray-100 sm:text-lg drop-shadow-md">
            SBO OilSeals manufactures high‑performance oil seals exclusively for
            automobiles, with a specialty in motorcycle shocker/fork seals.
            Built for leak‑proof performance and long service life.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="/contact">Request a Quote</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/products">View Products</a>
            </Button>
          </div>
          <div className="grid w-full max-w-4xl grid-cols-2 gap-3 rounded-xl border bg-white/90 backdrop-blur p-4 text-center sm:grid-cols-4 shadow-xl">
            {[
              { value: "20+", label: "Years Experience" },
              { value: "500+", label: "SKU Library" },
              { value: "300+", label: "Bike Models Supported" },
              { value: "99.8%", label: "On‑Time Delivery" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg p-3">
                <div className="text-2xl font-bold text-primary">{s.value}</div>
                <div className="text-xs text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="container py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Automotive Oil Seals
          </h2>
          <p className="mt-3 text-muted-foreground">
            Motorcycle fork/shocker seals are our core. We also produce
            high‑precision oil seals for automotive wheel hubs, engines, and
            transmissions in NBR, FKM, and PTFE compounds.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Gauge,
              title: "Fork/Shocker Oil Seals",
              desc: "Low stiction, high wear resistance for motorcycle front suspension.",
            },
            {
              icon: Cog,
              title: "Engine & Transmission",
              desc: "Crank, cam, and gearbox oil seals for automotive applications.",
            },
            {
              icon: Droplets,
              title: "Wheel Hub & Axle",
              desc: "Reliable sealing against dust, mud, and water ingress.",
            },
            {
              icon: Wrench,
              title: "Custom Automotive Seals",
              desc: "Design assistance, reverse engineering, and rapid tooling.",
            },
            {
              icon: Factory,
              title: "OEM & Aftermarket",
              desc: "Consistent supply with PPAP and traceability on request.",
            },
            {
              icon: ShieldCheck,
              title: "Quality Assurance",
              desc: "100% visual inspection options and material certification.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="transition hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <div className="text-lg font-semibold">{title}</div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Products */}
        <div className="mt-16">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                Featured Shocker/Fork Seals
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Representative sizes and SKUs. More options available on
                request.
              </p>
            </div>
            <Button asChild variant="outline">
              <a href="/contact">Request Custom Size</a>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_FEATURED_PRODUCTS.map((p) => (
              <ProductCard key={p.sku} item={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Automotive Segments
          </h2>
          <p className="mt-3 text-muted-foreground">
            We focus on two‑wheelers and automotive platforms where fork and
            powertrain sealing is critical.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            "Motorcycles",
            "Scooters",
            "Passenger Cars",
            "Light Commercial",
            "Aftermarket",
            "OEMs",
          ].map((i) => (
            <div
              key={i}
              className="rounded-md border bg-card px-4 py-3 text-center text-sm font-medium"
            >
              {i}
            </div>
          ))}
        </div>
      </section>

      {/* Quality */}
      <section id="quality" className="container py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Quality You Can Measure
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our quality system is built for consistency: certified raw
              materials, controlled processes, and rigorous inspection at each
              stage.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "ISO 9001-aligned production controls",
                "PPAP and material traceability",
                "Dimensional & visual inspection reports",
                "Functional testing on request",
              ].map((f) => (
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
                {[
                  { k: "±0.02mm", v: "Typical Tolerances" },
                  { k: "AQL 1.0", v: "Inspection Levels" },
                  { k: "24–72h", v: "Prototype Leadtime" },
                  { k: "10K+/mo", v: "Scalable Output" },
                ].map((s) => (
                  <div
                    key={s.v}
                    className="rounded-lg border bg-background p-6"
                  >
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

      {/* Contact */}
      <section id="contact" className="border-t bg-muted/30 py-16 sm:py-24">
        <div className="container grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Request a Quote
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us about your vehicle and fork dimensions. We’ll recommend
              the right shocker seal or automotive oil seal and pricing.
            </p>
            <div className="mt-6 rounded-xl border bg-card p-6">
              <div className="grid grid-cols-2 gap-4">
                <Stat label="Materials" value="NBR, FKM, PTFE" />
                <Stat label="Fork Sizes" value="26–50mm" />
                <Stat label="Tooling" value="In��house" />
                <Stat label="MOQ" value="Flexible" />
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background p-4 text-center">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold text-primary">{value}</div>
    </div>
  );
}
