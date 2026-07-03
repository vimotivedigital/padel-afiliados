import type { Pelota } from "../types";
import type { ScoringCriterion } from "../scoring/scoreEngine";
import type { Answers, HardFilter } from "../configurators/types";

const BUDGET_RANGES: Record<string, { target: number; tolerance: number; max: number }> = {
  "economica": { target: 5, tolerance: 2, max: 7 },
  "media": { target: 7, tolerance: 2, max: 9 },
  "premium": { target: 9, tolerance: 3, max: Infinity },
};

function single(answers: Answers, id: string): string | undefined {
  const v = answers[id];
  return Array.isArray(v) ? v[0] : v;
}

export function buildPelotaCriteria(answers: Answers): ScoringCriterion<Pelota>[] {
  const criteria: ScoringCriterion<Pelota>[] = [];

  const uso = single(answers, "uso");
  if (uso) {
    criteria.push({ attribute: "uso", type: "categorical", target: uso === "competicion" ? ["competicion", "ambas"] : ["entrenamiento", "ambas"], weight: 1, label: "uso previsto" });
  }

  const velocidad = single(answers, "velocidad");
  if (velocidad) {
    criteria.push({ attribute: "velocidad", type: "categorical", target: velocidad, weight: 0.7, label: "velocidad de bote" });
  }

  const superficie = single(answers, "superficie");
  if (superficie && superficie !== "ambas") {
    criteria.push({ attribute: "superficieRecomendada", type: "categorical", target: [superficie, "ambas"], weight: 0.5, label: "superficie de juego" });
  }

  const presupuesto = single(answers, "presupuesto");
  if (presupuesto && BUDGET_RANGES[presupuesto]) {
    const range = BUDGET_RANGES[presupuesto];
    criteria.push({ attribute: "price", type: "numeric", target: range.target, tolerance: range.tolerance, weight: 0.6, label: "ajuste a tu presupuesto" });
  }

  return criteria;
}

export function buildPelotaHardFilters(answers: Answers): HardFilter<Pelota>[] {
  const filters: HardFilter<Pelota>[] = [];
  const presupuesto = single(answers, "presupuesto");
  if (presupuesto && BUDGET_RANGES[presupuesto] && Number.isFinite(BUDGET_RANGES[presupuesto].max)) {
    filters.push((p) => p.price <= BUDGET_RANGES[presupuesto].max);
  }
  return filters;
}
