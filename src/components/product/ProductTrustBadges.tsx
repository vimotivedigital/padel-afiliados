/**
 * Sellos de confianza en ficha de producto. El ASIN se muestra tal cual
 * (no es un secreto, viaja igualmente en el enlace de Amazon) como prueba
 * verificable de que el producto está vinculado a un listado real, en
 * línea con el criterio explicado en /sobre-nosotros.
 */
export function ProductTrustBadges({ asin, className }: { asin: string; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}>
      <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
        Afiliado oficial de Amazon
      </span>
      <span className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
        🔒 Compra segura en Amazon
      </span>
      <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
        ASIN verificado: <span className="ml-1 font-mono">{asin}</span>
      </span>
    </div>
  );
}
