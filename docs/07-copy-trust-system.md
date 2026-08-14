# 07 — Copy / Trust System

Derived from: `06-state-model.md`

## Purpose

This layer defines how LocalSnow should explain the reviewed product states in public-facing and operator-facing language before SEO, engineering architecture, backlog or scaffold code.

This is **not** final UI copy. It does not decide components, routes, emails, payment provider objects, legal templates, analytics events, SEO URLs or implementation tickets.

A copy/trust system here means:

> the product vocabulary, promise boundaries and reassurance patterns that make LocalSnow feel mature and safe without lying about manual operations, instant confirmation, perfect availability or automated legal/compliance infrastructure.

The next layers can turn this into SEO pages, architecture and backlog. This layer exists to prevent later code or copy from drifting into either weak directory language or over-promised marketplace language.

## Core trust principles

1. **Sound confident, not magical.**
   - LocalSnow can be platform-led and polished.
   - It must not imply instant confirmation, exact live instructor calendars, escrow, automated payouts or automated legal/accounting guarantees.

2. **Manual work stays hidden, but the promise stays true.**
   - Clients do not need to know Moli is contacting instructors manually.
   - They do need to know LocalSnow will confirm, propose a suitable alternative or refund when the protected path is chosen.

3. **Protected path is the emotional default for serious clients.**
   - Self-managed inquiry exists and is useful.
   - Protected booking/request should feel safer, calmer and more complete when the client wants confidence.

4. **Snowsports specificity beats generic directory copy.**
   - Availability, lesson request details, resort pages and instructor profiles should speak like a product built for ski/snowboard lessons, not a generic business listing.

5. **Legal/GDPR/payment reassurance must be accurate.**
   - Legal documents and manual processes can cover v1 before automation exists.
   - Public wording must not pretend LocalSnow has automated compliance, tax, invoices, payouts or legal workflows that are not real.

## Preferred product vocabulary

Use these terms as the default vocabulary across pages, forms, emails and PRs.

| Concept | Preferred terms | Avoid |
| --- | --- | --- |
| Free path | self-managed inquiry, free inquiry, send a request | unmanaged booking, unsupported booking, direct booking if LocalSnow still intermediates |
| Paid path | protected request, protected booking, guaranteed request | escrow, instant booking, fully automated guarantee |
| Availability | available to request, requestable slot, preferred time, lesson time window | live availability, confirmed slot, guaranteed calendar slot |
| Fulfillment | LocalSnow checks availability, confirms the lesson, finds a suitable alternative or refunds | Moli calls people manually, instant confirmation, marketplace matching engine |
| Payment | secure payment with Stripe Checkout, pay LocalSnow securely | escrow, deposit with unclear promise, pay instructor separately for protected path |
| Reviews | verified LocalSnow reviews, 1–5 star reviews from real lesson requests | unverified testimonials as the main trust loop, Google-only reviews |
| Resort pages | resort lesson guide, instructors and lessons in [resort], useful basic resort page | empty SEO page, thin auto-generated landing page |
| Client tracking | email updates, request dashboard, your LocalSnow account | in-app messaging, complex client portal, CRM |
| Legal | terms, privacy/GDPR, refund and guarantee policy | automated compliance, legal guarantee, tax automation |

## CT1 — Homepage / value proposition

Applies to:

- S1 home/value landing;
- SM5 unified lesson request lifecycle;
- SM7 protected guaranteed fulfillment;
- SM8 payment/refund timing.

Trust job:

Make the visitor understand in seconds:

1. LocalSnow is for ski/snowboard lessons in Spain.
2. They can request a lesson from instructors/providers.
3. They can either send a free inquiry or use the protected paid path.
4. The protected path means LocalSnow helps make it happen or refunds.

Primary message direction:

```txt
Find ski and snowboard lessons in Spain with a safer way to request.
Choose a lesson, tell us your dates, and either contact the instructor directly or use LocalSnow protection so we confirm the lesson, find a suitable alternative or refund you.
```

Sharper variants:

```txt
Book ski lessons with a safety net.
Pay securely. LocalSnow confirms the lesson, finds a suitable alternative or refunds you.
```

```txt
Not just a directory. A safer way to request snow lessons.
Send a free inquiry or choose protected booking for help until the lesson is confirmed.
```

Avoid:

- “Instantly book any instructor.”
- “Live availability from every school.”
- “Escrow payment.”
- “Guaranteed exact instructor no matter what.”

## CT2 — Free vs protected path copy

Applies to:

- R8 Path choice;
- SM5 unified lesson request;
- SM6 self-managed inquiry;
- SM7 protected fulfillment;
- SM8 payment/refund.

Trust job:

Make the choice clear without making the free path look broken or making the paid path feel like a dry plan comparison.

Preferred framing:

| Path | Emotional role | Copy direction |
| --- | --- | --- |
| Self-managed inquiry | Light, free, lower commitment | “Send your request to the instructor/provider. Responses depend on them.” |
| Protected request | Calm, assisted, safer | “Pay securely. LocalSnow helps confirm the lesson or finds a suitable alternative/refunds.” |

Example path-choice copy:

```txt
Choose how you want to request this lesson.

Free inquiry
Send your request and continue directly with the instructor/provider. No LocalSnow guarantee.

Protected request
Pay securely with LocalSnow. We check the lesson, confirm it with the instructor/provider, find a suitable alternative or refund you if we cannot make it happen.
```

Conversion rule:

- On priced public listings, protected request should be presented as the normal confident path.
- Free inquiry can remain available, but it should not be given equal emotional weight when the user wants safety.

Avoid:

- Presenting this as “Basic vs Premium” SaaS pricing.
- Saying free inquiry is unsafe.
- Saying protected means instant final confirmation.

## CT3 — Protected payment / Stripe Checkout trust

Applies to:

- R9 Request price/quote;
- R10 Payment/refund marker;
- SM8 payment/refund timing.

Trust job:

Let the client feel safe paying LocalSnow while keeping the operational/legal wording honest.

Approved v1 direction:

```txt
Client pays the full protected booking amount to LocalSnow via Stripe Checkout.
LocalSnow then manually confirms the lesson, pays the instructor/provider outside the platform, or refunds if the promise cannot be fulfilled.
```

Public copy direction:

```txt
Secure payment by Stripe.
Your payment is for the protected LocalSnow request. We confirm the lesson with the instructor/provider, arrange a suitable alternative, or refund you if we cannot make it happen.
```

Short payment reassurance:

```txt
You are not paying for an instant confirmation. You are paying for LocalSnow to secure the lesson or make it right.
```

Refund reassurance:

```txt
If LocalSnow cannot confirm the requested lesson or a suitable alternative, you get a refund under the guarantee policy.
```

Legal/copy boundary:

- Do not call this escrow.
- Do not imply Stripe Connect or automated provider payouts.
- Do not imply automated tax/invoice/legal handling.
- State who the client is paying and what the protected payment covers once legal/accounting wording is reviewed.

Open for later legal/accounting review:

- seller/merchant wording;
- receipt/invoice wording;
- whether LocalSnow is selling the lesson, an agency/booking service, or a protected request service;
- cancellation/refund exceptions.

## CT4 — Final confirmation is not instant

Applies to:

- SM5 submitted protected request;
- SM7 client-facing summaries;
- SM8 payment/refund.

Trust job:

Make non-instant confirmation feel like professional care, not uncertainty.

Preferred state copy:

| Internal state | Client-facing copy |
| --- | --- |
| `request_received` | “Request received” |
| `checking_availability` | “We’re checking availability” |
| `confirming_details` | “We’re confirming the lesson details” |
| `alternative_proposed` | “We found a suitable alternative” |
| `lesson_confirmed` | “Lesson confirmed” |
| `refund_in_progress` | “Refund in progress” |
| `closed` | “Request closed” |

Example tracking copy:

```txt
We received your protected request.
LocalSnow is checking the lesson details with the instructor/provider. We’ll email every important update, and you can follow the request from your account.
```

```txt
Your lesson is not final until confirmed.
If the exact request cannot be confirmed, LocalSnow will look for a suitable alternative or refund you under the guarantee policy.
```

Avoid:

- “Booked” before confirmation.
- “Guaranteed availability.”
- “Your instructor is confirmed” before the instructor/provider has agreed.

## CT5 — Availability copy for snowsports lessons

Applies to:

- SM4 availability/requestability;
- R4 availability/requestability signal;
- S4/S5/S6 profile and offer surfaces.

Trust job:

Show enough availability specificity to feel useful while avoiding perfect-live-calendar claims.

Independent instructor target:

```txt
Available to request on selected days and times.
Choose a date, preferred start time and lesson duration. Final confirmation comes after the instructor/provider confirms.
```

Slot-like copy:

```txt
Request this time
```

```txt
This time is available to request. Final confirmation follows after LocalSnow checks the lesson.
```

Coarser school/provider copy:

```txt
Tell us your preferred date, time and lesson duration.
Schools/providers may confirm availability after checking their instructor team.
```

