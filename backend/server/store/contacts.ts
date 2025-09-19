import fs from "fs";
import path from "path";
import { z } from "zod";
import type { ContactRequest } from "@shared/api";

export type ContactStatus = "new" | "in_progress" | "closed" | "replied";

export interface ContactRecord {
  id: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  status: ContactStatus;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  product?: string;
  quantity?: number | string;
  message: string;
  reply?: {
    message: string;
    repliedAt: string; // ISO
  };
  notes?: string;
}

const storeDir = path.join(import.meta.dirname, "../../data");
const storePath = path.join(storeDir, "contacts.json");

const FileShape = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      status: z.enum(["new", "in_progress", "closed", "replied"]),
      name: z.string(),
      email: z.string(),
      phone: z.string().optional(),
      company: z.string().optional(),
      product: z.string().optional(),
      quantity: z.union([z.string(), z.number()]).optional(),
      message: z.string(),
      reply: z
        .object({ message: z.string(), repliedAt: z.string() })
        .optional(),
      notes: z.string().optional(),
    }),
  ),
});

type FileData = z.infer<typeof FileShape>;

function ensureStore() {
  if (!fs.existsSync(storeDir)) fs.mkdirSync(storeDir, { recursive: true });
  if (!fs.existsSync(storePath)) {
    const initial: FileData = { items: [] };
    fs.writeFileSync(storePath, JSON.stringify(initial, null, 2));
  }
}

function read(): FileData {
  ensureStore();
  const raw = fs.readFileSync(storePath, "utf8");
  const parsed = JSON.parse(raw);
  const data = FileShape.parse(parsed);
  return data;
}

function write(data: FileData) {
  ensureStore();
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2));
}

export function addContact(input: ContactRequest): ContactRecord {
  const now = new Date().toISOString();
  const rec: ContactRecord = {
    id: Math.random().toString(36).slice(2, 10),
    createdAt: now,
    updatedAt: now,
    status: "new",
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company,
    product: input.product,
    quantity: input.quantity,
    message: input.message,
  };
  const data = read();
  data.items.unshift(rec);
  write(data);
  return rec;
}

export function listContacts(status?: ContactStatus): ContactRecord[] {
  const data = read();
  return status ? data.items.filter((i) => i.status === status) : data.items;
}

export function getContact(id: string): ContactRecord | undefined {
  const data = read();
  return data.items.find((i) => i.id === id);
}

export function updateContact(
  id: string,
  patch: Partial<Omit<ContactRecord, "id" | "createdAt">>,
): ContactRecord | undefined {
  const data = read();
  const idx = data.items.findIndex((i) => i.id === id);
  if (idx === -1) return undefined;
  const next = {
    ...data.items[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  } as ContactRecord;
  data.items[idx] = next;
  write(data);
  return next;
}
