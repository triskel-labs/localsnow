import {
  resolveSeoPolicy,
  type MarketPriority,
  type SeoPolicy,
  type SeoPolicyInput,
} from "./seoPolicy";

export type PublicPage = SeoPolicy & {
  label: string;
  href: string;
  badge: string;
  summary: string;
  primaryAction: string;
  secondaryAction?: string;
};

type PublicPageInput = SeoPolicyInput & {
  label: string;
  badge: string;
  summary: string;
  primaryAction: string;
  secondaryAction?: string;
};

const page = (input: PublicPageInput): PublicPage => {
  const policy = resolveSeoPolicy(input);
  return {
    ...policy,
    label: input.label,
    href: policy.canonicalPath,
    badge: input.badge,
    summary: input.summary,
    primaryAction: input.primaryAction,
    secondaryAction: input.secondaryAction,
  };
};

export const publicPages = [
  page({
    family: "home",
    state: "indexable",
    silo: "global",
    marketPriority: "priority",
    path: "/",
    title: "LocalSnow — ski and snowboard lessons with help when plans matter",
    description:
      "Find ski and snowboard lessons, compare requestable options and choose open inquiry or guaranteed booking support.",
    retrieval: {
      intent: "lessonDiscovery",
      requiredSignals: ["sport", "resort or area", "lesson outcome"],
      optionalSignals: ["date window", "level", "language", "group size"],
    },
    label: "Home",
    badge: "Public discovery",
    summary:
      "Explains the LocalSnow promise without requiring login or pretending instant confirmation.",
    primaryAction: "Start lesson search",
    secondaryAction: "Invite an instructor",
  }),
  page({
    family: "market",
    state: "indexable",
    silo: "spainPriority",
    marketPriority: "priority",
    path: "/spain",
    title: "Ski lessons in Spain — LocalSnow",
    description:
      "Spain-first discovery shell for resorts where LocalSnow can build supply, trust and booking operations before expanding thin pages.",
    retrieval: {
      intent: "resortDiscovery",
      requiredSignals: ["country", "priority resorts", "sport"],
      optionalSignals: ["season", "lesson type", "client level"],
    },
    label: "Spain",
    badge: "Priority market",
    summary:
      "Spain is the first active market for supply, content and conversion investment.",
    primaryAction: "Browse Spain resorts",
  }),
  page({
    family: "resort",
    state: "indexable",
    silo: "spainPriority",
    marketPriority: "priority",
    path: "/spain/baqueira",
    title: "Ski lessons in Baqueira — LocalSnow",
    description:
      "Priority resort shell for Baqueira lesson discovery, supply invitation and future requestable lesson options.",
    retrieval: {
      intent: "resortDiscovery",
      requiredSignals: ["resort", "sport", "lesson format"],
      optionalSignals: [
        "date window",
        "availability freshness",
        "provider fit",
      ],
    },
    label: "Baqueira",
    badge: "Priority resort",
    summary:
      "A real priority resort shell: useful enough to index, not a mass-generated thin catalog page.",
    primaryAction: "Check lesson options",
    secondaryAction: "Join as instructor",
  }),
  page({
    family: "supply",
    state: "indexable",
    silo: "supply",
    marketPriority: "priority",
    path: "/instructors/join",
    title: "Teach with LocalSnow",
    description:
      "Supply invitation shell for instructors who want more lesson clients without becoming content creators, running ads or hiring a generic agency.",
    retrieval: {
      intent: "supplyInvitation",
      requiredSignals: ["resorts served", "sports taught", "lesson types"],
      optionalSignals: [
        "availability pattern",
        "pricing starting point",
        "languages",
      ],
    },
    label: "For instructors",
    badge: "Supply invitation",
    summary:
      "Invites instructors around the real wedge: more clients and paid work, less marketing/admin complexity.",
    primaryAction: "Register interest",
  }),
  page({
    family: "resort",
    state: "noindexBrowsable",
    silo: "catalogOnly",
    marketPriority: "catalogOnly",
    path: "/world/catalog-example",
    title: "Worldwide resort catalog example — LocalSnow",
    description:
      "Browsable-but-noindex placeholder showing how worldwide catalog coverage can exist without mass-indexing thin pages.",
    retrieval: {
      intent: "resortDiscovery",
      requiredSignals: ["resort", "country"],
      optionalSignals: ["supply status", "lesson intent"],
    },
    label: "Catalog-only example",
    badge: "Noindex-browsable",
    summary:
      "Demonstrates that page existence alone does not mean SEO indexability.",
    primaryAction: "View policy",
  }),
] satisfies PublicPage[];

export const getPublicPage = (path: string) =>
  publicPages.find((page) => page.href === path);

export const priorityMarkets = publicPages.filter(
  (page) => page.marketPriority === ("priority" satisfies MarketPriority),
);
