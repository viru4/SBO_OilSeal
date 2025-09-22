-- Products Table Schema for Supabase
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  size TEXT NOT NULL,
  material TEXT NOT NULL DEFAULT 'NBR',
  fits TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  category TEXT,
  description TEXT,
  price DECIMAL(10,2),
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on SKU for fast lookups
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);

-- Create an index on category for filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Create an index on material for filtering
CREATE INDEX IF NOT EXISTS idx_products_material ON products(material);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read products (public access)
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

-- Policy: Only authenticated users can insert products (admin only)
CREATE POLICY "Authenticated users can insert products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update products (admin only)
CREATE POLICY "Authenticated users can update products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can delete products (admin only)
CREATE POLICY "Authenticated users can delete products" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- Optional: Add a trigger to update the updated_at column automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();