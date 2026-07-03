import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { SelectorPageTemplate } from "@/components/templates/SelectorPageTemplate";

export const metadata: Metadata = buildMetadata({
  title: "Selector de zapatillas de pádel",
  description: "Dinos cómo pisas, dónde juegas y tu presupuesto y te diremos qué zapatillas encajan mejor contigo.",
  path: "/selector-zapatillas",
});

export default function SelectorZapatillasPage() {
  return <SelectorPageTemplate configuratorId="zapatilla" path="/selector-zapatillas" />;
}
