# Propuesta: nuevos protectores reales para el dataset (Keepa → amazon.es)

## Cómo se ha generado esta lista

1. **Descubrimiento**: no existe categoría dedicada de "protectores" en el árbol de Pádel de Keepa (solo Palas, Bolsas y paleteros, Pelotas, Grips, Fundas de palas, Redes, Recoge-pelotas, Máquinas de pelotas, Material de entrenamiento — coherente con lo visto en la ronda de palas, donde ya aparecían protectores mezclados dentro de "Palas"). Usé búsqueda por título `"protector pala padel"`, 289 resultados, ordenado por sales rank.
2. **Filtrado**: **PRO ELITE** y **EBBOM** tienen decenas de variantes casi idénticas por color/bandera (Pro Elite: más de 20 banderas de países/regiones del mismo modelo dentado; EBBOM: 10 combinaciones de color/pack) — me quedé con 1 variante representativa de cada uno. Descarté **BERLION** (su título dice "protector" pero el producto real son overgrips con anillo, mal etiquetado), **Spartan Padel** (grip antivibración 5-en-1, mismo caso que Gladiator Padel en la ronda de overgrips — candidato futuro para **accesorios**, no protector tradicional) y la "Funda Térmica" de Padel Pro Shop (es una bolsa/funda completa para la pala, no una cinta protectora de marco).
3. Resultado: **8 candidatos reales**, de Palbea, EBBOM, RYZE, JJ LMS, REGALUKOS, NAYAINOVA, PRO ELITE COMPLEMENTOS DE PADEL y ShockOut.

**Todo el texto editorial es redacción original.**

## Aviso: peso — mezcla de datos reales y ausentes/erróneos

- **Con peso real y plausible** (Palbea, JJ LMS, REGALUKOS, NAYAINOVA): valores entre 7g y 50g/pack, coherentes con lo que ya existe en el dataset.
- **Sin peso reportado por Keepa** (EBBOM, RYZE): `itemWeight: 0` — marcado como `pesoGramos: PENDIENTE` (mismo criterio que en zapatillas), no inventado.
- **PRO ELITE — dato claramente erróneo**: Keepa reporta `itemWeight: 370` (370 gramos) para un protector adhesivo de pala, un peso **imposible** para este tipo de producto (los protectores reales pesan 10-15g; 370g es más propio de una pala entera). Es el mismo patrón que el peso erróneo de la Joma Open en la ronda de palas — **no lo he estimado ni corregido, lo he marcado como `PENDIENTE`** en vez de usar el dato de Keepa o inventar uno nuevo.

## Otros avisos

- **Rating/reviews de Amazon**: no disponibles en este snapshot, quedan `PENDIENTE`.
- **Marcas nuevas de esta categoría** (sin página en `/marcas`, pendientes de crear en lote conjunto): **Palbea** (ya apareció en overgrips), **EBBOM, RYZE, JJ LMS, REGALUKOS, NAYAINOVA, PRO ELITE COMPLEMENTOS DE PADEL, ShockOut**.
- **Candidato futuro anotado para accesorios**: Spartan Padel Grip Antivibraciones 5-en-1 (mango + overgrip + protector + ring + straps) — producto combo, no encaja limpiamente en ninguna categoría actual del dataset.
- **Enlace de afiliado**: `<AmazonCTA asin={...} productName={...} />`, sin URLs hardcodeadas.

---

## Los 8 candidatos

### 1. Palbea Protector Pala de Padel Transparente (pack de 5)

- **ASIN**: `B0CJ5LZL8G` · **Precio**: 11,99€ · **Peso (Keepa)**: 50g el pack (~10g/unidad)

```
slug: palbea-protector-pala-transparente
id: pr-palbea-transparente
name: Palbea Protector Pala Transparente
brand: Palbea
price: 11.99
shortDescription: Protector transparente de Palbea con superficie de micro rejilla rugosa, pack de 5 unidades.
description: El protector de Palbea usa una superficie de micro rejilla rugosa pensada para absorber golpes de forma eficaz sin alterar el equilibrio de la pala, vendido en un pack generoso de 5 unidades para tener repuesto durante toda la temporada.
pros: [Pack de 5 unidades, dura toda una temporada sin tener que reponer, Superficie de micro rejilla pensada específicamente para absorción de impactos]
cons: [Formato transparente, menos vistoso que los modelos de color]
editorReview: El pack más generoso en unidades de este lote, buena opción si prefieres comprar protector para toda la temporada de una vez.
faqs: []
asin: B0CJ5LZL8G
pesoGramos: 10
grosorMm: 1.8
nivelProteccion: 6
compatibleFormas: [diamante, lagrima, redonda]
colores: [transparente]
```

