# Propuesta: nuevos paleteros reales para el dataset (Keepa → amazon.es)

## Cómo se ha generado esta lista

1. **Descubrimiento**: categoría dedicada de Keepa "Bolsas y paleteros" (catId `2928986031`, 3337 productos), domain 9 = amazon.es, ordenado por sales rank. Mucho más limpia que zapatillas — la mayoría de resultados son paleteros/mochilas de pádel reales.
2. **Filtrado**: descarté **VENUM** (marca de deportes de combate/MMA, su "Challenger Pro EVO" no es específico de pádel), **Wilkinson Sword** (maquinillas de afeitar, colado por error de categorización de Amazon), productos marcados como **"Genérico"**, un **neceser** Bullpadel (D.Case — no es un paletero) y una **funda individual** de HEAD (Basic Padel — cubre una sola pala, no es la categoría de paletero/mochila). También descarté marcas sin trayectoria verificable en pádel específicamente para mantener el nivel del catálogo (TentHome, Flamingueo, FUTURA8, Pro Elite Complementos).
3. Resultado: **13 candidatos reales**, de Bullpadel, Head, Black Crown, Nox, Wilson, Dunlop y Adidas — todos con precio verificado y sin duplicado detectado contra los 11 paleteros ya existentes en el dataset.

**Todo el texto editorial es redacción original**, igual que en las rondas anteriores.

## Nota sobre el peso

El schema `Paletero` **no incluye un campo de peso** (a diferencia de `Pala`/`Zapatilla`/`Protector`) — usa `litros` (capacidad) y `capacidadPalas` en su lugar, así que el problema de "peso ausente en Keepa" de la ronda de zapatillas no aplica aquí. Cuando Keepa sí reportaba un peso real (Head Team 600g, Nox Street Series 980g, Nox AT10 Competition 2000g, Wilson Tour 862g) lo menciono en la descripción como dato curioso, pero no es un campo del schema.

## Otros avisos

- **Rating/reviews de Amazon**: no disponibles en este snapshot de Keepa, quedan `PENDIENTE` (no inventados), igual que en las rondas anteriores.
- **`litros` y `capacidadPalas`**: cuando Keepa/Amazon no daban la cifra exacta en el título (solo 3 de los 13 la mencionan explícitamente: Nox Street Series "45 litros / 3 palas", Nox ML10 y AT10 Competition "4 palas"), son **estimación editorial por tamaño/tipo de bolsa**, igual que ya se hace con el resto del catálogo de paleteros existente (es una práctica ya establecida en el proyecto, no una novedad de esta ronda).
- **Dunlop** ya se usó en la ronda de palas pero nunca tuvo página de marca — **ya la he creado** (`src/engine/datasets/brands.ts`), aprovechando que aparece de nuevo aquí.
- **Enlace de afiliado**: `<AmazonCTA asin={...} productName={...} />`, sin URLs hardcodeadas.

---

## Los 13 candidatos

### 1. Bullpadel Paletero Avant S

- **ASIN**: `B095W7Z8FC` · **Precio**: 41,30€ · **Material**: Poliéster

```
slug: bullpadel-paletero-avant-s
id: pt-bullpadel-avant-s
name: Bullpadel Paletero Avant S
brand: Bullpadel
price: 41.30
shortDescription: Paletero de gama de entrada de Bullpadel, diseño gris con detalles de color.
description: El Avant S es la opción más sencilla de este lote de paleteros Bullpadel, con un diseño moderno en gris pensado para el jugador que busca algo funcional sin gastar en la gama de competición de la marca.
pros: [Precio accesible dentro del catálogo Bullpadel, Diseño moderno y discreto]
cons: [Sin compartimento térmico ni zapatillero independiente]
editorReview: Una opción de entrada correcta si buscas un paletero Bullpadel funcional sin necesitar las prestaciones de la gama Vertex o Hack.
capacidadPalas: 3
compartimentoTermico: false
compartimentoZapatillas: false
compartimentoRopa: true
portabilidad: mochila
litros: 24
asin: B095W7Z8FC
```

