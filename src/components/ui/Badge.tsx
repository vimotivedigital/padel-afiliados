import { cn } from "@/lib/utils";

type Tone = "primary" | "accent" | "neutral" | "danger";

const TONE_CLASSES: Record<Tone, string> = {
  primary: "bg-brand-primary/10 text-brand-primary-dark",
  accent: "bg-brand-accent text-brand-primary-dark",
  neutral: "bg-black/5 text-foreground",
  danger: "bg-red-100 text-red-700",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", TONE_CLASSES[tone], className)}>
      {children}
    </span>
  );
}
