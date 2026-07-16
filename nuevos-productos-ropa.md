# Propuesta: nueva ropa real para el dataset (Keepa → amazon.es)

## Cómo se ha generado esta lista

1. **Descubrimiento**: no hay categoría dedicada de "ropa de pádel" en Keepa (vive dispersa en "Moda"). Las búsquedas genéricas por título (`"camiseta padel"`, `"falda padel"`, `"pantalon padel"`, `"sudadera padel"`) resultaron **la categoría más ruidosa de todas** — dominada por ropa deportiva completamente genérica (running, gimnasio) con "padel" metido en el título por SEO, de marcas irrelevantes (Asioka, TCA, Uwdiohq, GroYolan, "Generic"/"Genérico"). Cambié de estrategia a **búsquedas específicas por marca ya presente en el catálogo** (`"Bullpadel camiseta"`, `"Nox camiseta padel"`, `"Head camiseta padel"`, `"Wilson camiseta padel"`, `"Adidas camiseta padel"`, `"Babolat camiseta padel"`, `"Bullpadel falda"`), que dieron resultados mucho más limpios.
2. **Filtrado**: descarté toda la ropa genérica de la búsqueda amplia inicial. De las búsquedas por marca, deduplicé variantes de talla/color del mismo modelo (Bullpadel EXIMA tenía 6 tallas listadas, me quedé con 1) y descarté los productos **"sin precio"** (varios de Wilson, Head y Nox no tenían oferta activa en este snapshot — incluidas la Nox Camiseta Padel Pro Azul Lima, que además ya está en el dataset).
3. Resultado: **9 candidatos reales**, de Bullpadel (4), Nox (1), Head (1), Adidas (1) y Babolat (1) — mayoría camisetas (7) y 2 faldas; no encontré polos, pantalones ni sudaderas de marca específica de pádel con precio activo en este snapshot.

**Todo el texto editorial es redacción original.**

## Aviso de calidad de datos

- **Camiseta Bullpadel BISAS 813**: Keepa reporta `material: "Balsa"` — la balsa es un tipo de madera, no un material textil, claramente un error de mapeo de datos en la ficha de Amazon. **No he usado ese dato en la descripción**, la he redactado sin afirmar un material concreto en vez de repetir el error.

## Otros avisos

- **Rating/reviews de Amazon**: no disponibles en este snapshot, quedan `PENDIENTE`.
- **Marcas nuevas de esta categoría**: ninguna — las 5 marcas de este lote (Bullpadel, Nox, Head, Adidas, Babolat) ya están en `brands.ts`.
- **Hueco de variedad**: no hay polos, pantalones ni sudaderas en este lote (solo camisetas y faldas) — si quieres, puedo hacer una segunda pasada más adelante específicamente para esos tipos de prenda si el hueco te parece relevante.
- **Enlace de afiliado**: `<AmazonCTA asin={...} productName={...} />`, sin URLs hardcodeadas.

---

## Los 9 candidatos

### 1. Bullpadel Camiseta EXIMA

- **ASIN**: `B0B5XLNHQ6` · **Precio**: 19,80€ · **Material**: Poliéster · Mujer

```
slug: bullpadel-camiseta-exima
id: ro-bullpadel-exima
name: Bullpadel Camiseta EXIMA
brand: Bullpadel
price: 19.80
shortDescription: Camiseta técnica de Bullpadel para mujer, en azul marino, tejido de poliéster.
description: La EXIMA es una camiseta técnica de la línea femenina de Bullpadel, pensada para el juego con un tejido de poliéster que prioriza la comodidad durante el partido.
pros: [Precio accesible dentro del catálogo Bullpadel, Tejido de poliéster técnico]
cons: [Ficha de Amazon escueta más allá del material y el color]
editorReview: Una camiseta técnica sin sorpresas dentro de la línea femenina de Bullpadel, correcta para el uso semanal en pista.
faqs: []
asin: B0B5XLNHQ6
tipo: camiseta
genero: mujer
tallasDisponibles: [S, M, L, XL]
transpirabilidad: 7
puntuacionInterna: 58
```

---

### 2. Bullpadel Camiseta BISAS 813 ⚠️ dato de material poco fiable

- **ASIN**: `B0CLVRH2D6` · **Precio**: 14,90€ (la más barata del lote)

```
slug: bullpadel-camiseta-bisas-813
id: ro-bullpadel-bisas-813
name: Bullpadel Camiseta BISAS 813
brand: Bullpadel
price: 14.90
shortDescription: Camiseta de Bullpadel de la línea BISAS, en color eucalipto, la opción más económica del catálogo.
description: La BISAS 813 es la opción más ajustada de precio de este lote de camisetas Bullpadel — la ficha de Amazon no aporta apenas detalle técnico adicional más allá del modelo y el color.
pros: [El precio más bajo de este lote de camisetas, Colorway diferenciado (eucalipto)]
cons: [Ficha de Amazon muy escueta, el dato de material que reporta Keepa no es fiable y no se ha usado]
editorReview: Una opción de entrada dentro del catálogo Bullpadel, aunque con menos respaldo de información técnica que el resto de camisetas de este lote.
faqs: []
asin: B0CLVRH2D6
tipo: camiseta
genero: unisex
tallasDisponibles: [S, M, L, XL, XXL]
transpirabilidad: 6
puntuacionInterna: 50
```

