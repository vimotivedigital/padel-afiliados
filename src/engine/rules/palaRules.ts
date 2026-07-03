import type { Pala } from "../types";
import type { ScoringCriterion } from "../scoring/scoreEngine";
import type { Answers, HardFilter } from "../configurators/types";

/**
 * Traduce las respuestas del wizard "/selector-pala" (11 pasos) en criterios
 * de puntuación ponderados sobre el dataset de palas. Esta es la única pieza
 * que conoce el vocabulario del pádel; el motor de scoring solo ve
 * atributos, pesos y objetivos.
 */

const NIVEL_MAP: Record<string, Pala["nivel"][number]> = {
  nunca_he_jugado: "iniciacion",
  principiante: "principiante",
  intermedio: "intermedio",
  avanzado: "avanzado",
  competicion: "competicion",
};

interface BudgetRange {
  target: number;
  tolerance: number;
  max: number;
}

const BUDGET_RANGES: Record<string, BudgetRange> = {
  "menos-75": { target: 60, tolerance: 20, max: 80 },
  "75-100": { target: 87, tolerance: 18, max: 105 },
  "100-150": { target: 125, tolerance: 30, max: 165 },
  "150-250": { target: 200, tolerance: 55, max: 270 },
  "mas-250": { target: 320, tolerance: 90, max: Infinity },
};

const PESO_TARGET: Record<string, number> = {
  ligera: 345,
  media: 355,
  pesada: 365,
};

const NIVEL_FISICO_A_POTENCIA: Record<string, number> = {
  bajo: 4,
  medio: 6,
  alto: 8,
};

function single(answers: Answers, id: string): string | undefined {
  const v = answers[id];
  return Array.isArray(v) ? v[0] : v;
}

function multiple(answers: Answers, id: string): string[] {
  const v = answers[id];
  return Array.isArray(v) ? v : v ? [v] : [];
}

export function buildPalaCriteria(answers: Answers): ScoringCriterion<Pala>[] {
  const criteria: ScoringCriterion<Pala>[] = [];

  const nivel = single(answers, "nivel");
  if (nivel) {
    criteria.push({
      attribute: "nivel",
      type: "array-includes",
      target: NIVEL_MAP[nivel] ?? nivel,
      weight: 1,
      label: "nivel de juego",
    });
  }

  const sexo = single(answers, "sexo");
  if (sexo && sexo !== "indiferente") {
    criteria.push({
      attribute: "genero",
      type: "categorical",
      target: [sexo, "unisex"],
      weight: 0.3,
      label: "pensada para tu perfil",
    });
  }

  const estilo = single(answers, "estiloJuego");
  if (estilo) {
    criteria.push({
      attribute: "estiloJuego",
      type: "categorical",
      target: estilo,
      weight: 1,
      label: "estilo de juego",
    });
  }

  const nivelFisico = single(answers, "nivelFisico");
  if (nivelFisico) {
    criteria.push({
      attribute: "potencia",
      type: "numeric",
      target: NIVEL_FISICO_A_POTENCIA[nivelFisico] ?? 6,
      tolerance: 3,
      weight: 0.5,
      label: "potencia acorde a tu nivel físico",
    });
  }

  const presupuesto = single(answers, "presupuesto");
  if (presupuesto && BUDGET_RANGES[presupuesto]) {
    const range = BUDGET_RANGES[presupuesto];
    criteria.push({
      attribute: "price",
      type: "numeric",
      target: range.target,
      tolerance: range.tolerance,
      weight: 0.9,
      label: "ajuste a tu presupuesto",
    });
  }

  const forma = single(answers, "forma");
  if (forma && forma !== "no_lo_se") {
    criteria.push({
      attribute: "forma",
      type: "categorical",
      target: forma,
      weight: 0.5,
      label: "forma preferida",
    });
  }

  const peso = single(answers, "peso");
  if (peso && peso !== "sin_preferencia" && PESO_TARGET[peso]) {
    criteria.push({
      attribute: "pesoGramos",
      type: "numeric",
      target: PESO_TARGET[peso],
      tolerance: 12,
      weight: 0.5,
      label: "peso preferido",
    });
  }

  const lesiones = multiple(answers, "lesiones").filter((l) => l !== "ninguna");
  for (const lesion of lesiones) {
    criteria.push({
      attribute: "lesionesRecomendadas",
      type: "array-includes",
      target: lesion,
      weight: 1,
      label: "protección articular",
    });
  }

  const marca = single(answers, "marca");
  if (marca && marca !== "cualquiera") {
    criteria.push({
      attribute: "brand",
      type: "categorical",
      target: marca,
      weight: 0.4,
      label: "marca preferida",
    });
  }

  return criteria;
}

export function buildPalaHardFilters(answers: Answers): HardFilter<Pala>[] {
  const filters: HardFilter<Pala>[] = [];
  const presupuesto = single(answers, "presupuesto");
  if (presupuesto && BUDGET_RANGES[presupuesto]) {
    const { max } = BUDGET_RANGES[presupuesto];
    if (Number.isFinite(max)) {
      filters.push((p) => p.price <= max);
    }
  }
  return filters;
}
