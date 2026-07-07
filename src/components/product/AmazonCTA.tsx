"use client";

import { AMAZON_AFFILIATE_TAG } from "@/lib/constants";
import { sendGAEvent, sendGoogleAdsConversion } from "@/lib/analytics/ga";
import { cn } from "@/lib/utils";

interface AmazonCTAProps {
  asin: string;
  productName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

/**
 * Único punto de construcción de enlaces de afiliado. Hoy apunta a
 * amazon.es/dp/{asin} con el tag de asociado; cuando se integre la Product
 * Advertising API, este es el único componente que habría que tocar.
 */
export function AmazonCTA({ asin, productName, size = "md", className, label = "Ver en Amazon" }: AmazonCTAProps) {
  const url = `https://www.amazon.es/dp/${asin}${AMAZON_AFFILIATE_TAG ? `?tag=${AMAZON_AFFILIATE_TAG}` : ""}`;

  const sizeClasses = size === "lg" ? "px-6 py-3.5 text-base" : size === "sm" ? "px-3.5 py-2 text-sm" : "px-5 py-3 text-sm";

  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow sponsored noopener"
      onClick={() => {
        sendGAEvent("amazon_click", { asin, product_name: productName });
        sendGoogleAdsConversion();
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-[#FF9900] font-bold text-[#0B1120] transition-transform hover:scale-[1.02]",
        sizeClasses,
        className
      )}
    >
      {label}
    </a>
  );
}
