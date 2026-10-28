---
title: TestPulse
slug: testpulse
eyebrow: QA reporting tool
summary: A QA reporting tool that uses CI history to investigate flaky tests and regressions.
role: Independent project
order: 1
category: QA tooling
stack:
  - Python
  - FastAPI
  - React / TypeScript
  - PostgreSQL
  - GitHub Actions
repository: https://github.com/Mohanad49/testpulse
report: https://testpulse-eight.vercel.app
reportLabel: Explore the dashboard
evidence: https://github.com/Mohanad49/testpulse/blob/7d9ac7a3466889265bb0799a2f96aed759481084/README.md
evidenceDate: "2026-10-22"
boundary: The public dashboard is a static export of real CI results. Its freshness is shown in the dashboard.
---

## A red test needs an explanation

A test that fails intermittently and a test that started failing after a change
can produce the same red CI result. They need different investigations. Retrying
both until they pass conceals the distinction.

I built TestPulse to retain test history, compare outcomes, and surface the
evidence behind a flake classification. The question is practical: did the test
behave inconsistently, or did something change?

## One history across different runners

The ingestion layer normalizes JUnit XML, Playwright JSON, PyTest JSON, and Allure
results into a shared model of runs and test outcomes. A metrics layer computes
history, duration trends, changes, and candidate flake patterns. FastAPI and the
React dashboard expose that information; a composite GitHub Action connects CI.

The parser contract preserves what each format can actually report. Missing
retry information stays unknown instead of becoming zero retries. That detail
matters because one classification strategy depends on it.

## Two strategies, two levels of confidence

**Same-commit evidence** looks for inconsistent outcomes at an unchanged commit,
including a failed attempt followed by a successful retry. It provides stronger
evidence of instability, but requires repeated outcomes to compare.

**Rolling-flip inference** uses a configurable history window, pass-rate bounds,
and changes between outcomes. A long passing period followed by a long failing
period should not be treated like a test that repeatedly alternates between both.

The dashboard keeps the evidence type visible. A single numerical score is not
a substitute for knowing why a test was classified.

## Decisions that changed the result

- **Stable test identity:** mobile flows must report individual journeys. One
  combined JUnit result cannot identify which journey is unstable.
- **Accessible history:** timeline cells use glyphs as well as color, and retry
  passes carry an additional visual distinction.
- **Changes in PR comments:** newly failing tests are separated from failures
  already present before the current run.
- **Expiring quarantine:** an entry has an owner and an expiry. Expiry makes debt
  visible; it does not pretend the underlying test has been repaired.

## Evidence that can be inspected

The public dashboard contains exported results from actual CI suites. The
repository documents the classifier, parser behavior, test strategy, and design
decisions. Tests use real reporter output as fixtures, while meta-tests check
that contract and accessibility validators reject deliberately broken examples.

## Limits are part of the report

The public demo serves static files and is only as fresh as its most recent
export. It does not expose a continuously running public ingestion API.

The README also records format-specific gaps, including the limits of Allure
retry reconstruction. Those limits affect how much evidence a classification
can use and remain part of the case study.
