import Link from "next/link";
import type { GuidePage } from "@/lib/seo/programmatic-pages";
import { getGuideProducts, getGuideTopPick } from "@/lib/seo/programmatic-pages";
import { getProductPrices } from "@/lib/pricing/getProductPrices";
import { resolveRelatedLink } from "@/lib/content";
import { CATEGORY_LABELS } from "@/lib/constants";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { GuideTopPick } from "@/components/product/GuideTopPick";
import { Faq } from "@/components/product/Faq";
import { TrustSection } from "@/components/home/TrustSection";

export async function GuideDetailTemplate({ guide, path }: { guide: GuidePage; path: string }) {
  const products = getGuideProducts(guide);
  const prices = await getProductPrices(products.map((p) => p.asin));
  const categoryLabel = CATEGORY_LABELS[guide.category];
  const topPick = guide.topPickCta ? getGuideTopPick(guide, products) : undefined;

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: categoryLabel, path: `/${guide.category}` },
          { name: guide.title, path },
        ]}
      />
      <TrustSection compact />

      <div>
        <h1 className="text-3xl font-extrabold leading-tight">{guide.h1}</h1>
        {topPick && (
          <div className="mt-4 max-w-3xl">
            <GuideTopPick product={topPick} livePrice={prices.get(topPick.asin)} />
          </div>
        )}
        <p className="mt-4 max-w-3xl text-lg text-muted">{guide.intro}</p>
      </div>

      {products.length === 0 ? (
        <p className="text-muted">Todavía no tenemos suficientes productos publicados para esta guía.</p>
      ) : (
        <ol id="ranking" className="grid scroll-mt-6 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {guide.relatedSlugs && guide.relatedSlugs.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">También te puede interesar</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {guide.relatedSlugs.map((slug) => {
              const { href, label } = resolveRelatedLink(slug);
              return (
                <li key={slug}>
                  <Link
                    href={href}
                    className="block rounded-2xl border border-border p-4 font-medium capitalize hover:border-brand-primary hover:text-brand-primary"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
