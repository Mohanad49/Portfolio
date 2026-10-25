# Independent technical source review

Review date: 2026-10-22.

Initial immutable source: `68a4ab408d7d686ce5dfba907f64b77d65918de8`.
Approved source before the material follow-up: `9355bab6df21a5011b6510316ababfaa625b3cf1`.
The approved material/CI follow-up is identified by exact blob hashes below.
Production baseline: `283ac31982d3e77893c8f28d22384e795172737e`.

Scope: correctness, architecture, readability, resource lifecycle, security,
dependency graph, static output, and verification quality. Visual acceptance
belongs to the separate Impeccable review. This review does not approve a release
while objective measurements or hosted validation remain outstanding.

## Final verdict

**Approve.** No unresolved Critical or Required source findings remain. The
initial review requested changes for filter URL persistence and initial fragment
navigation. Commit `92cd582182b821ca14a6fd68ce62b9101e2cf9b7` addresses both,
along with the two Optional findings. The final scene commit was also reviewed
for resource lifecycle and rendering behavior. That commit's material changes do not add
resource owners; its explicit initial invalidation schedules a bounded render.

The final source has reported type checking across 30 authored files with zero
errors, warnings, or hints, passing ESLint, and a successful 19-page build.
The retained affected matrix reports 16 passed, 12 intentionally inapplicable
desktop-only skips, zero unexpected failures, zero flaky results, and no runner
errors. Its coverage is nine filter/browser/viewport combinations, three legacy
fragment checks, three desktop 3D lifecycle and network-deferral checks, and one
actual Chromium history-cache check. The strengthened history check separately
passed in 6.2 seconds. These results were read from
`.research/affected-matrix.json` and `.research/history-verification.json`.

The preceding full matrix's 113 passing checks remain evidence for unaffected
behavior; its single legacy-fragment failure is addressed and passed in the
affected matrix. This is source approval, not a claim that all release gates
have already completed.

## Findings against the initial source

### Resolved, Required: preserve a user-selected filter when entering through a bookmark

Location: `src/pages/work/index.astro:36-39`, with recovery at lines 42-47.

Open `/work#github-api`, select Mobile, then reload. Before reload the UI shows
one Mobile framework and the URL is `/work?type=Mobile#github-api`. After reload,
the URL becomes `/work#github-api`, All is selected, and seven frameworks appear.
The user-selected filter writes a contradictory URL because it retains a hash
target that the filter hides. This was reproduced in Chromium.

Remedy: when a visitor selects a filter, clear a fragment only when it names a
framework hidden by that filter. Retain initial URL recovery for existing legacy
bookmarks. Verify the selected category, count, and URL across reload.

Resolution: the filter now removes only a fragment naming a newly hidden
framework. All nine engine/viewport combinations passed the reload regression.

### Resolved, Required: do not interrupt initial native fragment navigation

Location: `src/scripts/motion.ts:22`.

The initial motion configuration unconditionally restores the scroll position
captured before constructing its timelines. When native fragment scrolling is
still in progress, that restore can cancel navigation to `/#About` or `/#Contact`
and return the page to the top. The parent observed both paths diagnostically and
the current full browser matrix caught Contact.

Remedy: preserve the scroll position on subsequent media-preference transitions,
without issuing that restore on initial configuration. Recheck initial legacy
fragments and live reduced-motion transitions across the affected browsers.

Resolution: the first configuration no longer restores the captured position;
later preference changes retain that behavior. Initial legacy fragments and live
motion transitions passed in Chromium, Firefox, and WebKit.

### Resolved, Optional: retain motion on back/forward cache restoration

Locations: `src/scripts/motion.ts:26` and `src/pages/index.astro:27`.

Both pagehide handlers remove their media listeners; the motion handler also
reverts its context. A browser back/forward cache restoration resumes the same
document without running its startup scripts again. In full Chromium, after
visiting `/work` and going back, pageshow reported `persisted: true`; the hero
transform was empty and stayed empty after scrolling and a reduced-motion toggle.
This affects enhancement behavior while core content remains usable.

Remedy: retain the context and listeners when pagehide has `persisted: true`,
or explicitly restore them on persisted pageshow. Do not use a once-only listener
that removes itself when a persisted event intentionally skips cleanup. Verify
actual cache restoration, not only a fresh document reached through Back.

Resolution: both cleanup handlers retain state for persisted page transitions
and unregister themselves only on nonpersisted pagehide. The real Chromium
cache-restoration test requires persisted pageshow, a changed transform after
scrolling, and working reduced-motion enable/disable transitions. It passed.

### Resolved, Optional: make the JSON-LD escape perform its stated operation

Location: `src/layouts/BaseLayout.astro:35`.

The replacement string uses a JavaScript Unicode escape that evaluates to `<`,
so the replacement is a no-op. A literal backslash followed by `u003c` is needed
to make less-than characters safe inside the inline script payload. The current
profile is trusted, checked-in data, so this is not a current untrusted-input
exploit. Correct the escape before relying on it as a serialization boundary.

Resolution: the replacement now emits a literal backslash followed by `u003c`.
The exact source correction was reviewed and the final build passed.

## Review evidence

- Read project instructions, product contract, implementation plan, decisions,
  evidence ledger, verification record, and browser tests before source.
- Reviewed the complete authored source, CI/deployment configuration, dependency
  importer graph and integrity records, and old numeric project mappings.
- Core content is generated as static HTML. Case studies and profile data have
  build-time schemas. There is no application API, contact backend, runtime
  ingestion, arbitrary HTML input, or client-side secret requirement.
- The thirteen old project IDs retain the correct destinations. The built output
  contains 19 generated pages and the retained Google verification HTML file.
  A read-only parse resolved all 101 internal links and fragments successfully.
- No source maps, prompt sidecars, AGENTS.md, PRODUCT.md, DECISIONS.md, or
  sources.json were found in the built output. Public assets and module imports
  exclude the development research and design directories.
- InspectionIsland pairs observer, media, and visibility registration with
  cleanup. Deferred import cancellation prevents stale state updates. WebGL
  failure, render failure, and context loss retain the static artwork.
