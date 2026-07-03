import {
  arrayIncludesMatch,
  categoricalMatch,
  numericMatch,
  ordinalMatch,
} from "./compatibility";

export type CriterionType = "numeric" | "categorical" | "array-includes" | "ordinal";

/**
 * Un criterio de puntuación genérico sobre un atributo `T[K]` de cualquier
 * producto del catálogo. Es el único punto de acoplamiento entre las
 * respuestas del wizard (traducidas en engine/rules) y los datos del
 * producto: el motor no sabe nada de "palas" ni de "zapatillas", solo
 * compara valores de atributos con un objetivo y un peso.
 */
export interface ScoringCriterion<T> {
  /** Atributo del producto sobre el que se puntúa. */
  attribute: keyof T;
  type: CriterionType;
  /** Valor objetivo: número, string, o lista de aceptables según el tipo. */
  target: number | string | string[];
  /** Importancia relativa del criterio (0-1 aprox, no necesita sumar 1). */
  weight: number;
  /** Tolerancia usada solo por criterios numéricos y ordinales. */
  tolerance?: number;
  /** Orden usado solo por criterios ordinales (ej. escala de nivel). */
  order?: string[];
  /** Texto humano usado por explain.ts para redactar la explicación. */
  label: string;
}

function matchOf<T>(product: T, criterion: ScoringCriterion<T>): number {
  const value = product[criterion.attribute];

  switch (criterion.type) {
    case "numeric":
      return numericMatch(value as number, criterion.target as number, criterion.tolerance ?? 1);
    case "categorical":
      return categoricalMatch(value as string, criterion.target as string | string[]);
    case "array-includes":
      return arrayIncludesMatch(value as string[], criterion.target as string);
    case "ordinal":
      return ordinalMatch(value as string, criterion.target as string, criterion.order ?? []);
    default:
      return 0;
  }
}

export interface ScoreBreakdownItem {
  label: string;
  weight: number;
  match: number; // 0-1
}

export interface ScoreResult {
  score: number; // 0-100
  breakdown: ScoreBreakdownItem[];
}

/**
 * Puntúa un producto frente a una lista de criterios ponderados.
 * Devuelve una afinidad 0-100 más el desglose (usado para generar la
 * explicación dinámica y para depurar el algoritmo).
 */
export function scoreProduct<T>(product: T, criteria: ScoringCriterion<T>[]): ScoreResult {
  if (criteria.length === 0) return { score: 0, breakdown: [] };

  let weightedSum = 0;
  let totalWeight = 0;
  const breakdown: ScoreBreakdownItem[] = [];

  for (const criterion of criteria) {
    const match = matchOf(product, criterion);
    weightedSum += match * criterion.weight;
    totalWeight += criterion.weight;
    breakdown.push({ label: criterion.label, weight: criterion.weight, match });
  }

  const score = totalWeight === 0 ? 0 : Math.round((weightedSum / totalWeight) * 100);
  return { score, breakdown };
}
