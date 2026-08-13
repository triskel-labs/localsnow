# 04 — Surface Map

Derived from: `03-core-loops.md` and `PHASE_1_REVIEW_GATE.md`

## Purpose

This layer names the product surfaces LocalSnow needs before domain records, state model, copy system, SEO map, engineering architecture or backlog. It is a review map, not a wireframe and not implementation.

Every surface below must trace to:

```txt
product promise → user job → core loop → boundary/non-goal → approved assumption
```

## Approved assumptions carried forward

- Spain-wide directory/supply surface; first outreach concentrated where Moli has network leverage: Baqueira Beret, La Molina, Cerler and similar Spanish resorts.
- First buyer persona: families/couples buying private or group lessons where client-instructor fit, language compatibility and guarantee matter.
- Bilingual English + Spanish from day one; marketing language can vary by channel/audience.
- Free path: self-managed inquiry; LocalSnow forwards/tracks it but does not guarantee response, replacement or refund.
- Paid path: guaranteed request; low-friction online payment first, then LocalSnow secures the requested lesson, a suitable trusted alternative or refund.
- Basic instructor availability/requestability is useful but never absolute live truth.
- Schools/providers start as simple profiles/offers/requestability only; no staff/admin features.
- V1 uses email notifications/action links, contact details and minimal tracking. No in-app messaging.
- Owner/admin surfaces are necessary CRUD/control, not a full CRM.
- Availability should be source-aware and future SkiRelay-compatible, but no standalone microservice now.

## 1. Public discovery surfaces

### S1 — Public home / value landing

What it must do:

- explain LocalSnow in one screenful;
- show the two paths: free self-managed inquiry and paid guaranteed request;
- make the paid guarantee clear without promising exact instructor or instant confirmation;
- route users to resort/service discovery quickly;
- support English and Spanish.

Trace:

```txt
Product promise: find credible professionals + choose self-managed or guaranteed
→ User job: understand LocalSnow and pick a path
→ Core loop: Loop B client request
→ Boundary: no instant booking, no exact instructor guarantee
→ Assumptions: D2, D4, D5, D6, D9
```

Not included:

- brand story-heavy hero;
- full SEO silo map;
- pricing engine details.

### S2 — Spain resort directory / resort browsing

What it must do:

- let clients browse/search Spanish resorts;
- support network-led focus resorts without hiding other Spain-wide supply;
- show whether LocalSnow has instructors, schools/providers, requestable offers or sparse coverage;
- avoid pretending every resort is equally strong.

Trace:

```txt
Product promise: discovery
→ User job: find lesson options in a resort
→ Core loop: Loop B client request
→ Boundary: no fake nationwide liquidity
→ Assumptions: D1, D2, D3, D4
```

Not included:

- final SEO URL taxonomy;
- rich resort content strategy;
- map/geodata architecture.

### S3 — Search/results list

What it must do:

- show instructor and simple school/provider results together without confusing their capabilities;
- expose sport, resort, level, language, offer type and availability/requestability cues;
- show profile completeness or verified signal where available;
- provide clear CTAs: view profile, self-managed inquiry, guaranteed request if eligible.

Trace:

```txt
Product promise: credible options + clean request paths
→ User job: compare credible lesson options
→ Core loop: Loop B client request
→ Boundary: no perfect availability truth, no school staff admin
→ Assumptions: D2, D3, D7, D8
```

Not included:

- ranking algorithm;
- paid placement;
- full review/reputation model.

## 2. Profile and offer surfaces

### S4 — Instructor profile

What it must do:

- show who the instructor is, where they teach, sport/level, languages and fit information;
- show simple offers/services;
- show availability/requestability if configured, with careful non-absolute wording;
- show completeness/verified signal without overcomplicating trust;
- provide free self-managed inquiry and paid guaranteed request CTAs when allowed.

Trace:

```txt
Product promise: credible professional + self-managed/guaranteed paths
→ User job: decide if this instructor fits
→ Core loop: Loop A supply activation + Loop B client request
→ Boundary: no exact instructor guarantee on paid route, no perfect live calendar
→ Assumptions: D2, D5, D7, D8
```

Not included:

- public claim that LocalSnow has verified insurance/legal standing unless actually checked;
- instructor-facing analytics;
- complex packages/promos.

