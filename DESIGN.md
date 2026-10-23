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
    fontSize: "9.96vw"
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
    lineHeight: 1.2
rounded:
  square: "0"
  action: "0.6rem"
spacing:
  page-gutter: "clamp(1.25rem, 3.58vw, 5rem)"
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
    height: "4.1vw"
    width: "13.54%"
  button-primary-hover:
    backgroundColor: "#ffda98"
    textColor: "#17110a"
  button-secondary:
    backgroundColor: "#19171470"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    height: "4.1vw"
    width: "8.92%"
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

Editorial layouts vary with their content: open project entries, ruled framework rows, attributed numerical evidence, long-form reading columns, and the owner's real portrait. Conceptual imagery is identified as artwork. Readable text and controls stay in HTML, with a complete static experience beneath optional motion and 3D.

**Key Characteristics:**

- Matte graphite, warm white, and a controlled amber accent.
- Alexandria display typography paired with Manrope reading text.
- Rectangular editorial surfaces, fine rules, and generous section spacing.
- Optical depth concentrated in the inspection artwork and live study.
- Semantic controls, visible focus, and complete static alternatives.

This record extracts the completed source, primarily `src/styles/global.css`, the homepage components, `src/pages/work/index.astro`, and `src/pages/work/[slug].astro`. The approved world is recorded in `docs/briefs/home.md`; its first-viewport composition stays there. The completed visual disposition is recorded in `docs/visual-review.md`.

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
- **Assay Paper** (`colors.paper`): the light Cal.diy project and evidence panel.
- **Paper Ink** (`colors.paper-ink`): text on Assay Paper and the dark evidence-panel field.

### Named Rules

**The Controlled Light Rule.** Amber identifies illumination, emphasis, or an interactive state; graphite and warm neutrals retain the largest visual fields.

**The Evidence State Rule.** Results retain readable words and scope alongside color. The light Cal.diy audit uses its observed retained-failure red locally; that one evidence treatment does not add a global accent family.

The eight-step OKLCH ramps in `.impeccable/design.json` are synthesized swatch previews. The source defines no tonal scales. Those ramps are non-normative and do not add palette tokens.

## Typography

**Display Font:** Alexandria Variable, with a sans-serif fallback.

**Body Font:** Manrope Variable, with a sans-serif fallback.

**Character:** The display is broad, dense, and closely tracked, with large differences in scale. Manrope keeps explanations and controls calm and readable. The installed family is Alexandria, the approved closest-face implementation of the concept's display character.

### Hierarchy

- **Display:** the frontmatter's display role belongs to the desktop hero. Its existing horizontal compression (`scaleX(.93)`) is specific to that measured composition. At the flowing layout it uses `clamp(2rem, 9.96vw, 6.2rem)`; compact screens use `clamp(2rem, 10vw, 4.5rem)` with a more open line height (`1.05`).
- **Headline:** the frontmatter records the approach heading as a representative section role. Other implemented section headings use content-specific clamps. Case-study titles use `clamp(2.8rem, 8vw, 9rem)` and the archive title uses `clamp(2.5rem, 7.5vw, 8.5rem)`.
- **Title:** the frontmatter records the approach-step heading. Archive framework titles use the nearby observed clamp `clamp(1.35rem, 2vw, 2.2rem)`. Global headings balance their lines, with semibold weight and close tracking.
- **Body:** the base body role serves ordinary copy. Supporting homepage descriptions sometimes step to `1.1rem`. Long-form case studies use the separate reading role and an upper column width (`47rem`); shorter descriptions commonly stop around `60ch` to `65ch`.
- **Label:** captions and explanatory metadata use the small Manrope role, with local variants from `.75rem` to `.9rem`. Useful context sits below its heading. The owner-approved Selected work label is a retained surface-specific exception, not a general eyebrow pattern.
- **Action:** the desktop hero action role follows the measured viewport. At widths up to `1000px`, action type becomes `.9rem` and the action has a minimum height (`48px`). Other links inherit body type with stronger weight.

### Named Rules

