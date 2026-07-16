import { getAllProducts } from "../products";
import { getSupabaseAdminClient } from "../supabase/adminClient";

/**
 * Código de dominio de Keepa para amazon.es.
 *
 * OJO: en la tabla de dominios de Keepa, 4 = amazon.fr, no amazon.es.
 * El dominio correcto para España es 9. Se deja como constante exportada
 * (en vez de hardcodearlo dentro de la URL) precisamente para que sea fácil
 * de corregir/verificar contra la documentación de tu cuenta de Keepa antes
 * de la primera ejecución real.
 */
export const KEEPA_DOMAIN_ES = 9;

const KEEPA_BATCH_SIZE = 20;
const KEEPA_API_BASE = "https://api.keepa.com/product";

export interface SyncResult {
  updated: number;
  skipped: number;
  errors: { asin: string; reason: string }[];
}

interface KeepaProduct {
  asin: string;
  title?: string;
  imagesCSV?: string;
  stats?: {
    current?: number[];
  };
}

interface KeepaResponse {
  products?: KeepaProduct[];
  error?: { message: string };
  tokensLeft?: number;
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

/** Precio en céntimos -> euros. -1/-2 en Keepa significa "sin dato". */
function centsToEuros(cents: number | undefined): number | null {
  if (cents === undefined || cents < 0) return null;
  return Math.round(cents) / 100;
}

/**
 * Lee todos los productos de los datasets (fuente de verdad de specs) y
 * devuelve solo los ASIN reales, excluyendo los placeholder `B0EXAMPLE*`
 * usados mientras no tenemos el ASIN real de un producto.
 */
export function getRealAsins(): string[] {
  const asins = getAllProducts()
    .map((p) => p.asin)
    .filter((asin) => Boolean(asin) && !asin.startsWith("B0EXAMPLE"));
  return Array.from(new Set(asins));
}

/**
 * Sincroniza precio/disponibilidad/imagen desde Keepa hacia `product_prices`
 * en Supabase. Pensado para ejecutarse tanto desde el script de CLI
 * (scripts/sync-keepa-prices.ts) como desde el endpoint de cron
 * (app/api/cron/sync-prices/route.ts) — toda la lógica vive aquí para no
 * duplicarla entre ambos.
 */
export async function syncKeepaPrices(): Promise<SyncResult> {
  const apiKey = process.env.KEEPA_API_KEY;
  if (!apiKey) {
    throw new Error("Falta KEEPA_API_KEY en el entorno.");
  }

  const asins = getRealAsins();
  const supabase = getSupabaseAdminClient();

  const result: SyncResult = { updated: 0, skipped: 0, errors: [] };

  // Precios ya guardados, para poder desplazarlos a `price_previous` al
  // sobrescribir con el valor nuevo de esta pasada.
  const { data: existingRows } = await supabase.from("product_prices").select("asin, price_current").in("asin", asins);
  const previousPriceByAsin = new Map((existingRows ?? []).map((row) => [row.asin, row.price_current]));

  for (const batch of chunk(asins, KEEPA_BATCH_SIZE)) {
    let data: KeepaResponse;
    try {
      const url = `${KEEPA_API_BASE}?key=${apiKey}&domain=${KEEPA_DOMAIN_ES}&asin=${batch.join(",")}&stats=1`;
      const res = await fetch(url);

      if (res.status === 429) {
        result.errors.push({ asin: batch.join(","), reason: "rate_limit (429 de Keepa)" });
        continue;
      }
      if (!res.ok) {
        result.errors.push({ asin: batch.join(","), reason: `HTTP ${res.status}` });
        continue;
      }

      data = (await res.json()) as KeepaResponse;
    } catch (err) {
      result.errors.push({ asin: batch.join(","), reason: err instanceof Error ? err.message : "fetch_error" });
      continue;
    }

    if (data.error) {
      result.errors.push({ asin: batch.join(","), reason: data.error.message });
      continue;
    }

    const foundAsins = new Set((data.products ?? []).map((p) => p.asin));
    for (const asin of batch) {
      if (!foundAsins.has(asin)) {
        result.errors.push({ asin, reason: "asin_no_encontrado_en_keepa" });
      }
    }

    for (const product of data.products ?? []) {
      // Índices del array `stats.current` de Keepa: 0=AMAZON, 1=NEW, 17=RATING (x10), 18=COUNT_REVIEWS.
      const current = product.stats?.current ?? [];
      const amazonPriceCents = current[0];
      const newPriceCents = current[1];
      const priceCents = amazonPriceCents !== undefined && amazonPriceCents >= 0 ? amazonPriceCents : newPriceCents;
      const priceCurrent = centsToEuros(priceCents);

      if (priceCurrent === null) {
        result.errors.push({ asin: product.asin, reason: "sin_precio_disponible" });
        continue;
      }

      const ratingRaw = current[17];
      const reviewCountRaw = current[18];
      const firstImage = product.imagesCSV?.split(",")[0];

      const { error } = await supabase.from("product_prices").upsert(
        {
          asin: product.asin,
          price_current: priceCurrent,
          price_previous: previousPriceByAsin.get(product.asin) ?? null,
          currency: "EUR",
          availability: priceCurrent !== null ? "in_stock" : "out_of_stock",
          image_url: firstImage ? `https://m.media-amazon.com/images/I/${firstImage}` : null,
          rating: ratingRaw !== undefined && ratingRaw >= 0 ? ratingRaw / 10 : null,
          review_count: reviewCountRaw !== undefined && reviewCountRaw >= 0 ? reviewCountRaw : null,
          last_updated: new Date().toISOString(),
        },
        { onConflict: "asin" }
      );

      if (error) {
        result.errors.push({ asin: product.asin, reason: `supabase: ${error.message}` });
      } else {
        result.updated += 1;
      }
    }
  }

  result.skipped = asins.length - result.updated - result.errors.length;
  return result;
}
