# 03 — Domain Model

## Principle

The domain model exists to support v1 loops, not to model the entire snowsports industry.

## Records

### User

Account identity.

Fields:

- id
- email
- name
- phone optional
- auth fields
- role flags: client, professional, operator/admin
- timestamps

### ProfessionalProfile

Public profile for an independent instructor or light school/provider profile.

Fields:

- id
- userId nullable for operator-created seed profiles
- profileType: `independent_instructor | school`
- slug
- displayName
- shortBio
- fullBio
- profileImageUrl
- languages
- credentials
- verificationStatus: `unverified | pending | verified`
- publishStatus: `draft | pending_review | published | hidden`
- contactPreference
- timestamps

### Resort

Search and SEO geography.

Fields:

- id
- name
- slug
- country
- countrySlug
- region
- regionSlug
- timezone optional
- coordinates optional
- publishStatus

### Sport

Snowsport taxonomy.

Fields:

- id
- name
- slug
- publishStatus

### ProfileResort

Where a profile teaches.

Fields:

- profileId
- resortId
- primary boolean

### ProfileSport

What a profile teaches.

Fields:

- profileId
- sportId
- levelTags optional

### TeachingOffer

Simple public service card.

Fields:

- id
- profileId
- title
- slug
- sportId
- audience/level
- durationLabel
- groupMin
- groupMax
- priceMode: `from_price | price_on_request`
- fromPriceCents nullable
- currency
- description
- includedNotes optional
- publishStatus: `draft | published | hidden`

### AvailabilitySignal

Client-safe requestability, not full calendar.

Fields:

- id
- profileId
- seasonStart optional
- seasonEnd optional
- requestability: `available_to_request | limited | request_anyway | unavailable`
- publicNote optional
- freshnessUpdatedAt

### ClientRequest

Client demand record.

Fields:

- id
- requestType: `direct | protected`
- targetProfileId
- targetOfferId nullable
- resortId nullable
- sportId nullable
- clientName
- clientEmail
- clientPhone
- preferredDates text/json initially
- groupSize
- level
- message
- status
- timestamps

ClientRequest statuses:

```txt
new
sent_to_professional
operator_review
instructor_pending
confirmed
replacement_needed
completed
cancelled
refunded_no_charge
```

### OperatorCase

Manual fulfillment record for Moli.

Fields:

- id
- clientRequestId
- priority
- status: `open | waiting | done | cancelled`
- nextAction
- internalNotes
- lastContactedAt optional
- timestamps

## Future compatibility

Do not build SkiRelay integration in v1. Keep future bridge possible by avoiding product-specific dead ends. Later, a protected LocalSnow request can become a private SkiRelay opportunity if it cannot be served directly.

Possible later bridge fields:

- sourceProduct
- sourceRecordId
- bridgeStatus: `none | candidate | sent_to_skirelay | accepted | closed`

Do not include them in the first schema unless they simplify rather than complicate.

## Validation examples

- Published profiles require display name, slug and at least one resort/sport.
- Published offers require title, sport, duration/group info and price mode.
- Direct requests must never create protected-promise copy or payment requirement.
- Protected requests create an operator case.
- Public pages only show published profiles/offers.
