# LocalSnow Agent Instructions

## Source of truth

This repo is a greenfield LocalSnow build. Do not inspect or copy `localsnow-legacy` unless Moli explicitly asks for reference extraction.

Before implementing, read:

- `docs/00-product-brief.md`
- `docs/01-user-jobs-and-loops.md`
- `docs/02-ux-flows.md`
- `docs/03-domain-model.md`
- `docs/04-seo-structure.md`
- `docs/05-copy-and-trust-rules.md`
- `docs/06-build-plan.md`

## Required task trace

Every feature/change must state:

```txt
Goal:
Loop:
Surface:
Record(s):
Action/state:
Acceptance test:
```

If the chain is unclear, update the control docs or ask Moli before coding.

## Product boundaries

Build v1 for:

- client discovery;
- professional profile activation;
- direct requests;
- protected requests;
- simple operator case tracking;
- disciplined SEO routes.

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

## Engineering posture

- Mobile-first.
- Small vertical slices.
- Tests for domain rules and core funnels.
- No broad refactors without a failing control point.
- No old LocalSnow schema or route names by default.
- Manual operations are acceptable product design, not a temporary embarrassment.
