# Pass Through: prototype design record

## Overview

This is a descriptive record of the isolated `/experience` snapshot, extending
the existing **Exhibition plinth and inspection monograph** identity. The owner
selected **B: Pass Through** on 2026-10-23. Selection authorizes this prototype
and its compact mobile treatment, not production integration or a new global
design system. The original homepage and production remain outside this change.

**Current visual disposition: `rebuild`.** Both full finish reviews returned
`rebuild`; the latest followed a focal desktop scene rebuild. In
`docs/experience/visual-review.md`, the static plate and mobile treatment retain
the selected material character, and mobile action clearance is resolved. The
live desktop scene still falls below the approved comp: broad pale faces and
opaque-looking gold planes replace dark chrome and visibly transparent amber;
the opening reads as widely separated planes rather than a dense passage; the
arrival caption crosses a bright slab; and a pale edge intrudes behind About
and Contact. These findings are unresolved, not design rules to reproduce.

The next material strategy awaits owner decision after a concrete hosted
comparison. This record does not choose that strategy or approve the present
live finish. The recorded static comparison score of 94.2% applies to the still
composition; it does not close the live scene finding. The earlier 95.26% hero
gate likewise does not validate the rebuilt live renderer.

Canonical `DESIGN.md` and `.impeccable/design.json` are preserved. Values below
describe local code, including rejected output settings; they are not promoted
to normative frontmatter or canonical sidecar tokens. The canonical sidecar's
synthesized OKLCH ramps remain non-normative swatch previews, not new colors for
this prototype.

### Snapshot and evidence checked

The checkout's HEAD was `29fa87b4ad896e1489a26a1beb7606e3eab62383` when recorded.
The prototype includes working-tree changes, so HEAD alone does not identify
this snapshot. Source fingerprints are retained below.

| Evidence read in this documentation pass | What it establishes |
| --- | --- |
| `PRODUCT.md`, `AGENTS.md`, `DESIGN.md`, `.impeccable/design.json` | Existing identity, source-of-truth boundaries, typography, palette, and ownership. |
| `docs/briefs/experience.md`, `.impeccable/surfaces/src-pages-experience-astro.md`, `docs/experience/storyboard.md` | Selected direction, local interaction scope, first viewport, responsive intent, and factual limits. |
| `src/pages/experience.astro`, `src/styles/global.css`, `src/layouts/BaseLayout.astro` | Semantic page, actual local styling, inherited shell, actions, and static content. |
| `src/scripts/experience-motion.ts`, `src/lib/inspection-state.ts`, `src/components/experience/PassageCanvas.tsx`, `src/components/experience/PassageIsland.tsx` | Timeline values, scene inputs, rendering ownership, and fallback conditions implemented in source. |
| `src/data/experience-history.ts`, `docs/experience/testpulse-evidence.json` | Frozen observations and their scope, without a new live-data verification. |
| The asset and concept sidecars listed under Shapes | Recorded generation provenance, approval scope, and the assets actually referenced by the page. |
| `.research/experience-study/before-rebuild/visual-review.md`, `docs/experience/visual-review.md` | First and second full visual reviews, both with `rebuild`; the second records resolved mobile clearance and remaining desktop findings. |
| `.impeccable/review/experience/capture-manifest.json` | Retained capture inventory, dimensions, full-page flags, and capture time `2026-10-23T19:30:25.534Z`. |

The latest review cites desktop live start/middle/end, mobile live
start/middle/end, static responsive, evidence, and WebGL-failure PNGs. They are
retained under `.impeccable/review/experience/`, with the matching desktop and
mobile captures also identified by the manifest. This documentation pass read
the review and manifest; it did not reopen images, inspect video, run a browser,
or run technical checks. It does not certify visual quality, motion smoothness,
physical iPhone behavior, runtime correctness, accessibility, performance, or
launch readiness.

## Colors

The page inherits graphite (`#171515`), warm white (`#f8f2e9`), muted stone
(`#b3ada4`), amber (`#ffc368`), the warm rule (`#49433b`), and reading stone
(`#d5cec4`) from the established identity. These references do not replace the
canonical definitions.

