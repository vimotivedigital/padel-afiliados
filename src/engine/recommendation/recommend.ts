import { getConfigurator } from "../configurators";
import { scoreProduct, type ScoreBreakdownItem } from "../scoring/scoreEngine";
import { generateExplanation } from "./explain";
import type { Answers } from "../configurators/types";
import type { BaseProduct } from "../types";

export interface RecommendationItem<T extends BaseProduct = BaseProduct> {
  product: T;
  score: number;
  breakdown: ScoreBreakdownItem[];
}

export interface RecommendationOutput<T extends BaseProduct = BaseProduct> {
  results: RecommendationItem<T>[];
  explanation: string;
}

/**
 * Punto de entrada único del motor: dado un configurador (categoría) y las
 * respuestas del wizard, puntúa todo el dataset de esa categoría y devuelve
 * el top N junto con una explicación textual. No sabe nada de la UI ni de
 * dominio de pádel específico — eso vive en engine/rules.
 */
export function recommend<T extends BaseProduct = BaseProduct>(
  configuratorId: string,
  answers: Answers,
  count = 3
): RecommendationOutput<T> {
  const configurator = getConfigurator(configuratorId);
  const criteria = configurator.buildCriteria(answers);
  const hardFilters = configurator.buildHardFilters?.(answers) ?? [];

  const dataset = configurator.dataset as T[];
  const filtered = dataset.filter((product) => hardFilters.every((f) => f(product)));
  // Si los filtros duros (p.ej. presupuesto) dejan el pool vacío, mejor
  // mostrar la mejor alternativa disponible que no mostrar nada.
  const pool = filtered.length > 0 ? filtered : dataset;

  const scored: RecommendationItem<T>[] = pool.map((product) => {
    const { score, breakdown } = scoreProduct(product, criteria);
    return { product, score, breakdown };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const aPriority = (a.product as unknown as { puntuacionInterna?: number }).puntuacionInterna ?? 0;
    const bPriority = (b.product as unknown as { puntuacionInterna?: number }).puntuacionInterna ?? 0;
    return bPriority - aPriority;
  });

  const results = scored.slice(0, count);
  const explanation = generateExplanation(configuratorId, answers, results, criteria);

  return { results, explanation };
}
