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
