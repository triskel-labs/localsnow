import {
  buildAssistedLessonWhatsAppUrl,
  getHelpIntentOptions,
  getHelpPlacement,
  type HelpLocale,
} from "./helpIntents";

export type HelpPageData = ReturnType<typeof loadHelpPageData>;

const pageText = {
  en: {
    meta: {
      title: "Help me find a ski lesson — LocalSnow",
      description:
        "Tell LocalSnow what lesson you need and choose the right contact path: assisted lesson help, payment question, lesson issue or provider question.",
      canonicalPath: "/help",
      robots: "index,follow",
    },
    hero: {
      eyebrow: "Human-assisted lesson help",
      headline: "Don’t spend time searching",
      lede: "Speak to a person who can listen to your lesson needs, reduce the options and guide you toward a self-managed inquiry or guaranteed booking.",
      primaryCta: "Talk on WhatsApp",
      secondaryCta: "Choose another reason",
    },
    form: {
      title: "Send the lesson context first",
      intro:
        "Add the minimum details and LocalSnow prepares a WhatsApp message so the conversation starts with useful context.",
      submit: "Prepare WhatsApp message",
    },
    schema: {
      frontend: {
        surfaces: [
          "intent selector",
          "assisted lesson help CTA",
          "context form",
          "WhatsApp handoff",
          "secondary reasons",
        ],
      },
      backend: {
        records: ["ContactRequest", "LessonIntent", "GuaranteedBooking"],
        boundary:
          "The help form validates and prepares contact context; it does not create a booking, payment, or inquiry without a deliberate next action.",
      },
      api: {
        actions: ["prepareWhatsAppHandoff", "validateContactRequest"],
        boundary:
          "No database write, email delivery, payment call, or external booking side effect in this slice.",
      },
    },
  },
  es: {
    meta: {
      title: "Ayúdame a encontrar clase — LocalSnow",
      description:
        "Cuéntale a LocalSnow qué clase necesitas y elige la vía correcta: ayuda humana, pregunta de pago, incidencia o consulta profesional.",
      canonicalPath: "/es/ayuda",
      robots: "index,follow",
    },
    hero: {
      eyebrow: "Ayuda humana para encontrar clase",
      headline: "No pierdas tiempo buscando",
      lede: "Habla con una persona que puede escuchar lo que necesitas, reducir opciones y orientarte hacia contacto directo o reserva garantizada.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Elegir otro motivo",
    },
    form: {
      title: "Envía primero el contexto de la clase",
      intro:
        "Añade los datos mínimos y LocalSnow prepara un mensaje de WhatsApp para empezar la conversación con contexto útil.",
      submit: "Preparar mensaje de WhatsApp",
    },
    schema: {
      frontend: {
        surfaces: [
          "selector de intención",
          "CTA de ayuda para clase",
          "formulario de contexto",
          "handoff a WhatsApp",
          "motivos secundarios",
        ],
      },
      backend: {
        records: ["ContactRequest", "LessonIntent", "GuaranteedBooking"],
        boundary:
          "El formulario de ayuda valida y prepara contexto de contacto; no crea reserva, pago ni consulta sin una acción posterior deliberada.",
      },
      api: {
        actions: ["prepareWhatsAppHandoff", "validateContactRequest"],
        boundary:
          "Sin escritura en base de datos, envío de email, pago ni efecto externo de reserva en este slice.",
      },
    },
  },
} satisfies Record<HelpLocale, object>;

export const loadHelpPageData = (locale: HelpLocale) => {
  const assistedIntent = getHelpIntentOptions(locale)[0];

  return {
    locale,
    ...pageText[locale],
    intentOptions: getHelpIntentOptions(locale),
    assistedWhatsAppUrl: buildAssistedLessonWhatsAppUrl({}, locale),
    assistedPlacement: getHelpPlacement("homeHero", locale),
    assistedIntent,
  };
};
