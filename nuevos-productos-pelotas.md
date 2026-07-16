# Propuesta: nuevas pelotas reales para el dataset (Keepa → amazon.es)

## Cómo se ha generado esta lista

1. **Descubrimiento**: categoría dedicada de Keepa "Pelotas" (catId `2928993031`, 1066 productos), domain 9 = amazon.es, ordenado por sales rank.
2. **Filtrado**: descarté un volumen considerable de **pelotas de pickleball** (Selkirk Sport, JOOLA, OZO, Franklin Sports — deporte distinto, aunque Amazon las mete en la misma categoría), **presurizadores/accesorios** (Ball Rescuer, TUBOPLUS — no son pelotas), pelotas de **frontenis** (HEAD Frontenis, otro deporte), pelotas **personalizadas con texto** (Price of Bath, producto novedad/regalo) y **cajones a granel** (24-72 botes, Bullpadel/Dunlop/Palbea — formato distinto al "bote" individual que usa el resto del dataset). También descarté 2 marcas de fiabilidad dudosa para mantener el nivel del catálogo (LAPAT, Dyvonics).
3. **Duplicado exacto detectado**: el ASIN `B0D4HWPBPL` ("Wilson Premier Padel 3 Ball Can", 4,99€) apareció de nuevo en esta búsqueda — es el **mismo ASIN** que ya tienes en el dataset como `wilson-premier-pelotas-de-padel`. Descartado sin más.
4. Resultado: **12 candidatos reales**, de HEAD, Wilson, Dunlop, Babolat, Nox, VIBOR-A, Raquex y ZRZ — todos con precio verificado.

**Todo el texto editorial es redacción original.**

## Nota sobre datos ausentes

El schema `Pelota` no incluye peso (usa `uso`, `velocidad`, `duracion`, `superficieRecomendada`, `unidadesPorBote`), así que **no hay ningún campo con el problema "PENDIENTE"** de la ronda de zapatillas. `unidadesPorBote` se ha tomado directamente del título cuando el fabricante lo especifica (3 o 4 unidades) — es un dato objetivo, no una estimación.

## Un aviso de fiabilidad de datos

- **ZRZ Pelota de Padel Fip Next**: el título dice "ZRZ" pero uno de los `features` que devuelve Keepa dice literalmente "Pelotas de Padel Bullpadel" — probablemente un listado de reseller/reempaquetado que mezcla texto de otro fabricante en su ficha. Lo incluyo porque el precio y el resto de la ficha son consistentes y plausibles, pero **marca la fuente como poco fiable** — revisa la ficha real en Amazon antes de publicar, por si prefieres excluirla.
- **Raquex, VIBOR-A y ZRZ** no son marcas trackeadas en `brands.ts` — necesitarán página de marca si se integran (Raquex y VIBOR-A son marcas reales establecidas en deporte de raqueta; ZRZ es menos reconocible, ligado al aviso anterior).

## Otros avisos

- **Rating/reviews de Amazon**: no disponibles en este snapshot, quedan `PENDIENTE`.
- **Enlace de afiliado**: `<AmazonCTA asin={...} productName={...} />`, sin URLs hardcodeadas.

---

## Los 12 candidatos

### 1. HEAD Tube 3 Padel Balls

- **ASIN**: `B076TGJ7JZ` · **Precio**: 4,40€ (la más barata del lote)

```
slug: head-tube-3-padel-balls
id: pel-head-tube-3
name: HEAD Tube 3 Padel Balls
brand: Head
price: 4.40
shortDescription: Pelota de entrada de Head, homologada por la Federación Española de Pádel.
description: El Tube 3 es la opción más económica del catálogo Head en este lote, con la homologación de la Federación Española de Pádel como aval de calidad básica y duración.
pros: [Precio muy competitivo, Homologada por la Federación Española de Pádel]
cons: [Gama de entrada, no pensada específicamente para competición de alto nivel]
editorReview: La opción más económica de Head en este lote, correcta para entrenamientos frecuentes sin gastar de más.
uso: entrenamiento
velocidad: media
duracion: 6
superficieRecomendada: ambas
unidadesPorBote: 3
asin: B076TGJ7JZ
```

