# Pass Through: completed D-018 design record

## Overview

Documentation snapshot: 2026-10-25, Cairo. This record describes the completed
isolated `/experience` refinement in the existing **Exhibition plinth and
inspection monograph** identity. The owner selected **B: Pass Through** on
2026-10-23, rejected the hosted renderer, and authorized the cinematic artwork
treatment in D-017. D-018 required one real TestPulse heading to grow from the
aperture into the complete project introduction while the opening disappears.
The accepted chrome/amber first view stays. This is the draft PR 4 preview;
homepage integration and production deployment remain outside its scope.

One linked `h2` and one project descriptor remain the same DOM elements through
the opening, enlargement, settled introduction, and native-scroll release. The
hero statement, QA role, subtitle, and buttons fade completely. Materials advance
and clear; approved explanatory copy arrives; real evidence approaches before
sticky release. Reverse native scrolling restores the opening. There is no
decorative duplicate or second TestPulse entrance.

**Latest visual disposition: full D-018 `ship`, with no material fixes.** The
five-section review in `docs/experience/visual-review.md` opened all 24 required
PNGs from the `continuous-TestPulse-arrival` manifest, captured at
`2026-10-24T23:59:15.900Z`. It covers the first view, desktop and compact poses,
complete stills, evidence, and release. The final comp comparison remains
approximately 94 percent. Sharp HTML and the approved Alexandria/Manrope pairing
are explicit adaptations from generated lettering and blur, not pixel identity.
The report retains D-017's full review and scoped resolution as history.

This documentation pass read source, contracts, metadata, and existing reviews.
It ran no browser, video playback, test, capture, detector, or benchmark. Still
progression supports visible continuity and settled composition; it cannot
certify temporal smoothness or a physical iPhone. The artwork supplies depicted
optical depth, not live rendered 3D transmission. This route has no React island,
canvas, or renderer loader. The homepage's separate renderer is unchanged.

### Source identity and consumed verification

Application commit: `563096e90f1bd0a300e2e23460a7edd39caa6364`. The inspected
source matches these Git blobs:

| File | Git blob |
| --- | --- |
| `src/pages/experience.astro` | `aeb16f2c39d4e03a40dfa10a924cdf43d2154c9c` |
| `src/scripts/experience-motion.ts` | `3a67322cdfdc51cd574f9af94f2017f3877bf825` |
| `tests/experience.spec.ts` | `d57a9a5e1ea9e8e6ee1d46bbce8a8542dd4f6036` |

`docs/verification.md` owns detailed verification and retained failures.
Consumed without repetition: sequential type checking of 34 files has zero
diagnostics; lint and the twenty-page build pass; all 63 affected browser checks
pass across nine engine/viewport configurations with zero failures, skips, flaky
results, or retries; all nine axe/reflow checks pass. The exact-source report is
`.research/experience-study/arrival-final-source-browser.json`, starting
`2026-10-25T00:00:04.666Z` and lasting `67.667486s`. Technical source review
approves the current blobs with no unresolved Critical or Required finding.

Three corrected mobile Lighthouse runs score 98, with median LCP
`2256.4436ms` and CLS `0.0001237532` each. The earlier score-80 failure with
CLS `0.3843770739` remains retained. Its arrival wrapper moved visibly from
static flow to the pinned position before hiding. Current CSS hides the enhanced
wrapper before that layout move; GSAP reveals the parent while only its copy
child translates. Destination markers remain measurable and stationary. Static
content stays visible. Passing measurements belong to that correction.

The bounded post-load profile records zero errors or canvas elements, 46,899
encoded JavaScript bytes with motion and 1,467 with initial Reduce Motion. Its
39-frame samples have median requestAnimationFrame interval `16.7ms`; desktop
p90 is `33.3ms`. These are local lab observations, not field or physical-device
certification. Hosted verification is recorded in docs/verification.md; its
results remain separate from this design documentation.

### Identity boundary and retained drift

This ordinary local extension preserves `DESIGN.md` and `.impeccable/design.json`.
The values below describe this surface; they do not replace canonical tokens,
regenerate previews, or establish another global motion system. The sidecar's
synthesized OKLCH ramps remain non-normative swatch previews.

The measured spec retains an older optional-3D annotation. Historical static
diff annotations flag the project title, descriptor, and navigation, and suggest
the generated sample's darker descriptor. These are reported, not repaired or
canonized. Current source, D-018, the semantic-type adaptation in both briefs,
and the full review govern this artifact. The storyboard's earlier projected
beats and viewport targets are historical; the measured travel below is current.

## Colors

