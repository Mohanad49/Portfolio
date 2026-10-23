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
