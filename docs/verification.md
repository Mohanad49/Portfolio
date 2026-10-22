# Verification record

## Current source

Application: commit 00a2a63 on codex/qa-portfolio, plus the reviewed CI-only graphics
configuration. The original checkout is unchanged.
The static production build is served locally on 127.0.0.1:4173.
This is the shared record for Git, visual review, and technical review.

## Completed verification

| Check | Scope | Result |
| --- | --- | --- |
| Type check | 30 authored source/configuration files | 0 errors, 0 warnings, 0 hints |
| ESLint | Authored source, configuration, and tests | Passed |
| Build | Main pages, 404, thirteen legacy pages, sitemap | 19 pages generated successfully |
| Peer compatibility | Pinned dependency graph | No peer dependency issues |
| Production advisories | pnpm audit --prod, retained local JSON | 0 vulnerabilities across all severities |
| Resume fidelity | Supplied PDF and public/resume.pdf | SHA-256 1053c4a9375885e7a248291bb2f76b4c93f348d9618f6422da8d8333f2208aee |
| Case-study evidence | Three public flagship repositories | Exact source commits retained in docs/evidence.md |
| Framework descriptions | Seven framework READMEs | Verified against retained source excerpts |
| Initial hero comparison | Semantic UI versus selected B composition | 90 percent match |
| Responsive gate | 1440px desktop capture versus composition | 91 percent match |
| Visual captures | Home at 390, 834, 1280, 1440, 1536, 1600px; work and cases on desktop/mobile; 404; real 3D | Captured, opened, and validated in two builder rounds |
| Raster provenance | Two generated plates and existing portrait source | 3 rasters, 0 missing provenance |
| Accessibility | Six routes, three engines, three viewport sizes | 54 scans, zero serious or critical axe findings |
| Static fallbacks | Reduced motion, no JavaScript, unavailable WebGL | Content and links retained; displayed fallback images decode |
| Keyboard | Chromium/Firefox Tab; macOS WebKit Option-Tab | Skip link and visible focus verified |
| Bundle requests | Normal mobile/tablet and all reduced-motion states | No React renderer, island, or Canvas module requested |
| Desktop Canvas deferral | Chromium, Firefox, WebKit | Canvas module absent at the top, requested near Approach |
| Technical source review | Commit 9355bab, five review axes | Approved; four findings resolved |
| Transmission material | Final scene in all three desktop engines | Input, reset, live preferences, real context loss pass; no console or page errors |
| Mobile Lighthouse | Three production-build runs per main route | Home median 99; other four routes 100; all thresholds passed |

| Route | Median performance | Median LCP | Median CLS |
| --- | --- | --- | --- |
| / | 99 | 1.597 s | 0 |
| /work | 100 | 1.508 s | 0.000124 |
| /work/testpulse | 100 | 1.511 s | 0.014464 |
| /work/caldiy | 100 | 1.514 s | 0 |
| /work/llm-evaluation | 100 | 1.510 s | 0 |

These are local mobile lab measurements, not field Core Web Vitals. All fifteen
runs are retained in .lighthouseci/ and .research/mobile-performance.json.

The first full browser run executed 114 tests: 110 passed and four failed. The
scrollable-table accessibility issue from the preceding Chromium run was already
fixed. The four matrix failures concerned macOS WebKit's link-navigation shortcut
and an unpainted image behind an active replacement canvas. The corrected WebKit
checks passed, including image decoding in displayed fallback states.

A live preference-transition test exposed ScrollTrigger cleanup resetting the
document's reading position. The fixed path passed in all three desktop engines,
including actual GPU context loss and recovery to a decoded static fallback.

The subsequent full matrix passed 113 checks, skipped 12 inapplicable desktop-only
cases, and failed one Chromium initial-fragment check. Initial motion setup was
interrupting native fragment scrolling. Source review also found a contradictory
filter/hash state on reload, BFCache cleanup, and ineffective JSON-LD escaping.
All four causes were fixed. The affected matrix passed 16 checks, with 12
inapplicable skips and no failures. A stronger actual Chromium BFCache regression
then passed separately, verifying that restored motion responds to scrolling and
live preferences. Retained summaries are .research/affected-matrix.json and
.research/history-verification.json. No failed check was relabelled or retried.

## Visual review status

The builder completed its first inspection and one confirmation round. Its two
material fixes were a readable mobile strategy comparison and clearer 3D lighting.
The independent Impeccable review accepted the first viewport, responsive layouts,
archive, case studies, and metadata cleanup. The owner authorized one additional
focused material pass. The resulting transparent amber overlap, dark chrome, and
graphite field were accepted. Both visual findings are resolved, disposition ship.
See docs/visual-review.md. Final design documentation is being completed.
Live design hooks ran on edited files. Their colored-shadow finding was fixed by
removing that shadow. No rule suppressions were added and no duplicate detector
run was performed.

## Remaining release gates

- Pass hosted Ubuntu verification with the corrected Firefox graphics environment.
- Completed DESIGN.md and .impeccable/design.json.
- Hosted preview validation, production replacement, and live smoke verification.

The deferred 3D chunk exceeds Vite's general 500 kB warning. The warning threshold
was not raised. Its mobile request exclusion and deferred desktop behavior passed
browser network assertions. The local mobile performance gate passed independently.
Local reports are under test-results/,
playwright-report/, .impeccable/review/, and .research/; they are not served by the app.