The surface inherits graphite (`#171515`), warm white (`#f8f2e9`), muted stone
(`#b3ada4`), amber (`#ffc368`), warm rules (`#49433b`), and reading stone
(`#d5cec4`). The opening uses inherited graphite. Chrome, amber volume,
reflections, and texture belong to the approved conceptual rasters.

| Local treatment | Actual use |
| --- | --- |
| `linear-gradient(#141312e6, #14131200)` | Header reading field, scoped to this route. |
| `linear-gradient(90deg, #111110f2, #111110b8 30%, #11111000 68%)` | Localized left shade. Initial opacity 0, or `.65` on desktop at aspect ratios of at least `8 / 5`; reaches 1 during enhancement. |
| Introduction color to `#f8f2e9` | Brief warm-white transition before the complete hero fade. The settled project descriptor retains muted stone. |
| `linear-gradient(145deg, #ffd17d, #f4a938)`; hover `#ffda98`; ink `#17110a` | Existing primary work action. |
| `#19171470`; border `#b1a492`; hover `#393027` | Existing quiet Resume action. |
| SVG strokes `#d2c6b5` and failed `#f0a091` | Observation symbols with tick/cross geometry and explicit Passed/Failed text. Failure tint remains local. |

No new material palette, tonal scale, light rig, or shader settings are introduced.

## Typography

Alexandria Variable remains the display face; Manrope Variable serves body and
controls, with existing sans-serif fallbacks. Inherited body uses `400 1rem/1.65`;
headings retain close tracking (`-.04em`). These are local optical sizes.

| Role | Desktop source value | Responsive behavior |
| --- | --- | --- |
| Opening statement | `7.95vw`, weight 700, line height `.9`, horizontal scale `.93` | Below `1024px`: `clamp(2.3rem, 8.3vw, 5rem)`, line height 1; up to `600px`: `clamp(2rem, 9.1vw, 3.5rem)`; at least `1800px`: `9rem`. |
| QA role / subtitle | `1.82vw` / `1.48vw`, line height `1.3`, tracking `-.035em` / `-.025em` | Below `1024px`: `1.25rem` / `1rem`, subtitle line height `1.5`; up to `600px`: `1.1rem` / `.95rem`; at least `1800px`: `2rem` / `1.5rem`. |
| Opening actions | `1.25vw`, weight 600 | Below `1024px`: `.9rem`; up to `600px`: `.85rem`; at least `1800px`: `1.2rem`. |
| Unique TestPulse `h2` at rest | `5.7vw`, weight 700, line height 1, horizontal scale `.95`, left/top transform origin | Below `1024px`: `clamp(3rem, 10vw, 6rem)`; up to `600px`: `3.3rem`. Transforms enlarge the same element without replacing its font size. |
| Title destination | `clamp(4.5rem, 10.5vw, 10rem)` | Below `1024px`: `clamp(4.5rem, 13vw, 7rem)`; up to `600px`: `clamp(3.5rem, 19.8vw, 5.25rem)`. D-018 explicitly authorizes this local focal scale. |
| Unique descriptor at rest / destination | `1.48vw/1.3` / destination `1.125rem` | Below `1024px`: `.95rem`, wrapping within gutters; at least `1800px`: resting type `1.5rem`; up to `600px`: destination `.95rem`. |
| Arrival explanation | Heading `clamp(2rem, 3.7vw, 4rem)`; body `clamp(1rem, 1.45vw, 1.4rem)/1.6`, maximum `47ch` | Below `1024px` heading `2.4rem`; up to `600px` heading `1.9rem`. |
| Observation status | `600 clamp(1.5rem, 2.8vw, 3rem)/1.2` in Alexandria | Up to `600px`: `1.7rem`. IDs, dates, and commit code use tabular numerals. |
| Evidence explanation / scope | `1.075rem`, maximum `56ch` / `.85rem` | Explanation becomes `1rem` up to `600px`. |

The title and descriptor move to empty layout markers. Each target scale is the
smaller of its destination font-size ratio and available-width fit; title keeps
`.95` horizontal compression. Marker geometry remains measurable while its parent
is hidden. Markers contain no duplicate lettering and are `aria-hidden`. Compact
descriptor opacity is zero only in the enhanced opening; no-JavaScript and
initial/live Reduce Motion states keep the unique descriptor visible.

## Layout

The opening contains a frame, a stage with artwork and semantic hero, and an
arrival wrapper. The stage holds the single linked TestPulse `h2`
(`#evidence-title`) and descriptor. The arrival wrapper holds empty destination
markers plus the approved explanatory `h3` and paragraph. After the opening come
the `#evidence` fragment target and evidence section, labeled by the same `h2`,
then comparison and shared contact content. No title is reparented or duplicated.

