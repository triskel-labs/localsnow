import { describe, expect, it } from "vitest";
import {
  canPerformDraftAction,
  createProviderDraft,
  getDraftReviewSummary,
  getMissingRequiredDraftFields,
  type ProviderDraftActor,
} from "./providerDraft";

const providerActor: ProviderDraftActor = {
  id: "provider-1",
  role: "provider",
};

const otherProviderActor: ProviderDraftActor = {
  id: "provider-2",
  role: "provider",
};

const operatorActor: ProviderDraftActor = {
  id: "operator-1",
  role: "operator",
};

describe("B3.5 provider draft persistence/auth boundary", () => {
  it("creates an owner-scoped draft from an approved onboarding path", () => {
    const draft = createProviderDraft({
      draftId: "draft-1",
      ownerActorId: providerActor.id,
      pathId: "independentInstructor",
      nowIso: "2026-09-05T13:30:00.000Z",
    });

    expect(draft).toMatchObject({
      draftId: "draft-1",
      ownerActorId: "provider-1",
      pathId: "independentInstructor",
      status: "draft",
      createdAtIso: "2026-09-05T13:30:00.000Z",
      updatedAtIso: "2026-09-05T13:30:00.000Z",
    });
    expect(draft.fields).toEqual({});
  });

  it("keeps save/submit actions behind the draft owner or an operator", () => {
    const draft = createProviderDraft({
      draftId: "draft-1",
      ownerActorId: providerActor.id,
      pathId: "independentInstructor",
      nowIso: "2026-09-05T13:30:00.000Z",
    });

    expect(canPerformDraftAction(providerActor, draft, "saveDraft")).toEqual({
      allowed: true,
      reason: "owner can edit their own draft before review",
    });
    expect(
      canPerformDraftAction(otherProviderActor, draft, "saveDraft"),
    ).toEqual({
      allowed: false,
      reason: "provider can only edit their own draft",
    });
    expect(
      canPerformDraftAction({ role: "anonymous" }, draft, "saveDraft"),
    ).toEqual({
      allowed: false,
      reason: "anonymous visitors must authenticate before draft actions",
    });
    expect(canPerformDraftAction(operatorActor, draft, "saveDraft")).toEqual({
      allowed: true,
      reason: "operator can maintain provider drafts before publication",
    });
  });

  it("requires the B3.3 intake contract before a provider can submit for review", () => {
    const draft = createProviderDraft({
      draftId: "draft-1",
      ownerActorId: providerActor.id,
      pathId: "independentInstructor",
      nowIso: "2026-09-05T13:30:00.000Z",
      fields: {
        legalFirstName: "Ana",
        legalSurnames: "García López",
        publicDisplayName: "Ana G.",
        resortsServed: "Baqueira Beret",
        sportsTaught: "ski",
      },
    });

    expect(getMissingRequiredDraftFields(draft)).toEqual([
      "lessonTypes",
      "languages",
      "starterLessonOffer",
      "startingPriceOrPriceOnRequest",
      "localSnowContact",
    ]);
    expect(
      canPerformDraftAction(providerActor, draft, "submitForReview"),
    ).toEqual({
      allowed: false,
      reason: "required intake fields are missing before LocalSnow review",
    });
  });

  it("lets the owner submit a complete draft, then only operators approve publication", () => {
    const draft = createProviderDraft({
      draftId: "draft-1",
      ownerActorId: providerActor.id,
      pathId: "schoolAffiliatedInstructor",
      nowIso: "2026-09-05T13:30:00.000Z",
      status: "needsReview",
      fields: {
        legalFirstName: "Marc",
        legalSurnames: "Puig Soler",
        publicDisplayName: "Marc P.",
        resortsServed: "La Molina",
        sportsTaught: "snowboard",
        lessonTypes: "private lessons",
        languages: "Catalan, Spanish, English",
        schoolAffiliation: "Escola Example",
        localSnowContact: "marc@example.com",
      },
    });

    expect(getMissingRequiredDraftFields(draft)).toEqual([]);
    expect(
      canPerformDraftAction(providerActor, draft, "submitForReview"),
    ).toEqual({
      allowed: false,
      reason: "draft is already waiting for LocalSnow review",
    });
    expect(
      canPerformDraftAction(providerActor, draft, "approveForPublication"),
    ).toEqual({
      allowed: false,
      reason: "only LocalSnow operators can approve publication",
    });
    expect(
      canPerformDraftAction(operatorActor, draft, "approveForPublication"),
    ).toEqual({
      allowed: true,
      reason: "operator can approve a reviewed draft for publication",
    });
  });

  it("summarizes public, private and commercial facts without leaking private fields into the public preview", () => {
    const draft = createProviderDraft({
      draftId: "draft-1",
      ownerActorId: providerActor.id,
      pathId: "independentInstructor",
      nowIso: "2026-09-05T13:30:00.000Z",
      fields: {
        legalFirstName: "Ana",
        legalSurnames: "García López",
        publicDisplayName: "Ana G.",
        resortsServed: "Baqueira Beret",
        sportsTaught: "ski",
        lessonTypes: "kids and beginner private lessons",
        languages: "Spanish, English",
        starterLessonOffer: "2h private beginner lesson",
        startingPriceOrPriceOnRequest: "from €90",
        localSnowContact: "ana@example.com",
      },
    });

    expect(getDraftReviewSummary(draft)).toMatchObject({
      publicFieldKeys: [
        "publicDisplayName",
        "professionalPublicName",
        "resortsServed",
        "sportsTaught",
        "lessonTypes",
        "languages",
      ],
      privateFieldKeys: [
        "legalFirstName",
        "legalSurnames",
        "localSnowContact",
        "operatorSourceNote",
      ],
      commercialFieldKeys: [
        "starterLessonOffer",
        "startingPriceOrPriceOnRequest",
        "availabilityPattern",
      ],
    });
    expect(getDraftReviewSummary(draft).publicFieldKeys).not.toContain(
      "legalFirstName",
    );
  });
});
