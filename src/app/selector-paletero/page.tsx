import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { SelectorPageTemplate } from "@/components/templates/SelectorPageTemplate";

export const metadata: Metadata = buildMetadata({
  title: "Selector de paletero de pádel",
  description: "Dinos cuántas palas llevas y qué necesitas guardar y te diremos qué paletero encaja mejor contigo.",
  path: "/selector-paletero",
});

export default function SelectorPaleteroPage() {
  return <SelectorPageTemplate configuratorId="paletero" path="/selector-paletero" />;
}
