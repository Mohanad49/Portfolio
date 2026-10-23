# Verification record

## Current source

Owner-feedback application source: 5387919, including the content increment b0e89e6.
The current PDF SHA-256 is
683ede439d00f58b2323c78629635ea674558fee1f5e1cce9d7132d7ae47735d.
It is an exact copy of the owner's existing local PDF; the original Word/PDF files
were already current and are unchanged. Both resume pages were rendered and viewed.

Type checks, lint, and the nineteen-page production build pass. The first affected
matrix passed 27 checks for filters, downloads, and visible motion. Technical review
then found completed reveals could replay after breakpoint/preference changes.
The fix preserves completed targets in a WeakSet. Its strengthened nine-project
motion matrix passes in Chromium, Firefox, and WebKit at desktop, tablet, and mobile
sizes. Reports are .research/owner-feedback-focused.json and
.research/owner-feedback-motion-verification.json. No retries were enabled.

One batched desktop/mobile inspection covers metrics, the graduation label, and
the six-framework archive. Real motion samples and videos are retained under
.research/owner-feedback. The mobile capture records zero Canvas requests and a
complete reveal to opacity 1; desktop also completes after its sampled interval.
The updated source and GitHub profile copy are independently approved in
docs/technical-review.md. Visual finish, hosted acceptance, and live publication
verification for this increment remain pending.

The remaining sections retain the original release's dated evidence, including
its previous PDF identity and seven-framework count. They are historical results.

## Previous release source

Verified release head: 398525e5c1bd0f69c1719dc6880fff9426557233. The production
merge b5c5cb860b42d6048b57e2492c02b113701f7c89 has the identical Git tree
fb4a0c20ac8a90bf6dd1d424e4773dafdbca40cc. Application source includes a2c56c2
and deployment configuration includes f55bfd4. The final record-only commit changes
no application, asset, test, dependency, build, or deployment configuration. The
original checkout is unchanged.
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
| Technical source review | Commit 9355bab and narrow material, CI, header, and activation follow-ups | Approved; blocking findings resolved |
| Transmission material | Final scene in all three desktop engines | Input, reset, live preferences, real context loss pass; no console or page errors |
| Mobile Lighthouse | Three production-build runs per main route | Latest hosted median 100 on all five routes; all thresholds passed |
| Hosted Ubuntu matrix | Three engines, three viewport sizes, actual software WebGL2 | 115 passed, 12 inapplicable desktop-only skips, 0 failures, 0 retries |
| Hosted performance | Fifteen mobile production-build runs | All median performance, LCP, and CLS gates passed |
| Hosted preview | Retained previews, latest deployment 7267058226 | Routes, filters/reload, metadata, 404, legacy links, exact resume, Contact transit, and scene controls verified |
| Public production | Vercel deployment 7267170763 | 23 HTTP checks and 8 applicable live browser checks passed |
| Design documentation | DESIGN.md and .impeccable/design.json | Actual tokens, ten component previews, sidecar schema and CSS validated |

| Route | Median performance | Median LCP | Median CLS |
| --- | --- | --- | --- |
| / | 99 | 1.597 s | 0 |
| /work | 100 | 1.508 s | 0.000124 |
| /work/testpulse | 100 | 1.511 s | 0.014464 |
| /work/caldiy | 100 | 1.514 s | 0 |
| /work/llm-evaluation | 100 | 1.510 s | 0 |

These are local mobile lab measurements, not field Core Web Vitals. All fifteen
runs are retained in .lighthouseci/ and .research/mobile-performance.json.

Hosted run: https://github.com/Mohanad49/Portfolio/actions/runs/39873648429.
Its median scores are also 99 for home and 100 for the other four routes; median
LCP spans 1.356 to 1.584 seconds and median CLS stays below 0.018. Hosted artifacts
are retained in .research/ci-accepted-artifacts and summarized in
.research/ci-accepted-summary.json. The first Ubuntu Firefox failure is resolved
by actual rendering under the virtual display, with assertions unchanged.

Authenticated preview: https://portfolio-lq7mlbe83-mohanad49s-projects.vercel.app.
The downloaded preview resume matches the supplied PDF hash above.

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
See docs/visual-review.md. The extracted design system and its sidecar are complete;
the Impeccable build-phase finish is recorded as ship, with no forced gates.
Live design hooks ran on edited files. Their colored-shadow finding was fixed by
removing that shadow. No rule suppressions were added and no duplicate detector
run was performed.

