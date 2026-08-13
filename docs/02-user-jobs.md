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
- make a safe, low-friction online payment for the guaranteed route without feeling bounced into a cold checkout flow;
- receive email confirmations/updates for important actions;
- understand that guaranteed requests should get a response within 24–48h, while self-managed response depends on the instructor/provider;
- understand what happens if the requested professional cannot serve them;
- leave a review after the lesson or requested lesson date has passed.

## Independent instructor jobs

An independent instructor needs to:

- look credible online;
- show where and what they teach;
- communicate language, credentials, experience, style and client-instructor fit information;
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
- claim or take ownership of a listing later if Moli created it manually;
- avoid staff management and internal operations software in v1.

This branch is included for the SEO directory vision, but strictly simple: no school staff management, no internal school admin and no complex provider operations in v1.

## Operator/Moli jobs

Moli needs to:

- see incoming self-managed/guaranteed requests;
- know which requests are free self-managed demand signals versus paid guaranteed cases needing action;
- know who the client wants and what they need;
- receive email/platform notifications for important actions, especially paid guaranteed requests;
- access contact details and contact client/professional directly outside the app as needed;
- record whether clarification is needed, professional has been contacted, response is pending, replacement may be needed, price approval may be needed, payment/refund is needed, review prompt is due, or the request is closed;
- track next action;
- keep internal notes;
- use necessary full CRUD/correction controls;
- send/trigger client and instructor notifications with the correct details and action links where useful;
- learn which manual steps repeat before automating them.

The exact state model comes later. These are business words only, not database/status names yet.

## Decisions carried into the surface map

- Spain-primary directory/supply surface, with first marketing/outreach concentrated in network-led resorts and legacy worldwide resort data kept available for SEO-safe expansion.
- Exact first ICP copy for families/couples buying private/group lessons.
- Exact bilingual language behavior and marketing-language priority.
- Exact availability surface and how it stays compatible with the future SkiRelay availability model without becoming a separate microservice now.
- Exact notification/action links for self-managed inquiry and guaranteed request.
- Minimum profile-completeness thresholds, warnings and verified badge behavior.
- Whether the client request surface stays unified, with paid protected booking as the preferred path and self-managed inquiry as the fallback choice.

## What this layer does not decide

This document does not decide:

- page map;
- database schema;
- design components;
- SEO silos;
- payment implementation;
- engineering architecture.

Those come later.
