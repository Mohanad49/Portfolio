# Final readiness design record

Application source: `b2043e8aa67953e6e625d5fa203b087abda8b9e8`.
Date: 2026-10-27. This is an ordinary extension of the owner-accepted D-020
inspection monograph. The final corrections change opening preparation and
reading-position handling. They preserve the accepted visual world, composition,
factual copy, source artwork, design tokens, and component previews.

## Authority and evidence inspected

The documenter read Impeccable's complete `reference/document.md`, PRODUCT.md,
DESIGN.md, `.impeccable/design.json`, the home, archive, case-study and experience
briefs, D-020 and D-021 in DECISIONS.md, and the earlier D-020 design record.
Impeccable context had already run in the session and was not repeated.

The source comparison covers the application changes after the prior completed
design documentation at `97952b7`, including `astro.config.mjs`, BaseLayout,
PassThrough, MotionLoader, the reading-position helper, and both GSAP
initializers. The shared material component, global styles, and affected history
test definitions were also inspected. Reading a test definition does not establish
its execution result; technical validation remains in `docs/verification.md`.

The supplied independent finish review at
`docs/experience/final-readiness-visual-review.md` returns `ship` for application
`b2043e8`. It reports opening all 22 images listed in
`.impeccable/review/final-readiness/capture-manifest.json` and finding no material
fix within that visual scope. This documenter separately parsed the manifest and
checked every PNG header against its declared width and full-page or viewport
dimensions. Visual judgment is consumed from that independent review.

The set contains 14 complete reduced-motion documents: homepage, archive, all
three case studies, focused study, and 404 at both widths. Eight additional
normal-motion homepage stills cover the hero, arrival, Cal.diy, and LLM states at
both widths. Desktop viewports are 1440 by 1000; compact viewports are 390 by 844.
Full-document captures extend below those viewport heights as expected.

## Preserved design system and previews

DESIGN.md remains the normative token record and `.impeccable/design.json`
remains its extensions-only sidecar. Both files are byte-identical to `97952b7`.
No refresh or regeneration is needed for this extension, and neither file is
written by this handoff.

The graphite, warm-white, amber, stone, and paper roles retain their source
values. Alexandria Variable display and Manrope Variable body keep their existing
sizes, optical compact adjustments, weights, tracking, and reading hierarchy.
Shared gutters, section rhythm, square evidence surfaces, action radius, focus
treatment, and native document-transition timings remain intact. Depth continues
to come from the approved chrome/glass artwork, tonal fields, and fine rules;
there is no new CSS shadow vocabulary.

The Pass Through opening and single linked TestPulse arrival remain the accepted
composition. Cal.diy retains its complete gate, LLM its paired prisms and central
gap, and the archive its fan and pivot. Reserved material bounds, quiet case
prose, compact normal flow, chapter-fit rules, direct actions, and the real
portrait retain the incumbent treatment. The optional Approach renderer keeps
its explicit visitor request and existing support gates.

All ten sidecar component objects remain unchanged, including their HTML and CSS:
primary and secondary actions, copy-email action, inspection reset, editorial
link, navigation, archive radio filter, inspection range, evidence panel, and
experience disclosure. The nine color metadata entries and ten typography
metadata entries remain unchanged. Synthesized tonal ramps remain preview
swatches rather than source palette tokens.

Two already-disclosed preview discrepancies remain visible:

- The archive filter preview says `All 7`; current source contains six frameworks.
- Primary and secondary action previews use line height `1.2`; source actions
  inherit `1.65`.

These are retained preview drift. They do not establish new content or type
rules. The canonical record's extraction commit and the sidecar's generation
timestamp continue to describe their earlier extraction; this additive record
documents the current behavior without rewriting that history.

## Current opening preparation

Astro now uses `build.inlineStylesheets: 'always'`. This changes delivery of the
existing stylesheets, with no change to their declaration values. BaseLayout
preloads the local Latin variable WOFF2 files for Alexandria and Manrope.
`critical-fonts.ts` still shares the explicit Alexandria 700 and Manrope 400
preparation promise between the opening and general motion.

Below 1024px, the opening's upper and lower cutouts prefer AVIF at quality 70
with 640- and 1024-pixel candidates. WebP at quality 85 remains the fallback.
Desktop retains its existing continuous WebP plate. This codec change applies to
PassThrough's compact opening only. Shared MaterialField artwork, including
case-study layers, the gate, prisms, and fan, remains WebP. The original plates,
silhouettes, alpha, sizing, and material placement remain the same.

A subsequent functional correction at `17d6260` delays general motion import
and setup until the evidence sequence is within 1.5 viewport heights. It first
waits for opening preparation, preserving the existing 1600ms failure bound.
A temporary passive scroll/resize check handles native jumps and restored
positions, then removes itself. Pages without the opening and explicit fragments
prepare immediately. Two animation frames precede general initialization;
non-persisted exit removes pending listeners and cancels queued frames. This
changes preparation timing without changing the approved layout or timelines.
The initial record above and 22-image verdict keep their original source identity;
the eight affected normal-motion endpoints were captured again at `17d6260`.

The existing identity-based readiness field retains its supported first-desktop-
navigation conditions, no minimum delay, 1600ms ceiling, and immediate interaction
release. It does not wait for the optional renderer. These source changes do not
establish a universal load time or frame-rate guarantee.

## Native history and reading checkpoints

The opening initializer distinguishes a fresh navigation from reload or
Back/Forward restoration. Before initialization completes, wheel, touch, pointer,
or key input prevents the initial bookmark or saved-position correction from
overriding that new action. A fresh, untouched evidence bookmark can settle after
font and image preparation. Later fragment navigation uses the browser's native
behavior. The opening's story disables scroll anchoring locally while its
enhancement changes the document height.

On opening-bearing documents, the normal-motion initializer adds a small
`portfolioReadingPosition` checkpoint to the current native history entry after
scrolling settles and immediately before link navigation. It merges with an existing object state and
records finite x/y coordinates plus viewport width and height. It uses
`history.replaceState`; no client router or replacement scroll system is added.
Unavailable or unsuitable state retains the native path.

Reload/Back initialization and later history traversal can restore a matching
checkpoint after layout over two animation frames. The saved viewport dimensions
must exactly match the current viewport. Every traversal first cancels any queued
restore, including a traversal whose entry has no usable checkpoint. Wheel,
touch, pointer, and key input also cancel a pending restore. This cancellation
order is the final `b2043e8` correction.

Both motion initializers clear ScrollTrigger's remembered scroll state with
`auto`, retaining native restoration. Persisted history keeps the configured
contexts and listeners; non-persisted exits cancel pending work and dispose the
reading helper before stopping motion contexts with `kill(false)`. This final
`c9dead3` exit correction avoids writing history or restoring the discarded
document's styles. Live preference/size changes still use `revert()` normally. This checkpoint enhancement is
scoped to documents using the Pass Through initializer. Static and reduced-motion
paths retain the complete content and native navigation.

## Acceptance limits and handoff boundary

The current visual verdict covers the supplied desktop and compact compositions,
route readability, complete material junctions, and visible compact AVIF quality.
It does not establish physical-device behavior, Windows/GPU performance,
continuous playback, every intermediate motion pose, or functional link targets.
Historical D-020 temporal and reproduction evidence keeps its original scope.
Current technical and hosted acceptance belongs to `docs/verification.md`.

This handoff writes only `docs/experience/final-readiness-design-record.md`.
Canonical design files, previews, application source, artwork, tests, and other
documentation are preserved. No browser session, capture, detector, test run,
commit, deployment, or production replacement is performed by the documenter.
