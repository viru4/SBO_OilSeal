import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";

export interface ProductItem {
  title: string;
  size: string; // e.g., 37x50x11 mm
  material: string; // e.g., NBR
  fits: string; // e.g., Common fits
  sku: string;
}

interface ProductCardProps {
  item: ProductItem;
}

function ProductCard({ item }: ProductCardProps) {
  return (
    <Card className="transition hover:shadow-lg">
      <CardContent className="p-6">
        {/* Product title and material */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-semibold leading-tight">
              {item.title}
            </h3>
          </div>
          <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {item.material}
          </span>
        </div>

        {/* Compatible with section - eye-catching */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-2 border border-primary/30">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm font-semibold text-primary">
              {item.fits}
            </span>
          </div>
        </div>

        {/* Size and SKU info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md border bg-background p-3">
            <div className="text-xs text-muted-foreground">Size</div>
            <div className="font-medium">{item.size}</div>
          </div>
          <div className="rounded-md border bg-background p-3">
            <div className="text-xs text-muted-foreground">SKU</div>
            <div className="font-medium">{item.sku}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(ProductCard);
