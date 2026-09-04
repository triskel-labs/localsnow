import { describe, expect, it } from "vitest";
import {
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
        "form submission actions",
        "file uploads",
        "payment collection",
        "availability engine",
      ]),
    );
  });

  it("asks independent instructors for their own price signal", () => {
    const required = getRequiredIntakeFieldKeys("independentInstructor");

    expect(required).toEqual(
      expect.arrayContaining([
        "publicName",
        "resortsServed",
        "sportsTaught",
        "lessonTypes",
        "languages",
        "startingPriceOrPriceOnRequest",
        "localSnowContact",
      ]),
    );
    expect(required).not.toContain("schoolAffiliation");
  });

  it("asks schools for school-level commercial facts", () => {
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
  });

  it("lets school-affiliated instructor intake inherit commercial facts from the school", () => {
    const contract = getProfileIntakeContract("schoolAffiliatedInstructor");
    const required = getRequiredIntakeFieldKeys("schoolAffiliatedInstructor");

    expect(required).toEqual(
      expect.arrayContaining([
        "publicName",
        "resortsServed",
        "sportsTaught",
        "lessonTypes",
        "languages",
        "schoolAffiliation",
        "localSnowContact",
      ]),
    );
    expect(required).not.toContain("startingPriceOrPriceOnRequest");
    expect(contract.commercialRule).toBe(
      "Services and prices are inherited from the school by default.",
    );
  });

  it("keeps LocalSnow contact and source notes out of public preview fields", () => {
    const publicKeys = getPublicPreviewFieldKeys("independentInstructor");

    expect(publicKeys).toEqual(
      expect.arrayContaining([
        "publicName",
        "resortsServed",
        "sportsTaught",
        "lessonTypes",
        "languages",
      ]),
    );
    expect(publicKeys).not.toContain("localSnowContact");
    expect(publicKeys).not.toContain("operatorSourceNote");
  });
});
