# Phase 1 Review Gate

## Purpose

This file operationalizes the approval gate before LocalSnow moves from product meaning to surface mapping.

Phase 1 consists of:

1. `00-ceo-brief.md`
2. `01-product-promise.md`
3. `02-user-jobs.md`
4. `03-core-loops.md`

## Review status

Current status: **approved with stated assumptions — ready for surface map**.

Reason: Moli’s second review approved most of the direction and added final corrections around Spain-wide scope, families/couples as first buyer persona, email/minimal tracking channels, 24–48h guaranteed-route response, school listing claims, simpler verification, and future SkiRelay-compatible availability.

## Reviewer findings folded in

- `direct` has been renamed/framed as **free self-managed inquiry**.
- The paid route is now **guaranteed booking**: online payment first, LocalSnow secures the lesson, a suitable trusted alternative, or refund.
- The public product should feel like a smooth platform; manual owner work remains internal and should not be exposed as the client promise.
- Spain is the launch country. First outreach/marketing should concentrate where Moli has network leverage, but the directory and supply surface should be Spain-wide.
- First buyer persona: families/couples buying private or group lessons where client-instructor fit matters.
- Basic availability/requestability is part of v1 value, but it must not be presented as absolute live truth.
- Availability should be source-aware and future SkiRelay-compatible, but not a standalone microservice before usage proves the need.
- School/provider listings are included, can be owner-added manually, and may later need claim/ownership transfer.
- Professional setup should be self-serve, guided, warning-driven and optimized for “done once with effort, works forever.”
- Moli needs necessary full CRUD/control access, contact details, email/action notifications and minimal tracking — not in-app messaging or a full CRM/dashboard.
- Reviews after real lessons are now a simple v1 trust loop.
- Core loops were updated from Moli’s review and can now feed the surface map.

## Approved assumptions for next layer

### D1 — First launch market/resort

> Spain-wide directory/supply surface. Initial outreach/marketing should concentrate where Moli has network leverage: Baqueira Beret, La Molina, Cerler and similar Spanish resorts. Directory browsing and profile creation stay open beyond those resorts.

### D2 — First ICP

> Families/couples buying private or group lessons in Spain where good client-instructor fit, language compatibility and a guaranteed outcome matter.

### D3 — Supply scope

> Independent instructors plus basic school/provider listings from the start. Moli can manually add schools while scanning resorts, then later invite/allow claim or ownership transfer. No school staff/admin features in v1.

### D4 — Language strategy

> Bilingual English + Spanish from day one. English is mandatory for international clients; Spanish is mandatory for Spain-first launch and local supply. Marketing language can differ by channel: Spanish/local supply and resort SEO where relevant; English for international tourist demand.

### D5 — Payment/revenue boundary

> Guaranteed request goes directly to low-friction online payment with price calculated from the selected service/request. LocalSnow then secures the requested lesson, a suitable trusted alternative, or refund. Instructor payout and edge-case coordination can be manual behind the scenes. No Stripe Connect/full payout system in first scaffold.

Legacy reference note: `localsnow-legacy` has a simple `basePrice`/`currency` instructor setup plus older protected-booking capability flags. Treat that as reference material only, not as the new pricing source of truth.

### D6 — LocalSnow operational role

> LocalSnow v1 is a free SEO/discovery directory with marketplace-like paid guaranteed booking capability. Public experience should feel platform-led; internal fulfillment can be manually operated by Moli until automation is justified.

### D7 — Credibility/eligibility minimum

> Do not make incomplete profiles a hard blocker while supply is low. Publish useful profiles with clear completeness signals, warnings for missing important information and an optional verified badge when the key profile information is complete enough. Avoid a complex trust/eligibility system in v1.

### D8 — Availability boundary

> Basic instructor-maintained availability/requestability should exist. For schools/providers, start with coarser requestability rather than granular multi-instructor calendars. Model availability as a source-aware primitive that SkiRelay can feed later, but do not build a separate shared microservice now.

### D9 — Response-window promise

> Guaranteed route: the client should receive a response in less than 24–48 hours. Self-managed route: LocalSnow may show an estimate, but the response depends on the instructor/provider.

### D10 — Notification/action-channel boundary

> Email notifications for important user actions, inquiry-sent messages and instructor notifications. Minimal in-platform request tracking/dashboard is allowed. No in-app messaging in v1; Moli needs contact details to call/message people directly. Telegram gateway can be considered for internal/operator notifications if easier than email, not as a public messaging product.

## Approval checklist

Moli can approve Phase 1 when:

- [x] CEO brief is directionally right after Moli’s review comments.
- [x] Self-managed vs guaranteed promise is right.
- [x] User jobs are right.
- [x] Core loops are right.
- [x] D1–D10 are approved, edited, or explicitly left as stated assumptions.

## Rule for next layer

`04-surface-map.md` may now be created. It must label assumptions from this gate and trace every surface to:

```txt
product promise → user job → core loop → boundary/non-goal → approved assumption
```

The surface map may name likely screens, but must not introduce database schema, canonical state names or engineering architecture.