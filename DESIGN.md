---
name: Mohanad Yehia Software QA Portfolio
description: A cinematic inspection monograph with clear evidence and controlled amber light.
colors:
  graphite: "#171515"
  ink: "#f8f2e9"
  muted: "#b3ada4"
  amber: "#ffc368"
  line: "#49433b"
  surface: "#1d1a17"
  body-copy: "#d5cec4"
  paper: "#e9e0d4"
  paper-ink: "#252019"
typography:
  display:
    fontFamily: "'Alexandria Variable', sans-serif"
    fontSize: "7.95vw"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Alexandria Variable', sans-serif"
    fontSize: "clamp(2.6rem, 5.5vw, 6rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  title:
    fontFamily: "'Alexandria Variable', sans-serif"
    fontSize: "clamp(1.4rem, 1.9vw, 2.2rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  chapter:
    fontFamily: "'Alexandria Variable', sans-serif"
    fontSize: "clamp(2.75rem, 5.2vw, 6rem)"
    fontWeight: 600
    lineHeight: 1.03
    letterSpacing: "-0.04em"
  chapter-compact:
    fontFamily: "'Alexandria Variable', sans-serif"
    fontSize: "clamp(1.75rem, calc(1rem + 5.7vw), 4.5rem)"
    fontWeight: 600
    lineHeight: 1.03
    letterSpacing: "-0.04em"
  entry-compact:
    fontFamily: "'Alexandria Variable', sans-serif"
    fontSize: "clamp(1.75rem, 10vw, 4.4rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  body:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  body-reading:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "1.075rem"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.65
  action:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "1.25vw"
    fontWeight: 600
    lineHeight: 1.65
rounded:
  square: "0"
  action: "0.6rem"
spacing:
  page-gutter: "clamp(1.25rem, 3.58vw, 5rem)"
  compact-page-gutter: "min(1.25rem, 5vw)"
  section-block: "clamp(4rem, 8vw, 9rem)"
  "8": "0.5rem"
  "16": "1rem"
  "24": "1.5rem"
  "32": "2rem"
  "48": "3rem"
  "64": "4rem"
components:
  button-primary:
    textColor: "#17110a"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    height: "4.16vw"
    width: "13.67%"
  button-primary-hover:
    backgroundColor: "#ffda98"
    textColor: "#17110a"
  button-secondary:
    backgroundColor: "#19171470"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    height: "4.16vw"
    width: "8.99%"
  button-secondary-hover:
    backgroundColor: "#393027"
  text-link:
    textColor: "{colors.ink}"
  navigation:
    textColor: "#d0c9bf"
  filter-option:
    textColor: "{colors.muted}"
    rounded: "{rounded.square}"
    padding: "0.5rem 0"
  filter-option-selected:
    textColor: "{colors.amber}"
  framework-row:
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "2.5rem 0"
  evidence-dark:
    backgroundColor: "{colors.paper-ink}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "clamp(1.5rem, 3.5vw, 4rem)"
  evidence-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.square}"
    padding: "clamp(1.5rem, 3.5vw, 4rem)"
  experience-disclosure:
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "1.8rem 0"
  inspection-controls:
    backgroundColor: "#171411"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "1rem 1.2rem"
  copy-email:
    textColor: "{colors.muted}"
    padding: "0.75rem 0 0.75rem 1rem"
---

# Design System: Mohanad Yehia Software QA Portfolio

## Overview

**Creative North Star: "Exhibition plinth and inspection monograph"**

Matte graphite makes room for warm white typography, quiet controls, and precisely lit inspection materials. The system pairs an exhibition's large visual statements with a monograph's patient reading rhythm. Offset dark chrome and transparent amber layers give the abstract subject a physical form.

Editorial layouts vary with their content: open project entries, ruled framework rows, attributed numerical evidence, long-form reading columns, and the owner's real portrait. Conceptual imagery is identified as artwork. Readable text and controls stay in HTML, with a complete static experience beneath optional motion and explicitly requested 3D. The accepted Pass Through opening leads into Cal.diy's gate, LLM's paired prisms, and the archive's fan, with finite chapter relationships, material-framed case entrances, and a quiet reading body.

**Key Characteristics:**

- Matte graphite, warm white, and a controlled amber accent.
- Alexandria display typography paired with Manrope reading text.
- Rectangular editorial surfaces, fine rules, and generous section spacing.
- Optical depth carried by actual inspection materials and the local live study.
- Complete, project-specific material silhouettes with reserved space before evidence and lists.
- Bounded native-scroll choreography, with steady prose and direct actions.
- Semantic controls, visible focus, and complete static alternatives.

