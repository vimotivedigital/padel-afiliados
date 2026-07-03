export interface Spec {
  label: string;
  value: string;
}

export function SpecsTable({ specs, title = "Ficha técnica" }: { specs: Spec[]; title?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <p className="border-b border-border bg-black/[0.02] px-4 py-3 font-semibold">{title}</p>
      <table className="w-full text-sm">
        <tbody>
          {specs.map((spec) => (
            <tr key={spec.label} className="border-b border-border last:border-0 odd:bg-black/[0.015]">
              <th scope="row" className="w-1/2 px-4 py-2.5 text-left font-medium text-muted">
                {spec.label}
              </th>
              <td className="px-4 py-2.5">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
