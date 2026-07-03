import { palas } from "../datasets/palas";
import { buildPalaCriteria, buildPalaHardFilters } from "../rules/palaRules";
import { buildCrossSellPack } from "../recommendation/crossSell";
import type { Configurator } from "./types";
import type { Overgrip, Pala, Pelota, Protector } from "../types";

export const palaConfigurator: Configurator<Pala> = {
  id: "pala",
  categoryLabel: "pala de pádel",
  urlSlug: "selector-pala",
  intro:
    "Responde a estas 11 preguntas sobre tu nivel, tu forma de jugar y tu presupuesto y te diremos qué palas se ajustan mejor a ti, con el porcentaje de compatibilidad de cada una.",
  dataset: palas,
  resultsTitle: "Tus palas recomendadas",
  buildCriteria: buildPalaCriteria,
  buildHardFilters: buildPalaHardFilters,
  buildCrossSell: (topProduct, answers) => {
    const pack = buildCrossSellPack(topProduct, answers);
    return [pack.overgrip, pack.protector, pack.pelota].filter(
      (p): p is Overgrip | Protector | Pelota => Boolean(p)
    );
  },
  questions: [
    {
      id: "nivel",
      title: "¿Cuál es tu nivel de juego?",
      type: "single",
      options: [
        { value: "nunca_he_jugado", label: "Nunca he jugado" },
        { value: "principiante", label: "Principiante" },
        { value: "intermedio", label: "Intermedio" },
        { value: "avanzado", label: "Avanzado" },
        { value: "competicion", label: "Competición" },
      ],
    },
    {
      id: "sexo",
      title: "¿Para quién es la pala?",
      type: "single",
      options: [
        { value: "hombre", label: "Hombre" },
        { value: "mujer", label: "Mujer" },
        { value: "indiferente", label: "Indiferente" },
      ],
    },
    {
      id: "edad",
      title: "¿Cuál es tu rango de edad?",
      type: "single",
      options: [
        { value: "menos-18", label: "Menos de 18" },
        { value: "18-30", label: "18-30" },
        { value: "31-45", label: "31-45" },
        { value: "46-60", label: "46-60" },
        { value: "mas-60", label: "Más de 60" },
      ],
    },
    {
      id: "frecuencia",
      title: "¿Con qué frecuencia juegas?",
      type: "single",
      options: [
        { value: "ocasional", label: "Ocasional" },
        { value: "1x", label: "1 vez por semana" },
        { value: "2-3x", label: "2-3 veces por semana" },
        { value: "4+", label: "4 o más veces por semana" },
      ],
    },
    {
      id: "estiloJuego",
      title: "¿Cómo describirías tu estilo de juego?",
      type: "single",
      options: [
        { value: "defensivo", label: "Defensivo" },
        { value: "control", label: "De control" },
        { value: "equilibrado", label: "Equilibrado" },
        { value: "potencia", label: "De potencia" },
        { value: "agresivo", label: "Muy agresivo" },
      ],
    },
    {
      id: "nivelFisico",
      title: "¿Cómo es tu nivel físico?",
      type: "single",
      options: [
        { value: "bajo", label: "Bajo" },
        { value: "medio", label: "Medio" },
        { value: "alto", label: "Alto" },
      ],
    },
    {
      id: "presupuesto",
      title: "¿Cuál es tu presupuesto?",
      type: "single",
      options: [
        { value: "menos-75", label: "Menos de 75 €" },
        { value: "75-100", label: "75-100 €" },
        { value: "100-150", label: "100-150 €" },
        { value: "150-250", label: "150-250 €" },
        { value: "mas-250", label: "Más de 250 €" },
      ],
    },
    {
      id: "forma",
      title: "¿Qué forma prefieres?",
      type: "single",
      options: [
        { value: "redonda", label: "Redonda" },
        { value: "lagrima", label: "Lágrima" },
        { value: "diamante", label: "Diamante" },
        { value: "no_lo_se", label: "No lo sé" },
      ],
    },
    {
      id: "peso",
      title: "¿Qué peso prefieres?",
      type: "single",
      options: [
        { value: "ligera", label: "Ligera" },
        { value: "media", label: "Media" },
        { value: "pesada", label: "Pesada" },
        { value: "sin_preferencia", label: "Sin preferencia" },
      ],
    },
    {
      id: "lesiones",
      title: "¿Tienes alguna molestia o lesión?",
      helpText: "Puedes marcar varias opciones.",
      type: "multiple",
      options: [
        { value: "epicondilitis", label: "Epicondilitis (codo de tenista)" },
        { value: "hombro", label: "Dolor de hombro" },
        { value: "muneca", label: "Dolor de muñeca" },
        { value: "ninguna", label: "Ninguna" },
      ],
    },
    {
      id: "marca",
      title: "¿Tienes alguna marca favorita?",
      type: "single",
      options: [
        { value: "cualquiera", label: "Cualquiera" },
        { value: "Nox", label: "Nox" },
        { value: "Bullpadel", label: "Bullpadel" },
        { value: "Adidas", label: "Adidas" },
        { value: "Head", label: "Head" },
        { value: "Wilson", label: "Wilson" },
        { value: "Babolat", label: "Babolat" },
        { value: "StarVie", label: "StarVie" },
        { value: "Siux", label: "Siux" },
        { value: "Oxdog", label: "Oxdog" },
      ],
    },
  ],
};
