# 12 — Help Contact Intent Router

Derived from: `10-backlog-hierarchy.md` B6/B7/B8/B9 and Moli's review that generic help/contact must stay separate from guaranteed booking.

## Purpose

This slice makes the LocalSnow contact surface clear without turning every message into a booking.

It introduces a public help/contact router led by a stronger conversion path:

```txt
Don’t spend time searching
→ tell LocalSnow what lesson you need
→ talk to a person on WhatsApp
→ choose the right next path deliberately
```

## Product boundary

The help router is not the guaranteed booking flow.

It can collect lesson context and route to WhatsApp, but it must not automatically create:

- a paid guaranteed booking;
- a self-managed inquiry;
- a payment session;
- an operator fulfillment case;
- a provider obligation.

Those records can be linked later only after the user deliberately chooses the next action.

## Frontend surface contract

Routes:

- `/help` — English help/contact router.
- `/es/ayuda` — Spanish help/contact router.

Required surfaces:

- intent selector;
- assisted lesson help hero;
- context form for lesson details;
- WhatsApp handoff CTA;
- secondary intent cards for payment/guarantee question, lesson issue, provider question and general contact;
- contextual CTAs on home, Spain market and resort pages.

Assisted lesson help copy should answer:

> I want to speak to a person. I do not want to spend time searching. I want someone to listen to my lesson needs and help me choose.

Preferred labels:

- EN: `Don’t spend time searching`, `Talk on WhatsApp`.
- ES: `No pierdas tiempo buscando`, `Hablar por WhatsApp`.

## Backend/API contract

Current no-persistence backend seam:

- validate form data server-side;
- normalize fields into a typed help request;
- prepare a WhatsApp handoff URL using the approved WhatsApp Business channel;
- produce a `ContactRequest` draft shape for the future persistence/API layer.

Current action:

```txt
prepareWhatsAppHandoff
```

Allowed now:

- SvelteKit server action validation;
- typed helper for intent config and CTA placements;
- business WhatsApp `wa.me` link generation;
- tests proving no contact auto-converts into a booking.

Not allowed in this slice:

- database writes;
- email delivery;
- Telegram/webhook delivery;
- Stripe/payment creation;
- booking state transitions;
- operator queue UI;
- WhatsApp bot/automation claims.

## Future persistence record

Future record shape:

```txt
ContactRequest
- intent
- locale
- sourcePage/sourceSurface
- client contact details
- lesson context where relevant
- urgency
- linked LessonIntent / SelfManagedInquiry / GuaranteedBooking only when deliberate
- status
- operator notes
```

The important rule:

```txt
ContactRequest can link to LessonIntent or GuaranteedBooking later,
but ContactRequest is not itself a booking.
```

## Acceptance checks

- Home page exposes human-assisted lesson help as a conversion path.
- Spain/resort pages expose the same path where search friction or thin supply may appear.
- WhatsApp URL uses the approved LocalSnow business number.
- Help intent router separates assisted lesson help, payment/guarantee question, lesson issue, provider question and general contact.
- Public copy avoids internal maturity language such as manual backend, automation, support ticket, CRM or workflow engine.
