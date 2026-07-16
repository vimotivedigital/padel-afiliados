/**
 * Ejecuta la sincronización de precios de Keepa -> Supabase manualmente.
 *
 *   npm run sync-prices
 *
 * Requiere KEEPA_API_KEY, SUPABASE_URL y SUPABASE_SECRET_KEY en el entorno
 * (se cargan desde .env.local). Es la misma lógica que usa el cron diario
 * en app/api/cron/sync-prices/route.ts — está centralizada en
 * src/lib/pricing/syncKeepaPrices.ts para no duplicarla.
 */
import { config } from "dotenv";
import path from "node:path";
import { getRealAsins, syncKeepaPrices } from "../src/lib/pricing/syncKeepaPrices";

config({ path: path.resolve(__dirname, "../.env.local") });

async function main() {
  const asins = getRealAsins();
  console.log(`Sincronizando ${asins.length} ASIN reales (excluidos los placeholder B0EXAMPLE*)...`);

  const result = await syncKeepaPrices();

  console.log(`\nActualizados: ${result.updated}`);
  console.log(`Sin cambios/omitidos: ${result.skipped}`);
  console.log(`Errores: ${result.errors.length}`);

  if (result.errors.length > 0) {
    console.log("\nDetalle de errores:");
    for (const err of result.errors) {
      console.log(`  - ${err.asin}: ${err.reason}`);
    }
  }

  if (result.errors.length > 0 && result.updated === 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("Fallo al sincronizar precios:", err);
  process.exitCode = 1;
});
