# 04 — Surface Map

Derived from: `03-core-loops.md` and `PHASE_1_REVIEW_GATE.md`

## Purpose

This layer names the product surfaces LocalSnow needs before domain records, state model, copy system, SEO map, engineering architecture or backlog. It is a review map, not a wireframe and not implementation.

Every surface below must trace to:

```txt
product promise → user job → core loop → boundary/non-goal → approved assumption
```

## Approved assumptions carried forward

- Spain is the primary launch and SEO market; first outreach stays concentrated where Moli has network leverage: Baqueira Beret, La Molina, Cerler and similar Spanish resorts.
- LocalSnow may keep a broader worldwide resort catalog in the data/search foundation, but worldwide access should be secondary and quieter than the Spain path until supply and SEO content justify it.
- First buyer persona: families/couples buying private or group lessons where client-instructor fit, language compatibility and guarantee matter.
- Bilingual English + Spanish from day one; marketing language can vary by channel/audience.
- Free path: self-managed inquiry; LocalSnow forwards/tracks it but does not guarantee response, replacement or refund.
- Paid path: protected/guaranteed booking request; the client can pay online immediately, then LocalSnow secures the requested lesson, a suitable trusted alternative or refund. Do not call the final lesson confirmation instant.
- Basic instructor availability/requestability is useful but never absolute live truth.
- Schools/providers start as simple profiles/offers/requestability only; no staff/admin features.
- V1 uses email notifications/action links, contact details and minimal tracking. No in-app messaging.
- Owner/admin surfaces are necessary CRUD/control, not a full CRM.
- Availability should be source-aware and future SkiRelay-compatible, but no standalone microservice now.

## Legacy reference facts checked

The legacy repo is reference-only, but it has useful raw material:

- Resort seed data exists as both CSV and TypeScript data in `localsnow-legacy/src/lib/server/db/seeds/`, with a worldwide catalog that can prevent double work later.
- Legacy SEO work included dynamic sitemaps, hreflang, canonical URLs, structured data for home/instructor/resort pages and noindex rules for private transactional pages. The new surface map should not build the full SEO silo now, but it should avoid decisions that would force a URL/data rewrite later.
- Legacy offers/pricing were simple but useful reference points: base lesson price/currency, estimated request price, promo code fields and manual price markers. New v1 should stay simpler than the legacy engine, but the offer surface should be expandable toward packages, promo codes and richer snowsports pricing.
- Legacy calendar work treated Google Calendar as an availability/booking aid. For this new product, "full calendar sync" means two-way external calendar sync; a later minimum outbound event/add-to-calendar path can stay open without making v1 depend on full sync.

## 1. Public discovery surfaces

### S1 — Public home / value landing

What it must do:

- help a client go from "I want a lesson and I do not know where to look" to a clear next action in one screenful;
- sell the benefit, not the mechanism: credible options, less uncertainty, a safer way to get a lesson arranged and less work for the client;
- make paid protection feel like the natural path for people who want confidence, while keeping the free inquiry available without giving it equal emotional weight;
- explain the free/paid distinction through outcomes: "send a request yourself" versus "let LocalSnow help secure the lesson or refund you";
- avoid payment copy that creates anxiety. The paid route can feel like booking now, with final confirmation after LocalSnow/provider acceptance;
- route users to resort/service discovery quickly;
- support English and Spanish;
- be SEO-aware from the start: clear H1 promise, resort/sport search intent, internal links and schema-ready structure.

Trace:

```txt
Product promise: find credible professionals + choose self-managed or guaranteed
→ User job: understand LocalSnow and pick a path
→ Core loop: Loop B client request
→ Boundary: paid booking request can be instant; final confirmation and exact instructor are not guaranteed
→ Assumptions: D2, D4, D5, D6, D9
```

Not included:

- brand story-heavy hero;
- full SEO silo map;
- pricing engine details.

### S2 — Resort directory / resort browsing

What it must do:

- make Spain the obvious browsing path, especially network-led resorts;
- keep worldwide resort records available for search/SEO expansion, but do not make global browsing compete with the Spain-first path yet;
- support resort pages that can later become SEO landing pages without changing the underlying resort identity model;
- avoid blunt thin-supply messaging. Empty states should say the current dates/filters have no matching available professionals, invite a broader search or protected help and avoid exposing internal supply weakness;
- never fabricate supply or imply equal liquidity across resorts.

Trace:

