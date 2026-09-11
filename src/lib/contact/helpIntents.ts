export type HelpLocale = "en" | "es";

export type HelpIntentId =
  | "assistedLessonHelp"
  | "paymentGuaranteeQuestion"
  | "lessonIssue"
  | "providerQuestion"
  | "generalContact";

export type HelpPrimaryChannel = "whatsapp" | "form" | "email";

export type HelpNextAction =
  | "selfManagedInquiry"
  | "guaranteedBooking"
  | "operatorRecommendation"
  | "paymentClarification"
  | "issueTriage"
  | "providerOnboarding"
  | "generalReply";

export type HelpIntent = {
  id: HelpIntentId;
  label: string;
  headline: string;
  summary: string;
  primaryChannel: HelpPrimaryChannel;
  primaryCta: string;
  secondaryCta?: string;
  href: string;
  allowedNextActions: HelpNextAction[];
  requiredFields: HelpFormField[];
  reassurance: string;
};

export type HelpFormField =
  | "name"
  | "contact"
  | "resort"
  | "dates"
  | "sport"
  | "people"
  | "level"
  | "preferredLanguage"
  | "bookingReference"
  | "message";

export type HelpPlacementId =
  | "homeHero"
  | "resortThinSupply"
  | "resultsDecisionFatigue"
  | "profileReassurance"
  | "guaranteedBookingReassurance";

export type HelpPlacement = {
  id: HelpPlacementId;
  headline: string;
  body: string;
  primaryCta: string;
  secondaryCta?: string;
  href: string;
};

export type AssistedLessonWhatsAppInput = {
  name?: string;
  contact?: string;
  resort?: string;
  dates?: string;
  sport?: string;
  people?: string;
  level?: string;
  preferredLanguage?: string;
  notes?: string;
  source?: string;
};

export type ValidatedHelpRequest = {
  intent: HelpIntentId;
  locale: HelpLocale;
  name: string;
  contact: string;
  resort?: string;
  dates?: string;
  sport?: string;
  people?: string;
  level?: string;
  preferredLanguage?: string;
  bookingReference?: string;
  message?: string;
  source?: string;
  nextAction: "whatsappHandoff" | "formTriage";
  whatsappUrl?: string;
};

export type HelpValidationResult =
  | { ok: true; value: ValidatedHelpRequest }
  | {
      ok: false;
      values: Record<string, string>;
      fieldErrors: Partial<Record<HelpFormField, string>>;
      message: string;
    };

export type ContactRequestDraft = {
  recordType: "ContactRequest";
  intent: HelpIntentId;
  locale: HelpLocale;
  status: "new";
  urgency: "normal" | "soon" | "urgentToday";
  channel: "whatsapp" | "form";
  linkedCommercialRecord?:
    "LessonIntent" | "SelfManagedInquiry" | "GuaranteedBooking";
  operatorSummary: string;
};

export const ASSISTED_LESSON_WHATSAPP_NUMBER = "34611354189";

const helpPath = (intent: HelpIntentId, locale: HelpLocale) => {
  if (locale === "es") {
    const motive = intent === "assistedLessonHelp" ? "ayudaClase" : intent;
    return `/es/ayuda?motivo=${motive}`;
  }

  return `/help?intent=${intent}`;
};

const intentCopy: Record<
  HelpLocale,
  Record<HelpIntentId, Omit<HelpIntent, "id" | "href">>