## Production follow-up

The complete pre-release head baa1b95 passed hosted run
https://github.com/Mohanad49/Portfolio/actions/runs/39874771959:
115 browser checks passed, twelve inapplicable desktop-only skips, no failures,
no flaky results, and all fifteen mobile Lighthouse runs passed. Its five median
scores are 99, 100, 100, 100, and 100; LCP spans 1.356 to 1.586 seconds and CLS is
below 0.018. Artifacts and the parsed summary remain in .research/release-artifacts
and .research/release-summary.json.

PR 1 merged as 9f1e9fb and Vercel production deployment 7266800739 replaced the
public alias. The initial live HTTP smoke passed all 23 checks. Desktop/mobile
browser smoke passed routes, content, images, and archive filters, but failed both
strict resume filename checks. Vercel's default inline header named the correct
PDF resume.pdf. The explicit response header is independently source-approved;
authenticated preview deployment 7266858801 downloads the descriptive filename
and its bytes match the supplied SHA-256 digest.

The follow-up CI run 39876869771 passed 114 browser checks, skipped twelve
inapplicable cases, and failed the unchanged desktop Chromium legacy Contact
bookmark assertion. It remains a failed run. The trace and 90-frame capture
identified transient renderer startup while smooth scrolling passes Approach.
The activation fix avoids that startup without changing the assertion or global
scrolling. Local before/after captures reach scrollY 5727; renderer requests fall
from one to zero and canvas frames from fifteen to zero. The affected suite then
passed all thirteen checks across Chromium, Firefox, and WebKit, covering strict
bookmarks, real interaction, live preferences, actual context loss, WebGL failure,
and real Chromium history restoration. Type checks, lint, and build also pass.
Retained evidence: .research/bookmark-transit-before.json,
.research/bookmark-transit-after.json, .research/scene-entry-browser-verification.json,
and .research/resume-fix-ci-artifacts. Both narrow source deltas are approved in
docs/technical-review.md. The scene's materials and visual composition are unchanged.

## Release outcome

All required gates are complete. Final hosted run
https://github.com/Mohanad49/Portfolio/actions/runs/39878256527 passed 115 checks,
with twelve inapplicable desktop-only skips, zero unexpected failures, zero flaky
results, and no retries. All fifteen mobile Lighthouse runs passed. Each of the
five routes has a median performance score of 100, median LCP ranges from 1.356 to
1.584 seconds, and the largest median CLS is 0.017927. These are production-build
lab measurements, not field Core Web Vitals or physical-device certification.
The artifacts are in .research/final-followup-artifacts; parsed values are in
.research/final-followup-summary.json.

Authenticated preview 7267058226 confirmed Contact in the viewport with no canvas,
then settled Approach activation, keyboard adjustment, and reset. One initial
browser inspection command timed out during cold scene initialization; the
subsequent state and controls passed. The approved composition and material
values remain unchanged. No new aesthetic review was opened.

PR 2 merged as b5c5cb8. Production deployment 7267170763 succeeded at
2026-10-23 00:36:31 UTC and serves https://myehia.vercel.app. All 23 public HTTP
checks passed, including thirteen permanent redirects, canonical metadata,
security headers, 404, search assets, and the exact PDF with its explicit
descriptive attachment filename. Final public Chromium desktop/mobile smoke
passed eight applicable checks and skipped two desktop-only cases on mobile.
It covers routes, images, direct contact, archive filtering and reload, strict
resume bytes and filename, legacy bookmarks, real scene input, preference
transitions, and actual context-loss fallback. Retained records are
.research/live-http.json and .research/live-browser-verification.json, with final
public captures in .research/live-desktop.png and .research/live-mobile.png.
The previous production source and immutable deployment remain recoverable;
see docs/release.md.

The deferred 3D chunk exceeds Vite's general 500 kB warning. The warning threshold
was not raised. Its mobile request exclusion and deferred desktop behavior passed
browser network assertions. The local mobile performance gate passed independently.
Local reports are under test-results/,
playwright-report/, .impeccable/review/, and .research/; they are not served by the app.
