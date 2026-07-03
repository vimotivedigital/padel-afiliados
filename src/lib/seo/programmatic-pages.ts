import type { Answers } from "@/engine/configurators/types";
import type { Category, Faq, Product } from "@/engine/types";
import { getProductsByCategory } from "@/lib/products";

/**
 * Registro de páginas de SEO programático. Cada entrada genera una URL real
 * (ver app/[slug]/page.tsx) reutilizando siempre la misma plantilla —
 * GuideTemplate o SelectorVariantTemplate—, así que añadir cientos de
 * páginas de guías o variantes de selector es solo añadir entradas aquí,
 * sin tocar componentes ni rutas.
 */
export interface GuidePage {
  type: "guide";
  slug: string;
  title: string;
  h1: string;
  category: Category;
  intro: string;
  filter?: (product: Product) => boolean;
  sortBy?: (a: Product, b: Product) => number;
  faqs: Faq[];
}

export interface SelectorVariantPage {
  type: "selector-variant";
  slug: string;
  configuratorId: string;
  title: string;
  h1: string;
  intro: string;
  /** Respuestas precargadas en el wizard; el usuario puede seguir editándolas. */
  initialAnswers: Answers;
  faqs: Faq[];
}

export type ProgrammaticPage = GuidePage | SelectorVariantPage;

const byEditorRating = (a: Product, b: Product) => b.editorRating - a.editorRating;
const byValueForMoney = (a: Product, b: Product) => b.editorRating / b.price - a.editorRating / a.price;