> = {
  en: {
    assistedLessonHelp: {
      label: "Help me find the right lesson",
      headline: "Don’t spend time searching",
      summary:
        "Tell LocalSnow your resort, dates, level and group. A real person helps you choose the best path: direct inquiry, instructor or school suggestion, or guaranteed booking.",
      primaryChannel: "whatsapp",
      primaryCta: "Talk on WhatsApp",
      secondaryCta: "Browse options myself",
      allowedNextActions: [
        "selfManagedInquiry",
        "guaranteedBooking",
        "operatorRecommendation",
      ],
      requiredFields: ["name", "contact", "resort", "dates"],
      reassurance:
        "This is human-assisted lesson help. It does not become a paid guaranteed booking unless you choose that path deliberately.",
    },
    paymentGuaranteeQuestion: {
      label: "Payment or guarantee question",
      headline: "Ask before you pay",
      summary:
        "Use this if you want clarity about price, guarantee, refund boundary or checkout before choosing the guaranteed booking path.",
      primaryChannel: "form",
      primaryCta: "Send payment question",
      allowedNextActions: ["paymentClarification", "generalReply"],
      requiredFields: ["name", "contact", "message"],
      reassurance:
        "LocalSnow can clarify the guarantee without turning your question into a booking.",
    },
    lessonIssue: {
      label: "Issue with a lesson",
      headline: "Tell us what happened",
      summary:
        "For urgent changes, provider no-response, refund or alternative questions connected to a lesson. WhatsApp is shown when timing matters.",
      primaryChannel: "whatsapp",
      primaryCta: "Report on WhatsApp",
      allowedNextActions: ["issueTriage", "operatorRecommendation"],
      requiredFields: ["name", "contact", "bookingReference", "message"],
      reassurance:
        "If your issue is connected to a paid guaranteed booking, LocalSnow can triage the suitable alternative or refund path.",
    },
    providerQuestion: {
      label: "I am an instructor or school",
      headline: "Teach or list with LocalSnow",
      summary:
        "For professionals who want more lesson clients without managing ads, content or heavy admin software.",
      primaryChannel: "form",
      primaryCta: "Prepare my profile",
      allowedNextActions: ["providerOnboarding", "generalReply"],
      requiredFields: ["name", "contact", "resort", "message"],
      reassurance:
        "Provider questions stay separate from client booking support.",
    },
    generalContact: {
      label: "Something else",
      headline: "Send LocalSnow a clear note",
      summary:
        "Use this for anything that does not fit lesson help, payment, issue or provider onboarding.",
      primaryChannel: "form",
      primaryCta: "Send message",
      allowedNextActions: ["generalReply"],
      requiredFields: ["name", "contact", "message"],
      reassurance:
        "We route the message by intent so it does not get mixed into the booking path.",
    },
  },
  es: {
    assistedLessonHelp: {
      label: "Ayúdame a encontrar clase",
      headline: "No pierdas tiempo buscando",
      summary:
        "Cuéntanos estación, fechas, nivel y grupo. Una persona de LocalSnow te ayuda a elegir la mejor vía: contacto directo, recomendación de instructor o escuela, o reserva garantizada.",
      primaryChannel: "whatsapp",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Buscar por mi cuenta",
      allowedNextActions: [
        "selfManagedInquiry",
        "guaranteedBooking",
        "operatorRecommendation",
      ],
      requiredFields: ["name", "contact", "resort", "dates"],
      reassurance:
        "Esto es ayuda humana para orientar tu clase. No se convierte en una reserva garantizada de pago salvo que elijas esa vía claramente.",
    },
    paymentGuaranteeQuestion: {
      label: "Pregunta sobre pago o garantía",
      headline: "Pregunta antes de pagar",
      summary:
        "Para aclarar precio, garantía, reembolso o checkout antes de elegir la reserva garantizada.",
      primaryChannel: "form",
      primaryCta: "Enviar pregunta",
      allowedNextActions: ["paymentClarification", "generalReply"],
      requiredFields: ["name", "contact", "message"],
      reassurance:
        "LocalSnow puede aclarar la garantía sin convertir tu pregunta en una reserva.",
    },
    lessonIssue: {
      label: "Problema con una clase",
      headline: "Cuéntanos qué ha pasado",
      summary:
        "Para cambios urgentes, falta de respuesta, alternativa o reembolso relacionado con una clase. WhatsApp aparece cuando el tiempo importa.",
      primaryChannel: "whatsapp",
      primaryCta: "Avisar por WhatsApp",
      allowedNextActions: ["issueTriage", "operatorRecommendation"],
      requiredFields: ["name", "contact", "bookingReference", "message"],
      reassurance:
        "Si el problema está conectado con una reserva garantizada pagada, LocalSnow puede orientar la alternativa adecuada o el reembolso.",
    },
    providerQuestion: {
      label: "Soy instructor, escuela o proveedor",
      headline: "Enseña o aparece en LocalSnow",
      summary:
        "Para profesionales que quieren más clientes de clases sin gestionar anuncios, contenido o software pesado.",
      primaryChannel: "form",
      primaryCta: "Preparar mi perfil",
      allowedNextActions: ["providerOnboarding", "generalReply"],
      requiredFields: ["name", "contact", "resort", "message"],
      reassurance:
        "Las consultas de proveedores se mantienen separadas de la ayuda de reserva para clientes.",
    },
    generalContact: {
      label: "Otra consulta",
      headline: "Envía una nota clara a LocalSnow",
      summary:
        "Para cualquier cosa que no encaje con ayuda para clase, pago, incidencia o perfil profesional.",
      primaryChannel: "form",
      primaryCta: "Enviar mensaje",
      allowedNextActions: ["generalReply"],
      requiredFields: ["name", "contact", "message"],
      reassurance:
        "Ordenamos los mensajes por intención para no mezclarlos con la vía de reserva.",
    },
  },
};

export const getHelpIntentOptions = (locale: HelpLocale): HelpIntent[] =>
  (
    [
      "assistedLessonHelp",
      "paymentGuaranteeQuestion",
      "lessonIssue",
      "providerQuestion",
      "generalContact",
    ] satisfies HelpIntentId[]
  ).map((id) => getHelpIntent(id, locale));

