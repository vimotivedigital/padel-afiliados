export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export type GaEventName =
  | "selector_start"
  | "selector_step_completed"
  | "selector_completed"
  | "amazon_click"
  | "product_recommended"
  | "selector_time_spent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Envía un evento a GA4 vía gtag si está disponible. En desarrollo, sin
 * NEXT_PUBLIC_GA_ID configurado, no hace nada (evita ruido en consola).
 */
export function sendGAEvent(name: GaEventName, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || !window.gtag || !GA_ID) return;
  window.gtag("event", name, params);
}
