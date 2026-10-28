# D-019 completed motion design record

Application source: `d3e334ea22cbb3c7f9f4315bd182bb2c44c81b14`.
This extraction describes the completed source after the compact heading reflow
correction. It updates `DESIGN.md` and `.impeccable/design.json` within the
approved inspection world. It introduces no application change, effect family,
palette, type family, asset, or motion dependency.

## Authority and record boundaries

D-019 in `DECISIONS.md` and `tasks/plan.md` carries the owner's accepted D-018
opening across the homepage, archive, and three case studies. The current
contracts are `docs/briefs/home.md`, `docs/briefs/case-studies.md`, and
`docs/briefs/archive.md`, mirrored by their three corresponding records in
`.impeccable/surfaces/`. They retain seed `dfa28b62`, graphite, warm white,
controlled amber light, Alexandria/Manrope, the real portrait, and the approved
chrome/glass rasters. Surface compositions remain in those contracts.

`docs/experience/full-site-visual-review.md` contains the independent full review
and the later verdict for its sole enlarged-text fix. That verdict resolves the
scored fix and retains the original review's scope. This document is an
extraction of implemented rules, not another visual or technical verdict.

All current measurements, test results, raster-provenance results, preview and
hosted status, production state, and verification limitations belong to
`docs/verification.md`. The finish packet is supporting review context. No
application tests, capture run, performance run, deployment, or new source review
was performed for this documentation pass.

## Ownership and enhancement boundaries

| Owner in the source | Implemented responsibility |
| --- | --- |
| `src/components/PassThrough.astro` and `src/scripts/experience-motion.ts` | The same semantic opening and TestPulse evidence on `/` and `/experience`; a local reversible scroll timeline. |
| `src/layouts/BaseLayout.astro`, `src/components/MotionLoader.astro`, and `src/scripts/motion.ts` | Opt-in full-site surfaces on the homepage, archive, and case routes; shared chapter, material, light, reading, and continuation motion. The focused `/experience` route does not opt into this shared layer. |
| Inline head CSS in `src/layouts/BaseLayout.astro` and `src/styles/global.css` | Native cross-document view transitions around normal document navigation. No client router. |
| `src/components/InspectionIsland.tsx`, `src/components/InspectionCanvas.tsx`, and `src/lib/inspection-state.ts` | The inherited local Approach scene, its renderer lifecycle, layer control, and demand invalidation. GSAP supplies a scroll value through `setInspectionProgress`; React Three Fiber owns scene properties. |

GSAP owns DOM transforms, opacity, masks, and bounded ScrollTrigger progress.
Neither initializer supplies custom scrolling, forced snapping, an idle loop, or
a second renderer. The opening sets native scroll behavior to `auto`; other
documents retain the global smooth-anchor behavior unless reduced motion is
requested. These are existing source choices, not a new navigation system.

## Pass Through opening and continuous arrival

`PassThrough.astro:19-71` supplies semantic headline spans, role, introduction,
direct work/resume links, one real linked TestPulse heading, its descriptor,
arrival copy, and recorded observations. The hidden arrival landmarks measure a
destination; they are not duplicate visible project titles. The component's
picture sources select the complete material plate from `1024px` and the split
upper/lower rasters below that width. The one-pixel inactive image is only a
delivery placeholder; the imported artwork supplies the visible field.

The desktop scene minimum is `max(100svh, 720px)`; below `1024px` it becomes
`max(100svh, 740px)`. Enhancement measures the stage and sets opening travel to
`stage.offsetHeight * 2.4` on desktop or `* 2.2` on compact screens. The frame is
sticky only while `.has-passage-motion` is present. The timeline runs from
`top top` for `opening.offsetHeight - frame.offsetHeight`, with `scrub: .2` and
`invalidateOnRefresh: true`. The values below are relative timeline units in a
scroll-bound sequence, not elapsed playback seconds.

