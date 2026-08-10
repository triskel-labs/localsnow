# 06 — Build Plan

## Sequence

```txt
Docs baseline
→ CEO/product review
→ design direction
→ engineering scaffold
→ first vertical slice
→ QA/review
→ next slice
```

Do not jump from docs to broad platform build.

## Milestone 1 — Greenfield foundation

Outcome:

- SvelteKit app scaffold;
- TypeScript baseline;
- Tailwind/design tokens;
- test/check/build scripts;
- Drizzle/Postgres config;
- minimal schema;
- seed data;
- placeholder public routes.

Acceptance:

- install works from fresh clone;
- typecheck passes;
- tests pass;
- build passes;
- homepage renders;
- placeholder resort/profile/setup routes render;
- no legacy LocalSnow code/schema copied by default.

## Milestone 2 — Professional setup to public profile

Outcome:

- professional account/setup entry;
- create draft profile;
- choose resorts/sports;
- add credentials/languages;
- create offer;
- set requestability;
- preview profile;
- publish/request review.

Acceptance:

- mobile setup can be completed with seed/dev auth;
- draft/published states are clear;
- public profile only shows published data.

## Milestone 3 — Client discovery to direct request

Outcome:

- resort/sport page with professional cards;
- profile page with offers;
- direct inquiry form;
- stored ClientRequest;
- notification stub or dev log;
- direct success page.

Acceptance:

- no client account required;
- direct path copy has no LocalSnow guarantee;
- request is visible to operator/dev view.

## Milestone 4 — Protected request and operator case

Outcome:

- protected request explanation;
- protected request form;
- ClientRequest type `protected`;
- OperatorCase creation;
- operator queue/detail.

Acceptance:

- protected copy is honest;
- Moli has enough information to manually coordinate;
- no instant booking claim.

## Milestone 5 — SEO launch slice

Outcome:

- first target resort pages polished;
- metadata/canonical basics;
- mobile QA;
- realistic seed/profiles;
- ready for first outreach/marketing test.

## First implementation issue

Title:

> Scaffold LocalSnow greenfield foundation

Scope:

- create SvelteKit app;
- configure TypeScript/Tailwind/testing/build;
- add Drizzle/Postgres config;
- define minimal schema records from `03-domain-model.md`;
- add seed data for one resort, two sports, three profiles and basic offers;
- add placeholder homepage, resort page, profile page and professional setup route;
- add smoke tests.

PR body must include the required task trace.

## Open decisions before scaffold

- First launch market/resort.
- Language strategy.
- Auth strategy.
- Schools in first scaffold or instructors first.
- Payment completely deferred vs disabled Stripe boundary.
