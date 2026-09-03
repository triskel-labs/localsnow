# 08 — SEO Map

Derived from: `07-copy-trust-system.md`

## Purpose

This layer defines how LocalSnow should turn the reviewed product/copy/trust system into search and discovery structure.

This is **not** engineering architecture. It does not decide database schema, route implementation, Svelte components, auth/session behavior, analytics events, content-management tools or backlog tickets.

An SEO map here means:

> the page families, indexability rules, search-intent priorities, language/country structure, and internal-linking principles that let LocalSnow grow discovery without creating thin pages or misleading marketplace promises.

The next layer can turn this into architecture. This layer exists to prevent implementation from blindly generating pages, filters or URLs without knowing which pages deserve public search weight.

## Source constraints from the reviewed copy/trust layer

The SEO map must preserve these reviewed truths:

1. **Worldwide-browsable catalog, Spain-first growth.**
   - LocalSnow should remain browsable/usable worldwide.
   - Spain gets the first supply, marketing, conversion and content focus.
   - Worldwide pages can exist as useful discovery/catalog surfaces, but not every worldwide page deserves SEO promotion immediately.

2. **The public benefit is lessons/bookings, not requests.**
   - SEO titles and page intent should target clients searching for lessons, instructors, schools/providers and resorts.
   - “Request” can remain an internal/domain term, but should not dominate public acquisition copy.

3. **Guaranteed booking is the strong paid path.**
   - SEO pages may introduce guaranteed booking as a trust/conversion differentiator.
   - They must not imply instant confirmation, exact instructor certainty, escrow or perfect live calendars.

4. **Self-managed inquiry is useful but lower-emphasis.**
   - It supports free directory usefulness.
   - It should not become the main SEO promise when the stronger differentiated value is LocalSnow-handled guaranteed booking.

5. **Free/open discovery is itself a differentiator.**
   - Do not frame LocalSnow as a closed marketplace that monetizes by hiding contact or inquiry capability behind a paywall.
   - Public SEO pages should make the client feel they can openly discover instructors, schools/providers and lesson options.
   - Account/contact capture may still be used later for serious actions, but the acquisition promise should remain free/open discovery plus optional LocalSnow-handled help.

6. **The platform is the tool, not the buyer outcome.**
   - SEO copy should lead with the client benefit or pain solved: finding the right ski/snowboard lesson, comparing real options, avoiding uncertainty, and getting expert help when needed.
   - “Use LocalSnow” is not the end goal; getting a suitable lesson with less friction and more confidence is the end goal.

7. **Expert matching/network is stronger than generic booking convenience.**
   - Many marketplaces already offer booking flows.
   - LocalSnow’s more specific paid-path differentiator is: free/open discovery first, then an expert team/network that can help find the right instructor, school or suitable alternative for the client’s exact lesson need.

8. **Public listings should generally be actionable.**
   - Published profiles/offers should normally be able to receive a lesson inquiry or booking.
   - Pages that cannot support action should be paused, hidden, noindexed or treated as internal/catalog-only until useful.

9. **Freshness is mostly internal.**
   - Availability freshness should not be exposed by default if it makes early supply look stale.
   - SEO pages can show availability specificity only when it improves trust.

10. **Reviews are from real lessons.**
   - Review snippets should say verified LocalSnow reviews / reviewed after a real lesson only when true.
   - Do not inflate early review volume.

11. **Legal and payment trust must be honest.**
   - Payment pages/snippets may say secure Stripe payment and guarantee/replacement/refund.
   - Do not say escrow, automated payouts, automated tax/compliance or legal claims not backed by real docs/process.

12. **Links must help users and protect crawl quality.**
   - Internal links should be generated only to known useful pages, not empty/open-ended combinations.
   - Broken internal links, dead external links and random facet links are SEO debt.
   - Backlinks should be earned through real instructor/school/resort/tourism relationships, not bought or spammed.

## SEO principles

1. **Index fewer stronger pages before many weak pages.**
   - Better: a strong Baqueira lesson page with useful supply, internal links and trust copy.
   - Worse: hundreds of near-empty resort/filter pages that look generated.

