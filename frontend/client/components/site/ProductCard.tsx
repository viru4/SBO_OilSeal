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
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold leading-tight">
              {item.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{item.fits}</p>
          </div>
          <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {item.material}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
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
