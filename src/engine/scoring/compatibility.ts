/**
 * Funciones de comparación puras usadas por el motor de puntuación.
 * Cada una devuelve una afinidad normalizada entre 0 y 1; el peso de cada
 * criterio se aplica en scoreEngine.ts, no aquí.
 */

/** Afinidad numérica: 1 si coincide exacto, decae linealmente fuera de la tolerancia. */
export function numericMatch(value: number, target: number, tolerance: number): number {
  if (tolerance <= 0) return value === target ? 1 : 0;
  const distance = Math.abs(value - target);
  return Math.max(0, 1 - distance / tolerance);
}

/** Afinidad categórica simple: coincidencia exacta o dentro de una lista de valores aceptables. */
export function categoricalMatch(value: string, target: string | string[]): number {
  const targets = Array.isArray(target) ? target : [target];
  return targets.includes(value) ? 1 : 0;
}

/** Afinidad cuando el atributo del producto es un array (ej. niveles recomendados). */
export function arrayIncludesMatch(values: string[], target: string): number {
  return values.includes(target) ? 1 : 0;
}

/** Afinidad categórica con vecinos parciales (ej. escalas ordinales tipo nivel/balance). */
export function ordinalMatch(value: string, target: string, order: string[]): number {
  const vi = order.indexOf(value);
  const ti = order.indexOf(target);
  if (vi === -1 || ti === -1) return 0;
  const distance = Math.abs(vi - ti);
  const maxDistance = order.length - 1;
  return maxDistance === 0 ? 1 : Math.max(0, 1 - distance / maxDistance);
}