2. **Search intent must map to a real client decision.**
   - “ski lessons in Baqueira” deserves a page if it helps a client choose/act.
   - “ski lessons in [tiny area] for [random filter]” should not exist/index unless content and supply justify it.

3. **Spain-first does not mean Spain-only.**
   - Spain pages get priority in navigation, content investment, internal links and conversion work.
   - Worldwide catalog/search remains usable and can grow into SEO later.

4. **Use snowsports language, not generic directory language.**
   - Prefer lesson, ski lesson, snowboard lesson, instructor, school/provider, resort, level, duration, dates, guaranteed booking.
   - Avoid “service provider near me” style generic SEO sludge unless a specific query deserves it.

5. **SEO pages must not hide manual operations by lying.**
   - They can feel polished and handled.
   - They cannot promise instant booking, perfect availability, confirmed exact instructor or legal/payment machinery that is not real.

6. **Login/account capture should not kill discovery.**
   - Do not hide public SEO/discovery pages behind login.
   - Public SEO pages must remain accessible to search engines and users.
   - High-intent actions can require low-friction login/contact capture later.

7. **Indexed pages need query-aligned page contracts.**
   - Each indexable page should target one primary search/retrieval intent, not two unrelated keywords in one title.
   - URL slug, SEO title, H1 and the opening sentence should use closely related language for that intent.
   - This is useful for classic SEO and for AI search/retrieval systems that cite pages whose titles/content match the hidden query they generated.
   - Supporting sections can cover adjacent questions, but the page owner intent should stay obvious.
   - Example direction: prefer `/spain/baqueira/ski-lessons/` with title/H1/opening sentence around “ski lessons in Baqueira” over vague or mixed-intent URLs/titles.

## Page family map

| Family | Primary intent | Initial SEO priority | Indexability default |
| --- | --- | --- | --- |
| Home / value landing | Understand LocalSnow and start discovery | High | Index |
| Spain country landing | Spain-wide lesson discovery and trust | High | Index when useful |
| Resort lesson pages | Find lessons/instructors in a resort | Highest for first markets | Index only at `public_basic` or `seo_rich` |
| Lesson-intent pages | Ski/snowboard/private/group/kids/beginner lesson intent | High for Spain + strong resorts | Index selectively |
| Instructor profiles | Evaluate a specific instructor | Medium/high when complete | Index when profile is publishable and useful |
| School/provider profiles | Evaluate a provider/school | Medium/high when complete | Index when useful/actionable |
| Offer/service pages | Evaluate a specific lesson/service | Medium | Usually part of profile; standalone only when unique |
| Search/results pages | Browse combinations and filters | Useful product surface | Mostly noindex unless curated |
| Review/trust snippets | Reinforce decisions | Support layer | Index only as part of profile/resort pages |
| Legal/payment trust pages | Reassurance and compliance | Required before payments | Index or accessible; not growth pages |

## SEO1 — Home / value landing

Purpose:

- explain what LocalSnow does;
- route users into resort/lesson discovery by the benefit they want: the right lesson, instructor/provider or resort fit;
- present free/open discovery as the default trust base;
- make expert-assisted guaranteed booking feel like the handled paid path when clients want extra safety and matching help;
- keep instructors/providers aware that LocalSnow solves reach: a specialized snowsports lesson space where clients look for lessons, without forcing providers to film themselves, expose themselves online or gamble on generic agencies.

Search intent:

- branded LocalSnow searches;
- broad ski/snowboard lesson discovery;
- early trust validation after someone hears about LocalSnow.

Indexability:

- always index.

Content direction:

```txt
Find ski and snowboard lessons that fit your trip, level and resort.
Compare instructors, schools and lesson options for free, then choose expert-assisted guaranteed booking when you want LocalSnow’s network to help secure the right match, a suitable alternative or a refund if we cannot make it happen.
```

SEO boundaries:

- Do not turn the homepage into a full country/resort directory dump.
- Do not over-index every country/resort from home before Spain pages are useful.
- Do not lead with internal request mechanics.
- Do not make “the platform” sound like the outcome; the outcome is the right lesson with less uncertainty.

## SEO2 — Country / market landing pages

Initial priority:

1. Spain.
2. Other countries only as browsable catalog structure until there is supply/content/demand.

Spain page purpose:

- make Spain feel like the active LocalSnow market;
- link to priority resorts;
- explain ski/snowboard lesson discovery and guaranteed booking;
- support bilingual EN/ES discovery.

Worldwide/non-Spain country page purpose:

- allow browsing/search if catalog data exists;
- collect demand signals carefully;
- avoid pretending LocalSnow has active local supply where it does not.

Indexability rule:

| Country page state | Indexability | Notes |
| --- | --- | --- |
| Active focus country | Index | Spain first |
| Has useful supply/content | Index selectively | later expansion |
| Catalog-only / thin | Noindex or not promoted | still can be browsable |
| No useful lesson path | Hidden/noindex | avoid dead pages |

Spain page content ingredients:

- country-level skiing/snowboarding context;
- links to Baqueira, La Molina, Cerler and other priority resorts;
- guaranteed booking trust snippet;
- instructor/school discovery explanation;
- EN/ES language access.

## SEO3 — Resort lesson pages

Resort pages are the main SEO wedge.

Search intent examples:

- ski lessons in Baqueira;
- snowboard lessons in Baqueira;
- private ski instructor Baqueira;
- ski school La Molina;
- snowboard instructor Cerler;
- kids ski lessons [resort].

State-derived indexability:

| Resort state | SEO treatment |
| --- | --- |
| `catalog_accessible` | browsable/searchable, normally noindex/not promoted |
| `public_basic` | index if it has useful lesson path, supply links or clear guaranteed booking path |
| `seo_rich` | index and internally promote |
| `paused_hidden` | noindex/hidden |

Minimum for `public_basic` index:

- real resort name/location;
- at least one useful action path:
  - listed instructor/provider;
  - nearby resort alternatives;
  - guaranteed booking intake that LocalSnow can realistically operate;
- honest supply status;
- no claim of full local expertise if content is thin.

Minimum for `seo_rich`:

- useful resort lesson intro;
- linked instructors/providers/offers;
- one primary query/retrieval intent with aligned slug, SEO title, H1 and first sentence;
- availability/requestability explanation;
- trust/guaranteed booking snippet;
- internal links to related lesson types, nearby resorts and relevant profiles;
- real reviews if available;
- EN/ES variant if justified;
- not just a templated paragraph with changed resort name.

Resort page template direction:

```txt
Ski lessons in [Resort]
Find ski instructors and lesson providers for [Resort], compare lesson options, or use guaranteed booking so LocalSnow makes sure the lesson happens, finds a suitable alternative or gives your money back.
```

If snowboard lessons deserve their own demand page, create a separate page contract instead of mixing the primary title/H1. A broad resort hub can link to both ski and snowboard lesson pages when both are useful.

Sport-page decision:

- Ski and snowboard are core lesson intents, not just tiny filters, because users search and compare them differently.
- Search/results can still use sport as a filter for browsing, but indexed SEO pages should have one primary sport intent when demand/content/action path exists.
- Do not create a generic “ski + snowboard lessons in [Resort]” page as the main SEO owner if it weakens query alignment. Use a broader resort hub to route users, then let ski and snowboard pages own their specific demand.
- Do not create a separate “both/all sports” SEO page unless there is a real mixed-intent query and enough useful content. For v1, the broad hub can cover “all lesson options” without becoming a thin indexed duplicate.

Thin-supply direction:

```txt
We’re building verified lesson supply for [Resort]. You can search nearby resorts or use guaranteed booking and LocalSnow will work to secure a suitable lesson or refund you if we cannot make it happen.

Are you an instructor, school or lesson provider working in [Resort]? Create your LocalSnow profile so clients can discover your lessons and contact/book you through LocalSnow.
```

Provider-side SEO/support copy should emphasize:

```txt
Get found by ski and snowboard lesson clients without becoming a content creator, running ads or hiring a generic marketing agency.
```

Avoid:

- “No instructors available here” dead-end copy;
- indexing every resort just because it exists in data;
- claiming “best instructors” without real basis;
- hiding thinness with fake local expertise;
- burying the supply-side invitation when a resort page has demand but thin supply.

