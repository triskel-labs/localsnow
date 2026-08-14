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

3. **The safe/handled feeling must exist even before the client asks for it.**
   - Self-managed inquiry exists and is useful.
   - Guaranteed/protected booking should make the client feel: “this is handled for me, I will get my lesson or my money back.”
   - The safety feeling is not only for anxious users; it is part of why LocalSnow is better than a loose directory or WhatsApp hunt.

4. **The public outcome is the lesson, not the request.**
   - Internally, request is the domain unit.
   - Public copy should sell the client getting the right ski/snowboard lesson and the instructor/provider getting more real lesson clients.
   - “Request” is the vehicle; “lesson”, “booking”, “client” and “student” are the benefits.

5. **Snowsports specificity beats generic directory copy.**
   - Availability, lesson details, resort pages and instructor profiles should speak like a product built for ski/snowboard lessons, not a generic business listing.

6. **Legal/GDPR/payment reassurance must be accurate.**
   - Legal documents and manual processes can cover v1 before automation exists.
   - Public wording must not pretend LocalSnow has automated compliance, tax, invoices, payouts or legal workflows that are not real.

## Preferred product vocabulary

Use these terms as the default vocabulary across pages, forms, emails and PRs.

| Concept | Preferred terms | Avoid |
| --- | --- | --- |
| Free path | self-managed inquiry, free inquiry, send a lesson inquiry | unmanaged booking, unsupported booking, “just contact” if LocalSnow is still involved |
| Paid path | guaranteed booking, protected booking, protected lesson booking | escrow, instant booking, fully automated guarantee |
| Listing baseline | requestable listing, can receive lesson inquiries/bookings | published but cannot receive any request |
| Availability detail | preferred date/time, lesson time window, slot-like time, availability guide | live availability, confirmed slot, guaranteed calendar slot |
| Fulfillment | LocalSnow confirms lesson details with the instructor/provider, ensures the lesson or a suitable alternative, or refunds | Moli calls people manually, marketplace matching engine, “checking availability” after a slot was already chosen |
| Payment | secure payment for a guaranteed booking with Stripe Checkout, pay LocalSnow securely | escrow, deposit with unclear promise, pay instructor separately for protected path |
| Reviews | verified LocalSnow reviews, 1–5 star reviews from real lessons | unverified testimonials as the main trust loop, Google-only reviews |
| Resort pages | resort lesson guide, instructors and lessons in [resort], useful basic resort page | empty SEO page, thin auto-generated landing page |
| Client tracking | email updates, lesson/booking dashboard, your LocalSnow account | in-app messaging, complex client portal, CRM |
| Legal | terms, privacy/GDPR, refund and guarantee policy | automated compliance, legal guarantee, tax automation |

## CT1 — Homepage / value proposition

Applies to:

- S1 home/value landing;
- SM5 unified lesson request lifecycle;
- SM7 protected guaranteed fulfillment;
- SM8 payment/refund timing.

Trust job:

Make the visitor understand in seconds:

1. LocalSnow helps clients find and book ski/snowboard lessons.
2. The catalog can be browsed worldwide, while launch marketing, supply effort and conversion focus are concentrated on Spain first.
3. Clients should feel they are getting a lesson handled, not merely submitting a form.
4. Instructors/providers should feel LocalSnow can bring real lesson clients, not admin noise.
5. The guaranteed/protected path is strong: LocalSnow ensures the lesson, a suitable alternative, or a refund.

Primary message direction:

```txt
Find the right ski or snowboard lesson without chasing WhatsApps.
Browse instructors, schools and resorts, choose the lesson you need, and use guaranteed booking when you want LocalSnow to handle confirmation for you.
```

Guarantee direction:

```txt
Guaranteed booking means LocalSnow confirms the lesson with the instructor/provider, arranges a suitable alternative, or refunds you. You do not lose money if we cannot make it happen.
```

Market-focus direction:

```txt
LocalSnow can stay browsable worldwide, but public acquisition and supply-building copy should focus first on Spain and the resorts where LocalSnow is actively building trust and availability.
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
| Self-managed inquiry | Light, free, lower commitment | “Send a lesson inquiry to the instructor/provider. Responses depend on them.” |
| Guaranteed/protected booking | Handled, strong, safer | “Pay securely. LocalSnow ensures the lesson, a suitable alternative or a refund.” |

Example path-choice copy:

```txt
Choose how you want to get this lesson.

