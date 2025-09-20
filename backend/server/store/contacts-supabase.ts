import { z } from "zod";
import type { ContactRequest } from "@shared/api";
import type { ContactRecord, ContactStatus } from "./contacts";
import { getSupabaseAdmin } from "../services/supabase";

const Table = "contacts";

const Row = z.object({
  id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.enum(["new", "in_progress", "closed", "replied"]).default("new"),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  product: z.string().nullable().optional(),
  quantity: z.union([z.string(), z.number()]).nullable().optional(),
  message: z.string(),
  reply_message: z.string().nullable().optional(),
  reply_at: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

type RowT = z.infer<typeof Row>;

function map(row: RowT): ContactRecord {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status,
    name: row.name,
    email: row.email,
    phone: row.phone ?? undefined,
    company: row.company ?? undefined,
    product: row.product ?? undefined,
    quantity: (row.quantity as any) ?? undefined,
    message: row.message,
    reply:
      row.reply_message && row.reply_at
        ? { message: row.reply_message, repliedAt: row.reply_at }
        : undefined,
    notes: row.notes ?? undefined,
  };
}

export async function addContact(
  input: ContactRequest,
): Promise<ContactRecord> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");
  const now = new Date().toISOString();
  const insert = {
    status: "new",
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    company: input.company ?? null,
    product: input.product ?? null,
    quantity: (input.quantity as any) ?? null,
    message: input.message,
    created_at: now,
    updated_at: now,
  };
  const { data, error } = await db.from(Table).insert(insert).select().single();
  if (error) throw error;
  return map(Row.parse(data));
}

export async function listContacts(
  status?: ContactStatus,
  limit?: number,
  offset?: number,
): Promise<ContactRecord[]> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");
  
  let q = db.from(Table)
    .select("*")
    .order("created_at", { ascending: false });
    
  if (status) q = q.eq("status", status);
  if (limit) q = q.limit(limit);
  if (offset) q = q.range(offset, offset + (limit || 50) - 1);
  
  const { data, error } = await q;
  if (error) throw error;
  return (data as any[]).map((r) => map(Row.parse(r)));
}

export async function getContact(
  id: string,
): Promise<ContactRecord | undefined> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");
  const { data, error } = await db.from(Table).select().eq("id", id).single();
  if (error) throw error;
  return data ? map(Row.parse(data)) : undefined;
}

export async function updateContact(
  id: string,
  patch: Partial<Omit<ContactRecord, "id" | "createdAt">>,
): Promise<ContactRecord | undefined> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");
  const update: any = { updated_at: new Date().toISOString() };
  if (patch.status) update.status = patch.status;
  if (patch.reply) {
    update.reply_message = patch.reply.message;
    update.reply_at = patch.reply.repliedAt;
  }
  if (patch.notes !== undefined) update.notes = patch.notes;
  const { data, error } = await db
    .from(Table)
    .update(update)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data ? map(Row.parse(data)) : undefined;
}