## SEO4 — Lesson-intent pages

Lesson-intent pages capture demand that is not only resort-name based.

Candidate intents:

- ski lessons;
- snowboard lessons;
- ski lessons in a specific priority resort;
- snowboard lessons in a specific priority resort;
- private ski lessons;
- group ski lessons;
- kids ski lessons;
- beginner ski lessons;
- advanced ski coaching;
- family ski lessons;
- lessons by language if supply supports it.

Initial scope:

- prioritize Spain + first resorts;
- combine lesson intent with resort/country only where pages can be useful;
- avoid exploding combinations too early.

Indexability rule:

| Page shape | Indexability |
| --- | --- |
| `/spain/ski-lessons`-style country intent | index if useful content + resort links exist |
| `[resort] + [core lesson type]` | index if resort has supply/action path |
| rare filters/languages/levels | noindex until demand/supply proves value |
| empty combinations | do not create/index |

Filters vs SEO URLs:

- Treat level, language, qualifications, date, duration, price sorting and similar refinements as search filters first.
- Default implementation direction: keep them as browse/search parameters and normally noindex/canonicalize filtered result pages.
- Create a clean SEO URL only when the combination has proven search demand, enough useful content, enough supply/action paths and a clear canonical owner page.
- Good later candidates: `private ski lessons in Baqueira`, `kids ski lessons in La Molina`, `Spanish ski instructor in Baqueira` if supply/content justifies them.
- Bad default: one indexed URL for every level/language/qualification/date/duration combination.

Copy direction:

- explain the lesson outcome;
- show the relevant resorts/instructors/providers;
- introduce guaranteed booking as the handled path;
- avoid making the page feel like a generic filter URL.

## SEO5 — Instructor profile pages

Purpose:

- let a client evaluate a specific instructor;
- give instructors a trustworthy profile they are proud to share;
- convert to at least a self-managed lesson inquiry, and to guaranteed booking when LocalSnow can actually operate that protected path.

Index when:

- profile is published;
- enough public facts exist to help a client decide;
- profile can receive at least a lesson inquiry;
- trust signals shown on the page are backed by known facts or a manual LocalSnow review.

LocalSnow evaluation for trust signals means:

- basic identity/contact route exists internally;
- resorts/areas, sport(s), languages and lesson types are coherent enough to publish;
- the displayed offer/action path can actually be handled;
- no unsupported claims are shown for licenses, insurance, certifications, awards or “best instructor” style superiority;
- `LocalSnow-reviewed` is used only after a real manual review/check, not merely because the profile exists.

Noindex/pause when:

- missing basic identity/service/location/sport information;
- cannot receive any action;
- unreviewed data creates trust risk;
- duplicate/placeholder profile.

Content ingredients:

- instructor name/display identity;
- sport(s);
- resorts/areas served;
- lesson types/levels/languages if known;
- pricing/offer link if public;
- inquiry action by default for published profiles;
- guaranteed booking action when the profile has a priced/operable LocalSnow-handled booking path;
- LocalSnow-reviewed / claimed / review cues only when true.

Public name/display direction:

- Store the full legal/contact name internally where needed for operations and trust.
- Public default should protect privacy: first name + surname initial, unless the instructor explicitly chooses a full professional/public name or business identity.
- Keep this as an architecture/UX decision, but do not let SEO require exposing unnecessary personal data.

SEO boundary:

- Do not claim licenses, credentials or insurance unless actually checked.
- Do not turn profile completeness warnings into public embarrassment.
- Do not expose internal owner notes.

## SEO6 — School/provider profile pages

Purpose:

- represent simple school/provider listings without building school staff/admin complexity;
- support discovery for clients who search by provider type or known school name;
- route into inquiry/booking intake.

Index when:

- provider has useful public identity, resort/service coverage and action path;
- LocalSnow can honestly represent the listing;
- page is not just a name stub.

Keep simple:

- public profile;
- offers/services;
- resort coverage;
- inquiry/booking intake;
- trust/review cues when available.

Do not create:

- school staff management pages;
- admin rosters;
- internal scheduling pages;
- pages implying LocalSnow controls school employees.

## SEO7 — Offer/service pages

Offer pages should be conservative.

