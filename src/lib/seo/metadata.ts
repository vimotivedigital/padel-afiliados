import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Ruta relativa, ej. "/palas/nox-at10-genius-18k" */
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

/**
 * Helper único para generar `generateMetadata` en todas las rutas: fija
 * canonical, Open Graph y Twitter Cards de forma consistente para que cada
 * plantilla solo tenga que pasar título/descripción/ruta.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/images/og/default-og.svg",
  type = "website",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "es_ES",
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
