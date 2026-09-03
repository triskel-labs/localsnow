import { describe, expect, it } from "vitest";
import { getPublicPage, publicPages } from "./publicPages";
import { isPubliclyBrowsable, resolveSeoPolicy } from "./seoPolicy";

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

  it("frames provider acquisition around reach without marketing burden", () => {
    const supplyPage = getPublicPage("/instructors/join");

    expect(supplyPage?.description).toContain("more lesson clients");
    expect(supplyPage?.description).toContain(
      "without becoming content creators",
    );
    expect(supplyPage?.summary).toContain("less marketing/admin complexity");
  });
});
