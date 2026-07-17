import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllComparisons, getComparisonBySlug } from "@/lib/content";
import { ComparisonDetailTemplate } from "@/components/templates/ComparisonDetailTemplate";

export async function generateStaticParams() {
  return getAllComparisons().map((c) => ({ slug: c.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) {
    return buildMetadata({ title: "Comparativa no encontrada", description: "Contenido no disponible.", path: `/comparativas/${slug}`, noIndex: true });
  }
  return buildMetadata({
    title: comparison.title,
    description: comparison.metaDescription ?? comparison.intro,
    path: `/comparativas/${slug}`,
  });
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  return <ComparisonDetailTemplate comparison={comparison} path={`/comparativas/${slug}`} />;
}
