import { describe, expect, it } from "vitest";
import {
  getProfileReadiness,
  getProviderReachPromise,
  getPublicDisplayName,
  toPublicSupplyProfile,
  type SupplyProfile,
} from "./profiles";

const baseInstructor: SupplyProfile = {
  kind: "independentInstructor",
  firstName: "Marta",
  lastName: "Ribas",
  resortsServed: ["baqueira"],
  sportsTaught: ["ski"],
  lessonTypes: ["private"],
  languages: ["es", "en"],
  startingPrice: { amount: 70, currency: "EUR", unit: "hour" },
  availabilityPattern: "usuallyAvailable",
  internalContact: {
    email: "marta@example.test",
    phone: "+34000000000",
  },
};

describe("B3 provider reach promise", () => {
  it("leads with more clients and lower marketing burden", () => {
    const promise = getProviderReachPromise();

    expect(promise.headline).toContain("Get found by lesson clients");
    expect(promise.headline).toContain("without becoming a content creator");
    expect(promise.benefits).toEqual(
      expect.arrayContaining([
        "more qualified clients",
        "less marketing/admin complexity",
        "fair commission when LocalSnow brings work",
      ]),
    );
    expect(promise.avoidClaims.join(" ")).toMatch(/guaranteed clients/i);
  });
});

describe("B3 public display names", () => {
  it("defaults independent instructors to first name plus surname initial", () => {
    expect(getPublicDisplayName(baseInstructor)).toBe("Marta R.");
  });

  it("uses an explicit professional public name when provided", () => {
    expect(
      getPublicDisplayName({
        ...baseInstructor,
        publicDisplayName: "Marta Ribas Ski Coaching",
      }),
    ).toBe("Marta Ribas Ski Coaching");
  });

  it("uses school/provider business names publicly", () => {
    expect(
      getPublicDisplayName({
        ...baseInstructor,
        kind: "schoolProvider",
        businessName: "Baqueira Mountain School",
      }),
    ).toBe("Baqueira Mountain School");
  });
});

describe("B3 profile readiness", () => {
  it("marks complete profiles as needing LocalSnow review before publication", () => {
    expect(getProfileReadiness(baseInstructor)).toEqual({
      state: "needsReview",
      missing: [],
    });
  });

  it("requires a real public name before LocalSnow review", () => {
    expect(
      getProfileReadiness({
        ...baseInstructor,
        firstName: undefined,
        lastName: undefined,
        publicDisplayName: undefined,
      }),
    ).toEqual({
      state: "draft",
      missing: ["public display name"],
    });
  });

  it("keeps incomplete profiles in draft with specific missing facts", () => {
    expect(
      getProfileReadiness({
        ...baseInstructor,
        resortsServed: [],
        startingPrice: undefined,
      }),
    ).toEqual({
      state: "draft",
      missing: ["resorts served", "starting price or price-on-request"],
    });
  });
});

describe("B3 public supply profile", () => {
  it("never exposes direct contact details to public visitors", () => {
    const publicProfile = toPublicSupplyProfile(baseInstructor);

    expect(publicProfile.displayName).toBe("Marta R.");
    expect(publicProfile).not.toHaveProperty("internalContact");
    expect(JSON.stringify(publicProfile)).not.toContain("marta@example.test");
    expect(JSON.stringify(publicProfile)).not.toContain("+34000000000");
  });
});
