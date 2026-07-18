import type { Overgrip, Pelota, Product, Protector } from "@/engine/types";
import { CATEGORY_LABELS } from "@/lib/constants";
import { buildSpecRows } from "@/lib/specs";
import { getSimilarProducts } from "@/lib/products";
import { getProductPrice } from "@/lib/pricing/getProductPrice";
import { getProductPrices } from "@/lib/pricing/getProductPrices";
import { buildCrossSellPack } from "@/engine/recommendation/crossSell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Rating } from "@/components/ui/Rating";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SpecsTable } from "@/components/product/SpecsTable";
import { ProsConsBox } from "@/components/product/ProsConsBox";
import { EditorReviewBox } from "@/components/product/EditorReviewBox";
import { AmazonCTA } from "@/components/product/AmazonCTA";
import { AffiliateDisclosure } from "@/components/product/AffiliateDisclosure";
import { ProductTrustBadges } from "@/components/product/ProductTrustBadges";
import { SimilarProducts } from "@/components/product/SimilarProducts";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Faq } from "@/components/product/Faq";
import { ProductVideoReview } from "@/components/product/ProductVideoReview";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { JsonLd } from "@/components/seo/JsonLd";
import { productSchema } from "@/lib/seo/schema";

export async function ProductDetailTemplate({ product, path }: { product: Product; path: string }) {
  const label = CATEGORY_LABELS[product.category];
  const similar = getSimilarProducts(product, 4);
  const crossSell: Product[] =
    product.category === "palas"
      ? Object.values(buildCrossSellPack(product, {})).filter(
          (p): p is Overgrip | Protector | Pelota => Boolean(p)
        )
      : [];
  const prices = await getProductPrices([...similar, ...crossSell].map((p) => p.asin));
  const mainLive = await getProductPrice(product.asin);
  // Solo tenemos una foto real por producto (la principal de Keepa), no una
  // galería completa — si existe, sustituye al placeholder en vez de convivir con él.
  const galleryImages = mainLive?.imageUrl ? [mainLive.imageUrl] : product.images;

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
        <ProductGallery images={galleryImages} name={product.name} />

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">{product.brand}</p>
          <h1 className="text-3xl font-extrabold leading-tight">{product.name}</h1>
          {product.reviewCount > 0 && <Rating value={product.rating} count={product.reviewCount} />}
          <p className="text-muted">{product.shortDescription}</p>

          <PriceDisplay product={product} />

          <AmazonCTA asin={product.asin} productName={product.name} size="lg" />
          <ProductTrustBadges asin={product.asin} />
          <AffiliateDisclosure />
        </div>
      </div>

      <section>
        <h2 className="text-xl font-bold">Descripción</h2>
        <p className="mt-3 leading-relaxed text-foreground">{product.description}</p>
      </section>

      <ProsConsBox pros={product.pros} cons={product.cons} />

      <EditorReviewBox editorRating={product.editorRating} editorReview={product.editorReview} />

      {product.videoReview && <ProductVideoReview video={product.videoReview} />}

      <SpecsTable specs={buildSpecRows(product)} />

      <Faq faqs={product.faqs} />

      {crossSell.length > 0 && <RelatedProducts products={crossSell} priceMap={prices} />}

      <SimilarProducts products={similar} priceMap={prices} />
    </div>
  );
}
