import { AFFILIATE_DISCLOSURE_TEXT } from "@/lib/constants";

export function AffiliateDisclosure({ className }: { className?: string }) {
  return (
    <p className={`rounded-xl border border-border bg-black/[0.02] p-3 text-xs text-muted ${className ?? ""}`}>
      {AFFILIATE_DISCLOSURE_TEXT}
    </p>
  );
}
