import type { Paletero } from "../types";
import type { ScoringCriterion } from "../scoring/scoreEngine";
import type { Answers, HardFilter } from "../configurators/types";

const BUDGET_RANGES: Record<string, { target: number; tolerance: number; max: number }> = {
  "menos-50": { target: 40, tolerance: 15, max: 55 },
  "50-90": { target: 70, tolerance: 20, max: 95 },
  "mas-90": { target: 110, tolerance: 40, max: Infinity },
};

function single(answers: Answers, id: string): string | undefined {
  const v = answers[id];
  return Array.isArray(v) ? v[0] : v;
}

export function buildPaleteroCriteria(answers: Answers): ScoringCriterion<Paletero>[] {
  const criteria: ScoringCriterion<Paletero>[] = [];

  const numeroPalas = single(answers, "numeroPalas");
  if (numeroPalas) {
    criteria.push({
      attribute: "capacidadPalas",
      type: "numeric",
      target: Number(numeroPalas),
      tolerance: 1,
      weight: 1,
      label: "capacidad para tus palas",
    });
  }

  const termico = single(answers, "compartimentoTermico");
  if (termico) {
    criteria.push({ attribute: "compartimentoTermico", type: "numeric", target: termico === "si" ? 1 : 0, tolerance: 0.5, weight: 0.7, label: "compartimento térmico" });
  }

  const ropa = single(answers, "espacioRopa");
  if (ropa) {
    criteria.push({ attribute: "compartimentoRopa", type: "numeric", target: ropa === "si" ? 1 : 0, tolerance: 0.5, weight: 0.5, label: "espacio para ropa y accesorios" });
  }

  const portabilidad = single(answers, "portabilidad");
  if (portabilidad) {
    criteria.push({ attribute: "portabilidad", type: "categorical", target: portabilidad, weight: 0.6, label: "forma de transporte" });
  }

  const presupuesto = single(answers, "presupuesto");
  if (presupuesto && BUDGET_RANGES[presupuesto]) {
    const range = BUDGET_RANGES[presupuesto];
    criteria.push({ attribute: "price", type: "numeric", target: range.target, tolerance: range.tolerance, weight: 0.8, label: "ajuste a tu presupuesto" });
  }

  return criteria;
}

export function buildPaleteroHardFilters(answers: Answers): HardFilter<Paletero>[] {
  const filters: HardFilter<Paletero>[] = [];
  const presupuesto = single(answers, "presupuesto");
  if (presupuesto && BUDGET_RANGES[presupuesto] && Number.isFinite(BUDGET_RANGES[presupuesto].max)) {
    filters.push((p) => p.price <= BUDGET_RANGES[presupuesto].max);
  }
  return filters;
}
