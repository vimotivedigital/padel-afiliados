import type { Pala } from "../types";
import type { ScoringCriterion } from "../scoring/scoreEngine";
import type { Answers, HardFilter } from "../configurators/types";

/**
 * Traduce las respuestas del wizard "/selector-pala" (8 pasos) en criterios
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

/**
 * `forma`, `peso` y "nivel físico" (potencia) ya no se preguntan
 * directamente: se infieren de `nivel` y `estiloJuego`, que sí son datos
 * que cualquier jugador conoce de sí mismo sin experiencia previa. Los
 * mapeos de abajo están calculados contra el dataset real de palas (ver
 * commit que introduce esta inferencia): tanto `nivel` como `estiloJuego`
 * correlacionan con `potencia` de forma monótona, así que se mantienen
 * ambas señales — `estiloJuego` con el peso principal (0.5, como antes) y
 * `nivel` como señal secundaria más débil (0.3) en vez de perder la
 * dimensión de potencia por completo.
 */
const ESTILO_A_FORMA: Record<string, string> = {
  defensivo: "redonda",
  control: "redonda",
  equilibrado: "lagrima",
  potencia: "diamante",
  agresivo: "diamante",
};

const NIVEL_A_PESO_BUCKET: Record<string, string> = {
  nunca_he_jugado: "ligera",
  principiante: "ligera",
  intermedio: "media",
  avanzado: "pesada",
  competicion: "pesada",
};

// Potencia media real por nivel en el dataset: iniciación 4.6, principiante
// 4.5, intermedio 5.9, avanzado 7.2, competición 8.1 — correlación clara,
// aunque menos marcada que la de estiloJuego (3.0 a 8.4).
const NIVEL_A_POTENCIA: Record<string, number> = {
  nunca_he_jugado: 4,
  principiante: 4,
  intermedio: 6,
  avanzado: 7,
  competicion: 8,
};

// Potencia media real por estiloJuego: defensivo 3.0, control 4.8,
// equilibrado 6.3, potencia 8.2, agresivo 8.4.
const ESTILO_A_POTENCIA: Record<string, number> = {
  defensivo: 3,
  control: 5,
  equilibrado: 6,
  potencia: 8,
  agresivo: 8,
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

    // La potencia ya no se pregunta directamente ("nivel físico"): se
    // infiere del estilo de juego, que es la señal más fuerte y fiable.
    if (ESTILO_A_POTENCIA[estilo] !== undefined) {
      criteria.push({
        attribute: "potencia",
        type: "numeric",
        target: ESTILO_A_POTENCIA[estilo],
        tolerance: 3,
        weight: 0.5,
        label: "potencia acorde a tu estilo de juego",
      });
    }

    if (ESTILO_A_FORMA[estilo]) {
      criteria.push({
        attribute: "forma",
        type: "categorical",
        target: ESTILO_A_FORMA[estilo],
        weight: 0.5,
        label: "forma acorde a tu estilo de juego",
      });
    }
  }

  // Señal secundaria de potencia: nivel también correlaciona (más débil que
  // estiloJuego), así que se suma con menos peso en vez de perderse.
  if (nivel && NIVEL_A_POTENCIA[nivel] !== undefined) {
    criteria.push({
      attribute: "potencia",
      type: "numeric",
      target: NIVEL_A_POTENCIA[nivel],
      tolerance: 3,
      weight: 0.3,
      label: "potencia acorde a tu nivel de juego",
    });
  }

  if (nivel && NIVEL_A_PESO_BUCKET[nivel] && PESO_TARGET[NIVEL_A_PESO_BUCKET[nivel]]) {
    criteria.push({
      attribute: "pesoGramos",
      type: "numeric",
      target: PESO_TARGET[NIVEL_A_PESO_BUCKET[nivel]],
      tolerance: 12,
      weight: 0.5,
      label: "peso acorde a tu nivel de juego",
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
