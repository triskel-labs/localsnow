export type ProfileKind = "independentInstructor" | "schoolProvider";

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
};

export type SupplyProfile = {
  kind: ProfileKind;
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
};

export type ProfileReadiness = {
  state: "draft" | "needsReview";
  missing: string[];
};

export type PublicSupplyProfile = {
  kind: ProfileKind;
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

export const getPublicDisplayName = (profile: SupplyProfile) => {
  if (profile.publicDisplayName?.trim())
    return profile.publicDisplayName.trim();

  if (profile.kind === "schoolProvider" && profile.businessName?.trim()) {
    return profile.businessName.trim();
  }

  const firstName = profile.firstName?.trim() || "Instructor";
  const initial = profile.lastName?.trim().charAt(0).toUpperCase();

  return initial ? `${firstName} ${initial}.` : firstName;
};

const hasReviewablePublicName = (profile: SupplyProfile) => {
  if (profile.publicDisplayName?.trim()) return true;
  if (profile.kind === "schoolProvider")
    return Boolean(profile.businessName?.trim());
  return Boolean(profile.firstName?.trim());
};

export const getProfileReadiness = (
  profile: SupplyProfile,
): ProfileReadiness => {
  const missing: string[] = [];

  if (!hasReviewablePublicName(profile)) missing.push("public display name");
  if (profile.resortsServed.length === 0) missing.push("resorts served");
  if (profile.sportsTaught.length === 0) missing.push("sports taught");
  if (profile.lessonTypes.length === 0) missing.push("lesson types");
  if (profile.languages.length === 0) missing.push("languages");
  if (!profile.startingPrice && !profile.priceOnRequest) {
    missing.push("starting price or price-on-request");
  }
  if (!profile.internalContact.email && !profile.internalContact.phone) {
    missing.push("LocalSnow contact method");
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
  displayName: getPublicDisplayName(profile),
  resortsServed: profile.resortsServed,
  sportsTaught: profile.sportsTaught,
  lessonTypes: profile.lessonTypes,
  languages: profile.languages,
  startingPrice: profile.startingPrice,
  priceOnRequest: profile.priceOnRequest,
  availabilityPattern: profile.availabilityPattern,
});
