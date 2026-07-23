import type { Answers } from "@/engine/configurators/types";
import type { Category, Faq, Product } from "@/engine/types";
import { getProductsByCategory } from "@/lib/products";

/**
 * Registro de páginas de SEO programático. Cada entrada genera una URL real
 * (ver app/[slug]/page.tsx) reutilizando siempre la misma plantilla —
 * GuideTemplate o SelectorVariantTemplate—, así que añadir cientos de
 * páginas de guías o variantes de selector es solo añadir entradas aquí,
 * sin tocar componentes ni rutas.
 */
export interface GuidePage {
  type: "guide";
  slug: string;
  title: string;
  h1: string;
  category: Category;
  intro: string;
  /** Versión corta (~150 caracteres) para meta description; si falta, se usa `intro` (puede truncarse en el SERP). */
  metaDescription?: string;
  filter?: (product: Product) => boolean;
  sortBy?: (a: Product, b: Product) => number;
  faqs: Faq[];
  relatedSlugs?: string[];
  /**
   * Muestra un "top pick" (producto nº1 + CTA + ancla al ranking) antes de
   * la intro larga, para acortar la distancia al CTA en páginas de tráfico
   * de pago con intro extensa. Cambio dirigido, no activo por defecto —
   * solo mejores-palas-calidad-precio y mejores-zapatillas lo tienen hoy.
   */
  topPickCta?: boolean;
  /**
   * Umbral mínimo de `reviewCount` para poder ser elegido como top pick
   * (independiente del orden del ranking completo, que no se toca). Existe
   * porque `byValueForMoney` (editorRating/precio) puede llevar a productos
   * baratos con 0 reseñas reales al primer puesto — válidos para el ranking,
   * pero poco convincentes como "Nuestra recomendación nº1" destacada. Si se
   * define, `getGuideTopPick` filtra por este mínimo antes de aplicar
   * `sortBy` como desempate; si ningún producto lo alcanza, cae al nº1 del
   * ranking normal.
   */
  topPickMinReviews?: number;
}

export interface SelectorVariantPage {
  type: "selector-variant";
  slug: string;
  configuratorId: string;
  title: string;
  h1: string;
  intro: string;
  /** Respuestas precargadas en el wizard; el usuario puede seguir editándolas. */
  initialAnswers: Answers;
  faqs: Faq[];
}

export type ProgrammaticPage = GuidePage | SelectorVariantPage;

const byEditorRating = (a: Product, b: Product) => b.editorRating - a.editorRating;
const byValueForMoney = (a: Product, b: Product) => b.editorRating / b.price - a.editorRating / a.price;

