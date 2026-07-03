import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { SelectorPageTemplate } from "@/components/templates/SelectorPageTemplate";

export const metadata: Metadata = buildMetadata({
  title: "Selector de protector de pala de pádel",
  description: "Dinos qué forma tiene tu pala y qué buscas y te diremos qué protector encaja mejor.",
  path: "/selector-protector",
});

export default function SelectorProtectorPage() {
  return <SelectorPageTemplate configuratorId="protector" path="/selector-protector" />;
}
