# Quick Setup Guide

## Step 1: Set up Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste this SQL:

```sql
-- Products Table Schema for Supabase
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_material ON products(material);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update products" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete products" ON products FOR DELETE USING (auth.role() = 'authenticated');

-- Auto-update trigger
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
```

4. Click **Run** to execute

## Step 2: Test the System

1. **Start your development server:**
   ```bash
   # In one terminal - backend
   cd backend
   npm run dev
   
   # In another terminal - frontend  
   cd frontend
   npm run dev
   ```

2. **Check if products load:**
   - Visit your frontend (usually http://localhost:8080)
   - Go to the Products page
   - It should show "No products found" since database is empty

3. **Add products via Admin:**
   - Go to `/admin` 
   - Sign in with your admin token
   - Click "Products Management" tab
   - Use "Add Product" button to create products

## Step 3: Add Sample Products (Manual)

You can add these sample products via the Admin interface:

```json
{
  "title": "Front Fork Seal 30×42×11 mm (D/S)",
  "size": "30×42×11 mm (D/S)",
  "material": "NBR",
  "fits": "Compatible with: Hero Splendor, Passion, Glamour",
  "sku": "SBO-FS-3004211",
  "category": "Front Fork Seals"
}

{
  "title": "Kick Seal 13×8×24×5 mm",
  "size": "13×8×24×5 mm", 
  "material": "NBR",
  "fits": "Compatible with: Honda Kick Seal",
  "sku": "SBO-KS-13824505",
  "category": "Kick Seals"
}
```

## Troubleshooting

- **Migration script fails:** Use the Admin interface instead
- **"Supabase not configured":** Check your environment variables
- **Products not showing:** Check browser console for API errors
- **Admin can't add products:** Verify Supabase policies and authentication

The system is now ready! You can manage all products dynamically through the admin interface.