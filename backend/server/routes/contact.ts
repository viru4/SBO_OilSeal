import { RequestHandler } from "express";
import { z } from "zod";
import type { ContactRequest, ContactResponse } from "@shared/api";
import { addContact } from "../store/contacts";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  product: z.string().optional(),
  quantity: z.union([z.string(), z.number()]).optional(),
  message: z.string().min(10),
});

export const handleContact: RequestHandler = (req, res) => {
  const parsed = ContactSchema.safeParse(req.body as ContactRequest);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, errors: parsed.error.flatten() });
  }

  const payload = parsed.data;
  // In a real app, enqueue email/CRM here. For now, log safely and return success.
  try {
    console.log("New contact request:", {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
      product: payload.product,
      quantity: payload.quantity,
      message: payload.message?.slice(0, 500),
    });
  } catch {}

  try {
    addContact(payload);
  } catch {}

  const response: ContactResponse = { ok: true };
  res.status(200).json(response);
};
