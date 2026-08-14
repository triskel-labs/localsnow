# LocalSnow Agent Instructions

## Source of truth

This is the greenfield LocalSnow repo. Do not inspect or copy `localsnow-legacy` unless Moli explicitly asks for reference extraction.

## Current phase

Product-control docs only. Current active layer: `docs/05-domain-record-map.md`.

1. `docs/00-ceo-brief.md`
2. `docs/01-product-promise.md`
3. `docs/02-user-jobs.md`
4. `docs/03-core-loops.md`
5. `docs/PHASE_1_REVIEW_GATE.md`
6. `docs/04-surface-map.md`
7. `docs/05-domain-record-map.md`

Do not create schemas, state models, copy/trust systems, SEO plans, architecture, backlog tickets, or scaffold code until Moli reviews/approves the preceding layer. Each layer must derive from the reviewed layer before it. The domain record map must name product records only; it must not become database schema.

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

Client-facing copy may make LocalSnow feel like a smooth automated platform, but it must not lie about exact instructor, instant confirmation or perfect live availability. Prefer: `self-managed inquiry`, `guaranteed request`, `protected/safe request`, `available to request`, `guaranteed lesson or suitable trusted alternative`, `refund if LocalSnow cannot make it happen`.

Do not expose Moli’s manual backend coordination as the public promise. Keep it as internal operating reality: Moli can call/message instructors, handle replacements, payouts and corrections manually until automation is justified.

V1 communication boundary: use email notifications/action links and minimal in-platform tracking. Do not build in-app messaging unless explicitly reopened; Moli needs contact details to call/message directly.
