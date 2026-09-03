# LocalSnow Agent Instructions

## Source of truth

This is the greenfield LocalSnow repo. Do not inspect or copy `localsnow-legacy` unless Moli explicitly asks for reference extraction.

## Current phase

Current active checkpoint: provider reach correction before B3 supply profile setup.

1. `docs/00-ceo-brief.md`
2. `docs/01-product-promise.md`
3. `docs/02-user-jobs.md`
4. `docs/03-core-loops.md`
5. `docs/PHASE_1_REVIEW_GATE.md`
6. `docs/04-surface-map.md`
7. `docs/05-domain-record-map.md`
8. `docs/06-state-model.md`
9. `docs/07-copy-trust-system.md`
10. `docs/08-seo-map.md`
11. `docs/09-engineering-architecture.md`
12. `docs/10-backlog-hierarchy.md`

Moli corrected the provider-side acquisition thesis before B3: providers mostly want more clients, more money, less admin/marketing complexity and a fair commission when LocalSnow brings real work. LocalSnow solves reach without requiring providers to film themselves, expose themselves online or gamble on a generic marketing agency. Patch docs/shells with this before further profile work. Do not start auth, database schema, uploads, payments, email delivery or availability engine until the B3 boundary explicitly requires them.

## Professional-team sequence

Every product decision must move through this chain:

```txt
CEO brief
→ Product promise
→ User jobs
→ Core loops
→ Surface map
→ Domain record map (not database schema yet)
→ State model
→ Copy/trust system
→ SEO map
→ Engineering architecture
→ Backlog hierarchy
→ PRs
```

Each layer is crafted from the previous reviewed layer. If a later layer exposes a contradiction, go back and repair the earlier layer before continuing.

## Implementation trace, when coding begins

Every implementation PR must state:

```txt
Goal:
Loop:
Surface:
Record(s):
Action/state:
Acceptance test:
Not included:
```

If the trace is unclear, do not code.

## V1 product boundaries

Do not build in v1 unless explicitly reopened:

- instant confirmation;
- external/full calendar sync; basic LocalSnow availability is allowed;
- Stripe Connect;
- automated payouts;
- complex pricing/promos/packages beyond basic service/request price calculation;
- school staff management;
- SkiRelay job board/full integration; small shared primitives or source-aware availability hooks are allowed when they avoid duplication;
- full CRM/admin platform.

## Copy/trust boundary

Client-facing copy may make LocalSnow feel like a smooth automated platform, but it must not lie about exact instructor, instant confirmation or perfect live availability. Public copy should sell the lesson/booking outcome, not the internal request object. Prefer: `self-managed inquiry`, `guaranteed booking`, `protected booking`, `available lesson time`, `guaranteed lesson or suitable trusted alternative`, `refund if LocalSnow cannot make it happen`.

Do not expose Moli’s manual backend coordination as the public promise. Keep it as internal operating reality: Moli can call/message instructors, handle replacements, payouts and corrections manually until automation is justified.

V1 communication boundary: use email notifications/action links and minimal in-platform tracking. Do not build in-app messaging unless explicitly reopened; Moli needs contact details to call/message directly.

Current copy/trust direction: email is mandatory/backstop for important actions, and a lightweight client account/dashboard is also preferred. Protected payment direction is Stripe Checkout for the full protected booking amount paid to LocalSnow, with Moli manually paying the instructor/provider or refunding outside the platform. Do not call this escrow publicly. Before payment launch, legal/GDPR/online-business documents must be accurate enough by wording and manual process, without pretending automated compliance/tax/invoice/payout infrastructure exists.

Client account/contact capture is strategically important for LocalSnow’s owned audience. Do not hide public SEO/discovery pages behind login, but expect low-friction signup/login or contact capture before high-intent actions such as full availability/contact details, self-managed inquiry or guaranteed booking. Public copy should frame the paid path as guaranteed booking: LocalSnow makes sure the lesson happens, finds a suitable alternative or refunds.

## SEO boundary

LocalSnow must stay worldwide-browsable, but Spain is the first market for supply, marketing, conversion and content investment. Do not mass-generate/index thin worldwide resort/filter pages. Prioritize useful Spain/resort/lesson pages, keep catalog-only pages browsable/noindex when thin, and preserve public discovery outside login while gating high-intent actions later if needed.

## Engineering architecture boundary

The architecture layer may choose module seams, state/action boundaries, SEO/indexability policy, payment/email/account/operator architecture and integration ports. It must not create the app scaffold, exact tables, migrations, routes, UI components, backlog tickets or deployment changes. Code starts only after Moli reviews the backlog hierarchy derived from the architecture.

## B0 implementation boundary

B0 exists to prove the technical foundation is alive. Acceptable B0 work:

- SvelteKit app scaffold;
- package manager and lockfile;
- TypeScript/Svelte/Vite/Vitest/Prettier configuration;
- `.env.example` with placeholder-only environment variables;
- health endpoint and placeholder home route;
- small tested foundation helper naming the active slice;
- PR trace template.

Not acceptable in B0:

- product schema/tables/migrations;
- auth provider wiring;
- real booking/pricing/availability implementation;
- Stripe/email integrations;
- final SEO/public copy;
- deployment or production cutover.

## B1 implementation boundary

B1 exists to make the public discovery shell truthful before page generation. Acceptable B1 work:

- home/value landing shell;
- Spain priority market shell;
- priority resort placeholder shell, starting with Baqueira;
- instructor/supply invitation shell;
- central `PageFamily` / `PageState` / `SeoSilo` / `RetrievalQueryContract` / `MarketPriority` policy;
- tests proving index/noindex is driven by policy, not route existence.

Not acceptable in B1:

- complete resort database;
- generated worldwide SEO pages;
- sitemap automation;
- final SEO copy or schema.org;
- analytics dashboards;
- real search, pricing, booking, availability, auth or payment flow.

## B2 implementation boundary

B2 exists to make resort readiness explicit before supply/profile/offers work. Acceptable B2 work:

- in-code `Country`, `Region`, `Resort`, `ResortReadiness` and `ResortCoverage` records;
- Spain priority resort set: Baqueira, La Molina, Cerler;
- resort pages that show readiness/coverage honestly;
- tests proving thin resorts are noindex by default and priority resorts can be promoted independently;
- supply invitation visibility on priority resort pages.

Not acceptable in B2:

- database-backed catalog migration;
- complete worldwide resort import;
- mass-generated SEO pages;
- fake supply/availability/instant-confirmation claims;
- geospatial search optimization;
- real booking/pricing/availability/auth/payment flow.

## Provider reach correction before B3

This correction affects every provider-facing layer. Use this as the B3 source of truth:

- providers want more clients and money;
- providers usually accept a fair commission if LocalSnow brings real paid work;
- providers want less management, not another platform to operate;
- the wedge is reach without marketing burden: no constant filming, no personal exposure as a content creator, no gamble on a generic marketing agency;
- LocalSnow is a specialized discovery space where snowsports professionals live and clients look for lessons;
- B3 profile setup should feel like creating a professional LocalSnow presence in minutes, not configuring a marketplace operating system.
