# Phase 1 Review Gate

## Purpose

This file operationalizes the approval gate before LocalSnow moves from product meaning to surface mapping.

Phase 1 consists of:

1. `00-ceo-brief.md`
2. `01-product-promise.md`
3. `02-user-jobs.md`
4. `03-core-loops.md`

## Review status

Current status: **changes requested — Moli reviewed `00`, `01` and `02`; derived docs updated for another review round**.

Reason: Moli approved the broad direction but changed important product decisions around payment, guarantee, self-managed wording, availability, school listings, supply setup and owner operations. `03-core-loops.md` has been updated from those changes and needs review before approval into surface map.

## Reviewer findings folded in

- `direct` has been renamed/framed as **free self-managed inquiry**.
- The paid route is now **guaranteed request**: online payment first, LocalSnow secures the lesson, a suitable trusted alternative, or refund.
- The public product should feel like a smooth platform; manual owner work remains internal and should not be exposed as the client promise.
- Basic availability/requestability is part of v1 value, but it must not be presented as absolute live truth.
- School/provider listings are included, but only as simple profiles/offers/inquiry intake with no staff/admin complexity.
- Professional setup should be self-serve, guided, warning-driven and optimized for “done once with effort, works forever.”
- Moli needs necessary full CRUD/control access, not a full CRM/dashboard.
- Reviews after lesson/request date are now a simple v1 trust loop.
- Core loops were updated from Moli’s review; `03-core-loops.md` still needs Moli’s review.

## Decisions Moli must approve or change

### D1 — First launch market/resort

Current direction:

> Spain first. Baqueira Beret is the likely first focused resort/marketing wedge. Directory browsing and profile creation should remain open to other resorts/countries because of the SEO directory nature and existing enriched resort data.

Needs Moli confirmation/change.

### D2 — First ICP

Current direction:

> Private or semi-private lesson buyers in Spain/Baqueira where trust, language fit and a guaranteed outcome matter enough to pay.

Needs final confirmation/change.

### D3 — Supply scope

Current direction:

> Independent instructors plus basic school/provider listings from the start. Schools/providers behave like public profiles/offers/inquiry intake only, with no staff/admin features.

Needs final confirmation/change.

### D4 — Language strategy

Open. Decide whether v1 is English-first, Spanish-first, or English + Spanish from day one.

### D5 — Payment/revenue boundary

Moli direction folded in:

> Guaranteed request goes directly to low-friction online payment with price calculated from the selected service/request. LocalSnow then secures the requested lesson, a suitable trusted alternative, or refund. Instructor payout and edge-case coordination can be manual behind the scenes. No Stripe Connect/full payout system in first scaffold.

Legacy reference note: `localsnow-legacy` has a simple `basePrice`/`currency` instructor setup plus older protected-booking capability flags. Treat that as reference material only, not as the new pricing source of truth.

Needs final confirmation/change.

### D6 — LocalSnow operational role

Current direction:

> LocalSnow v1 is a free SEO/discovery directory with marketplace-like paid guaranteed request capability. Public experience should feel platform-led; internal fulfillment can be manually operated by Moli until automation is justified.

Needs final confirmation/change.

### D7 — Credibility/eligibility minimum

Current direction:

> Do not make incomplete profiles a hard blocker while supply is low. Publish useful profiles with clear completeness/trust signals, warnings for missing important information, and no obvious legal/resort/insurance red flags.

Needs final confirmation/change.

### D8 — Availability boundary

Current direction:

> Basic instructor-maintained availability/requestability should exist and can borrow from/emulate the future SkiRelay availability model. It must be presented as useful guidance, not final absolute truth. Profiles/schools can still exist without configured availability.

Needs final confirmation/change.

### D9 — Response-window promise

Open.

### D10 — Notification/action-channel boundary

Open. Moli’s direction: email notifications for important actions, inquiry-sent messages, instructor notifications, confirmation/cancellation action links where useful, and in-platform request visibility where practical. Exact v1 scope still needs approval.

## Approval checklist

Moli can approve Phase 1 when:

- [ ] CEO brief is directionally right after Moli’s review comments.
- [ ] Self-managed vs guaranteed promise is right.
- [ ] User jobs are right.
- [ ] Core loops are right.
- [ ] D1–D10 are approved, edited, or explicitly left as blocked assumptions.

## Rule for next layer

Do not create `04-surface-map.md` until this gate is updated to one of:

- `approved`;
- `approved with stated assumptions`.

If approved with assumptions, the surface map must label every assumption it depends on.