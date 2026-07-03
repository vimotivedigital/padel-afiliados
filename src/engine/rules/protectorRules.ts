import type { Protector } from "../types";
import type { ScoringCriterion } from "../scoring/scoreEngine";
import type { Answers } from "../configurators/types";

function single(answers: Answers, id: string): string | undefined {
  const v = answers[id];
  return Array.isArray(v) ? v[0] : v;
}

export function buildProtectorCriteria(answers: Answers): ScoringCriterion<Protector>[] {
  const criteria: ScoringCriterion<Protector>[] = [];

  const forma = single(answers, "formaPala");
  if (forma) {
    criteria.push({ attribute: "compatibleFormas", type: "array-includes", target: forma, weight: 1, label: "compatibilidad con tu pala" });
  }

  const peso = single(answers, "peso");
  if (peso) {
    const target = peso === "ligero" ? 10 : peso === "medio" ? 13 : 16;
    criteria.push({ attribute: "pesoGramos", type: "numeric", target, tolerance: 3, weight: 0.6, label: "peso preferido" });
  }

  const proteccion = single(answers, "nivelProteccion");
  if (proteccion) {
    const target = proteccion === "basica" ? 5 : proteccion === "media" ? 7 : 9;
    criteria.push({ attribute: "nivelProteccion", type: "numeric", target, tolerance: 2, weight: 0.7, label: "nivel de protección" });
  }

  return criteria;
}
