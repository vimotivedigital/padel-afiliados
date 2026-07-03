import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/engine/types";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { AmazonCTA } from "@/components/product/AmazonCTA";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product, matchScore }: { product: Product; matchScore?: number }) {
  const href = `/${product.category}/${product.slug}`;
  const price = product.onSale && product.salePrice ? product.salePrice : product.price;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg">
      <Link href={href} className="relative block aspect-square bg-black/[0.03]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-6 transition-transform group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.onSale && <Badge tone="danger">Oferta</Badge>}
          {matchScore !== undefined && <Badge tone="accent">{matchScore}% afinidad</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">{product.brand}</p>
        <Link href={href} className="font-semibold leading-snug hover:text-brand-primary">
          {product.name}
        </Link>
        <Rating value={product.rating} count={product.reviewCount} />
        <p className="line-clamp-2 text-sm text-muted">{product.shortDescription}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div>
            {product.onSale && product.salePrice && (
              <span className="mr-2 text-sm text-muted line-through">{formatPrice(product.price)}</span>
            )}
            <span className="text-lg font-bold">{formatPrice(price)}</span>
          </div>
        </div>
        <AmazonCTA asin={product.asin} productName={product.name} size="sm" className="w-full" />
      </div>
    </article>
  );
}
