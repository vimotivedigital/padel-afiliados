import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllComparisons } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Comparativas de material de pádel",
  description: "Comparativas cara a cara entre las palas, zapatillas y accesorios más populares del mercado.",
  path: "/comparativas",
});

export default function ComparativasPage() {
  const comparisons = getAllComparisons();

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Comparativas", path: "/comparativas" }]} />
      <h1 className="text-3xl font-extrabold">Comparativas</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.slug}
            href={`/comparativas/${comparison.slug}`}
            className="rounded-2xl border border-border bg-surface p-5 hover:shadow-md"
          >
            <p className="font-semibold">{comparison.title}</p>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{comparison.intro}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
