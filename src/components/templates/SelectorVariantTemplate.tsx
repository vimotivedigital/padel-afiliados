import type { SelectorVariantPage } from "@/lib/seo/programmatic-pages";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Wizard } from "@/components/engine-ui/Wizard";
import { Faq } from "@/components/product/Faq";

export function SelectorVariantTemplate({ variant, path }: { variant: SelectorVariantPage; path: string }) {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: variant.title, path }]} />
      <div>
        <h1 className="text-3xl font-extrabold leading-tight">{variant.h1}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{variant.intro}</p>
      </div>

      <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <Wizard configuratorId={variant.configuratorId} initialAnswers={variant.initialAnswers} />
      </div>

      <Faq faqs={variant.faqs} />
    </div>
  );
}
