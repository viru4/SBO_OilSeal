import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleContact } from "./routes/contact";
import { createAdminRouter } from "./routes/admin";
import { handleAddReview, handleListReviews, handleGetReviewStats } from "./routes/reviews";
import {
  handleGetAllProducts,
  handleGetProductById,
  handleGetProductBySku,
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct
} from "./routes/products";

export function createServer() {
  const app = express();

  // Log environment variable status for debugging
  console.log("Environment Configuration Check:");
  console.log("- NODE_ENV:", process.env.NODE_ENV);
  console.log("- SUPABASE_URL:", process.env.SUPABASE_URL ? "✓ Set" : "✗ Missing");
  console.log("- SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "✓ Set" : "✗ Missing");
  console.log("- ADMIN_TOKEN:", process.env.ADMIN_TOKEN ? "✓ Set" : "✗ Missing");
  console.log("- FRONTEND_URL:", process.env.FRONTEND_URL || "Not set (using default)");

  // CORS Configuration - Allow requests from both development and production
  const allowedOrigins = [
    // Development origins
    'http://localhost:3000',
    'http://localhost:3001', // Alternative port when 3000 is in use
    'http://localhost:5173', // Vite default dev server
    'http://localhost:8080', // Backend dev server
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:8080',
    
    // Production origins
    'https://sbo-oilseal.netlify.app',
    process.env.FRONTEND_URL, // Custom frontend URL from env
  ].filter(Boolean); // Remove any undefined values

  console.log("CORS allowed origins:", allowedOrigins);

  // CORS Middleware with enhanced configuration
  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      // Check if origin is in allowed list
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // Allow localhost with any port in development
      if (process.env.NODE_ENV !== 'production') {
        const localhostPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
        if (localhostPattern.test(origin)) {
          return callback(null, true);
        }
      }
      
      // Allow Netlify deploy previews and branch deploys
      if (origin.includes('.netlify.app')) {
        return callback(null, true);
      }
      
      // Reject other origins
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error(`CORS policy violation: Origin ${origin} not allowed`), false);
    },
    credentials: true, // Allow cookies and authorization headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers'
    ],
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'], // Headers that clients can access
    maxAge: 86400, // Cache preflight response for 24 hours
    preflightContinue: false,
    optionsSuccessStatus: 204 // For legacy browser support
  }));
  
  // Optimize JSON parsing
  app.use(express.json({ 
    limit: '10mb'
  }));
  
  app.use(express.urlencoded({ 
    extended: true, 
    limit: '10mb' 
  }));
  
  // Add request timing and CORS debugging middleware
  app.use((req, res, next) => {
    const startTime = Date.now();
    
    // Log CORS-related information
    if (req.method === 'OPTIONS') {
      console.log(`OPTIONS preflight request from origin: ${req.get('Origin')}`);
    }
    
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      console.log(`${req.method} ${req.path} - ${res.statusCode} (${duration}ms) - Origin: ${req.get('Origin') || 'none'}`);
    });
    next();
  });

  // Additional OPTIONS handler middleware for preflight support
  app.use((req, _res, next) => {
    if (req.method === 'OPTIONS') {
      console.log(`Additional OPTIONS handler for ${req.path} from origin: ${req.get('Origin')}`);
      // CORS middleware already handles this, but we can add additional logging
      return next();
    }
    next();
  });

  // Health check endpoint with database status
  app.get("/health", async (_req, res) => {
    const health = {
      status: "ok", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasSupabaseUrl: !!process.env.SUPABASE_URL,
        hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        hasAdminToken: !!process.env.ADMIN_TOKEN
      },
      database: {
        configured: false,
        connected: false
      }
    };

    // Check database connection
    try {
      const { checkSupabaseConnection } = await import("./services/supabase");
      health.database.configured = !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
      health.database.connected = await checkSupabaseConnection();
    } catch (error) {
      console.error("Health check database error:", error);
    }

    res.json(health);
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // CORS test endpoint
  app.get("/api/cors-test", (req, res) => {
    res.json({
      message: "CORS is working correctly!",
      origin: req.get('Origin') || 'No origin header',
      timestamp: new Date().toISOString(),
      headers: {
        'access-control-allow-origin': res.get('Access-Control-Allow-Origin'),
        'access-control-allow-credentials': res.get('Access-Control-Allow-Credentials')
      }
    });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", handleContact);

  app.post("/api/reviews", handleAddReview);
  app.get("/api/reviews", handleListReviews);
  app.get("/api/reviews/stats", handleGetReviewStats);

  // Products API routes
  app.get("/api/products", handleGetAllProducts);
  app.get("/api/products/:id", handleGetProductById);
  app.get("/api/products/sku/:sku", handleGetProductBySku);
  app.post("/api/products", handleCreateProduct);
  app.put("/api/products/:id", handleUpdateProduct);
  app.delete("/api/products/:id", handleDeleteProduct);

  app.use("/api/admin", createAdminRouter());

  return app;
}
