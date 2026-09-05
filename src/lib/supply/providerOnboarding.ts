import { getProfileIntakeContract, type IntakeFieldKey } from "./profileIntake";
import { getProviderSetupGuide, type SetupPathId } from "./profileSetup";

export type OnboardingStepId =
  | "chooseProviderPath"
  | "privateIdentity"
  | "publicProfile"
  | "starterCommercialOffer"
  | "localSnowReview";

export type ProviderOnboardingStep = {
  id: OnboardingStepId;
  title: string;
  summary: string;
  fieldKeys: IntakeFieldKey[];
  boundary: string;
};

export type ProviderOnboardingFlow = {
  status: "draftPlatformFlow";
  title: string;
  pathLabel: string;
  promise: string;
  pathId: SetupPathId;
  steps: ProviderOnboardingStep[];
  notIncluded: string[];
  nextBuildDecision: string;
};

const flowNotIncluded = [
  "account creation",
  "database writes",
  "exact database fields or migrations",
  "form submission actions",
  "file uploads",
  "email delivery",
  "payment collection",
  "availability engine",
];

const contractFieldsByVisibility = (pathId: SetupPathId) => {
  const fields = getProfileIntakeContract(pathId).sections.flatMap(
    (section) => section.fields,
  );

  return {
    publicProfile: fields
      .filter((field) => field.visibility === "publicProfile")
      .map((field) => field.key),
    commercial: fields
      .filter((field) => field.visibility === "commercial")
      .map((field) => field.key),
    localSnowOnly: fields
      .filter((field) => field.visibility === "localSnowOnly")
      .map((field) => field.key),
  };
};

const getPrivateIdentityFields = (pathId: SetupPathId): IntakeFieldKey[] => {
  const { localSnowOnly } = contractFieldsByVisibility(pathId);
  return localSnowOnly.filter((fieldKey) =>
    ["legalFirstName", "legalSurnames", "localSnowContact"].includes(fieldKey),
  );
};

const getStarterCommercialSummary = (pathId: SetupPathId) => {
  if (pathId === "schoolAffiliatedInstructor") {
    return "Connect the instructor to a school; this profile inherits school services and prices by default.";
  }

  if (pathId === "schoolProvider") {
    return "Sketch one school-level offer and a price signal so LocalSnow can request lessons without inventing pricing.";
  }

  return "Sketch one simple first lesson and a price signal so the instructor sees a useful platform flow without configuring a full catalogue.";
};

export const getProviderOnboardingFlowForPath = (
  pathId: SetupPathId,
): ProviderOnboardingFlow => {
  const contract = getProfileIntakeContract(pathId);
  const setupPath = getProviderSetupGuide().paths.find(
    (path) => path.id === pathId,
  );
  const fields = contractFieldsByVisibility(pathId);

  return {
    status: "draftPlatformFlow",
    title: "Provider onboarding draft flow",
    pathLabel: setupPath?.label ?? contract.title,
    promise:
      "A provider can understand the platform path, prepare a safe public profile, add one starter commercial signal and reach LocalSnow review without cold outreach or fake automation.",
    pathId,
    steps: [
      {
        id: "chooseProviderPath",
        title: "Choose provider path",
        summary:
          "Start by selecting independent instructor, school provider or instructor inside a school so the platform does not ask the wrong commercial questions.",
        fieldKeys: [],
        boundary: "path selection only; not account creation",
      },
      {
        id: "privateIdentity",
        title: "Private identity and contact",
        summary:
          pathId === "schoolProvider"
            ? "Collect LocalSnow operations contact for the school/provider without asking for personal legal-name fields on this path."
            : "Collect legal first name, legal surname(s) and LocalSnow contact privately before deriving the public display name.",
        fieldKeys: getPrivateIdentityFields(pathId),
        boundary: "private LocalSnow operations data; not public profile copy",
      },
      {
        id: "publicProfile",
        title: "Public profile preview",
        summary:
          "Show what clients may see after review: public display name or school name, resorts, sports, lesson types and languages.",
        fieldKeys: fields.publicProfile,
        boundary: "preview only until LocalSnow review approves publication",
      },
      {
        id: "starterCommercialOffer",
        title: "Starter lesson and pricing signal",
        summary: getStarterCommercialSummary(pathId),
        fieldKeys: fields.commercial,
        boundary:
          "starter commercial signal; not the full offer builder, payment flow or availability engine",
      },
      {
        id: "localSnowReview",
        title: "LocalSnow review before publishing",
        summary:
          "End the draft flow with a review checkpoint so Moli can prevent fake partnerships, unsafe names or invented pricing before anything becomes public.",
        fieldKeys: ["operatorSourceNote"],
        boundary: "manual review checkpoint; not automated approval",
      },
    ],
    notIncluded: flowNotIncluded,
    nextBuildDecision:
      "wire this draft flow to persistence, auth and review actions only after Moli approves the platform flow shape",
  };
};

export const getProviderOnboardingFlow = () =>
  getProviderOnboardingFlowForPath("independentInstructor");

export const getProviderOnboardingFlows = () =>
  [
    getProviderOnboardingFlowForPath("independentInstructor"),
    getProviderOnboardingFlowForPath("schoolProvider"),
    getProviderOnboardingFlowForPath("schoolAffiliatedInstructor"),
  ] as const;
