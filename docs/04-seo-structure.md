# 04 — SEO Structure

## Principle

SEO matters, but SEO must serve client action. Do not let SEO generate product bloat.

## Initial route hierarchy

```txt
/
/resorts
/resorts/[country]
/resorts/[country]/[region]
/resorts/[country]/[region]/[resort]
/resorts/[country]/[region]/[resort]/[sport]
/instructors/[slug]
/schools/[slug]
```

## Resort page job

A resort page should help a client answer:

- Can I find lessons here?
- Which sports are available?
- Which professionals/schools look credible?
- Can I request directly or ask LocalSnow for protected help?

## Allowed v1 page content

- short resort lesson intro;
- sports served;
- professional/school cards;
- common lesson types in copy, not necessarily separate database entities;
- direct/protected CTA;
- nearby/internal links;
- useful FAQ if it answers buying objections.

## Avoid in v1

- thousands of thin generated pages;
- package/promo/discount URL silos;
- every sport + level + duration combination as architecture;
- AI content factory before supply/request conversion works;
- SEO pages with no path to request.

## Metadata requirements

For public pages:

- title;
- description;
- canonical URL;
- index/follow unless private/error/draft;
- OpenGraph basics;
- structured data later only when page truth is stable.

## First market approach

Pick one launch region/resort cluster and make those pages genuinely good before scaling page generation.

Open decision: first launch market.
