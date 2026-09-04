import {
  getOfferOwnershipForProfile,
  getProfileReadiness,
  getPublicDisplayName,
  toPublicSupplyProfile,
  type OfferOwnership,
  type ProfileKind,
  type ProfileReadiness,
  type PublicSupplyProfile,
  type SupplyProfile,
} from "./profiles";

export type SetupPathId =
  "independentInstructor" | "schoolProvider" | "schoolAffiliatedInstructor";

export type SetupPath = {
  id: SetupPathId;
  label: string;
  profileKind: ProfileKind;
  headline: string;
  whoItFits: string;
  commercialRule: string;
  requiredFacts: string[];
};

export type ProviderSetupGuide = {
  goal: string;
  profileKinds: ProfileKind[];
  paths: SetupPath[];
  boundaries: {
    included: string[];
    notIncluded: string[];
  };
};

export type SetupPreview = {
  displayName: string;
  commercialRule: string;
  offerOwner: OfferOwnership;
  readiness: ProfileReadiness;
  publicProfile: PublicSupplyProfile;
};

const sharedFacts = [
  "name or public professional name",
  "resorts served",
  "sports taught",
  "lesson types",
  "languages",
  "LocalSnow contact method",
];

const paths: SetupPath[] = [
  {
    id: "independentInstructor",
    label: "Independent instructor",
    profileKind: "independentInstructor",
    headline: "I teach under my own name or brand.",
    whoItFits:
      "Solo instructors who want their own LocalSnow presence and commercial offer.",
    commercialRule:
      "Independent instructors own their own services and prices.",
    requiredFacts: [...sharedFacts, "starting price or price-on-request"],
  },
  {
    id: "schoolProvider",
    label: "School or collective",
    profileKind: "schoolProvider",
    headline: "We sell lessons as a school, academy or instructor group.",
    whoItFits:
      "Schools and real commercial groups of instructors using one shared offer.",
    commercialRule: "Schools own school-level services and prices.",
    requiredFacts: [...sharedFacts, "business name", "school-level offer"],
  },
  {
    id: "schoolAffiliatedInstructor",
    label: "Instructor inside a school",
    profileKind: "independentInstructor",
    headline: "I should appear publicly, but the school owns the offer.",
    whoItFits:
      "School instructors who improve trust and conversion without separate prices.",
    commercialRule:
      "The instructor profile is public, but services and prices are inherited from the school.",
    requiredFacts: [...sharedFacts, "school affiliation"],
  },
];

export const getProviderSetupGuide = (): ProviderSetupGuide => ({
  goal: "Let providers understand which lightweight profile path fits them before LocalSnow asks for data.",
  profileKinds: ["independentInstructor", "schoolProvider"],
  paths,
  boundaries: {
    included: [
      "public explanation of profile paths",
      "school-affiliated instructor inheritance rule",
      "setup preview data model",
      "no-persistence page wiring",
    ],
    notIncluded: [
      "account creation",
      "database persistence",
      "profile mutation actions",
      "payments",
      "availability engine",
    ],
  },
});

export const getSetupPathProfileDefaults = (
  pathId: SetupPathId,
  schoolProfileId = "",
): Partial<SupplyProfile> => {
  if (pathId === "schoolProvider") {
    return {
      kind: "schoolProvider",
      affiliation: { type: "independent" },
      claimStatus: "unclaimed",
      source: "providerSubmitted",
      priceOnRequest: true,
    };
  }

  if (pathId === "schoolAffiliatedInstructor") {
    return {
      kind: "independentInstructor",
      affiliation: {
        type: "schoolAffiliated",
        schoolProfileId,
        inheritsSchoolOffers: true,
      },
      claimStatus: "unclaimed",
      source: "providerSubmitted",
    };
  }

  return {
    kind: "independentInstructor",
    affiliation: { type: "independent" },
    claimStatus: "unclaimed",
    source: "providerSubmitted",
    priceOnRequest: true,
  };
};

export const getSetupPreview = (profile: SupplyProfile): SetupPreview => {
  const offerOwner = getOfferOwnershipForProfile(profile);
  const isSchoolAffiliated = profile.affiliation.type === "schoolAffiliated";

  return {
    displayName: getPublicDisplayName(profile),
    commercialRule: isSchoolAffiliated
      ? "This instructor appears publicly, but services and prices are inherited from the school."
      : profile.kind === "schoolProvider"
        ? "This school owns the services and prices shown on its profile."
        : "This instructor owns their own services and prices.",
    offerOwner,
    readiness: getProfileReadiness(profile),
    publicProfile: toPublicSupplyProfile(profile),
  };
};
