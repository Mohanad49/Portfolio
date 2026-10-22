---
title: Cal.diy QA Strategy
slug: caldiy
eyebrow: Risk-led testing
summary: Testing scheduling at the boundaries where time, state, and concurrent requests disagree.
role: Independent QA engagement
order: 2
category: Test strategy
stack:
  - Playwright / TypeScript
  - Python
  - Cucumber
  - k6
  - Docker
repository: https://github.com/Mohanad49/caldiy-qa-strategy
report: https://mohanad49.github.io/caldiy-qa-strategy/
reportLabel: Read the Allure report
evidence: https://github.com/Mohanad49/caldiy-qa-strategy/blob/f7e5dcb77e8098a4f38825900039296b8e11598d/README.md
evidenceDate: "2026-10-22"
boundary: Tested against the pinned Cal.diy v6.2.0 snapshot. The published report preserves documented accessibility failures.
---

## A booking is more than a successful click

A scheduling system can show a plausible booking while its time zone, stored
state, confirmation email, or remaining capacity disagrees. I organized this QA
engagement around those risks rather than the number of UI features covered.

The controlled target was Cal.diy v6.2.0, the final public Cal.com snapshot. The
work does not claim coverage of current hosted Cal.com.

## Start with a reproducible target

Docker infrastructure, a pinned source commit, and repeatable seeded data made
the results attributable to a known system. Python API contracts exercised
lower-level behavior; Playwright covered browser journeys and lifecycle state.
Selective Cucumber scenarios expressed a small set of meaningful business flows.

Each layer had a specific job. A browser test did not need to stand in for an
API contract check, and a response-time threshold could not prove booking integrity.

## Follow the boundaries

**Time and date:** timezone/DST scenarios included date rollover and checked
consistency through rescheduling and email.

**State:** lifecycle coverage followed a booking through the relevant API,
browser, and notification surfaces rather than trusting the first success message.

**Concurrency:** capacity-one contention checked what persisted after simultaneous
attempts. The recorded audit produced one successful booking, 19 expected
conflicts, and one persisted booking.

**Usability and access:** visual comparisons protected meaningful content while
accessibility scans retained the product failures they found.

## The gate stayed red

In the documented final audit, the API suite passed 13 of 13 tests, the BDD suite
passed all three scenarios, and timezone/DST checks passed 14 of 14 tests.
Accessibility passed on one of three surfaces. The other two remained red for
unsuppressed findings.

I kept that result visible. Relabeling the findings as flaky or weakening the
gate would have made the report easier to present and less useful as evidence.
These are recorded audit results, not a claim that every future run will match.

## Reproduce before reporting upstream

Two API-contract defects were reported publicly after duplicate searches and
reproduction against exact public source: duplicate OpenAPI operation IDs and
boolean booking-field schemas described as objects.

The issue reports are inspectable:

- [Duplicate calendar operation IDs](https://github.com/calcom/cal.diy/issues/29903)
- [Booking-field boolean schema mismatch](https://github.com/calcom/cal.diy/issues/29904)

Historical observations without the necessary current reproduction stayed local.
The case study does not turn an old finding into a claim about today's product.

## Read the scope with the results

The Allure report is a published run snapshot. Local Docker latency is not a
production SLO. Hosted Cal.com, real calendar/OAuth providers, and production
payment behavior were outside this engagement's controlled target.