| Prototype-local value | Actual use and scope |
| --- | --- |
| `#161514` | Opening section field. |
| `linear-gradient(#141312e6, #14131200)` | Local header reading-field gradient. |
| `linear-gradient(145deg, #ffd17d, #f4a938)`; hover `#ffda98`; text `#17110a` | Primary work action, retaining the existing action treatment. |
| `#19171470`; border `#b1a492`; hover `#393027` | Resume action, retaining the existing secondary treatment. |
| `#d2c6b5`; failed observation `#f0a091` | SVG status strokes. Explicit Passed/Failed words, tick/cross shapes, dates, and run IDs accompany the tint. This is a local evidence treatment, not a new global accent family. |
| Metal `#e2e5e8`; amber glass `#ffcf86`; attenuation `#e89728` | Current live material inputs. Their rejected visible finish is recorded in Overview; these are not approved palette additions. |
| Directional lights `#fff3de` and `#ffc368` | Current live scene lighting inputs, not page colors. |

## Typography

Alexandria Variable remains the display family; Manrope Variable remains the body
and control family, each with the inherited sans-serif fallback. Base text uses
the inherited `400 1rem/1.65`. Headings inherit close tracking (`-.04em`) and
balanced wrapping. The prototype uses local optical sizing rather than replacing
the canonical ramp.

| Role | Desktop source | Responsive source |
| --- | --- | --- |
| Opening statement | `7.95vw`, weight `700`, line height `.9`, horizontal scale `.93` | At widths up to `1023px`: `clamp(2.3rem, 8.3vw, 5rem)`, line height `1`; up to `600px`: `clamp(2rem, 9.1vw, 3.5rem)`; at least `1800px`: `9rem`. |
| Role / introduction | `1.82vw` / `1.48vw`, line height `1.3` | Up to `1023px`: `1.25rem` / `1rem`, introduction line height `1.5`; up to `600px`: `1.1rem` / `.95rem`. |
| Opening actions | `1.25vw`, weight `600` | Up to `1023px`: `.9rem`; up to `600px`: `.85rem`; at least `1800px`: `1.2rem`. |
| Decorative slot title | `5.7vw`, weight `700`, line height `1`, horizontal scale `.95` | Up to `1023px`: `clamp(3rem, 10vw, 6rem)`; up to `600px`: `3.3rem`. It is real HTML marked `aria-hidden`; the following TestPulse heading is semantic. |
| Semantic TestPulse heading | `clamp(4rem, 8vw, 9rem)` | Up to `1023px`: `clamp(3rem, 11vw, 6rem)`; up to `600px`: `3.3rem`. |
| Observation status | `600 clamp(1.5rem, 2.8vw, 3rem)/1.2` in Alexandria | Up to `600px`: `1.7rem`. Run IDs, timestamps, and commit code use tabular numerals. |
| Evidence explanation | `1.075rem`, maximum `56ch` | Up to `600px`: `1rem`. Scope note is `.85rem`. |

## Layout

The opening uses a full-width, clipped, isolated frame (`100svh`, minimum
`720px`; minimum `740px` below `1024px`). Without motion enhancement, that frame
remains a static opening. The inherited fluid gutter remains
`clamp(1.25rem, 3.58vw, 5rem)`.

With motion enabled, the script sets opening height/minimum pairs to
`200svh` / `1440px` on desktop and `145svh` / `1073px` below `1024px`. A CSS
sticky frame at `top: 0` occupies that native scroll region. These are source
values, not a measured physical-device travel guarantee.

Desktop copy sits in the left field: headline top `6.7vw`, left `3.2%`; role
top `26.3vw`; introduction top `29.15vw`; actions top `34.9vw`, left `3.5%`
and `18.1%`. The slot title starts at left `66.4%`, top `62.5%`. Their reading
clearance in the live scene remains a review finding.

