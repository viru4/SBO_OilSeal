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

// Use environment variable for API base URL in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const API_BASE = `${API_BASE_URL}/api/admin`;

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

export async function listContacts(
  status?: ContactStatus, 
  token?: string,
  limit?: number,
  offset?: number
) {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (limit) params.append('limit', limit.toString());
  if (offset) params.append('offset', offset.toString());
  
  const qs = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(`${API_BASE}/contacts${qs}`, {
    headers: { ...authHeaders(token) },
  });
  if (!res.ok) throw new Error(`Failed to load contacts (${res.status})`);
  const data = await res.json();
  return {
    items: data.items as ContactRecord[],
    pagination: data.pagination
  };
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

export type NotifyChannel = "email" | "sms" | "whatsapp";
export async function notifyContact(
  id: string,
  channel: NotifyChannel,
  message: string,
  token?: string,
) {
  const res = await fetch(`${API_BASE}/contacts/${id}/notify`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify({ channel, message }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      err?.error ? String(err.error) : `Failed to notify (${res.status})`,
    );
  }
  return (await res.json()) as { ok: boolean };
}
