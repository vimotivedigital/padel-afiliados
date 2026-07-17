import { articles } from "@/content/articles";
import { comparisons } from "@/content/comparisons";
import type { Article, Comparison } from "@/engine/types";
import { getProgrammaticPage } from "@/lib/seo/programmatic-pages";

export function getAllArticles(): Article[] {
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllComparisons(): Comparison[] {
  return comparisons;
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

/** Resuelve un slug de relatedSlugs contra artículos, comparativas o guías/variantes de selector, con un título legible para el enlace. */
export function resolveRelatedLink(slug: string): { href: string; label: string } {
  const article = getArticleBySlug(slug);
  if (article) return { href: `/blog/${slug}`, label: article.title };

  const comparison = getComparisonBySlug(slug);
  if (comparison) return { href: `/comparativas/${slug}`, label: comparison.title };

  const page = getProgrammaticPage(slug);
  if (page) return { href: `/${slug}`, label: page.title };

  return { href: `/${slug}`, label: slug.replace(/-/g, " ") };
}
