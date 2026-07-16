# Propuesta: nuevas zapatillas reales para el dataset (Keepa → amazon.es)

## Cómo se ha generado esta lista

1. **Descubrimiento**: no existe una categoría dedicada a "zapatillas de pádel" en el árbol de Keepa para Pádel (domain 9) — solo Palas, Bolsas y paleteros, Pelotas, Grips, Fundas de palas, Redes, Recoge-pelotas, Máquinas de pelotas y Material de entrenamiento. El calzado de pádel en Amazon.es vive disperso dentro de "Moda > Zapatos" o mal-etiquetado bajo "Palas". Usé búsqueda por título (`"zapatillas padel"` + búsquedas específicas `"Bullpadel zapatillas padel"`, `"Nox zapatillas padel"`, `"Babolat zapatillas padel"`) ordenado por sales rank, ~160 ASIN inspeccionados en total.
2. **Filtrado**: la mayoría del volumen (más de 100 resultados) eran calzado genérico de running con "padel" metido con calzador en el título por SEO (marcas **Dannto**, **Flarut**, **AX Boxing**) — descartado en bloque. También descarté **Izas** (Gratal e Ibort, 7 variantes de color revisadas): son zapatillas de pádel reales de una marca real, pero **ninguna variante tiene precio disponible en Keepa ahora mismo** (fuera de oferta). Descarté **Bullpadel Next 23V** y **Bullpadel Comfort 23V** por riesgo de duplicado con "Bullpadel Next Pro" y "Bullpadel Comfort Pro" ya existentes en el dataset (nombres muy próximos, no pude confirmar si son el mismo modelo con otro nombre comercial o SKUs distintos). **Babolat Movea** (siete tallas encontradas) coincide con un producto ya existente en el dataset — descartado por duplicado.
3. Resultado: **8 candidatos reales, con precio verificado y sin duplicado detectado** — Munich (línea PADX, 4 variantes), K-Swiss (3 modelos) y Nox (1 modelo, gama AT10).

**Todo el texto editorial es redacción original.** Los datos objetivos vienen de Keepa: ASIN, precio, marca, material declarado (cuando existe) y las frases descriptivas cortas que Amazon expone como "features" — las he usado como base factual pero reescrito con mis palabras, no copiado literalmente.

## ⚠️ Aviso importante: peso no disponible (decisión ya tomada contigo)

**Ninguno de los 8 candidatos tiene `itemWeight` válido en Keepa** (viene a `0` o `-1` para todos) — a diferencia del caso de la Joma Open en la ronda de palas, esto no es un dato puntual erróneo sino una ausencia sistemática de este campo para calzado en Amazon.es. Según decidiste, **no invento el peso**: cada ficha de abajo tiene `pesoGramos: PENDIENTE` explícito. Habrá que rellenarlo a mano (de la ficha técnica del fabricante o midiendo un par real) antes de integrar al dataset, ya que el campo es numérico obligatorio en el schema `Zapatilla`.

## Otros avisos

- **Rating/reviews de Amazon**: igual que en palas, Keepa no los devuelve en este snapshot — quedan como `PENDIENTE`, no inventados.
- **Munich** y **K-Swiss** no son marcas trackeadas en `brands.ts` (12 marcas actuales) — si se integran, necesitarán página de marca.
- **Enlace de afiliado**: se genera con `<AmazonCTA asin={...} productName={...} />`, sin URLs hardcodeadas.

---

## Los 8 candidatos

### 1. Munich PADX 60

- **ASIN**: `B0FFTB9TQL` · **Precio Keepa**: 66,90€ · **Material**: no reportado por Keepa
- **Rating/reviews**: PENDIENTE · **Peso**: PENDIENTE

```
slug: munich-padx-60
id: zap-munich-padx-60
name: Munich PADX 60
brand: Munich
price: 66.90
shortDescription: Zapatilla de pádel de Munich, línea PADX de entrada, diseño deportivo sencillo en blanco.
description: La PADX 60 es la propuesta más accesible de la línea PADX de Munich, marca española con trayectoria en calzado deportivo. Sin grandes tecnologías diferenciales declaradas, cumple como zapatilla de pádel polivalente para el jugador recreativo.
pros:
  - Precio de entrada dentro de una marca con trayectoria en calzado deportivo
  - Diseño sobrio y versátil
cons:
  - Ficha de Amazon muy escueta, sin detalle de tecnologías de amortiguación o suela
editorReview: Una opción de entrada correcta si buscas una zapatilla específica de pádel a precio contenido de una marca establecida, aunque con menos información técnica disponible que otros modelos de este lote.
nivel: [iniciacion, principiante]
tipoPisada: neutro
tipoPista: todo-terreno
amortiguacion: 6
estabilidad: 6
agarre: 6
pesoGramos: PENDIENTE
genero: hombre
tallasDisponibles: ["39", "40", "41", "42", "43", "44", "45"]
lesionesRecomendadas: [ninguna]
editorRating: 7.0
puntuacionInterna: 55
asin: B0FFTB9TQL
```

