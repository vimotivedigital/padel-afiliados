import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">Error 404</p>
      <h1 className="text-3xl font-extrabold">No hemos encontrado esta página</h1>
      <p className="max-w-md text-muted">
        Puede que el enlace esté roto o que el contenido se haya movido. Prueba a volver al inicio o usa el buscador.
      </p>
      <LinkButton href="/">Volver al inicio</LinkButton>
      <Link href="/selector-pala" className="text-sm font-medium text-brand-primary hover:underline">
        O prueba el selector de pala
      </Link>
    </div>
  );
}
