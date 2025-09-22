import { useState, useEffect } from 'react';
import type { Product } from '@shared/api';
import { fetchProducts, productToProductItem } from '@/lib/products-api';
import type { ProductItem } from '@/components/site/ProductCard';

interface UseProductsOptions {
  search?: string;
  category?: string;
  autoFetch?: boolean;
}

interface UseProductsReturn {
  products: Product[];
  productItems: ProductItem[]; // For compatibility with existing components
  loading: boolean;
  error: string | null;
  total: number;
  refetch: () => Promise<void>;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const { search, category, autoFetch = true } = options;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchProducts({ search, category });
      setProducts(response.products);
      setTotal(response.total);
    } catch (err) {
      setError((err as Error).message);
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [search, category, autoFetch]);

  // Convert to ProductItem format for backward compatibility
  const productItems = products.map(productToProductItem);

  return {
    products,
    productItems,
    loading,
    error,
    total,
    refetch: fetchData,
  };
}

// Hook for getting featured products (first 6 products)
export function useFeaturedProducts(): UseProductsReturn {
  const result = useProducts();
  
  return {
    ...result,
    products: result.products.slice(0, 6),
    productItems: result.productItems.slice(0, 6),
    total: Math.min(result.total, 6),
  };
}