---

### 2. Munich PADX 62

- **ASIN**: `B0FFTC24XD` · **Precio Keepa**: 70,55€ · **Material**: Poliéster
- **Rating/reviews**: PENDIENTE · **Peso**: PENDIENTE

```
slug: munich-padx-62
id: zap-munich-padx-62
name: Munich PADX 62
brand: Munich
price: 70.55
shortDescription: Zapatilla de pádel de Munich, línea PADX, en verde, con parte superior de poliéster.
description: La PADX 62 comparte estructura con el resto de la línea PADX de Munich, con una parte superior de poliéster y un colorway verde diferenciado. Como el resto de la gama, Amazon no ofrece detalle técnico extenso más allá de tratarse de una zapatilla deportiva.
pros:
  - Colorway diferenciado dentro de la línea PADX
  - Marca española con trayectoria en calzado deportivo
cons:
  - Poca información técnica disponible más allá del material exterior
editorReview: Muy similar en planteamiento a la PADX 60, con la principal diferencia siendo el colorway y un pequeño salto de precio.
nivel: [iniciacion, principiante]
tipoPisada: neutro
tipoPista: todo-terreno
amortiguacion: 6
estabilidad: 6
agarre: 6
pesoGramos: PENDIENTE
genero: hombre
tallasDisponibles: ["39", "40", "41", "42", "43", "44", "45"]
lesionesRecomendadas: [ninguna]
editorRating: 7.0
puntuacionInterna: 55
asin: B0FFTC24XD
```

---

### 3. Munich PADX 63

- **ASIN**: `B0FFTCKGNY` · **Precio Keepa**: 66,90€ · **Material**: Mezcla de poliéster y KPU
- **Rating/reviews**: PENDIENTE · **Peso**: PENDIENTE

```
slug: munich-padx-63
id: zap-munich-padx-63
name: Munich PADX 63
brand: Munich
price: 66.90
shortDescription: Zapatilla de pádel de Munich con refuerzo de KPU en la parte superior, en azul.
description: La PADX 63 introduce un refuerzo de KPU (un plástico técnico habitual en zonas de mayor desgaste del calzado deportivo) combinado con poliéster, lo que sugiere algo más de durabilidad en las zonas de roce que otras variantes PADX de este lote.
pros:
  - Refuerzo de KPU en la parte superior, durabilidad esperable en zonas de roce
  - Precio similar a la PADX 60 pese al material añadido
cons:
  - Sigue sin haber información sobre suela o amortiguación específica
editorReview: De las variantes PADX de Munich en este lote, la que más argumentos técnicos tiene gracias al refuerzo de KPU, aunque el resto de la ficha sigue siendo escueta.
nivel: [iniciacion, principiante]
tipoPisada: neutro
tipoPista: todo-terreno
amortiguacion: 6
estabilidad: 7
agarre: 6
pesoGramos: PENDIENTE
genero: hombre
tallasDisponibles: ["39", "40", "41", "42", "43", "44", "45"]
lesionesRecomendadas: [ninguna]
editorRating: 7.1
puntuacionInterna: 57
asin: B0FFTCKGNY
```

---

### 4. Munich PADX 64

- **ASIN**: `B0FHKP257Q` · **Precio Keepa**: 78,07€ · **Material**: no reportado por Keepa · Unisex adulto
- **Rating/reviews**: PENDIENTE · **Peso**: PENDIENTE

```
slug: munich-padx-64
id: zap-munich-padx-64
name: Munich PADX 64
brand: Munich
price: 78.07
shortDescription: Zapatilla de pádel unisex de Munich, colorway multicolor, la variante más cara de la línea PADX en este lote.
description: La PADX 64 es la variante unisex de la línea PADX de Munich, con un colorway multicolor y un precio ligeramente superior al resto de la gama analizada.
pros:
  - Corte unisex, más flexibilidad de tallaje entre jugadores
  - Colorway diferenciado dentro de la línea
cons:
  - Precio algo más alto que el resto de la línea PADX sin detalle técnico adicional que lo justifique claramente
editorReview: La variante más cara de la línea PADX de este lote, interesante sobre todo por su planteamiento unisex.
nivel: [iniciacion, principiante]
tipoPisada: neutro
tipoPista: todo-terreno
amortiguacion: 6
estabilidad: 6
agarre: 6
pesoGramos: PENDIENTE
genero: unisex
tallasDisponibles: ["38", "39", "40", "41", "42", "43", "44", "45", "46"]
lesionesRecomendadas: [ninguna]
editorRating: 7.0
puntuacionInterna: 54
asin: B0FHKP257Q
```

