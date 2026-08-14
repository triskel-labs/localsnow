# 05 — Domain Record Map

Derived from: `04-surface-map.md`

## Purpose

This layer names the **business records** LocalSnow needs before state modeling, copy/trust, SEO, engineering architecture, backlog or scaffold code.

This is **not** a database schema. It does not decide tables, IDs, indexes, migrations, ORM models, routes, API shape or UI components.

A domain record here means:

> a durable product object LocalSnow must understand, show, collect, notify about, correct, or operate around.

## Surface assumptions carried forward

- Spain-first discovery, with broader resort data kept as a secondary catalog foundation; valid canonical resorts should remain usable for supply and demand even before SEO enrichment.
- Each resort should have a dedicated resort page that can become SEO-rich over time, not just a filter value in search.
- Independent instructors plus simple school/provider listings from v1.
- One unified lesson request flow collects the need once, then lets the client choose self-managed inquiry or protected/guaranteed booking.
- Protected requests can collect online payment immediately, but final lesson confirmation is not instant; exact payment timing/capture policy may still be refined before implementation.
- Availability/requestability is useful but never perfect live calendar truth.
- Independent instructors should have a mature enough way to set bookable/requestable slots or windows; if SkiRelay already has a clean availability primitive, LocalSnow should reuse or improve that shared primitive instead of inventing a weaker duplicate.
- Schools/providers have coarser requestability; no staff/admin calendar in v1.
- Email/action links and minimal tracking are allowed; in-app messaging is not.
- Moli needs necessary owner CRUD/control, notes and corrections, not a CRM.

## Record families

```txt
Place/discovery
→ Supply
→ Trust/readiness
→ Request/payment
→ Fulfillment/communication
→ Owner control
```

Keep these as product records first. Engineering can later decide which become tables, JSON fields, derived views, external-provider references, or nothing at all.

## R1 — Resort / place

Product meaning:

A mountain destination where clients search, supply appears, offers are contextualized and a dedicated SEO-rich resort page can later exist.

Needed by surfaces:

- S2 resort directory;
- S3 search/results;
- S4/S5 profiles;
- S6 offer detail;
- S7 request flow;
- future SEO-rich resort pages.

LocalSnow must know:

- name, country/region and public identity/slug;
- Spain-first status: launch focus, active Spain directory, secondary catalog foundation;
- sports/lesson context where known;
- whether it is canonical/catalog-accessible, public basic, SEO-rich, paused/hidden or still only an import candidate;
- page/content readiness: programmatic basic page, useful basic page, SEO-rich page later;
- source/provenance if imported from legacy/worldwide data.

Boundaries:

- Resorts can exist before supply is strong, but once accepted into the canonical catalog they should be usable as supply/demand anchors.
- Empty states must not publicly self-own thin supply.
- Programmatic basic pages can help coverage, but SEO indexation/prominence belongs to the later SEO layer and must avoid thin duplicate content harming trust or conversion.
- Dedicated resort pages are part of the product record meaning, but this does not decide final SEO URL taxonomy, content strategy or geodata architecture.

## R2 — Supply profile

Product meaning:

The public supply identity that can appear in discovery and receive requests.

This covers:

- independent instructor;
- simple school/provider listing.

Needed by surfaces:

- S3 search/results;
- S4 instructor profile;
- S5 school/provider profile;
- S11 professional guided setup;
- S13 owner control.

LocalSnow must know:

- profile type: instructor or school/provider;
- public name, slug, bio/fit summary and visibility;
- resorts, sports, levels and languages;
- public trust/readiness signals;
- contact channels for operator/request handling;
- source: self-created, Moli-created, imported/reference;
- claim/ownership status when relevant.

Type rules:

- Instructor profiles may show personal style, credentials, fit info and more specific availability.
- School/provider profiles stay simple: public profile, offers, requestability and claim path. No staff/admin system.

Boundaries:

- Incomplete-but-useful profiles can be published with warnings.
- Do not claim legal/insurance/credential verification unless actually checked.

## R3 — Offer / service

Product meaning:

A lesson/service a profile can offer and a client can request.

Needed by surfaces:

- S4/S5 profiles;
- S6 offer detail;
- S7 request flow;
- S8 protected payment decision;
- S13 owner control.

LocalSnow must know:

- owning supply profile;
- resort/context;
- sport, level/client fit and format: private/group/family/couple where useful;
- duration or rough session shape;
- public description;
- base price/currency or price-needed/manual marker;
- whether self-managed inquiry is allowed;
- whether protected guaranteed booking is allowed;
- relationship to availability/requestability.

Boundaries:

- V1 needs basic request price calculation, not a full pricing/promos/packages engine.
- Do not model payout rules here.

## R4 — Availability / requestability signal

Product meaning:

A signal that a profile or offer is open to requests, with enough instructor-controlled slot/window setup to feel mature for a snowsports directory, without promising perfect live calendar truth.

Needed by surfaces:

- S3 search/results;
- S4/S5 profiles;
- S6 offer detail;
- S12 availability setup;
- future SkiRelay-compatible availability.

LocalSnow must know:

- target: profile, offer, resort/profile combination, or shared LocalSnow/SkiRelay availability primitive;
- signal type: requestable, coarse availability, bookable/requestable slot, date window, paused/unavailable;
- source: instructor, provider, Moli/operator, future SkiRelay/import;
- freshness/last-updated cue;
- public wording level;
- whether the signal is only a request hint or strong enough to prefill a protected booking request.

Boundaries:

- `available to request` does not mean confirmed availability.
- Instructors should not get an immature fake-availability tool. If SkiRelay's availability model is clean enough, reuse or adapt it as a shared primitive; if not, improve the primitive before copying it into LocalSnow.
- Schools/providers can stay coarser than instructors.
- No full two-way external calendar sync or standalone availability microservice in v1.

## R5 — Trust / readiness signal

Product meaning:

A lightweight way to show whether a profile/offer is complete enough, credible enough or owner-reviewed enough for clients and setup flow.

Needed by surfaces:

- S3 search/results;
- S4/S5 profiles;
- S10 review prompt/form;
- S11 guided setup;
- S13 owner control.

LocalSnow must know:

- missing/complete profile sections;
- missing/complete offer and availability pieces;
- recommended warnings;
- verified/owner-reviewed/completeness signal when deserved;
- public label boundary and internal reason.

Boundaries:

- Not a complex eligibility/reputation system.
- Warnings guide setup; they should not kill early supply unless something is unsafe or unusable.

## R6 — Client / contact channel

Product meaning:

How LocalSnow can reach a client, instructor/provider or owner-operator for request handling and notifications.

Needed by surfaces:

- S7 request flow;
- S9 minimal client tracking;
- S13 owner control;
- S15 notification/action links.

LocalSnow must know:

- email;
- phone/WhatsApp if needed;
- recipient role;
- preferred contact method;
- public/private/operator-only visibility;
- notification eligibility/consent where required.

Boundaries:

- Contact channels are not in-app messaging.
- Private contact data and owner notes must not leak into public surfaces.

## R7 — Unified lesson request

Product meaning:

The core demand record: what the client wants, where, from whom, for which date/context, and which path they chose.

Needed by surfaces:

- S7 unified request flow;
- S8 protected payment decision;
- S9 minimal tracking;
- S13 owner control;
- S15 notifications.

LocalSnow must know:

- client/contact context;
- selected resort/profile/offer where known;
- sport, level, group/client context and message;
- preferred date/window;
- source surface: home, resort, profile, offer, owner-created;
- selected path: self-managed inquiry or protected guaranteed booking;
- response expectation shown to the client;
- public tracking/action-link reference when useful.

Boundaries:

- One request record supports both paths.
- Do not duplicate core data into separate forms unless testing proves the unified flow hurts conversion.
- Lifecycle states come in `06-state-model.md`, not here.

## R8 — Path choice

Product meaning:

The product promise selected for a request.

Options:

- **Self-managed inquiry:** free, forwarded/tracked where possible, no LocalSnow guarantee.
- **Protected guaranteed booking/request:** paid online, LocalSnow secures the requested lesson, suitable trusted alternative or refund.

Needed by surfaces:

- S1 home/value landing;
- S7 unified request flow;
- S8 protected payment decision;
- S9 client tracking;
- S13 owner control.

LocalSnow must know:

- path selected;
- copy/promise version shown;
- time chosen;
- whether upgrade/change is allowed later.

Boundaries:

- Paid path can feel like booking/payment now; final confirmation is later.
- Free path must not inherit fulfillment obligations.

## R9 — Request price / quote

Product meaning:

The price context shown before protected payment.

Needed by surfaces:

