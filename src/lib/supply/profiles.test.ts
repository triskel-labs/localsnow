import { describe, expect, it } from "vitest";
import {
  canBeOperatorCreated,
  getProfileReadiness,
  getProviderReachPromise,
  getPublicDisplayName,
  toPublicSupplyProfile,
  type ProfileKind,
  type SupplyProfile,
} from "./profiles";

const baseInstructor: SupplyProfile = {
  kind: "independentInstructor",
  source: "providerSubmitted",
  claimStatus: "claimed",
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
    phone: "+340****0000",
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

  it("uses business names publicly for schools and other provider types", () => {
    expect(
      getPublicDisplayName({
        ...baseInstructor,
        kind: "schoolProvider",
        businessName: "Baqueira Mountain School",
      }),
    ).toBe("Baqueira Mountain School");
  });
});

describe("B3 operator-created supply", () => {
  it("allows manual creation for legitimate provider/listing types", () => {
    const kinds: ProfileKind[] = [
      "independentInstructor",
      "schoolProvider",
      "guideProvider",
      "academyProvider",
      "otherLessonProvider",
    ];

    expect(kinds.every(canBeOperatorCreated)).toBe(true);
  });

  it("requires operator-created profiles to carry an internal source note", () => {
    expect(
      getProfileReadiness({
        ...baseInstructor,
        source: "operatorCreated",
        claimStatus: "unclaimed",
        internalSourceNote: undefined,
      }),
    ).toEqual({
      state: "draft",
      missing: ["operator source note"],
    });
  });
});

describe("B3 profile readiness", () => {
  it("marks complete profiles as needing LocalSnow review before publication", () => {
    expect(getProfileReadiness(baseInstructor)).toEqual({
      state: "needsReview",
      missing: [],
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
  it("never exposes direct contact details or internal source notes to public visitors", () => {
    const publicProfile = toPublicSupplyProfile({
      ...baseInstructor,
      source: "operatorCreated",
      claimStatus: "unclaimed",
      internalSourceNote:
        "Created from public school website for Baqueira seed directory.",
      internalContact: {
        email: "marta@example.test",
        phone: "+340****0000",
        website: "https://example.test",
      },
    });

    expect(publicProfile.displayName).toBe("Marta R.");
    expect(publicProfile.claimStatus).toBe("unclaimed");
    expect(publicProfile).not.toHaveProperty("internalContact");
    expect(publicProfile).not.toHaveProperty("internalSourceNote");
    expect(JSON.stringify(publicProfile)).not.toContain("marta@example.test");
    expect(JSON.stringify(publicProfile)).not.toContain("+340****0000");
    expect(JSON.stringify(publicProfile)).not.toContain("example.test");
  });
});
