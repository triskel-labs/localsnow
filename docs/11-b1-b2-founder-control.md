# 11 — B1/B2 Founder Control Correction

Derived from: Moli's B1/B2 review after implementation outran founder visibility.

## Purpose

This correction makes the already-merged B1/B2 work legible again.

B1 and B2 are **scaffold/policy seams**, not final launch copy, final SEO architecture, final catalog storage, final route tree, or proof that LocalSnow has supply in a resort.

The goal is to keep the useful foundations while preventing the codebase from silently turning temporary seed data and scaffold copy into product law.

## Current decision status

- B0 technical scaffold: keep.
- B1 discovery shell + SEO policy: keep as scaffold/policy seam.
- B2 resort readiness catalog: keep as seed/readiness seam.
- B3 supply profile work: paused until this correction is reviewed.

## Copy status

Current public copy in B1/B2 pages is **placeholder/scaffold copy**.

It is not final homepage copy, final resort copy, final provider acquisition copy, or launch-ready Spanish/English wording.

Rules:

1. Do not tune conversion copy inside plumbing/domain PRs.
2. Do not treat helper strings or page shells as final public voice.
3. Once i18n lands, public headings, CTAs, badges, SEO titles/descriptions and fallback text should come through message keys, not hardcoded English strings.
4. Spanish is the source/primary copy language. English exists from the beginning as a maintained translation, not an afterthought.

## I18n decision

Use an organized Paraglide/Inlang-style i18n layer from the beginning of real copy work.

Direction:

- primary locale: `es`;
- secondary locale: `en`;
- Spanish source copy first;
- English reviewed translation from the start;
- generated translations are drafts only;
- generated/profile translations must never invent credentials, resorts, prices, availability, guarantees or experience claims.

Legacy inspiration:

- legacy had `/en` and `/es`, localized route helpers, canonical URLs, hreflang and sitemap alternates;
- reuse the *pattern* of localized routing and alternate URLs;
- do not copy legacy's heavier app/product gravity wholesale.

## Route tree decision

Canonical resort/directory SEO should be **resource-first**, not country-first.

Preferred final pattern:

```txt
/:locale/resorts/:country/:region?/:resort
```

Localized examples:

```txt
/es/estaciones/espana/valle-de-aran/baqueira
/en/resorts/spain/val-daran/baqueira
```

Why not country-first as the main canonical tree?

```txt
/es/espana/estaciones/baqueira
/en/spain/resorts/baqueira
```

Because LocalSnow's search intent is usually lesson/resort-directory intent, not a generic country portal. A resource-first tree keeps the ski-resort directory silo coherent, makes hreflang/canonical generation simpler, and matches the useful part of legacy's SEO structure.

Country/market pages can still exist, for example:

```txt
/es/estaciones/espana
/en/resorts/spain
```

But the canonical resort path should live under the resort-directory resource.

Current B1/B2 routes like `/spain` and `/spain/baqueira` are temporary scaffold routes. They prove policy and rendering only; they are not the final localized SEO URL structure.

## Resort indexing approach before supply

Do not mass-index empty resort pages.

Indexability should depend on usefulness, not route existence:

- catalog-only/thin page: browsable/noindex or hidden;
- useful directory page: may be indexable if it has real manually curated value;
- booking-ready page: indexable only when request/booking promise is truthful;
- guaranteed-ready page: indexable/promoted only when LocalSnow can operate the guarantee/refund path.

Manual school/provider listings are allowed as an early directory strategy if they are clearly not fake partnerships.

Good early page:

```txt
Baqueira ski lesson directory with useful school/provider listings, clear claim/create-profile path, and no fake live availability.
```

Bad early page:

```txt
Book confirmed Baqueira lessons now, even though LocalSnow has no supply or operating coverage.
```

## Supply sourcing policy

Professional profile creation/supply sourcing should remain open everywhere relevant.

But placement differs:

- provider-facing surfaces: strong CTA to create/claim a profile;
- client-facing resort pages: secondary CTA, not the main promise.

Do not make clients feel like the product is mainly asking them to help LocalSnow find instructors.

## Catalog storage decision

Current hardcoded resort records are **versioned seed data**, not the final storage model.

Moli should not have to hardcode every resort in TypeScript forever.

Expected evolution:

```txt
Phase A — versioned seed records for a tiny Spain-first set
Phase B — file/seed import boundary with stable catalog repository API
Phase C — database-backed catalog/admin CRUD when the product needs it
Phase D — enrichment/import pipeline only after real catalog operations justify it
```

Routes and SEO should consume a catalog policy/repository seam. They should not care whether data comes from TypeScript seed, JSON, Postgres or an import pipeline.

## What is not decided here

- final UI copy;
- final visual design;
- final DB schema;
- full i18n implementation;
- sitemap generation;
- full resort import;
- generated SEO pages;
- auth, payment, booking, availability or email implementation.

## Founder review questions

1. Confirm route tree: resource-first `/:locale/resorts/:country/:region?/:resort` with localized `/es/estaciones/...` paths?
2. Should Baqueira remain the first indexable target, or be downgraded to noindex until manually useful listings/content exist?
3. Should La Molina and Cerler stay in the seed as visible/noindex priority candidates?
4. Do we approve manual school/provider directory listings as the first usefulness layer before direct supply?
5. Do we approve provider profile creation being open broadly, with client-facing sourcing CTAs kept secondary?
