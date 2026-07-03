import { overgrips } from "../datasets/overgrips";
import { buildOvergripCriteria } from "../rules/overgripRules";
import type { Configurator } from "./types";
import type { Overgrip } from "../types";

export const overgripConfigurator: Configurator<Overgrip> = {
  id: "overgrip",
  categoryLabel: "overgrips",
  urlSlug: "selector-overgrip",
  intro: "Dinos cuánto sudas de manos y qué tacto prefieres y te diremos qué overgrip encaja mejor contigo.",
  dataset: overgrips,
  resultsTitle: "Tu overgrip recomendado",
  buildCriteria: buildOvergripCriteria,
  questions: [
    {
      id: "sudoracion",
      title: "¿Cuánto sudas de manos jugando?",
      type: "single",
      options: [
        { value: "poca", label: "Poco" },
        { value: "media", label: "Normal" },
        { value: "mucha", label: "Mucho" },
      ],
    },
    {
      id: "tacto",
      title: "¿Qué tacto prefieres?",
      type: "single",
      options: [
        { value: "liso", label: "Liso" },
        { value: "perforado", label: "Perforado" },
        { value: "rugoso", label: "Rugoso" },
      ],
    },
    {
      id: "grosor",
      title: "¿Qué grosor prefieres?",
      type: "single",
      options: [
        { value: "fino", label: "Fino" },
        { value: "medio", label: "Medio" },
        { value: "grueso", label: "Grueso" },
      ],
    },
  ],
};