### S5 — School/provider profile

What it must do:

- show a basic school/provider listing with contact/request routes;
- show simple offers and resort coverage;
- use coarser availability/requestability wording than instructor profiles;
- support owner-created listings;
- leave room for later claim/ownership transfer.

Trace:

```txt
Product promise: discovery directory plus simple request capability
→ User job: consider a school/provider option
→ Core loop: Loop A supply activation + Loop B client request
→ Boundary: no school staff management, no multi-instructor calendar
→ Assumptions: D3, D7, D8
```

Not included:

- staff roster;
- individual instructor linking unless it is trivial later;
- school admin dashboard.

### S6 — Offer/service detail

What it must do:

- explain what the lesson/service includes: sport, level, format, rough duration, group/private fit, resort/context;
- expose the base information needed for a request and basic price calculation;
- clarify whether it supports guaranteed request, self-managed inquiry or both;
- avoid designing the final pricing engine here.

Trace:

```txt
Product promise: selected service/request price for paid path
→ User job: understand what they are asking for before inquiry/payment
→ Core loop: Loop B client request
→ Boundary: no complex pricing/promos/packages beyond basic calculation
→ Assumptions: D5
```

Not included:

- canonical pricing schema;
- promo/discount/package system;
- payout rules.

## 3. Client request surfaces

### S7 — Self-managed inquiry form

What it must do:

- collect client contact, date/context, group/level/message and selected profile/offer;
- make clear it is free and not guaranteed;
- send/track the inquiry and email confirmations where available;
- set expectation that response depends on the instructor/provider.

Trace:

```txt
Product promise: free self-managed inquiry
→ User job: submit a request quickly on mobile
→ Core loop: Loop B client request
→ Boundary: no LocalSnow follow-up/replacement/refund on this path
→ Assumptions: D6, D9, D10
```

Not included:

- in-app chat;
- payment;
- LocalSnow manual fulfillment tasks unless the client upgrades/chooses guaranteed later.

### S8 — Guaranteed request flow / payment surface

What it must do:

- collect request details with minimum friction;
- calculate and show the price before payment;
- explain the guarantee: requested lesson, suitable trusted alternative or refund;
- explain that exact instructor and instant confirmation are not guaranteed;
- collect online payment;
- confirm the client should receive a response within 24–48h.

Trace:

```txt
Product promise: paid guaranteed request
→ User job: pay safely and understand the guarantee
→ Core loop: Loop B client request + Loop C guaranteed fulfillment
→ Boundary: no Stripe Connect, no instant confirmation, no exact instructor guarantee
→ Assumptions: D5, D6, D9, D10
```

Not included:

- full checkout provider architecture;
- automated payout;
- replacement marketplace.

### S9 — Minimal client request tracking

What it must do:

- show the client enough status/next-step information after inquiry/payment;
- expose email/action-link outcomes where useful;
- keep wording public/platform-led, not “Moli is calling people manually”; 
- distinguish self-managed expectation from guaranteed request SLA.

Trace:

```txt
Product promise: confirmation/next step without exposing internal manual ops
→ User job: know what happens next
→ Core loop: Loop B client request + Loop C guaranteed fulfillment
→ Boundary: no in-app messaging, no full client portal
→ Assumptions: D6, D9, D10
```

Not included:

- in-app chat thread;
- complex account area;
- detailed internal operator notes.

### S10 — Review prompt / review form

What it must do:

- send/present a review prompt after the lesson/request date;
- tie feedback to the relevant professional/profile;
- improve visible trust over time;
- stay simple until demand exists.

Trace:

```txt
Product promise: profile trust compounds
→ User job: leave review after lesson/request date
→ Core loop: Loop E future trust/reputation learning
→ Boundary: no full reputation system before demand
→ Assumptions: D7, D10
```

Not included:

- dispute moderation system;
- complex ratings taxonomy;
- public legal verification claims.

## 4. Supply and owner surfaces

### S11 — Professional guided setup

What it must do:

- guide instructor/school through profile, resorts, sports, levels, languages, fit information and offers;
- allow incomplete-but-useful publication with warnings;
- preview public profile before publishing;
- make setup feel like “done once with effort, works forever.”

Trace:

```txt
Product promise: credible public profile for professionals
→ User job: look credible online and receive qualified requests
→ Core loop: Loop A supply activation
→ Boundary: no heavy admin/calendar/software work
→ Assumptions: D3, D7, D8
```

Not included:

- full school admin;
- instructor payout setup;
- analytics dashboard.

### S12 — Availability/requestability setup

What it must do:

- let independent instructors expose useful availability/requestability signals;
- keep schools/providers coarser unless staff-level availability becomes easy later;
- mark source/owner of the signal so future SkiRelay updates can feed it;
- avoid hard dependency on SkiRelay.

Trace:

```txt
Product promise: useful availability signal, not absolute live truth
→ User job: see/configure availability when useful
→ Core loop: Loop A supply activation + Loop B client request
→ Boundary: no external/full calendar sync, no standalone microservice now
→ Assumptions: D8
```

Not included:

- full calendar sync;
- SkiRelay job board;
- external tool integrations.

### S13 — Owner CRUD/control console

What it must do:

- let Moli create/edit/correct profiles, schools/providers, offers, requests, payments/refunds markers and reviews enough to operate;
- expose paid guaranteed requests needing action;
- show contact details and next action;
- support internal notes and correction power;
- stay practical, not a full CRM/performance dashboard.

Trace:

```txt
Product promise: platform-led public experience with owner-operated fulfillment
→ User job: Moli operates guaranteed cases successfully
→ Core loop: Loop C guaranteed fulfillment
→ Boundary: no full CRM/admin platform
→ Assumptions: D5, D6, D10
```

Not included:

- sales pipeline CRM;
- automated payout ledger;
- staff/team permission system.

### S14 — School listing claim / ownership transfer intake

What it must do:

- let a school/provider express “this is my listing”;
- give Moli enough info to review/contact/transfer ownership later;
- keep it manual-safe in v1.

Trace:

```txt
Product promise: simple school/provider listings from the start
→ User job: claim or take ownership of an owner-added listing later
→ Core loop: Loop A supply activation
→ Boundary: no full provider admin system
→ Assumptions: D3, D10
```

Not included:

- automated legal ownership verification;
- staff invitation flow;
- provider backoffice.

### S15 — Email/action notification surfaces

What it must do:

- define the minimum notifications/actions for self-managed inquiry and guaranteed request;
- support inquiry sent, professional notified, guaranteed payment received, response/confirmation/replacement/refund-related messages;
- use action links where useful;
- keep Telegram as possible internal/operator convenience, not public messaging product.

Trace:

```txt
Product promise: confirmations and next steps without in-app messaging
→ User job: receive important updates and act when needed
→ Core loop: Loop B client request + Loop C guaranteed fulfillment
→ Boundary: no in-app messaging
→ Assumptions: D10
```

Not included:

- chat inbox;
- arbitrary notification automation;
- public Telegram bot.

## 5. Surface sequence recommendation

Build/review surfaces in this order:

1. **Public home/value landing** — locks the self-managed vs guaranteed promise.
2. **Resort directory + search/results** — proves Spain-wide but network-focused discovery without fake liquidity.
3. **Instructor profile + offer detail** — locks client-instructor fit, availability wording and CTAs.
4. **Self-managed inquiry form** — lowest-friction lead capture and demand signal.
5. **Guaranteed request/payment flow** — first revenue path.
6. **Minimal client request tracking + email/action notifications** — makes the platform feel real after submission.
7. **Owner CRUD/control console** — lets Moli fulfill guaranteed cases without a CRM.
8. **Professional guided setup + availability setup** — grows supply quality.
9. **School/provider profile + claim intake** — supports directory breadth without admin complexity.
10. **Review prompt/form** — compounds trust once real requests exist.

## 6. What remains for the next layer

The next layer is `05-domain-record-map.md` and must name product records without becoming a database schema. It should derive records from these surfaces, especially:

- professional/profile;
- school/provider listing;
- resort;
- offer/service;
- availability/requestability signal;
- self-managed inquiry;
- guaranteed request;
- payment/refund marker;
- notification/action link;
- review;
- owner note/correction.

Do not scaffold code until the domain record map, state model, copy/trust system, SEO map, engineering architecture and backlog hierarchy are reviewed enough to trace implementation.
