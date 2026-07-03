import type { BaseProduct, Product } from "../types";
import type { ScoringCriterion } from "../scoring/scoreEngine";

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface Question {
  id: string;
  title: string;
  helpText?: string;
  /** "single" renderiza radio-cards, "multiple" checkboxes. */
  type: "single" | "multiple";
  options: QuestionOption[];
}

/** Respuestas del wizard: id de pregunta -> valor (string) o valores (string[] si es multiple). */
export type Answers = Record<string, string | string[]>;

export type HardFilter<T> = (product: T) => boolean;

/**
 * Definición de un configurador/selector. Es la única pieza que cambia entre
 * categorías: preguntas, dataset y la traducción respuestas -> criterios de
 * puntuación. El componente <Wizard> y el motor de scoring son 100%
 * genéricos y no conocen esta interfaz por dentro, solo la consumen.
 */
export interface Configurator<T extends BaseProduct = BaseProduct> {
  id: string;
  categoryLabel: string;
  /** slug base usado en las URLs /selector-<urlSlug> */
  urlSlug: string;
  intro: string;
  questions: Question[];
  dataset: T[];
  buildCriteria: (answers: Answers) => ScoringCriterion<T>[];
  buildHardFilters?: (answers: Answers) => HardFilter<T>[];
  resultsTitle: string;
  /** Recomendaciones cruzadas opcionales tras el resultado (ej. accesorios para una pala). */
  buildCrossSell?: (topProduct: T, answers: Answers) => Product[];
}
