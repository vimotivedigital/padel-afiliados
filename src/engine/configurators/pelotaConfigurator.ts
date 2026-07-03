import { pelotas } from "../datasets/pelotas";
import { buildPelotaCriteria, buildPelotaHardFilters } from "../rules/pelotaRules";
import type { Configurator } from "./types";
import type { Pelota } from "../types";

export const pelotaConfigurator: Configurator<Pelota> = {
  id: "pelota",
  categoryLabel: "pelotas de pádel",
  urlSlug: "selector-pelotas",
  intro: "Dinos para qué las necesitas y te diremos qué pelotas encajan mejor con tu juego.",
  dataset: pelotas,
  resultsTitle: "Tus pelotas recomendadas",
  buildCriteria: buildPelotaCriteria,
  buildHardFilters: buildPelotaHardFilters,
  questions: [
    {
      id: "uso",
      title: "¿Para qué las quieres principalmente?",
      type: "single",
      options: [
        { value: "competicion", label: "Competición" },
        { value: "entrenamiento", label: "Entrenamiento" },
      ],
    },
    {
      id: "velocidad",
      title: "¿Qué velocidad de bote prefieres?",
      type: "single",
      options: [
        { value: "lenta", label: "Lenta" },
        { value: "media", label: "Media" },
        { value: "rapida", label: "Rápida" },
      ],
    },
    {
      id: "superficie",
      title: "¿Dónde sueles jugar?",
      type: "single",
      options: [
        { value: "interior", label: "Pista interior" },
        { value: "exterior", label: "Pista exterior" },
        { value: "ambas", label: "Ambas" },
      ],
    },
    {
      id: "presupuesto",
      title: "¿Qué presupuesto tienes por bote?",
      type: "single",
      options: [
        { value: "economica", label: "Económico" },
        { value: "media", label: "Medio" },
        { value: "premium", label: "Premium" },
      ],
    },
  ],
};
