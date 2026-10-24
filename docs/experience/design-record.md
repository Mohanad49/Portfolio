# Pass Through: prototype design record

## Overview

Documentation snapshot: 2026-10-24, Cairo. This record describes the isolated
`/experience` prototype within the existing **Exhibition plinth and inspection
monograph** identity. The owner selected **B: Pass Through** on 2026-10-23, then
viewed and rejected the hosted renderer and explicitly authorized preserving B
as cinematic artwork. D-017 in `DECISIONS.md` and
`.impeccable/experience-selection.json` record that treatment decision. It is
settled for this prototype. Production integration remains unauthorized.

Desktop now preserves the exact continuous, text-free B plate and advances
through native scrolling toward its existing aperture. Mobile retains the
approved transparent upper and lower cutouts. Text, actions, and the TestPulse
evidence remain HTML. There is no prototype React island, canvas, material-map
loader, or React Three Fiber scene. The original homepage retains its separate
inspection renderer and is outside this change.

**Latest visual disposition: scoped `ship`.** The full layered-artwork review
in `docs/experience/visual-review.md` initially returned `fix`; its exact initial
text is preserved in `docs/experience/visual-review.layered.initial.md`. The
appended scoped verdict resolves those three named findings:

| Finding from the full review | Scoped result |
| --- | --- |
| Moving project summary crosses the foreground beam | Resolved. Start, middle, and end captures retain the caption inside the dark aperture. The reviewer reports approximately 8:1 contrast from adjacent end-pose samples. |
| Moving introduction meets an illuminated slab | Resolved. The middle/end introduction uses existing warm-white ink; the reviewer reports approximately 7.45 to 8.27:1 at the previously problematic area. |
| Lower boundary is absent or too thin at 729/tablet widths | Resolved. The 729×797 and 834×1112 captures again show a substantial lower amber boundary with project-title clearance; the 390-wide composition is retained. |

The basis is the full layered review plus the appended resolution of these
three fixes. This is not a new independent review of every surface. The static
hero and final comparison scores (`0.9419` and `0.942`) support static fidelity;
they do not prove temporal smoothness or replace the scoped moving-pose review.
The two renderer reviews remain historical rejection evidence in
`docs/experience/visual-review.initial.md` and
`docs/experience/visual-review.renderer.md`; they do not describe the current
artwork implementation.

The final delivery correction reuses the same optimized artwork, geometry,
and timeline. Retained visual captures precede that correction. The handoff
reports type/lint/build passing at this source and the earlier recovered 54-pass
visual-fix behavior matrix. The later exact-source delivery and performance
results are recorded in `docs/verification.md`; this design snapshot does not
independently certify those checks.
This pass ran no browser, tests, detector, or performance measurement and did not
inspect video. Physical iPhone smoothness, launch readiness, and a production
release are not certified.

Canonical `DESIGN.md` and `.impeccable/design.json` are unchanged. This ordinary
extension records local values without promoting them into global tokens or
regenerating canonical previews. The sidecar's synthesized OKLCH ramps remain
non-normative swatch previews, not source colors for this prototype.

### Evidence checked and retained metadata drift

| Evidence read | Authority or limit |
| --- | --- |
| `PRODUCT.md`, `AGENTS.md`, `DESIGN.md`, `.impeccable/design.json` | Existing identity, factual boundaries, palette, typography, and workflow ownership. |
| `docs/briefs/experience.md`, `.impeccable/surfaces/src-pages-experience-astro.md`, `.impeccable/experience-selection.json`, `DECISIONS.md` D-017, `docs/experience/storyboard.md` | Owner-selected B and subsequent artwork strategy, isolated scope, first viewport, and responsive intent. |
| `src/pages/experience.astro`, `src/scripts/experience-motion.ts`, `src/data/experience-history.ts` | Current semantic page, actual local type/geometry/reading fields, native-scroll timeline, responsive image delivery, and frozen observation data. |
| `.impeccable/build/spec.json`, `.impeccable/build/state.json` | Measured 1536×1024 comp, ten region records, retained static gates, phase history, and older annotations. |
| `docs/experience/visual-review.layered.initial.md`, `docs/experience/visual-review.md`, the historical renderer reports | Full layered review and its three resolved findings, with superseded renderer failures retained explicitly. |
| `.impeccable/review/experience/capture-manifest.json` | Sixteen named PNG records, static/moving dimensions, full-page flags, treatment `cinematic-layered-artwork`, capture time `2026-10-23T21:27:02.336Z`. |
| The artwork and concept sidecars under Shapes; `docs/experience/testpulse-evidence.json` | Generated-art provenance and approval scope; recorded observation provenance, not a new live-export audit. |

