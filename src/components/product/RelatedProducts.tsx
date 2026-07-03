import type { Product } from "@/engine/types";
import { ProductCard } from "./ProductCard";

/**
 * A diferencia de <SimilarProducts> (alternativas dentro de la misma
 * categoría), esta se usa para completar la equipación con productos de
 * categorías distintas: overgrip, protector, pelotas... (ver
 * engine/recommendation/crossSell.ts).
 */
export function RelatedProducts({ products, title = "Completa tu equipación" }: { products: Product[]; title?: string }) {
  if (products.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
