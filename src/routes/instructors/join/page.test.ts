import { describe, expect, it } from "vitest";
import { load } from "./+page";

const collectStrings = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
};

describe("/instructors/join provider page", () => {
  it("reads like a founding-provider invitation instead of an internal draft boundary", () => {
    const data = load();

    expect(data.hero.eyebrow).toBe("Teach with LocalSnow");
    expect(data.hero.headline).toContain(
      "Get found by ski and snowboard clients",
    );
    expect(data.primaryCta.label).toBe("Prepare my LocalSnow profile");
    expect(data.sections.map((section) => section.id)).toEqual([
      "why",
      "profile",
      "review",
    ]);
  });

  it("does not mention referrals, invitation codes, or internal implementation mechanics", () => {
    const visibleText = collectStrings(load()).join("\n").toLowerCase();

    expect(visibleText).not.toMatch(
      /referral|refer|invitation code|invite code/,
    );
    expect(visibleText).not.toMatch(
      /b3|draft boundary|auth|database|mutation|persistence|scaffold/,
    );
  });
});