The scoped reviewer reopened all sixteen required PNGs. This documentation
pass read that review and the manifest without repeating the image inspection.
The manifest retains 1536×1024 comp, 1440 desktop, 1280 full, 834 tablet,
729-wide, 390-wide, live start/middle/end, evidence, and static-fallback records.
Its historical `webgl-fallback.png` filename now identifies an artwork capture;
WebGL is no longer a dependency of this route. The desktop/mobile manifest
entries report zero canvas elements and no renderer requests for that captured
build, not fresh request validation of the later picture-source correction.

The build state now closes the review phase and records
`finish.disposition: ship`, corresponding to the scoped visual verdict dated
2026-10-24 in Cairo. Its note keeps delivery/performance verification pending.
Existing metadata drift remains in the measured spec's optional-3D plate note
and the detector's project-title/summary annotations. The full reviewer accepted
that lettering and ink as semantic, readable adaptations. The current source,
explicit owner decision, and appended scoped verdict establish the treatment
and visual disposition. The older annotations neither reinstate the renderer
nor authorize changing readable HTML to match a blurred or low-contrast sample.

## Colors

The prototype inherits graphite (`#171515`), warm white (`#f8f2e9`), muted stone
(`#b3ada4`), amber (`#ffc368`), warm rules (`#49433b`), and reading stone
(`#d5cec4`) from the established system. The opening's local values are:

| Value | Actual use |
| --- | --- |
| `#161514` | Opening field. Chrome, amber volume, and reflected light are part of the original conceptual raster. |
| `linear-gradient(#141312e6, #14131200)` | Header reading field, scoped to a body containing this prototype. |
| `linear-gradient(90deg, #111110f2, #111110b8 30%, #11111000 68%)` | Localized left reading shade. It leaves the right-hand material visible instead of dimming the entire image. |
| `#b3ada4` to `#f8f2e9` | Desktop introduction moves from supporting ink to the existing warm-white ink over `.35` of the scroll timeline. The project summary retains muted ink within the aperture. |
| `linear-gradient(145deg, #ffd17d, #f4a938)`; hover `#ffda98`; text `#17110a` | Existing primary action treatment. |
| `#19171470`; border `#b1a492`; hover `#393027` | Existing outlined Resume treatment. |
| `#d2c6b5`; failed stroke `#f0a091` | Local SVG status colors, paired with tick/cross shapes and explicit Passed/Failed text. The failure tint does not create a global accent family. |

There is no new material-color palette, tonal scale, light rig, or shader
parameter set for this route.

## Typography

Alexandria Variable remains the display family; Manrope Variable remains the
body/control family, each with its established sans-serif fallback. Inherited
body text uses `400 1rem/1.65`; headings retain close tracking (`-.04em`). Local
optical sizes remain specific to this composition.

| Role | Desktop | Responsive variants |
| --- | --- | --- |
| Opening statement | `7.95vw`, weight `700`, line height `.9`, horizontal scale `.93` | Below `1024px`: `clamp(2.3rem, 8.3vw, 5rem)`, line height `1`; up to `600px`: `clamp(2rem, 9.1vw, 3.5rem)`; at least `1800px`: `9rem`. |
| Role / introduction | `1.82vw` / `1.48vw`, line height `1.3` | Below `1024px`: `1.25rem` / `1rem`, introduction line height `1.5`; up to `600px`: `1.1rem` / `.95rem`; at least `1800px`: `2rem` / `1.5rem`. |
| Opening actions | `1.25vw`, weight `600` | Below `1024px`: `.9rem`; up to `600px`: `.85rem`; at least `1800px`: `1.2rem`. |
| Slot title / summary | Title `5.7vw`, weight `700`, line height `1`, horizontal scale `.95`; summary `1.48vw`, line height `1.3` | Below `1024px`: title `clamp(3rem, 10vw, 6rem)`, summary hidden; up to `600px`: title `3.3rem`; at least `1800px`: summary `1.5rem`. |
| Semantic TestPulse heading | `clamp(4rem, 8vw, 9rem)` | Below `1024px`: `clamp(3rem, 11vw, 6rem)`; up to `600px`: `3.3rem`. |
| Observation status | `600 clamp(1.5rem, 2.8vw, 3rem)/1.2` in Alexandria | Up to `600px`: `1.7rem`. Run IDs, dates, and commit code use tabular numerals. |
| Evidence explanation / scope note | `1.075rem`, maximum `56ch` / `.85rem` | Explanation becomes `1rem` up to `600px`. |