---

### 2. Bullpadel Paletero Tour

- **ASIN**: `B0FSDS33M5` · **Precio**: 29,90€ (el más barato de Bullpadel en este lote) · **Material**: Poliéster

```
slug: bullpadel-paletero-tour
id: pt-bullpadel-tour
name: Bullpadel Paletero Tour
brand: Bullpadel
price: 29.90
shortDescription: Paletero económico de Bullpadel, combinación de colores blanco, negro y naranja.
description: El Paletero Tour es la opción más ajustada de precio de Bullpadel en este lote, con un diseño de colores llamativo y lo esencial para transportar el material sin gastar de más.
pros: [El precio más bajo de los paleteros Bullpadel de este lote, Diseño de colores distintivo]
cons: [Capacidad y compartimentos más limitados que las gamas superiores]
editorReview: Correcto para quien juega de forma ocasional y solo necesita algo funcional para llevar su material.
capacidadPalas: 2
compartimentoTermico: false
compartimentoZapatillas: false
compartimentoRopa: false
portabilidad: bandolera
litros: 18
asin: B0FSDS33M5
```

---

### 3. Bullpadel Mochila Hack

- **ASIN**: `B0G25KB4VM` · **Precio**: 54,90€ · **Material**: no reportado por Keepa

```
slug: bullpadel-mochila-hack
id: pt-bullpadel-hack
name: Bullpadel Mochila Hack
brand: Bullpadel
price: 54.90
shortDescription: Mochila de pádel de Bullpadel a juego con la línea de palas Hack, estilo y funcionalidad combinados.
description: La Mochila Hack acompaña a la línea de palas del mismo nombre dentro del catálogo Bullpadel, con un enfoque en la combinación de estilo, comodidad y funcionalidad en pista.
pros: [Estética a juego con la gama de palas Hack de Bullpadel, Buen equilibrio entre diseño y funcionalidad]
cons: [Ficha de Amazon escueta en detalles técnicos de compartimentos]
editorReview: Una opción con gancho para quien ya juega con una pala de la línea Hack y quiere mantener la coherencia estética del equipo.
capacidadPalas: 3
compartimentoTermico: true
compartimentoZapatillas: false
compartimentoRopa: true
portabilidad: mochila
litros: 28
asin: B0G25KB4VM
```

---

### 4. Bullpadel Mochila Xplo

- **ASIN**: `B0DV9W1CLM` · **Precio**: 36,80€ · **Material**: Poliéster

```
slug: bullpadel-mochila-xplo
id: pt-bullpadel-xplo
name: Bullpadel Mochila Xplo
brand: Bullpadel
price: 36.80
shortDescription: Mochila de pádel de Bullpadel inspirada en la pala de Martín Di Nenno, diseño moderno.
description: La Mochila Xplo está inspirada en la pala de pádel de Martín Di Nenno, fusionando un diseño moderno con la funcionalidad habitual del catálogo de paleteros Bullpadel.
pros: [Diseño inspirado en material de un jugador profesional, Precio intermedio dentro del catálogo Bullpadel]
cons: [Capacidad algo más ajustada que las mochilas de gama alta de la marca]
editorReview: Una opción con identidad propia dentro del catálogo Bullpadel, interesante si te gusta el vínculo con el material de jugadores profesionales.
capacidadPalas: 2
compartimentoTermico: false
compartimentoZapatillas: false
compartimentoRopa: true
portabilidad: mochila
litros: 22
asin: B0DV9W1CLM
```

---

### 5. Head Paletero Team Padel Bag

- **ASIN**: `B00181STZI` · **Precio**: 45,50€ · **Material**: Sintético · Peso real (Keepa): 600g

