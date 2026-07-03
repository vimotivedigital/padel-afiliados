import Link from "next/link";
import { getAllComparisons } from "@/lib/content";

export function PopularComparisons() {
  const comparisons = getAllComparisons();
  if (comparisons.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold">Comparativas populares</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.slug}
            href={`/comparativas/${comparison.slug}`}
            className="rounded-2xl border border-border bg-surface p-5 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Comparativa</p>
            <p className="mt-1 font-semibold">{comparison.title}</p>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{comparison.intro}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
