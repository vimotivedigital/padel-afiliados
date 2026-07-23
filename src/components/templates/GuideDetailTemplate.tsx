import Link from "next/link";
import type { GuidePage } from "@/lib/seo/programmatic-pages";
import { getGuideProducts, getGuideTopPick } from "@/lib/seo/programmatic-pages";
import { getProductPrices, getMostRecentSync } from "@/lib/pricing/getProductPrices";
import { resolveRelatedLink } from "@/lib/content";
import { CATEGORY_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
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
  const mostRecentSync = getMostRecentSync(prices);
  const introWordCount = guide.intro.trim().split(/\s+/).filter(Boolean).length;
  /**
   * El índice solo aparece en guías que ya tienen contenido suficiente para
   * justificarlo (intro ampliada, no las 12 palabras originales de las
   * guías sin desarrollar). No se muestra "Ranking" ni "Cómo elegimos" como
   * anclas separadas cuando ya hay un ancla al ranking dentro del propio
   * GuideTopPick (Calidad-Precio, Zapatillas) — el índice reutiliza el
   * mismo #ranking en vez de crear una ancla nueva y confusa.
   */
  const showToc = introWordCount >= 100;

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

      <div id="intro">
        <h1 className="text-3xl font-extrabold leading-tight">{guide.h1}</h1>
        {topPick && (
          <div className="mt-4 max-w-3xl">
            <GuideTopPick product={topPick} livePrice={prices.get(topPick.asin)} />
          </div>
        )}
        <p className="mt-4 max-w-3xl text-lg text-muted">{guide.intro}</p>
        {showToc && (
          <nav aria-label="Contenido de la página" className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {products.length > 0 && (
              <a href="#ranking" className="text-brand-primary hover:underline">
                Ranking
              </a>
            )}
            {guide.faqs.length > 0 && (
              <a href="#faqs" className="text-brand-primary hover:underline">
                Preguntas frecuentes
              </a>
            )}
            <a href="#metodologia" className="text-brand-primary hover:underline">
              Cómo elegimos
            </a>
          </nav>
        )}
      </div>

      {products.length === 0 ? (
        <p className="text-muted">Todavía no tenemos suficientes productos publicados para esta guía.</p>
      ) : (
        <>
          {mostRecentSync && (
            <p className="text-xs text-muted">
              Precios actualizados: {formatDate(mostRecentSync)} (producto sincronizado más recientemente de esta guía)
            </p>
          )}
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
        </>
      )}

      <p id="metodologia" className="scroll-mt-6 text-sm text-muted">
        <Link href="/sobre-nosotros" className="font-semibold text-brand-primary hover:underline">
          Conoce nuestra metodología completa →
        </Link>
      </p>

      <div id="faqs" className="scroll-mt-6">
        <Faq faqs={guide.faqs} />
      </div>

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
