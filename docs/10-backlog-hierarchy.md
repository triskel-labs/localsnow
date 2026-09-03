# 10 — Backlog Hierarchy

Derived from: `09-engineering-architecture.md`

## Purpose

This layer turns the reviewed LocalSnow architecture into implementation slices.

This is **not** app code, database schema, route scaffolding, visual design, final copy, deployment work or ticket execution. It defines the build order, acceptance shape and non-goals so coding starts in controlled PRs instead of a blob.

Backlog items here are intentionally larger than individual tasks but small enough to become one or more focused implementation PRs.

## Source constraints from the reviewed architecture

The backlog must preserve these decisions:

1. **Greenfield source of truth.** Legacy LocalSnow is reference-only. Reuse concepts only when they improve conversion, instructor ease or operator clarity.
2. **Open public discovery.** SEO/discovery pages stay public; high-intent actions can require low-friction account/contact capture.
3. **Spain-first, worldwide-browsable.** Spain supply/content/conversion gets priority; thin worldwide catalog pages stay browsable/noindex or hidden.
4. **Free self-managed inquiry + paid guaranteed booking.** The free path creates acquisition/trust; the paid path sells LocalSnow-handled confidence.
5. **Manual-first polished operations.** Moli can coordinate manually, but the product must expose the data/status/action control needed to do it safely.
6. **Structured availability without fake precision.** LocalSnow v1 needs real availability/requestability primitives, but no promise of perfect live calendars or instant confirmation.
7. **Calendar-compatible from the beginning.** Google Calendar can later become source-labelled busy blocks, conflict hints or one-way export; it is not the v1 source of truth.
8. **Simple pricing with snapshots.** Reuse the good legacy ideas — base hourly rate, group-size tiers, half-day/full-day duration packages, calculator/breakdown shape — but reject lead-fee/deposit/promo/conditional-pricing bloat by default.
9. **SkiRelay-aware seams, no dependency.** Bridge instructor identity/profile/availability where useful; LocalSnow v1 must still work independently.
10. **Foundation quality gates.** Every implementation slice must account for frontend, backend, data, auth, deployment, security, rate limiting, caching/performance, observability and recovery as relevant.

## Backlog item contract

Every implementation PR should state:

```txt
Goal:
Foundation layer(s):
Loop:
Surface:
Record(s):
Action/state:
Conversion point(s):
Acceptance test:
Foundation gate check:
Not included:
```

If a PR cannot fill this contract, it is not ready to code.

## Recommended build sequence

### B0 — Technical foundation scaffold

Goal:
- create the minimal SvelteKit/Postgres/Drizzle foundation that every later slice can safely build on.

Foundation layer(s):
- frontend, APIs/backend, database/storage, auth/permissions, CI/CD, security, deployment.

Loop:
- internal build loop only.

Surface:
- no real product surface beyond a minimal health/home placeholder if needed.

Record(s):
- none, or only framework metadata required for scaffold verification.

Action/state:
- none.

Conversion point(s):
- none.

Acceptance test:
- fresh install works;
- typecheck/lint/test/build pass;
- health route or equivalent smoke check works;
- environment variables documented without secrets;
- PR template/trace contract exists.

Foundation gate check:
- no secrets in repo;
- server-only secrets stay server-only;
- baseline CI or documented local verification exists;
- deployment target not assumed until explicitly chosen.

Not included:
- product pages, auth UX, payments, email, availability, schema beyond unavoidable scaffold.

### B1 — Public discovery shell + SEO policy seam

Goal:
- create the public discovery skeleton and central SEO/indexability policy before generating pages.

Foundation layer(s):
- frontend, caching/CDN, SEO, accessibility, performance.

Loop:
- client discovers LocalSnow and understands the lesson/booking outcome.

Surface:
- home/value landing;
- country/resort/profile/lesson-intent placeholders only where useful;
- legal/trust placeholder links if payment CTAs appear later.

Record(s):
- `PageFamily`, `PageState`, `SeoSilo`, `RetrievalQueryContract`, `MarketPriority`.

Action/state:
- page can be indexed, noindex-browsable, hidden/paused or internal.

Conversion point(s):
- public page viewed;
- start search/browse;
- supply invitation viewed.

