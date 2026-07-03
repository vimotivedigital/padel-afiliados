import Link from "next/link";
import { CATEGORY_NAV, SELECTOR_NAV, SITE_NAME, SITE_DESCRIPTION, AFFILIATE_DISCLOSURE_TEXT } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-brand-primary-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-lg font-extrabold">{SITE_NAME}</p>
            <p className="mt-3 text-sm text-white/70">{SITE_DESCRIPTION}</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">Categorías</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {CATEGORY_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">Selectores</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {SELECTOR_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">Contenido</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li><Link href="/comparativas" className="hover:text-white">Comparativas</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/marcas" className="hover:text-white">Marcas</Link></li>
              <li><Link href="/ofertas" className="hover:text-white">Ofertas</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/60">
          <p>{AFFILIATE_DISCLOSURE_TEXT}</p>
          <p className="mt-2">© {year} {SITE_NAME}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
