import { fail } from "@sveltejs/kit";
import {
  buildContactRequestDraft,
  validateHelpForm,
  type HelpIntentId,
  type HelpLocale,
} from "./helpIntents";
import { loadHelpPageData } from "./helpPageData";

export const loadHelpRoute = (locale: HelpLocale) => () =>
  loadHelpPageData(locale);

export const helpActions = (locale: HelpLocale) => ({
  prepareWhatsAppHandoff: async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const intent = (formData.get("intent") ||
      "assistedLessonHelp") as HelpIntentId;
    const result = validateHelpForm(formData, intent, locale);

    if (!result.ok) {
      return fail(400, result);
    }

    return {
      ok: true,
      request: result.value,
      values: {
        name: result.value.name,
        contact: result.value.contact,
        resort: result.value.resort ?? "",
        dates: result.value.dates ?? "",
        sport: result.value.sport ?? "",
        people: result.value.people ?? "",
        level: result.value.level ?? "",
        preferredLanguage: result.value.preferredLanguage ?? "",
        message: result.value.message ?? "",
      },
      draft: buildContactRequestDraft(result.value),
      message:
        locale === "es"
          ? "Mensaje preparado. Ábrelo en WhatsApp para hablar con LocalSnow."
          : "Message prepared. Open it in WhatsApp to talk with LocalSnow.",
    };
  },
});
