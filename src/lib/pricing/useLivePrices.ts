"use client";

import { useEffect, useState } from "react";
import { getSupabasePublicClient } from "@/lib/supabase/publicClient";
import type { LivePrice } from "./getProductPrice";

/**
 * Equivalente cliente de `getProductPrices`: el Wizard calcula sus
 * resultados en el navegador (ver nota de escalabilidad en Wizard.tsx), así
 * que no puede usar el helper de Server Components. Misma tabla, mismo
 * contrato — solo cambia dónde se ejecuta la consulta.
 */
export function useLivePrices(asins: string[]): Map<string, LivePrice> {
  const [prices, setPrices] = useState<Map<string, LivePrice>>(new Map());
  const key = asins.join(",");

  useEffect(() => {
    if (!key) {
      setPrices(new Map());
      return;
    }

    let cancelled = false;
    const supabase = getSupabasePublicClient();
    const validAsins = [...new Set(key.split(","))].filter((asin) => asin && !asin.startsWith("B0EXAMPLE"));
    if (!supabase || validAsins.length === 0) return;

    supabase
      .from("product_prices")
      .select("asin, price_current, price_previous, currency, availability, image_url, rating, review_count, last_updated")
      .in("asin", validAsins)
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        const map = new Map<string, LivePrice>();
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
        setPrices(map);
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  return prices;
}