The inherited page gutter is `clamp(1.25rem, 3.58vw, 5rem)`. At rest the frame
contains the stage and flowing explanation. Enhancement alone makes the frame
sticky at `top: 0` with the stage's height. The frame uses `overflow: clip` and
isolation; the stage remains the positioning field.

| Local geometry | Desktop | Below `1024px` |
| --- | --- | --- |
| Stage/frame height | `max(100svh, 720px)` | `max(100svh, 740px)` |
| Enhanced opening height | Measured stage `offsetHeight × 2.4`, stored as pixels in `--passage-height` | Measured stage `offsetHeight × 2.2`, stored as pixels |
| Sticky scroll travel | Opening minus frame height, equivalent to `1.4 ×` stage height | Equivalent to `1.2 ×` stage height |
| Evidence overlap before release | `30svh` | `25svh` |
| Arrival top | `clamp(5rem, 12svh, 9rem)` | Same rule |

The manifest records `1400px` travel at 1440 by 1000 and `1013px` at 390 by
844. These are captured browser dimensions, not physical-device measurements.
Pixel travel supersedes the earlier extra-viewport estimates and prevents
viewport-unit travel from changing document height before resize compensation.

Desktop artwork is one continuous `3 / 2` field, centered at `50% / 50%` with
width `max(100%, 150svh, 1080px)` and plate transform origin `76% 69%`.
Headline top/left is `6.7vw / 3.2%`. Role and subtitle tops are `26.3vw` and
`29.15vw`, left `3.5%`. Actions begin at `34.9vw`, with work/resume left
`3.5% / 18.1%`, width `13.67% / 8.99%`, height `4.16vw`, minimum `44px`.
Project title starts at `66.4% / 62.5%`; descriptor top is
`calc(62.5% + 5.7vw + .35rem)`.

Below `1024px`, the header returns to flow. Cutouts use width
`min(165vw, 123svh)`, left `3%`, and a reserved aperture:

- Upper top: `max(41%, calc(38% + 4rem))`.
- Slot top: `max(73%, calc(var(--passage-upper-top) + min(46.2vw, 34.44svh)))`.
- Lower cutout and title reference the slot; the descriptor follows title by
  `.8rem`. Alpha margins determine visible material edges.

Up to `600px`, cutout width becomes `215%`, left `-12%`, upper/lower top
`43% / 72%`, title top `70%`, action row top `35%`. Compact controls retain
minimum height `48px`, padding `.85rem 1.2rem`, then `.75rem 1rem` up to `600px`.

Unenhanced arrival uses `clamp(3rem, 6vw, 6rem)` block padding. Enhancement
makes it absolute within the gutters with zero padding. Title marker height is
the destination size; descriptor marker height is `1.5em`, with `1.2rem` top
margin. Explanation follows `clamp(3rem, 10svh, 7rem)` of space and uses equal
columns with an `8%` gap, stacking below `1024px` with `2rem` gaps, then
`1.6rem` up to `600px`. Structural arrival/evidence transitions are explicitly
disabled so preference changes settle layout immediately.

Evidence uses a negative margin equal to its local overlap and `z-index: 1`,
bringing the question and test identity toward the settled introduction before
release. Its ruled sequence starts with `3rem` padding, or `2rem` up to `600px`.
Observations use three columns with `2rem` gaps and margins `4rem 0 2rem`;
up to `600px` they form a vertical list with `2.5rem` gaps and a vertical
connector. Conclusion and comparison use equal columns with `8%` gaps, stacking
below `1024px`. The same transformed title continues with its frame after CSS
sticky releases; no replacement heading or timed second entrance appears.

## Elevation & Depth

Flat graphite fields, one-pixel rules, and open space retain the editorial
structure. There is no local box-shadow vocabulary. The raster supplies coarse
chrome, depicted transparent amber, reflections, and foreground depth. Desktop
enlarges the continuous image toward its existing aperture; compact layouts
separate two alpha cutouts. Neither implies new camera angles or simulated optics.

### Scroll progress and reveal ownership

GSAP and ScrollTrigger own DOM choreography; CSS owns the sticky frame. There
is no ScrollTrigger pin, custom scrolling, forced snap, renderer bridge, or
continuous decorative loop. Trigger is the opening, start `top top`, end measured
opening height minus frame height, scrub `.2`, with refresh invalidation. The
timeline spans 0 to 1 and defaults to linear easing. Positions and durations
below are sequence progress, not seconds a visitor must spend scrolling.

