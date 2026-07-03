import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return buildMetadata({ title: "Artículo no encontrado", description: "Contenido no disponible.", path: `/blog/${slug}`, noIndex: true });
  }
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${slug}`,
    image: article.coverImage,
    type: "article",
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="space-y-6">
      <JsonLd data={breadcrumbSchema([{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog" }, { name: article.title, path: `/blog/${slug}` }])} />
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog" }, { name: article.title, path: `/blog/${slug}` }]} />
      <ArticleLayout article={article} />
    </div>
  );
}
