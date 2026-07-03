import {
  palas,
  zapatillas,
  paleteros,
  pelotas,
  overgrips,
  protectores,
  ropa,
  accesorios,
  brands,
} from "@/engine/datasets";
import type { Brand, Category, Product } from "@/engine/types";

const DATASETS_BY_CATEGORY: Record<Category, Product[]> = {
  palas,
  zapatillas,
  paleteros,
  pelotas,
  overgrips,
  protectores,
  ropa,
  accesorios,
};

export function getAllProducts(): Product[] {
  return Object.values(DATASETS_BY_CATEGORY).flat();
}

export function getProductsByCategory(category: Category): Product[] {
  return DATASETS_BY_CATEGORY[category] ?? [];
}

export function getProductBySlug(category: Category, slug: string): Product | undefined {
  return getProductsByCategory(category).find((p) => p.slug === slug);
}

/** Busca un producto por slug en todas las categorías (usado por /reviews/[slug]). */
export function findProductBySlugAnyCategory(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return getAllProducts()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getOnSaleProducts(limit = 12): Product[] {
  return getAllProducts()
    .filter((p) => p.onSale)
    .slice(0, limit);
}

export function getProductsByBrand(brandName: string): Product[] {
  return getAllProducts().filter((p) => p.brand.toLowerCase() === brandName.toLowerCase());
}

export function getAllBrands(): Brand[] {
  return brands;
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

/**
 * Productos similares: misma categoría, prioriza misma marca y nivel/estilo
 * si el producto los define, y rellena con el resto de la categoría por
 * valoración editorial. Usado por "Productos similares" / "Relacionados".
 */
export function getSimilarProducts(product: Product, limit = 4): Product[] {
  const sameCategory = getProductsByCategory(product.category).filter((p) => p.id !== product.id);

  const sameBrand = sameCategory.filter((p) => p.brand === product.brand);
  const rest = sameCategory
    .filter((p) => p.brand !== product.brand)
    .sort((a, b) => b.editorRating - a.editorRating);

  return [...sameBrand, ...rest].slice(0, limit);
}

export function getReviewedProducts(): Product[] {
  return getAllProducts().filter((p) => p.hasFullReview);
}

export interface SearchIndexEntry {
  type: "product" | "brand";
  title: string;
  subtitle: string;
  href: string;
}

/** Índice plano usado por el buscador (client-side, sin dependencias externas). */
export function buildSearchIndex(): SearchIndexEntry[] {
  const productEntries: SearchIndexEntry[] = getAllProducts().map((p) => ({
    type: "product",
    title: p.name,
    subtitle: `${p.brand} · ${p.price.toFixed(0)} €`,
    href: `/${p.category}/${p.slug}`,
  }));

  const brandEntries: SearchIndexEntry[] = brands.map((b) => ({
    type: "brand",
    title: b.name,
    subtitle: "Marca",
    href: `/marcas/${b.slug}`,
  }));

  return [...productEntries, ...brandEntries];
}
