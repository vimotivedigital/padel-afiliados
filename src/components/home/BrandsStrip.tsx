import Image from "next/image";
import Link from "next/link";
import { getAllBrands } from "@/lib/products";

export function BrandsStrip() {
  const brands = getAllBrands();

  return (
    <section>
      <h2 className="text-2xl font-bold">Marcas</h2>
      <div className="mt-5 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/marcas/${brand.slug}`}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-4 text-center text-sm font-semibold hover:border-brand-primary"
          >
            <div className="relative h-10 w-10">
              <Image src={brand.logo} alt={brand.name} fill sizes="40px" className="object-contain" />
            </div>
            {brand.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
