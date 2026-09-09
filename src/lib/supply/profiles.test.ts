import { describe, expect, it } from "vitest";
import {
  canBeOperatorCreated,
  getOfferOwnershipForProfile,
  getProfileReadiness,
  getProviderReachPromise,
  getPublicDisplayName,
  toPublicSupplyProfile,
  type ProfileKind,
  type SupplyProfile,
} from "./profiles";

const baseInstructor: SupplyProfile = {
  id: "profile_marta",
  kind: "independentInstructor",
  source: "providerSubmitted",
  claimStatus: "claimed",
  affiliation: { type: "independent" },
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

const baseSchool: SupplyProfile = {
  id: "profile_baqueira_school",
  kind: "schoolProvider",
  source: "operatorCreated",
  claimStatus: "unclaimed",
  affiliation: { type: "independent" },
  businessName: "Baqueira Mountain School",
  resortsServed: ["baqueira"],
  sportsTaught: ["ski", "snowboard"],
  lessonTypes: ["private", "group", "kids"],
  languages: ["es", "en"],
  startingPrice: { amount: 85, currency: "EUR", unit: "hour" },
  internalContact: {
    website: "https://example-school.test",
  },
  internalSourceNote:
    "Created from public school website for Baqueira seed directory.",
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
    expect(promise.benefitCopy).toMatchObject({
      qualifiedClients: "more qualified clients",
      lowerMarketingAdmin: "less marketing/admin complexity",
      fairCommission: "fair commission when LocalSnow brings work",
    });
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

  it("uses school business names publicly", () => {
    expect(getPublicDisplayName(baseSchool)).toBe("Baqueira Mountain School");
  });
});

describe("B3 profile kinds and school affiliation", () => {
  it("keeps v1 profile kinds to independent instructors and schools", () => {
    const kinds: ProfileKind[] = ["independentInstructor", "schoolProvider"];

    expect(kinds.every(canBeOperatorCreated)).toBe(true);
  });

  it("lets school-affiliated instructors have profiles while inheriting school offers", () => {
    const affiliatedInstructor: SupplyProfile = {
      ...baseInstructor,
      id: "profile_ana",
      firstName: "Ana",
      lastName: "Soldevila",
      affiliation: {
        type: "schoolAffiliated",
        schoolProfileId: baseSchool.id!,
        inheritsSchoolOffers: true,
      },
      startingPrice: undefined,
      priceOnRequest: undefined,
    };

    expect(getProfileReadiness(affiliatedInstructor)).toEqual({
      state: "needsReview",
      missing: [],
    });
    expect(getOfferOwnershipForProfile(affiliatedInstructor)).toEqual({
      ownerKind: "schoolProvider",
      ownerProfileId: "profile_baqueira_school",
      inheritedByProfileIds: ["profile_ana"],
    });
  });

  it("keeps independent instructors as owners of their own offers", () => {
    expect(getOfferOwnershipForProfile(baseInstructor)).toEqual({
      ownerKind: "independentInstructor",
      ownerProfileId: "profile_marta",
    });
  });

  it("keeps schools as owners of school-level offers", () => {
    expect(getOfferOwnershipForProfile(baseSchool)).toEqual({
      ownerKind: "schoolProvider",
      ownerProfileId: "profile_baqueira_school",
    });
  });
});

describe("B3 operator-created supply", () => {
  it("requires operator-created profiles to carry an internal source note", () => {
    expect(
      getProfileReadiness({
        ...baseSchool,
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

  it("does not require separate prices for school-affiliated instructor profiles", () => {
    expect(
      getProfileReadiness({
        ...baseInstructor,
        affiliation: {
          type: "schoolAffiliated",
          schoolProfileId: "profile_baqueira_school",
          inheritsSchoolOffers: true,
        },
        startingPrice: undefined,
      }),
    ).toEqual({
      state: "needsReview",
      missing: [],
    });
  });
});

describe("B3 public supply profile", () => {
  it("never exposes direct contact details or internal source notes to public visitors", () => {
    const publicProfile = toPublicSupplyProfile({
      ...baseSchool,
      internalContact: {
        email: "school@example.test",
        phone: "+340****0000",
        website: "https://example-school.test",
      },
    });

    expect(publicProfile.displayName).toBe("Baqueira Mountain School");
    expect(publicProfile.claimStatus).toBe("unclaimed");
    expect(publicProfile).not.toHaveProperty("internalContact");
    expect(publicProfile).not.toHaveProperty("internalSourceNote");
    expect(JSON.stringify(publicProfile)).not.toContain("school@example.test");
    expect(JSON.stringify(publicProfile)).not.toContain("+340****0000");
    expect(JSON.stringify(publicProfile)).not.toContain("example-school.test");
  });

  it("does not expose inherited school pricing as instructor-owned pricing", () => {
    const publicProfile = toPublicSupplyProfile({
      ...baseInstructor,
      affiliation: {
        type: "schoolAffiliated",
        schoolProfileId: "profile_baqueira_school",
        inheritsSchoolOffers: true,
      },
      startingPrice: { amount: 999, currency: "EUR", unit: "hour" },
      priceOnRequest: true,
    });

    expect(publicProfile.affiliation.type).toBe("schoolAffiliated");
    expect(publicProfile.startingPrice).toBeUndefined();
    expect(publicProfile.priceOnRequest).toBeUndefined();
  });

  it("copies public projection arrays and objects away from the internal profile", () => {
    const internalProfile: SupplyProfile = {
      ...baseInstructor,
      affiliation: { type: "independent" },
      resortsServed: ["baqueira"],
      sportsTaught: ["ski"],
      lessonTypes: ["private"],
      languages: ["es", "en"],
      startingPrice: { amount: 70, currency: "EUR", unit: "hour" },
    };
    const publicProfile = toPublicSupplyProfile(internalProfile);

    expect(publicProfile.affiliation).not.toBe(internalProfile.affiliation);
    expect(publicProfile.resortsServed).not.toBe(internalProfile.resortsServed);
    expect(publicProfile.sportsTaught).not.toBe(internalProfile.sportsTaught);
    expect(publicProfile.lessonTypes).not.toBe(internalProfile.lessonTypes);
    expect(publicProfile.languages).not.toBe(internalProfile.languages);
    expect(publicProfile.startingPrice).not.toBe(internalProfile.startingPrice);

    internalProfile.resortsServed.push("cerler");
    internalProfile.startingPrice!.amount = 999;

    expect(publicProfile.resortsServed).toEqual(["baqueira"]);
    expect(publicProfile.startingPrice?.amount).toBe(70);
  });
});
