# 01 — User Jobs and Core Loops

## Hierarchy

Product decisions flow downward:

```txt
CEO goal → Product promise → User jobs → Loops → Surfaces → Records → Actions/states → Tests/PRs
```

If a feature does not fit this hierarchy, it is drift.

## User jobs

### Client

- Find a ski/snowboard lesson in a specific resort.
- Understand who can teach them and why that person/school is credible.
- Know whether the option is realistically requestable.
- Choose direct contact or LocalSnow protected help.
- Submit a request quickly from mobile.
- Understand what happens after submission.

### Independent instructor

- Create a polished public profile.
- Show resorts, sports, languages, credentials and teaching style.
- Add simple lesson/offer cards.
- Receive qualified requests without managing complex admin.
- Control what is public.

### School/small provider

- Publish credible public presence and offers.
- Receive requests.
- Avoid staff/permission/calendar complexity in v1.

### Operator/Moli

- See incoming requests.
- Know client details, desired lesson, target profile and preferred dates.
- Track the next manual action.
- Update request/case status.
- Keep internal notes.

## Core loops

### Loop A — Supply activation

```txt
Professional signs up
→ creates profile
→ selects resorts/sports
→ adds credentials/languages
→ creates simple offers
→ sets requestability
→ previews
→ publishes/request review
```

Goal served: G2 Professional profile activation.

### Loop B — Client acquisition

```txt
Client lands on homepage/SEO/search
→ chooses resort/sport/lesson intent
→ scans results
→ opens profile/offer
→ sends direct or protected request
```

Goal served: G1 Client discovery and conversion.

### Loop C — Manual fulfillment

```txt
Request arrives
→ operator case created
→ Moli contacts client/professional
→ status/next action updated
→ confirmed, completed, cancelled, replacement, refund/no-charge
```

Goal served: G3 Manual operations visibility.

### Loop D — Future SkiRelay bridge

```txt
Protected request cannot be served directly
→ mark as replacement-needed/candidate
→ future SkiRelay opportunity can be created
```

Goal served: G5 Future compatibility. Do not build full Loop D in v1.

## PR trace template

Each PR should include:

```txt
Goal:
Loop:
Surface:
Records:
Actions/states:
Acceptance test:
Not included:
```