export const programmaticPages: ProgrammaticPage[] = [
  {
    type: "guide",
    slug: "mejores-palas-control",
    title: "Las mejores palas de control",
    h1: "Las mejores palas de control de pádel",
    category: "palas",
    intro:
      "Una pala de control se reconoce por tres rasgos que van casi siempre juntos: forma redonda, balance bajo (el peso concentrado cerca del mango) y un núcleo de goma más blando que el de las palas de potencia. Esa combinación amplía el punto dulce —la zona de la pala que golpea con más acierto— y reduce la vibración que llega al brazo en cada impacto, por eso son la opción que solemos recomendar tanto a quien empieza como a quien ya nota molestias en el codo o la muñeca. Lo que se sacrifica a cambio es algo de pegada: una pala de control nunca va a rematar tan fuerte como una diamante de balance alto, pero a cambio perdona mucho más los golpes descentrados, que son la inmensa mayoría cuando la técnica todavía no está consolidada. Si tu estilo de juego es defensivo o simplemente prefieres construir el punto con seguridad antes que buscar el golpe ganador, este es el grupo de palas donde deberías mirar primero. En este ranking ordenamos por valoración editorial las palas de control de todo el catálogo, cubriendo distintos precios y niveles de juego, desde opciones de entrada hasta modelos de gama alta pensados para jugadores ya consolidados que simplemente priorizan la precisión sobre la potencia.",
    metaDescription:
      "Palas de control de pádel ordenadas por valoración editorial: forma redonda, balance bajo y núcleo blando para máxima precisión y cuidar el brazo.",
    filter: (p) => p.category === "palas" && p.estiloJuego === "control",
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Qué diferencia una pala de control de una de potencia?",
        answer:
          "Las palas de control suelen tener forma redonda, balance bajo y un núcleo más blando, lo que amplía el punto dulce y facilita la precisión a costa de algo de pegada.",
      },
    ],
    relatedSlugs: ["mejores-overgrips", "pala-control-vs-potencia-cual-elegir", "adidas-metalbone-carbon-ctrl-3-3-vs-nox-ml10-pro-cup"],
  },
  {
    type: "guide",
    slug: "mejores-palas-potencia",
    title: "Las mejores palas de potencia",
    h1: "Las mejores palas de potencia de pádel",
    category: "palas",
    intro:
      "Las palas de potencia se identifican por su forma diamante, con el peso concentrado en la parte superior de la cabeza, y un balance alto que multiplica la fuerza de cada golpe. Esa misma concentración de peso es la que reduce el punto dulce: los golpes descentrados se notan mucho más que en una pala de control, así que este tipo de pala exige una técnica ya consolidada para sacarle partido real. Si tu estilo de juego es agresivo y buscas rematar con contundencia desde el fondo de la pista, una diamante de balance alto es la opción lógica — pero si todavía estás definiendo tu técnica o notas molestias en el codo, probablemente rendirás mejor con una pala de control o al menos híbrida antes de dar el salto a la potencia pura. El peso también suele ser mayor en esta categoría (a menudo por encima de 360g), lo que añade fatiga durante el partido y penaliza algo la maniobrabilidad en la volea y la defensa. En este ranking ordenamos por valoración editorial las palas de potencia y agresivas de todo el catálogo, pensadas para jugadores de nivel avanzado o de competición que ya dominan el golpeo y priorizan la pegada por encima de la comodidad.",
    metaDescription:
      "Palas de potencia de pádel ordenadas por valoración editorial: forma diamante y balance alto para jugadores avanzados que priorizan la pegada.",
    filter: (p) => p.category === "palas" && (p.estiloJuego === "potencia" || p.estiloJuego === "agresivo"),
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Una pala de potencia es mala para el codo?",
        answer:
          "Puede serlo si ya tienes molestias: el balance alto y el núcleo más duro transmiten más vibración al brazo que una pala de control. Si notas epicondilitis o molestias en la muñeca, es mejor mirar palas de control o híbridas antes que una diamante pura.",
      },
      {
        question: "¿Puedo pasar directamente de una pala de iniciación a una de potencia?",
        answer:
          "No es lo más recomendable. Lo habitual es pasar primero por una pala de control o híbrida de gama media antes de dar el salto a una de potencia pura, para no perder precisión de golpeo por el camino.",
      },
      {
        question: "¿Cuánto debería pesar una pala de potencia?",
        answer:
          "Normalmente por encima de 360g, aunque el peso ideal depende también de tu físico y de cuánto entrenes: más peso da más pegada pero también más fatiga durante el partido.",
      },
      {
        question: "¿Qué diferencia hay entre estilo \"potencia\" y \"agresivo\"?",
        answer:
          "Ambos priorizan la pegada por encima del control, pero el estilo agresivo suele llevar el balance y la dureza del núcleo todavía más al extremo, exigiendo aún más técnica y físico consolidados.",
      },
    ],
    relatedSlugs: ["mejores-pelotas-competicion", "nox-at10-genius-vs-bullpadel-vertex-04", "pala-control-vs-potencia-cual-elegir"],
  },
  {
    type: "guide",
    slug: "mejores-palas-calidad-precio",
    title: "Las mejores palas calidad-precio",
    h1: "Las mejores palas calidad-precio",
    category: "palas",
    intro:
      "No siempre la pala más cara es la que más te conviene. En este ranking no ordenamos por precio ni por valoración en solitario, sino por la relación entre ambas cosas: dividimos la valoración editorial de cada pala entre su precio, para encontrar los modelos que más rinden por cada euro invertido, sin importar si están en la gama de entrada o en la intermedia. Esto significa que vas a encontrar aquí tanto palas de menos de 100€ con una relación calidad-precio sobresaliente, como algún modelo de gama media que compensa un precio algo mayor con prestaciones que normalmente solo verías en la gama alta. Lo que no vas a encontrar en los primeros puestos son las palas más caras del catálogo: aunque puedan ser objetivamente mejores en rendimiento puro, su precio no compensa proporcionalmente frente a alternativas más asequibles con una valoración editorial similar. Es el ranking que recomendamos revisar si tu prioridad es gastar de forma inteligente antes que conseguir el máximo rendimiento posible sin mirar el precio — típicamente jugadores que empiezan o que juegan de forma recreativa, para quienes una pala de gama alta no se traduce necesariamente en mejor experiencia de juego.",
    metaDescription:
      "Las palas con mejor relación valoración-precio del catálogo, para encontrar las que más rinden por cada euro invertido.",
    topPickCta: true,
    topPickMinReviews: 20,
    sortBy: byValueForMoney,
    faqs: [
      {
        question: "¿Una pala barata puede tener buena relación calidad-precio?",
        answer:
          "Sí — de hecho es habitual que palas de gama de entrada o media encabecen este ranking, porque su valoración editorial es alta en proporción a lo que cuestan, aunque no lleguen a las prestaciones absolutas de la gama alta.",
      },
      {
        question: "¿Por qué las palas más caras del catálogo no encabezan este ranking?",
        answer:
          "Porque el precio no siempre escala en la misma proporción que las prestaciones: una pala puede ser objetivamente mejor y aun así tener peor relación calidad-precio que una alternativa más asequible con una valoración casi tan alta.",
      },
      {
        question: "¿Debería preocuparme si mi pala favorita no aparece en los primeros puestos?",
        answer:
          "No necesariamente. Este ranking prioriza el rendimiento por cada euro invertido, no el rendimiento absoluto — una pala de gama alta puede tener otras ventajas (potencia máxima, materiales premium) que no se reflejan en esta métrica.",
      },
    ],
    relatedSlugs: ["mejores-pelotas-calidad-precio", "mejores-palas-menos-de-100", "como-elegir-tu-primera-pala-de-padel"],
  },
  {
    type: "guide",
    slug: "mejores-palas-principiantes",
    title: "Las mejores palas para principiantes",
    h1: "Las mejores palas para principiantes",
    category: "palas",
    intro: "Palas ligeras, de tacto blando y balance bajo pensadas para dar los primeros pasos en el pádel sin sufrir el brazo.",
    filter: (p) => p.category === "palas" && (p.nivel.includes("iniciacion") || p.nivel.includes("principiante")),
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Cuánto debería costar mi primera pala?",
        answer: "No hace falta gastar mucho: hay palas de entrada muy competentes por debajo de 100€, suficientes para aprender la técnica básica.",
      },
    ],
  },
  {
    type: "guide",
    slug: "mejores-palas-menos-de-100",
    title: "Las mejores palas por menos de 100€",
    h1: "Las mejores palas por menos de 100€",
    category: "palas",
    intro: "No hace falta una inversión alta para tener una pala competente. Estas son nuestras recomendadas por debajo de 100€.",
    filter: (p) => p.category === "palas" && p.price < 100,
    sortBy: byEditorRating,
    faqs: [],
  },
  {
    type: "guide",
    slug: "mejores-palas-mujer",
    title: "Las mejores palas para mujer",
    h1: "Las mejores palas para mujer",
    category: "palas",
    intro: "Palas ligeras y de manejo cómodo, pensadas o especialmente recomendadas para jugadoras.",
    filter: (p) => p.category === "palas" && (p.genero === "mujer" || p.genero === "unisex"),
    sortBy: byEditorRating,
    faqs: [],
  },
  {
    type: "guide",
    slug: "mejores-palas-epicondilitis",
    title: "Las mejores palas para epicondilitis (codo de tenista)",
    h1: "Las mejores palas si tienes epicondilitis",
    category: "palas",
    intro: "Palas de tacto blando y balance bajo que ayudan a reducir la vibración transmitida al codo en el golpeo.",
    filter: (p) => p.category === "palas" && p.lesionesRecomendadas.includes("epicondilitis"),
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Una pala puede curar la epicondilitis?",
        answer: "No: una pala más blanda puede ayudar a no agravar las molestias, pero ante una lesión activa lo recomendable es consultar con un fisioterapeuta o médico deportivo.",
      },
    ],
  },
  {
    type: "guide",
    slug: "mejores-paleteros",
    title: "Los mejores paleteros",
    h1: "Los mejores paleteros de pádel",
    category: "paleteros",
    intro:
      "Elegir un paletero no es solo cuestión de capacidad: el número de palas que sueles llevar, si entrenas a diario o juegas de forma ocasional, y si viajas en coche o caminando hasta la pista cambian bastante qué modelo tiene sentido para ti. Un paletero de 2 palas es suficiente si juegas con una pala habitual y quizá una de repuesto ocasional — cargar con más capacidad de la que necesitas solo añade peso vacío que notarás cada vez que lo lleves al hombro. A partir de 3-4 palas, el compartimento térmico empieza a ser una prestación real, no un lujo: protege el núcleo de la pala de los cambios bruscos de temperatura en el trayecto hasta la pista, algo que a la larga afecta más a las prestaciones de la pala que las propias horas de juego. Si entrenas con frecuencia o compites, también merece la pena fijarte en si el paletero tiene zapatillero independiente, para no mezclar el calzado —con restos de arena o polvo de pista— con el compartimento donde van las palas. En este ranking ordenamos el catálogo completo de paleteros por valoración editorial, cubriendo desde mochilas compactas de 2 palas hasta modelos de competición con capacidad para 4 y compartimento térmico incluido.",
    metaDescription:
      "Paleteros de pádel ordenados por valoración editorial: desde mochilas compactas de 2 palas hasta modelos de competición con compartimento térmico.",
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Necesito compartimento térmico si juego poco?",
        answer:
          "No es imprescindible: el térmico protege la pala de cambios bruscos de temperatura en trayectos largos o climas extremos, algo que importa más cuanto más a menudo juegas. Si vas de forma esporádica, un paletero sin térmico es suficiente.",
      },
      {
        question: "¿Un paletero grande resta algo si solo llevo 2 palas?",
        answer:
          "Sobre todo peso extra y espacio desaprovechado. No hay problema funcional en usar un paletero grande medio vacío, pero si caminas mucho hasta la pista, uno ajustado a tu uso real pesa menos.",
      },
      {
        question: "¿Qué diferencia hay entre una mochila y un paletero clásico?",
        answer:
          "Es sobre todo una cuestión de transporte: la mochila reparte el peso en ambos hombros y es más cómoda en trayectos largos a pie, mientras que el paletero clásico (bandolera) suele ser más rápido de coger y dejar en el coche.",
      },
    ],
    relatedSlugs: ["mejores-paleteros-termicos", "nox-paletero-at10-vs-ml10-competition-xl-compact", "paletero-segun-numero-de-palas"],
  },
  {
    type: "guide",
    slug: "mejores-palas-avanzadas",
    title: "Las mejores palas para nivel avanzado",
    h1: "Las mejores palas para jugadores de nivel avanzado",
    category: "palas",
    intro: "Palas exigentes técnicamente, pensadas para jugadores con nivel avanzado o de competición que ya dominan la técnica básica.",
    filter: (p) => p.category === "palas" && (p.nivel.includes("avanzado") || p.nivel.includes("competicion")),
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Cómo sé si mi nivel es realmente avanzado?",
        answer: "Si ya dominas los golpes básicos, juegas bandeja y víbora con cierta solvencia y compites de forma habitual, es probable que estés en nivel avanzado. Ante la duda, una pala de nivel intermedio-avanzado es una opción más segura.",
      },
    ],
  },
  {
    type: "guide",
    slug: "mejores-palas-hibridas",
    title: "Las mejores palas híbridas",
    h1: "Las mejores palas híbridas de pádel",
    category: "palas",
    intro: "Palas de forma lágrima y balance medio que buscan un punto intermedio entre control y potencia, ideales si no quieres renunciar a ninguna de las dos cosas.",
    filter: (p) => p.category === "palas" && p.forma === "lagrima" && p.balance === "medio",
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Qué significa que una pala sea híbrida?",
        answer: "Suele referirse a palas de forma lágrima con un balance medio, que combinan parte del punto dulce amplio de las redondas con algo de la pegada de las diamante, sin llevar ninguna característica al extremo.",
      },
    ],
  },
  {
    type: "guide",
    slug: "mejores-palas-hombre",
    title: "Las mejores palas para hombre",
    h1: "Las mejores palas para hombre",
    category: "palas",
    intro: "Palas orientadas o especialmente recomendadas para jugadores, con un peso y balance pensados para perfiles masculinos habituales.",
    filter: (p) => p.category === "palas" && (p.genero === "hombre" || p.genero === "unisex"),
    sortBy: byEditorRating,
    faqs: [],
  },
  {
    type: "guide",
    slug: "mejores-palas-menos-de-150",
    title: "Las mejores palas por menos de 150€",
    h1: "Las mejores palas por menos de 150€",
    category: "palas",
    intro: "Un rango de precio intermedio donde ya encontramos palas con muy buenas prestaciones sin llegar al desembolso de la gama de competición.",
    filter: (p) => p.category === "palas" && p.price < 150,
    sortBy: byEditorRating,
    faqs: [],
  },
  {
    type: "guide",
    slug: "mejores-zapatillas",
    title: "Las mejores zapatillas de pádel",
    h1: "Las mejores zapatillas de pádel",
    category: "zapatillas",
    intro:
      "La pisada influye más que la marca a la hora de elegir zapatillas de pádel, pero no es el único factor: la frecuencia con la que juegas, tu peso corporal y el tipo de pista (interior o exterior) también condicionan qué modelo te va a durar más y proteger mejor las articulaciones. El pádel exige frenadas y cambios de dirección mucho más bruscos que correr en línea recta, así que una zapatilla pensada específicamente para este deporte —con refuerzos laterales y una suela de agarre adecuada— marca una diferencia real frente a usar calzado genérico de otros deportes de raqueta. Si notas que tiendes a pronar (el pie gira hacia dentro al apoyar), prioriza modelos con refuerzo lateral y buena estabilidad en la suela; si tu pisada es neutra, tienes más margen para priorizar amortiguación y polivalencia sin preocuparte tanto por la estabilidad. En este ranking ordenamos por valoración editorial el catálogo completo de zapatillas de pádel, con opciones para todos los tipos de pisada, niveles de juego y presupuestos, desde modelos de entrada hasta la gama alta de marcas especializadas en el deporte.",
    metaDescription:
      "Zapatillas de pádel ordenadas por valoración editorial, con opciones para todo tipo de pisada, nivel de juego y presupuesto.",
    topPickCta: true,
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Cada cuánto hay que cambiar las zapatillas de pádel?",
        answer: "Depende del uso, pero como referencia general, entre 6 y 12 meses jugando 2-3 veces por semana, cuando la suela empieza a perder agarre o la amortiguación se nota más plana.",
      },
    ],
    relatedSlugs: ["mejores-zapatillas-pronador", "nox-at10-pro-padel-vs-nox-ml10-hexa", "zapatillas-padel-segun-tipo-pisada"],
  },
  {
    type: "guide",
    slug: "mejores-zapatillas-pronador",
    title: "Las mejores zapatillas para pisada pronadora",
    h1: "Las mejores zapatillas para pisada pronadora",
    category: "zapatillas",
    intro: "Zapatillas con refuerzo lateral pensadas para jugadores con pisada pronadora, que necesitan más estabilidad en los cambios de dirección.",
    filter: (p) => p.category === "zapatillas" && p.tipoPisada === "pronador",
    sortBy: byEditorRating,
    faqs: [],
    relatedSlugs: ["zapatillas-padel-segun-tipo-pisada", "selector-zapatillas-pronador"],
  },
  {
    type: "guide",
    slug: "mejores-paleteros-termicos",
    title: "Los mejores paleteros con compartimento térmico",
    h1: "Los mejores paleteros con compartimento térmico",
    category: "paleteros",
    intro: "Paleteros que incluyen un compartimento térmico para proteger tus palas de los cambios bruscos de temperatura.",
    filter: (p) => p.category === "paleteros" && p.compartimentoTermico === true,
    sortBy: byEditorRating,
    faqs: [],
  },
  {
    type: "guide",
    slug: "mejores-pelotas-competicion",
    title: "Las mejores pelotas de competición",
    h1: "Las mejores pelotas de competición de pádel",
    category: "pelotas",
    intro:
      "Pelotas pensadas para partidos serios y competición, con una presión y durabilidad de bote pensadas para aguantar varios sets sin perder prestaciones.",
    filter: (p) => p.category === "pelotas" && p.uso === "competicion",
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Cuántos partidos aguanta una pelota de competición antes de perder presión?",
        answer:
          "Como referencia general, entre 2 y 3 partidos de nivel competitivo, aunque varía según la marca y las condiciones de la pista.",
      },
    ],
  },
  {
    type: "guide",
    slug: "mejores-pelotas-calidad-precio",
    title: "Las mejores pelotas calidad-precio",
    h1: "Las mejores pelotas calidad-precio de pádel",
    category: "pelotas",
    intro:
      "Igual que con las palas, en este ranking no ordenamos las pelotas solo por valoración ni solo por precio, sino por la relación entre ambas cosas — dividimos la valoración editorial entre el precio para encontrar los botes que más rinden por cada euro. Las pelotas de pádel pierden presión con cada impacto de forma inevitable, así que la diferencia real entre una pelota barata y una cara está en cuánto tiempo tardan en notarse esa pérdida de bote, no en si rebota más o menos al abrir el bote. Para entrenar con frecuencia, una pelota de gama de entrenamiento con buena relación calidad-precio es perfectamente válida y mucho más económica que comprar pelotas de competición para cada sesión — reserva esas para los partidos que realmente lo justifiquen. En este ranking encontrarás tanto botes individuales como formatos de varias unidades, pensados para quien juega con regularidad y quiere optimizar el gasto en el consumible que más se repone de todo el equipo de pádel, sin sacrificar la calidad de bote durante un set completo.",
    metaDescription:
      "Pelotas de pádel con mejor relación valoración-precio del catálogo, para entrenar sin gastar de más en cada bote.",
    sortBy: byValueForMoney,
    faqs: [
      {
        question: "¿Debo comprar pelotas de competición para entrenar?",
        answer:
          "No hace falta. Las pelotas de gama de entrenamiento con buena relación calidad-precio son perfectamente válidas para sesiones habituales — reserva las de competición para partidos donde de verdad se note la diferencia de bote.",
      },
      {
        question: "¿Cuántos partidos aguanta un bote de gama calidad-precio?",
        answer:
          "Como referencia general, entre 1 y 2 partidos de intensidad media antes de notar pérdida de presión, algo menos que una pelota de competición pura, pero suficiente para entrenamientos y partidos recreativos.",
      },
      {
        question: "¿Vale la pena comprar cajas grandes de varias unidades?",
        answer:
          "Sí, si juegas con cierta frecuencia: los formatos de varios botes suelen reducir el coste por unidad frente a comprar botes individuales cada vez.",
      },
    ],
    relatedSlugs: ["mejores-pelotas-competicion", "dunlop-pro-padel-vs-dunlop-team-padel", "pelotas-padel-presion-duracion-cuando-cambiarlas"],
  },
  {
    type: "guide",
    slug: "mejores-overgrips",
    title: "Los mejores overgrips de pádel",
    h1: "Los mejores overgrips de pádel",
    category: "overgrips",
    intro:
      "El overgrip es, junto a las pelotas, el accesorio que más se repone en el pádel — y también el que más se descuida pese a costar solo unos euros. Un overgrip gastado o inadecuado para tu nivel de sudoración puede arruinar la sensación de agarre en pleno partido, por muy buena que sea la pala que lleves debajo, así que merece más atención de la que suele recibir. Si sudas mucho de manos, un overgrip de superficie perforada evacúa mejor la humedad y mantiene el agarre estable durante todo el partido, aunque el tacto sea algo más rugoso que uno liso; si no sudas en exceso, un overgrip liso te dará más sensibilidad y precisión en el golpeo. Como referencia, jugando 2-3 veces por semana, un overgrip suele aguantar entre 2 y 4 semanas antes de perder su capacidad de absorción — si notas que se desliza o ya no absorbe como al principio, es el momento de cambiarlo. En este ranking ordenamos por valoración editorial el catálogo completo de overgrips, con opciones tanto para manos sudorosas como para quien prioriza el tacto y la sensibilidad de golpeo por encima de la absorción.",
    metaDescription:
      "Overgrips de pádel ordenados por valoración editorial, con opciones para manos sudorosas y para quien prioriza el tacto.",
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Cada cuánto hay que cambiar el overgrip?",
        answer:
          "Si juegas 2-3 veces por semana, entre 2 y 4 semanas antes de perder capacidad de absorción, aunque depende mucho de cuánto sudes de manos.",
      },
    ],
    relatedSlugs: ["mejores-overgrips-sudoracion", "nerusgrip-pack-6-vs-siux-pro-perforated-x60", "overgrip-vs-grip-original-padel"],
  },
  {
    type: "guide",
    slug: "mejores-overgrips-sudoracion",
    title: "Los mejores overgrips para manos sudorosas",
    h1: "Los mejores overgrips si sudas mucho de manos",
    category: "overgrips",
    intro:
      "Overgrips con mayor absorción de sudor del catálogo, pensados para quien nota que la pala se le escapa de las manos en partidos largos.",
    filter: (p) => p.category === "overgrips" && p.absorcionSudor >= 7,
    sortBy: byEditorRating,
    faqs: [],
  },
  {
    type: "guide",
    slug: "mejores-protectores",
    title: "Los mejores protectores de pala",
    h1: "Los mejores protectores de pala de pádel",
    category: "protectores",
    intro:
      "Un protector de marco cuesta apenas unos euros, pero evita que los golpes bajos —habituales en la volea baja y la salida de pared— desgasten directamente el marco de la pala, que es mucho más caro de reparar o sustituir. Es, junto al overgrip, el accesorio con mejor relación entre lo que cuesta y lo que protege: sin él, el roce constante contra el suelo o la pared va limando poco a poco el borde inferior del marco hasta dejarlo visiblemente desgastado o incluso agrietado en pocos meses de juego intenso. La mayoría de protectores del catálogo son transparentes, pensados para no alterar el diseño de la pala, aunque también existen acabados más llamativos (vinilo, dentado) que declaran mayor protección a cambio de ser más visibles — la diferencia real de protección entre unos y otros es menor de lo que el marketing sugiere. En cuanto notes que empieza a despegarse por una esquina, no esperes a que se caiga del todo: un protector parcialmente despegado deja precisamente la zona de más impacto sin cubrir. En este ranking ordenamos por valoración editorial el catálogo completo de protectores de pala.",
    metaDescription:
      "Protectores de pala de pádel ordenados por valoración editorial, para proteger el marco de los golpes bajos sin penalizar el peso.",
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿El protector afecta al peso o al tacto de la pala?",
        answer:
          "El peso añadido es mínimo — la mayoría ronda los 10-15g, prácticamente imperceptible en el juego. No debería notarse ningún cambio relevante de tacto tras instalarlo.",
      },
      {
        question: "¿Un protector transparente protege menos que uno de color o dentado?",
        answer:
          "La protección real entre acabados es más parecida de lo que sugiere el marketing. Los acabados llamativos (vinilo, dentado) apuestan más por la estética que por una diferencia sustancial de protección frente a los transparentes clásicos.",
      },
      {
        question: "¿Cada cuánto hay que cambiar el protector?",
        answer:
          "En cuanto empiece a despegarse por una esquina, no esperes a que se caiga del todo — un protector parcialmente despegado deja precisamente la zona de más impacto sin cubrir.",
      },
    ],
    relatedSlugs: ["mejores-overgrips", "black-crown-protector-adamantium-vs-nox-protector-de-pala", "protector-de-pala-merece-la-pena"],
  },
  {
    type: "guide",
    slug: "mejores-camisetas-padel",
    title: "Las mejores camisetas de pádel",
    h1: "Las mejores camisetas de pádel",
    category: "ropa",
    intro:
      "La mayoría de camisetas técnicas de pádel usan poliéster o mezclas con elastano, pensadas para evacuar el sudor y secarse rápido durante el partido — la opción más lógica si juegas con intensidad, ya que el tejido técnico transporta la humedad hacia la superficie exterior en vez de retenerla pegada a la piel. Alguna opción del catálogo prioriza en cambio el algodón, con un tacto más agradable a costa de retener más la humedad durante el ejercicio intenso; tiene sentido para partidos recreativos de baja intensidad, pero no para entrenar a alta intensidad en verano, donde la camiseta se empapa y pesa notablemente más. También encontrarás en este ranking camisetas oficiales vinculadas a jugadores profesionales del circuito, que suelen costar más sin que eso implique necesariamente un tejido técnicamente superior — el extra de precio es sobre todo por la licencia de marca y el diseño asociado al jugador. En este ranking ordenamos por valoración editorial el catálogo completo de camisetas técnicas de pádel, desde opciones de gama de entrada hasta las prendas oficiales con más identidad de marca.",
    metaDescription:
      "Camisetas técnicas de pádel ordenadas por valoración editorial, de gama de entrada a camisetas oficiales de jugadores profesionales.",
    filter: (p) => p.category === "ropa" && p.tipo === "camiseta",
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Poliéster o algodón, cuál debería elegir?",
        answer:
          "Si juegas con intensidad, poliéster o mezclas con elastano: evacúan mejor el sudor y se secan más rápido. El algodón tiene un tacto más agradable pero retiene más la humedad, así que tiene más sentido para partidos recreativos de baja intensidad.",
      },
      {
        question: "¿Las camisetas oficiales de jugador rinden mejor que el resto?",
        answer:
          "No necesariamente. El extra de precio suele ser por la licencia de marca y el diseño asociado al jugador, no por un tejido técnicamente superior al resto del catálogo de la misma gama.",
      },
      {
        question: "¿Qué talla debería pedir?",
        answer:
          "La ropa técnica de pádel suele tallar más ajustada que una camiseta de algodón normal, así que si dudas entre dos tallas, conviene revisar la tabla de medidas específica del producto antes de guiarte solo por tu talla habitual.",
      },
    ],
    relatedSlugs: ["regalos-para-jugadores-de-padel", "nox-camiseta-at10-tapia-vs-bullpadel-camiseta-edrar-triay", "camiseta-tecnica-padel-que-mirar"],
  },
  {
    type: "guide",
    slug: "regalos-para-jugadores-de-padel",
    title: "Ideas de regalo para jugadores de pádel",
    h1: "Ideas de regalo para jugadores de pádel",
    category: "accesorios",
    intro:
      "Si no conoces bien el nivel o las preferencias de juego de la persona a la que quieres hacer un regalo, hay accesorios de pádel que son un acierto casi seguro y otros que conviene evitar salvo que te lo pidan expresamente. Una gorra, una toalla técnica o un spray de agarre son regalos que cualquier jugador puede usar independientemente de su nivel o de la pala con la que juegue — no dependen de preferencias técnicas específicas y son baratos si tienes dudas sobre cuánto gastar. Los overgrips y protectores son un acierto con más riesgo: son útiles, pero dependen del gusto de cada jugador (tacto liso o perforado, acabado transparente o más llamativo), así que solo son un buen regalo si sabes qué suele usar la persona habitualmente. Lo que es mejor evitar sin consultar antes es la pala: es la decisión más personal de todo el equipo, depende del nivel, el estilo de juego y hasta molestias físicas concretas, y regalar una pala sin preguntar es el error más habitual y caro dentro de este tipo de regalos. En este ranking ordenamos por valoración editorial los accesorios de pádel más habituales como regalo, del más seguro al que requiere conocer mejor a la persona.",
    metaDescription:
      "Ideas de regalo de pádel: gorras, toallas y grips antivibración ordenados por valoración editorial, para acertar sin conocer el nivel del jugador.",
    sortBy: byEditorRating,
    faqs: [
      {
        question: "¿Qué accesorio es un acierto seguro si no sé el nivel del jugador?",
        answer:
          "Los accesorios genéricos (gorra, toalla) son más seguros como regalo que los técnicos (grip antivibración, overgrips específicos), que dependen más de las preferencias de juego de cada persona.",
      },
    ],
    relatedSlugs: ["mejores-camisetas-padel", "gladiator-padel-vs-spartan-padel-grip-antivibraciones", "ideas-regalo-jugadores-de-padel"],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-principiante",
    configuratorId: "pala",
    title: "Selector de pala para principiantes",
    h1: "Encuentra tu primera pala de pádel",
    intro: "Hemos precargado el nivel 'principiante' en el selector; puedes ajustar el resto de respuestas para afinar la recomendación.",
    initialAnswers: { nivel: "principiante" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-control",
    configuratorId: "pala",
    title: "Selector de pala de control",
    h1: "Encuentra tu pala de control ideal",
    intro: "Hemos precargado el estilo de juego 'control'; completa el resto de preguntas para ver tus 3 mejores opciones.",
    initialAnswers: { estiloJuego: "control" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-potencia",
    configuratorId: "pala",
    title: "Selector de pala de potencia",
    h1: "Encuentra tu pala de potencia ideal",
    intro: "Hemos precargado el estilo de juego 'potencia'; completa el resto de preguntas para ver tus 3 mejores opciones.",
    initialAnswers: { estiloJuego: "potencia" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-menos-de-100",
    configuratorId: "pala",
    title: "Selector de pala por menos de 100€",
    h1: "Encuentra tu pala por menos de 100€",
    intro: "Hemos precargado un presupuesto ajustado; completa el resto de preguntas para ver tus 3 mejores opciones dentro de ese rango.",
    initialAnswers: { presupuesto: "75-100" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-mujer",
    configuratorId: "pala",
    title: "Selector de pala para mujer",
    h1: "Encuentra tu pala ideal",
    intro: "Hemos precargado el perfil 'mujer'; completa el resto de preguntas para afinar tu recomendación.",
    initialAnswers: { sexo: "mujer" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-epicondilitis",
    configuratorId: "pala",
    title: "Selector de pala para epicondilitis",
    h1: "Encuentra una pala que cuide tu codo",
    intro: "Hemos precargado la molestia 'epicondilitis'; completa el resto de preguntas para ver qué palas priorizan un tacto más blando.",
    initialAnswers: { lesiones: ["epicondilitis"] },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pala-nox",
    configuratorId: "pala",
    title: "Selector de pala Nox",
    h1: "Encuentra tu pala Nox ideal",
    intro: "Hemos precargado la marca 'Nox'; completa el resto de preguntas para ver qué modelo de la marca encaja mejor contigo.",
    initialAnswers: { marca: "Nox" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-zapatillas-pronador",
    configuratorId: "zapatilla",
    title: "Selector de zapatillas para pisada pronadora",
    h1: "Encuentra tus zapatillas si eres pronador",
    intro: "Hemos precargado el tipo de pisada 'pronador'; completa el resto de preguntas para afinar la recomendación.",
    initialAnswers: { tipoPisada: "pronador" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-zapatillas-amortiguacion",
    configuratorId: "zapatilla",
    title: "Selector de zapatillas con más amortiguación",
    h1: "Encuentra zapatillas con máxima amortiguación",
    intro: "Hemos precargado un peso corporal alto, lo que prioriza modelos con más amortiguación; completa el resto de preguntas para afinar.",
    initialAnswers: { pesoCorporal: "alto" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-overgrip-sudor",
    configuratorId: "overgrip",
    title: "Selector de overgrip para manos sudorosas",
    h1: "Encuentra el mejor overgrip si sudas mucho de manos",
    intro: "Hemos precargado 'mucha sudoración'; completa el resto de preguntas para afinar tu recomendación.",
    initialAnswers: { sudoracion: "mucha" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-paletero-2-palas",
    configuratorId: "paletero",
    title: "Selector de paletero para 2 palas",
    h1: "Encuentra tu paletero para 2 palas",
    intro: "Hemos precargado '2 palas'; completa el resto de preguntas para afinar la recomendación.",
    initialAnswers: { numeroPalas: "2" },
    faqs: [],
  },
  {
    type: "selector-variant",
    slug: "selector-pelotas-competicion",
    configuratorId: "pelota",
    title: "Selector de pelotas de competición",
    h1: "Encuentra tus pelotas de competición",
    intro: "Hemos precargado el uso 'competición'; completa el resto de preguntas para afinar tu recomendación.",
    initialAnswers: { uso: "competicion" },
    faqs: [],
  },
];

export function getProgrammaticPage(slug: string): ProgrammaticPage | undefined {
  return programmaticPages.find((p) => p.slug === slug);
}

export function getGuideProducts(guide: GuidePage): Product[] {
  const all = getProductsByCategory(guide.category);
  const filtered = guide.filter ? all.filter(guide.filter) : all;
  return [...filtered].sort(guide.sortBy ?? byEditorRating);
}

/**
 * Producto a mostrar en el `GuideTopPick`. Por defecto es `products[0]` (el
 * nº1 del ranking), pero si la guía define `topPickMinReviews`, se restringe
 * primero a los productos con esa cantidad mínima de reseñas reales y solo
 * entre esos se aplica el `sortBy` de la guía como desempate — el ranking
 * completo (`products`) no se ve afectado.
 */
export function getGuideTopPick(guide: GuidePage, products: Product[]): Product | undefined {
  if (guide.topPickMinReviews === undefined) return products[0];
  const eligible = products.filter((p) => p.reviewCount >= guide.topPickMinReviews!);
  if (eligible.length === 0) return products[0];
  return [...eligible].sort(guide.sortBy ?? byEditorRating)[0];
}
