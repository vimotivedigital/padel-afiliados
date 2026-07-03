"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SITE_NAME } from "@/lib/constants";

export function ShareResult({ productName }: { productName: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const text = `Mi recomendación en ${SITE_NAME}: ${productName}`;
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: text, url });
        return;
      } catch {
        // el usuario canceló el share nativo; caemos al portapapeles
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleShare}>
      {copied ? "Enlace copiado" : "Compartir resultado"}
    </Button>
  );
}
