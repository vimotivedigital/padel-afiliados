import { createClient } from "@supabase/supabase-js";

/**
 * Cliente de solo lectura (publishable key). Sujeto a RLS: solo puede leer
 * `product_prices` gracias a la policy "product_prices_public_read". Seguro
 * de usar en Server Components y también, si hiciera falta, en el cliente.
 */
export function getSupabasePublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
