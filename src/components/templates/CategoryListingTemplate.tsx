import Link from "next/link";
import type { Category } from "@/engine/types";
import { getProductsByCategory } from "@/lib/products";
import { getProductPrices } from "@/lib/pricing/getProductPrices";
import { CATEGORY_LABELS } from "@/lib/constants";
import { categoryContent } from "@/lib/seo/category-content";
import { resolveRelatedLink } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { SortControl } from "@/components/product/SortControl";
import { Pagination } from "@/components/product/Pagination";
import { Faq } from "@/components/product/Faq";
import { sortProducts } from "@/lib/utils";

const PAGE_SIZE = 12;

export async function CategoryListingTemplate({
  category,
  sort,
  page,
}: {
  category: Category;
  sort?: string;
  page?: number;
}) {
  const label = CATEGORY_LABELS[category];
  const content = categoryContent[category];
  const guideLinks = content.guideSlugs.map(resolveRelatedLink);
  const allProducts = sortProducts(getProductsByCategory(category), sort);
  const currentPage = page && page > 0 ? page : 1;
  const totalPages = Math.max(1, Math.ceil(allProducts.length / PAGE_SIZE));
  const products = allProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const prices = await getProductPrices(products.map((p) => p.asin));

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: label, path: `/${category}` }]} />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold">{label}</h1>
        <SortControl />
      </div>

      <div className="max-w-3xl space-y-3">
        <p className="text-lg text-muted">{content.intro}</p>
        <p className="text-sm">
          ¿No sabes cuál elegir?{" "}
          {guideLinks.map((g, i) => (
            <span key={g.href}>
              <Link href={g.href} className="font-semibold text-brand-primary hover:underline">
                Consulta nuestra guía de {g.label.toLowerCase()}
              </Link>
              {i < guideLinks.length - 1 ? " · " : "."}
            </span>
          ))}
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-muted">Todavía no tenemos productos publicados en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} livePrice={prices.get(product.asin)} />
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/${category}`} searchParams={{ sort }} />

      {content.faqs.length > 0 && <Faq faqs={content.faqs} />}
    </div>
  );
}