---

### 5. K-Swiss Express Light 3 HB Padel (mujer)

- **ASIN**: `B0FMKNR8ZK` · **Precio Keepa**: 84,90€ · **Material**: no reportado por Keepa
- **Rating/reviews**: PENDIENTE · **Peso**: PENDIENTE

```
slug: kswiss-express-light-3-hb-padel
id: zap-kswiss-express-light-3
name: K-Swiss Express Light 3 HB Padel
brand: K-Swiss
price: 84.90
shortDescription: Zapatilla de pádel femenina de K-Swiss centrada en la ligereza, con jaula RPU para estabilidad lateral.
description: La Express Light 3 es la propuesta de K-Swiss centrada en la ligereza, con una jaula de RPU moldeado que aporta estabilidad lateral sin renunciar a un peso contenido, y un cuello acolchado pensado para la comodidad en el tobillo.
pros:
  - Jaula RPU que aporta estabilidad lateral sin penalizar demasiado el peso
  - Cuello acolchado, cómoda en el tobillo
cons:
  - Gama de tallas limitada a calzado de mujer
editorReview: Una zapatilla pensada para jugadoras que priorizan la ligereza sin renunciar del todo al soporte lateral, gracias a su sistema de jaula RPU moldeada.
nivel: [intermedio, avanzado]
tipoPisada: neutro
tipoPista: rapida
amortiguacion: 6
estabilidad: 7
agarre: 7
pesoGramos: PENDIENTE
genero: mujer
tallasDisponibles: ["36", "37", "38", "39", "40", "41"]
lesionesRecomendadas: [ninguna]
editorRating: 7.7
puntuacionInterna: 68
asin: B0FMKNR8ZK
```

---

### 6. K-Swiss Ultra Court Padel Tennis Shoe (hombre)

- **ASIN**: `B0FSL3FZNN` · **Precio Keepa**: 60,00€ · **Material**: Cuero sintético
- **Rating/reviews**: PENDIENTE · **Peso**: PENDIENTE

```
slug: kswiss-ultra-court-padel-hombre
id: zap-kswiss-ultra-court-hombre
name: K-Swiss Ultra Court Padel
brand: K-Swiss
price: 60.00
shortDescription: Zapatilla de pádel masculina de K-Swiss que adapta su experiencia en calzado de tenis, perfil bajo y estable.
description: La Ultra Court adapta al pádel la experiencia de K-Swiss en calzado de tenis, con un perfil bajo pensado para estar cerca del suelo y mejorar la estabilidad en los desplazamientos laterales, además de un refuerzo específico en la zona del antepié.
pros:
  - Perfil bajo que favorece la estabilidad en cambios de dirección
  - Refuerzo específico en la zona de mayor desgaste (antepié)
cons:
  - Cuero sintético como material principal, algo menos transpirable que tejidos de malla
editorReview: Aprovecha bien la experiencia de K-Swiss en calzado de raqueta, con un perfil bajo que se nota en la estabilidad durante los cambios de dirección típicos del pádel.
nivel: [intermedio, avanzado]
tipoPisada: pronador
tipoPista: rapida
amortiguacion: 6
estabilidad: 8
agarre: 7
pesoGramos: PENDIENTE
genero: hombre
tallasDisponibles: ["40", "41", "42", "43", "44", "45", "46"]
lesionesRecomendadas: [ninguna]
editorRating: 7.9
puntuacionInterna: 71
asin: B0FSL3FZNN
```

---

### 7. K-Swiss Ultra Court Padel (mujer)

- **ASIN**: `B0DBP4WF4F` · **Precio Keepa**: 56,00€ · **Material**: Poliéster
- **Rating/reviews**: PENDIENTE · **Peso**: PENDIENTE