This record extracts application commit `abe295742909c1f1a3110daf404d2f5d19b66523`, primarily the global styles, Pass Through, Opening Readiness, Selected Work, Material Field, both motion initializers, the inspection island and scene, and the work routes. The current surface contracts are `docs/briefs/home.md`, `docs/briefs/case-studies.md`, `docs/briefs/archive.md`, and `docs/briefs/experience.md`; their compositions stay there. Source references and extraction limits are in `docs/experience/d020-design-record.md`. The D-020 `ship` verdict scores six listed fixes, with performance resolved only at the sampled scope. It is not whole-site or production approval; measurements and hosted status belong to `docs/verification.md` and `docs/experience/d020-motion-performance.md`.

## Colors

The palette feels mineral and warm: graphite grounds the work, paper tones carry the reading, and amber supplies illumination and useful state.

### Primary

- **Amber** (`colors.amber`): interactive hover, selected filters, focus outlines, meaningful numerical emphasis, selection, and range-control accent. The primary hero action has its own observed amber gradient, preserved in the sidecar snippet rather than reduced to a flat color token.

### Neutral

- **Graphite** (`colors.graphite`): the main page field and default dark canvas.
- **Warm White** (`colors.ink`): headings, strong emphasis, primary links, and default text.
- **Muted Stone** (`colors.muted`): metadata, captions, boundary notes, supporting links, and secondary descriptions.
- **Warm Rule** (`colors.line`): thin structural dividers around rows, disclosures, metrics, and major sections.
- **Raised Graphite** (`colors.surface`): the production-experience field and the reusable darker surface family.
- **Reading Stone** (`colors.body-copy`): sustained descriptions and case-study prose, separated from brighter headings.
- **Assay Paper** (`colors.paper`): the light Cal.diy case-study audit panel. The homepage Cal.diy chapter uses graphite.
- **Paper Ink** (`colors.paper-ink`): text on Assay Paper and the dark evidence-panel field.

### Named Rules

**The Controlled Light Rule.** Amber identifies illumination, emphasis, or an interactive state; graphite and warm neutrals retain the largest visual fields.

**The Evidence State Rule.** Results retain readable words and scope alongside color. The light Cal.diy audit uses its observed retained-failure red locally; that one evidence treatment does not add a global accent family.

The eight-step OKLCH ramps in `.impeccable/design.json` are synthesized swatch previews. The source defines no tonal scales. Those ramps are non-normative and do not add palette tokens.

Diagram colors remain local to evidence: the Cal.diy contention bars use warm gray (`#756c60`) beside the amber winner, with the winner entering from (`#8d8170`); the retained audit uses red (`#7a311e`) on Assay Paper. TestPulse observation strokes use warm stone (`#d2c6b5`) and a soft failure red (`#f0a091`). Those colors reinforce visible result words and figures. They are not additional global accent families.

## Typography

**Display Font:** Alexandria Variable, with a sans-serif fallback.

**Body Font:** Manrope Variable, with a sans-serif fallback.

**Character:** The display is broad, dense, and closely tracked, with large differences in scale. Manrope keeps explanations and controls calm and readable. The installed family is Alexandria, the approved closest-face implementation of the concept's display character.

### Hierarchy

- **Display:** the frontmatter's display role belongs to the desktop Pass Through opening. Its horizontal compression (`scaleX(.93)`) stays specific to that composition, and type caps at `9rem` from `1800px`. Below `1024px`, the title flows with `clamp(2.3rem, 8.3vw, 5rem)` and line height (`1`); at `600px` and below, it uses `clamp(2rem, 9.1vw, 3.5rem)`. Its two semantic spans may wrap, preserving the rem-based lower bound at enlarged text sizes. TestPulse is one linked heading throughout the opening and arrival, with its own horizontal compression (`scaleX(.95)`).
- **Headline:** the frontmatter records the approach heading as a representative section role. Case-study titles use `clamp(2.8rem, 6.5vw, 7.5rem)`; the archive title uses `clamp(2.5rem, 6.5vw, 7rem)`. Both use the shared compact entry role at `760px` and below.
- **Chapter:** the separate chapter roles record the linked Cal.diy and LLM headings. The compact role applies below `1024px`; its rem-plus-viewport term preserves useful width at enlarged text sizes. Project subheadings use `clamp(1.8rem, 3vw, 3.2rem)` and become `clamp(1.5rem, calc(1rem + 3vw), 1.8rem)` at `600px` and below.
- **Title:** the frontmatter records the approach-step heading. Archive framework titles use the nearby observed clamp `clamp(1.35rem, 2vw, 2.2rem)`. Global headings balance their lines, with semibold weight and close tracking.
- **Body:** the base body role serves ordinary copy. Supporting homepage descriptions sometimes step to `1.1rem`. Long-form case studies use the separate reading role and an upper column width (`47rem`); shorter descriptions commonly stop around `60ch` to `65ch`.
- **Label:** captions and explanatory metadata use the small Manrope role, with local variants from `.75rem` to `.9rem`. Useful context sits below its heading. The owner-approved Selected work label is a retained surface-specific exception, not a general eyebrow pattern.
- **Action:** the desktop opening action role follows the measured viewport and caps at `1.2rem` from `1800px`. Below `1024px`, action type becomes `.9rem` and the action has a minimum height (`48px`); at `600px` and below, type becomes `.85rem`. Its actual line height inherits the body role. The retained sidecar action previews still use (`1.2`); they are known preview drift, not the normative source value. Other links inherit body type with stronger weight.

