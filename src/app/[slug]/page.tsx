import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORY_LABELS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";
import { programmaticPages, getProgrammaticPage } from "@/lib/seo/programmatic-pages";
import { categoryContent } from "@/lib/seo/category-content";
import { CategoryListingTemplate } from "@/components/templates/CategoryListingTemplate";
import { GuideDetailTemplate } from "@/components/templates/GuideDetailTemplate";
import { SelectorVariantTemplate } from "@/components/templates/SelectorVariantTemplate";
import type { Category } from "@/engine/types";

const CATEGORY_SLUGS = Object.keys(CATEGORY_LABELS) as Category[];

/**
 * Catch-all genérico de SEO programático: resuelve listados de categoría,
 * guías de ranking ("mejores-palas-control"...) y variantes del selector
 * ("selector-pala-principiante"...) desde un único registry
 * (lib/seo/programmatic-pages.ts), sin generar una ruta por cada una.
 * Next.js prioriza siempre las carpetas estáticas (/comparativas, /marcas...)
 * sobre este catch-all, así que no hay colisión de rutas.
 */
export async function generateStaticParams() {
  const categoryParams = CATEGORY_SLUGS.map((slug) => ({ slug }));
  const programmaticParams = programmaticPages.map((p) => ({ slug: p.slug }));
  return [...categoryParams, ...programmaticParams];
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (CATEGORY_SLUGS.includes(slug as Category)) {
    const label = CATEGORY_LABELS[slug];
    return buildMetadata({
      title: label,
      description: categoryContent[slug as Category].metaDescription,
      path: `/${slug}`,
    });
  }

  const page = getProgrammaticPage(slug);
  if (page) {
    const description = (page.type === "guide" ? page.metaDescription : undefined) ?? page.intro;
    return buildMetadata({ title: page.title, description, path: `/${slug}` });
  }

  return buildMetadata({ title: "Página no encontrada", description: "Contenido no disponible.", path: `/${slug}`, noIndex: true });
}

export default async function SlugPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;

  if (CATEGORY_SLUGS.includes(slug as Category)) {
    const page = query.page ? Number(query.page) : 1;
    return <CategoryListingTemplate category={slug as Category} sort={query.sort} page={page} />;
  }

  const page = getProgrammaticPage(slug);
  if (!page) notFound();

  if (page.type === "guide") {
    return <GuideDetailTemplate guide={page} path={`/${slug}`} />;
  }

  return <SelectorVariantTemplate variant={page} path={`/${slug}`} />;
}
