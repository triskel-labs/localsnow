# 01 — Product Promise

Derived from: `00-ceo-brief.md`

## Purpose

This layer defines what LocalSnow can honestly say to clients and professionals. Copy, UX and payments must obey this promise later.

## Public promise

LocalSnow helps clients find credible snowsports professionals and choose one of two paths:

1. Send a direct inquiry.
2. Ask LocalSnow for protected help.

## Direct path promise

**Phase 1 decision:** direct means an on-platform inquiry that LocalSnow forwards to the professional and can track as demand. It is not protected, and it is not a guaranteed booking.

LocalSnow promises:

- discovery;
- profile/offer information;
- a clean inquiry path;
- forwarding/tracking the inquiry where technically available.

LocalSnow does **not** promise:

- professional response;
- availability;
- exact lesson fulfillment;
- replacement;
- refund;
- dispute handling;
- LocalSnow follow-up unless Moli manually chooses to help.

External contact links may exist later, but the v1 surface map should treat direct as a tracked inquiry unless Moli changes this.

## Protected path promise

The client asks LocalSnow to help make the lesson happen.

LocalSnow promises:

- first try the requested professional/school;
- if unavailable, help reschedule or find a suitable replacement;
- ask client approval before any higher replacement price;
- refund/no-charge only according to the payment state and policy Moli approves later.

LocalSnow does **not** promise in v1:

- instant confirmation;
- guaranteed exact instructor;
- real-time availability;
- cheapest possible price;
- automatic replacement.

## Payment boundary

Until Moli approves otherwise, the working promise is:

```txt
Protected request first → Moli qualifies manually → payment handled manually after the path is viable.
```

This avoids building payment architecture before the first operational workflow is proven.

Any wording about refunds/no-charge must remain conditional until payment timing and collection method are approved.

## Requestability invariant

`Available to request` / `requestable` means:

> This professional or offer is open to receiving requests for this resort/sport/season/context.

It does **not** mean:

- live calendar availability;
- confirmed slot;
- instant booking;
- LocalSnow guarantee on direct path;
- exact instructor guarantee on protected path.

The later surface map may show requestability as a confidence/help signal, not as a calendar truth.

## Professional promise

LocalSnow helps professionals create a credible public profile, publish simple offers and receive qualified client interest without managing a complex admin system.

Professional setup mode is not fully decided yet:

- self-serve;
- Moli-assisted;
- invite/manual-entry;
- hybrid.

This decision blocks the professional setup surface map.

## Operator promise

LocalSnow gives Moli enough context to manually coordinate protected requests: client need, target professional/offer, preferred dates, communication channel, payment state if any, status-like outcome vocabulary and next action.

## Language rule

Use words like:

- request;
- direct inquiry;
- protected request;
- available to request;
- LocalSnow helps confirm;
- Moli/LocalSnow will follow up within the approved response window.

Avoid words like:

- instant booking;
- guaranteed instructor;
- confirmed availability;
- automatic replacement;
- free refund unless the policy exists.