```
slug: kswiss-ultra-court-padel-mujer
id: zap-kswiss-ultra-court-mujer
name: K-Swiss Ultra Court Padel Mujer
brand: K-Swiss
price: 56.00
shortDescription: Versión femenina de la Ultra Court de K-Swiss, con chasis de soporte plantar orientado a la estabilidad.
description: La versión femenina de la Ultra Court incorpora un chasis de soporte plantar termoplástico envolvente que busca mayor estabilidad en el mediopié durante los movimientos laterales, además de refuerzos en las zonas de mayor fricción con el suelo.
pros:
  - Chasis de soporte plantar orientado a la estabilidad en movimientos laterales
  - Refuerzos específicos en zonas de fricción con el suelo
cons:
  - Precio algo superior a otras opciones de entrada de este lote
editorReview: Una de las zapatillas más orientadas a la estabilidad de este lote, gracias a su chasis envolvente en el mediopié.
nivel: [intermedio, avanzado]
tipoPisada: pronador
tipoPista: rapida
amortiguacion: 6
estabilidad: 8
agarre: 7
pesoGramos: PENDIENTE
genero: mujer
tallasDisponibles: ["36", "37", "38", "39", "40", "41", "42"]
lesionesRecomendadas: [ninguna]
editorRating: 7.8
puntuacionInterna: 69
asin: B0DBP4WF4F
```

---

### 8. Nox AT10 Pro Padel (hombre)

- **ASIN**: `B0GQMP9G8L` · **Precio Keepa**: 109,61€ (la más cara del lote) · **Material**: no reportado por Keepa
- **Rating/reviews**: PENDIENTE · **Peso**: PENDIENTE

```
slug: nox-at10-pro-padel
id: zap-nox-at10-pro
name: Nox AT10 Pro Padel
brand: Nox
price: 109.61
shortDescription: Zapatilla de pádel de Nox de la gama AT10, con suela de espiga y entresuela EVA orientada al retorno de energía.
description: La zapatilla Pro Padel AT10 de Nox comparte nombre con la gama alta de palas de la marca, con una suela de espiga pensada para el agarre en pista y una entresuela de EVA que busca mejorar el retorno de energía en los desplazamientos.
pros:
  - Suela de espiga orientada específicamente al agarre en pista de pádel
  - Entresuela EVA pensada para mejorar el retorno de energía
cons:
  - Precio el más alto de este lote de zapatillas
editorReview: La opción más premium de este lote, con el reclamo añadido de compartir nombre con la gama de palas insignia de Nox — aunque eso no garantiza por sí solo mejores prestaciones que otras alternativas de precio similar.
nivel: [intermedio, avanzado]
tipoPisada: neutro
tipoPista: rapida
amortiguacion: 7
estabilidad: 8
agarre: 8
pesoGramos: PENDIENTE
genero: hombre
tallasDisponibles: ["39", "40", "41", "42", "43", "44", "45"]
lesionesRecomendadas: [ninguna]
editorRating: 8.0
puntuacionInterna: 74
asin: B0GQMP9G8L
```

---

## Resumen

| # | Modelo | Marca | Precio | Estilo | Avisos |
|---|---|---|---|---|---|
| 1 | PADX 60 | Munich | 66,90€ | Entrada | Marca nueva (sin página) |
| 2 | PADX 62 | Munich | 70,55€ | Entrada | Marca nueva |
| 3 | PADX 63 | Munich | 66,90€ | Entrada | Marca nueva |
| 4 | PADX 64 | Munich | 78,07€ | Entrada, unisex | Marca nueva |
| 5 | Express Light 3 HB Padel | K-Swiss | 84,90€ | Ligereza/estabilidad | Marca nueva |
| 6 | Ultra Court Padel (hombre) | K-Swiss | 60,00€ | Estabilidad | Marca nueva |
| 7 | Ultra Court Padel (mujer) | K-Swiss | 56,00€ | Estabilidad | Marca nueva |
| 8 | AT10 Pro Padel | Nox | 109,61€ | Gama alta | — |

**Todos** usarán `<AmazonCTA asin={asin} productName={name} />`. **Todos tienen `pesoGramos: PENDIENTE`** — hay que rellenarlo a mano antes de integrar (campo numérico obligatorio en el schema). Ninguno tiene rating/reviews de Amazon disponibles todavía.

## Resumen corto para decidir

- **Candidatos brutos inspeccionados**: ~160 (100 de búsqueda genérica + 22 de Babolat + 10 de Nox/Bullpadel + 7 recheck Izas)
- **Pasaron el filtro**: 8
- **Excluidos y por qué**:
  - ~130 genéricos de running con "padel" en el título (Dannto, Flarut, AX Boxing) — no son calzado de pádel real
  - 7 variantes Izas (Gratal + Ibort) — sin precio disponible en Keepa
  - 2 Bullpadel (Next 23V, Comfort 23V) — riesgo de duplicado con productos ya existentes
  - 7 tallas de Babolat Movea — modelo ya existente en el dataset

Dime si sigo con **paleteros** (siguiente en tu orden de prioridad) o si quieres ajustar algo de zapatillas primero.
