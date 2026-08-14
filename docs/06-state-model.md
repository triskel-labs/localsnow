# 06 — State Model

Derived from: `05-domain-record-map.md`

## Purpose

This layer defines the product states LocalSnow needs before copy/trust, SEO, engineering architecture, backlog or scaffold code.

This is **not** a database enum list. It does not decide table columns, route names, components, jobs, queues or provider integrations.

A state here means:

> a business stage that changes what a user sees, what LocalSnow can do next, or what Moli must operate.

Do not turn every record into a state machine. Only model state where it controls product behavior.

## State principles

1. **Public truth and internal truth can differ in detail.**
   - Client copy can say “we are checking your request”.
   - Internally, Moli may be calling an instructor, looking for alternatives or waiting on a higher-price approval.

2. **Paid path feels platform-led; fulfillment can stay manual.**
   - The state model must support a smooth client experience without exposing manual backend coordination.

3. **Availability is useful, specific and not absolute.**
   - Independent instructors should normally move toward granular slot-like availability, generated from a season/date range, working weekdays and time ranges per weekday.
   - State must still distinguish requestable/slot-like/fresh/stale without implying instant confirmation.

4. **Payment timing is a policy decision, not a schema decision yet.**
   - The model must support upfront payment, authorization/deposit, capture, post-lesson collection and refund markers until Moli chooses the exact v1 policy.

5. **School/provider states stay simpler than instructor states.**
   - No staff admin, roster calendar or multi-instructor operations in v1.

## State areas

The v1 state model has eleven areas:

1. Resort/page readiness.
2. Supply profile publication/readiness.
3. Offer/service requestability.
4. Availability/requestability strength and freshness.
5. Unified lesson request lifecycle.
6. Self-managed inquiry forwarding/tracking.
7. Protected guaranteed fulfillment.
8. Payment/refund timing.
9. Notification/action-link delivery.
10. Claim request review.
11. Review prompt and review visibility.

## SM1 — Resort / page readiness

Applies to:

- R1 Resort / place.

Why it needs state:

Once LocalSnow accepts a resort into the canonical catalog, it should be usable: clients can find it, supply can attach to it, and demand can be expressed there. The state distinction is not “internal reference versus inaccessible public product”; it is functional accessibility versus how deliberately LocalSnow promotes, indexes and enriches the resort page.

Imported candidates can stay outside the canonical catalog until accepted, but accepted resorts should not sit in a hidden reference-only limbo.

States:

```txt
catalog_accessible
→ public_basic
→ seo_rich
→ paused_hidden
```

Meaning:

- `catalog_accessible`: canonical resort/place; can be found, attached to supply/offers and used in request flows, even before it deserves SEO promotion.
- `public_basic`: has a dedicated public resort page with useful basic information, programmatic structure where needed and honest empty states.
- `seo_rich`: has enough content/internal links/supply context to become a deliberate SEO landing page.
- `paused_hidden`: temporarily hidden from public browsing/search emphasis.

Allowed transitions:

- Imported candidate → `catalog_accessible` only when LocalSnow accepts it as a valid resort/place for supply and demand.
- `catalog_accessible → public_basic` when a resort page can provide user value without faking liquidity.
- `public_basic → seo_rich` when copy/content/supply/links justify SEO investment.
- Any public state → `paused_hidden` if quality, supply, ownership or legal/content concerns require hiding.

Public behavior:

- Empty or weak supply should invite broader search or protected help.
- Never say “we have no instructors here” as a public self-own.
- Programmatic basic resort pages are allowed if they help clients and owners take action, but they should not be treated as SEO-rich merely because a template exists.
- Search-engine indexation and sitemap/promotion policy belongs to the copy/trust and SEO layers; those layers must avoid thin duplicate pages harming trust, conversion or search quality.

Not decided:

- exact SEO URL taxonomy;
- exact indexation/sitemap policy for programmatic basic pages;
- content template;
- schema.org implementation.

## SM2 — Supply profile publication/readiness

Applies to:

- R2 Supply profile;
- R5 Trust / readiness signal;
- R14 Claim / ownership transfer request.

Why it needs state:

Profiles may be self-created, owner-created or imported. Some can be useful before they are perfect. Setup needs warnings without blocking early supply unnecessarily.

States:

```txt
draft
→ needs_required_info
→ publishable_with_warnings
→ published
→ owner_reviewed
→ claimed
→ paused_hidden
```

Meaning:

- `draft`: not ready for public listing.
- `needs_required_info`: missing information that makes the profile unsafe or unusable.
- `publishable_with_warnings`: useful enough to publish, but missing recommended profile/offer/availability/trust details.
- `published`: visible and requestable according to offer/requestability settings.
- `owner_reviewed`: Moli has reviewed enough information to increase confidence.
- `claimed`: the professional/provider owns or controls the listing.
- `paused_hidden`: hidden from public view temporarily or permanently.

Independent instructor notes:

- Instructor profiles can move toward stronger availability and fit detail.
- Instructor setup should feel “done once with effort, works forever.”

School/provider notes:

- School/provider profiles can be owner-created and later claimed.
- Claiming does not imply staff/admin features.

Public behavior:

- Published incomplete profiles can show gentle completeness/trust cues.
- Do not show internal warning lists publicly.

Not decided:

- exact required field list;
- exact verified badge rules;
- auth/ownership implementation.

## SM3 — Offer/service requestability

Applies to:

- R3 Offer / service;
- R4 Availability / requestability signal;
- R9 Request price / quote.

Why it needs state:

A profile can exist while an offer is incomplete, public but not priced, broadly eligible for protected booking, paused, or price-needs-review. Protected booking should not be treated as a rare special state if the listing already has a required price and enough handling context.

States:

```txt
offer_draft
→ inquiry_requestable
→ protected_requestable
→ price_needs_review
→ paused
→ archived
```

Meaning:

- `offer_draft`: offer is not ready to show publicly.
- `inquiry_requestable`: clients can send a free self-managed inquiry; this can exist alongside protected booking and should not become the default ceiling for priced listings.
- `protected_requestable`: clients can choose the paid guaranteed path using this offer; this is the normal target for public listings/offers with required price/currency and enough contact/fulfillment context for Moli to operate the guarantee.
- `price_needs_review`: offer can be shown or inquired about, but protected payment needs owner/manual price confirmation first because required price context is missing, stale, ambiguous, or not safe to sell.
- `paused`: temporarily not receiving requests.
- `archived`: no longer active; kept for history/reference if needed.

Rules:

- `protected_requestable` requires enough price context for a calm payment decision.
- If LocalSnow makes price/currency required for a public listing or offer, the protected route should usually be allowed; inquiry-only is the exception, not the preferred default.
- Self-managed-only is valid when price is missing/manual, contact/fulfillment handling is unsafe, or the profile/offer is not ready for LocalSnow to stand behind the guarantee.
- Availability strength can guide dates and expectations, but coarse or requestable-only availability should not by itself block the protected route when price and handling context are good enough.
- Paused offers should not disappear in a way that breaks owner history.

Not decided:

- final pricing engine;
- promo/package rules;
- payout logic.

## SM4 — Availability/requestability strength and freshness

Applies to:

- R4 Availability / requestability signal.

Why it needs state:

LocalSnow must feel mature for a snowsports directory, not like a generic business directory. Independent instructors should be able to set a season/date range, working weekdays and time ranges per weekday so LocalSnow can generate granular requestable slots. Schools/providers can stay coarser in v1 unless LocalSnow later exposes each instructor's personal availability.

The client ask should match how people normally request ski/snowboard lessons: preferred date(s), preferred start time or time window, duration/amount of hours, or a concrete start/end time. Availability should guide that ask without pretending the lesson is instantly confirmed.

Strength states:

```txt
requestable_only
→ coarse_window
→ slot_like
→ unavailable_paused
```

Freshness states:

```txt
fresh
→ aging
→ stale
→ unknown
```

Meaning:

- `requestable_only`: open to requests, no useful date/slot detail; acceptable as a weak fallback, not the target for serious independent instructor profiles.
- `coarse_window`: broad availability window, season, day ranges or recurring hints; more acceptable for schools/providers than for independent instructors.
- `slot_like`: specific generated date/time availability, or a recurring weekday/time pattern strong enough to generate requestable slots and guide the client flow.
- `unavailable_paused`: not currently accepting requests.
- `fresh`: updated recently enough to display confidently.
- `aging`: still useful but should be worded cautiously.
- `stale`: display as weak signal or ask for confirmation.
- `unknown`: no useful freshness information.

SkiRelay relationship:

- If SkiRelay has a clean availability primitive, reuse or adapt it for LocalSnow.
- "Clean" means it can support the LocalSnow snowsports shape: season/date range, working weekdays, time ranges per weekday, generated requestable slots, duration/start-end-time request capture, freshness, and coarser school/provider requestability.
- If it is not top-notch, improve the shared primitive rather than copying weakness into LocalSnow.
- Do not build a standalone availability microservice in v1.

Public behavior:

- For independent instructors with slot-like availability, show granular availability clearly enough for clients to choose realistic lesson date/time options.
- For schools/providers without individual instructor calendars, ask for the client's preferred date/time/duration and present it as a request, not a confirmed slot.
- Strong slot-like availability can prefill or guide a protected request.
- Even strong slots do not mean final confirmation is instant.

Not decided:

- exact calendar UI;
- external calendar sync;
- shared package/module structure.

## SM5 — Unified lesson request lifecycle

Applies to:

- R7 Unified lesson request;
- R8 Path choice;
- R6 Contact channel.

Why it needs state:

The same request flow supports both self-managed inquiry and protected guaranteed booking. The state must split by path without duplicating the core request object.

States:

```txt
started
→ details_complete
→ path_selected
→ submitted_self_managed
→ submitted_protected
→ closed_abandoned
```

Meaning:

- `started`: client began request flow but has not completed enough details.
- `details_complete`: enough lesson/contact context exists to choose path.
- `path_selected`: client chose self-managed or protected path.
- `submitted_self_managed`: free inquiry submitted for forwarding/tracking.
- `submitted_protected`: protected request submitted and payment/fulfillment handling begins.
- `closed_abandoned`: request was not completed or was discarded.

Rules:

- Request details are collected once.
- Path choice controls promise, payment behavior and owner obligations.
- A self-managed request may later be upgraded only if the future product explicitly supports it.

Public behavior:

- Copy should make protected path feel confident and preferred for users who want help.
- Free path must stay available but cannot imply LocalSnow guarantee.

Not decided:

- exact route/form steps;
- account requirement;
- tracking token implementation.

## SM6 — Self-managed inquiry forwarding/tracking

Applies to:

- R7 Unified lesson request;
- R12 Notification / action link.

Why it needs state:

Self-managed inquiries are free and not guaranteed, but LocalSnow still needs to send/track them enough to make the product feel real and learn demand.

States:

```txt
inquiry_received
→ forwarding_pending
→ forwarded
→ forwarding_failed
→ response_reported
→ closed_no_platform_followup
```

Meaning:

- `inquiry_received`: LocalSnow has the request.
- `forwarding_pending`: notification/action delivery still needs to happen.
- `forwarded`: inquiry sent to professional/provider where technically available.
- `forwarding_failed`: LocalSnow could not forward through the selected channel.
- `response_reported`: a response/outcome was later captured manually or by user/professional action.
- `closed_no_platform_followup`: LocalSnow has no further guarantee or active owner obligation.

Rules:

- This path does not create guaranteed fulfillment obligations.
- Failure to forward should be visible to Moli if it affects trust.

Public behavior:

- Client sees inquiry sent/forwarded when possible.
- Client is reminded response depends on instructor/provider.

Not decided:

- exact email provider;
- whether professionals get action buttons immediately.

## SM7 — Protected guaranteed fulfillment

Applies to:

- R11 Guaranteed fulfillment case;
- R7 Unified lesson request;
- R10 Payment / refund marker;
- R12 Notification / action link.

Why it needs state:

Protected fulfillment is where LocalSnow makes money and trust. It must be controlled enough for Moli to operate manually without becoming a CRM.

Internal states:

```txt
case_opened
→ details_check_needed
→ instructor_contact_needed
→ waiting_instructor_response
→ replacement_needed
→ client_approval_needed
→ lesson_confirmed
→ reschedule_needed
→ refund_needed
→ closed_completed
→ closed_cancelled
```

Meaning:

- `case_opened`: protected request exists and needs handling.
- `details_check_needed`: Moli needs to check request/payment/contact details.
- `instructor_contact_needed`: target instructor/provider must be contacted.
- `waiting_instructor_response`: LocalSnow is waiting internally.
- `replacement_needed`: requested professional/provider cannot serve; alternative needed.
- `client_approval_needed`: client must approve different price, replacement or changed details.
- `lesson_confirmed`: lesson is set and confirmation messages can be sent.
- `reschedule_needed`: lesson can happen but details/date must change.
- `refund_needed`: LocalSnow cannot satisfy the promise or must return money.
- `closed_completed`: business outcome completed.
- `closed_cancelled`: request closed without fulfillment outside refund/completion path.

Client-facing summaries:

```txt
request_received
checking_availability
confirming_details
alternative_proposed
lesson_confirmed
refund_in_progress
closed
```

Rules:

- Public summaries are calmer and less detailed than internal states.
- Do not expose “Moli is manually calling people”.
- Keep the operator surface as a narrow checklist: next action, contact details, notes, send confirmation/refund-related messages.

Not decided:

- exact admin UI;
- task automation;
- SkiRelay replacement network integration.

## SM8 — Payment/refund timing

Applies to:

- R10 Payment / refund marker;
- R9 Request price / quote;
- R11 Guaranteed fulfillment case.

Why it needs state:

Moli reopened the exact timing question: should the client pay immediately, authorize/deposit first, or pay after confirmation/lesson? The state model must preserve options without forcing provider architecture too early.

Policy modes to decide later:

```txt
upfront_payment
authorization_or_deposit_first
capture_after_confirmation
collect_after_lesson
```

Payment states:

```txt
not_required
→ price_shown
→ payment_pending
→ authorized_or_deposit_paid
→ paid
→ capture_needed
→ payment_failed
→ refund_needed
→ refunded
```

Meaning:

- `not_required`: self-managed inquiry or non-paid path.
- `price_shown`: client has seen the protected price/quote.
- `payment_pending`: payment step needed or in progress.
- `authorized_or_deposit_paid`: money is held/partially collected depending on policy.
- `paid`: client has paid the protected amount.
- `capture_needed`: authorized/deposit flow needs final capture/collection.
- `payment_failed`: payment did not complete.
- `refund_needed`: refund should be triggered.
- `refunded`: refund completed/marked complete.

Rules:

- The product promise can still position paid protection as the confident path.
- Final payment policy must be decided before implementation/copy, because it changes trust and conversion.
- No Stripe Connect, automated payouts or full ledger in v1.

Not decided:

- Stripe flow;
- deposit percentage;
- refund automation;
- tax/accounting treatment.

## SM9 — Notification/action-link delivery

Applies to:

- R12 Notification / action link;
- R6 Contact channel;
- R13 Review / review prompt.

Why it needs state:

Email/action links are the allowed communication layer. LocalSnow needs reliable enough delivery without becoming an inbox/chat system.

States:

```txt
queued
→ sent
→ delivered_or_assumed_sent
→ action_opened
→ action_completed
→ failed
→ expired
```

Meaning:

- `queued`: message/action should be sent.
- `sent`: provider accepted send attempt.
- `delivered_or_assumed_sent`: delivery is known or treated as sent if no delivery webhook exists.
- `action_opened`: recipient opened/visited action link.
- `action_completed`: recipient finished requested action.
- `failed`: send/action failed and may need owner attention.
- `expired`: action link should no longer be valid.

Rules:

- Email/action links are not public messaging.
- Telegram can be internal/operator convenience later, not product promise.

Not decided:

- email provider;
- token format;
- webhook architecture.

## SM10 — Claim request review

Applies to:

- R14 Claim / ownership transfer request;
- R2 Supply profile;
- R15 Owner note / correction / provenance.

Why it needs state:

Moli may create/import school/provider listings. A real owner must be able to claim them later without requiring automated legal verification or staff admin.

States:

```txt
claim_submitted
→ owner_review_needed
→ more_info_needed
→ approved_transferred
→ rejected
→ closed_stale
```

Meaning:

- `claim_submitted`: claimant sent request.
- `owner_review_needed`: Moli must inspect/contact/decide.
- `more_info_needed`: claimant needs to provide more proof/context.
- `approved_transferred`: ownership/control transferred or marked approved.
- `rejected`: claim denied.
- `closed_stale`: abandoned/old claim closed.

Rules:

- Claiming a listing does not create school staff/admin features.
- Keep the process manual-safe.

Not decided:

- identity verification provider;
- legal proof requirements;
- ownership permissions model.

## SM11 — Review prompt and review visibility

Applies to:

- R13 Review / review prompt;
- R5 Trust / readiness signal.

Why it needs state:

Reviews improve trust, but v1 should stay simple and owner-moderated.

Prompt states:

```txt
not_due
→ due
→ sent
→ completed
→ skipped_expired
```

Review visibility states:

```txt
submitted
→ visible
→ hidden_owner_review
→ rejected_or_removed
```

Rules:

- Prompt after lesson/request date.
- Tie review to relevant profile and optionally request/offer.
- Keep moderation simple; no full dispute system.

Not decided:

- exact rating fields;
- public reviewer identity rules;
- dispute flow.

## Cross-state rules

### Self-managed path

```txt
Unified request submitted_self_managed
→ inquiry forwarding/tracking states
→ optional review prompt later
```

Must not create:

- guaranteed fulfillment case;
- payment/refund marker except `not_required` if a view needs it;
- LocalSnow replacement/refund obligation.

### Protected path

```txt
Unified request submitted_protected
→ price/payment state
→ guaranteed fulfillment case
→ client-facing tracking summaries
→ review prompt later
```

Must create or expose:

- payment/refund marker according to final payment policy;
- owner next action;
- client next-step summary;
- notification/action links.

### Availability into request flow

```txt
Instructor recurring availability or slot/window
→ generates or suggests date/time options
→ request captures date(s), time/window and lesson duration/hours
→ does not create instant final confirmation
```

Strong availability improves UX and should feel natural for lesson booking, especially on independent instructor profiles, but must still obey the guarantee boundary. School/provider flows can remain request-first unless staff-level availability is explicitly introduced later.

### Resort page readiness into SEO

```txt
catalog-accessible resort
→ public basic resort page
→ SEO-rich resort page later
```

Do not let SEO ambition force fake supply or premature content bloat. Canonical resorts can remain useful supply/demand anchors before the SEO layer decides which basic pages deserve indexing, sitemap inclusion or extra enrichment.

## Open decisions before implementation/copy

These are intentionally not resolved by the state model:

1. **Payment timing policy:** upfront payment, authorization/deposit, capture after confirmation, or collection after lesson.
2. **Availability primitive:** reuse SkiRelay only if it supports the LocalSnow snowsports shape — independent instructor season/date ranges, weekdays, weekday time ranges, generated slots, lesson duration/start-end capture, freshness and coarser school/provider requestability. Otherwise improve the shared primitive before implementation.
3. **Exact required profile/offer fields:** what blocks publication versus what only warns.
4. **Review visibility defaults:** whether submitted reviews go visible immediately or wait for owner moderation.
5. **Client account/tracking model:** email link only or lightweight account area later.

## Handoff to next layer

The next layer is `07-copy-trust-system.md`.

It should define how LocalSnow explains these states in public copy, especially:

- paid protection without anxiety;
- final confirmation not being instant;
- availability that feels specific enough for snowsports lessons, especially granular independent-instructor slots, without lying about instant confirmation;
- programmatic basic resort pages that are useful without becoming thin SEO pages;
- self-managed inquiry as lighter/free but not equally emotionally preferred;
- client-facing tracking summaries that hide manual ops;
- refund/replacement/payment timing language once the payment policy is chosen.

Do not write implementation copy into components yet. The next layer is the trust/copy system, not UI code.