---

### 3. Bullpadel Camiseta Edrar Gemma Triay

- **ASIN**: `B0DB6ZMY5V` · **Precio**: 38,04€ · Camiseta oficial de jugadora profesional

```
slug: bullpadel-camiseta-edrar-gemma-triay
id: ro-bullpadel-edrar-triay
name: Bullpadel Camiseta Edrar Gemma Triay
brand: Bullpadel
price: 38.04
shortDescription: Camiseta oficial de Gemma Triay para Premier Padel, diseñada combinando estilo y funcionalidad.
description: La Edrar es la camiseta oficial de Gemma Triay para el circuito Premier Padel, con un diseño pensado para combinar estética de competición con la funcionalidad de una prenda técnica de juego.
pros: [Vinculada a una jugadora de primer nivel del circuito profesional, Diseño de competición diferenciado]
cons: [La más cara de las camisetas de este lote]
editorReview: La opción con más gancho de marca de todo este lote gracias al vínculo directo con Gemma Triay, aunque a un precio notablemente superior al resto de camisetas Bullpadel.
faqs: []
asin: B0DB6ZMY5V
tipo: camiseta
genero: mujer
tallasDisponibles: [S, M, L, XL]
transpirabilidad: 8
puntuacionInterna: 70
```

---

### 4. Nox Camiseta AT10 Agustín Tapia 2026

- **ASIN**: `B0GS8YJPRP` · **Precio**: 58,41€ (la más cara de todo el lote) · **Material**: Poliéster/Elastano

```
slug: nox-camiseta-at10-agustin-tapia-2026
id: ro-nox-at10-tapia
name: Nox Camiseta AT10 Agustín Tapia 2026
brand: Nox
price: 58.41
shortDescription: Camiseta oficial de Agustín Tapia de la gama AT10 de Nox, la misma gama que la pala insignia de la marca.
description: La camiseta AT10 2026 está vinculada a Agustín Tapia, el jugador insignia de Nox, y comparte gama con la pala AT10 Genius ya presente en el catálogo — un tejido de poliéster y elastano pensado para el juego de competición.
pros: [Vinculada directamente al jugador número 1 de Nox, coherencia total con la pala AT10 Genius del catálogo, Tejido técnico de poliéster y elastano]
cons: [La prenda más cara de todo este lote de ropa]
editorReview: La opción con más identidad de marca de todo este lote — para quien ya juega con la AT10 Genius y quiere completar el equipo con la camiseta del mismo jugador insignia.
faqs: []
asin: B0GS8YJPRP
tipo: camiseta
genero: hombre
tallasDisponibles: [S, M, L, XL, XXL]
transpirabilidad: 8
puntuacionInterna: 74
```

---

### 5. HEAD Camiseta We Are Padel

- **ASIN**: `B0BW5VRTRJ` · **Precio**: 22,80€ · **Material**: Algodón y poliéster

```
slug: head-camiseta-we-are-padel
id: ro-head-we-are-padel
name: HEAD Camiseta We Are Padel
brand: Head
price: 22.80
shortDescription: Camiseta de Head con cuello de canalé y mezcla técnica de algodón y poliéster, estampado frontal.
description: La We Are Padel de Head combina algodón y poliéster para una buena absorción de la humedad, con cuello redondo de canalé y un estampado frontal característico de la línea.
pros: [Mezcla técnica pensada específicamente para absorción de humedad, Cuello de canalé, acabado más cuidado que una camiseta básica]
cons: [Menos orientada a competición pura que otras opciones de este lote]
editorReview: Un buen punto intermedio entre camiseta técnica y prenda de calle dentro del catálogo Head, gracias a su mezcla de algodón y poliéster.
faqs: []
asin: B0BW5VRTRJ
tipo: camiseta
genero: hombre
tallasDisponibles: [S, M, L, XL, XXL]
transpirabilidad: 7
puntuacionInterna: 62
```

---

### 6. adidas Camiseta Estampado Padel Zone

- **ASIN**: `B0FHZ6CFXC` · **Precio**: 38,95€

