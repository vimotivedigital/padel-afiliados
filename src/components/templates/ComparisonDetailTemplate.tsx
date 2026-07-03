import { notFound } from "next/navigation";
import type { Comparison } from "@/engine/types";
import { findProductBySlugAnyCategory } from "@/lib/products";
import { buildSpecRows } from "@/lib/specs";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ComparisonTable } from "@/components/comparison/ComparisonTable";
import { ProsConsBox } from "@/components/product/ProsConsBox";
import { Faq } from "@/components/product/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { formatDate } from "@/lib/utils";

export function ComparisonDetailTemplate({ comparison, path }: { comparison: Comparison; path: string }) {
  const [slugA, slugB] = comparison.productSlugs;
  const productA = findProductBySlugAnyCategory(slugA);
  const productB = findProductBySlugAnyCategory(slugB);
  if (!productA || !productB) notFound();

  const specsA = buildSpecRows(productA);
  const specsB = buildSpecRows(productB);
  const rows = specsA
    .map((spec) => {
      const match = specsB.find((s) => s.label === spec.label);
      return match ? { label: spec.label, a: spec.value, b: match.value } : null;
    })
    .filter((row): row is { label: string; a: string; b: string } => Boolean(row));

  const winner = comparison.verdict.winnerSlug === productA.slug ? productA : productB;

  return (
    <div className="space-y-10">
      <JsonLd data={breadcrumbSchema([{ name: "Inicio", path: "/" }, { name: "Comparativas", path: "/comparativas" }, { name: comparison.title, path }])} />
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Comparativas", path: "/comparativas" }, { name: comparison.title, path }]} />

      <header>
        <h1 className="text-3xl font-extrabold leading-tight">{comparison.h1}</h1>
        <p className="mt-2 text-xs text-muted">Actualizado el {formatDate(comparison.updatedAt)}</p>
        <p className="mt-4 text-lg text-muted">{comparison.intro}</p>
      </header>

      <ComparisonTable productA={productA} productB={productB} rows={rows} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold">{productA.name}</h2>
          <p className="mt-2 text-sm text-muted">{comparison.whoShouldBuyA}</p>
          <div className="mt-3">
            <ProsConsBox pros={comparison.prosA} cons={comparison.consA} />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">{productB.name}</h2>
          <p className="mt-2 text-sm text-muted">{comparison.whoShouldBuyB}</p>
          <div className="mt-3">
            <ProsConsBox pros={comparison.prosB} cons={comparison.consB} />
          </div>
        </div>
      </div>

      <section className="rounded-2xl border-2 border-brand-primary/20 bg-brand-primary/5 p-5">
        <h2 className="text-xl font-bold">Veredicto final</h2>
        <p className="mt-2 text-sm">
          Ganadora de esta comparativa: <strong>{winner.name}</strong>
        </p>
        <p className="mt-3 leading-relaxed">{comparison.verdict.summary}</p>
      </section>

      <Faq faqs={comparison.faqs} />
    </div>
  );
}
