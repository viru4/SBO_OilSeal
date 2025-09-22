import type { Product, ProductsResponse, CreateProductRequest, UpdateProductRequest } from "@shared/api";

// Use environment variable for API base URL in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const API_BASE = `${API_BASE_URL}/api/products`;

// Fetch all products with optional search and category filters
export async function fetchProducts(params?: {
  search?: string;
  category?: string;
}): Promise<ProductsResponse> {
  const url = new URL(API_BASE);
  
  if (params?.search) {
    url.searchParams.set('search', params.search);
  }
  if (params?.category) {
    url.searchParams.set('category', params.category);
  }

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  
  return response.json();
}

// Fetch a single product by ID
export async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE}/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.product;
}

// Fetch a single product by SKU
export async function fetchProductBySku(sku: string): Promise<Product> {
  const response = await fetch(`${API_BASE}/sku/${sku}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.product;
}

// Create a new product (admin only)
export async function createProduct(product: CreateProductRequest): Promise<Product> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || `Failed to create product: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.product;
}

// Update an existing product (admin only)
export async function updateProduct(id: string, updates: UpdateProductRequest): Promise<Product> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || `Failed to update product: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.product;
}

// Delete a product (admin only)
export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || `Failed to delete product: ${response.statusText}`);
  }
}

// Convert API Product to ProductItem for existing components
export function productToProductItem(product: Product) {
  return {
    title: product.title,
    size: product.size,
    material: product.material,
    fits: product.fits,
    sku: product.sku,
  };
}