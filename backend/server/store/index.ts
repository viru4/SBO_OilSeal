import type { ContactRequest } from "@shared/api";
import type { ContactRecord, ContactStatus } from "./contacts";
import * as fsStore from "./contacts";
import * as sbStore from "./contacts-supabase";

const useSupabase = !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE);

export const addContact = (input: ContactRequest) =>
  useSupabase ? sbStore.addContact(input) : Promise.resolve(fsStore.addContact(input));

export const listContacts = (status?: ContactStatus) =>
  useSupabase ? sbStore.listContacts(status) : Promise.resolve(fsStore.listContacts(status));

export const getContact = (id: string) =>
  useSupabase ? sbStore.getContact(id) : Promise.resolve(fsStore.getContact(id));

export const updateContact = (
  id: string,
  patch: Partial<Omit<ContactRecord, "id" | "createdAt">>
) => (useSupabase ? sbStore.updateContact(id, patch) : Promise.resolve(fsStore.updateContact(id, patch)!));
