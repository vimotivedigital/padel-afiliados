import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllBrands, getBrandBySlug } from "@/lib/products";
import { BrandDetailTemplate } from "@/components/templates/BrandDetailTemplate";

export async function generateStaticParams() {
  return getAllBrands().map((b) => ({ slug: b.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) {
    return buildMetadata({ title: "Marca no encontrada", description: "Contenido no disponible.", path: `/marcas/${slug}`, noIndex: true });
  }
  return buildMetadata({ title: `Marca ${brand.name}`, description: brand.description, path: `/marcas/${slug}` });
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  return <BrandDetailTemplate brand={brand} path={`/marcas/${slug}`} />;
}