At `600px` and below, the Approach heading uses `clamp(1.75rem, calc(1.2rem + 4.5vw), 2.3rem)`, production uses `clamp(1.65rem, calc(1rem + 4vw), 2.6rem)`, evidence headings use `clamp(1.5rem, calc(1rem + 3vw), 1.8rem)`, and case prose headings use `clamp(1.25rem, calc(1rem + 3vw), 2.9rem)`. These optical adjustments are deliberate source values, rather than a new universal type scale.

### Named Rules

**The Reading Contrast Rule.** Warm White carries headings and strong emphasis; Reading Stone carries sustained dark-surface prose; Muted Stone carries secondary context.

**The Optical Scale Rule.** Use the observed role and responsive behavior for the surface. This implementation has optical size adjustments, not one universal modular type ratio.

## Layout

The shared fluid page gutter and section padding are the normative spacing tokens above. At `600px` and below, the compact page gutter replaces the default gutter, allowing `5vw` side space to win over a text-scaled rem floor. Recurring gaps use the recorded half-rem through four-rem measures, with optical exceptions in individual components. There is no shared fixed-width wrapper around the entire page.

Desktop compositions use unequal columns and open edges: the TestPulse arrival uses two equal columns, later project chapters use `1fr / 1fr` with a `6%` gap, the approach uses `1fr / 1.1fr`, the portrait section uses `1fr / 1.25fr`, and contact uses `1.4fr / 1fr`. Case entries use `1.15fr / 1fr`; the archive entry uses `1.12fr / 1fr`, both with a `4%` gap. The case-study reading layout centers a `17rem` sidebar beside a flexible column capped at `47rem`, separated by `clamp(3rem, 9vw, 11rem)`.

Later project stages have a minimum height (`100svh`) with block padding (`clamp(3rem, 5vw, 5rem)`). A motion-enabled desktop chapter receives (`170svh`) only at a viewport height of at least (`680px`) and when the complete stage fits within the viewport plus (`2px`). Its stage then sticks at the top. Oversized and compact stages use ordinary flow; the compact stage has no viewport-height minimum and uses (`4rem`) block padding. Material fields occupy a reserved (`3 / 2`) box with the object inset (`7% 6%`), preserve their full silhouettes with `object-fit: contain`, and finish before evidence panels or archive rows. They are no longer clipped fields behind reading surfaces.

Responsive changes are content-specific:

- Below `1024px`, the opening title, role, introduction, actions, and linked project return to normal flow; the header becomes relative, the arrival stacks, and separate upper/lower rasters frame the project. The stage uses a minimum scene height (`max(100svh, 740px)`) and side padding capped at `min(var(--page-gutter), 5vw)`. If enlarged content exceeds that minimum by more than `2px`, the opening keeps its complete flowing composition instead of enabling the sticky sequence.
- At `1000px` and below, the shared header adopts its smaller identity, navigation, and touch-target sizing.
- At `900px` and below, portrait, reading, case-entry, and archive-entry layouts stack, the case sidebar stops sticking, and production metrics change from four columns to two.
- At `760px` and below, archive rows and contact stack. Archive action links move into a row.
- At `760px` and below, case/archive material fields stay in flow, with a maximum width (`38rem`) and margin (`1rem auto`), beneath their entry copy.
- At `600px` and below, the header places the identity above a wrapping visible navigation row. Disclosures reflow, production metrics wrap with a basis of `max(8rem, 45%)`, and the TestPulse strategy comparison becomes a definition list. Case evidence padding becomes `min(1.5rem, 6vw)`.
- The inspection study becomes static and stacked at `1023px` and below. Live 3D requires an explicit visitor request, at least `1024px`, no reduced-motion preference, visibility, and working WebGL2.
- At `1800px` and above, header identity and navigation type stop growing with viewport units.

