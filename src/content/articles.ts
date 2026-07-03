import type { Article } from "@/engine/types";

export const articles: Article[] = [
  {
    slug: "como-elegir-tu-primera-pala-de-padel",
    title: "Cómo elegir tu primera pala de pádel",
    h1: "Cómo elegir tu primera pala de pádel: guía para principiantes",
    excerpt:
      "Elegir la primera pala genera muchas dudas: forma, balance, peso, dureza... En esta guía explicamos qué mirar realmente cuando empiezas a jugar y qué errores evitar.",
    category: "Guías",
    coverImage: "/images/articles/article-placeholder.svg",
    author: "Redacción Pádel Total",
    publishedAt: "2026-03-01",
    updatedAt: "2026-06-05",
    readingMinutes: 6,
    sections: [
      {
        heading: "No compres la pala más cara que puedas permitirte",
        content:
          "Es el error más habitual: pensar que una pala de gama alta va a compensar la falta de técnica. Las palas de potencia de balance alto son, precisamente, las más exigentes de manejar. Como principiante vas a disfrutar más y progresar más rápido con una pala de balance bajo o medio, ligera y de tacto blando.",
      },
      {
        heading: "Forma redonda: la mejor aliada al empezar",
        content:
          "Las palas de forma redonda concentran el peso cerca del mango, lo que amplía el punto dulce y perdona mucho los golpes descentrados, algo inevitable cuando se está aprendiendo la técnica básica.",
      },
      {
        heading: "Cuidado con el peso y la dureza si notas molestias",
        content:
          "Si notas algo de sensibilidad en el codo o la muñeca, prioriza palas ligeras (340-350g) con núcleo de goma blanda. El sobreesfuerzo con una pala dura y pesada es una causa común de la temida epicondilitis del pádel.",
      },
      {
        heading: "No hace falta gastar mucho para empezar bien",
        content:
          "Hay palas de iniciación muy competentes por debajo de 100€. Nuestra recomendación es empezar con una pala de este rango y, pasados unos meses, dar el salto a una pala de gama media cuando ya tengas claro tu estilo de juego.",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto dura una pala de pádel?",
        answer: "Con un uso de 2-3 veces por semana, una pala suele mantener sus prestaciones entre 1 y 2 años antes de empezar a perder tacto.",
      },
      {
        question: "¿Necesito una pala distinta si soy mujer?",
        answer: "No es imprescindible, pero muchas jugadoras prefieren palas más ligeras; puedes filtrar por ese criterio en nuestro selector de pala.",
      },
    ],
    relatedSlugs: ["mejores-palas-principiantes", "mejores-palas-menos-de-100"],
  },
];