| Opening relationship | Literal implemented values |
| --- | --- |
| Desktop focal material | Plate scales to `3.6` over `1` unit from `0`; shade reaches opacity `1` over `.4` from `0`. Only this branch requires desktop. |
| Split material separation | Upper travels `yPercent: -120`, `xPercent: 4`, `rotate: 2`; lower travels `yPercent: 140`, `xPercent: -3`, `rotate: -2`, both over `1` from `0`. The split artwork is the compact visible path. |
| Artwork departure | Desktop artwork and compact material wrapper reach `autoAlpha: 0` over `.5`, starting at `.25`. |
| Hero departure | Headline reaches `autoAlpha: 0`, `y: -80` over `.55` from `.05`; role, introduction, and action anchors reach `autoAlpha: 0`, `y: -36` over `.5` from `.05`. The introduction first changes to the existing Warm White source color over `.2` from `0`. |
| Same TestPulse heading | Scale reaches the measured destination over `1` from `0`; position reaches it over `.9` from `.1` with `power2.inOut`. The destination ratio retains the heading's `.95` horizontal compression. |
| Same descriptor and arrival | Descriptor position/scale uses `.9` from `.1` with `power2.inOut`; its `autoAlpha` reaches `1` over `.3` from `.55`. The arrival wrapper reveals over `.3` from `.55`, while its content travels from `y: 24`. |
| Evidence handoff | The evidence overlaps the opening by `30svh` on desktop or `25svh` on compact screens, bringing observations into view before the sticky sequence releases. |

The title destination uses `clamp(4.5rem, 10.5vw, 10rem)` on desktop,
`clamp(4.5rem, 13vw, 7rem)` below `1024px`, and
`clamp(3.5rem, 19.8vw, 5.25rem)` at `600px` and below. The descriptor destination
uses `1.125rem`, then `.95rem` at the narrow breakpoint. These are local opening
values, not additional global type roles.

Recorded observations enter only when not already at the reading position:
`opacity: 0`, `y: 20`, `.7s`, stagger `.14s`, `expo.out`, once at `top 85%`.
Completed opacity and transform styles clear. The work/resume controls are
available at rest; `autoAlpha` makes their departed state invisible, removing
hidden anchors from keyboard focus. Static and reduced-motion defaults retain
the arrival and evidence. Source: `experience-motion.ts:26-87` and
`PassThrough.astro:83-149`.

## Shared entrances and normal-motion contrast

The `once` helper in `src/scripts/motion.ts:19-32` skips elements already
revealed or positioned above `innerHeight * .92`. New entrances start at
`top 92%`, run for `.85s` with `power3.out`, and clear
`transform,opacity,clipPath` on completion. A WeakSet keeps completed entries
steady across reconfiguration.

| Shared target | Initial state |
| --- | --- |
| Ordinary `data-reveal` group | `y: 28`; opacity starts at `0` only when the group contains no `a`, `button`, `input`, or `summary`. |
| Chapter, case-prose, and evidence heading | `y: 42`; mask `inset(0 0 100% 0)` only when the heading contains none of those controls. Linked headings use translation alone. |
| Approach steps | `x: -22`, `opacity: 0`. |
| Evidence rule | `scaleX: 0`, duration `1.15s`. |
| Judge-result and compact strategy groups | `y: 24`, `opacity: 0`. |
| Archive case rows and framework rows | `y: 24` only. |
| Next-case link and homepage archive action group | `x: -28` only. |

The distinction is implemented normal-motion behavior: linked groups remain
fully opaque and have no entrance clip mask. Noninteractive fades start at zero
rather than a low-opacity waiting state, without `visibility` or accessibility
tree hiding. Full prose paragraphs are not selected by the case-heading loop.
The source and current contrast-check scope are recorded separately in
`docs/verification.md`.

## Material fields, light, and chapter relationships

`src/components/MaterialField.astro` reuses `passage-upper.png` and
`passage-lower.png` as decorative, noninteractive WebP fields. Its base height is
`clamp(12rem, 26vw, 27rem)`, with clipped paint containment and perspective.
Case/archive variants occupy the right side of their entry behind a horizontal
mask at opacity `.8`; the closing variant is subdued at `.22`. At `760px` and
below, case/archive fields become relative, unmasked `12rem` fields at opacity
`1`, after the entry copy. The compact closing field remains behind contact at
opacity `.12`. These are material placements, not reusable card effects.

