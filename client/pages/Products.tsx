import ProductCard from "@/components/site/ProductCard";
import { FEATURED_PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";

export default function Products() {
  return (
    <section className="container py-14 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Products</h1>
        <p className="mt-3 text-muted-foreground">
          Specialized in motorcycle fork/shocker seals. Also producing high��precision automotive oil seals for engines, transmissions, and wheel hubs.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_PRODUCTS.map((p) => (
          <ProductCard key={p.sku} item={p} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild>
          <a href="/contact">Request a Quote</a>
        </Button>
      </div>
    </section>
  );
}