The crisp slot lettering is real HTML with `aria-hidden` on its decorative
wrapper. The following TestPulse heading is semantic and readable in document
order. Generated lettering and blur are not embedded in the runtime artwork.

## Layout

The opening frame is full width, isolated, and clipped, with `height: 100svh`
and minimum height `720px` (`740px` below `1024px`). The inherited page gutter
remains `clamp(1.25rem, 3.58vw, 5rem)`. Unscripted and reduced-motion markup
retains this static frame without the enhanced scroll region.

Desktop artwork is one uncut `3 / 2` field, centered with `left/top: 50%` and
`translate(-50%, -50%)`. Its width is `max(100%, 150svh, 1080px)`. The full
plate fills that field; its push origin is `76% 69%`. No artificial horizontal
split, new camera angle, or reconstructed material surface is introduced.

Desktop headline starts at top `6.7vw`, left `3.2%`. Role and introduction
start at `26.3vw` and `29.15vw`, left `3.5%`. Actions start at `34.9vw`, with
work/resume left positions `3.5%` / `18.1%`, widths `13.67%` / `8.99%`, and
height `4.16vw` with a `44px` minimum. Slot title starts at left `66.4%`, top
`62.5%`; summary starts at `calc(62.5% + 5.7vw + .35rem)`.

With motion active, the opening uses `200svh` / minimum `1440px` on desktop
and `145svh` / minimum `1073px` below `1024px`. Its frame becomes CSS sticky at
`top: 0`; scrolling itself remains native. The source targets approximately one
additional desktop viewport and `.45` of a mobile viewport, subject to minimum
heights. These source values are not a physical-device travel measurement.

Above `600px` and below `1024px`, the header returns to flow and the compact
artwork field uses:

- Cutout width `min(165vw, 123svh)`, left `3%`.
- `--passage-upper-top: max(41%, calc(38% + 4rem))`, keeping the upper assembly
  below the action region.
- `--passage-slot-top: max(73%, calc(var(--passage-upper-top) + min(46.2vw, 34.44svh)))`.
- Both lower-cutout top and project-title top reference that reserved slot. The
  assets' alpha margins determine their visible edges; CSS top is not a claimed
  measured edge position.

At widths up to `600px`, the established portrait crop remains: cutout width
`215%`, left `-12%`, upper/lower tops `43%` / `72%`, project title top `70%`,
and action row top `35%`. Compact actions use at least `48px` height with
`.85rem 1.2rem` padding, changing to `.75rem 1rem` on the smallest layout.

Evidence intro, conclusion, and comparison use two columns with `8%` gaps,
stacking below `1024px`. Three observations use three columns and `2rem` gaps;
below `601px` they become a vertical list with `2.5rem` gaps and a vertical
connector. Work targets `#evidence` directly, Resume remains a direct download,
and comparison links point to `/` and `https://myehia.vercel.app/`.

## Elevation & Depth

Flat page fields, one-pixel rules, and space retain the editorial structure;
there is no local CSS box-shadow vocabulary. The conceptual image supplies the
chrome, transparent amber, reflected detail, and physical depth. Desktop motion
pushes into that existing image aperture; it does not claim simulated optical
transmission. Mobile moves two independently generated alpha cutouts.

### Reading fields

The localized shade starts at opacity `0`, except desktop frames with a minimum
aspect ratio of `8 / 5`, which start at `.65`. During the desktop timeline it
reaches `.9`. Its gradient fades to transparency by `68%` of the horizontal
field. The introduction transitions to existing warm-white ink, and title and
summary move upward into the aperture. These source treatments correspond to
the three resolved reading/enclosure findings; the measured contrast figures in
Overview belong to the scoped review, not a fresh calculation in this pass.

### Local motion values

GSAP and ScrollTrigger own the DOM timeline. There is no shared scene-progress
bridge in this prototype. Trigger is the opening; start is `top top`, end is
`bottom bottom`, scrub is `.2`, with refresh invalidation. The sequence is
reversible through native scrolling. Timeline positions and durations below
are relative choreography, not a forced viewing time.

