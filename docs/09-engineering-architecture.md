# 09 — Engineering Architecture

Derived from: `08-seo-map.md`

## Purpose

This layer turns the reviewed LocalSnow product-control docs into an implementation architecture.

It decides the technical shape needed to build LocalSnow without inventing product meaning:

- app boundaries;
- content and SEO page architecture;
- record ownership and persistence shape;
- public/private action flows;
- payment, email/action-link and lightweight account architecture;
- operator/manual-ops architecture;
- verification expectations for the backlog layer.

This is **not** backlog, tickets, route scaffolding, database migration code, Svelte component design, visual UI, final copy or deployment work.

The next layer can turn this into a backlog hierarchy. This layer exists so implementation starts with clear seams instead of a blob of pages, forms and tables.

## Source constraints from the reviewed layers

The architecture must preserve these decisions:

1. **Worldwide-browsable, Spain-first execution.**
   - Public discovery can browse worldwide catalog data.
   - Spain pages, supply, internal links and conversion paths get the first real investment.
   - Thin worldwide pages are browsable/noindex or hidden, not mass-indexed.

2. **Public benefit is lesson/booking outcome, not internal requests.**
   - Product language and page architecture should lead users toward finding a suitable ski/snowboard lesson.
   - `Request` remains a domain/action unit but not the public promise.

3. **Free/open discovery + optional expert-assisted guaranteed booking.**
   - LocalSnow must not feel like a closed marketplace hiding inquiry behind a paywall.
   - The paid path is stronger because LocalSnow uses its network/team to secure the right lesson, a suitable alternative or a refund.

4. **Manual operations are hidden behind polished product surfaces.**
   - Moli can call/message instructors, coordinate replacements, refund and pay providers manually.
   - Public/client experience should still feel mature, safe and platform-led.

5. **No false automation.**
   - No instant confirmation promise.
   - No perfect live availability promise.
   - No exact instructor guarantee unless actually confirmed.
   - No escrow wording, Stripe Connect, automated payouts or fake tax/compliance machinery in v1.

6. **Public SEO pages stay accessible.**
   - Discovery pages cannot be hidden behind login.
   - High-intent actions can require low-friction account/contact capture.

7. **Search/filter pages are dangerous by default.**
   - Level, language, qualifications, date, duration, sorting and similar refinements should be search params/noindex by default.
   - Clean indexed URLs need proven demand, content, supply and canonical ownership.

8. **Provider profile privacy/trust matters.**
   - Full names/contact details can exist internally.
   - Public default can be first name + surname initial unless the instructor chooses a full professional/public name.
   - `LocalSnow-reviewed` is a manual trust cue, not automatic profile existence.

9. **Bilingual support is product leverage.**
   - EN/ES priority pages matter.
   - Supplier profile translation/pre-fill can improve profile completion, but must be editable and cannot invent facts.

10. **Backlog/code starts only after this architecture is reviewed.**

## Architecture principles

1. **Thin public surfaces, strong domain seams.**
   - Pages/forms should be simple.
   - Business meaning belongs in domain/application modules so later UI changes do not rewrite rules.

2. **State controls visibility and actions.**
   - Page/index states, profile publish states, request states and booking/fulfillment states decide what users see and what actions are available.

3. **Manual-first operations, automation-ready seams.**
   - Build operator controls and audit trails before pretending the system automates everything.
   - Automations can later attach to existing transitions.

4. **SEO is a first-class architecture concern.**
   - Canonical URLs, index/noindex, sitemap eligibility, language alternates and link checks are not afterthoughts.

5. **Avoid schema theatre.**
   - This doc names persistence areas and module boundaries, not final table columns.
   - The backlog/schema layer can decide exact Drizzle tables after this is reviewed.

6. **No code before backlog.**
   - Architecture can choose seams and constraints.
   - Implementation PRs still need backlog items and acceptance tests.

## Recommended system shape

Use one primary web application with modular server-side boundaries.

Initial architecture shape:

```txt
LocalSnow web app
├─ Public discovery layer
│  ├─ home / country / resort / lesson-intent pages
│  ├─ instructor/provider/profile pages
│  ├─ search/results with noindex defaults
│  └─ legal/trust/payment reassurance pages
├─ Action layer
│  ├─ self-managed lesson inquiry
│  ├─ guaranteed booking intake
│  ├─ Stripe Checkout handoff
│  ├─ email/action links
│  └─ lightweight client dashboard/status
├─ Supplier layer
│  ├─ guided profile setup
│  ├─ offers/services
│  ├─ availability/requestability setup
│  ├─ translation/pre-fill support
│  └─ claim/profile review flow
├─ Operator layer
│  ├─ content/page state control
│  ├─ supply/profile moderation
│  ├─ request/booking fulfillment cockpit
│  ├─ payment/refund/manual payout notes
│  └─ review/legal/trust controls
└─ Domain/application layer
   ├─ records and state transitions
   ├─ SEO/indexability policy
   ├─ action permissions
   ├─ notification/action-token policy
   └─ integration ports
```

Recommended implementation stack can stay conventional:

- SvelteKit-style full-stack app or equivalent if the repo later scaffolds differently;
- server-side actions/load functions or route handlers for mutations;
- relational persistence, likely Postgres + Drizzle when schema work starts;
- Stripe Checkout only for guaranteed booking payments;
- email provider behind a notification port;
- no separate microservices in v1 unless a hard operational reason appears.

## Main modules

### A1 — Content and SEO architecture

Purpose:

- publish public discovery pages without thin-page spam;
- keep worldwide catalog browsable while Spain pages lead SEO investment;
- give architecture a single place to decide indexability/canonical rules.

Core concepts:

- `PageFamily`: home, country, resort lesson, lesson-intent, profile, offer/service, search/results, legal/trust.
- `PageState`: index, noindex-browsable, hidden/paused.
- `MarketPriority`: Spain focus vs catalog-only worldwide.
- `CanonicalTarget`: the page that owns search intent.
- `LanguageVariant`: EN/ES page variants where indexing is justified.

Architecture rules:

- Every public SEO page must ask an SEO policy module whether it should be indexed.
- Search/result/filter pages are noindex by default.
- Sitemap generation must read from page state, not route existence.
- Canonicals must point filtered pages back to the strongest owner page.
- Internal links should be generated only to known useful pages.
- Broken-link/link-health checks should become CI or release checks when pages exist.

Not included yet:

- final URL strings;
- sitemap code;
- `hreflang` code;
- schema.org implementation.

### A2 — Catalog/resort architecture

Purpose:

- support worldwide browsing and Spain-first useful pages;
- avoid pretending LocalSnow has real local supply everywhere.

Core concepts:

- `Country` / `Region` / `Resort` as catalog facts.
- `ResortReadiness`: catalog accessible, public basic, SEO rich, paused hidden.
- `ResortCoverage`: linked instructors/providers/offers/nearby alternatives.

Architecture rules:

- Resort pages can exist as catalog pages before they deserve indexing.
- Spain priority resorts should be promoted first: Baqueira, La Molina, Cerler, then nearby/next Spanish resorts.
- Thin resort pages should include useful action paths only if LocalSnow can operate them honestly.
- Supply-side invitation belongs on demand-bearing thin pages, not as a hidden admin-only idea.

### A3 — Supply profile architecture

Purpose:

- let instructors/schools/providers become useful public supply without creating school staff/admin complexity.

Core concepts:

- `SupplyProfile`: public identity and service presence.
- `ProfileKind`: instructor, school/provider.
- `PublicDisplayName`: privacy-aware public identity.
- `ClaimStatus`: unclaimed, claim requested, claimed, LocalSnow-reviewed.
- `ProfilePublishState`: draft, needs review, published, paused/hidden.

Architecture rules:

- Full legal/contact identity can be stored internally for operations.
- Public default should support first name + surname initial unless explicit full professional/business name is chosen.
- Published profiles should receive at least self-managed lesson inquiries.
- Guaranteed booking appears only when a priced/operable LocalSnow-handled path exists.
- `LocalSnow-reviewed` requires manual review/check; do not infer it from profile creation.
- Schools/providers stay simple: profile, services, resort coverage, inquiry/booking path. No staff management in v1.

### A4 — Offers, pricing and availability architecture

Purpose:

- make lesson options requestable/bookable enough for v1 without overbuilding pricing or calendar systems.

Core concepts:

- `Offer`: lesson/service option.
- `PriceSnapshot`: public/booking price facts used at request/payment time.
- `AvailabilityPattern`: season/date range, weekdays, time windows, optional generated slots.
- `RequestabilityStrength`: broad inquiry, slot-like availability, guaranteed booking ready.

Architecture rules:

- Availability should be useful for snowsports, especially independent instructors.
- External/full calendar sync is out of v1.
- Basic LocalSnow availability can exist as source-aware patterns that later integrate with SkiRelay/shared primitives.
- Pricing can support basic price calculation and snapshotting, but not complex promos/packages unless reopened.
- If availability specificity is shown publicly, copy must not say LocalSnow is still checking availability for that exact thing; it should say confirming lesson details when needed.

### A5 — Client action architecture

Purpose:

- convert discovery into either self-managed inquiry or guaranteed booking without making users repeat work.

Core concepts:

- `LessonIntent`: sport, resort/area, date/time preference, level, group size, duration, language/needs.
- `ClientContact`: captured enough to continue the conversation.
- `ActionPath`: self-managed inquiry or guaranteed booking.
- `ClientStatusView`: lightweight status/account/dashboard.

Architecture rules:

- Public discovery remains visible without login.
- High-intent actions may require low-friction account/contact capture.
- Use a unified lesson-intent capture shape; do not split data collection into disconnected forms.
- Client-facing language should say lessons/bookings, not internal request mechanics.
- Lightweight dashboard/status is preferred alongside email/action links.

### A6 — Self-managed inquiry architecture

Purpose:

- support the free/open differentiator without promising LocalSnow fulfillment.

Core concepts:

- `SelfManagedInquiry`: tracked inquiry forwarded to professional/provider.
- `ForwardingStatus`: created, sent, failed, responded/closed where knowable.
- `ContactDisclosure`: what contact data is shown and when.

Architecture rules:

- Client manages coordination after inquiry.
- LocalSnow can track enough for trust/follow-up but does not guarantee response/availability.
- Do not hide inquiry capability behind a paywall.
- Email/action links can let providers respond or accept interest without full account complexity.

### A7 — Guaranteed booking architecture

Purpose:

- support the paid path where LocalSnow handles the match/fulfillment guarantee.

Core concepts:

- `GuaranteedBooking`: LocalSnow-handled booking case.
- `FulfillmentState`: intake, payment pending/paid, operator matching, instructor/provider contacted, proposed alternative, client approval needed, confirmed, fulfilled, refunded/cancelled.
- `GuaranteeOutcome`: lesson happens, suitable alternative, refund.
- `OperatorCase`: internal manual workflow and notes.

Architecture rules:

- Stripe Checkout collects the full protected booking amount paid to LocalSnow.
- Do not call it escrow publicly.
- No Stripe Connect or automated payouts in v1.
- Manual instructor/provider payment and refund handling can stay internal.
- Public copy can feel polished, but must not claim instant confirmation.
- Operator cockpit is essential: Moli needs the case view, contact details, status transitions and refund/replacement notes.

### A8 — Payment, refund and legal/trust architecture

Purpose:

- make payment trustworthy without pretending legal/accounting automation exists.

Core concepts:

- `PaymentIntent/CheckoutSession` as external Stripe references.
- `PaymentState`: unpaid, checkout created, paid, refund pending, refunded, failed.
- `LegalTrustPage`: terms, privacy/GDPR, cookies if needed, refund/cancellation/guarantee, legal/business contact, payment/receipt wording.

