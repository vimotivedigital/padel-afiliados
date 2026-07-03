import Image from "next/image";
import type { Article } from "@/engine/types";
import { ArticleToc } from "./ArticleToc";
import { Faq } from "@/components/product/Faq";
import { formatDate, slugify } from "@/lib/utils";

export function ArticleLayout({ article }: { article: Article }) {
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
          {article.sections.map((section) => (
            <section key={section.heading} id={slugify(section.heading)}>
              <h2>{section.heading}</h2>
              <p>{section.content}</p>
            </section>
          ))}

          {article.faqs && (
            <div className="mt-10">
              <Faq faqs={article.faqs} />
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
