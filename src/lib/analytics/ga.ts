import { GOOGLE_ADS_ID } from "@/lib/constants";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** Etiqueta de conversión de Google Ads para clics en "Ver en Amazon" (creada en la cuenta de Google Ads). */
const AMAZON_CLICK_CONVERSION_LABEL = `${GOOGLE_ADS_ID}/93eBCPHsh5UbELKXjKlB`;

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

/**
 * Reporta la conversión de Google Ads al hacer clic en "Ver en Amazon". El
 * enlace abre en pestaña nueva, así que no hace falta retrasar la
 * navegación (patrón event_callback) como en el snippet estándar de Google
 * para enlaces en la misma pestaña.
 */
export function sendGoogleAdsConversion(value = 1.0): void {
  if (typeof window === "undefined" || !window.gtag || !GOOGLE_ADS_ID) return;
  window.gtag("event", "conversion", {
    send_to: AMAZON_CLICK_CONVERSION_LABEL,
    value,
    currency: "EUR",
  });
}