Freshness copy:

| State | Copy direction |
| --- | --- |
| `fresh` | “Availability recently updated” |
| `aging` | “Availability is a guide; we’ll confirm” |
| `stale` | “We’ll check current availability before confirming” |
| `unknown` | “Request your preferred time” |

Avoid:

- “Available now” if not confirmed.
- “Book this slot instantly.”
- Generic “Contact business” behavior for independent instructors when a snowsports-shaped request can be collected.

## CT6 — Resort pages and thin-supply trust

Applies to:

- SM1 resort/page readiness;
- R1 resort/place;
- future SEO map.

Trust job:

Make resort pages useful without creating thin SEO pages or public self-owns.

State-to-copy direction:

| State | Copy direction |
| --- | --- |
| `catalog_accessible` | usable search/supply/demand anchor, not necessarily SEO-promoted |
| `public_basic` | useful basic resort page with honest action paths |
| `seo_rich` | richer guide with supply, lesson context, internal links and local trust |
| `paused_hidden` | avoid public emphasis |

Basic page copy pattern:

```txt
Ski and snowboard lessons in [Resort]
Find instructors and lesson providers for [Resort], or send a protected request and LocalSnow will help check availability.
```

Thin-supply empty state:

```txt
We’re still building verified lesson supply for [Resort]. You can search nearby resorts or send a protected request and LocalSnow will check suitable options.
```

Avoid:

- “No instructors available here.”
- Indexing hundreds of nearly identical pages as if they are rich guides.
- Making programmatic pages sound locally expert before content/supply exists.

## CT7 — Profile and offer trust cues

Applies to:

- SM2 profile readiness;
- SM3 offer requestability;
- R2 supply profile;
- R3 offer/service;
- R5 trust/readiness.

Trust job:

Use visible cues that help decisions without exposing internal warning lists or claiming verification that has not happened.

Approved public cue categories:

- profile completeness;
- owner-reviewed by LocalSnow;
- claimed profile;
- verified review count/rating;
- availability freshness/specificity;
- protected booking available;
- price shown.

Example cues:

```txt
Owner-reviewed profile
```

```txt
Protected request available
```

```txt
1–5 star verified LocalSnow reviews
```

```txt
Availability recently updated
```

Boundary:

- “Owner-reviewed” means Moli/LocalSnow reviewed enough information to increase confidence.
- “Verified” should only be used where the verification actually exists.
- Do not claim licenses, insurance, criminal checks, federation credentials or legal verification unless actually checked.

## CT8 — Email updates + lightweight client account

Applies to:

- SM6 self-managed inquiry;
- SM9 notification/action-link delivery;
- SM5 request lifecycle.

Trust job:

Make the user feel informed even while operations are manual.

Approved direction:

- Email is mandatory/backstop for important actions.
- Lightweight client account/dashboard is the nicer product surface.
- Email and account/dashboard tracking are not mutually exclusive.
- They are both/and, not either/or.

Client copy:

```txt
We’ll email every important update. You can also follow this request from your LocalSnow account.
```

```txt
Your request dashboard shows status, payment/refund information, review links and your contact details.
```

Email/action link copy:

```txt
Open request details
```

```txt
Review your lesson
```

```txt
Approve this alternative
```

Boundary:

- Do not promise in-app messaging.
- Do not require account creation before the request unless later conversion testing or architecture requires it.
- Secure token links can coexist with accounts.

## CT9 — Professional/provider notification and action copy

Applies to:

- SM6 self-managed inquiry;
- SM9 notification/action-link delivery;
- R12 notification/action link.

Trust job:

Give professionals/providers a clear, low-friction action path without creating staff/admin product scope.

Notification copy direction:

```txt
New lesson request from LocalSnow
A client is asking about a ski/snowboard lesson at [Resort]. Open the request to see dates, time preference, level and contact details.
```

Action labels:

```txt
Open request
```

```txt
I can help with this lesson
```

```txt
I need different details
```

```txt
I cannot take this request
```

Boundary:

- Action links should land in a controlled request/inquiry detail context.
- Do not build school staff calendars or admin rosters in v1.
- Email is the communication channel; LocalSnow is not an in-app messaging product.

## CT10 — Review trust copy

Applies to:

- SM11 review prompt/visibility;
- R13 review/review prompt;
- profile and search result trust surfaces.

Trust job:

Make reviews credible without building a full reputation/dispute system.

Approved v1 review system:

- LocalSnow-owned reviews;
- 1–5 stars;
- optional text;
- tied to verified request/lesson link;
- one review per request;
- visible immediately by default;
- Moli can hide/remove abuse or obvious problems;
- Google Reviews may complement later but should not replace LocalSnow’s request-tied trust loop.

Prompt copy:

```txt
How was your lesson?
Your review helps future skiers and snowboarders choose with confidence.
```

Review credibility copy:

```txt
Verified LocalSnow review
```

```txt
Reviewed after a real lesson request
```

Boundary:

- Do not imply every instructor/provider has many reviews early.
- Do not present unverified imported testimonials as verified LocalSnow reviews.
- Do not build dispute systems before volume requires them.

## CT11 — Legal / GDPR / online-business trust copy

Applies to:

- SM8 payment/refund timing;
- payment pages;
- footer/legal surfaces;
- legal document handoff.

Trust job:

Make LocalSnow feel professionally covered while staying honest about early manual operations.

Required public document set before payment launch:

- terms of service;
- privacy/GDPR notice;
- cookies notice if needed;
- refund/cancellation/guarantee policy;
- legal/business contact details;
- online-business/consumer disclosures;
- payment/receipt wording.

Copy direction:

```txt
Your payment and personal data are handled under LocalSnow’s terms, privacy policy and guarantee policy.
```

```txt
If LocalSnow cannot confirm your protected lesson or a suitable alternative, the guarantee policy explains when a refund applies.
```

Boundary:

- Legal documents can describe manual processes if those processes are real.
- Do not claim automated GDPR workflows, automated invoice generation, automated tax handling or automated provider payout accounting before they exist.
- The exact wording should be checked before public payment launch.

## CT12 — Owner/operator copy boundary

Applies to:

- SM7 protected fulfillment;
- SM10 claim review;
- R15 owner note/provenance;
- S13 owner control.

Trust job:

Keep Moli’s internal view actionable without leaking manual complexity to clients.

Internal language can say:

```txt
Contact instructor
```

```txt
Find replacement
```

```txt
Ask client to approve alternative
```

```txt
Mark refund needed
```

Client-facing language should say:

```txt
We’re checking availability
```

```txt
We found a suitable alternative
```

```txt
Refund in progress
```

Boundary:

- Internal notes never leak.
- Manual operations should look calm and product-led externally.
- Do not build CRM language into public copy.

## Cross-surface copy rules

### Protected path

```txt
request details complete
→ protected request chosen
→ secure Stripe Checkout payment
→ request received / checking availability
→ confirmed / suitable alternative / refund
```

Copy must make the protected path feel safer than self-managed inquiry without over-promising instant confirmation.

### Self-managed path

```txt
request details complete
→ free inquiry chosen
→ inquiry forwarded where possible
→ response depends on instructor/provider
```

Copy must keep it useful but clearly outside LocalSnow’s guarantee.

### Availability into request copy

```txt
availability signal
→ choose preferred date/time/duration
→ final confirmation later
```

Copy must collect snowsports-specific lesson information, not generic contact-form intent.

### Legal/trust into payment copy

```txt
Stripe Checkout
→ terms/privacy/guarantee visible
→ refund/cancellation wording clear
→ no fake escrow/compliance claims
```

Copy must make payment feel safe because the promise and documents are clear, not because the product pretends to have heavy infrastructure.

## Explicitly not decided here

This copy/trust system does not decide:

- final page copy;
- SEO keyword map or URL taxonomy;
- visual design;
- component structure;
- auth/session implementation;
- Stripe Checkout implementation;
- legal-document final wording;
- email provider;
- analytics/events;
- backlog tickets;
- app scaffold.

## Handoff to next layer

The next layer is `08-seo-map.md`.

It should define how LocalSnow turns the reviewed copy/trust system into search/discovery structure, especially:

- Spain-first resort and lesson page taxonomy;
- which programmatic resort pages should be indexable versus useful-but-not-promoted;
- instructor/profile/offer SEO boundaries;
- trust copy snippets that can appear on landing/search pages;
- avoiding thin duplicate pages;
- bilingual EN/ES direction without translating implementation copy too early.

Do not create architecture, backlog tickets or app scaffold yet. The next layer is SEO/discovery structure only.

## Review focus for Moli

Review this PR for one question:

> Does this copy/trust system explain LocalSnow honestly and confidently enough for v1, especially protected payment, manual fulfillment, legal/GDPR coverage, availability, reviews and client tracking?

If yes, the next layer is the SEO map. If no, repair this copy/trust layer before SEO/architecture/backlog/code starts.
