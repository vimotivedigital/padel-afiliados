import Link from "next/link";
import { CATEGORY_NAV } from "@/lib/constants";

export function CategoryGrid() {
  return (
    <section>
      <h2 className="text-2xl font-bold">Explora por categoría</h2>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {CATEGORY_NAV.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-surface p-6 text-center font-semibold transition-colors hover:border-brand-primary hover:bg-brand-primary/5"
          >
            {category.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
