import Image from "next/image";
import Link from "next/link";
import { MAIN_NAV, SITE_NAME } from "@/lib/constants";
import { MobileNav } from "./MobileNav";
import { buildSearchIndex } from "@/lib/products";
import { SearchBar } from "@/components/home/SearchBar";
import { LinkButton } from "@/components/ui/Button";

export function Header() {
  const searchIndex = buildSearchIndex();

  return (
    <header className="relative border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80 sticky top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 lg:px-8">
        <Link href="/" className="relative h-9 w-[128px] shrink-0">
          <Image
            src="/images/logo-voleador.png"
            alt={SITE_NAME}
            fill
            sizes="128px"
            priority
            className="object-contain object-left"
          />
        </Link>

        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-black/[0.04] hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden w-64 lg:block">
          <SearchBar index={searchIndex} />
        </div>

        <LinkButton href="/selector-pala" size="sm" variant="accent" className="hidden md:inline-flex">
          Selector de pala
        </LinkButton>

        <MobileNav />
      </div>
    </header>
  );
}
