/**
 * Tipos compartidos del motor de recomendación y del catálogo.
 *
 * Los datasets viven hoy como arrays TS (ver engine/datasets). El shape es
 * idéntico al que tendría una fila de BD o la respuesta de la Amazon Product
 * Advertising API, para que sustituir el origen de datos en el futuro no
 * requiera tocar el motor ni las plantillas de UI.
 */

export type Category =
  | "palas"
  | "zapatillas"
  | "paleteros"
  | "pelotas"
  | "overgrips"
  | "protectores"
  | "ropa"
  | "accesorios";

export interface Faq {
  question: string;
  answer: string;
}

export interface BaseProduct {
  id: string;
  slug: string;
  category: Category;
  brand: string;
  name: string;
  price: number;
  salePrice?: number;
  onSale?: boolean;
  currency: "EUR";
  rating: number; // valoración media de usuarios, 0-5
  reviewCount: number;
  editorRating: number; // valoración interna del editor, 0-10
  images: string[];
  shortDescription: string;
  description: string;
  pros: string[];
  cons: string[];
  editorReview: string;
  faqs: Faq[];
  /** ASIN de Amazon; el enlace de afiliado se construye centralmente (ver components/product/AmazonCTA). */
  asin: string;
  featured?: boolean;
  hasFullReview?: boolean;
  publishedAt: string;
  updatedAt: string;
  /** Nota editorial interna, nunca renderizada en el frontend (ver grep "internalNotes" antes de usarla en UI). */
  internalNotes?: string;
}

export type Nivel =
  | "iniciacion"
  | "principiante"
  | "intermedio"
  | "avanzado"
  | "competicion";

export type EstiloJuego =
  | "defensivo"
  | "control"
  | "equilibrado"
  | "potencia"
  | "agresivo";

export type Forma = "redonda" | "lagrima" | "diamante";
export type Balance = "bajo" | "medio" | "alto";
export type Genero = "hombre" | "mujer" | "unisex";
export type Lesion = "epicondilitis" | "hombro" | "muneca" | "ninguna";
export type PuntoDulce = "pequeno" | "medio" | "grande";

export interface Pala extends BaseProduct {
  category: "palas";
  nivel: Nivel[];
  estiloJuego: EstiloJuego;
  forma: Forma;
  balance: Balance;
  pesoGramos: number;
  dureza: number; // 1-10, tacto blando -> duro
  potencia: number; // 1-10
  control: number; // 1-10
  manejabilidad: number; // 1-10
  puntoDulce: PuntoDulce;
  tipoGoma: string;
  nucleo: string;
  materiales: string[];
  superficieJuego: "interior" | "exterior" | "ambas";
  genero: Genero;
  lesionesRecomendadas: Lesion[];
  puntuacionInterna: number; // 0-100, prioridad editorial en empates
  compatibleAccesorios?: { overgrips?: string[]; protectores?: string[] };
}

export interface Zapatilla extends BaseProduct {
  category: "zapatillas";
  nivel: Nivel[];
  tipoPisada: "pronador" | "supinador" | "neutro";
  tipoPista: "rapida" | "moqueta" | "todo-terreno";
  amortiguacion: number; // 1-10
  estabilidad: number; // 1-10
  agarre: number; // 1-10
  pesoGramos: number;
  genero: Genero;
  tallasDisponibles: string[];
  lesionesRecomendadas: Lesion[];
  puntuacionInterna: number;
}

export interface Paletero extends BaseProduct {
  category: "paleteros";
  capacidadPalas: number;
  compartimentoTermico: boolean;
  compartimentoZapatillas: boolean;
  compartimentoRopa: boolean;
  portabilidad: "mochila" | "bandolera" | "maleta";
  litros: number;
  puntuacionInterna: number;
}

export interface Pelota extends BaseProduct {
  category: "pelotas";
  uso: "competicion" | "entrenamiento" | "ambas";
  velocidad: "lenta" | "media" | "rapida";
  duracion: number; // 1-10, resistencia a la presión
  superficieRecomendada: "interior" | "exterior" | "ambas";
  unidadesPorBote: number;
  puntuacionInterna: number;
}

export interface Overgrip extends BaseProduct {
  category: "overgrips";
  absorcionSudor: number; // 1-10
  grosorMm: number;
  tacto: "liso" | "perforado" | "rugoso";
  duracion: number; // 1-10
  colores: string[];
  unidadesPorPack: number;
  puntuacionInterna: number;
}

export interface Protector extends BaseProduct {
  category: "protectores";
  pesoGramos: number;
  grosorMm: number;
  nivelProteccion: number; // 1-10
  compatibleFormas: Forma[];
  colores: string[];
  puntuacionInterna: number;
}

export interface Prenda extends BaseProduct {
  category: "ropa";
  tipo: "camiseta" | "polo" | "pantalon" | "falda" | "sudadera";
  genero: Genero;
  tallasDisponibles: string[];
  transpirabilidad: number; // 1-10
  puntuacionInterna: number;
}

export interface Accesorio extends BaseProduct {
  category: "accesorios";
  tipo: "muneca" | "gorra" | "toalla" | "banda-pelo" | "otro";
  genero: Genero;
  puntuacionInterna: number;
}

export type Product =
  | Pala
  | Zapatilla
  | Paletero
  | Pelota
  | Overgrip
  | Protector
  | Prenda
  | Accesorio;

export interface BrandTechnology {
  name: string;
  description: string;
}

export interface Brand {
  slug: string;
  name: string;
  logo: string;
  description: string;
  history: string;
  foundedYear?: number;
  country?: string;
  technologies: BrandTechnology[];
  faqs: Faq[];
}

export interface Article {
  slug: string;
  title: string;
  h1: string;
  excerpt: string;
  category: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  sections: { heading: string; content: string; productSlugs?: string[] }[];
  faqs?: Faq[];
  relatedSlugs?: string[];
}

export interface ComparisonVerdict {
  winnerSlug: string;
  summary: string;
}

export interface Comparison {
  slug: string;
  title: string;
  h1: string;
  category: Category;
  productSlugs: [string, string];
  intro: string;
  /** Versión corta (~150 caracteres) para meta description; si falta, se usa `intro` (puede truncarse en el SERP). */
  metaDescription?: string;
  prosA: string[];
  consA: string[];
  prosB: string[];
  consB: string[];
  whoShouldBuyA: string;
  whoShouldBuyB: string;
  verdict: ComparisonVerdict;
  faqs: Faq[];
  publishedAt: string;
  updatedAt: string;
  relatedSlugs?: string[];
}
