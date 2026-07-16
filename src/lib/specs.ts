import type { Product } from "@/engine/types";
import type { Spec } from "@/components/product/SpecsTable";
import { formatPrice } from "@/lib/utils";

const NIVEL_LABELS: Record<string, string> = {
  iniciacion: "Iniciación",
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
  competicion: "Competición",
};

const LESION_LABELS: Record<string, string> = {
  epicondilitis: "Epicondilitis",
  hombro: "Hombro",
  muneca: "Muñeca",
  ninguna: "Ninguna en particular",
};

/**
 * Construye la tabla de especificaciones a partir de los atributos propios
 * de cada categoría. Es el único sitio que "conoce" los campos extra de cada
 * subtipo de producto; el componente <SpecsTable> es genérico.
 */
/**
 * `pesoGramos: 0` es el sentinel para "no verificado todavía" (Keepa no
 * siempre lo reporta) — nunca es un peso real, así que la fila se omite en
 * vez de mostrar "0 g", con el mismo criterio que rating/reviewCount.
 */
function pesoRow(pesoGramos: number): Spec[] {
  return pesoGramos > 0 ? [{ label: "Peso", value: `${pesoGramos} g` }] : [];
}

export function buildSpecRows(product: Product): Spec[] {
  const common: Spec[] = [
    { label: "Marca", value: product.brand },
    { label: "Precio", value: formatPrice(product.price) },
  ];

  switch (product.category) {
    case "palas":
      return [
        ...common,
        { label: "Nivel recomendado", value: product.nivel.map((n) => NIVEL_LABELS[n]).join(", ") },
        { label: "Estilo de juego", value: product.estiloJuego },
        { label: "Forma", value: product.forma },
        { label: "Balance", value: product.balance },
        ...pesoRow(product.pesoGramos),
        { label: "Dureza", value: `${product.dureza}/10` },
        { label: "Potencia", value: `${product.potencia}/10` },
        { label: "Control", value: `${product.control}/10` },
        { label: "Manejabilidad", value: `${product.manejabilidad}/10` },
        { label: "Punto dulce", value: product.puntoDulce },
        { label: "Tipo de goma", value: product.tipoGoma },
        { label: "Núcleo", value: product.nucleo },
        { label: "Materiales", value: product.materiales.join(", ") },
        { label: "Superficie recomendada", value: product.superficieJuego },
        { label: "Género", value: product.genero },
        { label: "Recomendada para", value: product.lesionesRecomendadas.map((l) => LESION_LABELS[l]).join(", ") },
      ];
    case "zapatillas":
      return [
        ...common,
        { label: "Nivel recomendado", value: product.nivel.map((n) => NIVEL_LABELS[n]).join(", ") },
        { label: "Tipo de pisada", value: product.tipoPisada },
        { label: "Tipo de pista", value: product.tipoPista },
        { label: "Amortiguación", value: `${product.amortiguacion}/10` },
        { label: "Estabilidad", value: `${product.estabilidad}/10` },
        { label: "Agarre", value: `${product.agarre}/10` },
        ...pesoRow(product.pesoGramos),
        { label: "Tallas disponibles", value: product.tallasDisponibles.join(", ") },
      ];
    case "paleteros":
      return [
        ...common,
        { label: "Capacidad de palas", value: `${product.capacidadPalas}` },
        { label: "Compartimento térmico", value: product.compartimentoTermico ? "Sí" : "No" },
        { label: "Compartimento zapatillas", value: product.compartimentoZapatillas ? "Sí" : "No" },
        { label: "Compartimento ropa", value: product.compartimentoRopa ? "Sí" : "No" },
        { label: "Portabilidad", value: product.portabilidad },
        { label: "Capacidad", value: `${product.litros} L` },
      ];
    case "pelotas":
      return [
        ...common,
        { label: "Uso", value: product.uso },
        { label: "Velocidad", value: product.velocidad },
        { label: "Duración", value: `${product.duracion}/10` },
        { label: "Superficie recomendada", value: product.superficieRecomendada },
        { label: "Unidades por bote", value: `${product.unidadesPorBote}` },
      ];
    case "overgrips":
      return [
        ...common,
        { label: "Absorción de sudor", value: `${product.absorcionSudor}/10` },
        { label: "Grosor", value: `${product.grosorMm} mm` },
        { label: "Tacto", value: product.tacto },
        { label: "Duración", value: `${product.duracion}/10` },
        { label: "Colores", value: product.colores.join(", ") },
        { label: "Unidades por pack", value: `${product.unidadesPorPack}` },
      ];
    case "protectores":
      return [
        ...common,
        ...pesoRow(product.pesoGramos),
        { label: "Grosor", value: `${product.grosorMm} mm` },
        { label: "Nivel de protección", value: `${product.nivelProteccion}/10` },
        { label: "Formas compatibles", value: product.compatibleFormas.join(", ") },
        { label: "Colores", value: product.colores.join(", ") },
      ];
    case "ropa":
      return [
        ...common,
        { label: "Tipo de prenda", value: product.tipo },
        { label: "Género", value: product.genero },
        { label: "Tallas disponibles", value: product.tallasDisponibles.join(", ") },
        { label: "Transpirabilidad", value: `${product.transpirabilidad}/10` },
      ];
    case "accesorios":
      return [...common, { label: "Tipo", value: product.tipo }, { label: "Género", value: product.genero }];
    default:
      return common;
  }
}
