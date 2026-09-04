import { describe, expect, it } from "vitest";
import { getPublicPage, navigationPages, publicPages } from "./publicPages";
import {
  isPubliclyBrowsable,
  resolveSeoPolicy,
  routeTreeDecision,
} from "./seoPolicy";

describe("B1 SEO/indexability policy", () => {
  it("keeps indexability in policy rather than route existence", () => {
    const catalogOnly = getPublicPage("/world/catalog-example");

    expect(catalogOnly).toBeDefined();
    expect(catalogOnly?.robots).toBe("noindex,follow");
    expect(catalogOnly && isPubliclyBrowsable(catalogOnly)).toBe(true);
  });

  it("makes Spain priority pages indexable", () => {
    const spain = getPublicPage("/spain");
    const baqueira = getPublicPage("/spain/baqueira");

    expect(spain?.robots).toBe("index,follow");
    expect(baqueira?.robots).toBe("index,follow");
    expect(baqueira?.silo).toBe("spainPriority");
  });

  it("keeps hidden/internal pages out of the public graph", () => {
    const internal = resolveSeoPolicy({
      family: "profile",
      state: "internal",
      silo: "trust",
      marketPriority: "future",
      path: "operator/queue",
      title: "Operator queue",
      description: "Internal operator surface.",
      retrieval: {
        intent: "trustSupport",
        requiredSignals: ["operator"],
        optionalSignals: [],
      },
      copyStatus: "scaffold",
    });

    expect(internal.canonicalPath).toBe("/operator/queue");
    expect(internal.robots).toBe("noindex,nofollow");
    expect(isPubliclyBrowsable(internal)).toBe(false);
  });

  it("defines retrieval contracts for every public page", () => {
    expect(
      publicPages.every((page) => page.retrieval.requiredSignals.length > 0),
    ).toBe(true);
  });

  it("labels B1/B2 page copy as scaffold copy, not launch copy", () => {
    expect(publicPages.every((page) => page.copyStatus === "scaffold")).toBe(
      true,
    );
  });

  it("keeps technical catalog examples out of public navigation", () => {
    expect(navigationPages.map((page) => page.href)).not.toContain(
      "/world/catalog-example",
    );
    expect(getPublicPage("/world/catalog-example")?.robots).toBe(
      "noindex,follow",
    );
  });

  it("locks the final resort SEO tree as resource-first with localized paths", () => {
    expect(routeTreeDecision.strategy).toBe("resourceFirstResortSilo");
    expect(routeTreeDecision.canonicalPattern).toBe(
      "/:locale/resorts/:country/:region?/:resort",
    );
    expect(routeTreeDecision.spanishExample).toBe(
      "/es/estaciones/espana/valle-de-aran/baqueira",
    );
    expect(routeTreeDecision.rejectedPrimaryPattern).toBe(
      "/:locale/:country/resorts/:resort",
    );
    expect(routeTreeDecision.currentB1B2RoutesAreScaffold).toBe(true);
  });

  it("frames provider acquisition around reach without marketing burden", () => {
    const supplyPage = getPublicPage("/instructors/join");

    expect(supplyPage?.description).toContain("more lesson clients");
    expect(supplyPage?.description).toContain(
      "without becoming content creators",
    );
    expect(supplyPage?.summary).toContain("less marketing/admin complexity");
  });
});
