# 02 — UX Flows

## UX principles

- Mobile first, not mobile afterthought.
- One clear decision per step where possible.
- Public/client surfaces should feel premium and trustworthy.
- Professional setup should feel calm, guided and lightweight.
- Operator surfaces should be plain and useful.
- Human/manual fulfillment is part of v1, not a product failure.

## Client discovery flow

```txt
Homepage or SEO resort page
→ search/filter by resort, sport, rough date/group/service intent
→ results list
→ profile or offer detail
→ direct contact or protected request
→ success page
```

### Result card needs

- photo/avatar;
- name;
- instructor/school type;
- resort match;
- sport match;
- languages;
- credential/trust marker;
- `from` price or price-on-request;
- requestability state;
- primary CTA.

## Direct inquiry flow

```txt
Profile/offer
→ Direct inquiry form
→ submit
→ request stored
→ professional notified
→ client sees direct-path success page
```

### Form fields

- client name;
- email;
- phone/WhatsApp;
- preferred date(s);
- group size;
- level;
- message;
- target profile/offer hidden server-side from route context, not trusted client input alone.

### Success copy intent

Tell the client the request was sent directly and that LocalSnow does not guarantee the response or lesson on this path.

## Protected request flow

```txt
Profile/offer
→ Protected request explanation
→ short request form
→ operator case created
→ protected success page
```

### Required explanation

- LocalSnow tries requested professional first.
- If unavailable, LocalSnow helps reschedule, replace or refund/no-charge.
- Any higher replacement price needs client approval first.
- This is not instant confirmation.

## Professional setup flow

```txt
Sign up
→ choose profile type
→ public identity
→ resorts served
→ sports/levels
→ credentials/languages/trust
→ teaching offers
→ availability/requestability
→ preview
→ publish/request review
```

### Setup rules

- Save progress.
- Show completion state.
- Draft profiles are allowed.
- Preview before publish.
- Avoid dashboard language until the profile exists.
- No complex calendar in v1.

## Operator flow

```txt
Request queue
→ request detail
→ update status
→ update next action
→ internal note
→ done/waiting/cancelled
```

### Operator surface fields

- request type;
- client contact;
- selected profile/offer;
- resort/sport;
- preferred dates;
- group size/level;
- public path/source page if available;
- status;
- next action;
- internal notes.
