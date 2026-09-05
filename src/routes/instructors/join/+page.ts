import { getPublicPage } from "$lib/discovery/publicPages";
import { getProviderReachPromise } from "$lib/supply/profiles";
import { getProfileIntakeContracts } from "$lib/supply/profileIntake";
import {
  canPerformDraftAction,
  createProviderDraft,
  getDraftReviewSummary,
  type ProviderDraftActor,
} from "$lib/supply/providerDraft";
import { getProviderOnboardingFlows } from "$lib/supply/providerOnboarding";
import { getProviderSetupGuide } from "$lib/supply/profileSetup";

const promise = getProviderReachPromise();
const setupGuide = getProviderSetupGuide();
const intakeContracts = getProfileIntakeContracts();
const onboardingFlows = getProviderOnboardingFlows();

const providerActor: ProviderDraftActor = {
  id: "provider-demo",
  role: "provider",
};
const otherProviderActor: ProviderDraftActor = {
  id: "provider-other-demo",
  role: "provider",
};
const operatorActor: ProviderDraftActor = {
  id: "operator-demo",
  role: "operator",
};

const draftExample = createProviderDraft({
  draftId: "draft-demo",
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

const reviewReadyDraft = createProviderDraft({
  draftId: "draft-review-ready-demo",
  ownerActorId: providerActor.id,
  pathId: "independentInstructor",
  nowIso: "2026-09-05T13:30:00.000Z",
  status: "needsReview",
  fields: {
    legalFirstName: "Ana",
    legalSurnames: "García López",
    publicDisplayName: "Ana G.",
    resortsServed: "Baqueira Beret",
    sportsTaught: "ski",
    lessonTypes: "beginner private lessons",
    languages: "Spanish, English",
    starterLessonOffer: "2h beginner private lesson",
    startingPriceOrPriceOnRequest: "from €90",
    localSnowContact: "ana@example.com",
  },
});

const draftSummary = getDraftReviewSummary(draftExample);

export const load = () => ({
  page: getPublicPage("/instructors/join"),
  promise,
  setupGuide,
  intakeContracts,
  onboardingFlows,
  draftBoundary: {
    title: "Provider draft boundary before real persistence",
    description:
      "B3.5 starts the real platform boundary: a provider draft is owned by one signed-in provider or maintained by LocalSnow, missing required intake facts block review, and only LocalSnow can approve publication. This still does not create real accounts, database rows or form actions.",
    draftStatus: draftExample.status,
    missingRequiredFieldKeys: draftSummary.missingRequiredFieldKeys,
    reviewGroups: [
      {
        label: "Public preview fields",
        fieldKeys: draftSummary.publicFieldKeys,
      },
      {
        label: "Commercial review fields",
        fieldKeys: draftSummary.commercialFieldKeys,
      },
      {
        label: "LocalSnow-only fields",
        fieldKeys: draftSummary.privateFieldKeys,
      },
    ],
    actionRules: [
      {
        label: "Anonymous visitor saves draft",
        decision: canPerformDraftAction(
          { role: "anonymous" },
          draftExample,
          "saveDraft",
        ),
      },
      {
        label: "Owner saves draft",
        decision: canPerformDraftAction(
          providerActor,
          draftExample,
          "saveDraft",
        ),
      },
      {
        label: "Different provider edits draft",
        decision: canPerformDraftAction(
          otherProviderActor,
          draftExample,
          "saveDraft",
        ),
      },
      {
        label: "Owner submits incomplete draft",
        decision: canPerformDraftAction(
          providerActor,
          draftExample,
          "submitForReview",
        ),
      },
      {
        label: "LocalSnow approves reviewed draft",
        decision: canPerformDraftAction(
          operatorActor,
          reviewReadyDraft,
          "approveForPublication",
        ),
      },
    ],
  },
  signals: [
    promise.benefits[0],
    promise.benefits[2],
    promise.benefits[3],
    "resorts served",
    "sports taught",
    "private legal name kept separate from public display name",
    "starter lesson offer or inherited school pricing",
    "simple availability pattern",
  ],
});