| Target | Implemented motion |
| --- | --- |
| Desktop continuous plate | Scale to `1.22`, duration `1`, linear ease, start `0`; existing aperture retained at the `76% 69%` origin. |
| Desktop reading shade | Opacity to `.9`, duration `1`, linear ease, start `0`. |
| Desktop introduction | Color to `#f8f2e9`, duration `.35`, linear ease, start `0`. |
| Upper compact cutout | Vertical travel `-12%` up to `600px`, otherwise `-4%`; horizontal travel `4%`; rotation `2deg`; duration `1`, start `0`. |
| Lower compact cutout | Vertical travel `65%`, horizontal travel `-3%`, rotation `-2deg`; duration `1`, start `0`. A `55%` desktop branch remains in code but its compact-art field is hidden on desktop. |
| Slot title | Start `.15`, duration `.8`; desktop `xPercent: -35`, `y: -50px`, scale `1.35`; compact layout no horizontal/vertical displacement, scale `1.15`. |
| Slot summary | Start `.15`, duration `.8`; `xPercent: -30`; desktop `y: -35px`, compact `y: 0`. Summary is hidden in the compact layout. |
| Opening statement | Start `.2`, duration `.6`; vertical travel `-60px` desktop or `-16px` compact; opacity `.85`. |
| Observations | Once-only reveal from opacity `.18` and `20px` displacement; `.7s` duration, `.14s` stagger, `expo.out`, trigger `top 85%`; completed opacity/transform styles clear. This reveal is time-based after its scroll trigger, not part of the scrubbing plate push. |
| Interaction feedback | Existing action background/color transitions `.2s`; inherited text-link arrow transform `.25s`. Global reduced-motion CSS reduces transitions/animations to `.01ms`. |

Source defers motion import through `requestIdleCallback` with timeout `1200ms`,
or a zero-delay timeout fallback. Reduced motion prevents initial import; a
preference change can load it later. Context reversion handles media changes.
Already-reached history remains revealed, and source adjusts scroll when needed
to retain evidence position during reconfiguration. Non-persisted pagehide
reverts context and removes listeners. These are source mechanisms, not new
interruption, restoration, or device-test certifications.

## Shapes

Reading regions remain rectangular and open, with fine structural rules. The
existing action radius is `.6rem`. Functional status circles contain inline
SVG tick/cross shapes alongside explicit status text; they are not decorative
indices. Artwork silhouettes and alpha margins remain in the selected rasters,
not CSS card shapes.

### Asset provenance and viewport delivery

Only the three implementation rasters below are referenced by the prototype.
All are recorded as built-in `image_gen` conceptual artwork derived from B,
not employer artifacts or report captures. Exact prompts and provenance remain
outside public runtime assets.

| Source artwork | Provenance companions | Current usage |
| --- | --- | --- |
| `assets/plates/passage-material.png` | `.impeccable/assets/passage-material.json`, `.impeccable/assets/passage-material.prompt.txt` | Complete text-free desktop plate. Astro WebP variants `640`, `1024`, `1536`, quality `85`; one continuous field. |
| `assets/plates/passage-upper.png` | `.impeccable/assets/passage-upper.json`, `.impeccable/assets/passage-upper.prompt.txt` | Transparent upper mobile assembly. WebP variants `640`, `1024`, quality `85`. |
| `assets/plates/passage-lower.png` | `.impeccable/assets/passage-lower.json`, `.impeccable/assets/passage-lower.prompt.txt` | Transparent lower mobile assembly. WebP variants `640`, `1024`, quality `85`. |

Selected desktop concept: `.impeccable/mocks/experience/pass-through.png`, with
its `.png.json` approval and `.prompt.txt` companions. The sidecar records owner
approval on 2026-10-23. The middle composition of
`.impeccable/mocks/experience/mobile-study.png` supplies the compact treatment
specified by the brief; its comparison-board sidecar remains `approved: false`.
That flag does not override the selected brief or approve every alternative on
the board. D-017 and the selection record authorize the current artwork strategy.

Build-time `getImage` prepares the same WebP variants listed above. Each
native `picture` places its real `srcSet.attribute` only on an active-media
`source` with `type="image/webp"`: the desktop plate uses
`min-width: 1024px`, while both compact cutouts use `width < 1024px`. The
complementary conditions cover fractional widths at the breakpoint. Desktop
source `sizes` is `max(100vw, 150svh)`; compact sources use `100vw`.

Every child `img` now has only the inert inline 1×1 data-SVG `src`, with the
original artwork's width/height attributes and asynchronous decoding. This
replaces the prior real-image fallback after the delivery check observed WebKit
fetching it speculatively even when `currentSrc` selected an empty media source.
Keeping real optimized URLs on the active `source` is intended to avoid those
inactive-art requests, including without JavaScript. Focused WebKit confirmation
and the final delivery matrix remain in progress at this snapshot.