| Target | Current choreography |
| --- | --- |
| Desktop plate | Scale to `3.6`, duration 1, start 0. |
| Desktop shade | Opacity to 1, duration `.4`, start 0. |
| Upper compact cutout | `yPercent: -120`, `xPercent: 4`, rotation `2deg`, duration 1, start 0. |
| Lower compact cutout | `yPercent: 140`, `xPercent: -3`, rotation `-2deg`, duration 1, start 0. Compact artwork is hidden on desktop. |
| Artwork wrappers | `autoAlpha: 0`, duration `.5`, start `.25`; materials clear fully by `.75`. |
| Hero subtitle ink | Warm white, duration `.2`, start 0, before disappearance. |
| Hero statement | `autoAlpha: 0`, `y: -80px`, duration `.55`, start `.05`; fully hidden by `.6`. |
| Role, subtitle, both actions | `autoAlpha: 0`, `y: -36px`, duration `.5`, start `.05`; fully hidden by `.55`. Visibility removes faded controls from keyboard focus. |
| One linked TestPulse title | Destination scale for duration 1, start 0; destination x/y for `.9`, start `.1`, `power2.inOut`. Growth continues through the final pose. |
| One descriptor | Destination x/y/scale for `.9`, start `.1`, `power2.inOut`; `autoAlpha: 1` from `.55` over `.3`. |
| Arrival wrapper | Enhanced CSS hides it before its absolute layout move; `fromTo` autoAlpha 0 to 1 from `.55` over `.3`. Hidden markers remain measurable. |
| Explanation child | Translation from `24px`, duration `.3`, start `.55`. Only the copy child translates; markers stay stationary. |
| Observations | Separate once-only reveal from opacity `.18` and `20px`; duration `.7s`, stagger `.14s`, `expo.out`, trigger `top 85%`. Completed opacity/transform styles clear. |
| Interaction feedback | Existing action background/color transition `.2s`, inherited arrow transition `.25s`; reduced-motion CSS reduces transitions/animations to `.01ms`. |

Complete hero disappearance and wrapper initialization supersede D-017's
partial-opacity treatment. Native reverse scrolling reverses the scrubbed story;
the separate once-only observation reveal does not repeat after being reached.

### Initialization, bookmarks, resize, and cleanup

The page defers optional import through `requestIdleCallback`, timeout `1200ms`,
or a zero-delay timeout fallback. Initial Reduce Motion avoids import; a later
no-preference change can load it. Missing required DOM nodes return before
initialization. Failed optional import leaves complete static markup.

Configuration records evidence position, recognizes already reached history,
and reverts the previous GSAP context. It measures stage height in pixels,
toggles enhancement for the live motion preference, and creates a timeline only
when allowed. Resize is debounced `150ms`; destination geometry is measured again.

When evidence has reached the upper 75 percent of the viewport, reconfiguration
compensates its position with instant scrolling for deltas above `.5px`.
Already reached history stays revealed. Initial `#evidence` arrival is recognized
within `4px` of its intended offset. Recognized initial arrival and later hash
changes synchronize that fragment using root scroll padding and target scroll
margin, then synchronize timeline progress. The target has `2rem` scroll margin
and moves up by `4rem - scene height` during enhancement. Work reaches the
readable destination immediately; Resume stays a direct PDF download. This route
scopes HTML scrolling to `auto`.

Live motion changes revert context and restore the complete static layout when
needed. Non-persisted `pagehide` reverts GSAP, clears the resize timer, and removes
motion, resize, hash, and pagehide listeners. Persisted `pagehide` retains the page
without teardown. These are source mechanisms; behavior acceptance belongs to
the consumed matrix in `docs/verification.md`.

## Shapes

Reading regions remain rectangular and open. Actions retain `.6rem` radius.
Functional status circles contain inline SVG tick/cross shapes alongside status
words. Material silhouettes and alpha margins stay in the selected rasters.

### Retained asset provenance and delivery

D-018 introduces no new asset. The route references three text-free conceptual
rasters derived from B, each with built-in `image_gen` provenance JSON and exact
prompt under `.impeccable/assets/`, outside public runtime assets.

| Source artwork | Existing provenance companions | Delivered variants |
| --- | --- | --- |
| `assets/plates/passage-material.png` | `passage-material.json`, `passage-material.prompt.txt` | Astro WebP widths `640`, `1024`, `1536`, quality 85; continuous desktop field. |
| `assets/plates/passage-upper.png` | `passage-upper.json`, `passage-upper.prompt.txt` | Astro WebP widths `640`, `1024`, quality 85; transparent upper compact assembly. |
| `assets/plates/passage-lower.png` | `passage-lower.json`, `passage-lower.prompt.txt` | Astro WebP widths `640`, `1024`, quality 85; transparent lower compact assembly. |