- InspectionCanvas removes its DOM listeners and animation callback, and clears
  the shared invalidation hook only when it still owns it. The installed R3F
  implementation disposes its owned renderer, scene objects, geometries and
  materials; the installed Drei Environment implementation disposes its cube
  render target. The scene uses demand rendering and a bounded pixel ratio.
- The 3D dependency graph is isolated behind a dynamic import. Its size warning
  remains visible. The parent reports passing normal mobile/tablet and all
  reduced-motion network-exclusion assertions in the preceding full matrix.
  The affected matrix also passed absence of the Canvas request at desktop top
  and a single request near the inspection section in all three desktop engines.
- The pinned lockfile uses registry integrity records. The retained production
  audit reports zero advisories. Build/type/lint/peer results are reused from the
  shared verification record instead of rerunning broad checks during review.
- CI uses read-only repository permissions, pinned action commits, frozen
  installation, type/lint/build checks, three browser engines and three viewport
  sizes, no automatic test retries, median mobile performance/LCP/CLS assertions,
  and retained artifacts even when a step fails.
- Tests exercise exact resume bytes, actual filter results, clipboard success and
  denial, initial bookmarks, no-JavaScript content, real image decoding, keyboard
  controls, preference changes, and actual GPU context loss. Automated axe scans
  intentionally enforce zero serious or critical violations; they do not by
  themselves establish every WCAG criterion.

## Objective acceptance remains separate

The final shared record must identify the approved source and consolidate the
full and affected browser evidence. The three mobile Lighthouse runs for each
main route subsequently passed. Hosted preview routing/status/headers and final
live smoke checks remain release gates.
External evidence links and professional claims retain their separate factual
verification responsibility. No additional browser process was launched by this
reviewer during the Lighthouse measurement window.

## Approved material and CI follow-up

**Approve.** No additional Critical, Required, Optional, or Nit findings.
This is the owner-authorized material-only follow-up plus the limited CI trigger
change. No additional design review or engineering workflow was introduced.

Reviewed patch base: `51c3a54a028da44807a731b5e1a0404ed2428647`.
Exact approved Git blob identities before the parent commits this patch:

| File | Blob SHA |
| --- | --- |
| `src/components/InspectionCanvas.tsx` | `83f7592ed22e04f047a63a7df622a33df46b233d` |
| `.github/workflows/quality.yml` | `6aa8f0e8a636207cd07076bffbf7567f8e81ed23` |
| `tests/portfolio.spec.ts` | `89a7aaf0a2af6a79fb53ec4940a133506ad07e13` |