Acceptance test:
- public pages render without login;
- noindex/index decisions are driven by policy, not route existence;
- Spain priority structure is visible without mass-indexing thin pages.

Foundation gate check:
- mobile/narrow screen smoke;
- metadata/canonical policy smoke;
- no broken local links in visible navigation.

Not included:
- complete resort database, sitemap automation, final SEO copy, schema.org, analytics dashboards.

### B2 — Catalog and resort readiness

Goal:
- model resorts as useful product/catalog records without pretending LocalSnow has supply everywhere.

Foundation layer(s):
- database/storage, APIs/backend, caching/performance, SEO.

Loop:
- client browses Spain priority resorts and can understand whether LocalSnow can help there.

Surface:
- Spain country page;
- priority resort shells: Baqueira, La Molina, Cerler;
- supply invitation widget on resort/relevant pages.

Record(s):
- `Country`, `Region`, `Resort`, `ResortReadiness`, `ResortCoverage`.

Action/state:
- catalog accessible → public basic → SEO rich → paused hidden.

Conversion point(s):
- resort page viewed;
- supply signup started;
- lesson action opened from resort.

Acceptance test:
- thin resorts are not indexed by default;
- priority resorts can be promoted independently;
- supply invitation is visible and free/quick.

Foundation gate check:
- indexed/noindex behavior tested;
- seed/import strategy documented;
- no fake supply claims.

Not included:
- full worldwide content investment, final resort copy, geospatial search optimization beyond clean seams.

### B3 — Supply profile setup and publication

Goal:
- let instructors/providers create publishable LocalSnow supply that solves reach first: more lesson clients and money, less marketing/admin complexity, without forcing them to film themselves, expose themselves online or gamble on generic agencies.

Foundation layer(s):
- frontend, backend validation, auth/permissions, database/storage, security.

Loop:
- instructor/provider wants more clients without more marketing complexity → creates a simple professional presence → Moli/LocalSnow reviews/publishes → clients can discover and act → fair commission makes sense when LocalSnow brings paid work.

Surface:
- provider reach/value page or section;
- guided profile setup;
- profile preview;
- operator review/publish controls;
- public profile page when publishable.

Record(s):
- `SupplyProfile`, `ProfileKind`, `PublicDisplayName`, `ClaimStatus`, `ProfilePublishState`, `ProfileContentField`.

Action/state:
- draft → needs review → published → paused/hidden;
- unclaimed → claim requested → claimed → LocalSnow-reviewed.

Conversion point(s):
- supply signup started/submitted;
- profile published;
- public profile viewed.

Acceptance test:
- provider-facing copy leads with more clients/money and less marketing/admin complexity;
- provider setup does not imply they must become content creators, manage ads or hire agencies;
- commission/value exchange is clear without promising guaranteed clients;
- public phone/email/direct contact is never exposed to anonymous users;
- school/provider names can be public full professional names;
- independent instructors default to privacy-safe display unless they choose otherwise.

Foundation gate check:
- server-side authz for edit/publish;
- image/file upload boundary decided or deferred;
- generated translations, if present, are drafts only.

Not included:
- school staff management, direct external-link strategy by default, fake verification.

### B4 — Offers, simple pricing and price snapshots

Goal:
- make lesson offers understandable and priceable enough for inquiry/guaranteed booking without importing legacy pricing bloat.

Foundation layer(s):
- database/storage, backend validation, frontend forms, security.

Loop:
- instructor/provider defines lesson offer → client sees useful price framing → LocalSnow snapshots selected/estimated price at action time.

Surface:
- offer setup;
- offer card/profile section;
- operator pricing review;
- price display in inquiry/booking intake.

Record(s):
- `Offer`, `TeachingOffer`, `PriceRule`, `PriceSnapshot`.

Action/state:
- draft offer → published/requestable offer;
- price-on-request, hourly, half-day, full-day, per-person or per-group.

Conversion point(s):
- offer viewed;
- price reassurance viewed;
- inquiry/guaranteed booking started from offer.

Acceptance test:
- support base hourly price;
- support optional group-size tiers;
- support half-day/full-day duration packages;
- preserve price snapshot at inquiry/payment time;
- show price-on-request without dead-ending conversion.

