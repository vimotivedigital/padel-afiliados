"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="rounded-3xl bg-brand-primary/5 p-8 text-center">
      <h2 className="text-2xl font-bold">No te pierdas ninguna guía ni oferta</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">
        Recibe nuestras nuevas comparativas, reviews y las mejores ofertas de material de pádel una vez por semana.
      </p>
      {submitted ? (
        <p className="mt-4 font-semibold text-brand-primary">¡Gracias! Revisa tu bandeja de entrada para confirmar.</p>
      ) : (
        <form
          className="mx-auto mt-5 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="tu@email.com"
            className="flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
          />
          <Button type="submit">Suscribirme</Button>
        </form>
      )}
    </section>
  );
}
