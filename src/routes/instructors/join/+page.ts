import { getPublicPage } from "$lib/discovery/publicPages";
import { getProviderReachPromise } from "$lib/supply/profiles";
import { getProfileIntakeContracts } from "$lib/supply/profileIntake";
import {
  canPerformDraftAction,
  createProviderDraft,
  getDraftReviewSummary,
  type ProviderDraftActor,
} from "$lib/supply/providerDraft";
import { getProviderSetupGuide } from "$lib/supply/profileSetup";

const promise = getProviderReachPromise();
const setupGuide = getProviderSetupGuide();
const intakeContracts = getProfileIntakeContracts();

const providerActor: ProviderDraftActor = {
  id: "provider-demo",
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

const fieldLabelByKey = new Map(
  intakeContracts.flatMap((contract) =>
    contract.sections.flatMap((section) =>
      section.fields.map((field) => [field.key, field.label] as const),
    ),
  ),
);

const draftSummary = getDraftReviewSummary(draftExample);

export const load = () => ({
  page: getPublicPage("/instructors/join"),
  promise,
  pathCards: setupGuide.paths.map((path) => ({
    label: path.label,
    headline: path.headline,
    whoItFits: path.whoItFits,
    commercialRule: path.commercialRule,
  })),
  intakeSummary: [
    {
      title: "Public profile",
      copy: "The name clients see, resorts served, sport, lesson style and languages.",
    },
    {
      title: "Starter commercial signal",
      copy: "One lesson/price signal, or inherited school pricing, before a full offer builder exists.",
    },
    {
      title: "Private LocalSnow details",
      copy: "Legal name and contact details stay private for review and coordination.",
    },
  ],
  draftBoundary: {
    title: "Save, submit, review — in that order",
    description:
      "Drafts belong to one provider account, incomplete drafts stay editable, and LocalSnow reviews before anything becomes public. This still does not create real accounts, database rows, uploads or form actions.",
    missingRequiredFields: draftSummary.missingRequiredFieldKeys.map(
      (fieldKey) => fieldLabelByKey.get(fieldKey) ?? fieldKey,
    ),
    rules: [
      {
        title: "Anonymous visitors cannot save drafts",
        decision: canPerformDraftAction(
          { role: "anonymous" },
          draftExample,
          "saveDraft",
        ),
        copy: "A future draft needs sign-in so edits are tied to the right provider.",
      },
      {
        title: "The draft owner can keep editing",
        decision: canPerformDraftAction(
          providerActor,
          draftExample,
          "saveDraft",
        ),
        copy: "Providers can save incomplete work before asking LocalSnow to review it.",
      },
      {
        title: "Missing required facts block review",
        decision: canPerformDraftAction(
          providerActor,
          draftExample,
          "submitForReview",
        ),
        copy: "The profile is not submitted until the required intake facts are present.",
      },
      {
        title: "Only LocalSnow approves publication",
        decision: canPerformDraftAction(
          operatorActor,
          reviewReadyDraft,
          "approveForPublication",
        ),
        copy: "Publication is a LocalSnow trust gate, not an automatic provider self-publish.",
      },
    ],
  },
  signals: [
    promise.benefitCopy.qualifiedClients,
    promise.benefitCopy.lowerMarketingAdmin,
    promise.benefitCopy.fairCommission,
    "private legal name kept separate from public display name",
    "starter lesson offer or inherited school pricing",
    "LocalSnow review before publication",
  ],
});
