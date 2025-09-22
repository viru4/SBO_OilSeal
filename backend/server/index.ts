import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleContact } from "./routes/contact";
import { createAdminRouter } from "./routes/admin";
import { handleAddReview, handleListReviews, handleGetReviewStats } from "./routes/reviews";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-domain.com'] 
      : true,
    credentials: true
  }));
  
  // Optimize JSON parsing
  app.use(express.json({ 
    limit: '10mb'
  }));
  
  app.use(express.urlencoded({ 
    extended: true, 
    limit: '10mb' 
  }));
  
  // Add request timing middleware
  app.use((_req, res, next) => {
    const startTime = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      console.log(`Request processed in ${duration}ms`);
    });
    next();
  });

  // Health check endpoint
  app.get("/health", (_req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", handleContact);

  app.post("/api/reviews", handleAddReview);
  app.get("/api/reviews", handleListReviews);
  app.get("/api/reviews/stats", handleGetReviewStats);

  app.use("/api/admin", createAdminRouter());

  return app;
}
