import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getReviewedProducts } from "@/lib/products";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Rating } from "@/components/ui/Rating";

export const metadata: Metadata = buildMetadata({
  title: "Reviews de material de pádel",
  description: "Análisis en profundidad de palas, zapatillas y accesorios de pádel probados por nuestro equipo.",
  path: "/reviews",
});

export default function ReviewsPage() {
  const products = getReviewedProducts();

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Reviews", path: "/reviews" }]} />
      <h1 className="text-3xl font-extrabold">Reviews</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/reviews/${product.slug}`}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 hover:shadow-md"
          >
            <div className="relative h-20 w-20 shrink-0">
              <Image src={product.images[0]} alt={product.name} fill sizes="80px" className="object-contain" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{product.brand}</p>
              <p className="font-semibold">{product.name}</p>
              <Rating value={product.rating} count={product.reviewCount} className="mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
