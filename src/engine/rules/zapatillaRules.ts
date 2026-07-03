import type { Zapatilla } from "../types";
import type { ScoringCriterion } from "../scoring/scoreEngine";
import type { Answers, HardFilter } from "../configurators/types";

const PESO_A_AMORTIGUACION: Record<string, number> = {
  ligero: 5,
  medio: 7,
  alto: 9,
};

const BUDGET_RANGES: Record<string, { target: number; tolerance: number; max: number }> = {
  "menos-75": { target: 65, tolerance: 15, max: 78 },
  "75-100": { target: 88, tolerance: 15, max: 105 },
  "mas-100": { target: 130, tolerance: 40, max: Infinity },
};

function single(answers: Answers, id: string): string | undefined {
  const v = answers[id];
  return Array.isArray(v) ? v[0] : v;
}

function multiple(answers: Answers, id: string): string[] {
  const v = answers[id];
  return Array.isArray(v) ? v : v ? [v] : [];
}

export function buildZapatillaCriteria(answers: Answers): ScoringCriterion<Zapatilla>[] {
  const criteria: ScoringCriterion<Zapatilla>[] = [];

  const tipoPisada = single(answers, "tipoPisada");
  if (tipoPisada) {
    criteria.push({ attribute: "tipoPisada", type: "categorical", target: tipoPisada, weight: 1, label: "tipo de pisada" });
  }

  const tipoPista = single(answers, "tipoPista");
  if (tipoPista) {
    criteria.push({ attribute: "tipoPista", type: "categorical", target: tipoPista, weight: 0.8, label: "tipo de pista" });
  }

  const pesoCorporal = single(answers, "pesoCorporal");
  if (pesoCorporal && PESO_A_AMORTIGUACION[pesoCorporal]) {
    criteria.push({
      attribute: "amortiguacion",
      type: "numeric",
      target: PESO_A_AMORTIGUACION[pesoCorporal],
      tolerance: 2,
      weight: 0.6,
      label: "amortiguación acorde a tu peso",
    });
  }

  const presupuesto = single(answers, "presupuesto");
  if (presupuesto && BUDGET_RANGES[presupuesto]) {
    const range = BUDGET_RANGES[presupuesto];
    criteria.push({ attribute: "price", type: "numeric", target: range.target, tolerance: range.tolerance, weight: 0.8, label: "ajuste a tu presupuesto" });
  }

  const lesiones = multiple(answers, "lesiones").filter((l) => l !== "ninguna");
  for (const lesion of lesiones) {
    criteria.push({ attribute: "lesionesRecomendadas", type: "array-includes", target: lesion, weight: 0.9, label: "cuidado articular" });
  }

  return criteria;
}

export function buildZapatillaHardFilters(answers: Answers): HardFilter<Zapatilla>[] {
  const filters: HardFilter<Zapatilla>[] = [];
  const talla = single(answers, "talla");
  if (talla) filters.push((p) => p.tallasDisponibles.includes(talla));

  const presupuesto = single(answers, "presupuesto");
  if (presupuesto && BUDGET_RANGES[presupuesto] && Number.isFinite(BUDGET_RANGES[presupuesto].max)) {
    filters.push((p) => p.price <= BUDGET_RANGES[presupuesto].max);
  }
  return filters;
}