At `1023px` and below, the header returns to flow, the two material cutouts
replace the full plate, and intro/conclusion/comparison grids stack. Cutout
width is `165%`, left `3%`; upper/lower offsets are `41%` / `76%`. At `600px`
and below, width becomes `215%`, left `-12%`, with offsets `43%` / `72%`.
The action row sits at `35%` in that compact composition. The latest review
records its action clearance as resolved.

Evidence uses a two-column intro and conclusion with `8%` gaps. The three
observations use three columns, a `2rem` gap, and a thin connecting rule. At
`600px` and below they become a vertical list with `2.5rem` gaps and a vertical
connector. No hover is required to read a result. Work links target `#evidence`
directly; Resume remains a direct download. Comparison links point to `/` and
`https://myehia.vercel.app/`.

## Elevation & Depth

Page structure retains flat fields and fine rules, with no local CSS box-shadow
vocabulary. Rich depth belongs to the artwork and optional scene. The static
plate, mobile cutouts, and live geometry are separate implementations; approval
of one does not establish parity in the others.

### Current live scene inputs

`PassageCanvas.tsx` creates five rounded slabs (`8 × .22 × 3.7`, radius `.035`,
smoothness `3`) at base heights `[2.8, 1.6, .4, -1.8, -3]`. Even-index slabs use
metal; odd-index slabs use transmission. The current open-plane arrangement is
one of the rejected visual results.

| Input | Current source value |
| --- | --- |
| Metal surface | Generated color map repeated `3 × 2`; the same texture is cloned as a no-color-space bump/roughness map; bump scale `.025`; metalness `1`; roughness `.45`; environment-map intensity `2`. |
| Amber material | Transmission `1`; roughness `.045`; thickness `.3`; attenuation distance `4`; IOR `1.35`; clearcoat `1`; chromatic aberration `.004`; anisotropic blur `.01`; distortion and temporal distortion `0`; resolution `256`; samples `2`. |
| Environment | Generated PNG reflection texture, sRGB with equirectangular reflection mapping; environment intensity `2`. It is not documented as an HDR capture or a measured physical material. |
| Lights | Ambient intensity `.25`; directional intensities `2` and `1.2`. |
| Renderer | `frameloop="demand"`; pixel ratio `[1, 1.25]`; FOV `35`; antialiasing; transparent canvas; low-power preference. These settings do not certify actual runtime cost. |

### Local motion values and ownership

GSAP owns DOM transforms and normalized progress. ScrollTrigger uses
`start: 'top top'`, `end: 'bottom bottom'`, `scrub: .2`, and refresh invalidation.
The sequence is reversible through native scrolling; timeline durations below
describe relative choreography, not an enforced viewing time.

| Target | Source motion |
| --- | --- |
| Scene input | Progress `0` to `1`, duration `1`, linear ease, forwarded through `setInspectionProgress`. |
| Desktop fallback plate | Scale `1.13`, horizontal travel `-3%`, origin `72% 55%`, duration `1`, linear ease. |
| Upper mobile cutout | Vertical travel `-12%` at widths up to `600px`, otherwise `-4%`; horizontal travel `4%`; rotation `2deg`; duration `1`. This shorter upper travel retains the resolved mobile clearance. |
| Lower mobile cutout | Vertical travel `65%` below `1024px` (`55%` desktop branch); horizontal travel `-3%`; rotation `-2deg`; duration `1`. |
| Slot title / subtitle | Start `.15`, duration `.8`; desktop title travels `-35%` horizontally and scales to `1.35`; mobile title keeps its horizontal position and scales to `1.15`; subtitle travels `-30%` horizontally and `30px` vertically. |
| Opening statement | Start `.2`, duration `.6`; vertical travel `-60px` desktop or `-16px` compact; opacity `.85`. |
| Evidence observations | Once-only reveal from opacity `.18` and `20px` vertical displacement; duration `.7s`; stagger `.14s`; `expo.out`; trigger `top 85%`; completed opacity/transform styles clear. Already reached history is retained as revealed. |
| Canvas entrance / action states | Canvas opacity transition `.4s`; action background/color transitions `.2s`; inherited reduced-motion CSS reduces transitions and animations to `.01ms`. |

