import { protectores } from "../datasets/protectores";
import { buildProtectorCriteria } from "../rules/protectorRules";
import type { Configurator } from "./types";
import type { Protector } from "../types";

export const protectorConfigurator: Configurator<Protector> = {
  id: "protector",
  categoryLabel: "protector de pala",
  urlSlug: "selector-protector",
  intro: "Dinos qué forma tiene tu pala y qué buscas y te diremos qué protector encaja mejor.",
  dataset: protectores,
  resultsTitle: "Tu protector recomendado",
  buildCriteria: buildProtectorCriteria,
  questions: [
    {
      id: "formaPala",
      title: "¿Qué forma tiene tu pala?",
      type: "single",
      options: [
        { value: "redonda", label: "Redonda" },
        { value: "lagrima", label: "Lágrima" },
        { value: "diamante", label: "Diamante" },
      ],
    },
    {
      id: "peso",
      title: "¿Qué peso prefieres en el protector?",
      type: "single",
      options: [
        { value: "ligero", label: "Lo más ligero posible" },
        { value: "medio", label: "Medio" },
        { value: "pesado", label: "No me importa que pese algo más" },
      ],
    },
    {
      id: "nivelProteccion",
      title: "¿Qué nivel de protección buscas?",
      type: "single",
      options: [
        { value: "basica", label: "Básica" },
        { value: "media", label: "Media" },
        { value: "alta", label: "Alta" },
      ],
    },
  ],
};
