# Verification record

## Experience prototype: current comparison snapshot

The owner selected B: Pass Through on 2026-10-23. Application source a697113
and test configuration 8125cf0 implement the isolated /experience route on
codex/qa-portfolio. The homepage and production are unchanged. Type checking
passes for 36 files with zero diagnostics; lint and the twenty-page static build
pass. Existing optional renderer chunk warnings remain visible.

The rebuilt route's first full local matrix records 47 passed checks, six
inapplicable desktop-only skips, and one WebKit desktop timeout in the driver's
scroll-into-view command. All nine new axe/reflow cases pass, with zero serious
or critical findings. The trace shows that the CTA had already passed visible,
enabled, and stable checks; no click was dispatched. A separate diagnostic finds
responsive JavaScript, a fully visible hit-testable anchor, and working native
pointer navigation before scene readiness. It does not establish a definitive
application cause for the intermittent inspector stall.

The corrected test requires full viewport visibility and click({ scroll: 'none' }).
This pinned Playwright option retains normal actionability and hit-target checks.
It changes the driver step, not the site's behavior or the assertion. The final
affected matrix records 12 passed checks, six inapplicable skips, and zero failures:
native scrolling in all nine configurations, plus actual rendering, idle rest,
zero console/page errors, and context-loss recovery in all three desktop engines.
The other 36 green checks are unchanged. Together these cover all 48 applicable
prototype checks without retries. The hosted PR pipeline will run the complete
application matrix and all eighteen mobile Lighthouse runs; results are pending.

Initial focused checks also exposed a real desktop deep-link failure during
inherited smooth fragment scrolling. Immediate native anchors on this route fix
it. The first reading-position test incorrectly assumed the timeline was onscreen
at the section bookmark; it now enters that timeline before changing preferences.
A test closure was corrected to pass its expected position into the browser.
Failure traces are retained in test-results/experience-initial,
experience-corrected, experience-matrix, and experience-rebuild-matrix. No retry,
skip, or threshold was added to suppress a failing applicable behavior.

One local type/build attempt collided on Astro's generated temporary file because
both wrote it concurrently. Sequential type checking and building succeed. The
rebuild's initial unchecked-index type errors were resolved before the passing
final check. The two source materials compile into optimized WebP files; their
PNG sources and exact prompt sidecars are absent from dist. Provenance scan:
seven raster assets, zero missing metadata.

Visual acceptance remains open. Both independent full reviews have disposition
rebuild. The first found flat desktop materials, an unclear project opening, and
mobile action overlap. The focal rebuild added original chrome/reflection maps,
real gap geometry, lower transmission cost, and preserved readable HTML. The
second review resolves mobile clearance but still rejects the live desktop
materials, close enclosure, arrival caption, and navigation clearance. The static
94.2% comparison applies only to the still. It does not certify the live scene.
Both reports are retained as docs/experience/visual-review.initial.md and
visual-review.md. Current required captures/videos are under
.impeccable/review/experience; previous captures remain under .research.

The documentation handoff records the actual prototype in
docs/experience/design-record.md and preserves canonical DESIGN.md and
.impeccable/design.json. This snapshot is for a hosted comparison. It is not ready
for integration or production. A further material strategy requires the owner's
decision after the second rebuild verdict, as required by Impeccable.

## Experience study: evidence checkpoint

On 2026-10-23 the owner authorized a storyboard and isolated motion prototype.
The desktop/mobile storyboard, three opening concepts, and a supporting mobile
comparison are prepared in docs/experience and .impeccable/mocks/experience.
All four generated PNGs have exact prompt sidecars and embedded provenance.
The concepts were inspected; their image-generated text is a visual reference,
not production UI or evidence of working motion. The owner subsequently selected B.

The live public TestPulse index and all thirteen suite summaries were inspected.
The selected caldiy-api-v2 booking-lifecycle observations were rechecked against
the exact public JSON. Three dated Passed/Failed/Passed observations share commit
5c0869a1ddaf9aedc8f05d3d0cccc8c7b4dcc3a2, with unknown retry counts. The
payload digest and source are retained in docs/experience/testpulse-evidence.json.
The 50-run metrics window and 81-observation detailed timeline remain distinct.

This earlier checkpoint changed no application code, dependencies, build settings,
or deployment configuration. The production checks below remain historical
evidence for the unchanged public homepage. Production replacement is outside
the selected prototype's scope.

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
docs/technical-review.md. The profile update is published as commit
d9b50823bac4901fa9d7ea1a71f7efd42a54fc11 in Mohanad49/Mohanad49. Its README
Git blob is e3ac39496684978d7ab8a501343450bc8ede34e5. The eBay repository is
unchanged; only its curated archive/profile listings were removed.

Hosted run https://github.com/Mohanad49/Portfolio/actions/runs/39966751784
passed at PR head df538af65df788ac52ba666a8ab08ceeda4a62ce. It records 124
passed browser checks, twelve inapplicable desktop-only skips, zero failures,
zero flaky results, and no retries. All 54 axe scans have zero serious or critical
findings. Type checks, lint, build, and all fifteen mobile Lighthouse runs pass.
Artifacts and exact values are retained in .research/owner-feedback-ci-artifacts
and .research/owner-feedback-ci-summary.json.

| Route | Runs | Median performance | Median LCP | Median CLS |
| --- | --- | --- | --- | --- |
| / | 3 | 99 | 1.590 s | 0.000563 |
| /work | 3 | 100 | 1.357 s | 0.000753 |
| /work/testpulse | 3 | 100 | 1.356 s | 0.017927 |
| /work/caldiy | 3 | 100 | 1.358 s | 0.000800 |
| /work/llm-evaluation | 3 | 100 | 1.356 s | 0.000774 |

These are mobile production-build lab measurements, not field Core Web Vitals
or certification on the owner's physical iPhone. Authenticated preview deployment
7280247522 serves https://portfolio-cnaxr54xj-mohanad49s-projects.vercel.app.
Its metrics, graduation label, six-framework archive, and Web/All filter transitions
were checked in the existing signed-in browser session. The bounded independent
visual review has disposition ship, with no blocking finding. Its eight captures,
motion recordings, and explicit emulation limit are recorded in docs/visual-review.md.

PR 3 merged as 0f5638d898249ee02cbb02c5546d607f5aa8902c at 14:19:59 UTC on
2026-10-23. Its Git tree d0761026727d84a89423cb1ca0257f60b3ba2d9a exactly
matches the tested PR head. Production deployment 7280563239 succeeded at
14:20:19 UTC. Its immutable URL is
https://portfolio-it7q4fh5n-mohanad49s-projects.vercel.app, and the public alias
https://myehia.vercel.app serves the update.

All 23 live HTTP checks pass, including the new metrics and graduation label,
six-framework archive, thirteen exact redirects, security/metadata/search assets,
404, and the current PDF digest with the descriptive attachment filename. The
targeted public Chromium desktop/mobile suite passes ten applicable checks with
two inapplicable desktop-only skips, zero failures, zero flaky results, and no
retries. It covers routes/images/contact, filters, exact downloads, visible reveals
and live motion preferences, desktop scene controls, and legacy bookmarks.
Results are retained in .research/owner-feedback-live-http.json and
.research/owner-feedback-live-browser.json. Final public desktop/mobile metrics
captures are .research/owner-feedback/live-{desktop,mobile}-metrics.png.

The final audit commit changes only this record, the release/checklist records,
and the independent visual report. It does not change application source, assets,
tests, dependencies, build settings, or deployment configuration. These verified
results remain the shared acceptance evidence for the unchanged application tree.

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
