import { RequestHandler } from "express";
import { z } from "zod";
import {
  getAllProducts,
  getProductById,
  getProductBySku,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory
} from "../store/products-supabase";

const createProductSchema = z.object({
  title: z.string().min(1),
  size: z.string().min(1),
  material: z.string().min(1),
  fits: z.string().min(1),
  sku: z.string().min(1),
  category: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  in_stock: z.boolean().optional()
});

const updateProductSchema = z.object({
  title: z.string().min(1).optional(),
  size: z.string().min(1).optional(),
  material: z.string().min(1).optional(),
  fits: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  in_stock: z.boolean().optional()
});

export const handleGetAllProducts: RequestHandler = async (req, res) => {
  try {
    const { search, category } = req.query;

    let result;
    if (search && typeof search === 'string') {
      result = await searchProducts(search);
    } else if (category && typeof category === 'string') {
      result = await getProductsByCategory(category);
    } else {
      result = await getAllProducts();
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const handleGetProductById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    res.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const handleGetProductBySku: RequestHandler = async (req, res) => {
  try {
    const { sku } = req.params;
    const product = await getProductBySku(sku);
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    res.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const handleCreateProduct: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const validationResult = createProductSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: "Invalid input", 
        details: validationResult.error.format() 
      });
    }
    
    // Create product in database
    const result = await createProduct(validationResult.data);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating product:", error);
    if ((error as Error).message.includes("already exists")) {
      return res.status(409).json({ error: (error as Error).message });
    }
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const handleUpdateProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate request body
    const validationResult = updateProductSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: "Invalid input", 
        details: validationResult.error.format() 
      });
    }
    
    // Update product in database
    const result = await updateProduct(id, validationResult.data);
    res.json(result);
  } catch (error) {
    console.error("Error updating product:", error);
    if ((error as Error).message.includes("not found")) {
      return res.status(404).json({ error: "Product not found" });
    }
    if ((error as Error).message.includes("already exists")) {
      return res.status(409).json({ error: (error as Error).message });
    }
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const handleDeleteProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};