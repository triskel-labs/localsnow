import { describe, expect, it } from "vitest";
import {
  ASSISTED_LESSON_WHATSAPP_NUMBER,
  buildAssistedLessonWhatsAppUrl,
  buildContactRequestDraft,
  getHelpIntent,
  getHelpIntentOptions,
  getHelpPlacement,
  validateHelpForm,
} from "./helpIntents";

const collectStrings = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
};

describe("help/contact intent router", () => {
  it("separates assisted lesson help from payment, lesson issue, provider, and general contact intents", () => {
    expect(getHelpIntentOptions("en").map((intent) => intent.id)).toEqual([
      "assistedLessonHelp",
      "paymentGuaranteeQuestion",
      "lessonIssue",
      "providerQuestion",
      "generalContact",
    ]);

    const assisted = getHelpIntent("assistedLessonHelp", "en");
    expect(assisted.headline).toContain("Don’t spend time searching");
    expect(assisted.primaryChannel).toBe("whatsapp");
    expect(assisted.allowedNextActions).toEqual([
      "selfManagedInquiry",
      "guaranteedBooking",
      "operatorRecommendation",
    ]);

    const payment = getHelpIntent("paymentGuaranteeQuestion", "en");
    expect(payment.primaryChannel).toBe("form");
    expect(payment.allowedNextActions).not.toContain("guaranteedBooking");
  });

  it("uses the approved WhatsApp Business channel with a conversion-oriented assisted lesson prefill", () => {
    expect(ASSISTED_LESSON_WHATSAPP_NUMBER).toBe("34611354189");

    const url = buildAssistedLessonWhatsAppUrl(
      {
        resort: "Baqueira",
        dates: "15-17 Feb",
        sport: "ski",
        people: "2 adults",
        level: "beginner",
        preferredLanguage: "English",
        notes: "We want someone to manage this, not browse forever.",
      },
      "en",
    );

    expect(url).toMatch(/^https:\/\/wa\.me\/34611354189\?text=/);
    const message = decodeURIComponent(url.split("text=")[1]);
    expect(message).toContain("I don’t want to spend time searching");
    expect(message).toContain("Resort: Baqueira");
    expect(message).toContain("Dates: 15-17 Feb");
    expect(message).toContain("Preferred language: English");
    expect(message).not.toMatch(
      /manual backend|automation|bot|personal phone/i,
    );
  });

  it("validates contact/help form input without turning every contact into a booking", () => {
    const invalid = validateHelpForm(
      new FormData(),
      "assistedLessonHelp",
      "en",
    );
    expect(invalid.ok).toBe(false);
    if (invalid.ok) throw new Error("expected invalid help form");
    expect(invalid.fieldErrors).toMatchObject({
      name: "Tell us your name.",
      contact: "Add WhatsApp, phone or email so LocalSnow can reply.",
      resort: "Add the resort or area you are considering.",
      dates: "Add your lesson dates or date window.",
    });

    const form = new FormData();
    form.set("name", "Marta");
    form.set("contact", "+34 600 000 000");
    form.set("resort", "Baqueira");
    form.set("dates", "next weekend");
    form.set("sport", "ski");
    form.set("people", "3");
    form.set("level", "mixed");
    form.set("message", "We want a person to listen and choose the best path.");

    const valid = validateHelpForm(form, "assistedLessonHelp", "en");
    expect(valid.ok).toBe(true);
    if (!valid.ok) return;
    expect(valid.value.intent).toBe("assistedLessonHelp");
    expect(valid.value.nextAction).toBe("whatsappHandoff");

    const draft = buildContactRequestDraft(valid.value);
    expect(draft.recordType).toBe("ContactRequest");
    expect(draft.linkedCommercialRecord).toBeUndefined();
    expect(draft.status).toBe("new");
  });

  it("defines contextual CTA placements for discovery surfaces without support-ticket wording", () => {
    expect(getHelpPlacement("homeHero", "en")).toMatchObject({
      headline: "Don’t spend time searching",
      primaryCta: "Talk on WhatsApp",
      secondaryCta: "Browse options myself",
      href: "/help?intent=assistedLessonHelp&source=homeHero",
    });

    expect(getHelpPlacement("resortThinSupply", "es")).toMatchObject({
      headline: "¿No encuentras justo lo que necesitas?",
      primaryCta: "Hablar por WhatsApp",
      href: "/es/ayuda?motivo=ayudaClase&origen=resortThinSupply",
    });

    const visibleText = collectStrings([
      getHelpIntentOptions("en"),
      getHelpIntentOptions("es"),
      getHelpPlacement("homeHero", "en"),
      getHelpPlacement("resortThinSupply", "es"),
    ])
      .join("\n")
      .toLowerCase();

    expect(visibleText).not.toMatch(
      /support ticket|manual backend|automation|still figuring|crm|workflow engine/,
    );
  });
});
