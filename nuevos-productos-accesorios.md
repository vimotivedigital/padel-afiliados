# Propuesta: nuevos accesorios reales para el dataset (Keepa → amazon.es)

## Cómo se ha generado esta lista

1. **Descubrimiento**: sin categoría dedicada en Keepa, igual que ropa/protectores. Búsquedas por título: `"muñequera padel"`, `"gorra padel"`, `"toalla padel"`, `"banda pelo padel"`, `"guantes padel"`.
2. **Filtrado**: esta ha sido, junto con ropa, la categoría con más ruido:
   - **"guantes padel" fue un falso positivo del 100%**: todos los resultados eran guantes de natación, vela o kayak — "padel" en inglés significa "remo/pala de canoa", y Amazon no distingue el idioma al indexar. Ninguno tiene relación con el pádel como deporte de raqueta. Descartado en bloque.
   - **"muñequera padel"**: casi todo son muñequeras genéricas de gimnasio/crossfit (EASYKEENECOM, VertexOval, TPTGIAR, OIXEYA...) con "padel" añadido de forma genérica al final de una lista de deportes. El dataset ya tiene 3 muñequeras de marcas reconocibles (Nox, Adidas, StarVie); no encontré ninguna nueva que aportara algo diferencial en calidad de marca, así que no añadí ninguna esta vez.
   - **"toalla padel"**: casi todo genérico (toallas de gimnasio personalizadas, telas decorativas de "Dorian Home" que ni siquiera son toallas de deporte) excepto **1 hallazgo real**: una toalla oficial de Bullpadel.
   - **"gorra padel"**: marcas genéricas de gorra (Fersora, BLUECHOLON, Babyline) no específicas de pádel — el dataset ya tiene 4 gorras de marcas reconocibles, así que solo añadí 1 con un diferencial claro (bandera de España, estilo popular en tiendas de pádel físicas).
3. Además, **recuperé 2 candidatos que había anotado como "futuro accesorios"** en rondas anteriores (Gladiator Padel de la ronda de overgrips, Spartan Padel de la ronda de protectores) — ambos son grips antivibración combo, un tipo de producto que no encaja como overgrip ni protector tradicional pero sí como accesorio.
4. Resultado: **5 candidatos reales**, más reducido que otras categorías por la baja densidad de resultados genuinamente específicos de pádel.

**Todo el texto editorial es redacción original.**

## Avisos

- **Rating/reviews de Amazon**: no disponibles en este snapshot, quedan `PENDIENTE`.
- **Marcas nuevas de esta categoría**: Gladiator Padel, Spartan Padel, MIBANDERA, Araclinch (Bullpadel ya está en `brands.ts`).
- **Tipo "otro"**: el schema `Accesorio` tiene un tipo `tipo: "otro"` que usa para Gladiator Padel, Spartan Padel y Araclinch, ya que no encajan como muñequera/gorra/toalla/banda de pelo.
- **Enlace de afiliado**: `<AmazonCTA asin={...} productName={...} />`, sin URLs hardcodeadas.

---

## Los 5 candidatos

### 1. Toalla Bullpadel Premier Padel

- **ASIN**: `B0GGJC6NTB` · **Precio**: 17,80€ · Marca ya presente en el catálogo

```
slug: toalla-bullpadel-premier-padel
id: ac-bullpadel-toalla-premier
name: Toalla Bullpadel Premier Padel
brand: Bullpadel
price: 17.80
shortDescription: Toalla oficial de Bullpadel vinculada al circuito Premier Padel, 100x50cm en color kaki.
description: La toalla Premier Padel de Bullpadel mide 100x50cm y está pensada para el uso en pista, con el respaldo de marca del circuito Premier Padel.
pros: [Vinculada al circuito oficial Premier Padel, Tamaño generoso (100x50cm) para uso en pista]
cons: [Solo disponible en color kaki según la ficha revisada]
editorReview: El único hallazgo realmente específico de pádel entre decenas de toallas genéricas de gimnasio — una opción de marca reconocible para tener en el paletero.
faqs: []
asin: B0GGJC6NTB
tipo: toalla
genero: unisex
puntuacionInterna: 62
```

---

### 2. Gladiator Padel Grip Antivibraciones

- **ASIN**: `B0DF5FWHB5` · **Precio**: 14,99€ · Marca nueva

```
slug: gladiator-padel-grip-antivibraciones
id: ac-gladiator-antivibraciones
name: Gladiator Padel Grip Antivibraciones
brand: Gladiator Padel
price: 14.99
shortDescription: Grip octagonal antivibración de Gladiator Padel, con anillo y correas de instalación, pensado para reducir molestias en el codo.
description: Este grip antivibración sustituye el grip base de la pala e incluye un anillo y correas de instalación, con el objetivo declarado de reducir la tensión en el brazo y ayudar a prevenir el codo de tenista.
pros: [Enfoque específico en reducir vibración y prevenir molestias en el codo, Incluye anillo y correas de instalación]
cons: [Instalación más compleja que un accesorio simple, hay que sustituir el grip base]
editorReview: Un accesorio interesante para quien ya tiene molestias en el codo o la muñeca y busca algo más que un overgrip para reducir la vibración de base.
faqs: []
asin: B0DF5FWHB5
tipo: otro
genero: unisex
puntuacionInterna: 60
```

---

### 3. Spartan Padel Grip Antivibraciones 5 en 1

- **ASIN**: `B0GXGJ6DGT` · **Precio**: 14,97€ · Marca nueva

