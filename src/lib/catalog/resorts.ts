export type Country = {
  code: "ES";
  name: "Spain";
  slug: "spain";
  priority: "firstMarket";
};

export type Region = {
  id: string;
  countryCode: Country["code"];
  name: string;
  slug: string;
};

export type ResortReadiness =
  "catalogAccessible" | "publicBasic" | "seoRich" | "pausedHidden";

export type ResortCoverage =
  "noSupplyYet" | "sourcingSupply" | "requestable" | "guaranteedReady";

export type CatalogSourceDecision = {
  currentSource: "versionedSeed";
  finalStorageUndecided: true;
  expectedEvolution: readonly [
    "tinySpainFirstSeed",
    "fileOrSeedImportBoundary",
    "databaseBackedCatalogAdmin",
    "enrichmentImportPipeline",
  ];
};

export type ResortSourcingPolicy = {
  providerProfileCreation: "alwaysOpen";
  clientFacingSourcingPlacement: "secondary";
  manualSchoolDirectoryListings: "allowedWhenClearlyUnclaimed";
};

export type Resort = {
  id: string;
  countryCode: Country["code"];
  regionId: string;
  name: string;
  slug: string;
  priorityRank: number;
  readiness: ResortReadiness;
  coverage: ResortCoverage;
  sports: ("ski" | "snowboard")[];
  lessonIntents: ("private" | "group" | "kids" | "beginner")[];
  supplyInvitationVisible: boolean;
  summary: string;
};

export const catalogSourceDecision: CatalogSourceDecision = {
  currentSource: "versionedSeed",
  finalStorageUndecided: true,
  expectedEvolution: [
    "tinySpainFirstSeed",
    "fileOrSeedImportBoundary",
    "databaseBackedCatalogAdmin",
    "enrichmentImportPipeline",
  ],
};

export const resortSourcingPolicy: ResortSourcingPolicy = {
  providerProfileCreation: "alwaysOpen",
  clientFacingSourcingPlacement: "secondary",
  manualSchoolDirectoryListings: "allowedWhenClearlyUnclaimed",
};

export const spain: Country = {
  code: "ES",
  name: "Spain",
  slug: "spain",
  priority: "firstMarket",
};

export const regions: Region[] = [
  {
    id: "catalan-pyrenees",
    countryCode: "ES",
    name: "Catalan Pyrenees",
    slug: "catalan-pyrenees",
  },
  {
    id: "aragones-pyrenees",
    countryCode: "ES",
    name: "Aragonese Pyrenees",
    slug: "aragones-pyrenees",
  },
];

export const priorityResorts: Resort[] = [
  {
    id: "baqueira",
    countryCode: "ES",
    regionId: "catalan-pyrenees",
    name: "Baqueira",
    slug: "baqueira",
    priorityRank: 1,
    readiness: "seoRich",
    coverage: "sourcingSupply",
    sports: ["ski", "snowboard"],
    lessonIntents: ["private", "kids", "beginner"],
    supplyInvitationVisible: true,
    summary:
      "First priority resort scaffold for useful Spain discovery and instructor sourcing.",
  },
  {
    id: "la-molina",
    countryCode: "ES",
    regionId: "catalan-pyrenees",
    name: "La Molina",
    slug: "la-molina",
    priorityRank: 2,
    readiness: "publicBasic",
    coverage: "sourcingSupply",
    sports: ["ski", "snowboard"],
    lessonIntents: ["private", "kids", "beginner"],
    supplyInvitationVisible: true,
    summary:
      "Priority resort seed queued for useful content and supply, not promoted to index yet.",
  },
  {
    id: "cerler",
    countryCode: "ES",
    regionId: "aragones-pyrenees",
    name: "Cerler",
    slug: "cerler",
    priorityRank: 3,
    readiness: "publicBasic",
    coverage: "sourcingSupply",
    sports: ["ski", "snowboard"],
    lessonIntents: ["private", "group", "kids"],
    supplyInvitationVisible: true,
    summary:
      "Priority resort seed queued for supplier discovery without fake supply claims.",
  },
];

export const getResortBySlug = (slug: string) =>
  priorityResorts.find((resort) => resort.slug === slug);

export const getRegionForResort = (resort: Resort) =>
  regions.find((region) => region.id === resort.regionId);

export const getResortRobots = (
  resort: Resort,
): "index,follow" | "noindex,follow" | "noindex,nofollow" => {
  if (resort.readiness === "pausedHidden") return "noindex,nofollow";
  if (resort.readiness === "seoRich") return "index,follow";
  return "noindex,follow";
};

export const getResortStatusCopy = (resort: Resort) => {
  if (resort.coverage === "guaranteedReady")
    return "Guaranteed booking can be offered when operations are ready.";
  if (resort.coverage === "requestable")
    return "Requestable lesson options can be shown.";
  if (resort.coverage === "sourcingSupply")
    return "Early LocalSnow coverage: listings and profiles can be added without claiming live availability.";
  return "Catalog shell only: no active supply claim.";
};
