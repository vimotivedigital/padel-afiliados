import Link from "next/link";
import { getAllProducts, getReviewedProducts, getAllBrands } from "@/lib/products";
import { getAllComparisons } from "@/lib/content";

/**
 * Cifras calculadas en el momento de build/request a partir del propio
 * catálogo, no hardcodeadas — así no se desincronizan del dataset real
 * a medida que crece (evita repetir el bug de "Últimas reviews" con
 * datos estáticos que quedan desfasados).
 */
/**
 * `compact` sustituye las tarjetas de estadística por una sola línea de
 * texto sin tarjeta/padding (~1-2 líneas, ~24-40px) — pensado para páginas
 * donde el propio contenido (H1 + intro, de longitud variable según la
 * pieza) ya deja muy poco margen por encima del pliegue en móvil real
 * (barra de Safari incluida, no solo el viewport CSS). En esos casos se
 * coloca además ANTES del H1 para no depender de cuánto ocupe el título.
 * La home y el resto de plantillas usan la versión completa por defecto.
 */
export function TrustSection({ compact = false }: { compact?: boolean } = {}) {
  const productCount = getAllProducts().length;
  const brandCount = getAllBrands().length;
  const reviewCount = getReviewedProducts().length;
  const comparisonCount = getAllComparisons().length;

  if (compact) {
    return (
      <p className="text-center text-xs text-muted">
        <strong className="text-foreground">{productCount}</strong> productos verificados ·{" "}
        <strong className="text-foreground">{brandCount}</strong> marcas · Afiliado oficial de Amazon
      </p>
    );
  }

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
            <p className="text-xs text-muted">{stat.label}</p>
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
