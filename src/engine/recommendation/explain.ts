import type { ScoringCriterion } from "../scoring/scoreEngine";
import type { Answers } from "../configurators/types";
import type { BaseProduct } from "../types";

export interface ExplainableResult<T extends BaseProduct> {
  product: T;
  score: number;
}

/**
 * Genera la explicación personalizada del resultado. Es deliberadamente
 * genérica (no conoce "palas" ni "zapatillas"): usa las mismas etiquetas
 * legibles ("estilo de juego", "protección articular"...) que ya vienen
 * definidas en engine/rules al construir los criterios, así que añadir una
 * categoría nueva no requiere tocar este archivo.
 */
export function generateExplanation<T extends BaseProduct>(
  _configuratorId: string,
  _answers: Answers,
  results: ExplainableResult<T>[],
  criteria: ScoringCriterion<T>[]
): string {
  if (results.length === 0) {
    return "No hemos encontrado ninguna opción que encaje bien con tus respuestas. Prueba a ampliar tu presupuesto o a relajar alguna preferencia y vuelve a intentarlo.";
  }

  const topLabels = [...criteria]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((c) => c.label);

  const top = results[0];
  const criteriaText =
    topLabels.length > 0
      ? `hemos priorizado especialmente estos aspectos: ${topLabels.join(", ")}`
      : "hemos valorado el conjunto de tus respuestas";

  return `Según tus respuestas, ${criteriaText}. Con estos criterios, la opción con mayor compatibilidad es ${top.product.name}, con un ${top.score}% de afinidad con tu perfil.`;
}
