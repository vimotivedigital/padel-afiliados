import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/epicondilitis-codo-de-tenista-en-padel-como-evitarlo",
        destination: "/blog/epicondilitis-padel-como-elegir-material",
        permanent: true,
      },
    ];
  },
  images: {
    // Los placeholders de ejemplo son SVG locales; se mantiene mientras
    // convivan con las fotos reales servidas directamente desde Amazon
    // (ver remotePatterns) — no se descargan ni se copian al proyecto.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
