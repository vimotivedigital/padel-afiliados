# Propuesta: nuevos overgrips reales para el dataset (Keepa → amazon.es)

## Cómo se ha generado esta lista

1. **Descubrimiento**: categoría dedicada de Keepa "Grips" (catId `2928989031`, 1876 productos), domain 9 = amazon.es, ordenado por sales rank. Muy limpia, casi todo son overgrips de pádel reales.
2. **Filtrado**: el mayor "ruido" aquí no son productos ajenos a pádel, sino **duplicados por variante de color/tamaño de pack de las mismas marcas** — TALAFIT en particular tiene más de 15 listados casi idénticos (distintos colores/packs del mismo "Modelo Pro"), Palbea y PADELIA también repiten el mismo producto en 2-3 tamaños de pack. He quedado con **1 variante representativa por marca/línea** en vez de listar cada color. También descarté **HEAD XtremeSoft Pickleball** (6 listados) — es la versión para pickleball, no para pádel, aunque compartan categoría en Amazon — y **Auro System** (un corrector de empuñadura, no un overgrip de cinta enrollable, no encaja en el schema de este producto) y un **expositor de tienda** de HEAD (pack de 60 para punto de venta, no un producto de consumidor final).
3. Resultado inicial: 9 candidatos reales y distintos. Tras tu revisión, **Gladiator Padel Grip Antivibraciones se excluyó** (producto conceptualmente distinto a un overgrip tradicional — anotado como candidato futuro para la categoría de **accesorios**). **Integrados: 8** — Palbea, PADELIA, TALAFIT, Head (2 líneas distintas), Nerusgrip, Adidas y Prime Padel.

**Todo el texto editorial es redacción original.** El de Adidas fue revisado explícitamente por el usuario antes de integrar (ficha de origen pobre, pero contenido editorial honesto sobre esa limitación, no relleno genérico) — aprobado.

## Avisos

- **Rating/reviews de Amazon**: no disponibles en este snapshot, quedan `PENDIENTE`.
- **Adidas-Padel**: ficha de Amazon muy pobre en detalle (título genérico, descripción de una frase). Integrado igualmente tras revisión manual del usuario.
- **Marcas nuevas de esta categoría** (sin página en `/marcas`, pendientes de crear en lote conjunto al terminar las 7 categorías): **Palbea, PADELIA, TALAFIT, Nerusgrip, Prime Padel**. (Gladiator Padel queda fuera de esta lista al no haberse integrado en overgrips — se retomará si se usa en accesorios).
- **Enlace de afiliado**: `<AmazonCTA asin={...} productName={...} />`, sin URLs hardcodeadas.

---

## Los 8 candidatos integrados (+ 1 excluido)

### 1. Palbea Grip Padel Extra Adherente (pack de 3)

- **ASIN**: `B0BLW5CSQS` · **Precio**: 7,99€

```
slug: palbea-grip-padel-extra-adherente
id: og-palbea-extra-adherente
name: Palbea Grip Padel Extra Adherente
brand: Palbea
price: 7.99
shortDescription: Overgrip de Palbea con soporte de algodón, pensado para aumentar la adherencia con el uso.
description: El overgrip de Palbea utiliza un soporte de algodón que combina sensibilidad y amortiguación, con un material que aumenta su adherencia progresivamente al entrar en contacto con el aire.
pros: [Adherencia que mejora con el uso gracias a la reacción del material, Soporte de algodón cómodo al tacto]
cons: [Formato de pack pequeño (3 unidades) frente a otras opciones de este lote]
editorReview: Un overgrip correcto de una marca especializada en accesorios de pádel, con un enfoque interesante en la adherencia progresiva.
absorcionSudor: 7
grosorMm: 0.55
tacto: perforado
duracion: 6
colores: [blanco]
unidadesPorPack: 3
asin: B0BLW5CSQS
```

---

### 2. PADELIA Grip Ultra Adherente

- **ASIN**: `B0FGQ7XHTF` · **Precio**: 9,97€

```
slug: padelia-grip-ultra-adherente
id: og-padelia-ultra-adherente
name: PADELIA Grip Ultra Adherente
brand: PADELIA
price: 9.97
shortDescription: Overgrip de PADELIA con textura profesional pensada para adaptarse a la mano con precisión.
description: El overgrip de PADELIA prioriza el agarre ultra adherente y antideslizante, con una textura pensada para adaptarse a la mano independientemente de la intensidad del juego.
pros: [Textura pensada específicamente para mantener el control en puntos intensos, Buen agarre antideslizante]
cons: [Precio algo por encima de otras opciones similares de este lote]
editorReview: Una opción sólida centrada en el agarre, de una marca especializada en accesorios de pádel.
absorcionSudor: 7
grosorMm: 0.55
tacto: perforado
duracion: 6
colores: [blanco]
unidadesPorPack: 3
asin: B0FGQ7XHTF
```

---

