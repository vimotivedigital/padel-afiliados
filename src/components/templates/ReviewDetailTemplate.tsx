import Image from "next/image";
import type { Product } from "@/engine/types";
import { CATEGORY_LABELS } from "@/lib/constants";
import { buildSpecRows } from "@/lib/specs";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Rating } from "@/components/ui/Rating";
import { ProsConsBox } from "@/components/product/ProsConsBox";
import { SpecsTable } from "@/components/product/SpecsTable";
import { AmazonCTA } from "@/components/product/AmazonCTA";
import { AffiliateDisclosure } from "@/components/product/AffiliateDisclosure";
import { Faq } from "@/components/product/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { reviewSchema, productSchema } from "@/lib/seo/schema";
import { formatDate } from "@/lib/utils";

/**
 * A diferencia de la ficha de producto (orientada a decisión de compra
 * rápida), la review pone el foco en el veredicto editorial y usa el
 * schema.org Review además de Product.
 */
export function ReviewDetailTemplate({ product, path }: { product: Product; path: string }) {
  const label = CATEGORY_LABELS[product.category];

  return (
    <div className="space-y-10">
      <JsonLd data={reviewSchema(product, path)} />
      <JsonLd data={productSchema(product, path)} />
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: "Reviews", path: "/blog" },
          { name: product.name, path },
        ]}
      />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-28 w-28 shrink-0">
          <Image src={product.images[0]} alt={product.name} fill sizes="112px" className="object-contain" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">Review · {label}</p>
          <h1 className="mt-1 text-3xl font-extrabold leading-tight">{product.name}: análisis completo</h1>
          <div className="mt-2 flex items-center gap-3">
            <Rating value={product.rating} count={product.reviewCount} />
            <span className="rounded-full bg-brand-primary px-3 py-1 text-sm font-bold text-white">
              {product.editorRating.toFixed(1)}/10 editor
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">Actualizado el {formatDate(product.updatedAt)}</p>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-bold">Veredicto</h2>
        <p className="mt-3 leading-relaxed">{product.editorReview}</p>
      </section>

      <ProsConsBox pros={product.pros} cons={product.cons} />

      <SpecsTable specs={buildSpecRows(product)} title="Especificaciones analizadas" />

      <div className="flex flex-col gap-3 rounded-2xl border border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold">¿Te convence tras la review?</p>
        <AmazonCTA asin={product.asin} productName={product.name} />
      </div>
      <AffiliateDisclosure />

      <Faq faqs={product.faqs} />
    </div>
  );
}
