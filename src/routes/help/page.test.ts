import { describe, expect, it } from "vitest";
import { load as loadEnglish } from "./+page.server";
import { load as loadSpanish } from "../es/ayuda/+page.server";

const collectStrings = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
};

describe("help/contact pages", () => {
  it("loads an English help router led by assisted lesson help, not generic contact", () => {
    const data = loadEnglish();

    expect(data.locale).toBe("en");
    expect(data.meta.title).toBe("Help me find a ski lesson — LocalSnow");
    expect(data.hero.headline).toBe("Don’t spend time searching");
    expect(data.hero.primaryCta).toBe("Talk on WhatsApp");
    expect(data.intentOptions[0].id).toBe("assistedLessonHelp");
    expect(data.intentOptions[0].headline).toContain(
      "Don’t spend time searching",
    );
    expect(data.schema.frontend.surfaces).toContain("intent selector");
    expect(data.schema.backend.records).toContain("ContactRequest");
    expect(data.schema.api.actions).toContain("prepareWhatsAppHandoff");
  });

  it("loads a Spanish help router with the WhatsApp-assisted lesson path", () => {
    const data = loadSpanish();

    expect(data.locale).toBe("es");
    expect(data.meta.title).toBe("Ayúdame a encontrar clase — LocalSnow");
    expect(data.hero.headline).toBe("No pierdas tiempo buscando");
    expect(data.hero.primaryCta).toBe("Hablar por WhatsApp");
    expect(data.intentOptions[0].id).toBe("assistedLessonHelp");
    expect(data.intentOptions[0].headline).toContain(
      "No pierdas tiempo buscando",
    );
  });

  it("keeps public copy benefit-led and forbids internal maturity language", () => {
    const visibleText = collectStrings([loadEnglish(), loadSpanish()])
      .join("\n")
      .toLowerCase();

    expect(visibleText).toContain("person");
    expect(visibleText).toContain("persona");
    expect(visibleText).toContain("guaranteed booking");
    expect(visibleText).toContain("reserva garantizada");
    expect(visibleText).not.toMatch(
      /manual backend|automation|bot|still figuring|support ticket|crm|workflow engine|personal phone/,
    );
  });
});
