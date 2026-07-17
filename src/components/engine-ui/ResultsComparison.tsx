import type { RecommendationItem } from "@/engine/recommendation/recommend";
import type { Product } from "@/engine/types";
import type { LivePrice } from "@/lib/pricing/getProductPrice";
import { formatPrice } from "@/lib/utils";

export function ResultsComparison({
  results,
  priceMap,
}: {
  results: RecommendationItem<Product>[];
  priceMap?: Map<string, LivePrice>;
}) {
  if (results.length < 2) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="border-b border-border bg-black/[0.02]">
            <th className="px-4 py-3 text-left font-medium text-muted">Modelo</th>
            <th className="px-4 py-3 text-left font-medium text-muted">Afinidad</th>
            <th className="px-4 py-3 text-left font-medium text-muted">Valoración</th>
            <th className="px-4 py-3 text-left font-medium text-muted">Precio</th>
          </tr>
        </thead>
        <tbody>
          {results.map(({ product, score }) => {
            const live = priceMap?.get(product.asin);
            const price = live?.priceCurrent ?? product.price;
            return (
              <tr key={product.id} className="border-b border-border last:border-0 odd:bg-black/[0.015]">
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3">{score}%</td>
                <td className="px-4 py-3">{product.rating.toFixed(1)} / 5</td>
                <td className="px-4 py-3 font-semibold">{formatPrice(price)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