- S6 offer detail;
- S8 protected payment decision;
- S13 owner control.

LocalSnow must know:

- selected offer/service price basis;
- currency;
- request inputs that affect price;
- calculated total shown to client;
- manual/owner override marker if used;
- higher replacement price approval marker if needed.

Boundaries:

- Product quote, not final pricing engine design.
- No complex promos/packages/payout accounting in v1.

## R10 — Payment / refund marker

Product meaning:

A minimal business record that a protected request has payment/refund facts LocalSnow must show, operate and correct.

Needed by surfaces:

- S8 payment decision;
- S9 tracking;
- S13 owner control;
- S15 notifications.

LocalSnow must know:

- linked request;
- payment provider reference/checkout marker later;
- amount/currency shown and paid/authorized/collected later, depending on the final payment-timing policy;
- whether the v1 policy is upfront payment, authorization/deposit first, or post-lesson collection;
- payment/refund business status later;
- refund needed/issued marker;
- owner correction/audit note when needed.

Boundaries:

- No Stripe Connect.
- No automated instructor payouts.
- No full ledger/accounting system in first scaffold.
- The final payment-timing decision belongs in the payment/promise implementation layer; this record only preserves the fact LocalSnow may need to distinguish upfront payment, authorization/deposit, capture, post-lesson collection and refund.

## R11 — Guaranteed fulfillment case

Product meaning:

The internal case/checklist created when a paid guaranteed request needs LocalSnow/Moli to secure the requested lesson, replacement, reschedule or refund. This should stay as lightweight as possible: enough to know the next manual action and send the right messages, not a full feature suite.

Needed by surfaces:

- S8 protected payment;
- S9 client tracking;
- S13 owner control;
- Loop C guaranteed fulfillment.

LocalSnow must know:

- linked request, path choice and payment marker;
- requested profile/offer;
- fulfillment target: requested lesson, suitable alternative, reschedule or refund;
- operator next manual action: check details, contact instructor/provider, wait for response, find alternative, ask client approval, send confirmation, or trigger refund;
- contact/response facts;
- replacement candidate notes;
- client approval needed marker;
- public next-step summary;
- confirmation-message facts for client and instructor/provider once the lesson is set.

Boundaries:

- Not a CRM pipeline.
- Not a heavy feature suite: v1 can be a narrow manual operator checklist plus notification facts.
- Not a SkiRelay job board.
- Manual work stays internal while the client experience remains platform-led.

## R12 — Notification / action link

Product meaning:

A record that LocalSnow needs to tell someone something or give them a minimal action path, usually by email.

Needed by surfaces:

- S7 request flow;
- S9 minimal tracking;
- S10 review prompt/form;
- S15 notification surfaces.

LocalSnow must know:

- recipient role: client, professional/provider, owner/operator;
- linked request/profile/offer/payment/review where relevant;
- message purpose: inquiry sent, professional notified, payment received, confirmation, replacement approval, refund, review prompt;
- action token/link if useful;
- delivery status/outcome later;
- public/private copy boundary.

Boundaries:

- Email/action links are not in-app messaging.
- Telegram can be internal/operator convenience later, not the public product promise.

## R13 — Review / review prompt

Product meaning:

A simple trust loop tied to a request/profile after the lesson or requested lesson date.

Needed by surfaces:

- S4/S5 profiles;
- S10 review prompt/form;
- Loop E trust learning.

LocalSnow must know:

- linked request/profile and optionally offer;
- prompt due date and sent/completed marker;
- review content/rating if submitted;
- visibility/moderation marker;
- source path: self-managed or guaranteed.

Boundaries:

- No full reputation/dispute system in v1.
- Keep moderation owner-simple.

## R14 — Claim / ownership transfer request

Product meaning:

A manual-safe way for a professional, school or provider to say “this listing is mine” when Moli created or imported it.

Needed by surfaces:

- S5 school/provider profile;
- S14 claim/ownership transfer intake;
- S13 owner control.

LocalSnow must know:

- target profile/listing;
- claimant contact and relationship to listing;
- claim message/evidence;
- owner review outcome;
- transfer/ownership marker if approved.

Boundaries:

- No automated legal ownership verification.
- No school staff/admin system.

## R15 — Owner note / correction / provenance

Product meaning:

Private owner context for manual handling, corrections and source history.

Needed by surfaces:

