export function ProsConsBox({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
        <p className="font-semibold text-green-800">Ventajas</p>
        <ul className="mt-2 space-y-1.5 text-sm text-green-900">
          {pros.map((pro) => (
            <li key={pro} className="flex gap-2">
              <span aria-hidden>✓</span>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
        <p className="font-semibold text-red-800">Inconvenientes</p>
        <ul className="mt-2 space-y-1.5 text-sm text-red-900">
          {cons.map((con) => (
            <li key={con} className="flex gap-2">
              <span aria-hidden>✕</span>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