**The Reading Contrast Rule.** Warm White carries headings and strong emphasis; Reading Stone carries sustained dark-surface prose; Muted Stone carries secondary context.

**The Optical Scale Rule.** Use the observed role and responsive behavior for the surface. This implementation has optical size adjustments, not one universal modular type ratio.

## Layout

The shared fluid page gutter and section padding are the normative spacing tokens above. Recurring gaps use the recorded half-rem through four-rem measures, with optical exceptions in individual components. There is no shared fixed-width wrapper around the entire page.

Desktop compositions use unequal columns and open edges: featured-work copy uses two columns, secondary work uses a `1.1fr / 1fr` split, the approach uses `1fr / 1.1fr`, the portrait section uses `1fr / 1.25fr`, and contact uses `1.4fr / 1fr`. The case-study reading layout centers a `17rem` sidebar beside a flexible column capped at `47rem`, separated by `clamp(3rem, 9vw, 11rem)`.

Responsive changes are content-specific:

- At `1000px` and below, the hero, featured-work introduction, and header return to normal flow. Hero artwork becomes a cropped lower visual field, while actions become padded controls.
- At `900px` and below, portrait and reading layouts stack, the case sidebar stops sticking, and production metrics change from four columns to two.
- At `760px` and below, featured copy, secondary projects, archive rows, and contact stack. Archive action links move into a row.
- At `600px` and below, the header places the identity above a wrapping visible navigation row. Disclosures reflow, metrics fit available width, and the TestPulse strategy comparison becomes a definition list.
- The inspection study becomes static and stacked at `1023px` and below. Live 3D requires at least `1024px`, no reduced-motion preference, visibility, and working WebGL2.
- At `1800px` and above, header identity and navigation type stop growing with viewport units.

Hover effects do not supply content or access. Main links and native controls preserve touch-sized targets, commonly a minimum height (`44px`).

## Elevation & Depth

UI surfaces use tonal changes, one-pixel rules, and negative space. The shipped styles define no CSS box-shadow vocabulary. The artwork carries the richer depth: dark chrome, transparent amber, separated slabs, reflected light, and a subdued plinth-like field. Native gradients in the primary action and image masks belong to this world.

The live inspection study uses dark metal exterior layers and transmitting amber interior layers. Its actual material settings remain in `src/components/InspectionCanvas.tsx`: metalness (`.8`), roughness (`.24`), and environment intensity (`1.2`) for the exterior; transmission (`1`), roughness (`.06`), thickness (`.3`), and index of refraction (`1.35`) for the amber interior. These are scene-specific material settings, not page-surface colors or card effects.

### Named Rules

**The Material Depth Rule.** Reserve optical richness for the inspection object; keep reading surfaces and controls structurally clear with tone and rules.

**The Complete Still Rule.** Artwork and content remain complete before enhancement. Demand-rendered 3D updates on pointer, layer-control, or scroll changes and yields to the static artwork outside its supported conditions.

DOM motion uses small entrances and slow image displacement. The hero lines enter over `.9s`, revealed content over `.85s`, and scroll movement uses a `.6s` scrub. These enhancements require a width of at least `761px` and no reduced-motion preference. Global reduced-motion styles disable smooth scrolling and reduce CSS transitions and animations to `.01ms`. Initial 3D activation waits for `150ms` of settled scrolling within its observation area; leaving that area immediately restores the static artwork.

## Shapes

The dominant geometry is rectangular: unrounded evidence panels, ruled rows, flat diagram bars, and uncropped reading regions. Hero actions use the compact action radius. Fine borders separate structure without surrounding every piece of content in a card.

The real portrait has a deliberate crop (`4 / 5`), with its face placement retained through the source's object position. Inspection slabs use subtly rounded physical edges; that geometry does not introduce rounded page containers. Icons are inline, open-stroke SVGs, normally `24px`, with smaller contextual variants.

## Components

### Buttons

Quiet, legible actions with the strongest fill reserved for the hero's primary action.

