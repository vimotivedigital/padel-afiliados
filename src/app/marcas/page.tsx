import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BrandsStrip } from "@/components/home/BrandsStrip";

export const metadata: Metadata = buildMetadata({
  title: "Marcas de pádel",
  description: "Conoce la historia, las tecnologías y el catálogo de las marcas de material de pádel más importantes.",
  path: "/marcas",
});

export default function BrandsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Marcas", path: "/marcas" }]} />
      <h1 className="text-3xl font-extrabold">Marcas</h1>
      <BrandsStrip />
    </div>
  );
}
