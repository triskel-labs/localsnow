# LocalSnow

Greenfield LocalSnow product. The previous codebase is preserved at [triskel-labs/localsnow-legacy](https://github.com/triskel-labs/localsnow-legacy), but this repo is the new product source of truth.

## Current phase

**Implementation: provider reach correction before B3.**

We are not trying to decide the whole product upfront. We are creating the first reviewed decision layer, then deriving the next layer from it.

```txt
Founder/product lead writes strategy memo
→ team critiques it
→ product/design maps users and flows
→ engineering defines domain/state/architecture
→ PM turns it into backlog
→ small slices ship
→ real feedback updates the docs
```

## Product-control docs

Review in order:

1. [`docs/00-ceo-brief.md`](docs/00-ceo-brief.md)
2. [`docs/01-product-promise.md`](docs/01-product-promise.md)
3. [`docs/02-user-jobs.md`](docs/02-user-jobs.md)
4. [`docs/03-core-loops.md`](docs/03-core-loops.md)
5. [`docs/PHASE_1_REVIEW_GATE.md`](docs/PHASE_1_REVIEW_GATE.md)
6. [`docs/04-surface-map.md`](docs/04-surface-map.md)
7. [`docs/05-domain-record-map.md`](docs/05-domain-record-map.md)
8. [`docs/06-state-model.md`](docs/06-state-model.md)
9. [`docs/07-copy-trust-system.md`](docs/07-copy-trust-system.md)
10. [`docs/08-seo-map.md`](docs/08-seo-map.md)
11. [`docs/09-engineering-architecture.md`](docs/09-engineering-architecture.md)
12. [`docs/10-backlog-hierarchy.md`](docs/10-backlog-hierarchy.md)

These are intentionally controlled. They define product meaning, surfaces, records, states, trust/copy, SEO/discovery, architecture and backlog order before product implementation.

## Current implementation slice

The active implementation checkpoint is the provider reach correction before B3 supply profile setup.

Current goal:

- patch previous product-control docs and provider-facing shell copy with the corrected provider acquisition wedge;
- lead provider-side copy with more clients/money, less marketing/admin complexity and fair commission when LocalSnow brings work;
- avoid over-framing providers as anti-platform or asking them to become content creators;
- then continue into B3 with this correction as source of truth.

## Drift guard

Every future layer must be derived from the reviewed layer before it.

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

No inherited legacy assumptions. No aimless coding.
