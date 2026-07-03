import type { Overgrip } from "../types";
import type { ScoringCriterion } from "../scoring/scoreEngine";
import type { Answers } from "../configurators/types";

const SUDORACION_A_ABSORCION: Record<string, number> = {
  poca: 4,
  media: 6,
  mucha: 9,
};

function single(answers: Answers, id: string): string | undefined {
  const v = answers[id];
  return Array.isArray(v) ? v[0] : v;
}

export function buildOvergripCriteria(answers: Answers): ScoringCriterion<Overgrip>[] {
  const criteria: ScoringCriterion<Overgrip>[] = [];

  const sudoracion = single(answers, "sudoracion");
  if (sudoracion && SUDORACION_A_ABSORCION[sudoracion]) {
    criteria.push({
      attribute: "absorcionSudor",
      type: "numeric",
      target: SUDORACION_A_ABSORCION[sudoracion],
      tolerance: 2,
      weight: 1,
      label: "absorción de sudor",
    });
  }

  const tacto = single(answers, "tacto");
  if (tacto) {
    criteria.push({ attribute: "tacto", type: "categorical", target: tacto, weight: 0.7, label: "tacto preferido" });
  }

  const grosor = single(answers, "grosor");
  if (grosor) {
    const target = grosor === "fino" ? 0.5 : grosor === "medio" ? 0.65 : 0.8;
    criteria.push({ attribute: "grosorMm", type: "numeric", target, tolerance: 0.1, weight: 0.5, label: "grosor preferido" });
  }

  return criteria;
}
