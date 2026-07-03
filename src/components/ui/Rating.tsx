import { cn } from "@/lib/utils";

/** Estrellas de valoración 0-5, usadas en tarjetas y fichas de producto. */
export function Rating({ value, count, className }: { value: number; count?: number; className?: string }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.max(0, Math.min(1, value - i));
    return fill;
  });

  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`Valoración ${value} de 5`}>
      <div className="flex">
        {stars.map((fill, i) => (
          <span key={i} className="relative inline-block w-4 h-4 text-sm leading-none">
            <span className="absolute inset-0 text-black/15">★</span>
            <span className="absolute inset-0 overflow-hidden text-brand-primary" style={{ width: `${fill * 100}%` }}>
              ★
            </span>
          </span>
        ))}
      </div>
      <span className="text-sm font-medium text-foreground">{value.toFixed(1)}</span>
      {count !== undefined && <span className="text-sm text-muted">({count})</span>}
    </div>
  );
}
