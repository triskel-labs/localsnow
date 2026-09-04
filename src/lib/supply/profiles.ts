export type ProfileKind =
  | "independentInstructor"
  | "schoolProvider"
  | "guideProvider"
  | "academyProvider"
  | "otherLessonProvider";

export type ProfileSource =
  "providerSubmitted" | "operatorCreated" | "legacyImported";

export type ClaimStatus =
  "unclaimed" | "claimRequested" | "claimed" | "localSnowReviewed";

export type LessonType = "private" | "group" | "kids" | "beginner";

export type PriceUnit = "hour" | "halfDay" | "fullDay" | "person" | "group";

export type StartingPrice = {
  amount: number;
  currency: "EUR";
  unit: PriceUnit;
};

export type InternalContact = {
  email?: string;
  phone?: string;
  website?: string;
};

export type SupplyProfile = {
  kind: ProfileKind;
  source: ProfileSource;
  claimStatus: ClaimStatus;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  publicDisplayName?: string;
  resortsServed: string[];
  sportsTaught: ("ski" | "snowboard")[];
  lessonTypes: LessonType[];
  languages: string[];
  startingPrice?: StartingPrice;
  priceOnRequest?: boolean;
  availabilityPattern?: "usuallyAvailable" | "notSet";
  internalContact: InternalContact;
  internalSourceNote?: string;
};

export type ProfileReadiness = {
  state: "draft" | "needsReview";
  missing: string[];
};

export type PublicSupplyProfile = {
  kind: ProfileKind;
  claimStatus: ClaimStatus;
  displayName: string;
  resortsServed: string[];
  sportsTaught: SupplyProfile["sportsTaught"];
  lessonTypes: LessonType[];
  languages: string[];
  startingPrice?: StartingPrice;
  priceOnRequest?: boolean;
  availabilityPattern?: SupplyProfile["availabilityPattern"];
};

export const getProviderReachPromise = () => ({
  headline: "Get found by lesson clients without becoming a content creator.",
  benefits: [
    "more qualified clients",
    "more paid work",
    "less marketing/admin complexity",
    "fair commission when LocalSnow brings work",
  ],
  avoidClaims: [
    "guaranteed clients before demand exists",
    "instant bookings",
    "full calendar setup required",
    "generic agency-style marketing promise",
  ],
});

export const canBeOperatorCreated = (kind: ProfileKind) =>
  [
    "independentInstructor",
    "schoolProvider",
    "guideProvider",
    "academyProvider",
    "otherLessonProvider",
  ].includes(kind);

export const getPublicDisplayName = (profile: SupplyProfile) => {
  if (profile.publicDisplayName?.trim())
    return profile.publicDisplayName.trim();

  if (
    profile.kind !== "independentInstructor" &&
    profile.businessName?.trim()
  ) {
    return profile.businessName.trim();
  }

  const firstName = profile.firstName?.trim() || "Instructor";
  const initial = profile.lastName?.trim().charAt(0).toUpperCase();

  return initial ? `${firstName} ${initial}.` : firstName;
};

export const getProfileReadiness = (
  profile: SupplyProfile,
): ProfileReadiness => {
  const missing: string[] = [];

  if (!getPublicDisplayName(profile)) missing.push("public display name");
  if (!canBeOperatorCreated(profile.kind))
    missing.push("supported profile kind");
  if (profile.resortsServed.length === 0) missing.push("resorts served");
  if (profile.sportsTaught.length === 0) missing.push("sports taught");
  if (profile.lessonTypes.length === 0) missing.push("lesson types");
  if (profile.languages.length === 0) missing.push("languages");
  if (!profile.startingPrice && !profile.priceOnRequest) {
    missing.push("starting price or price-on-request");
  }
  if (
    !profile.internalContact.email &&
    !profile.internalContact.phone &&
    !profile.internalContact.website
  ) {
    missing.push("LocalSnow contact method");
  }
  if (
    profile.source === "operatorCreated" &&
    !profile.internalSourceNote?.trim()
  ) {
    missing.push("operator source note");
  }

  return {
    state: missing.length > 0 ? "draft" : "needsReview",
    missing,
  };
};

export const toPublicSupplyProfile = (
  profile: SupplyProfile,
): PublicSupplyProfile => ({
  kind: profile.kind,
  claimStatus: profile.claimStatus,
  displayName: getPublicDisplayName(profile),
  resortsServed: profile.resortsServed,
  sportsTaught: profile.sportsTaught,
  lessonTypes: profile.lessonTypes,
  languages: profile.languages,
  startingPrice: profile.startingPrice,
  priceOnRequest: profile.priceOnRequest,
  availabilityPattern: profile.availabilityPattern,
});
