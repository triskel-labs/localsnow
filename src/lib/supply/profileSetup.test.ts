import { describe, expect, it } from "vitest";
import {
  getProviderSetupGuide,
  getSetupPathProfileDefaults,
  getSetupPreview,
} from "./profileSetup";

describe("B3.2 provider setup guide", () => {
  it("offers setup paths without expanding v1 profile kinds", () => {
    const guide = getProviderSetupGuide();

    expect(guide.profileKinds).toEqual([
      "independentInstructor",
      "schoolProvider",
    ]);
    expect(guide.paths.map((path) => path.id)).toEqual([
      "independentInstructor",
      "schoolProvider",
      "schoolAffiliatedInstructor",
    ]);
    expect(guide.boundaries.notIncluded).toEqual(
      expect.arrayContaining([
        "account creation",
        "database persistence",
        "profile mutation actions",
        "uploads/media storage",
        "payments",
        "email delivery",
        "availability engine",
        "operator review UI",
      ]),
    );
  });

  it("maps a school-affiliated instructor path to an instructor profile with school-owned offers", () => {
    const defaults = getSetupPathProfileDefaults(
      "schoolAffiliatedInstructor",
      "profile_baqueira_school",
    );

    expect(defaults.kind).toBe("independentInstructor");
    expect(defaults.affiliation).toEqual({
      type: "schoolAffiliated",
      schoolProfileId: "profile_baqueira_school",
      inheritsSchoolOffers: true,
    });
    expect(defaults.priceOnRequest).toBeUndefined();
    expect(defaults.startingPrice).toBeUndefined();
  });

  it("keeps independent instructors as owners of their own commercial offer", () => {
    const preview = getSetupPreview({
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
      internalContact: { email: "marta@example.test" },
    });

    expect(preview.displayName).toBe("Marta R.");
    expect(preview.commercialRule).toBe(
      "This instructor owns their own services and prices.",
    );
    expect(preview.commercialOwner).toEqual({
      ownerKind: "independentInstructor",
      pricingSource: "instructorOwned",
      summary: "Instructor-owned pricing and services.",
    });
    expect(preview.readiness.state).toBe("needsReview");
  });

  it("explains that school-affiliated instructor profiles inherit school services/prices", () => {
    const preview = getSetupPreview({
      id: "profile_ana",
      kind: "independentInstructor",
      source: "providerSubmitted",
      claimStatus: "claimed",
      affiliation: {
        type: "schoolAffiliated",
        schoolProfileId: "profile_baqueira_school",
        inheritsSchoolOffers: true,
      },
      firstName: "Ana",
      lastName: "Soldevila",
      resortsServed: ["baqueira"],
      sportsTaught: ["ski"],
      lessonTypes: ["private"],
      languages: ["es", "en"],
      internalContact: { email: "ana@example.test" },
    });

    expect(preview.displayName).toBe("Ana S.");
    expect(preview.commercialRule).toBe(
      "This instructor appears publicly, but services and prices are inherited from the school.",
    );
    expect(preview.commercialOwner).toEqual({
      ownerKind: "schoolProvider",
      pricingSource: "schoolOwned",
      summary: "School-owned pricing; instructor profile adds trust.",
    });
    expect(JSON.stringify(preview)).not.toContain("profile_baqueira_school");
    expect(JSON.stringify(preview)).not.toContain("profile_ana");
    expect(preview.publicProfile.startingPrice).toBeUndefined();
  });
});
