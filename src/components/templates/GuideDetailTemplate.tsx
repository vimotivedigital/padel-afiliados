import type { GuidePage } from "@/lib/seo/programmatic-pages";
import { getGuideProducts } from "@/lib/seo/programmatic-pages";
import { getProductPrices } from "@/lib/pricing/getProductPrices";
import { CATEGORY_LABELS } from "@/lib/constants";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { Faq } from "@/components/product/Faq";

export async function GuideDetailTemplate({ guide, path }: { guide: GuidePage; path: string }) {
  const products = getGuideProducts(guide);
  const prices = await getProductPrices(products.map((p) => p.asin));
  const categoryLabel = CATEGORY_LABELS[guide.category];

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: categoryLabel, path: `/${guide.category}` },
          { name: guide.title, path },
        ]}
      />
      <div>
        <h1 className="text-3xl font-extrabold leading-tight">{guide.h1}</h1>
        <p className="mt-3 max-w-3xl text-lg text-muted">{guide.intro}</p>
      </div>

      {products.length === 0 ? (
        <p className="text-muted">Todavía no tenemos suficientes productos publicados para esta guía.</p>
      ) : (
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <li key={product.id} className="relative">
              <span className="absolute -left-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                {index + 1}
              </span>
              <ProductCard product={product} livePrice={prices.get(product.asin)} />
            </li>
          ))}
        </ol>
      )}

      <Faq faqs={guide.faqs} />
    </div>
  );
}
