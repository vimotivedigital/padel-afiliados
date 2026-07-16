import type { Product } from "@/engine/types";
import type { LivePrice } from "@/lib/pricing/getProductPrice";
import { ProductCard } from "./ProductCard";

export function SimilarProducts({
  products,
  title = "Productos similares",
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
