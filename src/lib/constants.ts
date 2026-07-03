export const SITE_NAME = "Pádel Total";
export const SITE_DESCRIPTION =
  "Guías, análisis y comparativas de material de pádel: palas, zapatillas, paleteros y accesorios, con selectores inteligentes para encontrar tu equipación ideal.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.padeltotal.example";

export const AMAZON_AFFILIATE_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "";

export const AFFILIATE_DISCLOSURE_TEXT =
  "Como asociados de Amazon, obtenemos ingresos por las compras adscritas que cumplen los requisitos aplicables. Esto no supone ningún coste adicional para ti y nos ayuda a mantener el contenido de la web.";

export interface NavCategory {
  label: string;
  href: string;
}

export const CATEGORY_NAV: NavCategory[] = [
  { label: "Palas", href: "/palas" },
  { label: "Zapatillas", href: "/zapatillas" },
  { label: "Paleteros", href: "/paleteros" },
  { label: "Pelotas", href: "/pelotas" },
  { label: "Overgrips", href: "/overgrips" },
  { label: "Protectores", href: "/protectores" },
  { label: "Ropa", href: "/ropa" },
  { label: "Accesorios", href: "/accesorios" },
];

export const MAIN_NAV: NavCategory[] = [
  { label: "Inicio", href: "/" },
  ...CATEGORY_NAV,
  { label: "Comparativas", href: "/comparativas" },
  { label: "Reviews", href: "/reviews" },
  { label: "Guías de compra", href: "/mejores-palas-control" },
  { label: "Blog", href: "/blog" },
  { label: "Marcas", href: "/marcas" },
  { label: "Ofertas", href: "/ofertas" },
];

export const SELECTOR_NAV: NavCategory[] = [
  { label: "Selector de pala", href: "/selector-pala" },
  { label: "Selector de zapatillas", href: "/selector-zapatillas" },
  { label: "Selector de paletero", href: "/selector-paletero" },
  { label: "Selector de pelotas", href: "/selector-pelotas" },
  { label: "Selector de overgrip", href: "/selector-overgrip" },
  { label: "Selector de protector", href: "/selector-protector" },
];

export const CATEGORY_LABELS: Record<string, string> = {
  palas: "Palas",
  zapatillas: "Zapatillas",
  paleteros: "Paleteros",
  pelotas: "Pelotas",
  overgrips: "Overgrips",
  protectores: "Protectores",
  ropa: "Ropa",
  accesorios: "Accesorios",
};
