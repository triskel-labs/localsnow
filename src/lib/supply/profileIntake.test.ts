import { describe, expect, it } from "vitest";
import {
  buildDefaultPublicDisplayName,
  getProfileIntakeContract,
  getProfileIntakeContracts,
  getPublicPreviewFieldKeys,
  getRequiredIntakeFieldKeys,
} from "./profileIntake";

describe("B3.3 profile intake contract", () => {
  it("defines an intake contract for each setup path without adding persistence", () => {
    const contracts = getProfileIntakeContracts();

    expect(contracts.map((contract) => contract.pathId)).toEqual([
      "independentInstructor",
      "schoolProvider",
      "schoolAffiliatedInstructor",
    ]);
    expect(contracts.flatMap((contract) => contract.notIncluded)).toEqual(
      expect.arrayContaining([
        "account creation",
        "database writes",
        "exact database fields or migrations",
        "form submission actions",
        "file uploads",
        "email delivery",
        "payment collection",
        "availability engine",
      ]),
    );
  });

  it("asks independent instructors for legal identity privately and a starter offer signal", () => {
    const required = getRequiredIntakeFieldKeys("independentInstructor");

    expect(required).toEqual(
      expect.arrayContaining([
        "publicDisplayName",
        "legalFirstName",
        "legalSurnames",
        "resortsServed",
        "sportsTaught",
        "lessonTypes",
        "languages",
        "starterLessonOffer",
        "startingPriceOrPriceOnRequest",
        "localSnowContact",
      ]),
    );
    expect(required).not.toContain("schoolAffiliation");
  });

  it("asks schools for school-level commercial facts without personal legal-name fields", () => {
    const required = getRequiredIntakeFieldKeys("schoolProvider");

    expect(required).toEqual(
      expect.arrayContaining([
        "businessName",
        "resortsServed",
        "sportsTaught",
        "lessonTypes",
        "languages",
        "schoolLevelOffer",
        "startingPriceOrPriceOnRequest",
        "localSnowContact",
      ]),
    );
    expect(required).not.toContain("legalFirstName");
    expect(required).not.toContain("legalSurnames");
  });

  it("lets school-affiliated instructor intake inherit commercial facts from the school", () => {
    const contract = getProfileIntakeContract("schoolAffiliatedInstructor");
    const required = getRequiredIntakeFieldKeys("schoolAffiliatedInstructor");

    expect(required).toEqual(
      expect.arrayContaining([
        "publicDisplayName",
        "legalFirstName",
        "legalSurnames",
        "resortsServed",
        "sportsTaught",
        "lessonTypes",
        "languages",
        "schoolAffiliation",
        "localSnowContact",
      ]),
    );
    expect(required).not.toContain("starterLessonOffer");
    expect(required).not.toContain("startingPriceOrPriceOnRequest");
    expect(contract.commercialRule).toBe(
      "Services and prices are inherited from the school by default.",
    );
  });

  it("keeps legal identity, contact and source notes out of public preview fields", () => {
    const publicKeys = getPublicPreviewFieldKeys("independentInstructor");

    expect(publicKeys).toEqual(
      expect.arrayContaining([
        "publicDisplayName",
        "professionalPublicName",
        "resortsServed",
        "sportsTaught",
        "lessonTypes",
        "languages",
      ]),
    );
    expect(publicKeys).not.toContain("legalFirstName");
    expect(publicKeys).not.toContain("legalSurnames");
    expect(publicKeys).not.toContain("localSnowContact");
    expect(publicKeys).not.toContain("operatorSourceNote");
  });

  it("builds the default public display name from the first surname initial", () => {
    expect(
      buildDefaultPublicDisplayName({
        legalFirstName: "David",
        legalSurnames: "Molina García",
      }),
    ).toBe("David M.");
    expect(
      buildDefaultPublicDisplayName({
        legalFirstName: "  Núria  ",
        legalSurnames: "  Álvarez Soler  ",
      }),
    ).toBe("Núria Á.");
    expect(
      buildDefaultPublicDisplayName({
        legalFirstName: "Aina",
        legalSurnames: "",
      }),
    ).toBe("Aina");
  });
});
