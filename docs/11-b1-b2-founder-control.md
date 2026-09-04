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

### Region/country levels after the resource silo

After `/resorts` / `/estaciones`, keep the geography hierarchy:

```txt
country -> region/area -> resort
```

Use legacy as inspiration, not as a direct copy. Legacy modeled geography as:

```txt
countries { country, countryCode, countrySlug }
regions { countryId, region, regionSlug }
resorts { name, slug, countryId, regionId, lat, lon, website, image }
```

New LocalSnow should preserve that mental model because regions disambiguate resorts, support useful browsing pages and give SEO/content teams a clear editorial layer. But the final schema is not decided here.

If a country has weak/ambiguous region data at first, the route can temporarily treat the region segment as optional while the canonical catalog record still keeps a `regionId`/area concept ready.

## Resort indexing approach before supply

Do not mass-index empty resort pages.

Indexability should depend on usefulness, not route existence:

- catalog-only/thin page: browsable/noindex or hidden;
- useful directory page: may be indexable if it has real manually curated value;
- booking-ready page: indexable only when request/booking promise is truthful;
- guaranteed-ready page: indexable/promoted only when LocalSnow can operate the guarantee/refund path.

Manual school/provider listings are allowed as an early directory strategy if they are clearly not fake partnerships.

La Molina and Cerler should stay as visible/noindex seed priority candidates for now. That is safer than indexing thin pages and more useful than hiding them completely: Moli gets a visible content/supply work queue, providers can still find a profile path, and Google is not asked to rank weak pages.

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

Moli also needs operator control: before organic supply exists, LocalSnow should be able to manually create or import any legitimate listing/profile type needed to make the directory useful — schools, independent instructors, guides, academy-like providers or other local lesson suppliers. Those manual records must be clearly source-labeled internally and must not imply a claimed profile, verified partner or guaranteed booking unless LocalSnow has actually earned that status.

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

1. Route tree: approved as resource-first `/:locale/resorts/:country/:region?/:resort`, with localized `/es/estaciones/...` and `/en/resorts/...` paths. Region/resort levels should reuse the useful legacy geography pattern as inspiration.
2. Baqueira: keep indexable because it will be the first manually filled example for learning what the page needs.
3. La Molina and Cerler: recommended default is visible/noindex seed candidates until they have enough useful listings/content to justify indexing.
4. Manual listings: approved. LocalSnow should support fully manual operator-created profiles/listings of the needed provider types before organic supply arrives.
5. Broad provider profile creation: approved, with client-facing sourcing kept secondary.
