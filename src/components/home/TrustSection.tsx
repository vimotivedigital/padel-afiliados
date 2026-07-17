import Link from "next/link";
import { getAllProducts, getReviewedProducts, getAllBrands } from "@/lib/products";
import { getAllComparisons } from "@/lib/content";

/**
 * Cifras calculadas en el momento de build/request a partir del propio
 * catálogo, no hardcodeadas — así no se desincronizan del dataset real
 * a medida que crece (evita repetir el bug de "Últimas reviews" con
 * datos estáticos que quedan desfasados).
 */
export function TrustSection() {
  const productCount = getAllProducts().length;
  const brandCount = getAllBrands().length;
  const reviewCount = getReviewedProducts().length;
  const comparisonCount = getAllComparisons().length;

  const stats = [
    { value: productCount, label: "productos verificados" },
    { value: brandCount, label: "marcas" },
    { value: reviewCount, label: "reviews en profundidad" },
    { value: comparisonCount, label: "comparativas" },
  ];

  return (
    <section className="rounded-2xl border border-border bg-black/[0.02] p-6 sm:p-8">
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-extrabold text-brand-primary-dark">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">
        Cada producto está vinculado a un ASIN real de Amazon, con precio e imagen sincronizados automáticamente.
        El contenido editorial (descripciones, comparativas, guías) es redacción propia, sin datos inventados.{" "}
        <Link href="/sobre-nosotros" className="font-semibold text-brand-primary hover:underline">
          Nuestro criterio de verificación
        </Link>
        .
      </p>
    </section>
  );
}
