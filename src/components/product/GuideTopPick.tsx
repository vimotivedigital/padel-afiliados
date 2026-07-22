import Image from "next/image";
import type { Product } from "@/engine/types";
import type { LivePrice } from "@/lib/pricing/getProductPrice";
import { AmazonCTA } from "@/components/product/AmazonCTA";
import { formatPrice } from "@/lib/utils";

/**
 * Vía rápida para quien no quiere leer la intro larga de la guía antes de
 * llegar al ranking: muestra ya el producto nº1 con precio y CTA, más un
 * enlace ancla al ranking completo (id="ranking" en GuideDetailTemplate).
 * Deliberadamente marcado como "Nuestra recomendación nº1" para no
 * competir visualmente ni confundirse con el ranking completo de más
 * abajo, que sigue siendo la fuente principal de contexto/comparación.
 */
export function GuideTopPick({ product, livePrice }: { product: Product; livePrice?: LivePrice | null }) {
  const href = `/${product.category}/${product.slug}`;
  const imageSrc = livePrice?.imageUrl ?? product.images[0];
  const datasetPrice = product.onSale && product.salePrice ? product.salePrice : product.price;
  const price = livePrice?.priceCurrent ?? datasetPrice;

  return (
    <div className="rounded-2xl border-2 border-brand-primary/30 bg-brand-primary/5 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-primary">Nuestra recomendación nº1</p>
      <div className="mt-3 flex items-center gap-4">
        <a href={href} className="relative h-16 w-16 shrink-0">
          <Image src={imageSrc} alt={product.name} fill sizes="64px" className="object-contain" />
        </a>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{product.brand}</p>
          <a href={href} className="block truncate font-semibold hover:text-brand-primary">
            {product.name}
          </a>
          <p className="text-lg font-bold">{formatPrice(price)}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <AmazonCTA asin={product.asin} productName={product.name} size="sm" />
        <a href="#ranking" className="text-sm font-semibold text-brand-primary hover:underline">
          Ver el ranking completo ↓
        </a>
      </div>
    </div>
  );
}