Foundation gate check:
- numeric/currency validation;
- price display formatting tested;
- no Stripe/payment side effect in pricing-only slice.

Not included:
- promo codes, seasonal discount engines, complex conditional pricing, lead-fee unlocks, refundable-deposit model, automated payouts.

Legacy reference:
- `localsnow-legacy/src/features/Pricing/lib/bookingPriceCalculator.ts` is useful as a conceptual reference for calculator + breakdown, not as code to copy wholesale.

### B5 — Structured availability/requestability primitive

Goal:
- let independent instructors publish mature, structured availability that can generate requestable/slot-like options.

Foundation layer(s):
- database/storage, backend validation, frontend forms, timezone correctness, security.

Loop:
- instructor sets availability → client sees requestable timing options → operator/instructor can confirm details.

Surface:
- instructor availability setup;
- public/profile availability display;
- operator availability view.

Record(s):
- `AvailabilityPattern`, `AvailabilityBlock`, `BookingCommitment`, `RequestabilityStrength`.

Action/state:
- broad inquiry → slot-like availability → guaranteed booking ready;
- active/stale/blocked availability.

Conversion point(s):
- availability viewed;
- slot/time window selected;
- request submitted from availability.

Acceptance test:
- supports season/date range;
- supports weekday time windows;
- supports served resort/area context;
- supports lesson duration options;
- supports unavailable/busy blocks;
- records freshness/last-updated;
- generated slots are labelled as requestable, not confirmed.

Foundation gate check:
- timezone/date tests;
- conflict/race-condition tests for pending/confirmed commitments;
- no public instant-confirmation promise.

Not included:
- full Google Calendar sync, two-way calendar editing, perfect live availability, SkiRelay job board dependency.

### B6 — Unified lesson intent and contact/account capture

Goal:
- make clients express what lesson they need once, then reuse that intent across self-managed inquiry and guaranteed booking.

Foundation layer(s):
- frontend forms, backend validation, auth/contact capture, security, rate limiting.

Loop:
- client finds a lesson option → provides intent/contact → chooses free inquiry or guaranteed booking.

Surface:
- unified intake modal/form;
- low-friction signup/login/contact capture;
- client status seed.

Record(s):
- `LessonIntent`, `ClientContact`, `ActionPath`, `ClientAccount`.

Action/state:
- anonymous browsing → contact captured/account attached → inquiry/booking started.

Conversion point(s):
- intake opened;
- contact capture started/completed;
- inquiry submitted;
- guaranteed booking started.

Acceptance test:
- asks resort, sport, date/date range, preferred start/time window, duration, level, group size, language and special notes;
- does not make users repeat the same data between paths;
- captures enough contact/account data before high-intent actions.

Foundation gate check:
- form validation/errors;
- anti-spam/rate limit;
- no sensitive data in analytics payloads.

Not included:
- full client dashboard, in-app messaging, complex account onboarding.

### B7 — Free self-managed inquiry path

Goal:
- preserve the free/open directory promise while keeping LocalSnow in the relationship loop.

Foundation layer(s):
- backend, notifications/action links, auth/contact capture, rate limiting, observability.

Loop:
- client sends free inquiry → provider/instructor receives it → LocalSnow tracks enough to follow up/measure.

Surface:
- inquiry confirmation;
- provider email/action link;
- operator inquiry status view.

Record(s):
- `SelfManagedInquiry`, `ForwardingStatus`, `Notification`, `ActionToken`, `ContactDisclosure`.

Action/state:
- created → sent → failed/responded/closed where knowable.

Conversion point(s):
- inquiry submitted;
- notification sent/opened/clicked if trackable/lawful;
- provider response action clicked.

Acceptance test:
- no anonymous phone/email/direct contact bypass before capture;
- provider can respond/take interest through a scoped action link;
- operator sees failed sends/problems.

Foundation gate check:
- email provider abstracted;
- action token scoped/expiring;
- abuse controls on inquiry form.

Not included:
- LocalSnow guarantee, payment, full provider dashboard, in-app messaging.

### B8 — Guaranteed booking + Stripe Checkout path

Goal:
- let clients pay for LocalSnow-handled guaranteed booking while preserving honest fulfillment promises.