Hover effects do not supply content or access. Main links and native controls preserve touch-sized targets, commonly a minimum height (`44px`).

## Elevation & Depth

UI surfaces use tonal changes, one-pixel rules, and negative space. The shipped styles define no CSS box-shadow vocabulary. The artwork carries the richer depth: dark chrome, transparent amber, separated layers, a gate, paired prisms, an ordered fan, and reflected light. Native gradients in the primary action and the accepted opening's image treatment belong to this world.

The live inspection study uses dark metal exterior layers and transmitting amber interior layers. Its actual material settings remain in `src/components/InspectionCanvas.tsx`: metalness (`.8`), roughness (`.24`), and environment intensity (`1.2`) for the exterior; transmission (`1`), roughness (`.06`), thickness (`.3`), and index of refraction (`1.35`) for the amber interior. These are scene-specific material settings, not page-surface colors or card effects.

### Named Rules

**The Material Depth Rule.** Reserve optical richness for the inspection object; keep reading surfaces and controls structurally clear with tone and rules.

**The Complete Still Rule.** Artwork and content remain complete before enhancement. Demand-rendered 3D updates on pointer, layer-control, or scroll changes and yields to the static artwork outside its supported conditions.

**The Complete Silhouette Rule.** Reserve the material object's full resting and swept bounds before the next evidence or list surface. Each project's approved negative space is part of its identity, including on compact and enlarged-text layouts.

GSAP owns DOM choreography in two scoped contexts. The opening has a native-scroll sequence with a `.2s` scrub; its desktop plate advances while the compact path separates the upper and lower rasters. The hero title, role, introduction, and actions leave completely, while the same linked TestPulse heading and descriptor move into the arrival. The evidence approaches before the sticky frame releases. The opening is reversible and does not replace native scrolling.

Shared below-viewport entrances run once over `1s` with `power3.out`, starting at `top 82%`. Ordinary groups use `52px` of vertical displacement; linked groups use transforms alone. Noninteractive groups may start at zero opacity. Noninteractive headings outside project chapters may use a `56px` reveal with an inset mask. Completed transforms, opacity, and clip styles clear. Content already above the `82%` threshold stays steady, including restored reading positions. There is no low-opacity waiting state for linked groups.

Project chapters use a `.3s` scrub. Cal.diy's gate travels, rotates, and settles while twenty bars grow and nineteen recede around the amber winner. LLM's paired prisms converge while the retained agreement figure scales into place and its `82%` track reveals. The numeric result remains fixed. Compact or oversized layouts keep the same finite relationships over the figure's native scroll range (`top 90%` to `bottom 45%`) rather than sticking. The diagram containers stay steady, preventing their bars or track from crossing captions.

Other material fields travel from (`44px`, scale `.88`) to (`-32px`, scale `1`) over `top 80%` to `bottom top`, with a `.35s` scrub. The archive fan rotates from (`-12deg`) to (`4deg`); other fields use (`-7deg`) to (`3deg`). Case LLM prisms converge from opposing (`10%`) horizontal offsets. Ambient warm/silver light follows total document progress with a `.7s` scrub. The production trace uses `.35s`; the portrait settles with `.45s`. Evidence rules reveal once over `1.15s`. Case prose remains steady while its headings and rules reveal; a `2px` top progress line tracks the reading region directly. These relationships are finite and scroll-bound. Exact project transforms and relative timeline ranges are recorded in the D-020 design record.

The shared layout opts into native cross-document view transitions in inline head CSS, with a reduced-motion opt-out. The root leaves over `.18s` by `-8px`, enters over `.38s` from `12px`, and named project groups use `.42s` with `cubic-bezier(.16, 1, .3, 1)`. This is progressive enhancement around ordinary document navigation.

Live preference changes revert and reconfigure both GSAP contexts. Global reduced-motion styles disable smooth scrolling and reduce CSS transitions and animations to `.01ms`; pages with the Pass Through opening already use immediate scrolling. Opening resize and stage-size changes settle over `150ms`; general motion uses `180ms` and observes project-stage height changes so text enlargement can release a sticky chapter. Geometry changes retain the reading anchor, then refresh shared layout. Contexts, observers, and listeners clean up on non-persisted page exits and remain available for persisted history restores. A `700px` image-observation margin requests and decodes nearby material images before entry.