Architecture rules:

- Payment state must be stored separately from fulfillment state.
- Webhooks or equivalent server confirmation should be the source for paid/refunded transitions when implementation starts.
- Legal/trust pages must exist and be linkable before payment launch.
- Architecture should allow manual refund notes/status even before automation is complete.
- No automated tax/compliance/invoice claims unless real process supports them.

### A9 — Email/action-link and account architecture

Purpose:

- keep key actions possible through email while supporting a lightweight account/dashboard.

Core concepts:

- `Notification`: recipient, channel, template, status.
- `ActionToken`: scoped, expiring token for a specific action.
- `ClientAccount`: lightweight access to requests/payments/refunds/reviews/contact details.
- `ProfessionalAction`: confirm/take lesson, respond to inquiry, update profile, claim profile.

Architecture rules:

- Email is mandatory/backstop for important actions.
- Action links should be scoped and expire.
- Avoid in-app messaging in v1 unless explicitly reopened.
- Store notification delivery status for operator visibility.
- Provider action copy should stay direct: “I want to confirm/take this lesson” style, not abstract admin wording.

### A10 — Translation/pre-fill architecture

Purpose:

- improve supplier profile completion and bilingual public quality without inventing facts.

Core concepts:

- `ProfileContentField`: source text and language.
- `TranslationDraft`: generated or manually created draft in another language.
- `TranslationReviewState`: draft, edited, approved/published.

Architecture rules:

- Generated translations are drafts, not automatic public truth.
- Never generate unsupported credentials, resorts, prices, availability or claims.
- Supplier/owner should review generated profile copy before publication.
- Translation support is important for conversion and profile fulfillment, but does not justify mass-translating thin SEO pages.

### A11 — Review/trust architecture

Purpose:

- make real-lesson reviews trustworthy without inflated early social proof.

Core concepts:

- `VerifiedLessonReview`: tied to a fulfilled/verified lesson case.
- `ReviewVisibility`: visible, hidden, flagged/removed.
- `ReviewInvite`: one review opportunity per eligible lesson.

Architecture rules:

- Reviews are from real lessons, not merely lesson requests.
- LocalSnow-owned reviews can complement Google Reviews later but should not depend on them.
- Do not show fake review counts or snippets.
- Operator should be able to hide/remove abusive/problem reviews.

### A12 — Operator/control architecture

Purpose:

- let Moli manually operate the business while the public product feels mature.

Core operator needs:

- manage catalog/page state and indexability;
- review/publish/pause profiles and offers;
- inspect and handle self-managed inquiry problems;
- run guaranteed booking cases manually;
- record contact attempts, alternatives, confirmations, refunds and payout notes;
- manage legal/trust page readiness;
- see notification/action-link status;
- see broken-link/page-health issues once implemented.

Architecture rules:

- Operator controls should be private/admin-only.
- Public users should not see manual backend coordination.
- Operator state transitions should be explicit and auditable enough to prevent chaos.
- Do not build a full CRM; build the minimal cockpit needed to fulfill lessons safely.

## Cross-module rules

### State and action permission rule

Every user-visible action should be allowed by explicit state + role checks.

Examples:

- a hidden resort cannot be indexed or publicly promoted;
- a published profile can receive inquiry;
- guaranteed booking action appears only if offer/profile/request path is operable;
- payment action appears only when legal/trust/payment prerequisites are satisfied;
- refund/cancel/confirm actions are operator-only unless a client action link is explicitly scoped.

### SEO/indexing rule

Indexability is not route existence.

A route/page can exist but be:

- indexed;
- noindex but browsable;
- hidden/paused;
- internal/operator-only.

Architecture/backlog should never assume that creating a route means adding it to sitemap or search promotion.

### Contact/account capture rule

Public browsing stays open. High-intent actions can capture contact/account info.

The architecture should support:

- anonymous public browsing;
- low-friction contact capture for inquiries/bookings;
- lightweight account/dashboard for status, payments/refunds and review links;
- email/action links as a backstop.

