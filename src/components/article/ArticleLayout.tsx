import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/engine/types";
import { ArticleToc } from "./ArticleToc";
import { Faq } from "@/components/product/Faq";
import { ProductCard } from "@/components/product/ProductCard";
import { findProductBySlugAnyCategory } from "@/lib/products";
import { getArticleBySlug } from "@/lib/content";
import { getProgrammaticPage } from "@/lib/seo/programmatic-pages";
import { getProductPrices } from "@/lib/pricing/getProductPrices";
import { formatDate, slugify } from "@/lib/utils";

/** Resuelve un slug de relatedSlugs contra guías/variantes de selector o artículos, para poder enlazarlo con un título legible. */
function resolveRelatedLink(slug: string): { href: string; label: string } {
  const article = getArticleBySlug(slug);
  if (article) return { href: `/blog/${slug}`, label: article.title };

  const page = getProgrammaticPage(slug);
  if (page) return { href: `/${slug}`, label: page.title };

  return { href: `/${slug}`, label: slug.replace(/-/g, " ") };
}

export async function ArticleLayout({ article }: { article: Article }) {
  const allEmbeddedAsins = article.sections
    .flatMap((section) => section.productSlugs ?? [])
    .map((slug) => findProductBySlugAnyCategory(slug)?.asin)
    .filter((asin): asin is string => Boolean(asin));
  const prices = await getProductPrices(allEmbeddedAsins);

  return (
    <article>
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">{article.category}</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">{article.h1}</h1>
        <p className="mt-3 text-sm text-muted">
          Por {article.author} · {formatDate(article.publishedAt)} · {article.readingMinutes} min de lectura
        </p>
        <div className="relative mt-6 aspect-[2/1] overflow-hidden rounded-2xl">
          <Image
            src={article.coverImage}
            alt={article.h1}
            fill
            sizes="(max-width: 1024px) 100vw, 780px"
            className="object-cover"
            priority
          />
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
        <div className="prose-article max-w-none">
          <p className="text-lg text-muted">{article.excerpt}</p>
          {article.sections.map((section) => {
            const products = section.productSlugs
              ?.map((slug) => findProductBySlugAnyCategory(slug))
              .filter((p): p is NonNullable<typeof p> => Boolean(p));

            return (
              <section key={section.heading} id={slugify(section.heading)}>
                <h2>{section.heading}</h2>
                <p>{section.content}</p>
                {products && products.length > 0 && (
                  <div className="not-prose my-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} livePrice={prices.get(product.asin)} />
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          {article.faqs && (
            <div className="mt-10">
              <Faq faqs={article.faqs} />
            </div>
          )}

          {article.relatedSlugs && article.relatedSlugs.length > 0 && (
            <div className="not-prose mt-10">
              <h2 className="text-xl font-bold">También te puede interesar</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {article.relatedSlugs.map((slug) => {
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

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ArticleToc headings={article.sections.map((s) => s.heading)} />
        </aside>
      </div>
    </article>
  );
}