The first desktop navigation can show an identity-based readiness field only while the opening's module, active hero imagery, Alexandria 700, and Manrope 400 prepare. Explicit font loads share one promise with general motion. The field has no minimum wait or percentage and releases by `1600ms`, on readiness, or immediately on pointer, key, wheel, page exit, or preference change. Repeat session visits, history navigation, hashes, compact screens, reduced motion, and no JavaScript bypass it. Normal readiness release fades over `.3s`; interaction cancels that fade. Its `1s` indeterminate line is paused when the field is inactive. This is a bounded handoff, not a rendering-speed claim or a dependency on below-fold 3D.

## Shapes

The dominant geometry is rectangular: unrounded evidence panels, ruled rows, flat diagram bars, and uncropped reading regions. Hero actions use the compact action radius. Fine borders separate structure without surrounding every piece of content in a card. The material family deliberately varies outline and negative space: TestPulse's separated layers, Cal.diy's gate, LLM's paired prisms, and the archive's fan. These authored physical forms do not establish new page-container shapes.

The real portrait has a deliberate crop (`4 / 5`), with its face placement retained through the source's object position. Inspection slabs use subtly rounded physical edges; that geometry does not introduce rounded page containers. Icons are inline, open-stroke SVGs, normally `24px`, with smaller contextual variants.

## Components

### Buttons

Quiet, legible actions with the strongest fill reserved for the hero's primary action.

- **Primary:** an amber gradient (`145deg`, `#ffd17d` to `#f4a938`) with dark text; hover becomes `#ffda98`. Desktop size follows the frontmatter, with a minimum height (`44px`); below `1024px`, the flowing layout uses padding (`.85rem 1.2rem`) and a minimum height (`48px`). At `600px` and below, padding becomes `.75rem 1rem`.
- **Secondary:** transparent dark fill, a fine warm border (`#b1a492`), and Warm White text. Hover fills with the recorded secondary hover color.
- **Focus:** a shared amber outline (`2px`) with an offset (`6px`). Color and background transitions last `.2s`.
- **Copy email:** a transparent, muted icon-and-text action. Hover brightens it. The live component reveals it only when clipboard support exists and announces its result in a status region.
- **Reset:** a transparent button inside the inspection control strip, with a minimum height (`44px`). It restores the recorded layer separation (`22%`).

The primary gradient, borders, responsive minimum sizes, and focus rules exceed the frontmatter component schema and are preserved in the sidecar snippets.

### Text Links

Underlined editorial actions with an inline arrow. The shared treatment has a minimum height (`44px`), stronger weight (`600`), and a fine bottom rule. Hover turns the link amber and moves the arrow right (`4px`) over `.25s`. Secondary external links stay muted until hover. On Assay Paper, the Cal.diy link uses its local dark-amber hover to preserve legibility.

### Cards / Containers

Containers follow the content's structure rather than one universal card treatment. Frameworks are open ruled rows; the Cal.diy homepage chapter uses graphite; case evidence uses either Paper Ink with a warm border or the light Cal.diy paper variation. Evidence panels use the extracted fluid padding and compact width-aware padding. No container gains a CSS shadow.

### Inputs / Fields

There are no text-entry fields in the shipped portfolio. Archive filters use native radios with textual labels and visible counts. Selection changes both text and a bottom rule to amber; keyboard focus draws an outline with a local offset (`5px`).

The live inspection study uses a labeled native range input with an amber accent and a minimum height (`44px`). Its strip is a dark rectangular field with a fine Warm Rule border. The input reports separation in accessible text, from (`0%`) through (`100%`), initially (`22%`). Mobile and unsupported states show the complete artwork instead of this control. The sidecar's existing filter preview still says `All 7`; the source derives six frameworks from content. That preview remains unchanged and is not a content authority.

### Navigation

A strong identity and quiet horizontal links form the desktop header. Work's current-page state and link hover are amber. The homepage header overlays the large composition only on desktop; smaller layouts put it in normal flow, then place navigation below the identity. All main links remain visible. Case-study navigation uses a native disclosure and a sticky reading sidebar on wide screens.

### Experience Disclosures

