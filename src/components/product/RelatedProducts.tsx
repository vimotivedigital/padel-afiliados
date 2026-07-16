import type { Product } from "@/engine/types";
import type { LivePrice } from "@/lib/pricing/getProductPrice";
import { ProductCard } from "./ProductCard";

/**
 * A diferencia de <SimilarProducts> (alternativas dentro de la misma
 * categoría), esta se usa para completar la equipación con productos de
 * categorías distintas: overgrip, protector, pelotas... (ver
 * engine/recommendation/crossSell.ts).
 *
 * `priceMap` es opcional porque este componente se usa tanto desde Server
 * Components (ProductDetailTemplate, que lo resuelve con `getProductPrices`)
 * como desde el Wizard, que es un Client Component y lo resuelve con
 * `useLivePrices` en el navegador.
 */
export function RelatedProducts({
  products,
  title = "Completa tu equipación",
  priceMap,
}: {
  products: Product[];
  title?: string;
  priceMap?: Map<string, LivePrice>;
}) {
  if (products.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} livePrice={priceMap?.get(product.asin)} />
        ))}
      </div>
    </section>
  );
}