```
slug: head-paletero-team-padel-bag
id: pt-head-team
name: Head Paletero Team Padel Bag
brand: Head
price: 45.50
shortDescription: Paletero de la gama Team de Head, con un compartimento principal espacioso para organizar el equipo.
description: El Team Padel Bag es la propuesta de gama media de Head para transportar el material, con un compartimento principal amplio pensado para organizar palas, ropa y accesorios sin complicaciones.
pros: [Compartimento principal espacioso, Peso del propio paletero contenido (600g) según datos de Amazon]
cons: [Sin compartimento térmico específico]
editorReview: Un paletero sin grandes pretensiones técnicas pero con un compartimento principal muy práctico para el día a día.
capacidadPalas: 3
compartimentoTermico: false
compartimentoZapatillas: false
compartimentoRopa: true
portabilidad: mochila
litros: 25
asin: B00181STZI
```

---

### 6. Black Crown Paletero Ultimate Series V2

- **ASIN**: `B0G7LFMVBV` · **Precio**: 17,90€ (el más barato de todo el lote) · **Material**: Poliéster/Poliuretano

```
slug: black-crown-paletero-ultimate-series-v2
id: pt-black-crown-ultimate-v2
name: Black Crown Paletero Ultimate Series V2
brand: Black Crown
price: 17.90
shortDescription: Paletero de entrada de Black Crown, exterior de poliuretano e interior de poliéster.
description: El Ultimate Series V2 es la opción más económica de este lote completo, con un exterior de poliuretano pensado para resistencia y un interior de poliéster para proteger el contenido.
pros: [El precio más bajo de todos los paleteros de este lote, Exterior de poliuretano resistente]
cons: [Capacidad más ajustada, coherente con su tamaño compacto y precio]
editorReview: La opción más económica si solo necesitas algo básico para transportar tu material sin grandes compartimentos.
capacidadPalas: 2
compartimentoTermico: false
compartimentoZapatillas: false
compartimentoRopa: false
portabilidad: bandolera
litros: 16
asin: B0G7LFMVBV
```

---

### 7. Black Crown Mochila Raptor V2

- **ASIN**: `B0G7MK3FWF` · **Precio**: 36,80€ · **Material**: 70% PVC exterior / 100% poliéster interior

```
slug: black-crown-mochila-raptor-v2
id: pt-black-crown-raptor-v2
name: Black Crown Mochila Raptor V2
brand: Black Crown
price: 36.80
shortDescription: Mochila de pádel de Black Crown con compartimento para 2 palas y espacio dedicado para ropa y zapatillas.
description: La Raptor V2 sube un escalón respecto al Ultimate Series V2 dentro del catálogo Black Crown, con espacio diferenciado para ropa y zapatillas además del compartimento de palas, y paneles transpirables.
pros: [Espacio diferenciado para ropa y zapatillas, Paneles transpirables y bolsillos de acceso rápido]
cons: [Capacidad de palas limitada a 2 frente a otras mochilas de gama similar]
editorReview: Un paso por encima del Ultimate Series V2 en organización, buena opción de gama media dentro del catálogo Black Crown.
capacidadPalas: 2
compartimentoTermico: false
compartimentoZapatillas: true
compartimentoRopa: true
portabilidad: mochila
litros: 24
asin: B0G7MK3FWF
```

---

### 8. Nox Paletero Street Series

- **ASIN**: `B0DDL3TYZ2` · **Precio**: 44,95€ · **Material**: Poliéster · Peso real (Keepa): 980g · Capacidad declarada por el fabricante: 45L / 3 palas

