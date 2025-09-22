/**
 * Migration script to populate the products table with existing static data
 * Run this after setting up the database schema
 */

import "dotenv/config";
import { createProduct } from "../store/products-supabase.js";

// Static products data for migration
const PRODUCTS_DATA = [
  // FRONT FORK SEALS
  {
    title: "Front Fork Seal 30×42×11 mm (D/S)",
    size: "30×42×11 mm (D/S)",
    material: "NBR",
    fits: "Compatible with: Hero Splendor, Passion, Glamour, CD Delux, KB4S",
    sku: "SBO-FS-3004211",
  },
  {
    title: "Front Fork Seal 30×42×10.5 mm",
    size: "30×42×10.5 mm",
    material: "NBR",
    fits: "Compatible with: Hero Splendor, Passion, Glamour, CD Delux, KB4S (Single Spring)",
    sku: "SBO-FS-30042105",
  },
  {
    title: "Front Fork Seal 28×42×11 mm",
    size: "28×42×11 mm",
    material: "NBR",
    fits: "Compatible with: Hero Splendor (Type Bore)",
    sku: "SBO-FS-28042115",
  },
  {
    title: "Front Fork Seal 31×43×10.5 mm",
    size: "31×43×10.5 mm",
    material: "NBR",
    fits: "Compatible with: Honda CBZ, Pulsar, Unicorn, Discover",
    sku: "SBO-FS-31043105",
  },
  {
    title: "Front Fork Seal 30×40.5×10.5 mm",
    size: "30×40.5×10.5 mm",
    material: "NBR",
    fits: "Compatible with: Yamaha RX 100, XL Super, XL 100, Vespa",
    sku: "SBO-FS-30405105",
  },
  // Add a few more key products for testing
  {
    title: "Kick Seal 13×8×24×5 mm",
    size: "13×8×24×5 mm",
    material: "NBR",
    fits: "Compatible with: Honda Kick Seal",
    sku: "SBO-KS-13824505",
  },
  {
    title: "Magnet Seal 18×30×5 mm",
    size: "18×30×5 mm",
    material: "NBR",
    fits: "Compatible with: Honda Magnet Seal",
    sku: "SBO-MS-183005",
  },
];

// Map the static products to the database format
function mapProductToDbFormat(product: any, category?: string) {
  return {
    title: product.title,
    size: product.size,
    material: product.material,
    fits: product.fits,
    sku: product.sku,
    category: category || inferCategory(product.title),
    in_stock: true,
  };
}

// Infer category from product title
function inferCategory(title: string): string {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('front fork')) return 'Front Fork Seals';
  if (titleLower.includes('kick')) return 'Kick Seals';
  if (titleLower.includes('magnet')) return 'Magnet Seals';
  if (titleLower.includes('gear')) return 'Gear Seals';
  if (titleLower.includes('clutch')) return 'Clutch Seals';
  if (titleLower.includes('wheel')) return 'Wheel Seals';
  if (titleLower.includes('shock')) return 'Shock Absorber Seals';
  if (titleLower.includes('brake')) return 'Brake Seals';
  if (titleLower.includes('engine')) return 'Engine Seals';
  if (titleLower.includes('transmission')) return 'Transmission Seals';
  if (titleLower.includes('differential')) return 'Differential Seals';
  if (titleLower.includes('steering')) return 'Steering Seals';
  
  return 'Oil Seals';
}

async function migrateProducts() {
  console.log(`Starting migration of ${PRODUCTS_DATA.length} sample products...`);
  console.log('Note: This is a sample set. You can add more products via the Admin interface.');
  
  let successCount = 0;
  let errorCount = 0;
  const errors: string[] = [];

  for (const product of PRODUCTS_DATA) {
    try {
      const dbProduct = mapProductToDbFormat(product);
      await createProduct(dbProduct);
      successCount++;
      console.log(`✓ Migrated: ${product.sku} - ${product.title}`);
    } catch (error) {
      errorCount++;
      const errorMsg = `✗ Failed to migrate ${product.sku}: ${(error as Error).message}`;
      console.error(errorMsg);
      errors.push(errorMsg);
    }
  }

  console.log('\n=== Migration Summary ===');
  console.log(`Total sample products: ${PRODUCTS_DATA.length}`);
  console.log(`Successfully migrated: ${successCount}`);
  console.log(`Failed: ${errorCount}`);
  
  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(error => console.log(error));
  }
  
  console.log('\nSample migration completed!');
  console.log('You can now:');
  console.log('1. Visit your frontend to see the products from database');
  console.log('2. Use the Admin interface to add more products');
  console.log('3. Import your full product catalog via the Admin interface');
}

// Run the migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateProducts()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export { migrateProducts };