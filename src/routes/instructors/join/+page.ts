import { getPublicPage } from "$lib/discovery/publicPages";
import { getProviderReachPromise } from "$lib/supply/profiles";
import {
  getProfileIntakeContracts,
  type IntakeFieldKey,
} from "$lib/supply/profileIntake";
import { getProviderSetupGuide } from "$lib/supply/profileSetup";

const page = getPublicPage("/instructors/join");
const promise = getProviderReachPromise();
const setupGuide = getProviderSetupGuide();
const intakeContracts = getProfileIntakeContracts();

const fieldLabelByKey = new Map(
  intakeContracts.flatMap((contract) =>
    contract.sections.flatMap((section) =>
      section.fields.map((field) => [field.key, field.label] as const),
    ),
  ),
);

const labelsFor = (fieldKeys: IntakeFieldKey[]) =>
  fieldKeys.map((fieldKey) => fieldLabelByKey.get(fieldKey) ?? fieldKey);

export const load = () => ({
  page: page
    ? {
        title: page.title,
        description: page.description,
        robots: page.robots,
        canonicalPath: page.canonicalPath,
      }
    : undefined,
  hero: {
    eyebrow: "Teach with LocalSnow",
    headline:
      "Get found by ski and snowboard clients without becoming a marketing machine",
    lede: "LocalSnow is building a focused place where ski and snowboard clients can discover trusted instructors and schools. Start with a simple reviewed profile, not another platform to manage.",
  },
  primaryCta: {
    label: "Prepare my LocalSnow profile",
    href: "#profile-paths",
  },
  trustSignals: [
    promise.benefitCopy.qualifiedClients,
    promise.benefitCopy.lowerMarketingAdmin,
    "simple profile setup",
    "reviewed before going public",
  ],
  sections: [
    {
      id: "why",
      kicker: "Why join early",
      title: "More clients, less marketing work",
      copy: "LocalSnow is for snow professionals who want reach without filming every week, running ads or explaining their services across scattered channels.",
      bullets: [
        "Show up where lesson clients are already looking.",
        "Keep the first profile simple and professional.",
        "Let LocalSnow review the public profile before clients see it.",
      ],
    },
    {
      id: "profile",
      kicker: "Profile path",
      title: "Start with how you really teach",
      copy: "Choose whether you teach independently, as a school, or as an instructor connected to a school. The profile can stay simple while still making the relationship clear.",
      cards: setupGuide.paths.map((path) => ({
        label: path.label,
        headline: path.headline,
        whoItFits: path.whoItFits,
        commercialRule: path.commercialRule,
      })),
    },
    {
      id: "review",
      kicker: "What LocalSnow needs first",
      title: "Enough to review a useful first profile",
      copy: "The first version only needs the facts that help LocalSnow understand what you teach, where you teach and how clients should see you.",
      cards: [
        {
          label: "Public profile",
          headline: "What clients may see",
          body: labelsFor([
            "publicDisplayName",
            "resortsServed",
            "sportsTaught",
            "lessonTypes",
            "languages",
          ]).join(", "),
        },
        {
          label: "First lesson signal",
          headline: "A simple starting offer",
          body: labelsFor([
            "starterLessonOffer",
            "startingPriceOrPriceOnRequest",
          ]).join(", "),
        },
        {
          label: "Private coordination",
          headline: "Kept for LocalSnow review",
          body: labelsFor([
            "legalFirstName",
            "legalSurnames",
            "localSnowContact",
          ]).join(", "),
        },
      ],
    },
  ],
});
