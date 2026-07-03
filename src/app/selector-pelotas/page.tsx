import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { SelectorPageTemplate } from "@/components/templates/SelectorPageTemplate";

export const metadata: Metadata = buildMetadata({
  title: "Selector de pelotas de pádel",
  description: "Dinos para qué las necesitas y te diremos qué pelotas encajan mejor con tu juego.",
  path: "/selector-pelotas",
});

export default function SelectorPelotasPage() {
  return <SelectorPageTemplate configuratorId="pelota" path="/selector-pelotas" />;
}
