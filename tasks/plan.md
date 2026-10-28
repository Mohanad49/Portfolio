# Approved implementation plan

## Goal and decisions

Build a cinematic QA portfolio in this isolated checkout of Mohanad49/Portfolio,
branch dev/qa-portfolio. Deploy through the existing Vercel project at
https://myehia.vercel.app. The original checkout and previous deployment stay
available as recovery points. No new skills or plugins are required.

Confirmed: broad Software QA positioning; TestPulse first; homepage plus three
case studies and framework archive; existing portrait; updated resume; direct
email/LinkedIn/GitHub contact; conceptual employer art; image concepts first.

## Skill ownership

| Skill | Responsibility | Trigger | Handoff |
| --- | --- | --- | --- |
| portfolio-case-study-writer | Structure factual case studies | Before concepts or after factual changes | Verified copy and evidence to Impeccable; no layout authority |
| Impeccable | Visual direction, UX, UI, motion intent, visual acceptance | Concepts through completed-surface review | Asset briefs to imagegen; final visual verdict and design records |
| imagegen | Produce/edit raster assets | An Impeccable asset brief | Assets back to Impeccable; actual evidence uses real captures |
| git-workflow-and-versioning | Isolation, branches, commits, PR mechanics | Setup and verified increments | Current verification evidence; no design or release-readiness authority |
| code-review-and-quality | Source correctness, architecture, security, dependencies, resource handling | Milestones and before merge | Ranked technical findings; no aesthetic redesign |

Playwright, axe, Lighthouse CI, browser inspection, and Vercel are tools for this
plan, not additional workflows. Impeccable's builder-to-finish-reviewer handoff is
one visual pipeline with independent assessment. Technical review is separate.

## Precedence

1. Higher-priority runtime instructions and explicit owner decisions.
2. This approved plan: scope, stack, ownership, acceptance.
3. Verified evidence for facts; approved compositions for visual intent.
4. The assigned skill within its scope; official docs for API compatibility.
5. No silent stack change, new claim, reopened preference, or weaker quality gate.
6. Add a workflow only for a concrete responsibility gap and document its boundary.

Inactive: design-taste and other design-direction skills, image-to-code, Vercel
React best practices, web-design-guidelines, general GSAP workflows, Three.js fundamentals,
separate planning/incremental/TDD/review orchestrators, browser-testing-with-devtools.
The latter requires a separate MCP setup; use available browser tools and CI tests.

For the owner's continuous TestPulse transition request, gsap-scrolltrigger is
an implementation reference for scroll ranges, refresh, and cleanup only.
Impeccable still owns composition, choreography, acceptance, and documentation.
gsap-timeline and transitions-dev were inspected but remain inactive: the first
duplicates the selected reference, and the second targets component transitions.
No new animation library, motion-token system, or parallel design workflow.

## Technical contract

Astro, TypeScript, Tailwind CSS, React islands, React Three Fiber/Three.js, GSAP,
pnpm. Typed static content collections. No application backend or public API.
GSAP owns DOM/scroll timelines; React Three Fiber owns rendering and scene lifecycle.
Exchange progress values without competing over animated properties.

Graphite surfaces, bright type, amber lighting, original layered inspection art,
varied editorial layouts. Interactive desktop 3D; complete lightweight mobile,
reduced-motion, JavaScript-disabled, and unsupported-WebGL alternatives.

Routes: /, /work, /work/testpulse, /work/caldiy, /work/llm-evaluation, /resume.pdf,
and a useful 404 page. Preserve legacy numeric project links, section bookmarks,
and search-verification assets.

Homepage: introduction/resume; attributed production scope; selected projects;
professional experience; testing approach; portrait/credentials; direct contact.
Case studies: problem, tested scope, contribution, decisions, results, evidence,
and limitations. Preserve the evidence boundaries in PRODUCT.md.

## Delivery sequence

