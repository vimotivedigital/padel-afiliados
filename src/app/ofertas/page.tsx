import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getOnSaleProducts } from "@/lib/products";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { AffiliateDisclosure } from "@/components/product/AffiliateDisclosure";

export const metadata: Metadata = buildMetadata({
  title: "Ofertas de material de pádel",
  description: "Las mejores ofertas activas en palas, zapatillas y accesorios de pádel.",
  path: "/ofertas",
});

export default function OfertasPage() {
  const products = getOnSaleProducts(50);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Ofertas", path: "/ofertas" }]} />
      <h1 className="text-3xl font-extrabold">Ofertas</h1>
      <AffiliateDisclosure />

      {products.length === 0 ? (
        <p className="text-muted">No hay ofertas activas ahora mismo. Vuelve pronto.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
