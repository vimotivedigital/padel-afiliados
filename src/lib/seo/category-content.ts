import type { Category, Faq } from "@/engine/types";

/**
 * Contenido SEO de los 8 listados de categoría base (/palas, /zapatillas...).
 * Rol de EXPLORACIÓN/CATÁLOGO, distinto al de las guías "mejores-X" (rol de
 * RECOMENDACIÓN curada): aquí no se recomienda un top pick ni se ordena por
 * ranking, solo se orienta la navegación por todo el catálogo y se enlaza
 * hacia la guía correspondiente para quien ya quiere una recomendación.
 */
export interface CategoryContent {
  intro: string;
  /** Versión corta (<160 caracteres) para meta description. */
  metaDescription: string;
  faqs: Faq[];
  /** Guías de recomendación relacionadas con esta categoría, a las que este listado deriva tráfico. */
  guideSlugs: string[];
}

export const categoryContent: Record<Category, CategoryContent> = {
  palas: {
    intro:
      "Aquí puedes ver y filtrar todo nuestro catálogo de palas de pádel: marcas como Nox, Bullpadel, Adidas, Head, Wilson, Babolat, Siux, StarVie, Dunlop, Drop Shot u Oxdog, en un rango de precio que va desde opciones de iniciación por debajo de 50€ hasta la gama de competición más exigente por encima de 300€. Encontrarás palas de las tres formas principales (redonda, lágrima y diamante) y de los tres balances (bajo, medio y alto), así como modelos pensados específicamente para hombre, mujer o unisex, y para distintos niveles de juego. Usa el ordenador de arriba para ver el catálogo por precio o valoración, o filtra por categoría desde el menú si buscas algo más concreto. Si todavía no tienes claro qué características priorizar, ten en cuenta que la forma y el balance condicionan mucho más el comportamiento en pista que la marca en sí: una redonda de balance bajo perdona más los golpes descentrados, mientras que una diamante de balance alto multiplica la potencia a cambio de exigir más técnica.",
    metaDescription: "Catálogo completo de palas de pádel: todas las marcas, formas y precios. Filtra y compara antes de elegir.",
    faqs: [
      {
        question: "¿Qué diferencia hay entre este listado y la guía de mejores palas?",
        answer:
          "Este listado muestra todo el catálogo de palas para que explores y compares por tu cuenta. Nuestras guías de mejores palas (control, potencia, calidad-precio, principiantes...) son una selección curada y ordenada por valoración editorial para cada perfil concreto de jugador.",
      },
      {
        question: "¿Por dónde empiezo si no sé qué tipo de pala busco?",
        answer:
          "Si prefieres una recomendación concreta en vez de explorar el catálogo completo, prueba nuestro selector de pala o consulta directamente la guía de mejores palas según tu perfil (control, potencia, principiante, calidad-precio...).",
      },
    ],
    guideSlugs: ["mejores-palas-control", "mejores-palas-potencia", "mejores-palas-calidad-precio"],
  },
  zapatillas: {
    intro:
      "Aquí puedes ver y filtrar todo nuestro catálogo de zapatillas de pádel: marcas como Nox, Asics, Wilson, K-Swiss o Munich, con distintos tipos de pisada recomendada (neutra, pronadora), niveles de amortiguación y rangos de precio. El calzado específico de pádel se diferencia del genérico sobre todo en la suela —pensada para los frenazos y cambios de dirección constantes del deporte— y en el refuerzo lateral, más o menos marcado según el modelo. Usa el ordenador de arriba para explorar por precio o valoración, y revisa la ficha de cada producto para ver el tipo de pisada recomendada antes de decidirte. También encontrarás diferencias reales de peso y nivel de amortiguación entre modelos, dos factores que pesan tanto como el precio si juegas con frecuencia o si ya arrastras alguna molestia articular en rodilla o tobillo.",
    metaDescription: "Catálogo completo de zapatillas de pádel: todas las marcas y tipos de pisada. Filtra y compara antes de elegir.",
    faqs: [
      {
        question: "¿Qué diferencia hay entre este listado y la guía de mejores zapatillas?",
        answer:
          "Este listado muestra todo el catálogo para que compares por tu cuenta. La guía de mejores zapatillas ordena por valoración editorial con un top pick destacado, y si ya sabes que tienes pisada pronadora, tenemos además una guía específica para ese perfil con zapatillas de refuerzo lateral.",
      },
      {
        question: "¿Cómo sé qué tipo de pisada tengo antes de elegir?",
        answer:
          "Puedes usar el truco casero de mojar la planta del pie y pisar sobre una superficie que deje marca, explicado en nuestro artículo sobre zapatillas según tipo de pisada, o consultar directamente la guía de zapatillas para pisada pronadora si ya sabes que tiendes a pronar.",
      },
    ],
    guideSlugs: ["mejores-zapatillas", "mejores-zapatillas-pronador"],
  },
  paleteros: {
    intro:
      "Aquí puedes ver y filtrar todo nuestro catálogo de paleteros y mochilas de pádel: desde mochilas compactas para 2 palas hasta modelos de competición con capacidad para 4 y compartimento térmico incluido, de marcas como Nox, Bullpadel, Black Crown y FUTURA8. La organización interna varía bastante de un modelo a otro —compartimento térmico, zapatillero separado, bolsillos para ropa—, así que merece la pena revisar la ficha de cada producto más allá del precio. Usa el ordenador de arriba para explorar por precio o valoración según cuántas palas sueles llevar y con qué frecuencia juegas. También encontrarás distintos formatos de transporte —mochila de dos asas, bandolera clásica— que condicionan más la comodidad en trayectos largos a pie que la propia capacidad del paletero.",
    metaDescription: "Catálogo completo de paleteros y mochilas de pádel: capacidad, térmico y precio. Filtra y compara antes de elegir.",
    faqs: [
      {
        question: "¿Qué diferencia hay entre este listado y la guía de mejores paleteros?",
        answer:
          "Este listado muestra todo el catálogo para que compares capacidad, compartimentos y precio por tu cuenta. La guía de mejores paleteros ordena por valoración editorial todo el catálogo, y si buscas específicamente compartimento térmico para proteger la pala del calor o el frío, tenemos una guía centrada solo en esos modelos.",
      },
      {
        question: "¿Necesito compartimento térmico si juego poco?",
        answer:
          "No es imprescindible: protege la pala de cambios bruscos de temperatura en trayectos largos, algo que importa más cuanto más a menudo juegas. Si vas de forma esporádica, un paletero sin térmico es suficiente.",
      },
    ],
    guideSlugs: ["mejores-paleteros", "mejores-paleteros-termicos"],
  },
  pelotas: {
    intro:
      "Aquí puedes ver y filtrar todo nuestro catálogo de pelotas de pádel: formatos individuales y en caja de varias unidades, de marcas como Nox, Dunlop, Wilson y Palbea, con opciones tanto de competición como de entrenamiento y recreativas. La diferencia principal entre gamas está en cuánto tiempo mantienen la presión de bote set tras set, no en si rebotan más o menos al abrir el bote. Usa el ordenador de arriba para explorar por precio o valoración según si buscas pelotas para partidos serios o para entrenar con regularidad sin gastar de más. Algunas referencias declaran además homologación oficial de federación, un dato relevante solo si compites en torneos que la exigen expresamente y no tanto para partidos recreativos entre amigos.",
    metaDescription: "Catálogo completo de pelotas de pádel: competición, entrenamiento y calidad-precio. Filtra y compara antes de elegir.",
    faqs: [
      {
        question: "¿Qué diferencia hay entre este listado y las guías de pelotas?",
        answer:
          "Este listado muestra todo el catálogo para que compares formatos y precios por tu cuenta. Nuestras guías de mejores pelotas de competición y calidad-precio no ordenan igual: la primera prioriza valoración editorial pura, la segunda la relación entre valoración y precio.",
      },
      {
        question: "¿Debo comprar pelotas de competición para entrenar?",
        answer:
          "No hace falta. Las pelotas de gama de entrenamiento con buena relación calidad-precio son perfectamente válidas para sesiones habituales — reserva las de competición para partidos donde de verdad se note la diferencia de bote.",
      },
    ],
    guideSlugs: ["mejores-pelotas-competicion", "mejores-pelotas-calidad-precio"],
  },
  overgrips: {
    intro:
      "Aquí puedes ver y filtrar todo nuestro catálogo de overgrips de pádel: acabados lisos y perforados, formatos de pack pequeño y grande, de marcas como HEAD, Siux y Nerusgrip. Es el accesorio que más se repone de todo el equipo de pádel, así que el precio por unidad y el formato de compra suelen pesar tanto como el propio tacto a la hora de elegir. Usa el ordenador de arriba para explorar por precio o valoración según tu nivel de sudoración de manos y la frecuencia con la que juegas. Como referencia general, un overgrip suele aguantar entre 2 y 4 semanas de juego regular antes de perder capacidad de absorción, así que conviene tener siempre alguno de repuesto en la bolsa de pádel.",
    metaDescription: "Catálogo completo de overgrips de pádel: acabados lisos y perforados. Filtra y compara antes de elegir.",
    faqs: [
      {
        question: "¿Qué diferencia hay entre este listado y la guía de mejores overgrips?",
        answer:
          "Este listado muestra todo el catálogo para que compares acabados y formatos por tu cuenta. La guía de mejores overgrips es una selección curada y ordenada por valoración editorial, con una variante específica para manos sudorosas.",
      },
      {
        question: "¿Cada cuánto hay que cambiar el overgrip?",
        answer:
          "Si juegas 2-3 veces por semana, entre 2 y 4 semanas antes de perder capacidad de absorción, aunque depende mucho de cuánto sudes de manos.",
      },
    ],
    guideSlugs: ["mejores-overgrips", "mejores-overgrips-sudoracion"],
  },
  protectores: {
    intro:
      "Aquí puedes ver y filtrar todo nuestro catálogo de protectores de pala: acabados transparentes clásicos y otros más llamativos (vinilo, dentado), de marcas como Nox, Black Crown, EBBOM y Palbea. Es uno de los accesorios más baratos de todo el equipo, pero también el que más protege el marco frente al desgaste de los golpes bajos y la salida de pared. Usa el ordenador de arriba para explorar por precio o valoración según el acabado y el peso que prefieras para tu pala. La protección real entre acabados es más parecida de lo que sugiere el marketing: los diseños más llamativos apuestan sobre todo por la estética, no por una diferencia sustancial frente a los transparentes clásicos que llevan más tiempo en el catálogo.",
    metaDescription: "Catálogo completo de protectores de pala de pádel: acabados y pesos. Filtra y compara antes de elegir.",
    faqs: [
      {
        question: "¿Qué diferencia hay entre este listado y la guía de mejores protectores?",
        answer:
          "Este listado muestra todo el catálogo para que compares acabados y pesos por tu cuenta. A diferencia de otras categorías, aquí no tenemos guías separadas por perfil: la diferencia real entre acabados (transparente, dentado, vinilo) es menor de lo que sugiere el diseño, así que una sola guía de mejores protectores cubre bien todo el catálogo.",
      },
      {
        question: "¿El protector afecta al peso o al tacto de la pala?",
        answer:
          "El peso añadido es mínimo — la mayoría ronda los 10-15g, prácticamente imperceptible en el juego. No debería notarse ningún cambio relevante de tacto tras instalarlo.",
      },
    ],
    guideSlugs: ["mejores-protectores"],
  },
  ropa: {
    intro:
      "Aquí puedes ver y filtrar todo nuestro catálogo de ropa técnica de pádel: camisetas, faldas y el resto de prendas de marcas como Bullpadel, Nox, Adidas y Wilson, incluyendo camisetas oficiales vinculadas a jugadores profesionales del circuito. La mayoría de prendas usan poliéster o mezclas con elastano pensadas para evacuar el sudor, aunque también encontrarás alguna opción de algodón para partidos recreativos de baja intensidad. Usa el ordenador de arriba para explorar por precio o valoración, y revisa la tabla de tallas de cada producto antes de comprar, ya que la ropa técnica suele tallar más ajustada que una prenda de algodón normal. El extra de precio de las camisetas oficiales suele deberse a la licencia de marca y el diseño asociado al jugador, no a un tejido técnicamente superior al resto del catálogo de la misma gama.",
    metaDescription: "Catálogo completo de ropa técnica de pádel: camisetas, faldas y prendas oficiales. Filtra y compara antes de elegir.",
    faqs: [
      {
        question: "¿Qué diferencia hay entre este listado y la guía de mejores camisetas?",
        answer:
          "Este listado incluye todas las prendas del catálogo —camisetas, faldas y el resto—, mientras que la guía de mejores camisetas de pádel se centra solo en esa prenda concreta, ordenada por valoración editorial.",
      },
      {
        question: "¿Qué talla debería pedir?",
        answer:
          "La ropa técnica de pádel suele tallar más ajustada que una prenda de algodón normal, así que si dudas entre dos tallas, conviene revisar la tabla de medidas específica del producto antes de guiarte solo por tu talla habitual.",
      },
    ],
    guideSlugs: ["mejores-camisetas-padel"],
  },
  accesorios: {
    intro:
      "Aquí puedes ver y filtrar todo nuestro catálogo de accesorios de pádel: grips antivibración, artículos para regalo y otros complementos que no encajan en las categorías principales de equipación. Son productos que suelen complementar una decisión ya tomada (pala, zapatillas) más que sustituirla, y varían mucho en precio y en cuánto dependen del gusto personal de cada jugador. Usa el ordenador de arriba para explorar por precio o valoración, sobre todo si buscas una idea de regalo para alguien sin conocer bien su nivel o sus preferencias exactas. Los accesorios genéricos (gorra, toalla) son un acierto casi seguro como regalo; los más técnicos (grip antivibración) dependen más del gusto y las molestias físicas concretas de cada jugador, así que conviene conocer bien a la persona antes de elegirlos.",
    metaDescription: "Catálogo completo de accesorios de pádel: grips, ideas de regalo y complementos. Filtra y compara antes de elegir.",
    faqs: [
      {
        question: "¿Qué diferencia hay entre este listado y la guía de ideas de regalo?",
        answer:
          "Este listado muestra todo el catálogo de accesorios para que compares por tu cuenta. La guía de ideas de regalo para jugadores de pádel es una selección curada, ordenada de la opción más segura (gorra, toalla) a la que requiere conocer mejor a la persona (overgrips, pala).",
      },
    ],
    guideSlugs: ["regalos-para-jugadores-de-padel"],
  },
};
