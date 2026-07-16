import type { Product } from "@/engine/types";
import { getProductPrice } from "@/lib/pricing/getProductPrice";
import { formatPrice } from "@/lib/utils";

function formatUpdatedAt(iso: string): string {
  const updated = new Date(iso);
  const isToday = updated.toDateString() === new Date().toDateString();
  if (isToday) return "actualizado hoy";
  return `actualizado el ${new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" }).format(updated)}`;
}

/**
 * Precio del producto: si hay fila en `product_prices` (Supabase, vía
 * Keepa) usa ese valor como "precio orientativo"; si no, cae de vuelta al
 * precio del dataset JSON como "precio de referencia". El dataset sigue
 * siendo la fuente de verdad para specs/contenido — esto solo afecta a lo
 * que se muestra como precio.
 */
export async function PriceDisplay({ product }: { product: Product }) {
  const live = await getProductPrice(product.asin);
  const datasetPrice = product.onSale && product.salePrice ? product.salePrice : product.price;

  if (live) {
    return (
      <div className="space-y-1">
        <div className="flex items-baseline gap-3">
          {live.pricePrevious && live.pricePrevious > live.priceCurrent && (
            <span className="text-lg text-muted line-through">{formatPrice(live.pricePrevious)}</span>
          )}
          <span className="text-3xl font-extrabold">{formatPrice(live.priceCurrent)}</span>
        </div>
        <p className="text-xs text-muted">
          Precio orientativo ({formatUpdatedAt(live.lastUpdated)}) — el precio final se confirma en Amazon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-baseline gap-3">
        {product.onSale && product.salePrice && (
          <span className="text-lg text-muted line-through">{formatPrice(product.price)}</span>
        )}
        <span className="text-3xl font-extrabold">{formatPrice(datasetPrice)}</span>
      </div>
      <p className="text-xs text-muted">Precio de referencia — el precio final se confirma en Amazon.</p>
    </div>
  );
}
