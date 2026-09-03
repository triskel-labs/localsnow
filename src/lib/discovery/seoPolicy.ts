export type PageFamily =
  | "home"
  | "market"
  | "resort"
  | "profile"
  | "lessonIntent"
  | "supply"
  | "legal";

export type PageState =
  "indexable" | "noindexBrowsable" | "hidden" | "internal";

export type SeoSilo =
  "global" | "spainPriority" | "catalogOnly" | "supply" | "trust";

export type MarketPriority =
  "priority" | "supported" | "catalogOnly" | "future";

export type RetrievalQueryContract = {
  intent:
    "lessonDiscovery" | "resortDiscovery" | "supplyInvitation" | "trustSupport";
  requiredSignals: string[];
  optionalSignals: string[];
};

export type SeoPolicyInput = {
  family: PageFamily;
  state: PageState;
  silo: SeoSilo;
  marketPriority: MarketPriority;
  path: string;
  title: string;
  description: string;
  retrieval: RetrievalQueryContract;
};

export type SeoPolicy = SeoPolicyInput & {
  canonicalPath: string;
  robots: "index,follow" | "noindex,follow" | "noindex,nofollow";
};

const normalizePath = (path: string) => {
  if (!path.startsWith("/")) return `/${path}`;
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
};

export const resolveSeoPolicy = (input: SeoPolicyInput): SeoPolicy => {
  const canonicalPath = normalizePath(input.path);

  if (input.state === "hidden" || input.state === "internal") {
    return {
      ...input,
      canonicalPath,
      robots: "noindex,nofollow",
    };
  }

  if (
    input.state === "noindexBrowsable" ||
    input.marketPriority === "catalogOnly"
  ) {
    return {
      ...input,
      canonicalPath,
      robots: "noindex,follow",
    };
  }

  return {
    ...input,
    canonicalPath,
    robots: "index,follow",
  };
};

export const isPubliclyBrowsable = (policy: SeoPolicy) =>
  policy.state === "indexable" || policy.state === "noindexBrowsable";