React Three Fiber owns the scene and camera. It reads the shared progress,
invalidated by the setter, with opening progress capped at `min(scroll / .7, 1)`.
The camera travels from `(2.4, 2.6, 9.2)` to `(2.4, 1, 7.1)` while its look-at
point moves from `(.4, .2, -1)` to `(.7, .2, -1)`. Layer separation expands with
that input; GSAP does not independently animate those scene transforms.

On preference/desktop-threshold changes, source reverts its GSAP context, resets
scene progress, and adjusts scroll if necessary to retain the evidence's reading
position. Pagehide cleanup excludes persisted history entries. This records the
implementation intent, not successful history-restoration or interruption tests.

## Shapes

Evidence remains open and rectangular, with one-pixel structural rules. Opening
actions retain the existing `.6rem` radius. Status circles contain functional
tick/cross SVGs plus explicit status text; they are not arbitrary decorative
indices. The five live slabs' rounded physical edges do not establish a new
radius for page containers.

### Asset provenance

All five implementation rasters below are recorded as generated conceptual
artwork using built-in `image_gen`. They are not employer artifacts or test
report captures. JSON provenance and exact prompt text are retained separately
from the public runtime assets.

| Source asset | Provenance records | Local use |
| --- | --- | --- |
| `assets/plates/passage-material.png` | `.impeccable/assets/passage-material.json`, `.impeccable/assets/passage-material.prompt.txt` | Complete text-free desktop still, referenced to the selected Pass Through comp. Astro produces WebP variants at widths `640`, `1024`, `1536`, quality `85`. |
| `assets/plates/passage-upper.png` | `.impeccable/assets/passage-upper.json`, `.impeccable/assets/passage-upper.prompt.txt` | Transparent upper chrome/amber mobile cutout, referenced to the selected comp. WebP variants `640`, `1024`, quality `85`. |
| `assets/plates/passage-lower.png` | `.impeccable/assets/passage-lower.json`, `.impeccable/assets/passage-lower.prompt.txt` | Transparent lower chrome/amber mobile cutout, referenced to the selected comp. WebP variants `640`, `1024`, quality `85`. |
| `assets/materials/passage-chrome-surface.png` | `.impeccable/assets/passage-chrome-surface.json`, `.impeccable/assets/passage-chrome-surface.prompt.txt` | Generated brushed-metal sample for the focal scene rebuild; page supplies a `1024px` WebP, quality `90`, to the loader. |
| `assets/materials/passage-studio-reflection.png` | `.impeccable/assets/passage-studio-reflection.json`, `.impeccable/assets/passage-studio-reflection.prompt.txt` | Generated studio reflection panorama for the rebuild; page supplies a `1536px` WebP, quality `90`, to the loader. |

The selected desktop concept is `.impeccable/mocks/experience/pass-through.png`,
with `.png.json` and `.prompt.txt` companions. Its sidecar records explicit owner
approval on 2026-10-23. The middle composition in
`.impeccable/mocks/experience/mobile-study.png` supplies the brief's compact
mobile treatment. That comparison board's `.png.json` remains `approved: false`;
its use in the selected brief does not turn every option on the board into an
approved design or a working-motion claim.

## Components

