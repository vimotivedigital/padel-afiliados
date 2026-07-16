import Image from "next/image";
import Link from "next/link";
import { getReviewedProducts } from "@/lib/products";
import { Rating } from "@/components/ui/Rating";

export function LatestReviews() {
  const reviewed = getReviewedProducts();
  if (reviewed.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold">Últimas reviews</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {reviewed.map((product) => (
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
              {product.reviewCount > 0 && <Rating value={product.rating} count={product.reviewCount} className="mt-1" />}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