- **Primary:** an amber gradient (`145deg`, `#ffd17d` to `#f4a938`) with dark text; hover becomes `#ffda98`. Desktop size follows the frontmatter; the flowing layout uses padding (`.85rem 1.2rem`) and a minimum height (`48px`).
- **Secondary:** transparent dark fill, a fine warm border (`#b1a492`), and Warm White text. Hover fills with the recorded secondary hover color.
- **Focus:** a shared amber outline (`2px`) with an offset (`6px`). Color and background transitions last `.2s`.
- **Copy email:** a transparent, muted icon-and-text action. Hover brightens it. The live component reveals it only when clipboard support exists and announces its result in a status region.
- **Reset:** a transparent button inside the inspection control strip, with a minimum height (`44px`). It restores the recorded layer separation (`22%`).

The primary gradient, borders, responsive minimum sizes, and focus rules exceed the frontmatter component schema and are preserved in the sidecar snippets.

### Text Links

Underlined editorial actions with an inline arrow. The shared treatment has a minimum height (`44px`), stronger weight (`600`), and a fine bottom rule. Hover turns the link amber and moves the arrow right (`4px`) over `.25s`. Secondary external links stay muted until hover. On Assay Paper, the Cal.diy link uses its local dark-amber hover to preserve legibility.

### Cards / Containers

Containers follow the content's structure rather than one universal card treatment. Frameworks are open ruled rows; the Cal.diy project uses Assay Paper; case evidence uses either Paper Ink with a warm border or the light paper variation. Evidence panels use the extracted fluid padding. No container gains a CSS shadow.

### Inputs / Fields

There are no text-entry fields in the shipped portfolio. Archive filters use native radios with textual labels and visible counts. Selection changes both text and a bottom rule to amber; keyboard focus draws an outline with a local offset (`5px`).

The live inspection study uses a labeled native range input with an amber accent and a minimum height (`44px`). Its strip is a dark rectangular field with a fine Warm Rule border. The input reports separation in accessible text. Mobile and unsupported states show the complete artwork instead of this control.

### Navigation

A strong identity and quiet horizontal links form the desktop header. Work's current-page state and link hover are amber. The homepage header overlays the large composition only on desktop; smaller layouts put it in normal flow, then place navigation below the identity. All main links remain visible. Case-study navigation uses a native disclosure and a sticky reading sidebar on wide screens.

### Experience Disclosures

Native details and summary elements form ruled editorial rows. The first job starts open. Company, role, dates, and an inline plus remain readable; the plus rotates (`45deg`) and becomes amber when open. The expanded body aligns beneath the role column on wide screens and returns to the full column on compact screens.

### Layered Inspection Study

The study is a captioned conceptual object, supported by a real static artwork image. Its desktop enhancement renders on demand with a bounded pixel ratio (`1` to `1.5`), transmission resolution (`512`), and samples (`6`). It loads near the viewport, pauses out of view or when the document is hidden, and falls back when WebGL is unavailable. The scene communicates material and inspection, while actual evidence remains in semantic content.

## Do's and Don'ts

### Do:

- **Do** use graphite and warm neutrals as the largest fields, with amber carrying illumination or useful state.
- **Do** use the actual Alexandria and Manrope families and preserve the distinction between display, reading, and supporting text.
- **Do** vary editorial structure with the content, using ruled rows, reading columns, and evidence panels where they serve the material.
- **Do** retain visible keyboard focus, readable selected states, semantic controls, and a complete static composition.
- **Do** keep the real portrait and identify conceptual inspection imagery as artwork.
- **Do** keep result labels, numerical scope, and evidence limitations readable beside their visual emphasis.

### Don't:

- **Don't** extend the approved Selected work label into a new system of decorative eyebrows or arbitrary indices.
- **Don't** replace the inspection materials with generic glowing objects or fake report interfaces.
- **Don't** add elevated shadows to reading panels or turn the varied editorial content into one repeated card template.
- **Don't** use amber alone to communicate a result or selected state.
- **Don't** require animation, WebGL, or clipboard support to reach the content, resume, or contact information.
- **Don't** treat synthesized preview tonal ramps as source tokens or approved new surface colors.
