import type { SetupPathId } from "./profileSetup";

export type IntakeFieldKey =
  | "publicDisplayName"
  | "professionalPublicName"
  | "businessName"
  | "legalFirstName"
  | "legalSurnames"
  | "resortsServed"
  | "sportsTaught"
  | "lessonTypes"
  | "languages"
  | "schoolAffiliation"
  | "schoolLevelOffer"
  | "starterLessonOffer"
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

export type LegalPersonName = {
  legalFirstName: string;
  legalSurnames: string;
};

const notIncluded = [
  "account creation",
  "database writes",
  "exact database fields or migrations",
  "form submission actions",
  "file uploads",
  "email delivery",
  "payment collection",
  "availability engine",
];

const publicDisplayNameField: IntakeField = {
  key: "publicDisplayName",
  label: "Public display name",
  visibility: "publicProfile",
  required: true,
  help: "Generated as first name plus first surname initial by default, for example David M.",
};

const professionalPublicNameField: IntakeField = {
  key: "professionalPublicName",
  label: "Professional public name override",
  visibility: "publicProfile",
  required: false,
  help: "Optional reviewed name visitors can see instead of the default private-safe pattern.",
};

const businessNameField: IntakeField = {
  key: "businessName",
  label: "Business/school name",
  visibility: "publicProfile",
  required: true,
  help: "The school, academy or commercial group name visitors should recognize.",
};

const legalFirstNameField: IntakeField = {
  key: "legalFirstName",
  label: "Legal first name",
  visibility: "localSnowOnly",
  required: true,
  help: "Official personal identity for LocalSnow operations and future payment/billing checks; never public by default.",
};

const legalSurnamesField: IntakeField = {
  key: "legalSurnames",
  label: "Legal surname(s)",
  visibility: "localSnowOnly",
  required: true,
  help: "Supports Spanish two-surname names; LocalSnow only exposes the first surname initial by default.",
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

const starterLessonOfferField: IntakeField = {
  key: "starterLessonOffer",
  label: "First lesson offer sketch",
  visibility: "commercial",
  required: true,
  help: "One simple default lesson LocalSnow can explain later; not a full flexible offer builder yet.",
};

const startingPriceField: IntakeField = {
  key: "startingPriceOrPriceOnRequest",
  label: "Starting price or price on request",
  visibility: "commercial",
  required: true,
  help: "A basic price signal for the first offer; not a final booking/payment system.",
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

const personalLegalFields = [legalFirstNameField, legalSurnamesField];

const makeContract = (
  pathId: SetupPathId,
  title: string,
  commercialRule: string,
  publicIdentityFields: IntakeField[],
  commercialFields: IntakeField[],
  localSnowOnlyFields: IntakeField[] = personalLegalFields,
): ProfileIntakeContract => ({
  pathId,
  title,
  commercialRule,
  sections: [
    {
      title: "Public profile facts",
      purpose:
        "Facts that can appear on a public profile once LocalSnow reviews it.",
      fields: [...publicIdentityFields, ...sharedPublicFields],
    },
    {
      title: "Commercial facts",
      purpose:
        "Enough commercial signal to avoid fake availability or fake pricing without creating the full offer system yet.",
      fields: commercialFields,
    },
    {
      title: "LocalSnow-only facts",
      purpose:
        "Operational details used privately by LocalSnow before publishing, billing or contacting clients.",
      fields: [
        ...localSnowOnlyFields,
        localSnowContactField,
        operatorSourceNoteField,
      ],
    },
  ],
  notIncluded,
});

const contracts: Record<SetupPathId, ProfileIntakeContract> = {
  independentInstructor: makeContract(
    "independentInstructor",
    "Independent instructor intake",
    "This instructor owns their own services and prices.",
    [publicDisplayNameField, professionalPublicNameField],
    [starterLessonOfferField, startingPriceField, availabilityPatternField],
  ),
  schoolProvider: makeContract(
    "schoolProvider",
    "School provider intake",
    "The school owns school-level services and prices.",
    [businessNameField],
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
    [],
  ),
  schoolAffiliatedInstructor: makeContract(
    "schoolAffiliatedInstructor",
    "School-affiliated instructor intake",
    "Services and prices are inherited from the school by default.",
    [publicDisplayNameField, professionalPublicNameField],
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

export const buildDefaultPublicDisplayName = ({
  legalFirstName,
  legalSurnames,
}: LegalPersonName) => {
  const firstName = legalFirstName.trim();
  const firstSurname = legalSurnames.trim().split(/\s+/)[0] ?? "";
  const firstSurnameInitial = firstSurname.charAt(0).toLocaleUpperCase("es");

  if (!firstName) return "";
  if (!firstSurnameInitial) return firstName;

  return `${firstName} ${firstSurnameInitial}.`;
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
