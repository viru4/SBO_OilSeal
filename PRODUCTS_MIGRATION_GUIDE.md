# Products Database Migration Guide

## Steps to Complete the Migration

### 1. Set Up Database Schema
1. Open your Supabase dashboard
2. Go to the SQL Editor
3. Run the SQL commands from `database_schema.sql`

### 2. Run the Migration Script
```bash
# From the backend directory
cd backend
npx tsx server/scripts/migrate-products.ts
```

### 3. Verify Migration
- Check your Supabase dashboard to see the products table populated
- Test the API endpoints:
  - GET `/api/products` - Get all products
  - GET `/api/products/:id` - Get specific product
  - POST `/api/products` - Create new product (admin)

## API Endpoints Available

### Public Endpoints
- `GET /api/products` - List all products
- `GET /api/products?search=term` - Search products
- `GET /api/products?category=name` - Filter by category
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/sku/:sku` - Get product by SKU

### Admin Endpoints (Require Authentication)
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update existing product
- `DELETE /api/products/:id` - Delete product

## Next Steps After Migration

1. **Update Frontend**: Modify product components to fetch from API
2. **Add Admin UI**: Create admin interface for product management
3. **Test Everything**: Ensure all functionality works correctly

## Categories Automatically Assigned

The migration script automatically categorizes products based on their titles:
- Front Fork Seals
- Kick Seals  
- Magnet Seals
- Gear Seals
- Clutch Seals
- Wheel Seals
- Shock Absorber Seals
- Brake Seals
- Engine Seals
- Transmission Seals
- Differential Seals
- Steering Seals
- Oil Seals (default)

## Troubleshooting

If migration fails:
1. Check your Supabase connection settings
2. Ensure the database schema is created
3. Check for duplicate SKUs
4. Verify environment variables are set correctly