import { zapatillas } from "../datasets/zapatillas";
import { buildZapatillaCriteria, buildZapatillaHardFilters } from "../rules/zapatillaRules";
import type { Configurator } from "./types";
import type { Zapatilla } from "../types";

export const zapatillaConfigurator: Configurator<Zapatilla> = {
  id: "zapatilla",
  categoryLabel: "zapatillas de pádel",
  urlSlug: "selector-zapatillas",
  intro: "Cuéntanos cómo pisas, dónde juegas y qué buscas y te diremos qué zapatillas se adaptan mejor a ti.",
  dataset: zapatillas,
  resultsTitle: "Tus zapatillas recomendadas",
  buildCriteria: buildZapatillaCriteria,
  buildHardFilters: buildZapatillaHardFilters,
  questions: [
    {
      id: "tipoPisada",
      title: "¿Cómo es tu tipo de pisada?",
      type: "single",
      options: [
        { value: "pronador", label: "Pronador" },
        { value: "supinador", label: "Supinador" },
        { value: "neutro", label: "Neutro" },
      ],
    },
    {
      id: "tipoPista",
      title: "¿En qué tipo de pista juegas habitualmente?",
      type: "single",
      options: [
        { value: "rapida", label: "Pista rápida" },
        { value: "moqueta", label: "Moqueta" },
        { value: "todo-terreno", label: "Todo terreno / varias pistas" },
      ],
    },
    {
      id: "pesoCorporal",
      title: "¿Cuál es tu peso corporal aproximado?",
      type: "single",
      options: [
        { value: "ligero", label: "Menos de 70 kg" },
        { value: "medio", label: "70-90 kg" },
        { value: "alto", label: "Más de 90 kg" },
      ],
    },
    {
      id: "talla",
      title: "¿Qué talla necesitas?",
      type: "single",
      options: ["38", "39", "40", "41", "42", "43", "44", "45"].map((t) => ({ value: t, label: t })),
    },
    {
      id: "presupuesto",
      title: "¿Cuál es tu presupuesto?",
      type: "single",
      options: [
        { value: "menos-75", label: "Menos de 75 €" },
        { value: "75-100", label: "75-100 €" },
        { value: "mas-100", label: "Más de 100 €" },
      ],
    },
    {
      id: "lesiones",
      title: "¿Tienes alguna molestia articular a la que prestar atención?",
      type: "multiple",
      options: [
        { value: "epicondilitis", label: "Molestias en el brazo" },
        { value: "hombro", label: "Molestias en el hombro" },
        { value: "muneca", label: "Molestias en la muñeca" },
        { value: "ninguna", label: "Ninguna" },
      ],
    },
  ],
};
