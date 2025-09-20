import { RequestHandler } from "express";
import { z } from "zod";
import type { ContactRequest, ContactResponse } from "@shared/api";
import { addContact } from "../store";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  product: z.string().optional(),
  quantity: z.union([z.string(), z.number()]).optional(),
  message: z.string().min(10),
});

export const handleContact: RequestHandler = async (req, res) => {
  try {
    const parsed = ContactSchema.safeParse(req.body as ContactRequest);
    if (!parsed.success) {
      return res.status(400).json({ 
        ok: false, 
        errors: parsed.error.flatten(),
        message: "Invalid contact data provided"
      });
    }

    const payload = parsed.data;
    
    // Log contact request (sanitized)
    console.log("New contact request:", {
      name: payload.name,
      email: payload.email,
      phone: payload.phone ? "***" : undefined,
      company: payload.company,
      product: payload.product,
      quantity: payload.quantity,
      message: payload.message?.slice(0, 100) + (payload.message?.length > 100 ? "..." : ""),
      timestamp: new Date().toISOString()
    });

    // Save to database
    await addContact(payload);

    const response: ContactResponse = { ok: true };
    res.status(200).json(response);
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({ 
      ok: false, 
      message: "Failed to process contact request" 
    });
  }
};