### Manual ops rule

If a process is manual, model it explicitly for the operator instead of pretending it is automated.

Manual is acceptable for v1 when the public promise remains honest and the operator can keep control.

## Integration boundaries

### Stripe

Use Stripe Checkout for guaranteed booking payment.

In v1:

- full protected booking amount paid to LocalSnow;
- no Stripe Connect;
- no automated payouts;
- refund handling can begin manual/operator-controlled;
- webhook confirmation should eventually be the source of payment truth.

### Email

Use an email provider behind a notification abstraction.

Architecture should not depend on one provider’s template syntax. It should store enough notification state for retries/operator visibility.

### SkiRelay/shared primitives

Keep the seam open for shared availability primitives, but do not integrate SkiRelay as a product dependency in v1.

Allowed:

- simple source-aware availability patterns;
- future-compatible shape for seasons/weekdays/time windows;
- avoiding duplicated primitives if the shared version is clean.

Not allowed by default:

- job board integration;
- full calendar sync;
- SkiRelay-specific flows inside LocalSnow v1.

### Legacy LocalSnow

Do not copy legacy implementation by default.

Legacy may be used only when Moli explicitly asks for reference extraction. This greenfield architecture is the source of truth.

## Architecture sequence before backlog

The backlog layer should derive work in this order:

1. Foundation/documentation gate:
   - architecture reviewed;
   - app scaffold decision;
   - test/quality baseline decision.
2. Public discovery shell:
   - home;
   - Spain/country/resort page shell;
   - SEO state/noindex/canonical policy seam.
3. Catalog and page-state management:
   - resort/catalog facts;
   - page readiness;
   - operator controls.
4. Supply profile setup:
   - instructor/provider profile;
   - privacy-aware public display name;
   - publish/review states.
5. Offer + availability primitive:
   - basic offers;
   - season/weekday/time-window availability;
   - requestability strength.
6. Unified lesson intent capture:
   - shared intake data;
   - self-managed inquiry path;
   - guaranteed booking branch.
7. Email/action-link and lightweight account/status:
   - notifications;
   - scoped action tokens;
   - client status view.
8. Stripe Checkout guaranteed booking path:
   - payment state;
   - operator case creation;
   - refund/cancel/manual notes.
9. Operator fulfillment cockpit:
   - contact attempts;
   - alternatives;
   - confirmations;
   - refund/replacement handling.
10. Reviews and trust/legal readiness:
    - verified lesson review loop;
    - legal/payment trust pages;
    - footer/payment linking.
11. SEO quality automation:
    - sitemap eligibility;
    - broken-link checks;
    - canonical/filter checks;
    - EN/ES language variant support.

Do not turn this sequence into tickets yet. The next layer should choose backlog hierarchy and acceptance criteria.

## Explicitly not decided here

This architecture does not decide:

- exact route paths;
- exact database table names/columns;
- exact auth provider;
- exact email provider;
- exact Stripe webhook implementation;
- exact Svelte component structure;
- visual design system;
- final homepage/profile copy;
- backlog tickets;
- implementation PR order;
- deployment/prod cutover;
- legal document final wording.

## Handoff to next layer

The next layer is backlog hierarchy.

It should convert this reviewed architecture into implementation slices with:

```txt
Goal:
Loop:
Surface:
Record(s):
Action/state:
Acceptance test:
Not included:
```

Each backlog item should be small enough to become a PR and should include verification expectations before code starts.

Do not create app code until the backlog hierarchy is reviewed.

## Review focus for Moli

Review this PR for one question:

> Does this architecture give LocalSnow the right technical seams to build a simple, polished v1 — open discovery, Spain-first SEO, profiles/offers/availability, self-managed inquiry, guaranteed booking, Stripe Checkout, email/action links and operator manual fulfillment — without overbuilding CRM/calendar/payout automation?

If yes, the next layer is backlog hierarchy. If no, repair this architecture before backlog/code starts.