The three inner layers now use Drei MeshTransmissionMaterial from the existing
pinned dependency. The official [material documentation](https://drei.docs.pmnd.rs/shaders/mesh-transmission-material)
describes its ability to sample other transmissive objects and its extra scene
render cost. The installed implementation was inspected directly, including
its framebuffer hook, rather than inferring ownership from the component name.

- Each of the three materials performs one additional scene render per demanded
  frame. This is three additional renders in total, not one. Backside rendering
  remains disabled. Resolution is explicitly 512 by 512 and refraction samples
  are explicitly six; no new full-viewport buffer or unbounded sampling is added.
- Drei's useFBO owns the main and back target objects and disposes them on unmount.
  The existing Canvas lifecycle still disposes its owned renderer and restores
  the artwork on context loss. The temporary discard material is scoped to the
  mounted component, with its GPU programs released by owned renderer teardown.
- The material's frame callback updates uniforms and renders its buffers but does
  not call invalidate or schedule another animation frame. Existing demand
  rendering, near-viewport activation, and mobile/reduced-motion exclusion remain
  intact. Distortion and temporal distortion are zero.
- The shader compiled and the interaction/lifecycle paths passed in Chromium,
  Firefox, and WebKit. `.research/transmission-browser-verification.json` reports
  three passed, zero failures, zero skips, zero flaky results, and no runner errors.
  Each retained inspection-browser-errors attachment decodes to an empty array.
  The test collects both console errors and page errors, so a silent Three shader
  compile failure cannot be concealed by otherwise changing opaque geometry.
- The CI change limits push runs to main while retaining pull_request. Pull
  requests still receive validation, main still receives post-merge validation,
  and an open feature PR no longer duplicates its run through the branch-push
  trigger. Permissions, checks, action pins, and artifact retention are unchanged.

The increased desktop GPU work is bounded but is still a real cost. This review
does not claim a measured desktop frame-rate improvement. The separately retained
15-run mobile report, `.research/mobile-performance.json`, has median performance
99 for home and 100 for the other four routes, median LCP from 1.508 to 1.597
seconds, and median CLS below 0.015. The deferred scene is excluded from those
mobile requests, so this material-only change does not invalidate that evidence.

## CI software-rendering follow-up

Review date: 2026-10-23. **Approve the source delta.** No additional Critical,
Required, Optional, or Nit findings. Hosted Ubuntu execution remains an objective
gate, independent of this configuration review.

Reviewed against source `00a2a63023c6f3c43e96359f14de18e0a9f56552`:

| File | Reviewed blob SHA |
| --- | --- |
| `.github/workflows/quality.yml` | `716a944933f8b506905fe4f26b675cbe9371e040` |
| `playwright.config.ts` | `aa1f43bf499f069712e3ed611c4a175f18b07904` |

The retained Firefox trace from failed GitHub run `39747337308` reports
`AllowWebgl2:false restricts context creation on this system`. Mozilla's
[upstream report](https://bugzilla.mozilla.org/show_bug.cgi?id=1970486) documents
the same denial and the `webgl.force-enabled` workaround on a GPU-less Windows
system. That supports the diagnosis; it does not prove the Ubuntu fix.
[Playwright's CI guidance](https://playwright.dev/docs/ci#running-headed) requires
Xvfb for headed Linux execution, and the installed Playwright dependency list
includes Xvfb. [Mesa documents](https://docs.mesa3d.org/envvars.html#libgl-environment-variables)
the software-rendering environment control used by the test step.

The headed mode and Firefox preferences apply only to Firefox under Linux CI.
The Xvfb wrapper and software-rendering environment apply to the browser-test
step. There is no production rendering change, new dependency, added retry,
error suppression, fake context, or expanded skip. The existing real-context
test still requires a rendered image change after keyboard input, actual
`WEBGL_lose_context` support, fallback recovery, and zero collected console or
page errors. The separately forced WebGL-failure test still covers fallback.
All nine engine/viewport projects remain configured. Pull requests and main
pushes retain validation; the duplicate feature-branch push trigger is removed.

No browser or broad check was rerun by this reviewer. The parent owns affected
type/lint validation and the hosted Ubuntu run. The earlier run's 114 passes,
one failure, and 12 documented inapplicable skips remain a failed result until
the new run completes. Release acceptance requires retained results for the
approved source with no unexpected failures, flaky results, or runner errors.

## Resume download header follow-up

Review date: 2026-10-23. **Approve the source delta.** No Critical, Required,
Optional, or Nit findings. Reviewed against merged source
`9f1e9fb7a464c98145e67b7c97617ca66ee56673`; the exact reviewed `vercel.json`
blob is `db45cf7e11f8a90256f7f01611a4dcbe19d7652a`.

The existing `/resume.pdf` header rule now sets
`Content-Disposition: attachment; filename="Mohanad_Yehia_Software_QA_Engineer.pdf"`.
[Vercel documents](https://vercel.com/docs/project-configuration/vercel-json#headers)
this path-specific response-header configuration for static files.
[MDN documents](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Disposition)
that the header's filename takes precedence over the HTML download filename.
The quoted ASCII value matches all three authored resume links and the existing
strict `suggestedFilename()` assertion. It contains no path, control character,
or untrusted interpolation. This adds no runtime resource handling, and retains
the existing PDF cache policy and shared security headers.

This is source approval only. The parent owns preview and live confirmation that
the deployed response sends the intended disposition and the unchanged desktop
and mobile download tests pass with the expected PDF bytes. No broad check or
browser was launched by this reviewer, and the prior live filename failures
remain unresolved until the deployed fix passes those checks.

## Scene activation during bookmark navigation

Review date: 2026-10-23. **Approve the source delta.** No Critical, Required,
Optional, or Nit findings. Reviewed against
`f55bfd4bd62b55e6191135176a04940776f3fa8d`; the exact reviewed
`src/components/InspectionIsland.tsx` blob is
`fcb5797cc8437e99e5a864015a524afe8a41aa12`.

The failed legacy Contact check in CI run `39876869771` last sampled a zero
viewport ratio at trace time 26179 ms, then produced no new assertion sample
before its timeout at 33670 ms. The trace also records software GPU stalls and
a long screencast gap. Its post-timeout screenshot shows Contact, which does
not establish that an earlier observer sample was incorrect. The retained
`.research/bookmark-transit-before.json` separately demonstrates an unnecessary
Canvas request and mount at 498 ms while smooth navigation passes Approach,
followed by unmount before the final Contact position.

The correction defers only inactive-scene activation until 150 ms without
scrolling. It resets that bounded timer on passive scroll events, rechecks
intersection, media preference, and document visibility before activation,
and preserves immediate deactivation. A scene already active is not restarted
or delayed by scroll. The effect owns and clears its timer and removes every
listener on cleanup. The observer consumes its latest entry, accounting for
[queued intersection changes](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#intersection_change_callbacks).
The existing asynchronous import cancellation and Canvas disposal paths remain
in effect. No new dependency or external data boundary is introduced.

The motion startup retains its guard against restoring scroll on initial
configuration. The installed GSAP refresh code was inspected; it temporarily
changes scroll behavior while measuring and restores the recorded position.
The observed smooth transit does not establish that refresh needs alteration.
The correction therefore stays within scene activation, with global scrolling
and the strict viewport assertion unchanged.

This source verdict does not establish hosted recovery. The parent owns the
affected type/lint/build checks, three-engine desktop bookmark and lifecycle
suite, and before/after transit measurement. The required evidence is that
direct Contact transit avoids the unnecessary Canvas startup while settled
Approach activation, interaction, reduced-motion teardown, context-loss
fallback, and the unchanged bookmark assertion still pass. No browser or broad
check was launched by this reviewer.

## Owner feedback: updated evidence, curation, and shared reveals

Review date: 2026-10-23. **Approve the source delta.** No unresolved Critical,
Required, Optional, or Nit findings. Scope is technical correctness, lifecycle,
testing, architecture, security, and performance implications. Visual acceptance
remains with its owner. Reviewed against
`9d676e5aa5ef39035656b4a405eb35a946ba9e04`.

Exact reviewed blobs:

| File | Blob SHA |
| --- | --- |
| `docs/briefs/home.md` | `58263fedd175e35a510604ca3cd927b79ea427d5` |
| `docs/evidence.md` | `6bed89a49114e2177c0a3be0e4d1e8fb314b4b6e` |
| `public/resume.pdf` | `a338caf9004f4d2aa3197a7d1501f33678457097` |
| `src/components/About.astro` | `bf98f6426f8af3d68a6466876407165a23f7aa73` |
| `src/components/SelectedWork.astro` | `7731922ea9b22b073b89d33b6308f052db9b5fd3` |
| `src/data/frameworks.json` | `b4d51e55241012450679d0a301edc0fdaea63f33` |
| `src/data/legacy-routes.json` | `e18722e098d830c1d01da0d7f666fd85c40ce206` |
| `src/data/profile.json` | `054aeea339d29776e37f2d40f9fac200f5e01670` |
| `src/pages/index.astro` | `84b6f8696c275ac177b26fabc854228ffdfd0c10` |
| `src/pages/work/index.astro` | `f9ad737ab2e962416a7de5d3a18b6f08476b2195` |
| `src/scripts/motion.ts` | `0f8ad2d3d78f80fb1709305a206b0e9d974b16e0` |
| `tests/portfolio.spec.ts` | `b338297c9c0b6cb5776c4c08833f53a800ba4d67` |
| `vercel.json` | `b65c5b22de0d1d8179e96ec365b2f0674d249385` |

The separate `.research/github-profile` repository was reviewed against
`570f1bf22fe06f9b06332fb76954a07daba8e045`; its reviewed `README.md` blob is
`e3ac39496684978d7ab8a501343450bc8ede34e5`. Its factual delta uses the same
owner-confirmed 5,000+ authored cases and 600+ defects, qualifies 85% as
admin-portal regression coverage, and removes the eBay row from the curated
table. This review makes no additional employment-evidence claim beyond the
owner-confirmed scope.

The portfolio metric values and evidence ledger agree. The degree project has
an explicit Graduation Project label. The published PDF's independently computed
SHA-256 is `683ede439d00f58b2323c78629635ea674558fee1f5e1cce9d7132d7ae47735d`,
exactly matching the supplied identity. The download test retains byte identity
and the descriptive filename assertion. Six curated frameworks remain across
four categories, with filter counts of two Web, two API, one Mobile, and one
Performance framework. Both the static legacy mapping and Vercel preserve
`/project/10` as the selected external GitHub destination.

### Resolved, Required: preserve once-only reveals through reconfiguration

The initial motion patch recreated every reveal after a desktop breakpoint or
motion-preference change. A completed element could therefore be faded again
after returning to the top. `once: true` belongs to each ScrollTrigger instance;
[context reversion](https://gsap.com/docs/v3/GSAP/gsap.context()/) destroys those
instances rather than preserving their completion history.

The corrected source keeps a per-page WeakSet of completed or initially visible
targets. Context reversion still clears spatial motion immediately for Reduce
Motion, while reconfiguration skips those targets and leaves unplayed content
below the viewport eligible. The strengthened regression completes a reveal,
returns to the top, crosses the desktop breakpoint, changes motion preference
both ways, and revisits while requiring full opacity. It also checks completed
transform cleanup and live Reduce Motion recovery. Both media listeners have
matching cleanup, and persisted page transitions retain their existing policy.

The shared reveal path now runs on mobile through the existing deferred GSAP
import. Hero parallax and inspection progress remain desktop-only, and the 3D
island's separate desktop and motion-preference boundary is unchanged. No new
dependency, runtime data boundary, secret, or continuous mobile Canvas work is
introduced. Transform and opacity styles clear on completion; the unscripted
page retains its complete content.

This source approval does not claim the corrected checks or current mobile
performance have passed. The parent owns affected type/lint/build checks,
browser verification, captures, and performance acceptance for the changed
mobile path. No browser or broad check was launched by this reviewer.

## Pass Through prototype: technical source review

Date: 2026-10-23. Baseline: `40a24f16ec037658fb13d5509dd1ba59573f480a`.
Scope: the isolated `/experience` preview, including its committed prototype
files and final working-tree delta. The approved brief and storyboard define
the direction; this review covers source correctness, lifecycle, resource
handling, evidence provenance, and test quality.

**Technical source verdict: approve for isolated preview.** No unresolved
Critical or Required source finding remains in the reviewed blobs. This is not
visual acceptance or authorization to merge or release to production. The
visual review still requires a desktop rebuild; full-tree CI and mobile
Lighthouse remain pending on the draft PR.

### Reviewed identities

| File | Git blob |
| --- | --- |
| `src/pages/experience.astro` | `aa6cf9659b0127e38f575b026be9f2945861fcf0` |
| `src/scripts/experience-motion.ts` | `25a693f6989ac74d6812c7c7e82296d838adb511` |
| `src/components/experience/PassageIsland.tsx` | `914dc21877a6385ecce7c8e853df0972c6197b10` |
| `src/components/experience/PassageCanvas.tsx` | `77fd3e47502939dc081ea58f95393dae2a7cf65c` |
| `src/data/experience-history.ts` | `c3e8ab4d9d6967c36f9b50bdef924bfa767086aa` |
| `tests/experience.spec.ts` | `e708b021a08a1927bd84d7f2fae2084cf6f46784` |
| `lighthouserc.cjs` | `f88d6396f7722f8ebc356fbb0c9c031862f11351` |
| `docs/experience/testpulse-evidence.json` | `2f0c1cfe7885685c4fb89aace406d4603d14d64e` |

The source material assets reviewed are `passage-chrome-surface.png` blob
`bd14495e45af4a72d8cf0728cc43fbb8ca85a88d` and
`passage-studio-reflection.png` blob
`d2188cbc5ec6024fda9e374bacc44dc05938ab60`, with retained generation provenance.
They are conceptual rendering assets, separate from the QA observations.

### Evidence and runtime boundaries

The retained raw TestPulse export has SHA-256
`7eef058c1467af41eae32480a367e142f24c44758be46a96866be354e55380a9`, matching
the evidence manifest. Its selected booking-lifecycle observations are runs
1220, 1224, and 1364, with pass, fail, and pass statuses on the same recorded
commit. The page preserves their timestamps and unknown retry counts, and
distinguishes the 81-observation detail timeline from the 50-run metric window.
It does not infer a repair, root cause, or retry from this sequence. This is
verification against the retained public snapshot, not a fresh live-source
verification.

The complete evidence, work link, resume link, and comparison links remain
semantic static HTML. Native scrolling and fragment navigation do not depend
on scene readiness. The original homepage is unchanged, and the preview is
marked `noindex`. Reduce Motion, no JavaScript, unavailable WebGL, import
failure, and context loss retain the readable fallback.

Astro generates WebP assets and passes only their URLs to the island. The
desktop and motion media boundary precedes hydration; a second eligibility
check precedes the dynamic Canvas import. Pending activation settles scrolling
for 150 ms, while offscreen, hidden-document, and media changes deactivate
immediately. Timers, observers, listeners, stale imports, and the invalidation
hook have cleanup paths. Mobile has no live Canvas.

The rebuilt scene uses demand rendering, maximum DPR 1.25, two transmission
materials with 256-pixel targets and two samples, and no continuous capture
loop. Color and data textures are separate owned clones; cached loader sources
are left intact, and the clones are disposed on unmount. The installed rendering
helpers own their transmission targets and restore the supplied environment.
No dependency or runtime data-fetch boundary was added.

### Resolved concerns and verification limits

The initial reading-position concern is resolved: JavaScript now owns the
opening's extra motion height, captures the evidence position before changing
it, and restores that position on live preference or desktop-boundary changes.
CSS media queries no longer resize that extra height before the capture. Once
revealed, the evidence remains revealed across reconfiguration.

The retained rebuilt matrix had 47 passes, six inapplicable desktop-only skips,
and one WebKit native-scroll failure. That failure stopped inside Playwright's
inspector auto-scroll before dispatching the CTA click; it did not establish an
application root cause. The retained geometry diagnostic found the CTA fully
visible, with its anchor as the hit target and `data-ready=false`. Native
pointer activation reached `#evidence` with its top at 64 pixels. Locator and
WebGL-unavailable diagnostic cases also reached the target.

The final native-navigation test first requires full viewport intersection,
then uses the supported [`scroll: 'none'` click option](https://github.com/microsoft/playwright/blob/main/docs/src/api/params.md#input-scroll).
It retains actionability and hit testing, real pointer activation, and the
fragment and viewport assertions, without a scene-readiness wait. The prior
failure artifacts remain evidence of the intermittent inspector stall. The
renderer test additionally requires zero console errors and page errors, so
successful draw calls cannot conceal a shader or runtime failure.

The parent reports the final affected matrix completed in 44.1 seconds with
12 passes, six inapplicable skips, and zero failures across 18 registrations.
It reran native navigation in all nine engine/viewport combinations and the
strengthened actual-renderer test in all three desktop engines. The other
36 registrations from the rebuilt matrix were unchanged and green; this was
an affected rerun, not a new complete 54-registration run. The parent also
reports type checking of 36 files with zero diagnostics, lint, and the 20-page
build passing. There were no retries or threshold changes. This reviewer did
not launch a browser or repeat these checks.

Technical approval leaves the visual rebuild disposition in force. Mobile
action clearance is resolved in the visual report, while desktop materials,
slot treatment, and navigation remain below the selected composition. Full-tree
CI, mobile Lighthouse, and final preview acceptance are separate outstanding
gates. No production merge or release is authorized by this report.

## Continuous artwork prototype: source delta review

Date: 2026-10-24. Reviewed range:
`6a46f0be197b2b3d2cb5cbb866ee06c413bcf17b` through
`4a2784ba429fc91c1ea9fe24418bef11c071e026`, including application commit
`70aff97b980c09fc3cb3b971ff67abc4a44d0209`. The current brief, storyboard,
D-017, verification record, and retained browser report supplied the scope and
verification context. This review covers source and CI semantics only.

**Findings: no unresolved Critical or Required source blocker. Technical source
approval applies to the isolated preview.** The owner-authorized artwork
treatment replaces the rejected renderer; fresh visual acceptance, current
performance measurements, and hosted verification remain separate gates. This
report does not authorize a production merge or release.

### Exact reviewed blobs

| File | Git blob |
| --- | --- |
| `src/pages/experience.astro` | `a779ce2f3e64ebc9d4a7aaaa452b99a833e5dfaf` |
| `src/scripts/experience-motion.ts` | `15b25608834657aaf5ea7beb0574e8f6876479cc` |
| `tests/experience.spec.ts` | `92ea5c8f295bc4efdf0dfec9f56f64806149982a` |
| `.github/workflows/quality.yml` | `d7f14d1fc182a32335b3a01e8eb1a827947515e3` |
| `docs/briefs/experience.md` (working tree) | `fe74938041fa7d22933b848ab7bb205d43b59d3a` |
| `docs/experience/storyboard.md` (working tree) | `0be4b126459a59d4d13d9df62047d30f0b16ff4a` |
| `DECISIONS.md` (working tree, D-017) | `5298b5ef0aca274ab6621212781934ccb26e860a` |
| `docs/verification.md` (working tree) | `33f08abc035ef8b2f123270b24986634f6d9cfda` |

The selected artwork remains `assets/plates/passage-material.png` blob
`e9e41d11794aee115b2bf1d91c45716b4027e1b1`, with upper and lower cutouts
`024a9a223d19830017eee9c51ec9272f818202b8` and
`fdd4597d74c8294458b08cd5470306f55047c662`. The earlier evidence-data review
continues to apply: `experience-history.ts` remains
`c3e8ab4d9d6967c36f9b50bdef924bfa767086aa` and its manifest remains
`2f0c1cfe7885685c4fb89aace406d4603d14d64e`.

### Correctness, lifecycle, and resource handling

The source removes `PassageIsland.tsx`, `PassageCanvas.tsx`, both abandoned
material maps, and their sidecars. There are no remaining source imports of
those components or maps. The experience motion module no longer imports or
writes the shared inspection state. The homepage's inspection components,
animation module, dependency declarations, and lockfile are unchanged in this
range. Dependencies still needed by that homepage are correctly retained.

Desktop uses one complete image element with bounded scale and reading-shade
changes. Mobile keeps the existing alpha cutouts with bounded transforms. The
decorative layers cannot capture pointer input, and semantic content, native
fragment actions, the resume link, and the evidence record remain in HTML.
Removing the prototype renderer also removes its import, texture, transmission
target, context-loss, and renderer-lifecycle responsibilities from this route.
No replacement renderer, dependency, data request, or continuous animation loop
was introduced.

GSAP remains tied to native scroll. Its context reverts on preference or desktop
boundary changes and on nonpersisted page exit; the media listeners have matching
cleanup. JavaScript still owns extra opening height and retains the evidence
position when reconfiguring it. Completed history reveals remain complete.
Reduce Motion and no-JavaScript states retain the complete readable study.

### Regression evidence and CI allowance

The retained `.research/experience-study/layered-browser.json` has SHA-256
`33d95778a06f721073b781d9dd2bc04c73bfae24ec0f72e0df3633532d2ae852`.
Its six tests run in each of nine engine/viewport configurations: 54 expected
passes, zero skips, unexpected failures, or flaky results, and every retry index
is zero. Duration is 87.3 seconds. This review consumed the report without
rerunning it.

Replacing the removed feature's desktop-only renderer test with artwork motion
coverage is appropriate to the new implementation. The replacement requires
loaded artwork, a changed pose after native wheel input, stable styles at rest,
an exact return to the initial pose, no Canvas or renderer requests, and zero
console errors or page errors. The other tests retain native forward/reverse
scrolling, immediate CTA activation, deep links, live preference and reading
position behavior, no-JavaScript and WebGL-unavailable paths, serious/critical
axe findings, and narrow reflow. The selected desktop image must have one
resource-timing entry; that assertion is not a transfer-byte or mobile
performance measurement. The verification record reports type checking of
34 files with zero diagnostics, lint, and the 20-page build passing.

The workflow delta changes only the job allowance from 25 to 35 minutes. The
parent supplied GitHub's annotation, "The job has exceeded the maximum execution
time of 25m0s". Retained installation log timestamps independently span
20:07:28.539 to 20:26:21.191 UTC, approximately 18 minutes 53 seconds. The parsed
summary for run `40016674543` records 172 browser passes, 18 inapplicable skips,
zero failures or flaky results, and only 11 of 18 Lighthouse reports before
cancellation during performance collection. This supports a bounded job-time
increase. Browser/test timeouts, retries, tested scope, acceptance thresholds,
permissions, event triggers, and artifact retention are unchanged.

That cancelled run and the earlier performance measurements belong to the
rejected renderer snapshot. They do not establish a green pipeline or a current
performance result for this artwork treatment. Fresh full visual review,
performance measurements, and hosted checks remain pending. This reviewer
opened no browser or screenshot, ran no tests or workflow, and changed only
this technical report.

## Final motion corrections and responsive artwork delivery

Date: 2026-10-24. Scope: the working-tree source delta over
`4a2784ba429fc91c1ea9fe24418bef11c071e026` in the three files below.

| File | Reviewed Git blob |
| --- | --- |
| `src/pages/experience.astro` | `dcd77dd28e9414fc1bf104a4b279139a1b5671da` |
| `src/scripts/experience-motion.ts` | `7379acbc1fe5c1c43f1b33ae3ddd00fa24f64c39` |
| `tests/experience.spec.ts` | `884ccbbb25c239e978696048e30c80e72cb8a53e` |

**Technical source verdict: approve for isolated preview, with the Optional
boundary note below. No Critical or Required source blocker was found.** This
does not clear the pending delivery matrix, performance gate, hosted checks,
physical-device acceptance, or production authorization.

The bounded title/subtitle offsets and introduction color transition use the
existing scroll timeline and context cleanup. Tablet cutout positioning remains
decorative and absolute. These changes add no listener, loop, dependency, state
boundary, or layout-height owner. The visual reviewer reports the three named
corrections resolved; this source review did not rescore them.

The delivery correction retains the same decoded artwork, responsive variants,
dimensions, and styles. The mobile upper image is eager with high fetch priority;
the lower image is eager with ordinary priority. Each picture places its inactive
data source before the optimized image, so native source selection can suppress
the unused artwork without JavaScript. The built HTML preserves that ordering,
the percent-encoded source, intrinsic dimensions, and loading/priority attributes.
Responsive source selection remains native when the viewport changes.

The constant one-pixel SVG has no script, external resource reference, or user
input. Its namespace declaration is not a resource request. The repository's
Vercel headers, Astro configuration, and shared layout declare no CSP that would
block `data:` images; no policy is weakened by this patch. Any additional hosted
policy remains part of hosted verification.

### Optional: close the fractional media-query interval

The inactive sources use `max-width: 1023px` for the full plate and
`min-width: 1024px` for the cutouts. A fractional CSS viewport width strictly
between those values satisfies neither query, allowing all three pictures to
select real artwork. The nine integer viewport configurations do not cover that
zoom/resize edge. If zero inactive downloads is required across fractional
widths, use complementary range queries aligned with the corresponding CSS
visibility rule. This is a narrow resource issue, not an observed functional
failure in the supplied matrix.

### Retained results and open acceptance gate

The pre-delivery visual-fix matrix in `layered-final-browser.json` records
54 passes, zero skips, unexpected failures, or flaky results, and retry index
zero for all registrations. It does not verify the later delivery patch or
the latest network assertions. Those assertions extend the existing motion
test with no unused cutout requests on desktop and no full-plate request on
mobile; the renderer exclusion, motion, reverse, idle, and error checks remain.

The retained pre-priority Lighthouse reports identify `.passage-upper` as LCP
with lazy loading and no high-priority hint. One report attributes approximately
1201 ms to load delay. Median LCP is 2556.6769 ms, exceeding the unchanged
2499 ms gate, despite median performance 96 and CLS approximately 0.000124.
This failing measurement remains visible. Eager loading and priority directly
address its discovery finding, but only new measurements can establish whether
the gate now passes. The delivery-focused full matrix, three Lighthouse runs,
and lint after the latest test edit are pending at this review checkpoint.
No browser, screenshot, workflow, test, or Lighthouse run was started by this
reviewer; only this report was edited.

## Active artwork sources: delivery correction and query resolution

Date: 2026-10-24. The corrected page blob is
`34a7e7fbf82d94b77cc270ae3177425b315b455d` for
`src/pages/experience.astro`. It supersedes the delivery markup in page blob
`dcd77dd28e9414fc1bf104a4b279139a1b5671da` above. The reviewed motion and test
blobs remain `7379acbc1fe5c1c43f1b33ae3ddd00fa24f64c39` and
`884ccbbb25c239e978696048e30c80e72cb8a53e`.

**Technical source verdict: approve for isolated preview. The Optional
fractional-width finding is resolved, with no new Critical or Required source
blocker.** Runtime and performance acceptance of this exact markup remain
separate gates until their new results are available.

The retained `delivery-initial-browser.json` records 53 passes and one failure
in the WebKit desktop artwork test. The empty SVG was selected, but the browser
still requested the real upper and lower WebPs exposed on the fallback image.
This is a real resource-loading failure in the earlier pattern; a selected
`currentSrc` alone did not establish that unused requests were absent.

The correction obtains WebP variants at build time using `getImage`, places
their `srcSet.attribute` values only on the active picture sources, and gives
each fallback image only the inert SVG. There is no real URL or `srcset` on
those fallback images. The inspected generated HTML contains the intended
640/1024/1536 desktop widths and 640/1024 cutout widths, original image dimensions,
empty alternative text, eager loading, high priority for the plate and upper
cutout, and asynchronous decoding. The lower cutout retains ordinary priority.
It introduces no client code, data fetch, listener, or dependency.

The compact source condition is now `width < 1024px`, matching its CSS visibility
rule and complementing desktop `min-width: 1024px`. This removes the previous
fractional interval and keeps selection aligned with layout on resize. The
inert SVG and repository CSP assessment above remain applicable.

The parent reports type checking of 34 files with zero diagnostics, lint, and
build passing. Focused WebKit verification, the final 54-registration matrix,
and three current-source Lighthouse runs are pending at this checkpoint. An
earlier priority pattern's improved measurements do not certify this replacement
markup. The original LCP and WebKit failures remain retained. No browser or
duplicate check was launched by this reviewer, and only this report was edited.

## Exact-source local acceptance results

Date: 2026-10-24. The retained final results apply to page blob
`34a7e7fbf82d94b77cc270ae3177425b315b455d`, motion blob
`7379acbc1fe5c1c43f1b33ae3ddd00fa24f64c39`, and test blob
`884ccbbb25c239e978696048e30c80e72cb8a53e` reviewed above.

`source-final-browser.json` records 54 passes across all nine engine/viewport
configurations, with zero skips, failures, flaky results, or retries. It started
at 2026-10-24T11:06:11.422Z and completed in 70.392 seconds. All nine axe/reflow
registrations passed. This includes the strict unused-artwork request assertions
that exposed the earlier WebKit failure.

`lighthouse-source-final-summary.json` records three current-source mobile runs
for `/experience/`: performance scores 98/98/98, LCP values
2266.5714/2259.6771/2255.5207 ms, and CLS 0.0001237531567993509 in every run.
Median LCP is 2259.6771 ms. The unchanged median gates pass: performance at least
90, LCP at most 2499 ms, and CLS at most 0.0999. The parent also reports types,
lint, and build passing at these identities, matching canonical design
fingerprints, and a clean whitespace diff check.

**The reviewed source now has passing local affected browser and performance
acceptance.** The original LCP and WebKit failures above remain retained with
their correction history. Final hosted CI and preview verification are still
pending; this addendum does not authorize production integration or release.
The reviewer consumed the existing result files and appended only this report,
without starting another check, browser, review, or workflow.

## Hosted acceptance results

Date: 2026-10-24. The parent reports successful GitHub run `40089079924` at
`38ea3bedd90cbf8c90a373c9f4b4f2aa63d25ffe`, completing all steps in 8m53s.
Application commit `8731f42` retains the approved source blobs above. Retained
`ci-summary-40089079924.json` and `ci-artifacts-40089079924` record 190 browser
registrations: 178 passes, 12 established inapplicable `portfolio.spec.ts` skips,
and zero failures, flaky results, or retries. All 54 experience checks apply
and pass. All 18 Lighthouse runs completed, and all six routes met the unchanged
median gates. `/experience/` has median performance 99, LCP 1959.1771 ms, and
CLS 0.000124950481895; the homepage has performance 99 and LCP 1587.72575 ms.
The other four routes score 100 with median LCP from 1355.96625 to 1356.94485 ms.
Every route's median CLS is below 0.1.

Vercel Preview deployment `7297844824` succeeded at the same commit. The parent's
browser smoke at 729x797 and 1440x1000 confirmed active artwork, `noindex`, native
scroll motion, the evidence fragment at 64 px, comparison navigation to the
homepage, and resume link/download-filename attributes. This smoke does not add
a PDF-transfer or physical-iPhone verification claim. Hosted CI and preview
verification are now complete within that scope. Technical approval remains
for the isolated prototype only; production integration and release are outside
this approval. This note records supplied results without a new check or review.

## D-018: continuous TestPulse arrival source review

Date: 2026-10-24. Scope: the working-tree delta over `371ae38`, using D-018
and the current experience brief. Technical review only; no aesthetic scoring.

| Reviewed file | Git blob |
| --- | --- |
| `src/pages/experience.astro` | `6bad7224264ea68825134ef281529270f9c1eb34` |
| `src/scripts/experience-motion.ts` | `ba858786084069df161c9e479018940a22b4d713` |
| `tests/experience.spec.ts` | `a0540d821f1c66a12ef971c21b91bcc083ec0a4e` |
| `DECISIONS.md` (D-018) | `7707b6ecbc681083513e50f099f41338644facce` |
| `docs/briefs/experience.md` | `8218cbc6b4b92494f2a2d36dfab52ed538391f50` |

**Required, P2 (resolved below): restore the unique descriptor in compact static and Reduce
Motion layouts.** The compact `.passage-project-summary` rule unconditionally
sets `opacity: 0`. Its only restoration is the normal-motion timeline's
`autoAlpha: 1` tween. The previous visible descriptor in `.evidence-intro` was
removed, so no JavaScript, initial Reduce Motion, live Reduce Motion reversion,
or motion-import failure leaves a visible copy of "Test observability & flake
detection" on compact viewports. Scope its initial hidden state to active motion
or provide its visible static layout, and assert that state in the static and
Reduce Motion regression coverage. This conflicts with D-018's complete fallback
contract. Source approval was held for this correction at those reviewed blobs.
No Critical finding or other confirmed Required source blocker was found.

The remaining structure uses one linked TestPulse heading and one descriptor,
with a single native-scroll arrival timeline and a separate once-only history
reveal. `autoAlpha` removes faded hero controls from ordinary focus navigation.
Measured pixel travel, debounced resize, context reversion, evidence-position
compensation, timer cancellation, and matching resize/hash/media listener
cleanup address the changed lifecycle. The empty arrival wrapper cannot
intercept clicks. Structural layout transitions are explicitly disabled.
The optimized active-source artwork delivery, homepage, public evidence,
dependencies, and renderer exclusion remain unchanged.

The consumed `arrival-final-browser.json` records 63 passes across seven checks
in all nine engine/viewport configurations, zero skips, failures, flaky results,
or retries, and a duration of 78.659 seconds from
2026-10-24T13:02:13.156Z. All nine axe/reflow cases pass. These tests do not check
the descriptor's static opacity and therefore do not clear the Required finding.
The four-edge viewport helper's 0.5 CSS-pixel allowance addresses retained
IntersectionObserver precision evidence while preserving full geometric bounds;
it does not relax evidence, request-exclusion, or reading-position assertions.
The earlier click interception and tablet reading failures remain retained,
with the affected three-engine resize checks passing after measured travel.
The parent reports 34-file type checking with zero diagnostics, lint, and the
20-page build passing. Current performance/profile work, visual confirmation,
fresh full visual review, and hosted acceptance of D-018 remain separate gates.
PR 4 remains draft and production integration is outside this review. Only this
report was edited; no browser, workflow, or duplicate check was launched.

### Required finding resolved: scoped hidden state

Date: 2026-10-24. The narrow correction was reviewed at page blob
`2645581ebb116a7088d800da42f0cfcdecd2bfd4`, unchanged motion blob
`ba858786084069df161c9e479018940a22b4d713`, and test blob
`0d2ef8977eb90ad517f8a668e9a4cba8a4238faa`.

Compact base styles now leave the unique descriptor visible. Only
`.has-passage-motion .passage-project-summary` starts at zero opacity; context
reversion and removal of that class restore the static state. The existing
no-JavaScript, initial Reduce Motion/axe, and live Reduce Motion tests now
explicitly require descriptor opacity 1. The correction adds no duplicate
element, layout-height change, asset, or lifecycle responsibility.

**Current technical source verdict: approve for the isolated prototype. The
Required P2 finding is resolved; no Critical or Required source blocker remains
at these corrected blobs.** The parent reports 34-file type checking with zero
diagnostics, lint, and the 20-page build passing sequentially. The current
63-check run in `arrival-reviewed-browser.json` remains pending at this source
checkpoint. Earlier results above belong to their recorded identities. Current
performance, visual, hosted, and physical-device acceptance remain separate;
production integration remains outside scope. This resolution used source
inspection only, with no duplicate runtime check or application edit.

### Startup wrapper correction: source approval, measurements pending

Date: 2026-10-25. This bounded D-018 correction was reviewed at these blobs:

| File | Git blob |
| --- | --- |
| `src/pages/experience.astro` | `aeb16f2c39d4e03a40dfa10a924cdf43d2154c9c` |
| `src/scripts/experience-motion.ts` | `3a67322cdfdc51cd574f9af94f2017f3877bf825` |
| `tests/experience.spec.ts` | `d57a9a5e1ea9e8e6ee1d46bbce8a8542dd4f6036` |
| `DECISIONS.md` | `cb8b343c5d3e6dbaf2f2e874411c82c469a31998` |

**Technical source verdict: approve for the isolated prototype. No new Critical
or Required source blocker was found.** Enhanced-only `visibility: hidden`
targets the wrapper's visible relocation when its layout becomes absolute.
Visibility preserves measurable destination geometry. The existing timeline
reveals the wrapper with `fromTo` autoAlpha from progress .55 to .85, while only
the copy child translates. The destination markers do not translate. Context
reversion and removal of the enhancement class restore the visible static and
Reduce Motion states. No new asset, dependency, listener, or loop is introduced.

The regression now checks the hidden enhanced start, full wrapper opacity on
arrival, and visible wrapper states without JavaScript and with initial/live
Reduce Motion. The previously consumed descriptor-corrected run is now confirmed:
`arrival-reviewed-browser.json` records 63 passes, no skips, failures, flaky
results, or retries, starting 2026-10-24T13:16:49.169Z and taking 85.145 seconds.
That result belongs to the preceding descriptor-correction identities.

The parent retains the separate pre-wrapper Lighthouse failure: all three runs
score 80 with CLS approximately 0.384377; LCP around 2256 ms passes its gate.
The source change addresses the identified startup state, but does not establish
passing CLS without new measurement. The parent reports sequential check, lint,
and build passing at the current blobs. The new current-source matrix and
performance results remain pending, with visual, hosted, and physical-device
acceptance separate. Production integration remains outside scope. Only this
report was edited; no browser, runtime check, or extra workflow was launched.

### Supplied current-source acceptance results

Date: 2026-10-25. At the startup-correction blobs recorded above,
`arrival-final-source-browser.json` reports 63 passes, zero skips, failures,
flaky results, or retries, starting 2026-10-25T00:00:04.666Z and completing in
67.667486 seconds. All nine axe/reflow cases pass.

The three exact-source mobile Lighthouse runs score 98/98/98, with LCP
2262.0677/2256.4436/2255.8537 ms and CLS 0.0001237531567993509 in every run.
Median LCP is 2256.4436 ms; all unchanged performance, LCP, and CLS gates pass.
Reports are retained in `lighthouse-arrival-corrected` with parsed results in
`lighthouse-arrival-corrected-summary.json`. The previous score-80/CLS-0.384377
failure remains separately retained.

The supplied bounded post-load `arrival-runtime-profile.json` records zero
errors or Canvas elements, 46,899 encoded JavaScript bytes versus 1,467 with
Reduce Motion, and 39 requestAnimationFrame samples per device. Median sample
interval is 16.7 ms; desktop/tablet/mobile p90 values are 33.3/16.7/16.8 ms.
These samples do not certify physical-iPhone or field performance. The single
verification record contains the exact source identities and supplied results.
Fresh full visual review and hosted acceptance remain pending, and production
integration remains outside scope. This note records supplied results only;
no new source review, runtime check, or workflow was performed.
