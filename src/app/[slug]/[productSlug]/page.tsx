import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORY_LABELS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProductBySlug, getProductsByCategory } from "@/lib/products";
import { ProductDetailTemplate } from "@/components/templates/ProductDetailTemplate";
import type { Category } from "@/engine/types";

const CATEGORY_SLUGS = Object.keys(CATEGORY_LABELS) as Category[];

export async function generateStaticParams() {
  return CATEGORY_SLUGS.flatMap((slug) =>
    getProductsByCategory(slug).map((product) => ({ slug, productSlug: product.slug }))
  );
}

interface PageProps {
  params: Promise<{ slug: string; productSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, productSlug } = await params;
  if (!CATEGORY_SLUGS.includes(slug as Category)) {
    return buildMetadata({ title: "Página no encontrada", description: "Contenido no disponible.", path: `/${slug}/${productSlug}`, noIndex: true });
  }

  const product = getProductBySlug(slug as Category, productSlug);
  if (!product) {
    return buildMetadata({ title: "Producto no encontrado", description: "Contenido no disponible.", path: `/${slug}/${productSlug}`, noIndex: true });
  }

  return buildMetadata({
    title: `${product.name} — análisis, ficha y precio`,
    description: product.shortDescription,
    path: `/${slug}/${productSlug}`,
    image: product.images[0],
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, productSlug } = await params;
  if (!CATEGORY_SLUGS.includes(slug as Category)) notFound();

  const product = getProductBySlug(slug as Category, productSlug);
  if (!product) notFound();

  return <ProductDetailTemplate product={product} path={`/${slug}/${productSlug}`} />;
}
