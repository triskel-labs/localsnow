import { describe, expect, it } from "vitest";
import { load as loadHome } from "../+page";
import { load as loadSpain } from "../spain/+page";
import { load as loadBaqueira } from "../spain/baqueira/+page";

describe("assisted lesson help CTA placements", () => {
  it("adds the human-assisted WhatsApp path to the home page", () => {
    const data = loadHome();

    expect(data.assistedHelp).toMatchObject({
      headline: "Don’t spend time searching",
      primaryCta: "Talk on WhatsApp",
      href: "/help?intent=assistedLessonHelp&source=homeHero",
    });
  });

  it("adds the Spanish assisted help path to market and resort pages", () => {
    expect(loadSpain().assistedHelp).toMatchObject({
      headline: "¿No encuentras justo lo que necesitas?",
      primaryCta: "Hablar por WhatsApp",
      href: "/es/ayuda?motivo=ayudaClase&origen=resortThinSupply",
    });

    expect(loadBaqueira().assistedHelp).toMatchObject({
      headline: "¿No encuentras justo lo que necesitas?",
      primaryCta: "Hablar por WhatsApp",
    });
  });
});
