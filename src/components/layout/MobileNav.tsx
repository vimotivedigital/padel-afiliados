"use client";

import Link from "next/link";
import { useState } from "react";
import { MAIN_NAV, SELECTOR_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
      >
        <span className="sr-only">Menú</span>
        <div className="flex flex-col gap-1.5">
          <span className={cn("h-0.5 w-5 bg-foreground transition-transform", open && "translate-y-2 rotate-45")} />
          <span className={cn("h-0.5 w-5 bg-foreground transition-opacity", open && "opacity-0")} />
          <span className={cn("h-0.5 w-5 bg-foreground transition-transform", open && "-translate-y-2 -rotate-45")} />
        </div>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-t border-border bg-surface shadow-lg">
          <nav className="flex flex-col p-4">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-black/[0.03]"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 border-t border-border" />
            {SELECTOR_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-primary hover:bg-black/[0.03]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