Desktop plate and upper compact image are eager with high fetch priority; the
lower compact image is eager. Prioritizing the upper cutout addresses the actual
mobile LCP artwork identified in the handoff. Source PNGs, optimized rasters,
decoded artwork content, CSS composition, and motion values are retained. No
new performance result for this final source is recorded here.

## Components

| Owner | Responsibility and fallback boundary |
| --- | --- |
| `experience.astro` | Semantic opening/evidence/comparison content, three artwork sources and viewport media choices, CSS reading fields and responsive geometry, immediate actions, `noindex` flag. No renderer imports or hydration island. Static HTML and artwork remain when JavaScript is unavailable; missing images do not remove semantic evidence or actions. |
| `experience-motion.ts` | GSAP native-scroll timeline, compact cutout transforms, desktop push/shade/ink, one-time observation reveal, media reconfiguration and cleanup. A failed optional import leaves static markup; reduced motion keeps the unenhanced composition. |
| `src/layouts/BaseLayout.astro`, shared Header and Contact | Existing shell, identity/navigation, fonts/styles, contact and resume access. Prototype header placement is scoped to the passage page. The shared homepage renderer is unaffected. |
| `experience-history.ts` | Frozen chronological observation data consumed by the static evidence list. It supplies facts rather than a decorative mock dashboard or live polling. |

Artwork wrappers are decorative and do not capture focus or gestures. The
slot title is a visual duplicate; the later semantic TestPulse heading and
complete evidence remain in reading order. Inherited visible focus uses a
`2px` amber outline with `6px` offset. Main actions and text links retain their
source minimum target heights; result meaning never depends on color alone.
The historical WebGL-failure capture does not imply a current WebGL requirement.

The history remains runs `1220` Passed, `1224` Failed, and `1364` Passed at
commit `5c0869a`, with dates/times displayed in Cairo. The frozen export is dated
2026-10-23. These are three selected observations from an 81-observation detail
timeline; the metrics window is 50 runs. Retry counts remain unknown. Their
same-commit inconsistency supports an instability signal, not root cause,
immediate retries, repair, or a live-stream claim.

## Do's and Don'ts

These are local boundaries from the selected brief, source, and retained review.
They do not replace or expand the canonical design rules.

- **Do** retain B's continuous material field, real alpha cutouts, semantic text,
  immediate actions, and complete still content.
- **Do** retain the localized reading shade, upward title/summary handoff,
  warm-white introduction, and reserved midwidth aperture that correspond to
  the three resolved visual findings.
- **Do** keep the full review, scoped resolution, historical renderer rejection,
  and pending delivery/performance verification distinguishable.
- **Don't** restore an artificial split seam or infer new viewing angles or
  physical optics from the artwork push.
- **Don't** promote abandoned renderer parameters, generated lettering, or
  screenshot-diff color samples into canonical source tokens.
- **Don't** treat the scoped visual `ship` as proof of physical iPhone smoothness,
  passing performance, launch readiness, or production integration approval.

### Preserved canonical and snapshot fingerprints

HEAD at source inspection: `ee578bf8c6d44afef309e40e45896a1a80e082e7`.
Working-tree changes are part of this snapshot; HEAD alone is not its identity.
SHA-256 values at documentation time:

| File | SHA-256 |
| --- | --- |
| `DESIGN.md` | `5b54f2dd6a31ceac9209d1455d521c569d85af305bbcd2c136c8c5dbfbf32145` |
| `.impeccable/design.json` | `38eab0b557cd0d35778fa8dae1f132ce09d832781d73ff915b3ed9a3965b9345` |
| `src/pages/experience.astro` | `c726e915917a59f8ad517d1b5991ad3e5bf62a62f4803c3b24ec80afb2d35453` |
| `src/scripts/experience-motion.ts` | `9d769fb69297ef57b4c75263ad7eecbf984b75ccc08a5e4089191c750a7bf4eb` |
| `src/data/experience-history.ts` | `36e7733d2a27ec56421aa912e4476aad7235231aff18eaf95a932bff2adcf085` |
| `docs/experience/visual-review.md` | `08531ef6e95f2e68e5ce0d2ef2edd5008875f476fd4172c17183776fe1ce1fd0` |
| `.impeccable/review/experience/capture-manifest.json` | `df3b51c663eab69317b964213a204b4f8b55cacc569b1236a3d217704eb96874` |