1. Setup isolated checkout and execution records.
2. Verify sources and prepare three case-study narratives.
3. Generate and select image concepts before UI implementation.
4. Static shell/hero, 3D and fallbacks, then complete content and metadata.
5. Type/lint/build/behavior/accessibility/performance checks and technical review.
6. Impeccable's bounded visual finish and completed design documentation.
7. Preview verification, production replacement, rollback reference, live smoke test.

## Acceptance

- Role, work, resume, and contact are readily accessible.
- Navigation, filters, resume, contact feedback, and legacy links work.
- Chromium, Firefox, WebKit; desktop, tablet, mobile.
- Keyboard, focus, contrast, zoom, reduced motion, no JavaScript, and WebGL failure.
- Zero serious or critical axe findings in the portfolio; WCAG 2.2 AA target.
- Median mobile Lighthouse performance >=90 over three production-build runs,
  LCP <2.5 seconds, CLS <0.1; inspect interactions after 3D activation too.
- Every visible factual claim has retained evidence and correct scope.
- Both review domains and objective acceptance pass before release.

One verification record represents the current source tree. Git/review workflows
reuse its results. Rerun affected checks and screenshots after changes.

## Accepted full-site extension, D-019

The owner accepted the D-018 opening and requested its motion character across
the homepage, archive, and case studies. Continue in the existing isolated
checkout and draft PR. Adopt the accepted opening on the preview root and keep
/experience as the focused study. Production is not replaced during this step.

Preserve the five-owner table. Impeccable owns this same-world motion extension.
Existing selected compositions and rasters are reused; no new concept tournament
or image generation is needed. Factual copy is unchanged. Case-study writing and
imagegen remain inactive unless a concrete content or asset gap appears.

Sequence: share and verify the opening; integrate the full homepage; implement
content-specific chapter motion, case entries/evidence/reading/navigation, and
archive continuity; run affected checks and current performance measurements;
complete the existing independent finish and source handoffs; document the built
system; validate the complete hosted preview. Reuse passing evidence for unchanged
source. Native CSS cross-document transitions are progressive navigation effects,
not another motion library or workflow.

## Owner feedback refinement, D-020

The owner's screenshots override D-019's staged visual verdict. Keep the accepted
opening, existing stack, and preview-only boundary. On 2026-10-26 the owner chose
the three-form material study at .impeccable/mocks/d020/material-family.png:
Cal.diy gate, paired LLM prisms, and archive fan. Imagegen supplies native-alpha
cutouts under Impeccable's direction. This is an extension of the approved
material world, not a second design workflow or replacement visual identity.

Focal motion: Cal.diy resolves concurrent attempts into one retained booking;
LLM brings paired measurement and the judge's bounded result into focus. Use
finite desktop sticky ranges when the complete content fits, lighter native
scroll relationships on compact or enlarged layouts, and still alternatives.
Entry materials finish with visible edges before reading panels and archive
rows. Every featured project states its name and QA purpose immediately.

Budget: transform existing static cutouts, keep prose and links available, decode
nearby imagery ahead of entry, and load the separate WebGL study only after the
visitor requests it. A small bounded readiness handoff may acknowledge actual
critical-resource preparation. It must not impose a fixed delay or claim that a
loader solves rendering cost. Compare retained startup and scroll profiles.

A fresh visual review owns the six listed material fixes in
 docs/experience/d020-owner-feedback-review.md. Complete affected browser,
accessibility and performance checks, source review, a verdict against the fixes,
and the final design record before handing over the updated hosted preview.

## Final release review responsibility

The owner requested a dedicated code-security review on 2026-10-27. Codex
Security owns this bounded vulnerability assessment and its durable report.
The technical source reviewer consumes its disposition and owns correctness,
architecture, maintainability, and lifecycle review. It does not run a second
vulnerability audit. Existing Impeccable visual ownership and the shared
verification record remain unchanged. This does not activate another planning,
design, testing, or release workflow.
