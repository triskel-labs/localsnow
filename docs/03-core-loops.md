# 03 — Core Loops

Derived from: `02-user-jobs.md`

## Purpose

This layer defines the product behavior over time. A product is not a pile of pages; it is loops that create value.

Each loop includes actor, trigger, required input, output and unresolved decisions. The next surface map must derive from this, not invent pages independently.

## Loop A — Supply activation

```txt
Professional joins through guided self-serve setup, or is invited/manual-entered
→ creates or confirms profile
→ defines resorts/sports
→ adds trust info
→ creates simple offers
→ sets requestability / basic availability when useful
→ previews
→ fixes required warnings or knowingly publishes an incomplete-but-useful listing
```

Actor:

- independent instructor;
- basic school/light provider listing with no staff/admin complexity.

Trigger:

- professional signs up through self-serve setup, or Moli invites/adds supply manually.

Required input:

- identity/contact;
- resorts;
- sports/levels;
- trust/eligibility markers;
- simple offer information;
- requestability and optional availability signal;
- profile-completeness warnings.

Output:

- useful public supply ready to receive free self-managed inquiries and paid guaranteed requests, with visible completeness/trust signals.

Serves:

- independent instructor jobs;
- basic school/light provider jobs;
- client need for credible supply.

Unresolved before surface map:

- exact required vs recommended setup fields;
- exact trust/completeness labels;
- how availability behaves for instructors vs schools/providers.

## Loop B — Client request

```txt
Client arrives from search/SEO/direct link
→ understands LocalSnow
→ finds relevant profile/offer
→ sees requestability/availability signals if configured
→ chooses free self-managed inquiry or paid guaranteed request
→ submits inquiry or pays online
→ receives confirmation/next step
```

Actor:

- first ICP in Spain-first launch focus, likely Baqueira Beret as the first marketing wedge.

Trigger:

- search/SEO/social/direct link/outreach.

Required input:

- resort/sport intent;
- client contact;
- preferred date/context;
- group/level/message;
- selected self-managed or guaranteed path;
- selected service and calculated price for guaranteed path.

Output:

- free self-managed inquiry forwarded/tracked with notifications, or paid guaranteed request requiring LocalSnow fulfillment.

Serves:

- client jobs;
- revenue thesis through guaranteed requests.

Unresolved before surface map:

- exact first ICP;
- exact first payment/refund policy copy;
- communication channels, action links and response-window promise.

## Loop C — Guaranteed fulfillment

```txt
Paid guaranteed request arrives
→ LocalSnow records payment/request context
→ Moli reviews context internally
→ Moli contacts requested professional/client if needed
→ Moli confirms, reschedules, finds replacement, requests higher-price approval, cancels or refunds according to policy
→ LocalSnow sends client/instructor details and notifications
→ request reaches a business outcome
```

Actor:

- LocalSnow as the public platform;
- Moli as internal owner-operator.

Trigger:

- guaranteed request paid/submitted.

Required input:

- client contact;
- desired lesson context;
- target profile/offer;
- preferred dates;
- communication channel;
- payment state;
- calculated price;
- replacement/refund policy.

Output:

- confirmed lesson, suitable trusted alternative, reschedule, or refund.

Outcome vocabulary, not final state model:

- needs clarification;
- professional contacted;
- waiting for response;
- price approval needed;
- payment captured;
- confirmed;
- replacement proposed;
- rescheduled;
- completed;
- cancelled;
- refunded if applicable;
- review prompt due/sent.

Serves:

- operator/Moli jobs;
- guaranteed request promise.

Unresolved before surface map:

- response-window/SLA;
- exact payment/refund policy;
- how much operator detail is needed in the first surface.

## Loop D — Future SkiRelay bridge

```txt
Guaranteed request cannot be served directly
→ mark as replacement-needed/candidate
→ future private supply network can help
```

Actor:

- Moli now;
- future SkiRelay network later.

Trigger:

- requested professional cannot serve, and client still wants the guaranteed outcome.

Output:

- future bridge candidate, not a v1 integration.

This loop is intentionally not built in v1. LocalSnow should avoid blocking it, but should not become SkiRelay.

## Loop E — Future trust/reputation learning

```txt
Lesson/request outcome happens
→ LocalSnow sends review prompt after the lesson/request date
→ client review improves instructor/profile trust
→ LocalSnow learns whether profile/promise/fulfillment worked
```

This loop should be simple in v1: a review prompt after the lesson/request date and a review form tied to the professional. It should not become a full reputation system before demand exists.

## Surface map gate

Before `04-surface-map.md`, Moli must review the Phase 1 decision record.

Every proposed surface must trace to:

```txt
product promise → user job → core loop → boundary/non-goal → unresolved decision if any
```

The surface map may name likely screens, but must not introduce database schema, canonical state names or engineering architecture.