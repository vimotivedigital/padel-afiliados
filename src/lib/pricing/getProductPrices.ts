import { cache } from "react";
import { getSupabasePublicClient } from "../supabase/publicClient";
import type { LivePrice } from "./getProductPrice";

/**
 * Versión en lote de `getProductPrice`: una sola consulta a Supabase para
 * varios ASINs en vez de N consultas individuales. Pensada para listados
 * (categoría, marca, guía, ofertas, destacados) donde se pintan varias
 * `ProductCard` a la vez. Mismo contrato que la versión individual: nunca
 * lanza, y los ASIN sin fila en `product_prices` simplemente no aparecen en
 * el mapa devuelto (el llamante cae de vuelta al precio del dataset).
 */
export const getProductPrices = cache(async (asins: string[]): Promise<Map<string, LivePrice>> => {
  const map = new Map<string, LivePrice>();
  const supabase = getSupabasePublicClient();
  const validAsins = [...new Set(asins)].filter((asin) => asin && !asin.startsWith("B0EXAMPLE"));
  if (!supabase || validAsins.length === 0) return map;

  try {
    const { data, error } = await supabase
      .from("product_prices")
      .select("asin, price_current, price_previous, currency, availability, image_url, rating, review_count, last_updated")
      .in("asin", validAsins);

    if (error || !data) return map;

    for (const row of data) {
      map.set(row.asin, {
        priceCurrent: row.price_current,
        pricePrevious: row.price_previous,
        currency: row.currency,
        availability: row.availability,
        imageUrl: row.image_url,
        rating: row.rating,
        reviewCount: row.review_count,
        lastUpdated: row.last_updated,
      });
    }
  } catch {
    return map;
  }

  return map;
});
