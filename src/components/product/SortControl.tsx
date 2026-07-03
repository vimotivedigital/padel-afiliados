"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const OPTIONS = [
  { value: "relevancia", label: "Relevancia" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "valoracion", label: "Mejor valorados" },
];

export function SortControl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "relevancia";

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-muted">Ordenar por</span>
      <select
        value={current}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());
          if (e.target.value === "relevancia") params.delete("sort");
          else params.set("sort", e.target.value);
          const query = params.toString();
          router.push(query ? `${pathname}?${query}` : pathname);
        }}
        className="rounded-full border border-border bg-surface px-3 py-1.5"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function sortProducts<T extends { price: number; rating: number; editorRating: number }>(
  products: T[],
  sort: string | undefined
): T[] {
  const sorted = [...products];
  switch (sort) {
    case "precio-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "precio-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "valoracion":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted.sort((a, b) => b.editorRating - a.editorRating);
  }
}