| Owner | Responsibility in this snapshot | Fallback boundary |
| --- | --- | --- |
| `experience.astro` | Semantic statement, role, actions, real TestPulse heading, chronological evidence list, scope explanation, comparison links, and raster placement. It passes `noindex` to the shared shell. | Text and links are static HTML. Without JavaScript, the desktop plate or compact cutouts remain with ordinary document flow. Missing artwork does not remove semantic content; successful raster loading is not certified here. |
| `BaseLayout.astro`, shared Header and Contact | Existing identity/navigation, global fonts/styles, direct contact and resume access. | Reuses the incumbent semantic shell. Prototype-local header positioning is restricted to a body containing the passage opening. |
| `experience-motion.ts` | Lazy-loaded GSAP/ScrollTrigger choreography, native-scroll progress, one-time evidence reveal, preference/viewport reconfiguration. | Page defers loading while reduced motion is requested. No matching motion preference means no sticky sequence enhancement. The script import failure is caught, leaving the static markup. |
| `PassageIsland.tsx` | Desktop activation, WebGL2 probe, lazy scene import, ready/failure state, error boundary, visibility/media listeners. Initial activation waits `150ms` for settled scrolling in its observation area. | Requires width at least `1024px`, no reduced-motion preference, intersection, visible document, and successful WebGL2. Leaving those conditions unmounts the active canvas and clears ready. Import/render/context failure leaves the static plate. |
| `PassageCanvas.tsx` | Texture loading/cloning, five-layer materials, lighting/environment, demand-rendered scene, camera and layer transforms, lifecycle callbacks. | Error callback/boundary returns control to the plate. Cloned textures have disposal cleanup in source; resource correctness was not tested in this pass. |
| `inspection-state.ts` | Shared normalized scroll value and an invalidation callback. | Source resets progress during configuration and cleanup; this is a bridge, not an independent animation owner. |

The canvas and cutouts are decorative and do not capture focus or gestures.
The duplicate slot lettering is hidden from accessibility APIs; the semantic
TestPulse section remains readable. Opening links have at least `44px` height,
or `48px` in the compact flow treatment, with inherited visible keyboard focus.

The source history shows runs `1220` Passed, `1224` Failed, and `1364` Passed at
commit `5c0869a`, with dates/times displayed in Cairo. The frozen export is dated
2026-10-23. These are three selected observations from an 81-observation detail
timeline; the metrics window is 50 runs. Retry counts remain unknown. The
sequence supports same-commit inconsistency, not a cause, immediate retries,
repair, or a live-stream claim.

## Do's and Don'ts

These are snapshot boundaries inherited from the approved brief and recorded
reviews, not an expansion of the canonical design rules.

- **Do** retain the selected identity, conceptual-art labeling, direct actions,
  complete semantic evidence, and resolved compact mobile action clearance.
- **Do** retain both full `rebuild` reviews and distinguish their static and live
  evidence when presenting the hosted comparison.
- **Do** keep the next material strategy subject to owner decision after that
  concrete hosted comparison.
- **Don't** canonize the rejected pale live faces, opaque-looking amber, open
  shelving topology, or arrival reading-field collisions as approved style.
- **Don't** treat a static diff score, source settings, or browser emulation as
  proof of live material quality, smoothness, or physical iPhone behavior.
- **Don't** infer technical acceptance or launch authorization from completion
  of this documentation record.

### Preserved canonical and snapshot fingerprints

SHA-256 values at documentation time:

| File | SHA-256 |
| --- | --- |
| `DESIGN.md` | `5b54f2dd6a31ceac9209d1455d521c569d85af305bbcd2c136c8c5dbfbf32145` |
| `.impeccable/design.json` | `38eab0b557cd0d35778fa8dae1f132ce09d832781d73ff915b3ed9a3965b9345` |
| `src/pages/experience.astro` | `c26988826786197aea55a710ae8d981fbc676d3ebc1853faeac0eb4166220721` |
| `src/scripts/experience-motion.ts` | `ed9b4d22eeefb059758cc92e2b1074eec686abbfa7f106e29facc6eb4a1b6b74` |
| `src/components/experience/PassageCanvas.tsx` | `5249fc0dba9e1b98b34c219fa35d497ffade574dfe58b1631221809365ca4095` |
| `src/components/experience/PassageIsland.tsx` | `8995b31bff3097000ce5ba30b9b7bb8a66429e5cc0cbfb5f27d9edafa9e97919` |
| `docs/experience/visual-review.md` | `f33b9832749478992b5a2733eed0ea2bc3392db162a5f809ace9a5befbae949d` |
