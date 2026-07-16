import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { SelectorPageTemplate } from "@/components/templates/SelectorPageTemplate";

export const metadata: Metadata = buildMetadata({
  title: "Selector de pala de pádel: encuentra tu pala ideal",
  description: "Responde 8 preguntas sobre tu nivel, estilo de juego y presupuesto y te diremos qué palas encajan mejor contigo.",
  path: "/selector-pala",
});

export default function SelectorPalaPage() {
  return <SelectorPageTemplate configuratorId="pala" path="/selector-pala" />;
}
