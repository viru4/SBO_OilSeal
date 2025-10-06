import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  // new name is SUPABASE_SERVICE_ROLE_KEY; fall back to SUPABASE_SERVICE_ROLE for backwards compatibility
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE;
  if (!url || !key) return null;
  
  if (!client) {
    client = createClient(url, key, {
      auth: { 
        persistSession: false, 
        autoRefreshToken: false 
      },
      db: {
        schema: 'public'
      },
      global: {
        headers: {
          'x-application-name': 'sbo-oilseal-backend'
        }
      }
    });
  }
  return client;
}

// Connection health check
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const db = getSupabaseAdmin();
    if (!db) return false;
    
    const { error } = await db.from('contacts').select('count').limit(1);
    return !error;
  } catch {
    return false;
  }
}
