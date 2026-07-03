import type { MetadataRoute } from "next";
import { SITE_URL, CATEGORY_LABELS } from "@/lib/constants";
import { getAllProducts, getAllBrands } from "@/lib/products";
import { getAllComparisons, getAllArticles } from "@/lib/content";
import { programmaticPages } from "@/lib/seo/programmatic-pages";

const STATIC_ROUTES = [
  "",
  "/comparativas",
  "/reviews",
  "/blog",
  "/marcas",
  "/ofertas",
  "/selector-pala",
  "/selector-zapatillas",
  "/selector-paletero",
  "/selector-pelotas",
  "/selector-overgrip",
  "/selector-protector",
];

/**
 * Recorre datasets + registry de páginas programáticas para generar el
 * sitemap completo. Añadir un producto, una guía o una variante de selector
 * nuevos los incluye automáticamente en el próximo build, sin tocar este
 * archivo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const categoryRoutes = Object.keys(CATEGORY_LABELS).map((category) => `/${category}`);

  const productRoutes = getAllProducts().map((p) => `/${p.category}/${p.slug}`);
  const brandRoutes = getAllBrands().map((b) => `/marcas/${b.slug}`);
  const comparisonRoutes = getAllComparisons().map((c) => `/comparativas/${c.slug}`);
  const reviewRoutes = getAllProducts().filter((p) => p.hasFullReview).map((p) => `/reviews/${p.slug}`);
  const articleRoutes = getAllArticles().map((a) => `/blog/${a.slug}`);
  const programmaticRoutes = programmaticPages.map((p) => `/${p.slug}`);

  const allRoutes = [
    ...STATIC_ROUTES,
    ...categoryRoutes,
    ...productRoutes,
    ...brandRoutes,
    ...comparisonRoutes,
    ...reviewRoutes,
    ...articleRoutes,
    ...programmaticRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
