import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { SelectorPageTemplate } from "@/components/templates/SelectorPageTemplate";

export const metadata: Metadata = buildMetadata({
  title: "Selector de overgrip de pádel",
  description: "Dinos cuánto sudas de manos y qué tacto prefieres y te diremos qué overgrip encaja mejor contigo.",
  path: "/selector-overgrip",
});

export default function SelectorOvergripPage() {
  return <SelectorPageTemplate configuratorId="overgrip" path="/selector-overgrip" />;
}
