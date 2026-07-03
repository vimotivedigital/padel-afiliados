import type { Overgrip, Pelota, Product, Protector } from "@/engine/types";
import { CATEGORY_LABELS } from "@/lib/constants";
import { buildSpecRows } from "@/lib/specs";
import { getSimilarProducts } from "@/lib/products";
import { buildCrossSellPack } from "@/engine/recommendation/crossSell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Rating } from "@/components/ui/Rating";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SpecsTable } from "@/components/product/SpecsTable";
import { ProsConsBox } from "@/components/product/ProsConsBox";
import { EditorReviewBox } from "@/components/product/EditorReviewBox";
import { AmazonCTA } from "@/components/product/AmazonCTA";
import { AffiliateDisclosure } from "@/components/product/AffiliateDisclosure";
import { SimilarProducts } from "@/components/product/SimilarProducts";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Faq } from "@/components/product/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { productSchema } from "@/lib/seo/schema";
import { formatPrice } from "@/lib/utils";

export function ProductDetailTemplate({ product, path }: { product: Product; path: string }) {
  const label = CATEGORY_LABELS[product.category];
  const similar = getSimilarProducts(product, 4);
  const crossSell: Product[] =
    product.category === "palas"
      ? Object.values(buildCrossSellPack(product, {})).filter(
          (p): p is Overgrip | Protector | Pelota => Boolean(p)
        )
      : [];

  return (
    <div className="space-y-10">
      <JsonLd data={productSchema(product, path)} />
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: label, path: `/${product.category}` },
          { name: product.name, path },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">{product.brand}</p>
          <h1 className="text-3xl font-extrabold leading-tight">{product.name}</h1>
          <Rating value={product.rating} count={product.reviewCount} />
          <p className="text-muted">{product.shortDescription}</p>

          <div className="flex items-baseline gap-3">
            {product.onSale && product.salePrice && (
              <span className="text-lg text-muted line-through">{formatPrice(product.price)}</span>
            )}
            <span className="text-3xl font-extrabold">
              {formatPrice(product.onSale && product.salePrice ? product.salePrice : product.price)}
            </span>
          </div>

          <AmazonCTA asin={product.asin} productName={product.name} size="lg" />
          <AffiliateDisclosure />
        </div>
      </div>

      <section>
        <h2 className="text-xl font-bold">Descripción</h2>
        <p className="mt-3 leading-relaxed text-foreground">{product.description}</p>
      </section>

      <ProsConsBox pros={product.pros} cons={product.cons} />

      <EditorReviewBox editorRating={product.editorRating} editorReview={product.editorReview} />

      <SpecsTable specs={buildSpecRows(product)} />

      <Faq faqs={product.faqs} />

      {crossSell.length > 0 && <RelatedProducts products={crossSell} />}

      <SimilarProducts products={similar} />
    </div>
  );
}
