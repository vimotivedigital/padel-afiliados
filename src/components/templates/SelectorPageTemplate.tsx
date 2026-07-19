import { getConfigurator } from "@/engine/configurators";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Wizard } from "@/components/engine-ui/Wizard";
import { TrustSection } from "@/components/home/TrustSection";

export function SelectorPageTemplate({ configuratorId, path }: { configuratorId: string; path: string }) {
  const configurator = getConfigurator(configuratorId);

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: `Selector de ${configurator.categoryLabel}`, path }]} />
      <div>
        <h1 className="text-3xl font-extrabold leading-tight">Encuentra tu {configurator.categoryLabel} ideal</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{configurator.intro}</p>
      </div>

      <TrustSection compact />

      <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <Wizard configuratorId={configuratorId} />
      </div>
    </div>
  );
}
