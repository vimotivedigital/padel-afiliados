# Notas de sourcing del catálogo

Notas de proceso para futuras rondas de ampliación del catálogo (nuevos productos en `src/engine/datasets/*.ts`). No es contenido de la web, es documentación interna.

## Patrón detectado: nombres de línea reutilizados entre categorías (2026-07-22)

**El problema**: varias marcas de pádel (StarVie, Nox, Bullpadel, Wilson, Head...) reutilizan el mismo nombre de línea para productos de categorías distintas — por ejemplo "Titania" existe como línea de **pala** en StarVie, no como línea de zapatilla. Si al ampliar el catálogo se busca un ASIN en Keepa/Amazon solo por el nombre del producto (marca + nombre de línea) sin verificar la categoría real del resultado, es fácil asignar por error el ASIN de una pala a una entrada pensada como zapatilla (o viceversa).

**Caso real que disparó esta nota**: `starvie-titania-pro` se creó en `zapatillas.ts` con contenido editorial de zapatilla (pisada, amortiguación, tallas), pero el ASIN asignado (`B0DK812X9H`) correspondía en realidad a la pala real "Starvie Titania Pro 2025" (categoría en Amazon.es: *Deportes y aire libre > Deportes > Pádel > Palas*). El error pasó desapercibido porque el nombre "StarVie Titania Pro" sonaba plausible como zapatilla de la marca. Corregido moviendo la entrada a `palas.ts` (ver commit `953493c`).

**Regla para futuras rondas**: antes de asignar un ASIN a una entrada nueva del catálogo, verificar el `categoryTree` que devuelve Keepa (o la categoría visible en la propia ficha de Amazon) para confirmar que coincide con la categoría del dataset donde se va a insertar (`palas`, `zapatillas`, `paleteros`, `pelotas`, `overgrips`, `protectores`, `ropa`, `accesorios`). No basta con que el nombre del producto "suene" a la categoría esperada — hay que confirmarlo con el dato real de categoría, no solo con el título.

**Nota aparte, no accionable hoy**: en esa misma auditoría se detectaron 3 ASIN de zapatillas reales (Munich PADX 62, Munich PADX 64, Head Motion Pro 1.5 Padel Women) cuyo `categoryTree` en Amazon también dice "Palas", pero cuyo título confirma que son zapatillas reales — en esos casos el error de categoría es del propio vendedor en Amazon, no de nuestro sourcing, así que no se tocaron. Si en el futuro se automatiza algún filtro basado en `categoryTree` de Keepa, tener en cuenta que no es 100% fiable por sí solo.