```txt
Product promise: discovery with Spain-first depth and worldwide expandability
→ User job: find lesson options in a resort
→ Core loop: Loop B client request
→ Boundary: no fake supply/liquidity; no public thin-supply self-own
→ Assumptions: D1, D2, D3, D4
```

Not included:

- final SEO URL taxonomy;
- rich resort content strategy;
- map/geodata architecture.

### S3 — Search/results list

What it must do:

- show instructor and simple school/provider results together without confusing their capabilities;
- allow a simple Instructors / Schools / Both view toggle if mixed results feel noisy;
- expose sport, resort, level, language, offer type and availability/requestability cues;
- show profile completeness, verified signal and review signal where available;
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
- show completeness/verified signal and visible reviews without overcomplicating trust;
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

- show a basic school/provider listing similar to the instructor profile, but without requiring individual instructor availability;
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
- keep the open path available by default: every service should be requestable unless the professional/provider explicitly cannot support it;
- clarify whether the service can be paid as protected booking now, sent as self-managed inquiry, or both;
- use legacy offers/packages/promo-code/pricing work as reference so the v1 record can expand later without rebuilding the concept.

Trace:

```txt
Product promise: selected service/request price for paid path
→ User job: understand what they are asking for before inquiry/payment
→ Core loop: Loop B client request
→ Boundary: no complex pricing/promos/packages in v1, but do not block future expansion
→ Assumptions: D5
```

Not included:

- final pricing engine;
- live promo/discount/package system;
- payout rules.

## 3. Client request surfaces

### S7 — Unified lesson request flow

What it must do:

- collect client contact, date/context, group/level/message and selected profile/offer;
- use one shared form for both paths because the core data is the same;
- present paid protected booking as the preferred confident path for clients who want LocalSnow help;
- keep self-managed inquiry as the lighter fallback, visibly available but less persuasive;
- send/track the request and email confirmations where available;
- keep the copy benefit-led and calm: faster clarity, less searching, safer outcome.

Trace:

```txt
Product promise: one request flow, two outcomes
→ User job: submit the lesson need quickly on mobile
→ Core loop: Loop B client request
→ Boundary: no duplicated forms; free path does not include LocalSnow fulfillment
→ Assumptions: D5, D6, D9, D10
```

Not included:

- in-app chat;
- separate self-managed form unless testing proves the unified flow hurts conversion;
- LocalSnow manual fulfillment tasks unless the client chooses the paid protected path.

### S8 — Protected booking/payment decision surface

What it must do:

- reuse the unified request details from S7;
- calculate and show the price before payment;
- explain the guarantee through user benefit: LocalSnow helps secure the lesson, a suitable trusted alternative or a refund;
- make payment feel like the next natural step, not a separate financial detour;
- collect online payment immediately when the client chooses protection;
- say final confirmation follows after LocalSnow/provider acceptance, usually with a response within 24–48h.

Trace:

```txt
Product promise: paid guaranteed request
→ User job: pay safely and feel the lesson is being handled
→ Core loop: Loop B client request + Loop C guaranteed fulfillment
→ Boundary: no Stripe Connect, no instant final confirmation, no exact instructor guarantee
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
- avoid hard dependency on SkiRelay;
- leave room for minimum outbound calendar support later, such as adding confirmed LocalSnow/SkiRelay events to a linked calendar.

Trace:

```txt
Product promise: useful availability signal, not absolute live truth
→ User job: see/configure availability when useful
→ Core loop: Loop A supply activation + Loop B client request
→ Boundary: no two-way external calendar sync, no standalone microservice now
→ Assumptions: D8
```

Not included:

- full two-way calendar sync;
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

1. **Public home/value landing** — locks the conversion promise before writing homepage copy.
2. **Resort directory + search/results** — proves Spain-first discovery with worldwide data kept ready and no public thin-supply self-own.
3. **Instructor/profile + reviews + offer detail** — locks client-instructor fit, trust signals, availability wording and CTAs.
4. **Unified lesson request flow** — captures the need once and lets the client choose protected booking or self-managed fallback.
5. **Protected booking/payment decision** — first revenue path.
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
- unified lesson request;
- path choice: self-managed inquiry or protected booking;
- payment/refund marker;
- notification/action link;
- review;
- owner note/correction.

Do not scaffold code until the domain record map, state model, copy/trust system, SEO map, engineering architecture and backlog hierarchy are reviewed enough to trace implementation.
