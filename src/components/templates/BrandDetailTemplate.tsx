import Image from "next/image";
import type { Brand } from "@/engine/types";
import { getProductsByBrand } from "@/lib/products";
import { getProductPrices } from "@/lib/pricing/getProductPrices";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { Faq } from "@/components/product/Faq";

export async function BrandDetailTemplate({ brand, path }: { brand: Brand; path: string }) {
  const products = getProductsByBrand(brand.name);
  const prices = await getProductPrices(products.map((p) => p.asin));

  return (
    <div className="space-y-10">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Marcas", path: "/marcas" }, { name: brand.name, path }]} />

      <header className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="relative h-20 w-20 shrink-0">
          <Image src={brand.logo} alt={brand.name} fill sizes="80px" className="object-contain" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">{brand.name}</h1>
          <p className="mt-2 max-w-2xl text-muted">{brand.description}</p>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-bold">Historia</h2>
        <p className="mt-3 leading-relaxed">{brand.history}</p>
        {(brand.foundedYear || brand.country) && (
          <p className="mt-2 text-sm text-muted">
            {brand.foundedYear && <>Fundada en {brand.foundedYear}</>}
            {brand.foundedYear && brand.country && " · "}
            {brand.country && <>País: {brand.country}</>}
          </p>
        )}
      </section>

      {brand.technologies.length > 0 && (
        <section>
          <h2 className="text-xl font-bold">Tecnologías propias</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {brand.technologies.map((tech) => (
              <div key={tech.name} className="rounded-2xl border border-border p-4">
                <p className="font-semibold">{tech.name}</p>
                <p className="mt-1 text-sm text-muted">{tech.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold">Catálogo {brand.name}</h2>
        {products.length === 0 ? (
          <p className="mt-3 text-muted">Todavía no tenemos productos de esta marca publicados en el catálogo.</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} livePrice={prices.get(product.asin)} />
            ))}
          </div>
        )}
      </section>

      <Faq faqs={brand.faqs} />
    </div>
  );
}