export const getHelpIntent = (
  id: HelpIntentId,
  locale: HelpLocale,
): HelpIntent => ({
  id,
  href: helpPath(id, locale),
  ...intentCopy[locale][id],
});

const placementCopy: Record<
  HelpLocale,
  Record<HelpPlacementId, Omit<HelpPlacement, "id" | "href">>
> = {
  en: {
    homeHero: {
      headline: "Don’t spend time searching",
      body: "Tell us your resort, dates, level and group. A person from LocalSnow helps you find the right lesson path.",
      primaryCta: "Talk on WhatsApp",
      secondaryCta: "Browse options myself",
    },
    resortThinSupply: {
      headline: "Can’t find exactly what you need?",
      body: "Send LocalSnow your dates and lesson needs. We can suggest a direct inquiry or a guaranteed booking path.",
      primaryCta: "Talk on WhatsApp",
      secondaryCta: "Keep browsing",
    },
    resultsDecisionFatigue: {
      headline: "Too many options? Or not enough?",
      body: "Tell us the lesson you need and we’ll help you find a suitable option without comparing every listing yourself.",
      primaryCta: "Ask LocalSnow",
      secondaryCta: "Keep filtering",
    },
    profileReassurance: {
      headline: "Not sure if this instructor fits?",
      body: "Ask LocalSnow before choosing. We can listen to your needs and help you decide the safest path.",
      primaryCta: "Ask on WhatsApp",
      secondaryCta: "View lesson options",
    },
    guaranteedBookingReassurance: {
      headline: "Prefer a person to handle it?",
      body: "Share the lesson context and LocalSnow can guide you toward the guaranteed booking path when confidence matters.",
      primaryCta: "Talk to LocalSnow",
      secondaryCta: "Continue booking",
    },
  },
  es: {
    homeHero: {
      headline: "No pierdas tiempo buscando",
      body: "Cuéntanos estación, fechas, nivel y grupo. Una persona de LocalSnow te ayuda a encontrar la vía adecuada.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Buscar por mi cuenta",
    },
    resortThinSupply: {
      headline: "¿No encuentras justo lo que necesitas?",
      body: "Envíanos tus fechas y necesidades. Podemos orientarte hacia contacto directo o reserva garantizada.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Seguir buscando",
    },
    resultsDecisionFatigue: {
      headline: "¿Demasiadas opciones? ¿O muy pocas?",
      body: "Dinos qué clase necesitas y te ayudamos a encontrar una opción adecuada sin comparar todos los perfiles.",
      primaryCta: "Preguntar a LocalSnow",
      secondaryCta: "Seguir filtrando",
    },
    profileReassurance: {
      headline: "¿No sabes si este instructor encaja?",
      body: "Pregúntanos antes de elegir. Podemos escuchar tus necesidades y ayudarte a decidir la vía más segura.",
      primaryCta: "Preguntar por WhatsApp",
      secondaryCta: "Ver opciones",
    },
    guaranteedBookingReassurance: {
      headline: "¿Prefieres que una persona lo gestione?",
      body: "Comparte el contexto de la clase y LocalSnow te orienta hacia la reserva garantizada cuando necesitas más seguridad.",
      primaryCta: "Hablar con LocalSnow",
      secondaryCta: "Continuar reserva",
    },
  },
};

export const getHelpPlacement = (
  id: HelpPlacementId,
  locale: HelpLocale,
): HelpPlacement => {
  const query =
    locale === "es"
      ? "motivo=ayudaClase&origen"
      : "intent=assistedLessonHelp&source";
  const basePath = locale === "es" ? "/es/ayuda" : "/help";

  return {
    id,
    href: `${basePath}?${query}=${id}`,
    ...placementCopy[locale][id],
  };
};

const labels: Record<HelpLocale, Record<string, string>> = {
  en: {
    greeting:
      "Hi LocalSnow, I don’t want to spend time searching. Can you help me find the right lesson?",
    name: "Name",
    contact: "Contact",
    resort: "Resort",
    dates: "Dates",
    sport: "Ski/snowboard",
    people: "People",
    level: "Level",
    preferredLanguage: "Preferred language",
    notes: "Anything important",
    source: "Source",
  },
  es: {
    greeting:
      "Hola LocalSnow, no quiero perder tiempo buscando. ¿Me podéis ayudar a encontrar una clase?",
    name: "Nombre",
    contact: "Contacto",
    resort: "Estación",
    dates: "Fechas",
    sport: "Esquí/snowboard",
    people: "Personas",
    level: "Nivel",
    preferredLanguage: "Idioma preferido",
    notes: "Algo importante",
    source: "Origen",
  },
};

const clean = (value: FormDataEntryValue | string | undefined | null) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