Default:

- show offers/services inside instructor/provider profiles and resort pages;
- do not create standalone indexed offer URLs for every small variant by default.

Standalone offer page is justified when:

- it matches a strong search intent;
- it has enough unique content beyond price/duration;
- it can convert to guaranteed booking or self-managed inquiry;
- it is not duplicating profile/resort content.

Examples that may justify standalone later:

- private ski lessons in Baqueira;
- kids snowboard lessons in La Molina;
- beginner ski lessons in Cerler.

Avoid:

- one indexed page for every duration/level/language combination;
- price-only pages;
- duplicate pages that differ only by instructor name unless profile itself carries the intent.

## SEO8 — Search/results and faceted pages

Search/results are important product surfaces but dangerous SEO surfaces.

Default:

- allow users to browse/filter;
- mostly noindex dynamic search/facet URLs;
- promote curated landing pages instead of random filter combinations.

Index only if curated:

- intent is known and valuable;
- page has stable intro/content;
- page has enough supply/action paths;
- canonical/internal links are deliberate;
- page does not duplicate another stronger page.

Facet examples to keep noindex by default:

- arbitrary date filters;
- duration filters;
- price sorting;
- every language/level combination;
- empty or near-empty result sets.

## SEO9 — Bilingual EN/ES direction

Principle:

- bilingual direction matters for Spain and international travelers;
- do not translate final implementation copy too early in this doc.

Language strategy:

| Layer | Direction |
| --- | --- |
| English | useful for international tourists and review by Moli/Mao |
| Spanish | priority for Spain market, local supply, families and Spanish search demand |
| Other languages | later, only if demand/supply proves value |

SEO structure should support:

- separate EN/ES page versions where pages are worth indexing;
- correct language alternates later (`hreflang` belongs to architecture/implementation);
- Spanish-first content investment for first market pages;
- English access for tourists and worldwide browsing.

Avoid:

- machine-translating hundreds of weak pages;
- mixing languages awkwardly on one SEO page;
- promising language coverage unsupported by supply.

Supply-side profile input direction:

- For Spain-first growth, supplier profiles should support EN/ES public content without making instructors write everything twice from scratch.
- Architecture/UX should consider source-language fields plus translated public variants, with owner/instructor review before publishing.
- A “generate translation draft” or assisted pre-fill can materially improve profile completion and conversion, but generated text should be editable and should not invent qualifications, resorts, prices or availability.
- This is important enough to carry into architecture, but it should not block the SEO map or force mass translation of thin pages.

## SEO10 — Internal linking, backlinks and trust snippets

Internal linking goals:

- concentrate authority and user attention on useful Spain/resort pages first;
- let worldwide catalog remain discoverable without flooding SEO;
- connect client intent to profiles/offers/booking actions;
- reinforce guaranteed booking trust where it helps conversion;
- avoid broken, empty, circular or open-ended links that waste crawl budget and damage trust.

Priority links:

```txt
Home
→ Spain lessons
→ priority resort pages
→ instructor/provider profiles
→ relevant offers/lesson-intent sections
→ guaranteed booking / self-managed inquiry action
```

Resort page links:

- nearby/related resorts only when the target page exists and is useful;
- instructors/providers serving the resort;
- ski vs snowboard lesson sections;
- private/group/kids/beginner sections only when useful;
- trust/legal/payment reassurance near booking actions.

Profile links:

- resorts served;
- offer/service sections;
- verified real-lesson reviews;
- guaranteed booking when the profile has a priced/operable LocalSnow-handled booking path.

Link hygiene rules:

- Generate internal links from canonical known entities/pages, not arbitrary user-entered labels or infinite filter combinations.
- Do not link publicly to hidden/noindex/paused pages except from internal/admin surfaces.
- Filtered/search pages should usually point back to their canonical resort/country/lesson-intent owner page.
- Run a broken-link check before shipping docs/pages and later as an automated crawl/check in architecture/CI.
- Avoid open redirect patterns and unvalidated outbound links.

Backlink direction:

- Earn backlinks from real relationships: instructor websites, ski schools/providers, resort/local tourism partners, ski clubs, useful guides and social/profile links.
- Do not buy spam links, run low-quality directory blasts or create doorway pages for backlinks.
- Supplier-generated/outbound profile links should be reviewed or marked appropriately (`ugc`/`nofollow` where needed later) so LocalSnow does not endorse unsafe destinations.
- Prioritize backlinks to strong Spain/resort/lesson pages, not thin worldwide catalog pages.

Trust snippets allowed in SEO pages:

```txt
Guaranteed booking: LocalSnow makes sure the lesson happens, finds a suitable alternative, or gives your money back.
```

```txt
Secure payment by Stripe for guaranteed bookings.
```

```txt
Reviewed after a real lesson.
```

```txt
LocalSnow-reviewed profile.
```

Do not use trust snippets when the underlying fact is not true.

## SEO11 — Legal/payment pages as trust surfaces

Legal/payment pages are not growth pages, but they support conversion and must be accessible before payments launch.

Required surfaces before payment launch:

- terms of service;
- privacy/GDPR notice;
- cookies notice if needed;
- refund/cancellation/guarantee policy;
- legal/business contact details;
- online-business/consumer disclosures;
- payment/receipt wording.

SEO treatment:

- accessible from footer/payment surfaces;
- indexable unless legal advice says otherwise;
- not optimized like growth landing pages;
- stable enough to support payment trust.

Boundary:

- this SEO map does not write legal final wording;
- legal/payment positioning still needs accounting/legal review before public payment launch.

## SEO12 — Initial priority sequence

Suggested SEO sequencing before architecture/backlog:

Decision status:

- This is the proposed SEO priority order for this layer.
- Moli can approve/change it in this PR; it does not need a separate review round unless the priority order itself feels wrong.
- Architecture should treat the approved order as input, then decide implementation mechanics without re-opening product meaning.

1. Define the page-state/indexability model:
   - index;
   - noindex but browsable;
   - hidden/paused.
2. Define Spain priority page families:
   - Spain landing;
   - Baqueira;
   - La Molina;
   - Cerler;
   - nearby/next Spanish resorts.
3. Define resort page minimum content and action-path rules.
4. Define instructor/provider profile publish/index thresholds, including public display-name/privacy direction.
5. Define curated lesson-intent pages for Spain/resorts.
6. Define search/facet noindex defaults and which filters stay as URL/search parameters by default.
7. Define EN/ES page strategy for priority pages and supplier profile translation support.
8. Define link hygiene/backlink principles and trust snippets that can be reused by architecture/design.

Do not start with:

- mass-generated worldwide pages;
- every possible ski/snowboard/level/language filter;
- final URL implementation;
- technical sitemap generation;
- schema.org/structured data implementation;
- analytics event design.

## Explicitly not decided here

This SEO map does not decide:

- final URLs/routes;
- SvelteKit routing/file structure;
- database models;
- content-management implementation;
- sitemap generation code;
- robots/meta-tag implementation;
- `hreflang` implementation;
- schema.org structured data;
- final page copy;
- legal-document final wording;
- authentication gates;
- analytics/events;
- backlog tickets;
- app scaffold.

## Handoff to next layer

The next layer is engineering architecture.

It should define how to implement the reviewed product-control layers without inventing product meaning:

- content/page state model for index/noindex/hidden;
- data ownership for resort/profile/offer/content facts;
- routing/content architecture for SEO page families;
- canonical/filter URL rules and broken-link/link-health checks;
- public instructor display-name/privacy handling;
- EN/ES supplier profile translation/pre-fill support;
- auth/contact capture architecture for high-intent actions;
- Stripe Checkout/payment boundary for guaranteed booking;
- email/action-link and lightweight account/dashboard architecture;
- legal/trust document surfaces;
- no implementation backlog yet until architecture is reviewed.

Do not create backlog tickets or app code until the architecture layer is reviewed.

## Review focus for Moli

Review this PR for one question:

> Does this SEO map prioritize the right discovery pages for LocalSnow v1 — worldwide-browsable but Spain-first — without creating thin SEO pages, hiding public discovery behind login, or weakening the guaranteed booking promise?

If yes, the next layer is engineering architecture. If no, repair this SEO map before architecture/backlog/code starts.
