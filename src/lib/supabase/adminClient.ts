import { createClient } from "@supabase/supabase-js";

/**
 * Cliente con la secret key: se salta RLS (equivalente a service_role en el
 * sistema legacy). SOLO se importa desde contexto de servidor (scripts de
 * ingesta, route handlers) — nunca desde un Client Component. No se usa
 * "server-only" aquí a propósito: este módulo también se ejecuta fuera de
 * Next (scripts/sync-keepa-prices.ts vía tsx), donde ese guard revienta
 * incondicionalmente. Ningún Client Component importa este archivo.
 */
export function getSupabaseAdminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error("Faltan SUPABASE_URL o SUPABASE_SECRET_KEY en el entorno.");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
