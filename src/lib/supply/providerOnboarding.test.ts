import { describe, expect, it } from "vitest";
import {
  getProviderOnboardingFlow,
  getProviderOnboardingFlowForPath,
} from "./providerOnboarding";

describe("B3.4 provider onboarding draft flow", () => {
  it("turns the intake contract into platform onboarding steps", () => {
    const flow = getProviderOnboardingFlow();

    expect(flow.status).toBe("draftPlatformFlow");
    expect(flow.pathLabel).toBe("Independent instructor");
    expect(flow.notIncluded).toEqual(
      expect.arrayContaining([
        "account creation",
        "database writes",
        "email delivery",
        "payment collection",
      ]),
    );
    expect(flow.steps.map((step) => step.id)).toEqual([
      "chooseProviderPath",
      "privateIdentity",
      "publicProfile",
      "starterCommercialOffer",
      "localSnowReview",
    ]);
  });

  it("keeps legal identity private while allowing a public display name", () => {
    const flow = getProviderOnboardingFlowForPath("independentInstructor");
    const privateIdentity = flow.steps.find(
      (step) => step.id === "privateIdentity",
    );
    const publicProfile = flow.steps.find(
      (step) => step.id === "publicProfile",
    );

    expect(privateIdentity?.fieldKeys).toEqual(
      expect.arrayContaining(["legalFirstName", "legalSurnames"]),
    );
    expect(publicProfile?.fieldKeys).toContain("publicDisplayName");
    expect(publicProfile?.fieldKeys).not.toContain("legalFirstName");
    expect(publicProfile?.fieldKeys).not.toContain("legalSurnames");
  });

  it("asks independent instructors to create a starter offer before a full offer builder", () => {
    const flow = getProviderOnboardingFlowForPath("independentInstructor");
    const offerStep = flow.steps.find(
      (step) => step.id === "starterCommercialOffer",
    );

    expect(offerStep?.fieldKeys).toEqual(
      expect.arrayContaining([
        "starterLessonOffer",
        "startingPriceOrPriceOnRequest",
      ]),
    );
    expect(offerStep?.boundary).toContain("not the full offer builder");
  });

  it("keeps school-affiliated instructor prices inherited from the school", () => {
    const flow = getProviderOnboardingFlowForPath("schoolAffiliatedInstructor");
    const offerStep = flow.steps.find(
      (step) => step.id === "starterCommercialOffer",
    );

    expect(offerStep?.fieldKeys).toContain("schoolAffiliation");
    expect(offerStep?.fieldKeys).not.toContain("starterLessonOffer");
    expect(offerStep?.fieldKeys).not.toContain("startingPriceOrPriceOnRequest");
    expect(offerStep?.summary).toContain("inherits school services and prices");
  });

  it("makes the next platform boundary explicit", () => {
    const flow = getProviderOnboardingFlow();

    expect(flow.nextBuildDecision).toBe(
      "wire this draft flow to persistence, auth and review actions only after Moli approves the platform flow shape",
    );
  });
});
