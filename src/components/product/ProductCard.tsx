import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/engine/types";
import type { LivePrice } from "@/lib/pricing/getProductPrice";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { AmazonCTA } from "@/components/product/AmazonCTA";
import { formatPrice } from "@/lib/utils";

/**
 * `livePrice` es opcional: si el llamante ya resolvió el precio en vivo
 * (Supabase, vía Keepa) se lo pasa aquí para que la tarjeta muestre
 * exactamente el mismo precio que la ficha de producto (`PriceDisplay`).
 * Si no se pasa (o no hay fila en `product_prices`), cae de vuelta al
 * precio del dataset, igual que hacía antes.
 */
export function ProductCard({
  product,
  matchScore,
  livePrice,
}: {
  product: Product;
  matchScore?: number;
  livePrice?: LivePrice | null;
}) {
  const href = `/${product.category}/${product.slug}`;
  const imageSrc = livePrice?.imageUrl ?? product.images[0];
  const datasetPrice = product.onSale && product.salePrice ? product.salePrice : product.price;
  const liveCurrent = livePrice?.priceCurrent ?? null;
  const price = liveCurrent ?? datasetPrice;
  const previousPrice = liveCurrent !== null
    ? livePrice!.pricePrevious
    : product.onSale && product.salePrice
      ? product.price
      : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg">
      <Link href={href} className="relative block aspect-square bg-black/[0.03]">
        <Image
          src={imageSrc}
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
        {product.reviewCount > 0 && <Rating value={product.rating} count={product.reviewCount} />}
        <p className="line-clamp-2 text-sm text-muted">{product.shortDescription}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div>
            {previousPrice && previousPrice > price && (
              <span className="mr-2 text-sm text-muted line-through">{formatPrice(previousPrice)}</span>
            )}
            <span className="text-lg font-bold">{formatPrice(price)}</span>
          </div>
        </div>
        <AmazonCTA asin={product.asin} productName={product.name} size="sm" className="w-full" />
      </div>
    </article>
  );
}