```
slug: adidas-camiseta-estampado-padel-zone
id: ro-adidas-padel-zone
name: adidas Camiseta Estampado Padel Zone
brand: Adidas
price: 38.95
shortDescription: Camiseta de Adidas con estampado de la línea Padel Zone, diseñada para confort y calidad en pista.
description: La Padel Zone es la propuesta de Adidas con estampado propio de la línea, pensada según el fabricante para ofrecer confort y calidad durante el juego.
pros: [Estampado diferenciado de la línea Padel Zone, Marca de gran reconocimiento]
cons: [Ficha de Amazon escueta en detalles técnicos de tejido]
editorReview: Una opción con buena identidad visual dentro del catálogo Adidas, aunque con poco detalle técnico adicional en su ficha de Amazon.
faqs: []
asin: B0FHZ6CFXC
tipo: camiseta
genero: hombre
tallasDisponibles: [S, M, L, XL, XXL]
transpirabilidad: 7
puntuacionInterna: 63
```

---

### 7. Babolat Camiseta Padel Men

- **ASIN**: `B09RN8ZSBW` · **Precio**: 39,90€ · **Material**: Algodón

```
slug: babolat-camiseta-padel-men
id: ro-babolat-camiseta-men
name: Babolat Camiseta Padel Men
brand: Babolat
price: 39.90
shortDescription: Camiseta de algodón de Babolat para hombre, en blanco.
description: La Camiseta Padel Men de Babolat apuesta por el algodón como material principal, una opción algo distinta a las mezclas técnicas de poliéster habituales en el resto de este lote.
pros: [Algodón 100%, tacto más natural que los tejidos técnicos sintéticos, Diseño sobrio en blanco]
cons: [El algodón retiene más la humedad que una mezcla técnica de poliéster durante el ejercicio intenso]
editorReview: Una opción distinta dentro de este lote por priorizar el algodón sobre las mezclas técnicas, más orientada a la comodidad de tacto que al rendimiento puro en sudoración.
faqs: []
asin: B09RN8ZSBW
tipo: camiseta
genero: hombre
tallasDisponibles: [S, M, L, XL]
transpirabilidad: 5
puntuacionInterna: 55
```

---

### 8. Bullpadel Falda EUKEN 005

- **ASIN**: `B08WJ5KZ95` · **Precio**: 20,00€ · **Material**: Sintético

```
slug: bullpadel-falda-euken-005
id: ro-bullpadel-euken-005
name: Bullpadel Falda EUKEN 005
brand: Bullpadel
price: 20.00
shortDescription: Falda de Bullpadel con malla interior para reforzar la comodidad y la libertad de movimientos.
description: La EUKEN 005 de Bullpadel incorpora una malla interior pensada para reforzar la comodidad y favorecer la libertad de movimientos durante el partido.
pros: [Malla interior específica para libertad de movimientos, Pensada para alto rendimiento en pista]
cons: [Solo disponible en negro según la ficha revisada]
editorReview: Una falda técnica sin complicaciones dentro del catálogo Bullpadel, con la malla interior como principal argumento diferencial.
faqs: []
asin: B08WJ5KZ95
tipo: falda
genero: mujer
tallasDisponibles: [XS, S, M, L]
transpirabilidad: 7
puntuacionInterna: 60
```

---

### 9. Bullpadel Falda Básica Dalia Mujer

- **ASIN**: `B0F4NSKWLB` · **Precio**: 14,90€ (la más barata de las faldas)

```
slug: bullpadel-falda-basica-dalia
id: ro-bullpadel-dalia
name: Bullpadel Falda Básica Dalia Mujer
brand: Bullpadel
price: 14.90
shortDescription: Falda básica de Bullpadel en poliéster y elastano, la opción más económica de faldas de este lote.
description: La Dalia es la falda de entrada de Bullpadel, elaborada con poliéster y elastano según el propio fabricante, pensada como opción básica sin complicaciones.
pros: [El precio más bajo de las faldas de este lote, Poliéster y elastano confirmado por el fabricante]
cons: [Menos prestaciones declaradas que la EUKEN 005 de la misma marca]
editorReview: La opción de entrada lógica si solo buscas una falda técnica básica de Bullpadel sin gastar de más.
faqs: []
asin: B0F4NSKWLB
tipo: falda
genero: mujer
tallasDisponibles: [XS, S, M, L, XL]
transpirabilidad: 6
puntuacionInterna: 52
```

---

## Resumen corto para decidir

- **Candidatos brutos inspeccionados**: ~100 (búsqueda genérica muy ruidosa) + ~40 (búsquedas específicas por marca)
- **Pasaron el filtro**: 9
- **Excluidos y por qué**: la práctica totalidad de la búsqueda genérica inicial (ropa deportiva sin relación real con pádel, SEO-stuffed), varias tallas/colores duplicados de los mismos modelos, productos sin precio activo (varios Wilson, Head, Nox — incluida la Nox Camiseta Padel Pro que ya está en el dataset)
- **Aviso de calidad de datos**: 1 material poco fiable (Bullpadel BISAS 813, Keepa dice "Balsa") no usado en la redacción
- **Hueco detectado**: sin polos, pantalones ni sudaderas de marca específica con precio en este snapshot — avísame si quieres que haga una segunda pasada dirigida a esos tipos de prenda

Dime si sigo con **accesorios** (última categoría) o quieres ajustar algo de ropa primero.