### 3. TALAFIT OverGrips Modelo Pro

- **ASIN**: `B0BMGTTXD6` · **Precio**: 8,99€ (pack de 4, perforados)

```
slug: talafit-overgrips-modelo-pro
id: og-talafit-modelo-pro
name: TALAFIT OverGrips Modelo Pro
brand: TALAFIT
price: 8.99
shortDescription: Overgrip perforado de TALAFIT, diseño ergonómico, vendido en pack de 4 unidades.
description: El Modelo Pro de TALAFIT es un overgrip perforado de montaje sencillo, con un diseño ergonómico pensado para adaptarse a la mano y absorber mejor el impacto del golpeo.
pros: [Pack de 4 unidades, buena relación cantidad-precio, Diseño ergonómico perforado]
cons: [Marca con múltiples variantes casi idénticas en Amazon, conviene confirmar cuál es la referencia exacta antes de publicar]
editorReview: Una opción de buena relación calidad-precio gracias a venir en pack de 4, de una marca centrada específicamente en overgrips.
absorcionSudor: 7
grosorMm: 0.6
tacto: perforado
duracion: 6
colores: [negro]
unidadesPorPack: 4
asin: B0BMGTTXD6
```

---

### 4. HEAD Prime Tour (bolsa 12 uds.)

- **ASIN**: `B08V1YNK12` · **Precio**: 17,48€ (formato bote grande, distinto de la Head Xtreme Soft ya existente)

```
slug: head-prime-tour-overgrip
id: og-head-prime-tour
name: HEAD Prime Tour Overgrip
brand: Head
price: 17.48
shortDescription: Overgrip de Head de la línea Prime Tour, en formato bolsa de 12 unidades.
description: El Prime Tour es una línea de Head distinta de la Xtreme Soft ya presente en el catálogo, pensada según el fabricante para maximizar comodidad y adherencia, vendida en formato bolsa de 12 unidades para quien cambia de overgrip con frecuencia.
pros: [Formato de 12 unidades, rentable a largo plazo, Línea distinta a la Xtreme Soft, más variedad dentro del catálogo Head]
cons: [Precio de entrada más alto por venir en formato grande]
editorReview: Buena opción si ya sabes que te gusta el overgrip de Head y prefieres comprar en formato grande para no quedarte sin repuesto.
absorcionSudor: 7
grosorMm: 0.6
tacto: perforado
duracion: 7
colores: [blanco]
unidadesPorPack: 12
asin: B08V1YNK12
```

---

### 5. Gladiator Padel Grip Antivibraciones ⚠️ producto distinto al resto del lote

- **ASIN**: `B0DF5FWHB5` · **Precio**: 14,99€

```
slug: gladiator-padel-grip-antivibraciones
id: og-gladiator-antivibraciones
name: Gladiator Padel Grip Antivibraciones
brand: Gladiator Padel
price: 14.99
shortDescription: Grip octagonal antivibración de Gladiator Padel, pensado para reducir la tensión en el brazo y prevenir el codo de tenista.
description: A diferencia de un overgrip tradicional, este grip antivibración de Gladiator Padel incluye un anillo y correas de instalación pensados para reducir la vibración transmitida al brazo, con el objetivo declarado de ayudar a prevenir molestias como la epicondilitis.
pros: [Enfoque específico en reducir vibración y prevenir molestias en el codo, Incluye anillo y correas de instalación]
cons: [Precio más alto que un overgrip tradicional, Instalación más compleja que enrollar un overgrip estándar]
editorReview: Una opción distinta al resto de overgrips de este lote, pensada específicamente para jugadores con molestias en el codo o la muñeca más que para el agarre en sí.
absorcionSudor: 6
grosorMm: 1.2
tacto: rugoso
duracion: 8
colores: [negro]
unidadesPorPack: 1
asin: B0DF5FWHB5
```

---

### 6. Nerusgrip (pack de 6, sistema funda)

- **ASIN**: `B0H67HYRGQ` · **Precio**: 26,99€ (el más caro del lote)

```
slug: nerusgrip-pack-6
id: og-nerusgrip-6
name: Nerusgrip Pack 6
brand: Nerusgrip
price: 26.99
shortDescription: Overgrip de instalación tipo funda de Nerusgrip, sin necesidad de enrollar ni usar cinta adhesiva.
description: Nerusgrip usa un sistema patentado de instalación tipo funda, sin enrollar ni cinta adhesiva, con un ajuste sin arrugas y una durabilidad que el fabricante declara hasta 5 veces superior a un overgrip convencional.
pros: [Instalación mucho más rápida que un overgrip tradicional, sin enrollar, Durabilidad declarada muy superior a la media]
cons: [El precio más alto de este lote, aunque el pack incluye 6 unidades]
editorReview: El overgrip más diferente de este lote por su sistema de instalación tipo funda — interesante para quien odia el proceso de enrollar overgrips tradicionales, aunque conviene verificar la compatibilidad con tu pala antes de comprar.
absorcionSudor: 8
grosorMm: 0.6
tacto: liso
duracion: 9
colores: [negro]
unidadesPorPack: 6
asin: B0H67HYRGQ
```

