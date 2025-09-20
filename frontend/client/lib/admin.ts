export type ContactStatus = "new" | "in_progress" | "closed" | "replied";

export interface ContactRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: ContactStatus;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  product?: string;
  quantity?: number | string;
  message: string;
  reply?: { message: string; repliedAt: string };
  notes?: string;
}

const API_BASE = "/api/admin";

export function getToken() {
  return localStorage.getItem("admin_token") || "";
}

export function setToken(token: string) {
  localStorage.setItem("admin_token", token);
}

function authHeaders(token?: string): Record<string, string> {
  const t = token ?? getToken();
  const headers: Record<string, string> = {};
  if (t) headers["Authorization"] = `Bearer ${t}`;
  return headers;
}

export async function listContacts(status?: ContactStatus, token?: string) {
  const qs = status ? `?status=${encodeURIComponent(status)}` : "";
  const res = await fetch(`${API_BASE}/contacts${qs}`, {
    headers: { ...authHeaders(token) },
  });
  if (!res.ok) throw new Error(`Failed to load contacts (${res.status})`);
  const data = await res.json();
  return data.items as ContactRecord[];
}

export async function getContact(id: string, token?: string) {
  const res = await fetch(`${API_BASE}/contacts/${id}`, {
    headers: { ...authHeaders(token) },
  });
  if (!res.ok) throw new Error(`Failed to load contact (${res.status})`);
  const data = await res.json();
  return data.item as ContactRecord;
}

export async function replyContact(
  id: string,
  message: string,
  token?: string,
) {
  const res = await fetch(`${API_BASE}/contacts/${id}/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error(`Failed to send reply (${res.status})`);
  return (await res.json()).item as ContactRecord;
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus,
  token?: string,
) {
  const res = await fetch(`${API_BASE}/contacts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(`Failed to update status (${res.status})`);
  return (await res.json()).item as ContactRecord;
}
