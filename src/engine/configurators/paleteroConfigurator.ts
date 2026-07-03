import { paleteros } from "../datasets/paleteros";
import { buildPaleteroCriteria, buildPaleteroHardFilters } from "../rules/paleteroRules";
import type { Configurator } from "./types";
import type { Paletero } from "../types";

export const paleteroConfigurator: Configurator<Paletero> = {
  id: "paletero",
  categoryLabel: "paletero",
  urlSlug: "selector-paletero",
  intro: "Dinos cuántas palas llevas y qué necesitas guardar y te diremos qué paletero se ajusta mejor a ti.",
  dataset: paleteros,
  resultsTitle: "Tu paletero recomendado",
  buildCriteria: buildPaleteroCriteria,
  buildHardFilters: buildPaleteroHardFilters,
  questions: [
    {
      id: "numeroPalas",
      title: "¿Cuántas palas quieres poder llevar?",
      type: "single",
      options: [
        { value: "1", label: "1 pala" },
        { value: "2", label: "2 palas" },
        { value: "3", label: "3 palas" },
        { value: "4", label: "4 o más palas" },
      ],
    },
    {
      id: "compartimentoTermico",
      title: "¿Quieres compartimento térmico para las palas?",
      type: "single",
      options: [
        { value: "si", label: "Sí" },
        { value: "no", label: "No es imprescindible" },
      ],
    },
    {
      id: "espacioRopa",
      title: "¿Necesitas espacio para ropa y accesorios?",
      type: "single",
      options: [
        { value: "si", label: "Sí" },
        { value: "no", label: "No" },
      ],
    },
    {
      id: "portabilidad",
      title: "¿Cómo prefieres llevarlo?",
      type: "single",
      options: [
        { value: "mochila", label: "Mochila" },
        { value: "bandolera", label: "Bandolera" },
        { value: "maleta", label: "Maleta / paletero grande" },
      ],
    },
    {
      id: "presupuesto",
      title: "¿Cuál es tu presupuesto?",
      type: "single",
      options: [
        { value: "menos-50", label: "Menos de 50 €" },
        { value: "50-90", label: "50-90 €" },
        { value: "mas-90", label: "Más de 90 €" },
      ],
    },
  ],
};
