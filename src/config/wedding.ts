/*
 * Datos de la boda de Delia & Juan. Todo el contenido visible de la invitación sale de aquí.
 */

export const WEDDING = {
  bride: "Delia",
  groom: "Juan",
  couple: "Delia & Juan",

  // Barranquilla es UTC-5 todo el año
  dateISO: "2026-11-20T18:30:00-05:00",
  dateLong: "Viernes, 20 de noviembre de 2026",
  dateShort: { day: "20", month: "Noviembre", year: "2026", weekday: "Viernes" },
  time: "6:30 PM",

  venue: {
    name: "Salón de eventos Dayder",
    address: "Calle 76 # 44 - 45",
    city: "Barranquilla",
    mapsQuery: "Salón de Eventos Dayder, Calle 76 # 44 - 45, Barranquilla, Colombia",
  },

  calendar: {
    title: "Boda de Delia & Juan",
    start: "20261120T233000Z",
    end: "20261121T063000Z",
    description: "Celebración de la boda de Delia y Juan en el Salón de eventos Dayder.",
    location: "Salón de eventos Dayder, Calle 76 # 44 - 45, Barranquilla, Atlántico, Colombia",
  },

  guestMessage: [
    "Hay personas que llegan a nuestra historia y, sin saberlo, se convierten en parte de ella.",
    "Hoy queremos compartir contigo uno de los capítulos más importantes de nuestras vidas: el día en que elegiremos caminar juntos para siempre.",
    "Tu presencia hará aún más especial este momento que hemos esperado con tanta ilusión.",
  ],

  coupleQuote: {
    paragraphs: [
      "Creemos que amar no es solamente decir «sí» una vez, sino volver a elegirnos cada día.",
      "Elegirnos con fidelidad, con paciencia y con amor. Elegirnos para crecer, para ser mejores y para construir juntos un hogar donde, al final de cada día, encontremos paz y la certeza de haber escogido a la persona con quien queremos compartir el resto de nuestra vida.",
    ],
    closing: "Que al final de cada día, volver a casa sea volver a elegirnos.",
  },

  dressCode: {
    title: "Etiqueta formal",
    women: "Vestido largo",
    men: "Smoking negro",
    // Colores reservados: se pide a los invitados no usarlos
    reservedTones: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Dorado", hex: "#C9A961" },
      { name: "Azul", hex: "#B3CEE8" },
      { name: "Beige", hex: "#EFE4D2" },
      { name: "Arena", hex: "#D5BD96" },
    ],
  },

  thanks: [
    "Gracias por acompañarnos en este día tan importante, por celebrar nuestro amor y por ser parte de nuestra historia.",
    "Nos hace profundamente felices poder compartir contigo el comienzo de esta nueva etapa y guardar ese momento entre los recuerdos más bonitos de nuestra vida.",
    "Gracias por estar, por celebrar y por acompañarnos en este «sí» que elegimos dar hoy y renovar cada día.",
  ],
} as const;
