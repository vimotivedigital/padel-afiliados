import Image from "next/image";
import type { Product } from "@/engine/types";
import { Rating } from "@/components/ui/Rating";
import { AmazonCTA } from "@/components/product/AmazonCTA";
import { formatPrice } from "@/lib/utils";

interface Row {
  label: string;
  a: string;
  b: string;
}

export function ComparisonTable({ productA, productB, rows }: { productA: Product; productB: Product; rows: Row[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-border bg-black/[0.02]">
            <th className="w-1/3 px-4 py-4 text-left font-medium text-muted">Característica</th>
            {[productA, productB].map((product) => (
              <th key={product.id} className="px-4 py-4 text-left">
                <div className="flex flex-col items-start gap-2">
                  <div className="relative h-16 w-16 shrink-0">
                    <Image src={product.images[0]} alt={product.name} fill sizes="64px" className="object-contain" />
                  </div>
                  <span className="font-semibold">{product.name}</span>
                  <Rating value={product.rating} count={product.reviewCount} />
                  <span className="font-bold">{formatPrice(product.price)}</span>
                  <AmazonCTA asin={product.asin} productName={product.name} size="sm" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0 odd:bg-black/[0.015]">
              <th scope="row" className="px-4 py-3 text-left font-medium text-muted">{row.label}</th>
              <td className="px-4 py-3">{row.a}</td>
              <td className="px-4 py-3">{row.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
