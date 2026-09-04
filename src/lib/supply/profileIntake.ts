import type { SetupPathId } from "./profileSetup";

export type IntakeFieldKey =
  | "publicName"
  | "businessName"
  | "resortsServed"
  | "sportsTaught"
  | "lessonTypes"
  | "languages"
  | "schoolAffiliation"
  | "schoolLevelOffer"
  | "startingPriceOrPriceOnRequest"
  | "availabilityPattern"
  | "localSnowContact"
  | "operatorSourceNote";

export type IntakeVisibility = "publicProfile" | "commercial" | "localSnowOnly";

export type IntakeField = {
  key: IntakeFieldKey;
  label: string;
  visibility: IntakeVisibility;
  required: boolean;
  help: string;
};

export type IntakeSection = {
  title: string;
  purpose: string;
  fields: IntakeField[];
};

export type ProfileIntakeContract = {
  pathId: SetupPathId;
  title: string;
  commercialRule: string;
  sections: IntakeSection[];
  notIncluded: string[];
};

const notIncluded = [
  "account creation",
  "database writes",
  "form submission actions",
  "file uploads",
  "payment collection",
  "availability engine",
];

const publicNameField: IntakeField = {
  key: "publicName",
  label: "Public name",
  visibility: "publicProfile",
  required: true,
  help: "First name plus initial by default, or an explicit professional public name.",
};

const businessNameField: IntakeField = {
  key: "businessName",
  label: "Business/school name",
  visibility: "publicProfile",
  required: true,
  help: "The school, academy or commercial group name visitors should recognize.",
};

const sharedPublicFields: IntakeField[] = [
  {
    key: "resortsServed",
    label: "Resorts served",
    visibility: "publicProfile",
    required: true,
    help: "Where clients can reasonably request lessons.",
  },
  {
    key: "sportsTaught",
    label: "Sports taught",
    visibility: "publicProfile",
    required: true,
    help: "Ski, snowboard or both.",
  },
  {
    key: "lessonTypes",
    label: "Lesson types",
    visibility: "publicProfile",
    required: true,
    help: "Simple lesson categories such as private, group, kids or beginner.",
  },
  {
    key: "languages",
    label: "Languages",
    visibility: "publicProfile",
    required: true,
    help: "Languages clients can use during the lesson.",
  },
];

const startingPriceField: IntakeField = {
  key: "startingPriceOrPriceOnRequest",
  label: "Starting price or price on request",
  visibility: "commercial",
  required: true,
  help: "A basic price signal only; not a booking/payment system.",
};

const availabilityPatternField: IntakeField = {
  key: "availabilityPattern",
  label: "Simple availability pattern",
  visibility: "commercial",
  required: false,
  help: "A soft signal like usually available, not instant live availability.",
};

const localSnowContactField: IntakeField = {
  key: "localSnowContact",
  label: "LocalSnow contact method",
  visibility: "localSnowOnly",
  required: true,
  help: "Email, phone or website for LocalSnow operations; not exposed publicly by default.",
};

const operatorSourceNoteField: IntakeField = {
  key: "operatorSourceNote",
  label: "Operator source note",
  visibility: "localSnowOnly",
  required: false,
  help: "Internal note for manually created profiles; never a public partnership claim.",
};

const makeContract = (
  pathId: SetupPathId,
  title: string,
  commercialRule: string,
  firstField: IntakeField,
  commercialFields: IntakeField[],
): ProfileIntakeContract => ({
  pathId,
  title,
  commercialRule,
  sections: [
    {
      title: "Public profile facts",
      purpose:
        "Facts that can appear on a public profile once LocalSnow reviews it.",
      fields: [firstField, ...sharedPublicFields],
    },
    {
      title: "Commercial facts",
      purpose:
        "Enough commercial signal to avoid fake availability or fake pricing.",
      fields: commercialFields,
    },
    {
      title: "LocalSnow-only facts",
      purpose:
        "Operational details used privately by LocalSnow before publishing or contacting clients.",
      fields: [localSnowContactField, operatorSourceNoteField],
    },
  ],
  notIncluded,
});

const contracts: Record<SetupPathId, ProfileIntakeContract> = {
  independentInstructor: makeContract(
    "independentInstructor",
    "Independent instructor intake",
    "This instructor owns their own services and prices.",
    publicNameField,
    [startingPriceField, availabilityPatternField],
  ),
  schoolProvider: makeContract(
    "schoolProvider",
    "School provider intake",
    "The school owns school-level services and prices.",
    businessNameField,
    [
      {
        key: "schoolLevelOffer",
        label: "School-level offer",
        visibility: "commercial",
        required: true,
        help: "The lesson offer belongs to the school, not to every instructor profile separately.",
      },
      startingPriceField,
      availabilityPatternField,
    ],
  ),
  schoolAffiliatedInstructor: makeContract(
    "schoolAffiliatedInstructor",
    "School-affiliated instructor intake",
    "Services and prices are inherited from the school by default.",
    publicNameField,
    [
      {
        key: "schoolAffiliation",
        label: "School affiliation",
        visibility: "commercial",
        required: true,
        help: "Connects the instructor profile to the school that owns the services and prices.",
      },
      availabilityPatternField,
    ],
  ),
};

export const getProfileIntakeContract = (pathId: SetupPathId) =>
  contracts[pathId];

export const getProfileIntakeContracts = () =>
  [
    contracts.independentInstructor,
    contracts.schoolProvider,
    contracts.schoolAffiliatedInstructor,
  ] as const;

export const getRequiredIntakeFieldKeys = (pathId: SetupPathId) =>
  getProfileIntakeContract(pathId)
    .sections.flatMap((section) => section.fields)
    .filter((field) => field.required)
    .map((field) => field.key);

export const getPublicPreviewFieldKeys = (pathId: SetupPathId) =>
  getProfileIntakeContract(pathId)
    .sections.flatMap((section) => section.fields)
    .filter((field) => field.visibility === "publicProfile")
    .map((field) => field.key);