export const programmaticPages: ProgrammaticPage[] = [
  {
    type: "guide",
    slug: "mejores-palas-control",
    title: "Las mejores palas de control",
    h1: "Las mejores palas de control de pádel",
    category: "palas",
    intro:
      "Si tu prioridad es la precisión y cuidar el brazo por encima de la potencia, estas son las palas de control mejor valoradas de nuestro catálogo.",
    filter: (p) => p.category === "palas" && p.estiloJuego === "control",
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Qué diferencia una pala de control de una de potencia?",
        answer:
          "Las palas de control suelen tener forma redonda, balance bajo y un núcleo más blando, lo que amplía el punto dulce y facilita la precisión a costa de algo de pegada.",
      },
    ],
  },
  {
    type: "guide",
    slug: "mejores-palas-potencia",
    title: "Las mejores palas de potencia",
    h1: "Las mejores palas de potencia de pádel",
    category: "palas",
    intro: "Palas de forma diamante y balance alto pensadas para jugadores con nivel avanzado que priorizan el remate y la pegada.",
    filter: (p) => p.category === "palas" && (p.estiloJuego === "potencia" || p.estiloJuego === "agresivo"),
    sortBy: byEditorRating,
    faqs: [],
  },
  {
    type: "guide",
    slug: "mejores-palas-calidad-precio",
    title: "Las mejores palas calidad-precio",
    h1: "Las mejores palas calidad-precio",
    category: "palas",
    intro: "Ordenamos el catálogo por relación entre valoración editorial y precio para encontrar las palas que más rinden por cada euro.",
    sortBy: byValueForMoney,
    faqs: [],
  },
  {
    type: "guide",
    slug: "mejores-palas-principiantes",
    title: "Las mejores palas para principiantes",
    h1: "Las mejores palas para principiantes",
    category: "palas",
    intro: "Palas ligeras, de tacto blando y balance bajo pensadas para dar los primeros pasos en el pádel sin sufrir el brazo.",
    filter: (p) => p.category === "palas" && (p.nivel.includes("iniciacion") || p.nivel.includes("principiante")),
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Cuánto debería costar mi primera pala?",
        answer: "No hace falta gastar mucho: hay palas de entrada muy competentes por debajo de 100€, suficientes para aprender la técnica básica.",
      },
    ],
  },
  {
    type: "guide",
    slug: "mejores-palas-menos-de-100",
    title: "Las mejores palas por menos de 100€",
    h1: "Las mejores palas por menos de 100€",
    category: "palas",
    intro: "No hace falta una inversión alta para tener una pala competente. Estas son nuestras recomendadas por debajo de 100€.",
    filter: (p) => p.category === "palas" && p.price < 100,
    sortBy: byEditorRating,
    faqs: [],
  },
  {
    type: "guide",
    slug: "mejores-palas-mujer",
    title: "Las mejores palas para mujer",
    h1: "Las mejores palas para mujer",
    category: "palas",
    intro: "Palas ligeras y de manejo cómodo, pensadas o especialmente recomendadas para jugadoras.",
    filter: (p) => p.category === "palas" && (p.genero === "mujer" || p.genero === "unisex"),
    sortBy: byEditorRating,
    faqs: [],
  },
  {
    type: "guide",
    slug: "mejores-palas-epicondilitis",
    title: "Las mejores palas para epicondilitis (codo de tenista)",
    h1: "Las mejores palas si tienes epicondilitis",
    category: "palas",
    intro: "Palas de tacto blando y balance bajo que ayudan a reducir la vibración transmitida al codo en el golpeo.",
    filter: (p) => p.category === "palas" && p.lesionesRecomendadas.includes("epicondilitis"),
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Una pala puede curar la epicondilitis?",
        answer: "No: una pala más blanda puede ayudar a no agravar las molestias, pero ante una lesión activa lo recomendable es consultar con un fisioterapeuta o médico deportivo.",
      },
    ],
  },
  {
    type: "guide",
    slug: "mejores-paleteros",
    title: "Los mejores paleteros",
    h1: "Los mejores paleteros de pádel",
    category: "paleteros",
    intro: "Paleteros para transportar tus palas, ropa y accesorios con comodidad, ordenados por valoración editorial.",
    sortBy: byEditorRating,
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-principiante",
    configuratorId: "pala",
    title: "Selector de pala para principiantes",
    h1: "Encuentra tu primera pala de pádel",
    intro: "Hemos precargado el nivel 'principiante' en el selector; puedes ajustar el resto de respuestas para afinar la recomendación.",
    initialAnswers: { nivel: "principiante" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-control",
    configuratorId: "pala",
    title: "Selector de pala de control",
    h1: "Encuentra tu pala de control ideal",
    intro: "Hemos precargado el estilo de juego 'control'; completa el resto de preguntas para ver tus 3 mejores opciones.",
    initialAnswers: { estiloJuego: "control" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-potencia",
    configuratorId: "pala",
    title: "Selector de pala de potencia",
    h1: "Encuentra tu pala de potencia ideal",
    intro: "Hemos precargado el estilo de juego 'potencia'; completa el resto de preguntas para ver tus 3 mejores opciones.",
    initialAnswers: { estiloJuego: "potencia" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-menos-de-100",
    configuratorId: "pala",
    title: "Selector de pala por menos de 100€",
    h1: "Encuentra tu pala por menos de 100€",
    intro: "Hemos precargado un presupuesto ajustado; completa el resto de preguntas para ver tus 3 mejores opciones dentro de ese rango.",
    initialAnswers: { presupuesto: "75-100" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-mujer",
    configuratorId: "pala",
    title: "Selector de pala para mujer",
    h1: "Encuentra tu pala ideal",
    intro: "Hemos precargado el perfil 'mujer'; completa el resto de preguntas para afinar tu recomendación.",
    initialAnswers: { sexo: "mujer" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-epicondilitis",
    configuratorId: "pala",
    title: "Selector de pala para epicondilitis",
    h1: "Encuentra una pala que cuide tu codo",
    intro: "Hemos precargado la molestia 'epicondilitis'; completa el resto de preguntas para ver qué palas priorizan un tacto más blando.",
    initialAnswers: { lesiones: ["epicondilitis"] },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-nox",
    configuratorId: "pala",
    title: "Selector de pala Nox",
    h1: "Encuentra tu pala Nox ideal",
    intro: "Hemos precargado la marca 'Nox'; completa el resto de preguntas para ver qué modelo de la marca encaja mejor contigo.",
    initialAnswers: { marca: "Nox" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-zapatillas-pronador",
    configuratorId: "zapatilla",
    title: "Selector de zapatillas para pisada pronadora",
    h1: "Encuentra tus zapatillas si eres pronador",
    intro: "Hemos precargado el tipo de pisada 'pronador'; completa el resto de preguntas para afinar la recomendación.",
    initialAnswers: { tipoPisada: "pronador" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-zapatillas-amortiguacion",
    configuratorId: "zapatilla",
    title: "Selector de zapatillas con más amortiguación",
    h1: "Encuentra zapatillas con máxima amortiguación",
    intro: "Hemos precargado un peso corporal alto, lo que prioriza modelos con más amortiguación; completa el resto de preguntas para afinar.",
    initialAnswers: { pesoCorporal: "alto" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-overgrip-sudor",
    configuratorId: "overgrip",
    title: "Selector de overgrip para manos sudorosas",
    h1: "Encuentra el mejor overgrip si sudas mucho de manos",
    intro: "Hemos precargado 'mucha sudoración'; completa el resto de preguntas para afinar tu recomendación.",
    initialAnswers: { sudoracion: "mucha" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-paletero-2-palas",
    configuratorId: "paletero",
    title: "Selector de paletero para 2 palas",
    h1: "Encuentra tu paletero para 2 palas",
    intro: "Hemos precargado '2 palas'; completa el resto de preguntas para afinar la recomendación.",
    initialAnswers: { numeroPalas: "2" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pelotas-competicion",
    configuratorId: "pelota",
    title: "Selector de pelotas de competición",
    h1: "Encuentra tus pelotas de competición",
    intro: "Hemos precargado el uso 'competición'; completa el resto de preguntas para afinar tu recomendación.",
    initialAnswers: { uso: "competicion" },
    faqs: [],
  },
];

export function getProgrammaticPage(slug: string): ProgrammaticPage | undefined {
  return programmaticPages.find((p) => p.slug === slug);
}

export function getGuideProducts(guide: GuidePage): Product[] {
  const all = getProductsByCategory(guide.category);
  const filtered = guide.filter ? all.filter(guide.filter) : all;
  return [...filtered].sort(guide.sortBy ?? byEditorRating);
}