Shared source relationships in `src/scripts/motion.ts:41-94` are bounded by
scroll position:

| Relationship | Range and values |
| --- | --- |
| Opposing materials | `top bottom` to `bottom top`, scrub `.45`. Upper: x `-3%` to `3%`, y `10%` to `-14%`, rotationY `-11` to `2`, rotationZ `-6` to `-3`. Lower: x `4%` to `-4%`, y `-8%` to `14%`, rotationY `9` to `-3`, rotationZ `-4` to `-7`. Both use perspective `1200` and linear easing. |
| Ambient warm/silver | Document `0` to `max`, scrub `.7`. Warm y `-12%` to `12%`, opacity `.12` to `.65`; silver y `15%` to `-15%`, opacity `.5` to `.12`. The native radial fields in `AmbientField.astro` remain behind content. |
| Cal.diy contention | `top 90%` to `bottom 45%`, scrub `.35`. Bars grow from `scaleY: .12`, `rotationX: 35`, stagger amount `.35`, duration `1`, `power2.out`. The winner's existing background resolves from `#8d8170` over `.5` at `.6`. |
| LLM agreement | `top 90%` to `bottom 50%`, scrub `.35`. Number settles from `y: 35`, scale `.88`, origin `left bottom`, duration `1`, `power2.out`; track grows from `scaleX: 0` over `1` at `.15` with `power2.inOut`. |
| Production trace | The existing one-pixel amber trace grows from `scaleY: 0`, linear easing, over the disclosure list's `top 85%` to `bottom 45%`, scrub `.35`. Native disclosure toggles refresh geometry. |
| Real portrait | Scale `1.09` to `1`, y `3%` to `0`, linear easing; `top bottom` to `bottom 35%`, scrub `.45`. Its `4 / 5` crop and `center 41%` subject placement stay in `About.astro`. |

The diagram labels retain their recorded data and limits. The material field
does not manufacture evidence. Existing gradients and optical transparency are
native to this world; no CSS box-shadow vocabulary was added.

## Cases, archive, and document transitions

`src/pages/work/[slug].astro` preserves project title, context, summary,
report/source actions, and stack as semantic entry content. The entry's material
is decorative; no pinned case introduction delays evidence access. The evidence
component retains each project's distinct table, paper/red audit, or measured
judge treatment. The reading column stays capped at `47rem`, alongside a `17rem`
sticky sidebar until the `900px` stacking breakpoint. Paragraphs remain steady.

The case's fixed `2px` reading line starts at `scaleX(0)` and grows to `1` over
`.case-reading` from `top 40%` to `bottom bottom`, with `scrub: true`. It is an
aria-hidden progress cue, not a reading gate. Heading/rule entrances use the
shared helper. The next-case link remains an ordinary link.

`src/pages/work/index.astro` retains direct case rows and native radio filters.
The filter applies `hidden` to excluded framework rows, updates its status text,
uses the `type` query parameter, and reads history/hash changes. A hidden bookmark
target restores All before scrolling. Filtering emits `portfolio:layout` to
refresh shared trigger geometry. Rows enter by translation alone, keeping the
source/report actions opaque. No extra filtering animation was added.

`src/layouts/BaseLayout.astro:22-25` opts into native cross-document navigation in inline head
CSS before external stylesheet loading. Reduced motion sets `navigation: none`.
`global.css:27-31` gives groups `.42s` with
`cubic-bezier(.16, 1, .3, 1)`, the root exit `.18s ease-out` to opacity `0` and
`translateY(-8px)`, and the root entry `.38s` from opacity `0` and
`translateY(12px)`. Matching `project-testpulse`, `project-caldiy`, and
`project-llm-evaluation` names connect relevant homepage text, archive rows, case
titles, and next-case links. Supported browsers may enhance that ordinary
navigation; the source does not install a client router.

## Compact flow, enlarged text, and lifecycle

