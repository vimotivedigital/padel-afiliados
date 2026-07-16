import Image from "next/image";
import Link from "next/link";
import type { RecommendationItem } from "@/engine/recommendation/recommend";
import type { Product } from "@/engine/types";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { AmazonCTA } from "@/components/product/AmazonCTA";
import { formatPrice } from "@/lib/utils";

export function ResultCard({ result, rank }: { result: RecommendationItem<Product>; rank: number }) {
  const { product, score } = result;
  const href = `/${product.category}/${product.slug}`;

  return (
    <article className="relative flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row">
      {rank === 1 && (
        <span className="absolute -top-3 left-5 rounded-full bg-brand-accent px-3 py-1 text-xs font-bold text-brand-primary-dark">
          Mejor opción
        </span>
      )}
      <Link href={href} className="relative mx-auto h-32 w-32 shrink-0 sm:mx-0">
        <Image src={product.images[0]} alt={product.name} fill sizes="128px" className="object-contain" />
      </Link>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{score}% de afinidad</Badge>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{product.brand}</p>
        </div>
        <Link href={href} className="mt-1 block text-lg font-bold hover:text-brand-primary">
          {product.name}
        </Link>
        {product.reviewCount > 0 && <Rating value={product.rating} count={product.reviewCount} className="mt-1" />}
        <p className="mt-2 text-sm text-muted">{product.shortDescription}</p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <ul className="space-y-1 text-sm text-green-800">
            {product.pros.slice(0, 2).map((pro) => (
              <li key={pro}>✓ {pro}</li>
            ))}
          </ul>
          <ul className="space-y-1 text-sm text-red-800">
            {product.cons.slice(0, 1).map((con) => (
              <li key={con}>✕ {con}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="text-xl font-bold">{formatPrice(product.price)}</span>
          <AmazonCTA asin={product.asin} productName={product.name} />
          <Link href={href} className="text-sm font-medium text-brand-primary hover:underline">
            Ver ficha completa
          </Link>
        </div>
      </div>
    </article>
  );
}
