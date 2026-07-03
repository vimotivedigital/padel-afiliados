import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-brand-primary text-white hover:bg-brand-primary-dark",
  accent: "bg-brand-accent text-brand-primary-dark hover:brightness-95",
  outline: "border border-border bg-transparent text-foreground hover:bg-black/[0.03]",
  ghost: "bg-transparent text-foreground hover:bg-black/[0.04]",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-6 py-3",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = "primary", size = "md", className, ...rest }: ButtonProps) {
  return <button className={cn(base, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)} {...rest} />;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
}

export function LinkButton({ href, variant = "primary", size = "md", className, external, ...rest }: LinkButtonProps) {
  const classes = cn(base, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);
  if (external) {
    return <a href={href} className={classes} {...rest} />;
  }
  return <Link href={href} className={classes} {...rest} />;
}