The opening below `1024px` uses flex flow for headline, role, introduction,
wrapping actions, and project content. Its side padding is
`min(var(--page-gutter), 5vw)`. The compact display clamp keeps a rem-based
minimum: `clamp(2.3rem, 8.3vw, 5rem)`, then
`clamp(2rem, 9.1vw, 3.5rem)` at `600px`. The title's line height is `1`, its spans
allow normal wrapping, and its maximum width is `100%`. The correction widens
available content space without reducing the requested text enlargement. The
shared body still provides `overflow-wrap: anywhere` as inherited fallback
behavior. The final enlarged-text disposition and captures are referenced by
the visual review; numerical checks belong to `docs/verification.md`.

`experience-motion.ts:40-53` enables compact pinning only when the actual stage
fits its computed minimum height within `2px`. Oversized text therefore keeps
the complete flowing composition instead of a too-short pinned stage. The
desktop plate zoom is omitted on the compact branch; split rasters and bounded
DOM motion provide the lighter path. Case/archive materials stack at `760px`,
case reading stacks at `900px`, and Approach's renderer stays unavailable below
`1024px`. No extra mobile scene is loaded.

Both GSAP initializers listen to live reduced-motion changes and revert their
contexts before configuration. The shared initializer also listens to the
desktop breakpoint and resets inspection progress when unsupported. Its first
configuration leaves the current position alone; later configurations restore
that position immediately. Opening configuration instead preserves the actual
evidence position when its upstream height changes. Window resize and stage
ResizeObserver changes debounce for `150ms`; the opening then emits
`portfolio:layout` after the geometry/position transaction. The shared handler
refreshes ScrollTrigger, also on native experience-disclosure toggles.

Opening bookmarks `#evidence`, `#work`, and legacy `#Portofolio` use the computed
root scroll padding and target scroll margin. Initial matching bookmark arrivals
and later hash changes synchronize the opening's scroll progress. This retains
the existing targets rather than adding another navigation state.

The shared loader waits for idle time with a `1500ms` timeout, or `100ms` without
requestIdleCallback. The opening loader uses an idle timeout of `1200ms`, or
`0ms` fallback, and can load when a reduced-motion visitor later permits motion.
Both initializers remove their media/window listeners and revert contexts on a
non-persisted `pagehide`; the opening also disconnects its ResizeObserver and
clears its timer. A persisted history exit skips that teardown so the browser
can restore the existing page.

The inherited Approach island remains separate: at least `1024px`, no reduced
motion, an intersecting observation area with `120px` root margin, a visible
document, and working WebGL2. Initial activation waits `150ms` after scrolling
settles. Leaving the area or hiding the document removes the live scene and
restores static artwork. The renderer uses demand frames, pixel ratio `[1, 1.5]`,
transmission resolution `512`, and samples `6`; pointer, layer range, or shared
scroll updates invalidate it. Its controls and scene-material values are
unchanged. Reduced-motion CSS uses `.01ms` animation/transition duration and
immediate scrolling; the opening's layout containers explicitly use
`transition-property: none` so geometry settles immediately.

## Canonical changes and inherited differences

The canonical pair now records the active desktop opening display (`7.95vw`),
its actual action geometry (`4.16vw`, `13.67%`, `8.99%`), compact clamps, and the
implemented motion timings and ranges. The obsolete hero-line entrance,
`761px` motion gate, `.8s`/`.18` content reveal, `expo.out` shared entrance, and
`.6s` hero-image scrub are removed from the active description. `expo.out`
remains local to recorded observations. The shared entrance is `.85s` with
`power3.out`; source-specific exceptions remain in this record.

The sidecar retains schema version `2`, palette metadata, synthesized
non-normative swatch ramps, unchanged control previews, and unrelated tokens.
Its motion entries are extracted observations of source behavior, not a new
runtime token layer. Narrative overview and key characteristics mirror the
canonical Markdown; existing named rules and do/don't statements are preserved.

Not canonized or repaired: the inherited archive-filter preview shows All as
`7` while the current source supplies six framework rows. The existing action
previews use line height `1.2`, while live opening actions inherit the body's
`1.65`. Those preview differences do not establish rules for future surfaces.
Inherited clamp/semantic-red advisories remain ordinary recorded differences,
not evidence of a new world or authority to alter source. The owner-approved
Selected work label remains a local exception, not a reusable eyebrow system.
This documentation pass does not certify live pacing, device smoothness,
performance, or hosted completion beyond the separate verification record.
