"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SearchIndexEntry } from "@/lib/products";

export function SearchBar({ index, className }: { index: SearchIndexEntry[]; className?: string }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return index.filter((entry) => entry.title.toLowerCase().includes(q)).slice(0, 8);
  }, [index, query]);

  return (
    <div className={className}>
      <label className="sr-only" htmlFor="site-search">
        Buscar productos o marcas
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busca una pala, marca o guía..."
        className="w-full rounded-full border border-border bg-surface px-5 py-3 text-sm outline-none focus:border-brand-primary"
        autoComplete="off"
      />
      {results.length > 0 && (
        <ul className="relative z-20 mt-2 rounded-2xl border border-border bg-surface shadow-lg divide-y divide-border overflow-hidden">
          {results.map((entry) => (
            <li key={entry.href}>
              <Link
                href={entry.href}
                onClick={() => setQuery("")}
                className="flex items-center justify-between gap-4 px-4 py-3 text-sm hover:bg-black/[0.03]"
              >
                <span className="font-medium">{entry.title}</span>
                <span className="text-muted">{entry.subtitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
