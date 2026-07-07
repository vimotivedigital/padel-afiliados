import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-brand-primary-dark text-white">
      <Image
        src="/images/hero/hero-court.jpg"
        alt="Jugador de pádel golpeando la bola en pista"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark via-brand-primary-dark/80 to-brand-primary-dark/40" aria-hidden />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-primary/60 blur-2xl" aria-hidden />
      <div className="absolute -bottom-16 right-10 h-40 w-40 rounded-full bg-brand-accent/30 blur-xl" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
        <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-accent">
          Motor de recomendación inteligente
        </p>
        <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
          Encuentra tu equipación de pádel ideal en 2 minutos
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Analizamos tu nivel, tu estilo de juego y tu presupuesto para recomendarte las palas, zapatillas y
          accesorios que de verdad encajan contigo — con guías, reviews y comparativas independientes.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/selector-pala" variant="accent" size="lg">
            Probar el selector de pala
          </LinkButton>
          <LinkButton href="/palas" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
            Ver todas las palas
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