- S13 owner control;
- manual guaranteed fulfillment;
- legacy/reference data reuse;
- future SkiRelay/source-aware availability.

LocalSnow must know:

- linked object: resort, profile, offer, availability signal, request, payment marker, review, claim;
- private note/correction content;
- reason/category;
- source: self-serve, owner-created, imported legacy seed, future integration;
- timestamp/actor;
- manual override/freshness implication.

Boundaries:

- Owner notes never leak into public/client surfaces.
- Provenance is a drift-prevention concept, not integration architecture.
- This is not a full CRM activity stream.

## Surface-to-record trace

| Surface | Required records |
| --- | --- |
| S1 Home/value landing | R1 Resort, R8 Path choice |
| S2 Resort directory | R1 Resort, R2 Supply profile, R4 Availability/requestability |
| S3 Search/results | R1 Resort, R2 Supply profile, R3 Offer/service, R4 Availability/requestability, R5 Trust/readiness, R13 Review |
| S4 Instructor profile | R2 Supply profile, R3 Offer/service, R4 Availability/requestability, R5 Trust/readiness, R13 Review |
| S5 School/provider profile | R2 Supply profile, R3 Offer/service, R4 Availability/requestability, R14 Claim request |
| S6 Offer/service detail | R3 Offer/service, R4 Availability/requestability, R9 Request price/quote |
| S7 Unified request flow | R6 Contact, R7 Unified request, R8 Path choice, R12 Notification/action link |
| S8 Protected payment decision | R7 Unified request, R8 Path choice, R9 Quote, R10 Payment/refund, R11 Fulfillment case |
| S9 Minimal client tracking | R7 Unified request, R10 Payment/refund, R11 Fulfillment case, R12 Notification/action link |
| S10 Review prompt/form | R12 Notification/action link, R13 Review/prompt |
| S11 Professional guided setup | R2 Supply profile, R3 Offer/service, R4 Availability/requestability, R5 Trust/readiness |
| S12 Availability setup | R2 Supply profile, R3 Offer/service, R4 Availability/requestability, R15 Provenance |
| S13 Owner control console | R2 Supply profile, R3 Offer/service, R7 Unified request, R10 Payment/refund, R11 Fulfillment case, R15 Owner note/correction |
| S14 Claim intake | R2 Supply profile, R14 Claim request |
| S15 Notifications/action links | R6 Contact, R7 Unified request, R10 Payment/refund, R11 Fulfillment case, R12 Notification/action link, R13 Review prompt |

## Relationship map, still not schema

```txt
Resort
→ has supply profiles and offers
→ has launch/discovery emphasis

Supply profile
→ has contact channels
→ serves resorts
→ owns offers/services
→ has readiness/trust/reviews
→ may have availability/requestability
→ may have claim/ownership transfer request

Offer/service
→ belongs to supply profile
→ can be selected by unified request
→ can produce request quote
→ may have availability/requestability

Unified request
→ has client/contact context
→ may target resort/profile/offer
→ has path choice
→ may have quote/payment marker
→ may create guaranteed fulfillment case
→ may create notifications/action links
→ may later create review prompt/review

Guaranteed fulfillment case
→ is internal/operator-led
→ feeds public tracking/notification summaries
→ may end in confirmation, replacement, reschedule or refund

Owner note/correction/provenance
→ attaches privately to records that Moli operates or imports
→ never leaks into public/client surfaces
```

## State-model handoff

The next layer is `06-state-model.md`. It should model state only where LocalSnow must decide what can happen next, what users see, or what Moli must operate.

Likely state areas:

- supply profile publication/readiness;
- offer requestability;
- availability freshness and slot/window strength;
- unified request lifecycle;
- self-managed inquiry forwarding/tracking;
- protected fulfillment;
- payment timing/capture/refund markers;
- notification/action-link delivery;
- claim request review;
- review prompt/review visibility.

Do **not** turn every record into a state machine.

## Explicitly not decided here

This record map does not decide:

- database schema;
- auth/session model;
- routes/components;
- payment provider implementation;
- exact fulfillment states;
- SEO URL taxonomy;
- copy system;
- backlog tickets;
- app scaffold.

## Review focus for Moli

Review this PR for one question:

> Are these the right business records for v1, without sneaking in schema, CRM, full marketplace, school admin or SkiRelay complexity?

If yes, the next layer is the state model. If no, repair the record map before state/copy/SEO/architecture work starts.
