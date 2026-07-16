import { cache } from "react";
import { getSupabasePublicClient } from "../supabase/publicClient";

export interface LivePrice {
  priceCurrent: number;
  pricePrevious: number | null;
  currency: string;
  availability: string | null;
  imageUrl: string | null;
  rating: number | null;
  reviewCount: number | null;
  lastUpdated: string;
}

/**
 * Lee el precio en vivo de `product_prices` para un ASIN. Usa la
 * publishable key (solo lectura, RLS aplica). `cache()` evita repetir la
 * misma consulta varias veces dentro del mismo request/build de RSC.
 * Devuelve `null` si no hay fila, si Supabase no está configurado, o ante
 * cualquier error — nunca lanza, para que la página siempre pueda caer de
 * vuelta al precio del dataset JSON.
 */
export const getProductPrice = cache(async (asin: string): Promise<LivePrice | null> => {
  const supabase = getSupabasePublicClient();
  if (!supabase || !asin || asin.startsWith("B0EXAMPLE")) return null;

  try {
    const { data, error } = await supabase
      .from("product_prices")
      .select("price_current, price_previous, currency, availability, image_url, rating, review_count, last_updated")
      .eq("asin", asin)
      .maybeSingle();

    if (error || !data) return null;

    return {
      priceCurrent: data.price_current,
      pricePrevious: data.price_previous,
      currency: data.currency,
      availability: data.availability,
      imageUrl: data.image_url,
      rating: data.rating,
      reviewCount: data.review_count,
      lastUpdated: data.last_updated,
    };
  } catch {
    return null;
  }
});