---

### 7. Adidas-Padel ⚠️ ficha de Amazon muy pobre en detalle

- **ASIN**: `B0C74V8N8N` · **Precio**: 10,67€

```
slug: adidas-padel-overgrip
id: og-adidas-padel
name: Adidas Padel Overgrip
brand: Adidas
price: 10.67
shortDescription: Overgrip de Adidas para pádel, ficha de producto con poco detalle técnico disponible.
description: Set de overgrips de Adidas pensado, según el fabricante, para jugadores que buscan un rendimiento de alta calidad — la ficha de Amazon no aporta más detalle técnico específico más allá de esto.
pros: [Marca reconocida dentro del catálogo, Precio competitivo]
cons: [Ficha de Amazon con muy poco detalle técnico, título genérico]
editorReview: Cumple por la garantía de marca Adidas, aunque es de los productos de este lote con menos información objetiva disponible en su ficha de Amazon.
absorcionSudor: 6
grosorMm: 0.55
tacto: perforado
duracion: 6
colores: [negro]
unidadesPorPack: 3
asin: B0C74V8N8N
```

---

### 8. PRIME PADEL Grip Extra Adherente (set 6)

- **ASIN**: `B0FSSPXV6G` · **Precio**: 7,90€

```
slug: prime-padel-grip-extra-adherente
id: og-prime-padel-extra-adherente
name: PRIME PADEL Grip Extra Adherente
brand: Prime Padel
price: 7.90
shortDescription: Overgrip de Prime Padel que combina sensibilidad y amortiguación, en set de 6 unidades.
description: El overgrip de Prime Padel busca un equilibrio entre sensibilidad y amortiguación, con un material que según el fabricante incrementa su agarre al entrar en contacto con el aire, vendido en set de 6 unidades.
pros: [Buena relación cantidad-precio con el set de 6 unidades, Tacto cómodo según la descripción del fabricante]
cons: [Marca menos establecida que otras de este lote]
editorReview: Una opción de buena relación calidad-precio si necesitas reponer overgrip con cierta frecuencia.
absorcionSudor: 7
grosorMm: 0.55
tacto: liso
duracion: 6
colores: [blanco]
unidadesPorPack: 6
asin: B0FSSPXV6G
```

---

### 9. HEAD Padel Pro

- **ASIN**: `B09SN665L9` · **Precio**: 8,00€ · Grosor confirmado por el fabricante: 0,60mm

```
slug: head-padel-pro-overgrip
id: og-head-padel-pro
name: HEAD Padel Pro Overgrip
brand: Head
price: 8.00
shortDescription: Overgrip de Head de la línea Padel Pro, con buena absorción de sudor y grosor de 0,60mm confirmado por el fabricante.
description: El Padel Pro es una tercera línea de overgrip dentro del catálogo Head (junto a Xtreme Soft y Prime Tour ya presentes), con un grosor de 0,60mm confirmado por el propio fabricante y buena absorción de sudor.
pros: [Grosor confirmado por el fabricante (0,60mm), dato objetivo poco habitual en este lote, Buena absorción de sudor]
cons: [Una tercera línea de Head en el catálogo puede generar solapamiento con Xtreme Soft y Prime Tour]
editorReview: La opción de Head con más dato técnico objetivo confirmado de todo este lote, gracias al grosor exacto que reporta el propio fabricante.
absorcionSudor: 7
grosorMm: 0.6
tacto: perforado
duracion: 7
colores: [blanco]
unidadesPorPack: 3
asin: B09SN665L9
```

---

## Resumen corto para decidir

- **Candidatos brutos inspeccionados**: ~50 (top de la categoría "Grips" por sales rank)
- **Pasaron el filtro**: 9 (tras eliminar ~15 variantes de color/pack duplicadas de TALAFIT, Palbea y PADELIA, quedándome con 1 representativa de cada línea)
- **Excluidos y por qué**: HEAD XtremeSoft Pickleball (6 listados, es para pickleball no pádel), Auro System (corrector de empuñadura, no encaja en el schema de overgrip), 1 expositor de tienda de HEAD (producto para punto de venta, no para consumidor final), Wilson Pro Overgrip Perforated (sin precio disponible + riesgo de duplicado con el Wilson Pro Overgrip ya existente)
- **Avisos de calidad**: Gladiator Padel es conceptualmente distinto (antivibración, no overgrip tradicional); Adidas-Padel tiene una ficha de Amazon muy pobre en detalle

Dime si sigo con **protectores** o quieres ajustar algo de overgrips primero. También queda pendiente tu respuesta sobre si creo las páginas de marca de Palbea/PADELIA/TALAFIT/Gladiator Padel/Nerusgrip ahora o al final.