Selected concept: `.impeccable/mocks/experience/pass-through.png` at 1536 by
1024, with adjacent approval and prompt sidecars. Compact reference: the middle
panel of `.impeccable/mocks/experience/mobile-study.png`. That comparison board's
`approved: false` sidecar does not approve every alternative; the selected briefs
and `.impeccable/experience-selection.json` authorize this treatment. The last
consumed raster scan reports five rasters and zero missing provenance.

Build-time `getImage` prepares the variants. Real `srcSet.attribute` URLs appear
only on active-media WebP sources: desktop `min-width: 1024px`, compact
`width < 1024px`. Complementary conditions include fractional widths. Desktop
sizes is `max(100vw, 150svh)`; compact sizes is `100vw`. Child images use only
an inert inline 1 by 1 data-SVG fallback, with source width/height and asynchronous
decoding. This retains the delivery correction avoiding speculative inactive-art
downloads. Desktop and upper compact images are eager with high fetch priority;
the lower image is eager. Active-artwork delivery is covered by the consumed
matrix, not a new request audit in this pass.

## Components

| Owner | Responsibility and fallback boundary |
| --- | --- |
| `src/pages/experience.astro` | Semantic opening, one linked title and descriptor, approved explanation, real evidence, comparison, image delivery, local CSS, immediate actions, and `noindex`. Static HTML stays complete without JavaScript or WebGL. |
| `src/scripts/experience-motion.ts` | Native-scroll arrival timeline, separate history reveal, destination geometry, pixel travel, bookmarks, live preferences, reading retention, and cleanup. |
| `src/layouts/BaseLayout.astro`, shared Header and Contact | Existing shell, identity, visible navigation, fonts, focus, contact, and resume access. Header placement is local; homepage renderer stays separate. |
| `src/data/experience-history.ts` | Frozen chronological observations, without live polling or invented dashboard data. |

Artwork and landmark wrappers are decorative and `aria-hidden`; the TestPulse
heading and descriptor are actual readable content. Evidence `aria-labelledby`
references that same heading. Empty arrival space passes pointer input through;
copy restores normal pointer behavior. Inherited focus is a `2px` amber outline
with `6px` offset. Work and Resume are immediately available at rest. Comparison
links point to `/` and production; evidence links open the case study and dashboard.

Arrival uses the approved “A red test deserves a better explanation.” heading
beside the existing CI-history explanation. Evidence stays runs `1220` Passed,
`1224` Failed, and `1364` Passed at commit `5c0869a`, with Cairo dates/times.
The frozen export is dated 2026-10-23. Three selected observations come from an
81-observation timeline; the metrics window is 50 runs. Retry counts are unknown.
Shared-commit inconsistency supports an instability signal, not root cause,
repair, immediate retries, or live data. Conceptual artwork is disclosed.

## Do's and Don'ts

These local boundaries do not replace canonical design rules.

- **Do** preserve the accepted first view and one linked heading and descriptor
  through enlargement, explanation, release, and reversal.
- **Do** retain complete hero fade, cleared materials, evidence overlap, stationary
  measurable markers, and hidden enhanced-wrapper initialization.
- **Do** preserve immediate actions, visible static and Reduce Motion content,
  truthful evidence, native scrolling, and reading-position retention.
- **Don't** restore a decorative duplicate, second title entrance, generated
  lettering blur, material seam, or rejected renderer.
- **Don't** promote local focal sizes, historical detector suggestions, renderer
  notes, or artwork colors into replacement canonical tokens.
- **Don't** treat visual ship or local lab gates as hosted acceptance,
  physical-device certification, or production integration approval.

### Preserved canonical fingerprints and evidence checked

| Canonical file | Preserved SHA-256 |
| --- | --- |
| `DESIGN.md` | `5b54f2dd6a31ceac9209d1455d521c569d85af305bbcd2c136c8c5dbfbf32145` |
| `.impeccable/design.json` | `38eab0b557cd0d35778fa8dae1f132ce09d832781d73ff915b3ed9a3965b9345` |

Evidence checked: `AGENTS.md`, `PRODUCT.md`, canonical design and sidecar,
D-018, both experience briefs, selection record, historical/current storyboard
boundary, page and motion source, frozen history and evidence JSON, asset
provenance, measured build spec/state, current capture manifest, full D-018 visual
review with retained D-017 history, technical review, and shared verification.
Source blob identities and canonical digests were checked without repeating
runtime verification. File changed by this handoff:
`docs/experience/design-record.md` only. Reported metadata drift remains untouched.