---

### 2. HEAD Padel One

- **ASIN**: `B0CQTVX76N` · **Precio**: 4,40€

```
slug: head-padel-one
id: pel-head-padel-one
name: HEAD Padel One
brand: Head
price: 4.40
shortDescription: Pelota de Head de la línea "One", orientada a rapidez y control según el fabricante.
description: La Padel One comparte precio con el Tube 3 dentro del catálogo Head, con un enfoque declarado hacia la rapidez y el control del juego.
pros: [Precio muy competitivo, Enfoque declarado en rapidez y control]
cons: [Ficha de Amazon escueta en detalles técnicos objetivos]
editorReview: Una alternativa directa al Tube 3 dentro de la gama de entrada de Head, sin diferencias de precio relevantes.
uso: entrenamiento
velocidad: media
duracion: 6
superficieRecomendada: ambas
unidadesPorBote: 3
asin: B0CQTVX76N
```

---

### 3. Wilson Padel Rush 100

- **ASIN**: `B00X7C04YK` · **Precio**: 5,95€

```
slug: wilson-padel-rush-100
id: pel-wilson-rush-100
name: Wilson Padel Rush 100
brand: Wilson
price: 5.95
shortDescription: Pelota de Wilson pensada para superficies artificiales, con tecnología Duraweave para mayor durabilidad.
description: La Rush 100 usa la tecnología Duraweave de Wilson para absorber menos humedad y tierra del suelo, con una presión algo menor que una pelota de tenis convencional para un juego más rápido en superficies artificiales.
pros: [Tecnología Duraweave, absorbe menos humedad y tierra, Pensada específicamente para superficies artificiales]
cons: [No es la opción homologada para competición de este lote]
editorReview: Una opción sólida para entrenar en pistas de césped artificial, gracias al tratamiento Duraweave que retrasa el desgaste habitual por tierra y humedad.
uso: entrenamiento
velocidad: rapida
duracion: 7
superficieRecomendada: exterior
unidadesPorBote: 3
asin: B00X7C04YK
```

---

### 4. Wilson Premier Padel Speed 3 Ball Can

- **ASIN**: `B0D4LXM7Q2` · **Precio**: 8,80€

```
slug: wilson-premier-padel-speed-3-ball-can
id: pel-wilson-premier-speed
name: Wilson Premier Padel Speed 3 Ball Can
brand: Wilson
price: 8.80
shortDescription: Variante "Speed" de la gama Premier Padel de Wilson, oficial del circuito Premier Padel.
description: La variante Speed de la gama Premier Padel de Wilson (distinta del bote estándar Premier Padel ya presente en el catálogo) está vinculada a la marca oficial del circuito Premier Padel.
pros: [Vinculada a la marca oficial del circuito Premier Padel, Gama superior a la Premier Padel estándar de Wilson]
cons: [Precio casi el doble que el bote estándar Premier Padel de la misma marca]
editorReview: La opción de Wilson más orientada a competición de este lote, con el respaldo de ser la pelota oficial del circuito Premier Padel.
uso: competicion
velocidad: rapida
duracion: 8
superficieRecomendada: ambas
unidadesPorBote: 3
asin: B0D4LXM7Q2
```

---

### 5. Dunlop Pro Padel

- **ASIN**: `B0CKY23K4Q` · **Precio**: 7,99€

```
slug: dunlop-pro-padel
id: pel-dunlop-pro
name: Dunlop Pro Padel
brand: Dunlop
price: 7.99
shortDescription: Pelota de Dunlop orientada al rendimiento y la durabilidad en pista.
description: La Pro Padel es la propuesta de gama alta de Dunlop en pelotas, diseñada para jugadores que priorizan el rendimiento y la durabilidad frente a otras opciones más económicas de la marca.
pros: [Orientada específicamente a rendimiento y durabilidad, Buena opción dentro del catálogo Dunlop]
cons: [Precio superior a la Dunlop Team de la misma marca]
editorReview: La opción de gama alta de Dunlop en este lote, recomendable para quien ya conoce la marca y busca un paso más en calidad.
uso: competicion
velocidad: media
duracion: 8
superficieRecomendada: ambas
unidadesPorBote: 3
asin: B0CKY23K4Q
```