Native details and summary elements form ruled editorial rows. The first job starts open. Company, role, dates, and an inline plus remain readable; the plus rotates (`45deg`) and becomes amber when open. The expanded body aligns beneath the role column on wide screens and returns to the full column on compact screens.

### Layered Inspection Study

The study is a captioned conceptual object, supported by a real static artwork image. Its desktop enhancement renders on demand with a bounded pixel ratio (`1` to `1.5`), transmission resolution (`512`), and samples (`6`). A visible `Inspect in 3D` action initiates the WebGL2 probe and scene import only after the visitor requests it. Its observation margin (`120px`) and supported media conditions gate availability. The static image remains visible while the launch action reports preparation; that button stays focusable. On readiness, focus moves to the range only if the launch action still holds focus. `Reset` restores (`22%`); `Use artwork` returns to the image and launch action. Leaving the observation area, hiding the document, changing preference, context loss, or renderer failure restores the artwork. The scene unmounts when unavailable and removes its listeners and invalidation callback. A remembered request may reactivate when supported conditions return. The scene communicates material and inspection, while actual evidence remains in semantic content.

### Pass Through and Shared Material Fields

The homepage and focused `/experience` study share the same opening component and motion initializer. There is one real linked TestPulse heading, not a decorative duplicate. Work and resume actions are available at rest; fading opening controls use `autoAlpha`, so hidden actions leave keyboard focus. Static and reduced-motion defaults keep the full composition and evidence readable.

The chapter, case, archive, and closing fields share a decorative, noninteractive material component with perspective (`1200px`). TestPulse retains the approved upper/lower raster pair. Cal.diy uses the complete gate; LLM uses a paired-prism raster split into equal left/right masks for opposing convergence; the archive uses the complete fan. Native transparency and contain sizing preserve the object's edges. Case/archive fields occupy the entry's right grid column on wide screens and flow beneath the copy when stacked. Only the contact closing fan sits behind content, at (`40%`) width and (`.19`) opacity on wide screens, then (`65%`) and (`.1`) at `760px` and below. Its subordinate treatment does not replace the complete primary silhouettes.

### Project Diagrams

The Cal.diy diagram contains twenty bars with one full-height amber winner and nineteen warm-gray bars at (`40%`) base height. Its caption supplies one persisted booking and nineteen expected conflicts from the recorded run. The LLM diagram pairs a fixed (`82%`) display with its (`45`) blind-human-label scope, a track filled to (`82%`), and the refusal judge's CI exclusion. Scroll motion reveals relationships without counting up results or moving whole figures across their captions. The case-study measurement panel retains the confidence interval and kappa. These are evidence treatments, not decorative charts or new global accent tokens.

### Cases and Archive Continuation

Case entrances keep title, context, summary, report/source actions, and stack before the material field's compact position. Named project text connects the homepage, archive rows, case titles, and next-case links through native document transitions. Case reading preserves its semantic sidebar disclosure, evidence source, stable prose, and measured heading/rule reveals. Archive case rows and framework rows settle by translation alone; native radio filtering, textual counts, URL state, and direct source/report actions remain the interaction.

## Do's and Don'ts

### Do:

- **Do** use graphite and warm neutrals as the largest fields, with amber carrying illumination or useful state.
- **Do** use the actual Alexandria and Manrope families and preserve the distinction between display, reading, and supporting text.
- **Do** vary editorial structure with the content, using ruled rows, reading columns, and evidence panels where they serve the material.
- **Do** retain visible keyboard focus, readable selected states, semantic controls, and a complete static composition.
- **Do** keep the real portrait and identify conceptual inspection imagery as artwork.
- **Do** keep result labels, numerical scope, and evidence limitations readable beside their visual emphasis.
- **Do** reserve complete material silhouettes before evidence panels and lists, with ordinary flow when a full chapter cannot fit.
- **Do** keep 3D an explicit optional action and retain the artwork through preparation and unsupported states.

### Don't:

- **Don't** extend the approved Selected work label into a new system of decorative eyebrows or arbitrary indices.
- **Don't** replace the inspection materials with generic glowing objects or fake report interfaces.
- **Don't** add elevated shadows to reading panels or turn the varied editorial content into one repeated card template.
- **Don't** use amber alone to communicate a result or selected state.
- **Don't** require animation, WebGL, or clipboard support to reach the content, resume, or contact information.
- **Don't** treat synthesized preview tonal ramps as source tokens or approved new surface colors.
- **Don't** count up recorded results or move whole diagrams across their captions to imply activity.
- **Don't** impose a minimum readiness delay or wait for the optional renderer before releasing the opening.