Free inquiry
Self-managed lesson inquiry. Send the inquiry and then handle the messages, availability check and coordination directly with the instructor/provider. No LocalSnow guarantee.

Guaranteed booking
Pay securely with LocalSnow. We confirm the lesson with the instructor/provider, find a suitable alternative or refund you if we cannot make it happen.
```

Conversion rule:

- Public listings should generally be able to receive at least a lesson inquiry; if a listing cannot receive any request, it should normally stay unpublished or paused.
- On priced public listings, guaranteed/protected booking should be presented as the normal confident path.
- Free inquiry can remain available because it keeps the directory useful/free, but it should not get too much emotional weight: it is self-managed and the client handles coordination.

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
Client pays the full guaranteed booking amount to LocalSnow via Stripe Checkout.
Publicly, LocalSnow holds the payment safely while the booking is handled, then ensures the lesson, a suitable alternative, or a refund if the promise cannot be fulfilled.
Instructor/provider settlement is an internal operating/accounting process and should not be described in client-facing copy.
```

Public copy direction:

```txt
Secure payment by Stripe.
Your payment is for a guaranteed LocalSnow booking. We confirm the lesson with the instructor/provider, arrange a suitable alternative, or refund you if we cannot make it happen.
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
- Positioning should avoid creating a false employee/contractor/staff relationship: instructors/providers remain independent lesson providers, while LocalSnow provides discovery, booking/payment handling and the guarantee/replacement/refund layer. Exact seller/merchant wording needs legal/accounting review.

Open for later legal/accounting review:

- seller/merchant wording;
- receipt/invoice wording;
- whether LocalSnow is selling the lesson, an agency/booking service, or a protected booking/lesson service;
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
| `request_received` | “Lesson request received” |
| `checking_availability` | “We’re confirming availability and details” only when no slot/time was already selected |
| `confirming_details` | “We’re confirming the lesson details with the instructor/provider” |
| `alternative_proposed` | “We found a suitable alternative” |
| `lesson_confirmed` | “Lesson confirmed” |
| `refund_in_progress` | “Refund in progress” |
| `closed` | “Request closed” |

Example tracking copy:

```txt
We received your guaranteed booking.
LocalSnow is confirming the lesson details with the instructor/provider. We’ll email every important update, and you can follow the lesson from your account.
```

```txt
Your lesson is not final until confirmed.
If the exact lesson cannot be confirmed, LocalSnow will look for a suitable alternative or refund you under the guarantee policy.
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

Baseline rule:

- A published listing should generally be able to receive a lesson inquiry or booking. “Requestable” is not a special availability badge; it is the baseline for being public.
- Availability copy should explain how specific the timing is: broad preference, recurring window, or slot-like time.

Independent instructor target:

```txt
Choose from available lesson times, or send your preferred time.
Final confirmation comes after the instructor/provider confirms the lesson details.
```

Slot-like copy:

```txt
Choose this time
```

```txt
This time is ready to choose. LocalSnow still confirms the lesson details with the instructor/provider before the booking is final.
```

Coarser school/provider copy:

```txt
Tell us your preferred date, time and lesson duration.
Schools/providers may confirm availability after checking their instructor team.
```

Freshness posture:

Freshness is useful internally and can guide owner/operator warnings, but it should not be shown by default to clients if it creates noise or makes early supply look stale. Only expose freshness when it genuinely increases confidence.

Optional public copy if useful later:

| State | Copy direction |
| --- | --- |
| `fresh` | “Availability recently updated” |
| `aging` | “Availability is a guide; we’ll confirm the lesson details” |
| `stale` | “Tell us your preferred time and we’ll confirm what is possible” |
| `unknown` | “Send your preferred lesson time” |

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
Find instructors and lesson providers for [Resort], or use guaranteed booking so LocalSnow makes sure the lesson happens, finds a suitable alternative, or gives your money back.
```

Thin-supply empty state:

```txt
We’re still building verified lesson supply for [Resort]. You can search nearby resorts or use guaranteed booking and LocalSnow will work to secure a suitable lesson or refund you if we cannot make it happen.
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
- LocalSnow-reviewed profile;
- claimed profile;
- verified review count/rating;
- availability freshness/specificity;
- protected booking available;
- price shown.

