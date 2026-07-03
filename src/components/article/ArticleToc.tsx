import { slugify } from "@/lib/utils";

export function ArticleToc({ headings }: { headings: string[] }) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Índice del artículo" className="rounded-2xl border border-border p-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted">Índice</p>
      <ol className="mt-3 space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading}>
            <a href={`#${slugify(heading)}`} className="hover:text-brand-primary hover:underline">
              {heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
