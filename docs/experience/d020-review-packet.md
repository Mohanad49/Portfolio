# D-020 listed-fix verdict packet

Request: score the six material fixes in d020-owner-feedback-review.md. This is
the verdict pass after that fresh full review, not another whole-surface review.
Application: abe295742909c1f1a3110daf404d2f5d19b66523. No production change.

The owner approved the gate for Cal.diy, paired prisms for LLM evaluation, and
fan for the archive. Their approved study is
.impeccable/mocks/d020/material-family.png. Exact prompts and asset provenance
are in .impeccable/assets and assets/plates. The scan reports eight shipping
rasters and zero missing provenance. The accepted opening stays fixed.

## Evidence and validity

The required capture list is every row in
.impeccable/review/d020/capture-manifest.json: 52 valid captures and three
normal-speed native-wheel recordings. The build thread opened every still
once, confirmed its named surface/state, and found no blank or half-loaded
capture. Long full-document and zoom thumbnails establish document completeness;
section frames and Range-fragment tests establish readable bounds. Viewport
begin/middle/settled shots intentionally retain their actual scroll position.
Element shots named complete show the whole element, not a promised final pose.

The 38 settled captures from de818d4 remain source-equivalent for visual intent:
the subsequent font-preparation fix changes script loading dependencies only.
No markup, CSS, raster, or settled GSAP choreography changed. Fourteen explicitly
tagged current-source captures replace startup timing and add production/case/
archive temporal evidence. The manifest retains both source fingerprints and
per-row commits. The invalid initial Approach capture stays in d020-initial
and is not acceptance evidence. The final desktop Approach capture contains
all four steps.

Required desktop and compact states include five complete routes, both opening
viewports, Cal.diy and LLM beginning/middle/settled/complete components,
Approach/About, three 320px/200% documents, and three 1680px owner-junction
comparisons. The owner's screenshot width is inferred from the attached raster,
not claimed as a measured physical viewport. Actual in-app browser inspection
uses its reported viewport. No physical iPhone or GPU certification is claimed.

## Six-fix map

| Prior fix | Current evidence |
| --- | --- |
| Complete edges at three junctions | user-1680-home-caldiy, user-1680-case-caldiy, user-1680-archive; compact full documents; current-case-caldiy and current-archive sequences. Complete forms reserve normal-flow space before reading surfaces. |
| Distinct silhouettes and negative spaces | Approved material family; Cal.diy gate, LLM paired prisms, archive fan. TestPulse alone retains its original pair and opening; closing uses a subordinate fan. |
| Immediate QA recognition | Durable project names, plain QA labels and summaries in homepage, archive, and cases; TestPulse explicitly introduces a QA reporting tool. Pinned scope, red audit findings, and judge gate exclusion remain. |
| Authored finite relationships | Desktop/mobile native-wheel videos and project frames show twenty attempts resolving to one booking and converging prisms beside 82%/45 labels and caveat. Current third video covers production trace, both case entrances, archive landing. Prose stays steady. |
| Original bounded startup | Current desktop-startup-preparing/ready and all first-run/cache/interaction/reduced tests. Actual critical preparation, 1600ms ceiling, no minimum wait, no percentage, no optional-renderer dependency. |
| Felt motion and measured stalls | Three normal-speed recordings, current-source timing report, explicit optional 3D launch. Controlled homepage maximum frame gap falls from 2099.8ms to 33.4ms in the sampled windows. Earlier 50ms case outlier remains disclosed. No broad physical-device claim. |

Read docs/experience/d020-motion-performance.md for method and limits. Raw
performance-before.json, performance-after-final.json, and
performance-after-fonts.json live under .research/d020. The profile ran alone,
with no competing browser capture/test process. Native scrolling remains.

## Current technical evidence, separate owner

Workflow 40251633738 passes at abe2957: 298 registered checks, 286 passed,
12 established applicability skips, zero failures, flaky results, or runner
errors. Eighteen mobile Lighthouse runs retain performance medians 98 home and
99 on the other five measured routes; each route's median LCP is below 2.5s and
CLS below 0.1. Accessibility is 100. Normal and reduced-motion axe checks retain
zero serious or critical portfolio findings. The source review is performed in
the build thread, not claimed independent. The visual verdict remains yours.

The detector ran once: 112 advisories, zero blocking findings. Its retained
JSON is .research/d020/detector.json. Intentional fluid type, local diagram
colors, and material treatments go to the documenter. Do not rerun the detector.

Direction and constraints: PRODUCT.md, DESIGN.md, docs/briefs/experience.md,
docs/briefs/home.md, docs/briefs/archive.md, and docs/briefs/case-studies.md.
The original accepted opening comp and diff evidence are unchanged and remain
referenced by the initial full review. No new QUALITY BAR card was introduced.
Craft floor: installed Impeccable reference/craft-floor.md.

Write the scored disposition and all six resolved/partial/unresolved statuses
to docs/experience/d020-finish-verdict.md only. No application edit, browser,
new design direction, tests, deployment, or new aesthetic search. Report ship
only at the actual listed-fix scope if all six are resolved.