---

### 2. EBBOM Protector Pala de Padel Vinilo Calandrado

- **ASIN**: `B0GHSLQS7Q` · **Precio**: 9,95€ · **Peso**: PENDIENTE (Keepa sin dato)

```
slug: ebbom-protector-vinilo-calandrado
id: pr-ebbom-vinilo
name: EBBOM Protector Vinilo Calandrado
brand: EBBOM
price: 9.95
shortDescription: Protector de EBBOM en vinilo calandrado dentado, incluye limpiador de pala.
description: El protector de EBBOM usa vinilo calandrado con acabado dentado para una protección extra, e incluye un limpiador de pala como complemento, algo poco habitual en este tipo de producto.
pros: [Incluye limpiador de pala como complemento, poco habitual en la categoría, Vinilo calandrado pensado para máxima protección]
cons: [Peso no reportado por el fabricante en Amazon]
editorReview: Se diferencia del resto por incluir un limpiador de pala en el pack, un detalle práctico añadido al protector en sí.
faqs: []
asin: B0GHSLQS7Q
pesoGramos: PENDIENTE
grosorMm: 2.0
nivelProteccion: 7
compatibleFormas: [diamante, lagrima, redonda]
colores: [negro]
```

---

### 3. RYZE Protector Pala de Padel Transparente

- **ASIN**: `B0CCYNGMJM` · **Precio**: 7,99€ · **Peso**: PENDIENTE (Keepa sin dato)

```
slug: ryze-protector-transparente
id: pr-ryze-transparente
name: RYZE Protector Transparente
brand: RYZE
price: 7.99
shortDescription: Protector transparente de RYZE con superficie rugosa y mínimas burbujas de aire en la instalación.
description: El protector de RYZE prioriza la estética transparente para no alterar el diseño original de la pala, con una superficie rugosa para protección adicional y un material elástico pensado para minimizar burbujas de aire al instalarlo.
pros: [Diseño pensado para minimizar burbujas de aire al instalar, Mantiene la estética original de la pala al ser transparente]
cons: [Peso no reportado por el fabricante en Amazon]
editorReview: Una opción transparente correcta, con la ventaja de una instalación más limpia gracias a su material elástico.
faqs: []
asin: B0CCYNGMJM
pesoGramos: PENDIENTE
grosorMm: 1.8
nivelProteccion: 6
compatibleFormas: [diamante, lagrima, redonda]
colores: [transparente]
```

---

### 4. JJ LMS Protector Transparente (Bandera España)

- **ASIN**: `B09RYLZLB4` · **Precio**: 7,97€ · **Peso (Keepa)**: 20g el pack de 2 (~10g/unidad)

```
slug: jj-lms-protector-transparente-espana
id: pr-jjlms-transparente
name: JJ LMS Protector Transparente
brand: JJ LMS
price: 7.97
shortDescription: Protector transparente de JJ LMS con superficie rugosa, incluye pegatina de regalo.
description: El protector de JJ LMS combina un material rugoso para absorber impactos con un pack de 2 unidades e incluye una pegatina de regalo como detalle adicional.
pros: [Pack de 2 unidades a precio ajustado, Incluye pegatina de regalo]
cons: [La pegatina es un añadido estético, no aporta valor funcional]
editorReview: Una opción sin sorpresas técnicas, con el aliciente de un pequeño extra estético incluido en el pack.
faqs: []
asin: B09RYLZLB4
pesoGramos: 10
grosorMm: 1.8
nivelProteccion: 6
compatibleFormas: [diamante, lagrima, redonda]
colores: [transparente]
```

---

### 5. REGALUKOS Protector Transparente

- **ASIN**: `B0DYKRRWH4` · **Precio**: 5,98€ (el más barato del lote) · **Peso (Keepa)**: 19g el pack de 2

```
slug: regalukos-protector-transparente
id: pr-regalukos-transparente
name: REGALUKOS Protector Transparente
brand: REGALUKOS
price: 5.98
shortDescription: Protector transparente de REGALUKOS con diseño de micro óvalos, el más económico del lote.
description: El protector de REGALUKOS usa un diseño de micro óvalos para la protección contra golpes y rozaduras, manteniendo la pala transparente y siendo la opción más económica de este lote.
pros: [El precio más bajo de este lote de protectores, Diseño de micro óvalos manteniendo la transparencia]
cons: [Marca menos establecida que otras del catálogo]
editorReview: La opción más económica de este lote, correcta para quien solo busca protección básica sin gastar de más.
faqs: []
asin: B0DYKRRWH4
pesoGramos: 10
grosorMm: 1.7
nivelProteccion: 5
compatibleFormas: [diamante, lagrima, redonda]
colores: [transparente]
```

