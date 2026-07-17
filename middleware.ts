import { NextResponse, type NextRequest } from "next/server";

/**
 * Google AdSense verifica ads.txt contra el dominio exacto dado de alta
 * (voleador.com, sin www) y no sigue redirecciones cross-host. El resto del
 * sitio mantiene www.voleador.com como canónico (SEO, sitemap, todo lo ya
 * indexado), así que aquí solo se exceptúa /ads.txt de la redirección
 * apex -> www; todo lo demás sigue redirigiendo igual que antes.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  if (host === "voleador.com" && request.nextUrl.pathname !== "/ads.txt") {
    const url = request.nextUrl.clone();
    url.host = "www.voleador.com";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image).*)",
};
