import { overgrips } from "../datasets/overgrips";
import { protectores } from "../datasets/protectores";
import { pelotas } from "../datasets/pelotas";
import type { Pala, Overgrip, Protector, Pelota } from "../types";
import type { Answers } from "../configurators/types";

export interface CrossSellPack {
  overgrip?: Overgrip;
  protector?: Protector;
  pelota?: Pelota;
}

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Recomendaciones cruzadas tras elegir una pala: arma un "pack" de overgrip,
 * protector y pelotas compatibles para aumentar el valor medio por clic a
 * Amazon. Usa reglas simples (no el scoring completo) porque el objetivo es
 * complementar, no volver a puntuar todo el catálogo.
 */
export function buildCrossSellPack(pala: Pala, answers: Answers): CrossSellPack {
  const lesiones = toArray(answers.lesiones);
  const cuidaArticulaciones = lesiones.some((l) => l !== "ninguna");

  const overgripSugerido = pala.compatibleAccesorios?.overgrips
    ?.map((id) => overgrips.find((o) => o.id === id))
    .find((o): o is Overgrip => Boolean(o));
  const overgripPorSudor = cuidaArticulaciones
    ? [...overgrips].sort((a, b) => b.absorcionSudor - a.absorcionSudor)[0]
    : overgrips[0];

  const protectorSugerido = pala.compatibleAccesorios?.protectores
    ?.map((id) => protectores.find((p) => p.id === id))
    .find((p): p is Protector => Boolean(p));
  const protectorPorForma = protectores.find((p) => p.compatibleFormas.includes(pala.forma));

  const nivelAlto = pala.nivel.includes("avanzado") || pala.nivel.includes("competicion");
  const pelotaSugerida = pelotas.find((p) => (nivelAlto ? p.uso !== "entrenamiento" : true));

  return {
    overgrip: overgripSugerido ?? overgripPorSudor,
    protector: protectorSugerido ?? protectorPorForma ?? protectores[0],
    pelota: pelotaSugerida ?? pelotas[0],
  };
}
