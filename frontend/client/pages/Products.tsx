import ProductCard from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useProducts } from "@/hooks/use-products";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Products() {
  const { productItems, loading, error, refetch } = useProducts();

  if (loading) {
    return (
      <section className="container py-14 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Products
          </h1>
          <p className="mt-3 text-muted-foreground">
            Specialized in motorcycle fork/shocker seals. Also producing
            high precision automotive oil seals for engines, transmissions, and
            wheel hubs.
          </p>
        </div>
        <div className="mt-10 flex justify-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container py-14 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Products
          </h1>
          <div className="mt-10">
            <Alert variant="destructive">
              <AlertDescription>
                Failed to load products: {error}
              </AlertDescription>
            </Alert>
            <Button onClick={refetch} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-14 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Products
        </h1>
        <p className="mt-3 text-muted-foreground">
          Specialized in motorcycle fork/shocker seals. Also producing
          high precision automotive oil seals for engines, transmissions, and
          wheel hubs.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productItems.map((p) => (
          <ProductCard key={p.sku} item={p} />
        ))}
      </div>

      {productItems.length === 0 && (
        <div className="mt-10 text-center text-muted-foreground">
          No products found.
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Button asChild>
          <a href="/contact">Request a Quote</a>
        </Button>
      </div>
    </section>
  );
}