Example cues:

```txt
LocalSnow-reviewed profile
```

```txt
Guaranteed booking available
```

```txt
1–5 star verified LocalSnow reviews
```

```txt
Availability recently updated
```

Boundary:

- “LocalSnow-reviewed” means LocalSnow reviewed enough information to increase confidence.
- “Verified” should only be used where the verification actually exists.
- Do not claim licenses, insurance, criminal checks, federation credentials or legal verification unless actually checked.

## CT8 — Email updates + lightweight client account

Applies to:

- SM6 self-managed inquiry;
- SM9 notification/action-link delivery;
- SM5 request lifecycle.

Trust job:

Make the user feel informed, capture useful client/contact data, and keep future marketing/list-building possible without turning the request flow into friction.

Approved direction:

- Email is mandatory/backstop for important actions.
- Lightweight client account/dashboard is the nicer product surface.
- Email and account/dashboard tracking are not mutually exclusive.
- They are both/and, not either/or.
- Client identity/contact capture is strategically important: LocalSnow should build its own client list for future email/marketing/retention, with proper consent.
- Preferred direction is very low-friction signup/login before high-intent actions such as viewing full availability/contact details, sending a self-managed inquiry, or starting guaranteed booking.
- Google OAuth, magic links or similarly low-friction auth should be considered later; exact auth gate belongs to engineering/UX, not this copy layer.

Client copy:

```txt
We’ll email every important update. You can also follow this lesson from your LocalSnow account.
```

```txt
Your lesson dashboard shows status, payment/refund information, review links and your contact details.
```

Email/action link copy:

```txt
Open lesson details
```

```txt
Review your lesson
```

```txt
Approve this alternative
```

Boundary:

- Do not promise in-app messaging.
- Do not hide public SEO/discovery pages behind login; gate the high-intent actions where contact capture is valuable.
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
New lesson client from LocalSnow
A client wants a ski/snowboard lesson at [Resort]. Open the lesson details to see dates, time preference, level and contact details.
```

Action labels:

```txt
Open lesson details
```

```txt
I want to confirm/take this lesson
```

```txt
I need different details
```

```txt
I cannot take this lesson
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
- tied to a verified real lesson;
- one review per completed/verified lesson;
- visible immediately by default;
- Moli can hide/remove abuse or obvious problems;
- Google Reviews may complement later but should not replace LocalSnow’s real-lesson trust loop.

Prompt copy:

```txt
How was your lesson?
Your review helps future skiers and snowboarders choose with confidence, and helps great instructors build a more trustworthy profile around their passion and good work.
```

Review credibility copy:

```txt
Verified LocalSnow review
```

```txt
Reviewed after a real lesson
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
We’re confirming the lesson details
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
lesson details complete
→ client contact/account captured with low friction
→ guaranteed booking chosen
→ secure Stripe Checkout payment
→ payment held safely while booking is handled
→ lesson being confirmed/handled
→ confirmed lesson / suitable alternative / refund
```

Copy must make guaranteed/protected booking feel handled and strong: LocalSnow ensures the lesson, a suitable alternative, or a refund. Do not over-promise instant final confirmation or exact instructor certainty.

### Self-managed path

```txt
lesson details complete
→ client contact/account captured with low friction
→ free inquiry chosen
→ inquiry forwarded where possible
→ client handles messages, availability and coordination directly with instructor/provider
→ response depends on instructor/provider
```

Copy must keep it useful but clearly self-managed and outside LocalSnow’s guarantee. Do not give it equal emotional weight to guaranteed booking on high-intent paid surfaces.

### Availability into request copy

```txt
availability detail
→ choose preferred date/time/duration
→ LocalSnow/instructor confirms lesson details
```

Copy must collect snowsports-specific lesson information, not generic contact-form intent. Availability freshness should usually stay internal unless exposing it increases confidence.

### Legal/trust into payment copy

```txt
Stripe Checkout
→ clear platform positioning: independent provider + LocalSnow booking/payment/guarantee layer
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

- worldwide-browsable catalog with Spain-first resort and lesson page taxonomy for marketing/conversion focus;
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
