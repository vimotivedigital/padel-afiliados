import type { Product } from "@/engine/types";
import { ProductCard } from "./ProductCard";

export function SimilarProducts({ products, title = "Productos similares" }: { products: Product[]; title?: string }) {
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
