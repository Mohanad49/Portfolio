---
title: LLM Evaluation Harness
slug: llm-evaluation
eyebrow: AI quality evaluation
summary: Measuring variable answers and checking whether the judge itself deserves to be trusted.
role: Independent project
order: 3
category: AI evaluation
stack:
  - Python
  - PyTest
  - RAG
  - Recorded replay
  - GitHub Actions
repository: https://github.com/Mohanad49/llm-eval-harness
report: https://mohanad49.github.io/llm-eval-harness/
reportLabel: Read the evaluation report
evidence: https://github.com/Mohanad49/llm-eval-harness/blob/8dcc8334d99e2ed9fdb74bd87405ebd6152564db/README.md
evidenceDate: "2026-10-22"
boundary: Results describe the included local-model RAG system. Refusal-judge scores are excluded from CI gates.
---

## One answer is a sample

An LLM can answer the same question differently without any code or prompt
change. A single pass/fail result hides that variation. I built a pytest-native
evaluation harness that treats the result as a measurement rather than assuming
one response represents the system.

A deliberately imperfect retrieval-augmented question-answering service provides
the controlled system under test. The harness is the deliverable.

## Make the evaluation replayable

Versioned golden datasets, prompt versions, repeated sampling, and recorded
generations make comparisons inspectable. Replay is the default CI path, so a
reviewer can reproduce checks without a hosted model credential or an unavailable
local runtime. Live recording is a separate, deliberate operation.

The reporting distinguishes consistent outcomes from cases that vary between
draws. It also retains the sample size and confidence interval instead of
presenting a precise-looking percentage on its own.

## Test the measuring instrument

I compared refusal-judge verdicts with 45 blind human labels. The recorded result
was 82% raw agreement, with a 95% interval of 69-91%, and Cohen's kappa of 0.51.
The errors were one-sided: plain answers were incorrectly judged as refusals.

That bias matters when the dangerous behavior is answering a request that should
have been refused. A reassuring judge score could conceal the very behavior the
check was intended to identify.

**The judge was excluded from CI gates.** Its prompt was frozen after labels
existed, rather than repeatedly tuned against the validation set. Other judge
dimensions remain unvalidated and are not presented as measured results.

## Findings needed different explanations

The recorded evaluations surfaced personal-data disclosures in the included
local test system, a fabricated capability, retrieval failures, and scorer false
negatives. Those are different failure mechanisms. Combining them into one
headline pass rate would conceal the next investigation each one needs.

Prompt-regression comparisons therefore preserve the underlying case evidence
and account for unstable outcomes. A changed verdict is not automatically a
regression when the case already disagrees with itself.

## Preserve the unit of evidence

The TestPulse integration emits a separate JUnit file for each draw. Repeated
outcomes keep the same test identity across runs. Combining them into separate
test IDs would make a variable case appear to be several stable tests.

This is a small reporting choice with a direct consequence for what the
downstream flake detector can actually observe.

## What this work does not establish

The evidence concerns a small local model, its corpus, and the recorded datasets.
It does not establish quality for hosted commercial models or larger deployments.
The human-label sample is small, and some implemented metrics remain unused
because their required reference data does not exist.

The repository and report keep those limits visible alongside the findings.