---

### 6. Dunlop Team Padel

- **ASIN**: `B0D3DT1Q7H` · **Precio**: 8,80€

```
slug: dunlop-team-padel
id: pel-dunlop-team
name: Dunlop Team Padel
brand: Dunlop
price: 8.80
shortDescription: Pelota de Dunlop pensada para entrenamientos y juego recreativo.
description: La Team Padel es la opción de Dunlop pensada para entrenamientos frecuentes y partidos recreativos, con un enfoque más generalista que la Pro Padel de la misma marca.
pros: [Buena para entrenamientos frecuentes, Marca con trayectoria en deporte de raqueta]
cons: [No homologada específicamente para competición como la Pro Padel]
editorReview: El complemento lógico de la Pro Padel dentro del catálogo Dunlop, para el día a día de entrenamiento.
uso: entrenamiento
velocidad: media
duracion: 7
superficieRecomendada: ambas
unidadesPorBote: 3
asin: B0D3DT1Q7H
```

---

### 7. Babolat Court Padel X3

- **ASIN**: `B093QJM7MV` · **Precio**: 6,94€

```
slug: babolat-court-padel-x3
id: pel-babolat-court
name: Babolat Court Padel X3
brand: Babolat
price: 6.94
shortDescription: Pelota de Babolat con presión pensada para un rebote óptimo.
description: La Court Padel X3 es una alternativa dentro del catálogo Babolat a la ya existente Padel VS, con un enfoque en la presión óptima para el rebote y la mejora del juego.
pros: [Precio competitivo dentro del catálogo Babolat, Presión pensada para un rebote consistente]
cons: [Ficha de Amazon escueta en detalles técnicos adicionales]
editorReview: Una alternativa más económica a la Babolat Padel VS ya presente en el catálogo, correcta para uso recreativo.
uso: ambas
velocidad: media
duracion: 7
superficieRecomendada: ambas
unidadesPorBote: 3
asin: B093QJM7MV
```

---

### 8. Nox Bote Bolas NERBO

- **ASIN**: `B0DWDMWYBV` · **Precio**: 7,80€

```
slug: nox-bote-bolas-nerbo
id: pel-nox-nerbo
name: Nox Bote Bolas NERBO
brand: Nox
price: 7.80
shortDescription: Pelota de Nox de la línea NERBO, alternativa a la Nox Pro ya presente en el catálogo.
description: El bote NERBO es una opción dentro del catálogo Nox distinta a la ya existente Nox Pro, sin grandes detalles técnicos adicionales reportados por el fabricante en Amazon.
pros: [Precio competitivo dentro del catálogo Nox, Alternativa a la gama Pro de la misma marca]
cons: [Ficha de Amazon muy escueta en detalles técnicos]
editorReview: Una alternativa más dentro del catálogo Nox, sin diferencias claras respecto a la Nox Pro salvo el nombre de línea.
uso: ambas
velocidad: media
duracion: 7
superficieRecomendada: ambas
unidadesPorBote: 3
asin: B0DWDMWYBV
```

---

### 9. Nox Pro Titanium

- **ASIN**: `B07NRKT989` · **Precio**: 11,26€ (la más cara del lote, 4 unidades)

```
slug: nox-pro-titanium
id: pel-nox-pro-titanium
name: Nox Pro Titanium
brand: Nox
price: 11.26
shortDescription: Pelota de gama alta de Nox, apta para competición profesional, en formato de 4 unidades.
description: La Pro Titanium es la opción de gama alta de Nox en este lote, declarada apta para competición profesional, y se vende en formato de 4 unidades en vez de las 3 habituales.
pros: [Apta para competición profesional según el fabricante, Formato de 4 unidades, una bola extra frente al formato habitual]
cons: [La más cara de este lote de pelotas]
editorReview: La opción más premium del catálogo Nox en este lote, con el aliciente de venir en formato de 4 pelotas en vez de las 3 habituales.
uso: competicion
velocidad: rapida
duracion: 8
superficieRecomendada: ambas
unidadesPorBote: 4
asin: B07NRKT989
```

---