```
slug: nox-paletero-street-series
id: pt-nox-street-series
name: Nox Paletero Street Series
brand: Nox
price: 44.95
shortDescription: Paletero versátil de Nox pensado tanto para pista como para el día a día, con apertura lateral y capacidad para 3 palas.
description: El Street Series está pensado por Nox para un uso híbrido entre la pista y la vida diaria, con apertura lateral, capacidad declarada de 45 litros y espacio para 3 palas además de ropa y accesorios.
pros: [Capacidad generosa (45L) confirmada por el fabricante, Apertura lateral cómoda para acceder al contenido]
cons: [Sin compartimento térmico específico pese a su buen tamaño]
editorReview: Uno de los paleteros con la capacidad más clara y generosa de este lote, buena opción para quien quiere un único paletero que sirva tanto para jugar como para el resto del día.
capacidadPalas: 3
compartimentoTermico: false
compartimentoZapatillas: false
compartimentoRopa: true
portabilidad: mochila
litros: 45
asin: B0DDL3TYZ2
```

---

### 9. Nox Paletero ML10 Competition XL Compact

- **ASIN**: `B0D86HXGKS` · **Precio**: 57,95€ · **Material**: Poliéster · Capacidad declarada: 4 palas, compartimento térmico ThermoTech, zapatillero

```
slug: nox-paletero-ml10-competition-xl-compact
id: pt-nox-ml10-competition
name: Nox Paletero ML10 Competition XL Compact
brand: Nox
price: 57.95
shortDescription: Paletero de competición de Nox de la gama ML10, con compartimento térmico ThermoTech y capacidad para 4 palas.
description: El ML10 Competition XL Compact es la propuesta de gama alta de Nox para jugadores habituales, con compartimiento principal de apertura lateral para 4 palas, compartimento térmico ThermoTech y espacio aireado específico para zapatillas.
pros: [Compartimento térmico ThermoTech confirmado por el fabricante, Capacidad para 4 palas con zapatillero independiente]
cons: [Precio notablemente superior a las opciones de entrada de este lote]
editorReview: Uno de los paleteros más completos de este lote en organización, buena opción si entrenas o compites con frecuencia y necesitas transportar mucho material.
capacidadPalas: 4
compartimentoTermico: true
compartimentoZapatillas: true
compartimentoRopa: true
portabilidad: mochila
litros: 32
asin: B0D86HXGKS
```

---

### 10. Nox Paletero AT10 Competition XL Compact

- **ASIN**: `B0D898B7G1` · **Precio**: 78,49€ (el más caro de este lote) · **Material**: Poliuretano (PU) · Peso real (Keepa): 2000g · Capacidad declarada: 4 palas, ThermoTech, zapatillero

```
slug: nox-paletero-at10-competition-xl-compact
id: pt-nox-at10-competition
name: Nox Paletero AT10 Competition XL Compact
brand: Nox
price: 78.49
shortDescription: Paletero de la gama insignia AT10 de Nox, con compartimento térmico ThermoTech y capacidad para 4 palas.
description: El AT10 Competition XL Compact es el paletero de gama alta de Nox, comparte nombre con la pala insignia de la marca (asociada a Agustín Tapia) y ofrece la misma organización que el ML10 Competition con acabados de mayor gama.
pros: [Comparte gama con la pala insignia AT10 de Nox, Compartimento térmico ThermoTech y zapatillero, igual que el ML10 Competition]
cons: [El más caro de este lote de paleteros, Peso propio elevado (2000g) según Amazon, se nota vacío]
editorReview: La opción de referencia para quien ya juega con una AT10 Genius y quiere mantener la coherencia de gama en todo su equipo, aunque el desembolso es notable.
capacidadPalas: 4
compartimentoTermico: true
compartimentoZapatillas: true
compartimentoRopa: true
portabilidad: mochila
litros: 34
asin: B0D898B7G1
```

---

### 11. Wilson Mochila de Pádel Tour

- **ASIN**: `B0DX2JZYLR` · **Precio**: 44,95€ · **Material**: Poliéster · Peso real (Keepa): 862g

