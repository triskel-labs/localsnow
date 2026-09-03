# 01 — Product Promise

Derived from: `00-ceo-brief.md`

## Purpose

This layer defines what LocalSnow can honestly say to clients and professionals. Copy, UX and payments must obey this promise later.

## Public promise

LocalSnow helps clients find credible snowsports professionals and choose one of two paths:

1. Send a free self-managed inquiry.
2. Pay for a guaranteed booking.

## Self-managed inquiry promise

**Phase 1 decision:** self-managed means an on-platform inquiry that LocalSnow forwards to the professional and can track as demand. It is free, not guaranteed, and not protected by LocalSnow fulfillment.

LocalSnow promises:

- discovery;
- profile/offer information;
- a clean inquiry path;
- inquiry-sent confirmation for the client;
- notification to the professional where technically available;
- forwarding/tracking the inquiry where technically available;
- later review prompts when the requested lesson date has passed.

LocalSnow does **not** promise:

- professional response;
- availability;
- exact lesson fulfillment;
- replacement;
- refund;
- dispute handling;
- LocalSnow follow-up or guarantee unless the client chooses the paid guaranteed route.

External contact links may exist later, but the v1 surface map should treat self-managed as a tracked inquiry unless Moli changes this.

## Guaranteed request promise

The client pays LocalSnow to make the lesson happen. From the client side, this can feel like booking: they submit the lesson details and pay online immediately. What is not instant is the final lesson confirmation, because LocalSnow still has to secure the requested professional, a suitable trusted alternative or a refund path.

LocalSnow promises:

- a safe, low-friction online payment path;
- price calculated from the selected professional/school service and request details;
- first try the requested professional/school;
- if unavailable, secure a suitable trusted replacement or help reschedule;
- ask client approval before any higher replacement price;
- refund if LocalSnow cannot provide the requested lesson outcome or a suitable trusted alternative.

LocalSnow does **not** promise in v1:

- instant final confirmation;
- guaranteed exact instructor;
- real-time availability;
- cheapest possible price;
- automatic replacement.

## Payment boundary

Approved Phase 1 direction:

```txt
Guaranteed request → calculated online price → low-friction online payment → LocalSnow confirms/fulfills or replaces/refunds.
```

The client-facing path should feel like a complete platform transaction. Internally, Moli can still confirm instructors, handle replacements, payouts and edge cases manually until volume justifies automation.

This requires a tight basic service/request price calculation system. It does **not** require Stripe Connect, automated instructor payouts or full marketplace accounting in the first scaffold.

## Requestability invariant

`Available to request` / `requestable` / availability signals mean:

> This professional or offer is open to receiving requests for this resort/sport/season/context, and may expose instructor-maintained availability or slots when the professional has configured them.

It does **not** mean:

- absolute live calendar truth;
- confirmed slot;
- instant final confirmation;
- LocalSnow guarantee on the self-managed path;
- exact instructor guarantee on the guaranteed path.

The later surface map should include a basic availability layer because it is part of the value beyond a plain text directory. It must still warn or imply clearly that instructor-maintained availability can be stale, optional or unavailable. Independent instructors can have basic date/slot-style availability; schools/providers may start with coarser requestability because granular calendars across multiple instructors are too complex for v1.

## Professional promise

LocalSnow helps professionals solve the reach problem: more lesson clients and revenue without having to become content creators, expose themselves online every week, gamble on a generic marketing agency, or manage a heavy platform.

The professional promise is simple:

- more qualified ski/snowboard lesson clients;
- more paid work when LocalSnow can bring demand;
- less marketing/admin complexity;
- fair commission only makes sense when LocalSnow creates real business;
- a specialized lesson-discovery space where professionals live and clients already look for lessons.

Professional setup should be as self-serve as possible:

- guided and easy-flowing;
- clear about exactly what is needed next;
- tolerant of incomplete setup without losing progress;
- explicit about missing profile/offer/availability/trust information;
- optimized for “done once with effort, works forever without effort.”

This setup flow is one of the most important v1 flows because supply quality compounds over time. It should feel like creating a professional LocalSnow presence, not configuring a marketplace operating system.

## Operator promise

LocalSnow gives Moli enough context and owner control to operate paid guaranteed bookings: client need, target professional/offer, preferred dates, calculated price/payment state, communication channel, instructor confirmation/replacement status, next action and the ability to send the right client/instructor details after confirmation.

Moli needs necessary full CRUD and correction power, not a full-blown performance dashboard. V1 does not need in-app messaging: it needs reliable contact details, email notifications/action links and minimal in-platform request tracking.

Guaranteed route response promise: the client should receive a response in less than 24–48 hours. Self-managed inquiries can show an estimated response expectation, but the actual response depends on the instructor/provider.

## Language rule

Use words like:

- request, when referring to the internal/domain unit rather than the public benefit;
- self-managed inquiry;
- guaranteed booking;
- protected/safe booking;
- requestable listing;
- available lesson time;
- guaranteed lesson or suitable trusted alternative;
- refund if LocalSnow cannot make the lesson happen;
- LocalSnow will confirm/send the details.

Avoid words like:

- instant confirmation;
- instantly confirmed lesson;
- guaranteed exact instructor;
- confirmed availability;
- automatic replacement;
- perfect live availability;
- exposing that fulfillment is personally/manual operated behind the scenes.
