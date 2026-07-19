import Link from "next/link";
import { notFound } from "next/navigation";
import type { Comparison } from "@/engine/types";
import { findProductBySlugAnyCategory } from "@/lib/products";
import { resolveRelatedLink } from "@/lib/content";
import { buildSpecRows } from "@/lib/specs";
import { getProductPrices } from "@/lib/pricing/getProductPrices";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ComparisonTable } from "@/components/comparison/ComparisonTable";
import { ProsConsBox } from "@/components/product/ProsConsBox";
import { AmazonCTA } from "@/components/product/AmazonCTA";
import { Faq } from "@/components/product/Faq";
import { TrustSection } from "@/components/home/TrustSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";
import { formatDate } from "@/lib/utils";

export async function ComparisonDetailTemplate({ comparison, path }: { comparison: Comparison; path: string }) {
  const [slugA, slugB] = comparison.productSlugs;
  const productA = findProductBySlugAnyCategory(slugA);
  const productB = findProductBySlugAnyCategory(slugB);
  if (!productA || !productB) notFound();

  const prices = await getProductPrices([productA.asin, productB.asin]);

  const specsA = buildSpecRows(productA);
  const specsB = buildSpecRows(productB);
  const rows = specsA
    .map((spec) => {
      const match = specsB.find((s) => s.label === spec.label);
      return match ? { label: spec.label, a: spec.value, b: match.value } : null;
    })
    .filter((row): row is { label: string; a: string; b: string } => Boolean(row));

  const winner = comparison.verdict.winnerSlug === productA.slug ? productA : productB;

  const pathA = `/${productA.category}/${productA.slug}`;
  const pathB = `/${productB.category}/${productB.slug}`;

  return (
    <div className="space-y-10">
      <JsonLd data={breadcrumbSchema([{ name: "Inicio", path: "/" }, { name: "Comparativas", path: "/comparativas" }, { name: comparison.title, path }])} />
      <JsonLd data={productSchema(productA, pathA)} />
      <JsonLd data={productSchema(productB, pathB)} />
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Comparativas", path: "/comparativas" }, { name: comparison.title, path }]} />

      <TrustSection compact />

      <header>
        <h1 className="text-3xl font-extrabold leading-tight">{comparison.h1}</h1>
        <p className="mt-2 text-xs text-muted">Actualizado el {formatDate(comparison.updatedAt)}</p>
        <p className="mt-4 text-lg text-muted">{comparison.intro}</p>
      </header>

      <ComparisonTable
        productA={productA}
        productB={productB}
        rows={rows}
        priceA={prices.get(productA.asin)}
        priceB={prices.get(productB.asin)}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold">{productA.name}</h2>
          <p className="mt-2 text-sm text-muted">{comparison.whoShouldBuyA}</p>
          <div className="mt-3">
            <ProsConsBox pros={comparison.prosA} cons={comparison.consA} />
          </div>
          <AmazonCTA asin={productA.asin} productName={productA.name} size="sm" className="mt-4 w-full" />
        </div>
        <div>
          <h2 className="text-lg font-bold">{productB.name}</h2>
          <p className="mt-2 text-sm text-muted">{comparison.whoShouldBuyB}</p>
          <div className="mt-3">
            <ProsConsBox pros={comparison.prosB} cons={comparison.consB} />
          </div>
          <AmazonCTA asin={productB.asin} productName={productB.name} size="sm" className="mt-4 w-full" />
        </div>
      </div>

      <section className="rounded-2xl border-2 border-brand-primary/20 bg-brand-primary/5 p-5">
        <h2 className="text-xl font-bold">Veredicto final</h2>
        <p className="mt-2 text-sm">
          Ganadora de esta comparativa: <strong>{winner.name}</strong>
        </p>
        <p className="mt-3 leading-relaxed">{comparison.verdict.summary}</p>
        <AmazonCTA asin={winner.asin} productName={winner.name} size="lg" className="mt-4" />
      </section>

      <Faq faqs={comparison.faqs} />

      {comparison.relatedSlugs && comparison.relatedSlugs.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">También te puede interesar</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {comparison.relatedSlugs.map((slug) => {
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
