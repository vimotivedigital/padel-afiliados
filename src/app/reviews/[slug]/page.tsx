import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { findProductBySlugAnyCategory, getReviewedProducts } from "@/lib/products";
import { ReviewDetailTemplate } from "@/components/templates/ReviewDetailTemplate";

export async function generateStaticParams() {
  return getReviewedProducts().map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductBySlugAnyCategory(slug);
  if (!product) {
    return buildMetadata({ title: "Review no encontrada", description: "Contenido no disponible.", path: `/reviews/${slug}`, noIndex: true });
  }
  return buildMetadata({
    title: `Review: ${product.name}`,
    description: product.shortDescription,
    path: `/reviews/${slug}`,
    image: product.images[0],
  });
}

export default async function ReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const product = findProductBySlugAnyCategory(slug);
  if (!product || !product.hasFullReview) notFound();

  return <ReviewDetailTemplate product={product} path={`/reviews/${slug}`} />;
}
