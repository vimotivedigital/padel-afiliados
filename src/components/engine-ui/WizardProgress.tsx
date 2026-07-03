export function WizardProgress({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs font-medium text-muted">
        <span>
          Pregunta {Math.min(step + 1, total)} de {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
        <div className="h-full rounded-full bg-brand-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
