# 03 — Core Loops

Derived from: `02-user-jobs.md`

## Purpose

This layer defines the product behavior over time. A product is not a pile of pages; it is loops that create value.

Each loop includes actor, trigger, required input, output and unresolved decisions. The next surface map must derive from this, not invent pages independently.

## Loop A — Supply activation

```txt
Professional joins or is invited/manual-entered
→ creates or confirms profile
→ defines resorts/sports
→ adds trust info
→ creates simple offers
→ sets requestability
→ previews
→ publishes or requests review
```

Actor:

- independent instructor first;
- light provider only if Moli approves the conditional branch.

Trigger:

- Moli invites/adds supply, or professional signs up if self-serve/hybrid is approved.

Required input:

- identity/contact;
- resorts;
- sports/levels;
- trust/eligibility markers;
- simple offer information;
- requestability signal.

Output:

- credible public supply ready to receive direct/protected requests.

Serves:

- independent instructor jobs;
- conditional light provider jobs;
- client need for credible supply.

Unresolved before surface map:

- self-serve vs Moli-assisted/manual-entry;
- exact trust/eligibility minimum;
- school/provider branch.

## Loop B — Client request

```txt
Client arrives from search/SEO/direct link
→ understands LocalSnow
→ finds relevant profile/offer
→ chooses direct inquiry or protected request
→ submits request
→ understands next step
```

Actor:

- first ICP in first launch market.

Trigger:

- search/SEO/social/direct link/outreach.

Required input:

- resort/sport intent;
- client contact;
- preferred date/context;
- group/level/message;
- selected direct or protected path.

Output:

- direct inquiry forwarded/tracked, or protected request needing manual LocalSnow action.

Serves:

- client jobs;
- revenue thesis through protected requests.

Unresolved before surface map:

- first market/ICP;
- payment boundary for protected path;
- communication channel and response-window promise.

## Loop C — Manual protected fulfillment

```txt
Protected request arrives
→ Moli reviews context
→ Moli clarifies if needed
→ Moli contacts requested professional/client
→ Moli proposes confirmation, reschedule, replacement, price approval, cancellation or refund/no-charge according to policy
→ request reaches a business outcome
```

Actor:

- Moli / LocalSnow operator.

Trigger:

- protected request submitted.

Required input:

- client contact;
- desired lesson context;
- target profile/offer;
- preferred dates;
- communication channel;
- payment state if any.

Output:

- manually coordinated business outcome.

Outcome vocabulary, not final state model:

- needs clarification;
- professional contacted;
- waiting for response;
- price approval needed;
- confirmed;
- replacement proposed;
- rescheduled;
- completed;
- cancelled;
- refunded/no-charge if applicable.

Serves:

- operator/Moli jobs;
- protected path promise.

Unresolved before surface map:

- response-window/SLA;
- payment/refund/no-charge policy;
- how much operator detail is needed in the first surface.

## Loop D — Future SkiRelay bridge

```txt
Protected request cannot be served directly
→ mark as replacement-needed/candidate
→ future private supply network can help
```

Actor:

- Moli now;
- future SkiRelay network later.

Trigger:

- requested professional cannot serve, and client still wants help.

Output:

- future bridge candidate, not a v1 integration.

This loop is intentionally not built in v1. LocalSnow should avoid blocking it, but should not become SkiRelay.

## Loop E — Future trust/reputation learning

```txt
Lesson/request outcome happens
→ LocalSnow learns whether profile/promise/fulfillment worked
→ testimonials/reviews/referrals/profile improvements may improve future trust
```

This loop is important for credibility but not required in the first build. It should be remembered as a future trust loop, not forced into v1.

## Surface map gate

Before `04-surface-map.md`, Moli must review the Phase 1 decision record.

Every proposed surface must trace to:

```txt
product promise → user job → core loop → boundary/non-goal → unresolved decision if any
```

The surface map may name likely screens, but must not introduce database schema, canonical state names or engineering architecture.