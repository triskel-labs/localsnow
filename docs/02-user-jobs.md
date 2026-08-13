# 02 — User Jobs

Derived from: `01-product-promise.md`

## Purpose

This layer names the jobs users need LocalSnow to do. These are not features yet.

## Client jobs

A client needs to:

- find lesson options in a resort;
- understand who looks credible enough to consider, without treating incomplete profiles as invisible when supply is still low;
- understand what sport/level/service they offer;
- see useful availability/requestability signals when configured, without mistaking them for absolute live truth;
- choose between free self-managed inquiry and paid guaranteed request;
- submit a request quickly on mobile;
- make a safe, low-friction online payment for the guaranteed route;
- understand who will contact them, through which channel, and roughly when;
- understand what happens if the requested professional cannot serve them;
- leave a review after the lesson or requested lesson date has passed.

## Independent instructor jobs

An independent instructor needs to:

- look credible online;
- show where and what they teach;
- communicate language, credentials, experience, style and eligibility/trust markers;
- publish simple lesson offers;
- configure basic availability/requestability when useful;
- receive qualified requests;
- avoid heavy admin/calendar/software work in v1;
- control what is public;
- be guided to finish the profile/offer setup with clear warnings when something important is missing.

## School/light provider jobs

A school or small provider may need to:

- appear credible in resort discovery;
- publish simple offers;
- receive requests;
- optionally expose basic availability/requestability only where it fits;
- avoid staff management and internal operations software in v1.

This branch is included for the SEO directory vision, but strictly simple: no school staff management, no internal school admin and no complex provider operations in v1.

## Operator/Moli jobs

Moli needs to:

- see incoming self-managed/guaranteed requests;
- know which requests are free self-managed demand signals versus paid guaranteed cases needing action;
- know who the client wants and what they need;
- receive email/platform notifications for important actions, especially paid guaranteed requests;
- contact client/professional as needed;
- record whether clarification is needed, professional has been contacted, response is pending, replacement may be needed, price approval may be needed, payment/refund is needed, review prompt is due, or the request is closed;
- track next action;
- keep internal notes;
- use necessary full CRUD/correction controls;
- send/trigger client and instructor notifications with the correct details;
- learn which manual steps repeat before automating them.

The exact state model comes later. These are business words only, not database/status names yet.

## Open decisions that block the surface map

- Launch focus: Spain first, likely Baqueira Beret for the first marketing wedge, while keeping directory browsing/profile creation open to other resorts.
- First ICP inside Spain/Baqueira.
- Language strategy.
- Exact availability surface and how it borrows from/emulates the future SkiRelay availability model without making availability absolute truth.
- Exact notification channels/action links for self-managed inquiry and guaranteed request.
- Minimum credibility/profile-completeness thresholds and warnings.
- Safe response-window promise.

## What this layer does not decide

This document does not decide:

- page map;
- database schema;
- design components;
- SEO silos;
- payment implementation;
- engineering architecture.

Those come later.