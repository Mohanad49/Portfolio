# Verification record

## Final pre-production review, D-021, 2026-10-28

Production is unchanged. The replacement remains on `dev/qa-portfolio` in
[draft PR 5](https://github.com/Mohanad49/Portfolio/pull/5). The locked branch
`backup/production-2026-10-27` retains production commit
`40a24f16ec037658fb13d5509dd1ba59573f480a`, together with its retained Vercel
deployment. No merge, production promotion, or hostname change is authorized.

Current application and verification source is
`c9dead34c01761c1806609cf5057c6a60cd4837a`. This includes the final page-exit
correction and its regression. Configuration follow-up `1202397` assigns Firefox
content checks to its default headless profile and retains the existing WebGL
check in a separate headed profile. All 105 Windows family/title pairs remain
present exactly once. The accepted active-page composition, assets,
copy, and timelines remain identical to `17d6260`; only discarded-document
cleanup and checkpoint timing changed afterward. The final documentation-only
revision preserves that application, dependency, build, and verification
configuration. Required current-head checks remain visible in the PR and are
enforced before merge.

[Full workflow 40671248714](https://github.com/Mohanad49/Portfolio/actions/runs/40671248714)
passes at `1202397458cb06ef40356d726a0b128e4b8b8156`.
Frozen installation, type checking across 43 files, ESLint, and the twenty-page
production build pass. The optional renderer's existing chunk-size warning is
retained; the scene is explicitly requested and does not block the first paint.

- Linux: 318 registrations, 306 passes, 12 established applicability skips, zero
  unexpected failures, flaky results, retries, or runner errors. Chromium,
  Firefox, and WebKit run at desktop, tablet, and mobile sizes. The skips retain
  the desktop renderer and once-per-engine legacy-redirect scope.
- Windows: all 105 applicable checks pass, with zero skips, failures, flaky
  results, retries, or runner errors. Chrome and Edge pass 35 checks each;
  Firefox's complementary profiles pass 34 content checks and the one headed
  renderer check. Real context teardown now completes in both profiles.
- Normal/reduced-motion portfolio axe checks pass with zero serious or critical
  findings. The external Cal.diy project's two recorded findings remain visible.
- All eighteen production-build mobile Lighthouse measurements pass the original
  three-run median gates. Every measurement has accessibility score 100.

| Route | Runs | Median performance | Median LCP | Median CLS | Accessibility |
| --- | ---: | ---: | ---: | ---: | ---: |
| / | 3 | 98 | 2.310s | 0.000000 | 100 |
| /work/ | 3 | 100 | 1.807s | 0.000000 | 100 |
| /work/testpulse/ | 3 | 98 | 2.339s | 0.000000 | 100 |
| /work/caldiy/ | 3 | 98 | 2.263s | 0.000000 | 100 |
| /work/llm-evaluation/ | 3 | 99 | 1.959s | 0.000000 | 100 |
| /experience/ | 3 | 99 | 2.205s | 0.000000 | 100 |

The exact reports are retained locally under `.research/final-readiness/ci-120/`
and in that workflow's Linux and Windows artifacts. The final documentation-only
head changes none of the verified application, assets, dependency graph, tests,
build configuration, or CI configuration. Its required checks must also finish
successfully before release. This record does not authorize a deployment.


### What changed during readiness review

- Added actual Windows CI coverage in stable Chrome, Edge, and Firefox. pnpm's
  shell emulator supports the existing scripts without another runtime package.
- Kept first-paint styles in the HTML and preloaded the two self-hosted fonts.
  Mobile opening cutouts prefer AVIF with retained WebP fallbacks; desktop
  artwork, source rasters, copy, layout, and motion timelines are unchanged.
- Deferred later homepage motion until its evidence sequence approaches within
  1.5 viewport heights. This also handles direct fragments and fast/restored
  scroll positions. Temporary listeners and frames are disposed on exit. It
  does not add a minimum loader delay, replace native scrolling, or detect tests.
- Preserved fresh legacy bookmarks and native reading positions through layout
  setup. Checkpoints save after scrolling and before link navigation, without
  writing history during page exit. Discarded pages stop their animation contexts
  without full context style restoration; cached pages retain their existing state. Reload/Back checkpoint validation and stale-traversal cancellation keep
  the original strict assertions. Reduced motion and static content stay complete.
- Patched published compatible Lighthouse-tool dependencies. Production audit has
  zero advisories; the complete development audit retains one moderate and four
  high advisories. Their actual configured reachability is documented in
  [dependency review](dependency-review.md), without suppression or unsafe major
  version overrides. The advisory results were refreshed on 2026-10-28.

The final exit/history regression passes all 21 registrations, including real
reload/Back checks and an explicit no-history-write-on-exit assertion.
The focused chapter checks pass all 36 registrations across the nine engine/size
configurations. The remaining live-preference regression passes all nine after
activating the demand-loaded scenes. Neither has retries, skips, or failures.
The affected initial-bookmark/reflow/module-order checks previously passed 21
registrations with six established desktop-scope skips. These are supporting
checks, not additional counts to add to the complete CI matrix.

The three focused production-build homepage measurements at the final runtime
have performance scores 96, 97, 97 and LCP values 2411.866, 2369.969, 2357.832 ms.
Median performance is 97, median LCP 2.370 seconds, and CLS is zero. The complete
CI measurements above own acceptance for all routes.

### Independent reviews and hosted preview

[Technical source review](technical-review.md) approves the reviewed correctness,
architecture, maintainability, compatibility, and resource-handling scope without
unresolved blocking findings. The sealed
[security review](security-review.md) reports no established source vulnerability,
retains its original revision and binary exclusions, and distinguishes the later
parent-reviewed changes. It is not a guarantee against undiscovered issues.

The independent [visual verdict](experience/final-readiness-visual-review.md)
returns `ship`. It inspected 22 desktop/mobile captures covering all routes and
normal-motion homepage states, followed by eight refreshed affected states at
`17d6260`. Complete gate, prism, and fan silhouettes, readable QA descriptions,
quiet case prose, and the accepted opening remain intact. The
[design record](experience/final-readiness-design-record.md) preserves the
canonical tokens and previews while recording these functional changes.

The exact-runtime hosted preview is
[deployment 7379690577](https://portfolio-exudh3l8r-mohanad49s-projects.vercel.app),
verified successful in the Preview environment. Actual browser inspection at
1440x1000 and 390x844 confirms the desktop About bookmark, mobile opening, single
TestPulse arrival with the hero hidden, Cal.diy case navigation, complete material
junction, retained red results, and no captured browser errors. Earlier unchanged
archive filter/reload and case-table-of-contents checks retain their scope.
The hosted resume has the descriptive filename and SHA-256
`683ede439d00f58b2323c78629635ea674558fee1f5e1cce9d7132d7ae47735d`,
identical to the checked-in PDF. The documentation-only preview receives a final
smoke check without downloading that unchanged asset again.

This is automated engine coverage, actual Windows CI execution, viewport-based
hosted inspection, and independent still-image review. It does not certify every
physical iPhone or Windows GPU, corporate browser policy, assistive technology,
network condition, continuous animation frame rate, or intermediate visual pose.
The owner's separate desktop/mobile acceptance remains retained context.

### Repository, safeguards, and cleanup

- `main` requires an up-to-date PR, resolved conversations, and `verify`,
  `windows`, and `Vercel` checks bound to their verified GitHub Actions/Vercel apps.
  Administrator enforcement is enabled, with force pushes and deletion blocked.
  The production backup is additionally locked at the saved commit. Zero required
  approvals avoids requiring an unavailable second maintainer; it does not remove
  the PR or objective-check requirements.
- The branch is renamed locally and remotely to `dev/qa-portfolio`. GitHub closed
  PR 4 during that rename; PR 5 preserves its link and source history and stays
  draft and unmerged. Production still serves the prior deployment.
- About, homepage, topics, the QA-focused README, and the existing MIT license
  were checked. Font notices and dependency-specific licenses remain retained.
  `DECISIONS.md` is rewritten in the owner's first-person voice.
- Removed only the unused legacy Firestore reader, duplicate root verification
  file, and seven unreferenced certificate copies. The served verification file,
  active credential assets, original portrait path, exact resume, thirteen legacy
  project redirects, section bookmarks, and historical recovery records remain.
- Generated output, test reports, captures, research, and `.env` variants are
  ignored. No new runtime secret, backend, public API, or deployment project exists.

### Failures retained rather than relabeled

The earlier D-020 application passed run 40251633738. Its subsequent document-only
head's run 40256504364 crossed the homepage LCP limit, demonstrating why an older
green result was not accepted as current proof. Later intermediate runs remain
in `.research/final-readiness/` with their exact source identities:

- `40465817776`: Windows 99 passes; Linux had a Firefox mobile evidence-bookmark
  failure. The final initial-bookmark correction and history work address it.
- `40573869429`: Windows 105 passes; Linux 304 passes, 12 skips, and one WebKit
  desktop About-bookmark failure, addressed by first-layout landmark preservation.
- `40579225055`: Windows 105 passes; Linux 204 passes, eight skips, and 105 Firefox
  launch failures from container-home ownership. Nonrecursive ownership alignment
  fixed the ephemeral directory without overriding `HOME` or adding privileges.
- `40649828524`: superseded and cancelled, not a completed acceptance run.
- `40650647916`: Linux 296 passes, 12 skips, and nine instances of one reveal
  fixture expecting eager chapter setup. The fixture now approaches the evidence
  before its unchanged visibility and live-preference assertions.
- `40651798704`: Linux 305 passes, 12 skips, and all eighteen Lighthouse gates
  passed. Windows had 103 passes and two overlapping Firefox failures, one during
  context shutdown and one stalled scroll animation. Their traces remain
  retained. The Windows config now isolates headed sessions with one worker, as
  recommended in [Playwright CI guidance](https://playwright.dev/docs/ci#workers).
  Serialization is a diagnostic correction; the final complete run supplies its
  result. No timeout was increased or failed assertion removed.
- `40654781949`: Linux passed again. Windows had 104 passes and one filter-test
  context-shutdown failure despite serial execution. Its trace retained the
  page-exit history call and GSAP style restoration. The final correction moves
  checkpoints before link activation, disposes their listeners before cleanup,
  and kills discarded-document animation contexts without reverting styles.
  Live resize/preference reconfiguration still reverts normally. The corrected
  regression explicitly checks one pre-navigation save and zero exit-time saves.
- `40669413721`: Linux passed the complete current application and performance
  gates. Windows had 104 passes and a teardown-only failure after the static
  reduced-motion assertions passed. That page does not load the GSAP modules;
  the source lifecycle correction is not represented as fixing the driver hang.
  Firefox content now uses the standard headless profile, with its one existing
  WebGL interaction check isolated in a headed profile. Registration comparison
  proves no check was removed or duplicated, and no assertion or timeout changed.
- The first local 18-measurement final run had homepage median LCP 2664.831 ms.
  A batched-layout-read experiment still failed at 2728.978 ms and was removed.
  The real deferred-preparation correction then passed the three measurements
  above. Earlier failed measurements and traces are retained as failed evidence.

No assertion threshold was relaxed. The final successful results do not relabel
these failures as flaky or convert cancelled runs into completed checks.

## Historical verification records

The records below retain their original source, date, and release scope. Their
use of "current" refers to those earlier checkpoints.

## Owner feedback refinement, D-020: current verification, 2026-10-26

The owner approved the gate, paired prisms, and fan material family. The working
application resolves the three clipped junctions, identifies each QA project,
adds finite project choreography, and makes the separate WebGL study opt-in.
The accepted opening retains its normal composition. First desktop preparation
is bounded at 1600ms, yields to interaction, skips repeat/history/reduced-motion
paths, and never waits for the optional 3D study.

Current application and verification source:
abe295742909c1f1a3110daf404d2f5d19b66523. Local evidence:

- Type checking across 41 files, ESLint, and the twenty-page build pass.
  The existing optional-renderer chunk warning remains visible.
- The affected Chromium desktop/mobile run has 46 passes, two established
  applicability skips, and zero failures or flaky results. Its retained report
  is .research/d020/affected-final.json.
- The subsequent affected motion and live-text-resize run has 18 passes with
  zero failures, skips, or flaky results, retained in
  .research/d020/live-resize-final.json. It verifies that oversized chapters
  return to normal flow and resume their fitting scenes after text is restored.
- All nine configurations pass the delayed-module regression at the current
  source, retained in .research/d020/module-race-final.json. The fixture waits
  for commit while holding its resource and always releases it in finally.
  Explicit shared preparation of the two critical fonts resolves WebKit's
  pending whole-font-set promise without weakening any range/growth assertion.
- Complete entry bounds, actual decoded images, named QA purposes, original
  evidence limits, startup deadline/cache/keyboard behavior, scene focus,
  reduced motion, no JavaScript, filters, downloads, and legacy navigation are
  covered by the applicable checks. Do not add overlapping local counts.
- Initial failures remain in .research/d020/affected-initial.json and its
  retained results. A variant/shape class collision and native scroll-anchoring
  correction were resolved. The intermediate enlarged-word failure and its
  measurements are retained; the same word-fragment check now passes.
- The mechanical detector reports advisory system-drift observations, with no
  blocking finding. Its exact JSON remains .research/d020/detector.json.
  The final design extraction must document intentional fluid type and local
  material/diagram treatments. No second detector or new design workflow.
- All eight shipping material rasters have embedded provenance. No dependency,
  evidence metric, resume byte, employer claim, or production release changed.

### Current full CI and performance

[Workflow 40251633738](https://github.com/Mohanad49/Portfolio/actions/runs/40251633738)
passes at abe2957. The retained artifact is .research/d020/ci-final, with the
derived .research/d020/ci-final-summary.json. There are 298 registrations:
286 passes, 12 established applicability skips, zero unexpected failures, flaky
results, retries, or runner errors. The skips are desktop-only renderer checks
and once-per-browser redirect checks on tablet/mobile. All nine browser/viewport
configurations retain normal and reduced-motion accessibility coverage across
six routes with zero serious or critical axe findings in the portfolio.

The first hosted run, 40249515832 at de818d4, had 283 passes, 12 skips, and
three WebKit delayed-module failures. Its traces remain in .research/d020/ci-first.
The font-state diagnostic and intermediate failing correction remain retained;
the final successful result does not erase them or relabel them flaky.

All eighteen production-build mobile Lighthouse runs pass the unchanged gates:

| Route | Runs | Median performance | Median LCP | Median CLS | Accessibility |
| --- | ---: | ---: | ---: | ---: | ---: |
| / | 3 | 98 | 2.269s | 0.000125 | 100 |
| /work/ | 3 | 99 | 1.955s | 0.000125 | 100 |
| /work/testpulse/ | 3 | 99 | 1.808s | 0.000180 | 100 |
| /work/caldiy/ | 3 | 99 | 2.108s | 0.031167 | 100 |
| /work/llm-evaluation/ | 3 | 99 | 1.957s | 0.000125 | 100 |
| /experience/ | 3 | 99 | 2.108s | 0.000125 | 100 |

The isolated desktop profile records the removed automatic renderer activation:
homepage maximum sampled frame gap changes from 2099.8ms to 33.4ms. Current
archive and Cal.diy samples also peak at 33.4ms. An earlier amended case sample
had a 50ms gap and remains disclosed. This is a software-WebGL lab comparison,
not physical-device certification or a universal 60fps claim. Method, real
readiness timing, byte tradeoffs, and raw reports are recorded in
[D-020 motion and performance](experience/d020-motion-performance.md).

### Visual evidence and hosted preview

The final confirmation manifest contains 52 validated stills and three
normal-speed native-wheel videos, with per-capture source commits and explicit
settled-source equivalence after the script-only font-preparation correction.
Current startup, production trace, both new case entrances, and archive motion
have current-source evidence. The build thread completed its one inspection,
correction batch, and final confirmation; no new aesthetic search is open.
The fresh reviewer scored all six listed material fixes resolved, with the
performance fix explicitly limited to the sampled scope: disposition ship.
The [verdict](experience/d020-finish-verdict.md) records all 52 stills opened
and all three recordings inspected as decoded frame sequences. It does not
claim real-time playback, a fresh whole-surface approval, physical-device
certification, or universal frame-rate behavior. The independent documenter
completed token-bearing DESIGN.md and .impeccable/design.json plus the
[D-020 design record](experience/d020-design-record.md). The build thread
confirmed schema version 2, eight canonical sections, all ten unchanged preview
component objects, and no application/test/asset/dependency/workflow delta from
abe2957. Existing preview drift is disclosed without changing those previews.

Preview deployment 7321691035 is Ready for the exact verified source:
[current preview](https://portfolio-detg2k6ub-mohanad49s-projects.vercel.app).
Authenticated in-app browser smoke uses the actual 1265x712 viewport. Native
wheel travel reaches the complete Cal.diy chapter, its case link opens the
correct QA study, continuation opens the LLM case, All work opens the archive,
and Web filtering displays two matching frameworks and survives reload at
?type=Web. No warning/error log was recorded in that smoke session. The valid
hosted chapter proof is .impeccable/review/d020/hosted-caldiy-settled.png.
The hosted Approach action prepares the optional study only after Inspect in
3D is selected, focuses Separate layers when ready, responds to Right from 22
to 23, and Use artwork restores the static image and launch focus. No error log
was recorded after that interaction.
The immediate fast-jump image and the screenshot taken during native page
transition are timing observations, not visual acceptance captures.

The dist text scan finds no local owner paths, Impeccable workspace paths,
generation-prompt markers, or imagegen tool names. No dependency, evidence
metric, resume byte, employer claim, or production deployment changed. The
D-019 results below are historical. Production remains
40a24f16ec037658fb13d5509dd1ba59573f480a.
GitHub's current Production deployment was rechecked as 7280653313 at that SHA.
The original Portfolio checkout remains clean.

D-020 is complete at the preview boundary. The final documentation commits
preserve the application and verification source above, so no duplicate runtime
check was manually rerun after the documentation handoff. The temporary local
Astro server on port 4187 was identified by PID and command before being stopped;
the hosted preview remains available for the owner.

## Full-site motion, D-019: historical checkpoint, 2026-10-25

Current application commit: d3e334ea22cbb3c7f9f4315bd182bb2c44c81b14.
Current verification-test commit: 9b9c03abeb289b2e34639e46f60409a4cc8684e2.
This promotes the accepted Pass Through opening onto the preview homepage and
extends its world across the remaining homepage, archive, three case studies,
and closing navigation. No factual source, dependency, or production deployment
is changed. The earlier D-018 records below are historical evidence.

Type checking covers 38 files with zero errors, warnings, or hints. ESLint and
the twenty-page production build pass. The existing optional inspection-renderer
chunk warning remains visible. The selected owner pipeline remains unchanged.

| Retained local report | Result | Scope |
| --- | --- | --- |
| .research/d019/opening-browser.json | 72 passed | Shared opening, compact text flow, artwork, fallbacks, arrival and evidence. |
| .research/d019/first-full-browser.json | 208 passed, 12 inapplicable skips, 15 failures | First complete browser matrix; failures were investigated, not suppressed. |
| .research/d019/final-affected-browser.json | 40 passed, six inapplicable skips | Corrected images/history/reading positions, native navigation, shared geometry and module-loading order. |
| .research/d019/artwork-and-range-browser.json | 18 passed | Actual WebP resources rather than inert placeholders; chapter range startup and reversal. |
| .research/d019/navigation-repeat-browser.json | Nine passed | Three repetitions per Chromium viewport, including case-to-case navigation and browser Back. |
| .research/d019/motion-accessibility-browser.json | 37 passed | Contrast correction, normal-motion axe, live preferences, actual artwork, and BFCache. |
| .research/d019/action-state-axe-browser.json | Nine passed | Six routes in every browser/viewport, zero serious or critical axe findings with motion enabled; actual action containers stay opaque and unclipped. |
| .research/d019/zoom-fix-browser.json | 81 passed | The visual review's enlarged-word correction, all opening behaviors, and main-route reflow across all nine configurations. |
| .research/d019/settled-arrival-browser.json | 27 passed | Three repetitions per configuration of condition-based scroll/growth and frame settlement. |
| .research/d019/settled-initial-growth-browser.json | Nine passed | Final settled initial-growth assertion with every original threshold retained. |

Passing runs have no unexpected failures, retries, or flaky results. The six
affected skips and twelve complete-matrix skips retain the established
desktop-only scene and once-per-browser redirect applicability rules.
Do not sum these overlapping registrations into a claimed full-suite result.
The complete hosted result for the current application and verification tests is
recorded below.

### Corrected findings

The shared opening's compact layout now flows at enlarged text sizes instead of
overlapping absolute copy/actions. The opening's own responsive picture delivery
remains scoped to the active viewport. Footer material is opt-in on full-site
surfaces, keeping the isolated study free of unnecessary desktop split images.
The image test keeps stable DOM identities as scrolling hides the old opening.
The history test advances the new scrub sequence before requiring a transform.
Live preferences compare the actual content's viewport position because changing
the upstream opening's height legitimately changes the numerical scroll offset.

Repeated Chromium navigation exposed a native View Transition opt-in timing
error. The opt-in and reduced-motion opt-out now appear in inline head CSS before
stylesheet loading, following the documented first-render requirement. No native
error is filtered from the tests. Nine repeated navigation runs pass.

Source review identified missing coordination when general motion loads before
the opening expands. The opening now emits the existing portfolio:layout event
after its height and reading-position transaction; general motion refreshes its
triggers. A delayed-opening-bundle regression proves the initial and final poses
at the actual shifted chapter range in all nine configurations.

The first eighteen Lighthouse measurements passed performance but exposed
offscreen low-contrast waiting text. Noninteractive fades now begin at zero
opacity, without visibility or accessibility-tree hiding. Linked content uses
transform-only motion. This includes the linked chapter headings, archive rows,
next-project links, and About copy. The new normal-motion axe check inspects the
actual animated containers, requiring full opacity and no clip mask. The previous
reduced-motion scans remain evidence for the unchanged complete static layouts.

Hosted CI 40179713602 then reported 240 passes, twelve inapplicable skips, and
one WebKit desktop continuous-growth failure. Its retained trace shows a stale
sample, not a reproduced title plateau: the 75% scroll was requested at
219320.405, its width was read by 219703.65, and the next retained frame did not
arrive until 219922. The prior frame was at 219221.651. The final frame shows the
complete enlarged arrival. Trace and extracted poses remain in
.research/d019/ci-d3 and .research/d019/ci-d3-pose-*.jpg.

The test-only correction waits for the real artwork and fonts, confirms native
scroll position, requires the same greater-than-0.2px growth at 25%, 75%, 92%, and
100%, and samples a width after three unchanged animation frames. Settled initial
growth also uses that threshold. It retains the complete arrival, hero fade,
native release, and reversal assertions, and attaches actual scroll/width samples.
No retry, skip, error filter, or relaxed assertion was introduced. The 27-repeat
and final nine-configuration runs pass. Application paths have no diff from
d3e334e, so this verification change does not alter the accepted artifact.

### Visual, performance, and hosted completion

The current 35-view visual manifest is
.impeccable/review/d019/capture-manifest.json. It covers the five complete main
routes at desktop/mobile, the homepage at tablet and the reported 1280 width,
the approved comp size, all six later homepage chapters, readable case entrances,
and 320-wide enlarged text. It also includes the ordinary compact entry and an
actual 1265 by 712 hosted Cal.diy view. Captures were refreshed for the technical
corrections. Unchanged PNG hashes reuse the earlier validity inspection; changed
images were reopened. All current files have been validated. The opening's final
comparison remains 0.942 overall; the material region is 0.9435. The explicitly
accepted sharp semantic typography remains a documented adaptation.

The fresh full-site visual review accepted the world and later-page treatment,
with one material reflow finding at 320 width and 200% text size. The compact
opening now caps its padding in viewport units, preserving the actual 64px title
while giving each word sufficient width. A text-range regression requires every
word to remain whole at both 320 and 390 widths. The reviewer scored that one fix
resolved after validating the four refreshed views. Its ship disposition covers
the scored fix list, with the original full assessment retained separately.

An invalid early reflow attempt is retained under .research/d019/stale-build-*.
Concurrent Astro check/build processes collided while renaming their generated
content cache. The old build's test failure and captures are not current evidence.
A successful standalone build preceded the passing 81-registration run and the
current corrected captures. Future content-generating checks run sequentially.

Provenance scan: six shipping rasters, zero missing records. The required
completed-build documentation is complete in DESIGN.md, .impeccable/design.json,
and docs/experience/full-site-design-record.md. It preserves the existing world
and records the built motion values. Technical findings are resolved in
source; its completion pointer follows this hosted result. The final local eighteen-run
Lighthouse checkpoint at 976c91b passes all unchanged thresholds, with performance
medians 97 to 99 and accessibility 100 on every route. Detailed measurements are
in .research/d019/lighthouse-final-summary.json. That checkpoint precedes the
narrow compact-padding correction; fresh current-source performance is supplied
by hosted CI rather than inferred from those prior measurements.

Hosted CI 40178038709 passed for 976c91b; the d3e334e run and its diagnosed failure
remain recorded above. **Current CI 40182083491 passes** for verification commit
9b9c03a, with no application-source change from d3e334e. Its complete 253-case
registration matrix has 241 passes, twelve established applicability skips,
zero unexpected failures, zero flaky results, zero retries, and zero runner
errors. It starts at 2026-10-25T09:48:45.518Z and completes in 253.159 seconds.
Retained result: .research/d019/ci-final/test-results/results.json. This includes
Chromium, Firefox, and WebKit at desktop, tablet, and mobile sizes, normal and
reduced-motion axe checks, keyboard/navigation, complete no-JavaScript content,
WebGL failure/lifecycle, history restoration, filters/downloads/contact actions,
legacy destinations, reading-position retention, and enlarged text.

The same current-source CI completes all eighteen production-build mobile
Lighthouse measurements, three per route, with the original thresholds intact.
Each route has accessibility score 100 and no failed accessibility audit. Medians:

| Route | Performance | LCP, ms | CLS |
| --- | ---: | ---: | ---: |
| / | 99 | 2106.81 | 0.000125 |
| /work/ | 99 | 2065.53 | 0.000753 |
| /work/testpulse/ | 98 | 2079.10 | 0.020175 |
| /work/caldiy/ | 99 | 2076.02 | 0.000796 |
| /work/llm-evaluation/ | 98 | 2089.02 | 0.000772 |
| /experience/ | 99 | 1957.04 | 0.000125 |

The complete reports and assertion results are retained under
.research/d019/ci-final/.lighthouseci; the parsed current measurement record is
.research/d019/ci-final-summary.json. Workflow:
https://github.com/Mohanad49/Portfolio/actions/runs/40182083491.

Vercel Preview deployment 7311056066 is Ready at
https://portfolio-k0z5987oj-mohanad49s-projects.vercel.app. In the authenticated
in-app browser, the current preview passed homepage arrival, archive filtering
and reload persistence, a case-study bookmark, and continuation through all three
case routes. A 390-wide hosted check reached the arrival with the hero hidden,
exactly one TestPulse heading, and no canvas. The browser viewport was reset and
the full preview retained as the deliverable. Physical-device smoothness is not
inferred from this emulation. The matching test-commit deployment 7311399085 is
also Ready at https://portfolio-cyrt22n7f-mohanad49s-projects.vercel.app. Source
equivalence is explicit: git diff d3e334e..9b9c03a has no changes in src, public,
assets, package.json, pnpm-lock.yaml, or astro.config.mjs. Subsequent design/review
documentation does not change the application or invalidate these measurements.

Production remains on 40a24f16ec037658fb13d5509dd1ba59573f480a. This task publishes
the complete preview only. Physical-device iPhone smoothness remains outside the
automated and desktop-browser verification scope.

## Continuous TestPulse arrival: historical checkpoint, 2026-10-25

D-018 records the owner's request to remove the broken handoff between a growing
decorative label and a second TestPulse section title. The prototype now uses one
real linked heading throughout. The hero title, role, subtitle, and actions fade
completely; the materials advance and clear; the heading and descriptor become
the full work introduction. Existing approved project copy explains TestPulse.
The real evidence approaches from below before sticky release, without another
title entrance. The established first view, facts, images, dependencies, homepage,
and production are preserved.

Application commit 563096e90f1bd0a300e2e23460a7edd39caa6364 contains the current
source blobs: page aeb16f2c39d4e03a40dfa10a924cdf43d2154c9c,
motion 3a67322cdfdc51cd574f9af94f2017f3877bf825, and test
d57a9a5e1ea9e8e6ee1d46bbce8a8542dd4f6036. Type checking across 34 files has zero
diagnostics; lint and the twenty-page production build pass. The existing optional
homepage renderer chunk warning remains visible. The complete affected matrix
passes all 63 checks across Chromium, Firefox, and WebKit at desktop, tablet, and
mobile sizes, without skips, retries, failures, or flaky results. It starts at
2026-10-25T00:00:04.666Z and completes in 67.667 seconds. Retained report:
.research/experience-study/arrival-final-source-browser.json. The earlier two
63-pass checkpoints remain retained separately.

The new regression samples four scroll positions, including 92% and 100%, and
requires continued title growth, one heading, a fully visible arrival, every hero
element hidden at completion, stable title size and an 80-pixel native position
change on release, then a complete reverse to the opening. Existing checks cover
bookmarks, immediate actions, static and unavailable-WebGL paths, live motion
preferences, tablet-to-phone reading retention, loaded active artwork only, idle
rest, and errors. All nine axe/reflow cases have zero serious or critical findings.

Independent technical review caught a compact fallback defect outside the original
assertions: the unique project descriptor was transparent without active motion.
Its initial hidden state now applies only to the enhanced timeline. No JavaScript,
initial Reduce Motion, and live Reduce Motion each explicitly require descriptor
opacity 1 in all nine configurations. The source reviewer resolves the Required
finding at the corrected blobs. The current 63-pass result includes this correction.

Earlier failures remain retained. The first 14 registrations had ten passes and
four failures: an empty arrival layout intercepted mobile clicks, and structural
padding/margin transitions moved the reading position after Reduce Motion cleanup.
The layout now passes pointer input through its empty area, while visible copy
remains selectable. Its structural transitions are explicitly disabled so layout
changes settle inside the existing reading-position transaction. The diagnostic
rules out a proposed native-scroll-anchoring explanation and records the delayed
padding and margin values instead.

The following 63-registration run had 58 passes and five failures: two exact
IntersectionObserver ratio comparisons returned 0.99999976158 for a fully visible
transformed heading, and all three tablet-to-phone reading checks failed. The
heading assertion now checks all four actual viewport bounds with a half CSS
pixel rounding tolerance; it still requires complete visibility. Removing an
unnecessary focus side effect did not fix the resize issue, and the affected
nine-check run retained those three failures. The actual cause was extra travel
expressed in svh, which changed the document height before JavaScript could
compensate. Travel now uses measured pixel height and reconfigures on debounced
resize. The affected three checks and the full final matrix pass. Failure reports
and diagnostics remain under .research/experience-study/arrival-* and
test-results/arrival-*. No retry, skip, or acceptance gate was relaxed.

The builder completed one batched inspection and one correction/confirmation.
The batch brought evidence into the end viewport and made the explanatory copy
arrive earlier. Final static and moving captures, native-scroll videos, and their
manifest are under .impeccable/review. The comparison remains 94% against B, with
the existing approved typography and semantic-text adaptations. Provenance scan:
five rasters, zero missing. All 24 current PNGs were opened for validity after
the required technical corrections. The current manifest is dated
2026-10-24T23:59:15.900Z. No further builder aesthetic pass was started.

Three initial production-build mobile Lighthouse runs failed the unchanged
performance and CLS gates: all scores were 80, with CLS 0.3843770739. LCP passed
at 2264.5541, 2255.9163, and 2255.4751 ms. The attributed shift was the arrival
wrapper moving from static flow into its pinned position before it was hidden.
The enhanced wrapper now starts hidden during that layout change, and the
existing timeline reveals it from 55% to 85%; only its copy child translates.
The default static wrapper stays visible. New assertions check its hidden enhanced
start, complete arrival, and visible no-JavaScript/initial/live Reduce Motion states.
The failing reports remain in lighthouse-arrival and lighthouse-arrival-summary.json
under .research/experience-study.

All three corrected mobile Lighthouse runs score 98. LCP values are 2262.0677,
2256.4436, and 2255.8537 ms, median 2256.4436 ms. Each CLS is 0.0001237532.
All unchanged gates pass. Reports and the parsed summary are retained as
lighthouse-arrival-corrected and lighthouse-arrival-corrected-summary.json.
The local headless post-load sample records zero errors or canvas elements,
46,899 encoded JavaScript bytes with motion, and 1,467 with initial Reduce Motion.
Each 39-frame sample has a median interval of 16.7 ms. The desktop p90 is 33.3 ms;
tablet and mobile p90 values are 16.7 and 16.8 ms. This bounded lab sample is not
physical iPhone, GPU, or field smoothness certification. Data is retained in
arrival-runtime-profile.json.

Technical source review approves the current blobs with no unresolved Critical
or Required finding. The fresh full D-018 visual review returns ship after opening
all 24 required captures. It confirms the complete single-heading transformation,
hero disappearance, explanatory arrival, and settled release, with no material
fixes. Videos were not played, and the verdict does not certify temporal or
physical-device smoothness. D-017 review history is retained below that report.
The completed design record describes the actual D-018 DOM, local values,
progress ownership, measured travel, lifecycle, and fallbacks. DESIGN.md and
.impeccable/design.json retain their recorded canonical hashes. Historical spec
and static-diff annotations are documented without unrelated repair.

Preview deployment 7306339845 succeeds at checkpoint
186ef7970751fa19cf42c95be167793c3c48ab5a. The immutable preview is
https://portfolio-f6xmmxsd7-mohanad49s-projects.vercel.app/experience.
The in-app browser smoke checks native scrolling at 1280x720 and 390x844.
Desktop title width grows from 314.316 to 579.004 CSS pixels; all five hero
opacities reach zero with hidden visibility, and the arrival reaches opacity 1.
At scroll 1008 the title top is 86.398; after 80 more pixels its top is 6.398,
with unchanged width and one heading. Mobile widths progress from 227.466 through
276.909 to 332.674 pixels. Both compact images load, no canvas is present, and
all five hero opacities reach zero. The work shortcut lands the evidence marker
at 64.063 pixels. The noindex/download attributes, comparison navigation, return,
and restored opening are verified; recorded browser errors are empty.
Hosted screenshots and the smoke record are retained as hosted-arrival.jpg,
hosted-mobile-arrival.jpg, and .research/experience-study/hosted-arrival-smoke.json.
Viewport overrides were reset, and the preview remains open at its beginning.

Hosted quality [run 40145616153](https://github.com/Mohanad49/Portfolio/actions/runs/40145616153)
succeeds at checkpoint 186ef7970751fa19cf42c95be167793c3c48ab5a, with its verify
job completing in 7 minutes 46 seconds. All check, lint, build, browser,
performance, and upload steps pass. The 199 browser registrations contain
187 passes and twelve established inapplicable portfolio.spec.ts skips, with
zero failures, flaky results, or retries. All 63 experience checks apply and
pass. The browser matrix starts at 2026-10-25T00:11:20.528Z and completes in
177.272 seconds. All eighteen mobile Lighthouse runs complete, and every
unchanged median gate passes:

| Route | Runs | Median performance | Median LCP, ms | Median CLS |
| --- | --- | --- | --- | --- |
| / | 3 | 100 | 1585.324 | 0.000563 |
| /experience/ | 3 | 99 | 1956.322 | 0.000125 |
| /work/ | 3 | 100 | 1356.795 | 0.000753 |
| /work/testpulse/ | 3 | 100 | 1356.151 | 0.017927 |
| /work/caldiy/ | 3 | 100 | 1354.854 | 0.000800 |
| /work/llm-evaluation/ | 3 | 100 | 1357.215 | 0.000774 |

The run metadata, complete artifacts, and parsed summary are retained as
ci-run-40145616153.json, ci-artifacts-40145616153, and ci-summary-40145616153.json
under .research/experience-study. Final documentation consumes this exact
application tree without repeating its checks. This remains an isolated draft
preview, not production integration. Production deployment 7280653313 remains at
40a24f16ec037658fb13d5509dd1ba59573f480a, and the original checkout is clean.
The temporary local preview was stopped after hosted verification.

## Layered artwork prototype: previous checkpoint, 2026-10-24

The owner rejected the hosted renderer at 6a46f0b and authorized preserving the
approved B artwork with cinematic layers. D-017 and the surface brief record
that treatment. The new /experience opening advances through its continuous
text-free plate; its mobile cutouts and actual TestPulse evidence are retained.
The prototype-only React/WebGL components and abandoned material maps are removed.
The homepage, its standalone renderer, and production remain unchanged.

Application commit 8731f42 contains the final application blobs:
page 34a7e7fbf82d94b77cc270ae3177425b315b455d,
motion 7379acbc1fe5c1c43f1b33ae3ddd00fa24f64c39, and test
884ccbbb25c239e978696048e30c80e72cb8a53e. Sequential type checking across
34 files has zero diagnostics; lint and the twenty-page static build pass.
Existing optional homepage renderer chunk warnings remain visible. The complete
affected matrix passes all 54 checks across Chromium, Firefox, and WebKit at
desktop, tablet, and mobile sizes. There are no skips, retries, failures, or flaky
results. This covers native forward/reverse scrolling, immediate work access,
evidence bookmarks, reading-position retention, live preferences,
no-JavaScript/WebGL-unavailable paths, active-viewport artwork loading, and idle
rest without a renderer. All nine axe/reflow cases have zero serious or critical
findings. The final report is
.research/experience-study/source-final-browser.json, started at
2026-10-24T11:06:11.422Z and completed in 70.392 seconds. Earlier passing reports
remain retained as historical checkpoints.

One batched visual inspection and one correction/confirmation preceded the fresh
independent full review. That review returned fix for a caption crossing the
foreground beam, introduction contrast during motion, and the missing lower
boundary at 729/tablet widths. One correction batch moved the project text inside
the aperture, brought the introduction to existing warm-white ink during the
push, and restored the compact lower boundary. The same reviewer reopened all
sixteen required captures and resolved all three named findings with a scoped
ship verdict. The full review plus scoped resolution is in
docs/experience/visual-review.md; the initial review is preserved separately.
This is not a new independent review of every surface after the fixes.

Current captures and motion samples are retained under .impeccable/review; the
initial split-image attempt and rejected renderer remain archived under
.research/experience-study. The matching static comparison is 94.2%, with no
forced gate. Provenance scan: five rasters, zero missing. The design documenter
records the completed implementation in docs/experience/design-record.md;
canonical DESIGN.md and .impeccable/design.json hashes are unchanged. Technical
source review approves these exact blobs for the isolated preview, with no
unresolved Critical or Required finding. The fractional media-query gap is
resolved. Neither review authorizes production integration.

The first local artwork measurement passed performance and layout stability but
failed the unchanged LCP gate: median performance 96, LCP 2556.6769 ms, and CLS
0.000123753. The upper mobile artwork was the LCP element, with lazy loading and
approximately 1201 ms load delay in the attribution. Eager loading and a high
fetch priority address that discovery delay. A subsequent network assertion
exposed unused upper/lower downloads in WebKit desktop: 53 passes and one failure
in delivery-initial-browser.json. Although currentSrc selected the inert image,
the real fallback URLs still generated requests. The final markup places actual
optimized WebP URLs only on active picture sources, with an inert SVG fallback
and complementary media queries. The full 54-pass result above verifies this
correction without retries or weakened assertions. Rendering uses the same
artwork, geometry, and timeline as the accepted captures.

Three production-build mobile Lighthouse runs on the final source score 98, 98,
and 98. LCP is 2266.5714, 2259.6771, and 2255.5207 ms; median 2259.6771 ms. Each
CLS value is 0.000123753. All unchanged thresholds pass. Reports and the parsed
summary are retained under .research/experience-study/lighthouse-source-final
and lighthouse-source-final-summary.json. The prior failing reports and the
intermediate priority measurements remain retained. A local headless Chromium
sample of the unchanged motion path reports zero canvas elements or errors and
approximately 46 KB of encoded JavaScript on desktop, tablet, and mobile. Its
16.7 ms median animation-frame sample is a lab observation, not physical iPhone
or field smoothness certification.

The earlier artwork CI run 40025575891 at ee578bf completed successfully:
178 passed, twelve inapplicable skips, zero failures or flaky results, and all
eighteen Lighthouse measurements. Its /experience median was 98, LCP
2234.6564 ms, and CLS 0.0001249505. That run preceded the three visual fixes and
final delivery correction, so it does not certify the final source. Its parsed
summary and artifacts are retained under .research/experience-study.

Final hosted run [40089079924](https://github.com/Mohanad49/Portfolio/actions/runs/40089079924)
at 38ea3bedd90cbf8c90a373c9f4b4f2aa63d25ffe succeeds in 8 minutes and 53 seconds.
All type, lint, build, browser, performance, and artifact-upload steps pass. The
190 browser registrations contain 178 passes, twelve established inapplicable
portfolio.spec.ts skips, zero failures, zero flaky results, and zero retries.
All 54 experience registrations are applicable and pass. The browser matrix
completes in 211.908 seconds. All eighteen production-build mobile Lighthouse
measurements complete and every unchanged median gate passes:

| Route | Runs | Median performance | Median LCP | Median CLS |
| --- | --- | --- | --- | --- |
| / | 3 | 99 | 1.588 s | 0.000563 |
| /work/ | 3 | 100 | 1.356 s | 0.000753 |
| /work/testpulse/ | 3 | 100 | 1.356 s | 0.017927 |
| /work/caldiy/ | 3 | 100 | 1.356 s | 0.000800 |
| /work/llm-evaluation/ | 3 | 100 | 1.357 s | 0.000774 |
| /experience/ | 3 | 99 | 1.959 s | 0.000125 |

The exact parsed results and downloaded reports are retained under
.research/experience-study/ci-summary-40089079924.json and
ci-artifacts-40089079924. These remote-runner measurements are production-build
lab results, not visitor field data. The final audit follow-up changes only
documentation, so it consumes this verified application/test/configuration tree
without repeating identical checks.

Vercel Preview deployment 7297844824 succeeded at application commit 8731f42 plus
review-record commit 38ea3be. Its immutable comparison route is
https://portfolio-5c4dn4unn-mohanad49s-projects.vercel.app/experience.
The existing authorized browser session opens it without an authentication
interruption. At its actual 729x797 viewport, the upper and lower WebPs load,
the unused desktop picture selects the inert image, motion initializes, and a
native scroll changes the upper transform. Explore the work reaches #evidence
with its heading approximately 64 pixels below the viewport top and all three
observations present. View the current version opens the unchanged homepage.
The resume retains its public PDF URL and descriptive download filename; its
bytes are unchanged from the earlier hash-verified download. The prototype is
noindex, follow and has been left open for comparison. No new physical-device
or download claim is made by this hosted smoke check.

At the temporary 1440x1000 hosted desktop viewport, the full approved plate loads
and both compact images select their inert fallback. Native scrolling advances
the plate to its 1.22 scale, with zero canvas elements. The viewport override was
then reset to the actual 729x797 browser size. A footer-link automation attempt
failed in the in-app browser's click resolution after that reset; it did not
establish a site defect or verify footer pointer activation. Direct navigation
to the already exposed #top fragment returns to scroll position zero. These
limits are retained separately from the passing local and hosted browser suite.

GitHub still records Production deployment 7280653313 at
40a24f16ec037658fb13d5509dd1ba59573f480a. The original checkout is clean. PR #4
remains an open draft, with no homepage integration or production change.

The handoff recommends this artwork treatment for the opening because it retains
the approved material finish while providing bounded desktop and compact mobile
scroll motion. It does not claim a fully rendered 3D passage. The actual built
desktop capture and tested immutable preview are ready for owner comparison;
integration remains a separate decision.

The rejected snapshot's hosted run 40016674543 completed its full browser matrix:
172 passed, eighteen inapplicable skips, zero failures, zero flaky results, and
no retries. The workflow concluded cancelled during performance collection after
eleven of eighteen Lighthouse reports. The job annotation confirms the 25-minute
execution limit was exceeded. Browser installation alone took 18 minutes and
53 seconds. The job allowance is now 35 minutes so the existing browser and
performance checks can finish; no test, retry, metric, or threshold is relaxed.
The cancelled run is not a green full pipeline. Artifacts and the parsed
summary are retained in .research/experience-study/ci-artifacts and
ci-summary-40016674543.json. Its local three-run /experience measurement had median
performance 97, LCP 2.409 s, and CLS 0.000124; one individual LCP was 2.707 s.
Those measurements apply to the rejected renderer snapshot, not the new treatment.

The rejected hosted preview's work fragment, comparison navigation, and current
resume download were checked in the authenticated browser. The downloaded PDF's
SHA-256 matches the current public resume. The new preview smoke check is
recorded above.

## Rejected renderer: comparison checkpoint

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
visual-review.renderer.md. Current required captures/videos are under
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
