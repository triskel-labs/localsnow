# LocalSnow Agent Instructions

## Source of truth

This is the greenfield LocalSnow repo. Do not inspect or copy `localsnow-legacy` unless Moli explicitly asks for reference extraction.

## Current phase

Phase 1 only:

1. `docs/00-ceo-brief.md`
2. `docs/01-product-promise.md`
3. `docs/02-user-jobs.md`
4. `docs/03-core-loops.md`
5. `docs/PHASE_1_REVIEW_GATE.md`

Do not create UX maps, schemas, SEO plans, architecture, backlog tickets, or scaffold code until Moli reviews/approves the preceding layer. The review gate must be marked `approved` or `approved with stated assumptions` before the surface map starts.

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

- instant booking;
- full calendar sync;
- Stripe Connect;
- automated payouts;
- complex pricing/promos/packages;
- school staff management;
- SkiRelay job board/integration;
- full CRM/admin platform.

## Copy/trust boundary

Never imply confirmed booking, instant availability or guaranteed exact instructor unless the system truly provides it. Prefer: `request`, `available to request`, `protected request`, `LocalSnow helps confirm`, `reschedule/replacement/refund/no-charge`.
