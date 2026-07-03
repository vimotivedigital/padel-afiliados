import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function RecentArticles() {
  const articles = getAllArticles();
  if (articles.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold">Artículos recientes</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="overflow-hidden rounded-2xl border border-border bg-surface hover:shadow-md"
          >
            <div className="relative aspect-[2/1]">
              <Image
                src={article.coverImage}
                alt={article.h1}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">{article.category}</p>
              <p className="mt-1 font-semibold">{article.title}</p>
              <p className="mt-1 text-xs text-muted">{formatDate(article.publishedAt)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
