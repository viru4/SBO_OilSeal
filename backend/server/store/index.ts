import type { ContactRequest } from "@shared/api";
import type { ContactRecord, ContactStatus } from "./contacts";
import * as fsStore from "./contacts";
import * as sbStore from "./contacts-supabase";

// Prefer the new SUPABASE_SERVICE_ROLE_KEY env var; fall back to SUPABASE_SERVICE_ROLE
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE;
const useSupabase = !!(process.env.SUPABASE_URL && supabaseKey);

export const addContact = async (input: ContactRequest) => {
  if (useSupabase) {
    try {
      return await sbStore.addContact(input);
    } catch (e) {
      console.error(
        "Supabase addContact failed, falling back to file store",
        e,
      );
    }
  }
  return fsStore.addContact(input);
};

export const listContacts = async (
  status?: ContactStatus, 
  limit?: number, 
  offset?: number
) => {
  if (useSupabase) {
    try {
      return await sbStore.listContacts(status, limit, offset);
    } catch (e) {
      console.error(
        "Supabase listContacts failed, falling back to file store",
        e,
      );
    }
  }
  return fsStore.listContacts(status);
};

export const getContact = async (id: string) => {
  if (useSupabase) {
    try {
      return await sbStore.getContact(id);
    } catch (e) {
      console.error(
        "Supabase getContact failed, falling back to file store",
        e,
      );
    }
  }
  return fsStore.getContact(id);
};

export const updateContact = async (
  id: string,
  patch: Partial<Omit<ContactRecord, "id" | "createdAt">>,
) => {
  if (useSupabase) {
    try {
      return await sbStore.updateContact(id, patch);
    } catch (e) {
      console.error(
        "Supabase updateContact failed, falling back to file store",
        e,
      );
    }
  }
  return fsStore.updateContact(id, patch)!;
};