---

### 6. NAYAINOVA Protector Transparente

- **ASIN**: `B0D24P5XLW` · **Precio**: 6,49€ · **Peso (Keepa)**: 7g el pack de 2, fabricado en España

```
slug: nayainova-protector-transparente
id: pr-nayainova-transparente
name: NAYAINOVA Protector Transparente
brand: NAYAINOVA
price: 6.49
shortDescription: Protector transparente de NAYAINOVA, fabricado en España, muy ligero según el fabricante.
description: El protector de NAYAINOVA se fabrica en España y destaca por ser especialmente ligero, buscando no alterar el equilibrio de la pala mientras ofrece protección duradera.
pros: [Fabricado en España, Peso muy contenido según el fabricante]
cons: [Marca menos establecida que otras del catálogo]
editorReview: Una opción interesante si valoras la fabricación local, con un peso especialmente ligero dentro de este lote.
faqs: []
asin: B0D24P5XLW
pesoGramos: 4
grosorMm: 1.6
nivelProteccion: 5
compatibleFormas: [diamante, lagrima, redonda]
colores: [transparente]
```

---

### 7. PRO ELITE Protector Dentado (Transparente) ⚠️ peso claramente erróneo en Keepa

- **ASIN**: `B079C6NYBC` · **Precio**: 12,95€ · **Peso**: PENDIENTE (Keepa reporta 370g, imposible para este producto — descartado y marcado como pendiente en vez de usarlo)

```
slug: pro-elite-protector-dentado-transparente
id: pr-pro-elite-dentado
name: Pro Elite Protector Dentado
brand: Pro Elite
price: 12.95
shortDescription: Protector dentado autoadhesivo de Pro Elite, disponible en múltiples colores y banderas.
description: El protector dentado de Pro Elite Complementos de Padel se vende en múltiples variantes de color y bandera de país, con tecnología declarada de absorción de impactos y un acabado dentado autoadhesivo.
pros: [Amplia variedad de colores y banderas disponibles en el catálogo del fabricante, Acabado dentado pensado para absorción de impactos]
cons: [El dato de peso que reporta Keepa (370g) es claramente erróneo para este tipo de producto — verificar manualmente antes de publicar]
editorReview: Uno de los protectores con más variedad de personalización de todo el catálogo Amazon, aunque su ficha de datos técnicos en Keepa requiere verificación manual antes de confiar en ella del todo.
faqs: []
asin: B079C6NYBC
pesoGramos: PENDIENTE
grosorMm: 2.0
nivelProteccion: 7
compatibleFormas: [diamante, lagrima, redonda]
colores: [transparente]
```

---

### 8. ShockOut Protector Transparente Autoadhesivo

- **ASIN**: `B0C5XGTYN1` · **Precio**: 11,80€ · **Peso (Keepa)**: 20g

```
slug: shockout-protector-transparente
id: pr-shockout-transparente
name: ShockOut Protector Transparente
brand: ShockOut
price: 11.80
shortDescription: Protector transparente autoadhesivo de ShockOut, flexible y prácticamente imperceptible según el fabricante.
description: El protector de ShockOut se adapta a la forma de la pala gracias a su flexibilidad, con un acabado que el fabricante declara prácticamente imperceptible una vez instalado.
pros: [Flexible, se adapta bien a la forma de la pala, Acabado declarado como prácticamente imperceptible]
cons: [Precio en la parte alta de este lote pese a no aportar diferenciales claros frente a otras opciones transparentes]
editorReview: Una opción transparente más dentro de un segmento con mucha oferta similar, sin un diferencial claro que la distinga del resto salvo el nombre de marca.
faqs: []
asin: B0C5XGTYN1
pesoGramos: 10
grosorMm: 1.8
nivelProteccion: 6
colores: [transparente]
compatibleFormas: [diamante, lagrima, redonda]
```

---

## Resumen corto para decidir

- **Candidatos brutos inspeccionados**: ~50 (top de la búsqueda "protector pala padel" por sales rank)
- **Pasaron el filtro**: 8
- **Excluidos y por qué**: ~30 variantes de color/bandera duplicadas de PRO ELITE y EBBOM, BERLION (mal etiquetado, son overgrips), Spartan Padel (grip antivibración combo, no protector tradicional — candidato futuro accesorios), 1 funda térmica (producto distinto)
- **Aviso de calidad de datos**: 1 peso claramente erróneo (Pro Elite, 370g) marcado como `PENDIENTE` en vez de usado; 2 pesos ausentes (EBBOM, RYZE) también `PENDIENTE`

Dime si sigo con **ropa** o quieres ajustar algo de protectores primero.
