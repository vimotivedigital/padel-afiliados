import { palaConfigurator } from "./palaConfigurator";
import { zapatillaConfigurator } from "./zapatillaConfigurator";
import { paleteroConfigurator } from "./paleteroConfigurator";
import { pelotaConfigurator } from "./pelotaConfigurator";
import { overgripConfigurator } from "./overgripConfigurator";
import { protectorConfigurator } from "./protectorConfigurator";
import type { Configurator } from "./types";

/**
 * Registro único de configuradores. Añadir una categoría nueva (ropa,
 * relojes deportivos, gafas...) es: crear su dataset + rules + configurator
 * y registrarlo aquí. Ni el motor de scoring ni el componente <Wizard>
 * necesitan cambios.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- registro heterogéneo: cada configurador instancia Configurator<T> con un T de producto distinto.
export const configurators: Record<string, Configurator<any>> = {
  pala: palaConfigurator,
  zapatilla: zapatillaConfigurator,
  paletero: paleteroConfigurator,
  pelota: pelotaConfigurator,
  overgrip: overgripConfigurator,
  protector: protectorConfigurator,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- ver nota en `configurators` arriba.
export function getConfigurator(id: string): Configurator<any> {
  const configurator = configurators[id];
  if (!configurator) {
    throw new Error(`Configurador desconocido: "${id}"`);
  }
  return configurator;
}

export {
  palaConfigurator,
  zapatillaConfigurator,
  paleteroConfigurator,
  pelotaConfigurator,
  overgripConfigurator,
  protectorConfigurator,
};
export type { Configurator, Question, QuestionOption, Answers, HardFilter } from "./types";
