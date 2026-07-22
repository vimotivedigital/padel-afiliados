import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { ADSENSE_PUBLISHER_ID, GOOGLE_ADS_ID, GOOGLE_SITE_VERIFICATION, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import { GA_ID } from "@/lib/analytics/ga";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: "Guías, reviews y selector inteligente de material de pádel",
    description: SITE_DESCRIPTION,
    path: "/",
  }),
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  other: {
    "google-adsense-account": `ca-${ADSENSE_PUBLISHER_ID}`,
  },
};

const GOOGLE_TAG_IDS = [GA_ID, GOOGLE_ADS_ID].filter(Boolean);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <JsonLd data={organizationSchema()} />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${ADSENSE_PUBLISHER_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {GOOGLE_TAG_IDS.length > 0 && (
          <>
            {/* Una sola etiqueta de Google (gtag.js): un config por cada producto (GA4, Google Ads...). */}
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_IDS[0]}`} strategy="afterInteractive" />
            <Script id="google-tag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${GOOGLE_TAG_IDS.map((id) => `gtag('config', '${id}');`).join("\n                ")}
                window.gtag = gtag;`}
            </Script>
          </>
        )}
        <Header />
        <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-10 lg:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