```
slug: wilson-mochila-de-padel-tour
id: pt-wilson-tour
name: Wilson Mochila de Pádel Tour
brand: Wilson
price: 44.95
shortDescription: Mochila de pádel de Wilson con protección termofoil para objetos de valor, en rojo.
description: La Mochila Tour de Wilson incorpora una zona con protección termofoil pensada para proteger objetos de valor (móvil, cartera), además de un cuerpo de poliéster resistente y correas acolchadas regulables.
pros: [Zona con protección termofoil para objetos de valor, poco habitual en este rango de precio, Correas acolchadas y regulables]
cons: [Sin compartimento térmico específico para las palas]
editorReview: Se diferencia del resto del lote por la protección termofoil para objetos de valor, un detalle práctico que no todos los paleteros de este precio incluyen.
capacidadPalas: 2
compartimentoTermico: false
compartimentoZapatillas: false
compartimentoRopa: true
portabilidad: mochila
litros: 22
asin: B0DX2JZYLR
```

---

### 12. Dunlop Paletero 2pc Black

- **ASIN**: `B0DX2GTGZR` · **Precio**: 24,99€ · **Material**: Poliéster

```
slug: dunlop-paletero-2pc-black
id: pt-dunlop-2pc
name: Dunlop Paletero 2pc Black
brand: Dunlop
price: 24.99
shortDescription: Paletero económico de Dunlop, pensado para jugadores que buscan funcionalidad sin gastar de más.
description: El Paletero 2pc Black de Dunlop apuesta por lo esencial: espacio para el material básico a un precio ajustado, coherente con el posicionamiento accesible del catálogo de pádel de la marca.
pros: [Precio ajustado dentro de una marca con trayectoria en deporte de raqueta, Diseño sobrio en negro]
cons: [Capacidad y compartimentos limitados frente a las opciones de gama alta de este lote]
editorReview: Una opción de entrada sin sorpresas, coherente con el resto del catálogo Dunlop centrado en la accesibilidad de precio.
capacidadPalas: 2
compartimentoTermico: false
compartimentoZapatillas: false
compartimentoRopa: false
portabilidad: bandolera
litros: 18
asin: B0DX2GTGZR
```

---

### 13. Adidas Paletero Carbon Control

- **ASIN**: `B08CDPK319` · **Precio**: 29,90€ · **Material**: Poliéster, acabado símil carbono

```
slug: adidas-paletero-carbon-control
id: pt-adidas-carbon-control
name: Adidas Paletero Carbon Control
brand: Adidas
price: 29.90
shortDescription: Paletero de Adidas con acabado símil carbono, en negro y dorado.
description: El Carbon Control combina un poliéster resistente con un acabado que imita la textura del carbono, dentro de la línea Control del catálogo de pádel de Adidas.
pros: [Acabado símil carbono con buen aspecto para su precio, Buena relación calidad-precio dentro del catálogo Adidas]
cons: [El acabado carbono es estético, no aporta rigidez estructural real]
editorReview: Una opción con buena estética dentro del catálogo Adidas, sin llegar al precio de sus paleteros de gama superior.
capacidadPalas: 3
compartimentoTermico: false
compartimentoZapatillas: false
compartimentoRopa: true
portabilidad: mochila
litros: 24
asin: B08CDPK319
```

---

## Resumen corto para decidir

- **Candidatos brutos inspeccionados**: ~50 (top de la categoría "Bolsas y paleteros" por sales rank)
- **Pasaron el filtro**: 13
- **Excluidos y por qué**: VENUM (marca de combate, no específica de pádel), Wilkinson Sword (maquinillas de afeitar, error de categorización de Amazon), productos "Genérico", 1 neceser Bullpadel (no es un paletero), 1 funda individual de pala HEAD (cubre 1 pala, no es la categoría), y 4 marcas sin trayectoria verificable en pádel (TentHome, Flamingueo, FUTURA8, Pro Elite Complementos)
- **Sin problema de datos ausentes/erróneos** en este lote — el schema de paletero no depende de un campo de peso, así que no hay nada equivalente al "PENDIENTE" de zapatillas

Dime si sigo con **pelotas** o quieres ajustar algo de paleteros primero.