Foundation layer(s):
- payments, backend, security, legal/trust, observability, recovery.

Loop:
- client chooses guaranteed booking → pays via Stripe Checkout → Moli/operator fulfills, replaces or refunds.

Surface:
- guaranteed booking intake;
- Stripe Checkout handoff;
- payment/status confirmation;
- operator case view.

Record(s):
- `GuaranteedBooking`, `PaymentState`, `CheckoutSession`, `FulfillmentState`, `GuaranteeOutcome`, `OperatorCase`, `PriceSnapshot`.

Action/state:
- intake → checkout created → paid → operator matching → confirmed / alternative proposed / refunded-cancelled / fulfilled.

Conversion point(s):
- guaranteed booking started;
- checkout created;
- checkout completed/abandoned;
- confirmation/status viewed.

Acceptance test:
- full protected booking amount is paid to LocalSnow via Stripe Checkout;
- webhook/server confirmation is the payment truth when implemented;
- legal/trust/refund pages are linkable before payment launch;
- no escrow wording, Stripe Connect or automated payout claim.

Foundation gate check:
- webhook signature verification;
- idempotency;
- secret handling;
- payment error handling;
- refund/manual note path.

Not included:
- Stripe Connect, automated payouts, automated tax/invoice claims, instant confirmation.

### B9 — Operator fulfillment cockpit

Goal:
- give Moli the private control surface needed to manually fulfill lessons safely.

Foundation layer(s):
- auth/permissions, backend, database/storage, audit logs, observability.

Loop:
- Moli reviews requests/bookings → contacts providers → records attempts/alternatives/refunds/confirmations.

Surface:
- operator queue/case detail;
- status transitions;
- notes/contact context;
- problem/refund/dispute controls.

Record(s):
- `OperatorCase`, `OwnerNote`, `FulfillmentState`, `Notification`, `PaymentState`.

Action/state:
- needs action → contacted → waiting → alternative proposed → client approval needed → confirmed → fulfilled/refunded/cancelled.

Conversion point(s):
- operator action taken;
- booking confirmed;
- refund/replacement resolved.

Acceptance test:
- operator can see necessary client/pro/provider/request/payment/contact data;
- public users cannot see manual backend coordination;
- status changes are auditable;
- lesson issues, disputes and refund requests have explicit handling.

Foundation gate check:
- server-side admin authz;
- audit log for sensitive transitions;
- sensitive data not leaked to public/API responses.

Not included:
- full CRM, automated call/message orchestration, accounting system.

### B10 — Email/action links + lightweight client dashboard

Goal:
- keep important actions reachable by email while giving clients a simple owned LocalSnow status surface.

Foundation layer(s):
- notifications, auth/session, security, frontend, observability.

Loop:
- client/provider receives status/action link → completes scoped action → dashboard/status reflects it.

Surface:
- email templates/action links;
- minimal client dashboard/status;
- provider action pages.

Record(s):
- `Notification`, `ActionToken`, `ClientStatusView`, `ProfessionalAction`.

Action/state:
- token created → delivered → used/expired/revoked.

Conversion point(s):
- confirmation viewed;
- action link clicked;
- account/status returned-to.

Acceptance test:
- action links are scoped and expiring;
- important actions work through email backstop;
- client can see request/payment/refund/review status without needing Moli to manually explain everything.

Foundation gate check:
- token security tests;
- resend/retry visibility;
- email failure path.

Not included:
- in-app messaging, complex notification preferences, mobile push.

### B11 — Reviews, trust, legal and social proof

Goal:
- make trust real and useful without fake early marketplace proof.

Foundation layer(s):
- legal/trust, backend, frontend, moderation, analytics/privacy.

Loop:
- real lesson happens → review invite sent → verified review becomes visible if safe → trust improves conversion.

Surface:
- review prompt/submission;
- review snippets on profile/resort pages;
- legal/payment trust pages;
- operator review moderation.

Record(s):
- `VerifiedLessonReview`, `ReviewInvite`, `ReviewVisibility`, `LegalTrustPage`, aggregate inquiry/lead metrics.

Action/state:
- invite eligible → invite sent → review submitted → visible/hidden/flagged.

