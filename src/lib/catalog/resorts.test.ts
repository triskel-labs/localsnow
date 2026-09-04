import { describe, expect, it } from "vitest";
import {
  catalogSourceDecision,
  getResortBySlug,
  getResortRobots,
  getResortStatusCopy,
  priorityResorts,
  resortSourcingPolicy,
} from "./resorts";

describe("B2 resort readiness catalog", () => {
  it("keeps the Spain priority resort set explicit", () => {
    expect(priorityResorts.map((resort) => resort.slug)).toEqual([
      "baqueira",
      "la-molina",
      "cerler",
    ]);
  });

  it("does not index thin priority resorts by default", () => {
    const laMolina = getResortBySlug("la-molina");
    const cerler = getResortBySlug("cerler");

    expect(laMolina?.readiness).toBe("publicBasic");
    expect(cerler?.readiness).toBe("publicBasic");
    expect(laMolina && getResortRobots(laMolina)).toBe("noindex,follow");
    expect(cerler && getResortRobots(cerler)).toBe("noindex,follow");
  });

  it("allows priority resorts to be promoted independently", () => {
    const baqueira = getResortBySlug("baqueira");

    expect(baqueira?.readiness).toBe("seoRich");
    expect(baqueira && getResortRobots(baqueira)).toBe("index,follow");
  });

  it("shows supply invitation without claiming real availability", () => {
    for (const resort of priorityResorts) {
      expect(resort.supplyInvitationVisible).toBe(true);
      expect(getResortStatusCopy(resort)).not.toMatch(
        /available now|instant|confirmed/i,
      );
    }
  });

  it("marks the current catalog as seed data, not the final storage model", () => {
    expect(catalogSourceDecision.currentSource).toBe("versionedSeed");
    expect(catalogSourceDecision.finalStorageUndecided).toBe(true);
    expect(catalogSourceDecision.expectedEvolution).toContain(
      "databaseBackedCatalogAdmin",
    );
  });

  it("keeps professional profile creation open while client sourcing stays secondary", () => {
    expect(resortSourcingPolicy.providerProfileCreation).toBe("alwaysOpen");
    expect(resortSourcingPolicy.clientFacingSourcingPlacement).toBe(
      "secondary",
    );
    expect(resortSourcingPolicy.manualSchoolDirectoryListings).toBe(
      "allowedWhenClearlyUnclaimed",
    );
    expect(resortSourcingPolicy.operatorCreatedProfilesAndListings).toBe(
      "allowedForAnyLegitimateProviderType",
    );
  });
});
