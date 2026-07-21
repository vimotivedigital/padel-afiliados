import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllComparisons } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TrustSection } from "@/components/home/TrustSection";

export const metadata: Metadata = buildMetadata({
  title: "Comparativas de material de pádel",
  description: "Comparativas cara a cara entre las palas, zapatillas y accesorios más populares del mercado.",
  path: "/comparativas",
});

export default function ComparativasPage() {
  const comparisons = getAllComparisons();

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Comparativas", path: "/comparativas" }]} />
      <TrustSection compact />
      <h1 className="text-3xl font-extrabold">Comparativas</h1>
      <p className="max-w-3xl text-lg text-muted">
        Enfrentamos cara a cara los modelos que más dudas generan al comprar: misma gama y precio parecido pero
        planteamientos distintos, la última versión frente a la anterior, o la referencia consolidada de una marca
        frente a la alternativa más reciente. Cada comparativa incluye tabla de especificaciones, precio actualizado,
        pros y contras de cada producto y un veredicto claro sobre cuál elegir según tu perfil de juego.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.slug}
            href={`/comparativas/${comparison.slug}`}
            className="rounded-2xl border border-border bg-surface p-5 hover:shadow-md"
          >
            <p className="font-semibold">{comparison.title}</p>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{comparison.intro}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
