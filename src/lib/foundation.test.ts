import { describe, expect, it } from "vitest";
import { b0Foundation, getFoundationSummary } from "./foundation";

describe("B0 foundation contract", () => {
  it("names the active scaffold slice", () => {
    expect(b0Foundation.id).toBe("B0");
    expect(getFoundationSummary()).toContain("Technical foundation scaffold");
  });

  it("keeps product features out of the scaffold slice", () => {
    expect(b0Foundation.notIncluded).toEqual(
      expect.arrayContaining([
        "payments",
        "email delivery",
        "availability engine",
      ]),
    );
  });
});
