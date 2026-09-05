import {
  getProfileIntakeContract,
  getRequiredIntakeFieldKeys,
  type IntakeFieldKey,
} from "./profileIntake";
import type { SetupPathId } from "./profileSetup";

export type ProviderDraftStatus =
  "draft" | "needsReview" | "changesRequested" | "approvedToPublish";

export type ProviderDraftAction =
  "saveDraft" | "submitForReview" | "requestChanges" | "approveForPublication";

export type ProviderDraftActor =
  | { role: "anonymous"; id?: never }
  | { role: "provider"; id: string }
  | { role: "operator"; id: string };

export type ProviderDraftFields = Partial<Record<IntakeFieldKey, string>>;

export type ProviderProfileDraft = {
  draftId: string;
  ownerActorId: string;
  pathId: SetupPathId;
  status: ProviderDraftStatus;
  fields: ProviderDraftFields;
  createdAtIso: string;
  updatedAtIso: string;
};

export type CreateProviderDraftInput = {
  draftId: string;
  ownerActorId: string;
  pathId: SetupPathId;
  nowIso: string;
  status?: ProviderDraftStatus;
  fields?: ProviderDraftFields;
};

export type DraftActionDecision = {
  allowed: boolean;
  reason: string;
};

export type DraftReviewSummary = {
  draftId: string;
  status: ProviderDraftStatus;
  pathId: SetupPathId;
  missingRequiredFieldKeys: IntakeFieldKey[];
  publicFieldKeys: IntakeFieldKey[];
  commercialFieldKeys: IntakeFieldKey[];
  privateFieldKeys: IntakeFieldKey[];
};

export const createProviderDraft = ({
  draftId,
  ownerActorId,
  pathId,
  nowIso,
  status = "draft",
  fields = {},
}: CreateProviderDraftInput): ProviderProfileDraft => ({
  draftId,
  ownerActorId,
  pathId,
  status,
  fields,
  createdAtIso: nowIso,
  updatedAtIso: nowIso,
});

const hasTextValue = (value: string | undefined) => Boolean(value?.trim());

export const getMissingRequiredDraftFields = (
  draft: ProviderProfileDraft,
): IntakeFieldKey[] =>
  getRequiredIntakeFieldKeys(draft.pathId).filter(
    (fieldKey) => !hasTextValue(draft.fields[fieldKey]),
  );

const canOwnerEditStatus = (status: ProviderDraftStatus) =>
  status === "draft" || status === "changesRequested";

const isOwner = (actor: ProviderDraftActor, draft: ProviderProfileDraft) =>
  actor.role === "provider" && actor.id === draft.ownerActorId;

const canProviderEditDraft = (
  actor: ProviderDraftActor,
  draft: ProviderProfileDraft,
): DraftActionDecision => {
  if (actor.role === "anonymous") {
    return {
      allowed: false,
      reason: "anonymous visitors must authenticate before draft actions",
    };
  }

  if (actor.role === "operator") {
    return {
      allowed: true,
      reason: "operator can maintain provider drafts before publication",
    };
  }

  if (!isOwner(actor, draft)) {
    return {
      allowed: false,
      reason: "provider can only edit their own draft",
    };
  }

  if (!canOwnerEditStatus(draft.status)) {
    return {
      allowed: false,
      reason: "provider can only edit drafts before LocalSnow review approval",
    };
  }

  return {
    allowed: true,
    reason: "owner can edit their own draft before review",
  };
};

const canProviderSubmitDraft = (
  actor: ProviderDraftActor,
  draft: ProviderProfileDraft,
): DraftActionDecision => {
  if (actor.role === "anonymous") {
    return {
      allowed: false,
      reason: "anonymous visitors must authenticate before draft actions",
    };
  }

  if (actor.role !== "provider" || actor.id !== draft.ownerActorId) {
    return {
      allowed: false,
      reason: "provider can only submit their own draft",
    };
  }

  if (draft.status === "needsReview") {
    return {
      allowed: false,
      reason: "draft is already waiting for LocalSnow review",
    };
  }

  if (!canOwnerEditStatus(draft.status)) {
    return {
      allowed: false,
      reason: "draft cannot be submitted from its current review state",
    };
  }

  if (getMissingRequiredDraftFields(draft).length > 0) {
    return {
      allowed: false,
      reason: "required intake fields are missing before LocalSnow review",
    };
  }

  return {
    allowed: true,
    reason: "owner can submit a complete draft for LocalSnow review",
  };
};

const canOperatorReviewDraft = (
  actor: ProviderDraftActor,
  draft: ProviderProfileDraft,
  action: ProviderDraftAction,
): DraftActionDecision => {
  if (actor.role !== "operator") {
    return {
      allowed: false,
      reason:
        action === "approveForPublication"
          ? "only LocalSnow operators can approve publication"
          : "only LocalSnow operators can request draft changes",
    };
  }

  if (draft.status !== "needsReview") {
    return {
      allowed: false,
      reason: "operator review actions require a submitted draft",
    };
  }

  return {
    allowed: true,
    reason:
      action === "approveForPublication"
        ? "operator can approve a reviewed draft for publication"
        : "operator can request changes on a submitted draft",
  };
};

export const canPerformDraftAction = (
  actor: ProviderDraftActor,
  draft: ProviderProfileDraft,
  action: ProviderDraftAction,
): DraftActionDecision => {
  if (action === "saveDraft") {
    return canProviderEditDraft(actor, draft);
  }

  if (action === "submitForReview") {
    return canProviderSubmitDraft(actor, draft);
  }

  return canOperatorReviewDraft(actor, draft, action);
};

const getFieldKeysByVisibility = (
  pathId: SetupPathId,
  visibility: "publicProfile" | "commercial" | "localSnowOnly",
): IntakeFieldKey[] =>
  getProfileIntakeContract(pathId)
    .sections.flatMap((section) => section.fields)
    .filter((field) => field.visibility === visibility)
    .map((field) => field.key);

export const getDraftReviewSummary = (
  draft: ProviderProfileDraft,
): DraftReviewSummary => ({
  draftId: draft.draftId,
  status: draft.status,
  pathId: draft.pathId,
  missingRequiredFieldKeys: getMissingRequiredDraftFields(draft),
  publicFieldKeys: getFieldKeysByVisibility(draft.pathId, "publicProfile"),
  commercialFieldKeys: getFieldKeysByVisibility(draft.pathId, "commercial"),
  privateFieldKeys: getFieldKeysByVisibility(draft.pathId, "localSnowOnly"),
});
