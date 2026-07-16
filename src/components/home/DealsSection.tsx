import Link from "next/link";
import { getOnSaleProducts } from "@/lib/products";
import { getProductPrices } from "@/lib/pricing/getProductPrices";
import { ProductCard } from "@/components/product/ProductCard";

export async function DealsSection() {
  const deals = getOnSaleProducts(4);
  if (deals.length === 0) return null;
  const prices = await getProductPrices(deals.map((p) => p.asin));

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mejores ofertas</h2>
        <Link href="/ofertas" className="text-sm font-semibold text-brand-primary hover:underline">
          Ver todas
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {deals.map((product) => (
          <ProductCard key={product.id} product={product} livePrice={prices.get(product.asin)} />
        ))}
      </div>
    </section>
  );
}
