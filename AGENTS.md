# LocalSnow Agent Instructions

## Source of truth

This is the greenfield LocalSnow repo. Do not inspect or copy `localsnow-legacy` unless Moli explicitly asks for reference extraction.

## Current phase

Product-control docs only. Current active layer: `docs/10-backlog-hierarchy.md`.

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

Do not create schemas, route scaffolding, database migrations, Svelte components, deployment work or final UI/copy until Moli reviews/approves the backlog hierarchy. Each layer must derive from the reviewed layer before it. The backlog hierarchy may define implementation slices and acceptance checks, but it must not execute them yet.

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