### 10. VIBOR-A Elite Team

- **ASIN**: `B09RZXT44S` · **Precio**: 7,80€

```
slug: vibor-a-elite-team
id: pel-vibora-elite-team
name: VIBOR-A Elite Team
brand: VIBOR-A
price: 7.80
shortDescription: Pelota de VIBOR-A, marca española de pádel, con foco declarado en precisión y durabilidad.
description: La Elite Team de VIBOR-A es la incorporación de esta marca española al catálogo, con un enfoque declarado en precisión y durabilidad en cualquier superficie.
pros: [Marca española especializada en pádel, Precio competitivo]
cons: [Marca nueva en el catálogo, sin trayectoria previa en el dataset]
editorReview: Una incorporación interesante para dar más variedad de marcas al catálogo de pelotas, con buen posicionamiento de precio.
uso: ambas
velocidad: media
duracion: 7
superficieRecomendada: ambas
unidadesPorBote: 3
asin: B09RZXT44S
```

---

### 11. Raquex Elite

- **ASIN**: `B0FX57Q5T9` · **Precio**: 14,99€

```
slug: raquex-elite
id: pel-raquex-elite
name: Raquex Elite
brand: Raquex
price: 14.99
shortDescription: Pelota de Raquex, marca británica de deportes de raqueta, apta para todas las superficies y torneos.
description: La Elite de Raquex es la propuesta de esta marca británica especializada en deportes de raqueta, declarada apta para todas las superficies de pista y para uso en torneos.
pros: [Apta para todas las superficies según el fabricante, Marca con trayectoria en deportes de raqueta]
cons: [La segunda opción más cara de este lote]
editorReview: Una opción de una marca menos conocida en pádel específicamente pero con trayectoria en deportes de raqueta en general.
uso: competicion
velocidad: media
duracion: 7
superficieRecomendada: ambas
unidadesPorBote: 3
asin: B0FX57Q5T9
```

---

### 12. ZRZ Pelota de Padel Fip Next ⚠️ ficha con datos poco fiables

- **ASIN**: `B0B234ZPLM` · **Precio**: 16,80€ (pack de 3 botes / 9 bolas)

```
slug: zrz-pelota-padel-fip-next
id: pel-zrz-fip-next
name: ZRZ Pelota de Padel Fip Next
brand: ZRZ
price: 16.80
shortDescription: Pack de 3 botes de pelotas de competición de ZRZ, alta durabilidad según el fabricante.
description: El pack Fip Next de ZRZ incluye 3 botes (9 bolas) de pelotas de competición, vendido como pack completo en vez de bote individual, a un precio por bote más ajustado que comprarlos sueltos.
pros: [Precio por bote más ajustado al comprar el pack de 3, Declarada apta para competición]
cons: [La ficha de Amazon mezcla texto de otro fabricante (Bullpadel) en su descripción — revisar antes de publicar]
editorReview: Un pack interesante por precio si compras varios botes a la vez, aunque la inconsistencia en la ficha de Amazon invita a verificar la fuente antes de darlo por bueno.
uso: competicion
velocidad: media
duracion: 7
superficieRecomendada: ambas
unidadesPorBote: 3
asin: B0B234ZPLM
```

---

## Resumen corto para decidir

- **Candidatos brutos inspeccionados**: ~50 (top de la categoría "Pelotas" por sales rank)
- **Pasaron el filtro**: 12
- **Excluidos y por qué**: pelotas de pickleball (Selkirk, JOOLA, OZO, Franklin Sports — deporte distinto), presurizadores (Ball Rescuer, TUBOPLUS — no son pelotas), pelotas de frontenis (HEAD), pelotas personalizadas de regalo (Price of Bath), cajones a granel de 24-72 botes (formato distinto al del dataset), 2 marcas de fiabilidad dudosa (LAPAT, Dyvonics), y **1 duplicado exacto de ASIN** con un producto ya existente (Wilson Premier Padel 3 Ball Can)
- **Aviso de calidad de datos**: la ficha de ZRZ mezcla texto de Bullpadel en sus features — verificar antes de publicar

Dime si sigo con **overgrips** o quieres ajustar algo de pelotas primero.