Conversion point(s):
- review prompt sent;
- review submitted;
- trust snippet viewed;
- public-safe aggregate social proof viewed.

Acceptance test:
- reviews come from real lessons, not just requests;
- no fake review counts/snippets;
- inquiry/lead metrics stay internal until meaningful and public-safe;
- legal/refund/cancellation/privacy pages are accurate enough for payment launch.

Foundation gate check:
- one review per eligible lesson;
- moderation controls;
- GDPR/privacy/cookie implications named.

Not included:
- Google Reviews dependency, bought backlinks/reviews, public lead counters with tiny/noisy data.

### B12 — SkiRelay bridge seam

Goal:
- reduce instructor onboarding friction by bridging shared supply facts without coupling LocalSnow v1 to SkiRelay operations.

Foundation layer(s):
- integration ports, auth/consent, backend validation, security, observability.

Loop:
- instructor has/creates SkiRelay profile → explicitly consents → LocalSnow profile/account draft is populated → LocalSnow publish prerequisites decide public visibility.

Surface:
- one-button “create LocalSnow profile” bridge;
- profile import/review screen;
- operator/source audit view.

Record(s):
- shared instructor identity/profile facts, `ExternalSource`, `ImportSnapshot`, `AvailabilityPattern`, `AvailabilityBlock`.

Action/state:
- bridge offered → consented → draft imported → reviewed/published/paused.

Conversion point(s):
- bridge offered;
- bridge accepted;
- LocalSnow profile completed/published.

Acceptance test:
- no automatic public publication without consent and LocalSnow prerequisites;
- imported fields are source-labelled;
- LocalSnow still works if SkiRelay is unavailable;
- SkiRelay data cannot silently make false public availability/guarantee claims.

Foundation gate check:
- consent/audit trail;
- idempotent import/update;
- failure/retry handling;
- no secrets/token leakage.

Not included:
- SkiRelay job board integration, full two-way sync, shared payments/commission ledger.

### B13 — SEO quality, observability and recovery hardening

Goal:
- make the first launch observable, recoverable and crawl-safe.

Foundation layer(s):
- caching/CDN, monitoring, error tracking/logs, availability/recovery, CI/CD.

Loop:
- operator can detect broken public pages, checkout/webhook failures, downtime and conversion drop-off.

Surface:
- internal health/ops status;
- release checks;
- simple conversion/revenue health review.

Record(s):
- `ConversionEvent`, `HealthCheck`, `ErrorEvent`, `BackupRun`, page-health outputs.

Action/state:
- healthy/degraded/down;
- indexed/noindex link health;
- backup/restore verified.

Conversion point(s):
- funnel smoke test from landing → inquiry/checkout confirmation.

Acceptance test:
- sitemap eligibility reads page state;
- broken-link checks exist;
- Uptime Kuma/Umami/Plausible/Sentry-equivalent decisions are made or explicitly deferred;
- backups and restore path are tested before launch with payments/user data.

Foundation gate check:
- sensitive data redaction;
- rate limits where needed;
- rollback/runbook exists.

Not included:
- enterprise observability, A/B testing platform, high-scale infrastructure before traffic.

## First coding tranche after this backlog is approved

If Moli approves this backlog hierarchy, the first implementation tranche should be:

1. **B0 technical foundation scaffold** — prove fresh install, checks, branch/PR discipline and basic deployment assumptions.
2. **B1 public discovery shell + SEO policy seam** — make pages/indexability controlled before content growth.
3. **B2 catalog/resort readiness** — make Spain priority resort pages useful without fake supply.
4. **B3/B4 thin supply + offers/pricing** — because supply and price are what make discovery actionable.
5. **B5 structured availability** — before inquiry/booking conversion gets too vague.

Do not start payments before B4/B5/B6 have made the buying intent, price and requestability coherent.

## Review focus for Moli

Review this PR for one question:

> Does this backlog hierarchy put the first build slices in the right order — foundation, public discovery, catalog/resorts, supply profiles, simple pricing, structured availability, unified intake, inquiry, guaranteed booking and operator cockpit — without letting legacy pricing/calendar/SkiRelay complexity take over v1?

If yes, the next PR should be the first code/scaffold slice. If no, repair this backlog before implementation starts.