```
slug: spartan-padel-grip-antivibraciones-5-en-1
id: ac-spartan-antivibraciones
name: Spartan Padel Grip Antivibraciones 5 en 1
brand: Spartan Padel
price: 14.97
shortDescription: Grip antivibración de Spartan Padel en formato pack 5 en 1 (mango, overgrip, protector, ring y correas).
description: El pack 5 en 1 de Spartan Padel combina mango, overgrip, protector de pala, ring y correas de instalación en un único producto, buscando mejorar la sensación de golpeo y reducir el impacto percibido en la empuñadura.
pros: [Pack completo con todo lo necesario para la instalación en un solo producto, Agarre anatómico y antideslizante]
cons: [Al ser un pack combo, no se puede comprar cada pieza por separado si solo necesitas una]
editorReview: Similar en concepto al Gladiator Padel pero en formato pack más completo — buena opción si quieres renovar grip, overgrip y protector a la vez con un único pedido.
faqs: []
asin: B0GXGJ6DGT
tipo: otro
genero: unisex
puntuacionInterna: 59
```

---

### 4. MIBANDERA Gorra Bandera de España

- **ASIN**: `B09Z39BQDY` · **Precio**: 9,99€ · Marca nueva

```
slug: mibandera-gorra-bandera-espana
id: ac-mibandera-gorra-espana
name: MIBANDERA Gorra Bandera de España
brand: MIBANDERA
price: 9.99
shortDescription: Gorra de algodón con la bandera de España en la visera, de 6 paneles y cierre regulable.
description: Gorra de algodón peinado 100% con un detalle de la bandera de España en la parte trasera y el sándwich de la visera, un estilo popular en tiendas físicas de pádel además de golf y tenis.
pros: [Diseño reconocible con bandera de España, popular en tiendas de pádel, Algodón 100% peinado, transpirable]
cons: [Marca genérica de gorras, no especializada exclusivamente en pádel]
editorReview: Un estilo de gorra muy habitual en clubs de pádel españoles, con buena transpirabilidad para días de sol.
faqs: []
asin: B09Z39BQDY
tipo: gorra
genero: unisex
puntuacionInterna: 52
```

---

### 5. Araclinch Spray Grip Padel

- **ASIN**: `B0F547QB1Y` · **Precio**: 12,50€ · Marca nueva, tipo de producto nuevo en el catálogo

```
slug: araclinch-spray-grip-padel
id: ac-araclinch-spray-grip
name: Araclinch Spray Grip Padel
brand: Araclinch
price: 12.50
shortDescription: Spray antideslizante de Araclinch para mejorar el agarre de manos y pala, aroma a menta.
description: El spray grip de Araclinch es una resina natural en formato líquido que se aplica directamente en la mano o en la pala para mejorar el agarre de forma puntual, una alternativa o complemento al overgrip tradicional.
pros: [Solución rápida y puntual para mejorar el agarre sin cambiar el overgrip, Formato spray fácil de llevar en el paletero]
cons: [Efecto temporal, no sustituye a un overgrip para el agarre a largo plazo]
editorReview: Un accesorio distinto al resto del catálogo — útil como solución rápida en días de mucho calor o sudoración, más que como sustituto permanente del overgrip.
faqs: []
asin: B0F547QB1Y
tipo: otro
genero: unisex
puntuacionInterna: 55
```

---

## Resumen corto para decidir

- **Candidatos brutos inspeccionados**: ~50 (5 búsquedas de ~10-12 cada una) + 2 recuperados de rondas anteriores
- **Pasaron el filtro**: 5
- **Excluidos y por qué**: "guantes padel" fue 100% falso positivo (guantes de natación/vela, colisión de idioma "padel"/"paddle"), la mayoría de muñequeras/gorras/toallas eran genéricas de gimnasio sin relación real con pádel específicamente
- **Categoría con más ruido junto a ropa**: baja densidad de resultados realmente específicos de pádel en accesorios genéricos (muñequera/gorra/toalla)

## 📋 Resumen final: todas las marcas nuevas de las 7 categorías (para crear en lote)

Como acordamos, aquí está la lista consolidada de marcas nuevas que han aparecido en cada categoría, pendientes de crear su página en `/marcas`:

| Marca | Categoría(s) donde apareció | Nº de productos |
|---|---|---|
| Munich | Zapatillas | 4 |
| K-Swiss | Zapatillas | 3 |
| Dunlop | Palas, Paleteros, Pelotas | 5 |
| VIBOR-A | Pelotas | 1 |
| Raquex | Pelotas | 1 |
| ZRZ | Pelotas | 1 |
| Palbea | Overgrips, Protectores | 2 |
| PADELIA | Overgrips | 1 |
| TALAFIT | Overgrips | 1 |
| Nerusgrip | Overgrips | 1 |
| Prime Padel | Overgrips | 1 |
| EBBOM | Protectores | 1 |
| RYZE | Protectores | 1 |
| JJ LMS | Protectores | 1 |
| REGALUKOS | Protectores | 1 |
| NAYAINOVA | Protectores | 1 |
| Pro Elite | Protectores | 1 |
| ShockOut | Protectores | 1 |
| Gladiator Padel | Accesorios | 1 |
| Spartan Padel | Accesorios | 1 |
| MIBANDERA | Accesorios | 1 |
| Araclinch | Accesorios | 1 |

**22 marcas nuevas en total** (Ropa no aportó ninguna — las 5 marcas de esa categoría ya estaban en el catálogo). Dime cuándo quieres que las cree todas de una vez en `brands.ts`.

Esta es la última de las 7 categorías. Dime si integro accesorios y con eso cerramos la ronda completa, o si quieres revisar algo antes.
