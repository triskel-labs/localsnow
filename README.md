# LocalSnow

Greenfield LocalSnow product. The previous codebase is preserved at [triskel-labs/localsnow-legacy](https://github.com/triskel-labs/localsnow-legacy), but this repo is the new product source of truth.

## Product direction

LocalSnow is a mobile-first public discovery and protected-request product for snowsports lessons.

- **Clients** find credible instructors/schools by resort, sport and offer, then send a direct or protected request.
- **Professionals** create polished public profiles and simple teaching offers without managing complex software.
- **LocalSnow/Moli** manually coordinates protected requests behind the scenes until real operations prove what should be automated.

## Drift guard

No implementation starts from old LocalSnow assumptions. Every task must trace to:

```txt
Goal → User loop → Surface → Record → Action/state → Acceptance test
```

If a proposed feature cannot trace through that chain, it waits.

## Control docs

Read these before coding:

1. [`docs/00-product-brief.md`](docs/00-product-brief.md)
2. [`docs/01-user-jobs-and-loops.md`](docs/01-user-jobs-and-loops.md)
3. [`docs/02-ux-flows.md`](docs/02-ux-flows.md)
4. [`docs/03-domain-model.md`](docs/03-domain-model.md)
5. [`docs/04-seo-structure.md`](docs/04-seo-structure.md)
6. [`docs/05-copy-and-trust-rules.md`](docs/05-copy-and-trust-rules.md)
7. [`docs/06-build-plan.md`](docs/06-build-plan.md)

## Current status

Planning baseline only. No app code yet.
