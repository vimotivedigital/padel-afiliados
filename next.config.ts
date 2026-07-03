import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Los placeholders de ejemplo son SVG locales; al sustituirlos por fotos
    // reales (jpg/png/webp) esta opción deja de ser necesaria.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
