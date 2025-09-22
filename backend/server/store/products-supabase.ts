import { z } from "zod";
import type { 
  Product, 
  CreateProductRequest, 
  UpdateProductRequest, 
  ProductsResponse,
  ProductResponse 
} from "@shared/api";
import { getSupabaseAdmin } from "../services/supabase";

const Table = "products";

const Row = z.object({
  id: z.string(),
  title: z.string(),
  size: z.string(),
  material: z.string(),
  fits: z.string(),
  sku: z.string(),
  category: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  price: z.number().nullable().optional(),
  in_stock: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

type RowT = z.infer<typeof Row>;

function mapRow(row: RowT): Product {
  return {
    id: row.id,
    title: row.title,
    size: row.size,
    material: row.material,
    fits: row.fits,
    sku: row.sku,
    category: row.category ?? undefined,
    description: row.description ?? undefined,
    price: row.price ?? undefined,
    in_stock: row.in_stock,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function getAllProducts(): Promise<ProductsResponse> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");

  const { data, error, count } = await db
    .from(Table)
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  const products = (data || []).map(row => mapRow(Row.parse(row)));
  
  return {
    products,
    total: count || 0,
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");

  const { data, error } = await db
    .from(Table)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Product not found
    }
    console.error("Error fetching product:", error);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }

  return mapRow(Row.parse(data));
}

export async function getProductBySku(sku: string): Promise<Product | null> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");

  const { data, error } = await db
    .from(Table)
    .select("*")
    .eq("sku", sku)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Product not found
    }
    console.error("Error fetching product by SKU:", error);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }

  return mapRow(Row.parse(data));
}

export async function createProduct(input: CreateProductRequest): Promise<ProductResponse> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");

  // Check if SKU already exists
  const existingProduct = await getProductBySku(input.sku);
  if (existingProduct) {
    throw new Error(`Product with SKU ${input.sku} already exists`);
  }

  const now = new Date().toISOString();
  const insert = {
    title: input.title,
    size: input.size,
    material: input.material,
    fits: input.fits,
    sku: input.sku,
    category: input.category ?? null,
    description: input.description ?? null,
    price: input.price ?? null,
    in_stock: input.in_stock ?? true,
    created_at: now,
    updated_at: now,
  };

  const { data, error } = await db
    .from(Table)
    .insert(insert)
    .select("*")
    .single();

  if (error) {
    console.error("Error creating product:", error);
    throw new Error(`Failed to create product: ${error.message}`);
  }

  const product = mapRow(Row.parse(data));
  return { product };
}

export async function updateProduct(id: string, input: UpdateProductRequest): Promise<ProductResponse> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");

  // Check if product exists
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    throw new Error("Product not found");
  }

  // If updating SKU, check for conflicts
  if (input.sku && input.sku !== existingProduct.sku) {
    const conflictProduct = await getProductBySku(input.sku);
    if (conflictProduct) {
      throw new Error(`Product with SKU ${input.sku} already exists`);
    }
  }

  const update = {
    ...input,
    updated_at: new Date().toISOString(),
  };

  // Remove undefined values
  Object.keys(update).forEach(key => {
    if (update[key as keyof typeof update] === undefined) {
      delete update[key as keyof typeof update];
    }
  });

  const { data, error } = await db
    .from(Table)
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating product:", error);
    throw new Error(`Failed to update product: ${error.message}`);
  }

  const product = mapRow(Row.parse(data));
  return { product };
}

export async function deleteProduct(id: string): Promise<void> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");

  const { error } = await db
    .from(Table)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");

  const { data, error, count } = await db
    .from(Table)
    .select("*", { count: "exact" })
    .or(`title.ilike.%${query}%, sku.ilike.%${query}%, fits.ilike.%${query}%, category.ilike.%${query}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error searching products:", error);
    throw new Error(`Failed to search products: ${error.message}`);
  }

  const products = (data || []).map(row => mapRow(Row.parse(row)));
  
  return {
    products,
    total: count || 0,
  };
}

export async function getProductsByCategory(category: string): Promise<ProductsResponse> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");

  const { data, error, count } = await db
    .from(Table)
    .select("*", { count: "exact" })
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products by category:", error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  const products = (data || []).map(row => mapRow(Row.parse(row)));
  
  return {
    products,
    total: count || 0,
  };
}