export const buildAssistedLessonWhatsAppMessage = (
  input: AssistedLessonWhatsAppInput,
  locale: HelpLocale,
) => {
  const t = labels[locale];
  const rows = [
    t.greeting,
    "",
    [t.name, input.name],
    [t.contact, input.contact],
    [t.resort, input.resort],
    [t.dates, input.dates],
    [t.sport, input.sport],
    [t.people, input.people],
    [t.level, input.level],
    [t.preferredLanguage, input.preferredLanguage],
    [t.notes, input.notes],
    [t.source, input.source],
  ];

  return rows
    .map((row) => {
      if (typeof row === "string") return row;
      const [label, value] = row;
      return `${label}: ${clean(value)}`;
    })
    .join("\n");
};

export const buildAssistedLessonWhatsAppUrl = (
  input: AssistedLessonWhatsAppInput,
  locale: HelpLocale,
) =>
  `https://wa.me/${ASSISTED_LESSON_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildAssistedLessonWhatsAppMessage(input, locale),
  )}`;

const formLabels: Record<HelpLocale, Partial<Record<HelpFormField, string>>> = {
  en: {
    name: "Tell us your name.",
    contact: "Add WhatsApp, phone or email so LocalSnow can reply.",
    resort: "Add the resort or area you are considering.",
    dates: "Add your lesson dates or date window.",
    bookingReference: "Add the booking or lesson reference if you have one.",
    message: "Tell us what you need.",
  },
  es: {
    name: "Dinos tu nombre.",
    contact: "Añade WhatsApp, teléfono o email para poder responderte.",
    resort: "Añade la estación o zona que estás valorando.",
    dates: "Añade tus fechas o ventana de fechas.",
    bookingReference: "Añade la referencia de reserva o clase si la tienes.",
    message: "Cuéntanos qué necesitas.",
  },
};

const fieldValue = (formData: FormData, field: HelpFormField) =>
  clean(formData.get(field));

export const validateHelpForm = (
  formData: FormData,
  intent: HelpIntentId,
  locale: HelpLocale,
): HelpValidationResult => {
  const helpIntent = getHelpIntent(intent, locale);
  const values: Record<string, string> = {
    name: fieldValue(formData, "name"),
    contact: fieldValue(formData, "contact"),
    resort: fieldValue(formData, "resort"),
    dates: fieldValue(formData, "dates"),
    sport: fieldValue(formData, "sport"),
    people: fieldValue(formData, "people"),
    level: fieldValue(formData, "level"),
    preferredLanguage: fieldValue(formData, "preferredLanguage"),
    bookingReference: fieldValue(formData, "bookingReference"),
    message: fieldValue(formData, "message"),
    source: clean(formData.get("source")),
  };

  const fieldErrors: Partial<Record<HelpFormField, string>> = {};
  for (const field of helpIntent.requiredFields) {
    if (!values[field]) {
      fieldErrors[field] =
        formLabels[locale][field] ?? formLabels[locale].message;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      values,
      fieldErrors,
      message:
        locale === "es"
          ? "Completa los campos clave para que LocalSnow pueda ayudarte."
          : "Complete the key fields so LocalSnow can help you.",
    };
  }

  const nextAction =
    helpIntent.primaryChannel === "whatsapp" ? "whatsappHandoff" : "formTriage";

  const value: ValidatedHelpRequest = {
    intent,
    locale,
    name: values.name,
    contact: values.contact,
    resort: values.resort || undefined,
    dates: values.dates || undefined,
    sport: values.sport || undefined,
    people: values.people || undefined,
    level: values.level || undefined,
    preferredLanguage: values.preferredLanguage || undefined,
    bookingReference: values.bookingReference || undefined,
    message: values.message || undefined,
    source: values.source || undefined,
    nextAction,
  };

  return {
    ok: true,
    value: {
      ...value,
      whatsappUrl:
        nextAction === "whatsappHandoff"
          ? buildAssistedLessonWhatsAppUrl(
              {
                name: value.name,
                contact: value.contact,
                resort: value.resort,
                dates: value.dates,
                sport: value.sport,
                people: value.people,
                level: value.level,
                preferredLanguage: value.preferredLanguage,
                notes: value.message,
                source: value.source,
              },
              locale,
            )
          : undefined,
    },
  };
};

export const buildContactRequestDraft = (
  request: ValidatedHelpRequest,
): ContactRequestDraft => ({
  recordType: "ContactRequest",
  intent: request.intent,
  locale: request.locale,
  status: "new",
  urgency: request.intent === "lessonIssue" ? "soon" : "normal",
  channel: request.nextAction === "whatsappHandoff" ? "whatsapp" : "form",
  operatorSummary: [
    request.name,
    request.intent,
    request.resort,
    request.dates,
    request.message,
  ]
    .filter(Boolean)
    .join(" — "),
});
