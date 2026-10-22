# Decisions

## D-001: Isolated replacement with existing repository history

Use a separate clone of the existing repository on codex/qa-portfolio. Keep the
original local checkout unchanged and use the existing Vercel project at launch.
This avoids changing the public URL or losing the current deployment as rollback.

## D-002: Five skills with explicit ownership

The owner approved the routing table in tasks/plan.md. Do not install the six
previously proposed additions. Impeccable owns the visual pipeline; imagegen
produces its requested raster assets. Content, Git, and technical review have
separate owners. Tools execute the plan's checks without adding workflows.

## D-003: Content truth and conceptual art

Resume facts and verified public artifacts govern claims. Employer artwork is
conceptual. TestPulse snapshot freshness, Cal.diy's pinned target and documented
failures, and the LLM judge's exclusion from gates remain visible. Case-study
templates do not justify fabricated team sizes, timelines, or business effects.

## D-004: Images before UI implementation

The owner chose image concepts first in the planning interview and repeated that
requirement in the approved implementation plan. Generate three compositions in
the approved quality-lab family. Record the selected concept before UI authoring.
The rest of the product brief is already confirmed and must not be re-interviewed.

## D-005: Layered monograph composition

The owner selected concept B on comparison page 7bd85de9. The approval is recorded
in .impeccable/mocks/concept-b.png.json and .impeccable/selection.json. Three
compositions were shown together; no further palette or identity interview is
required. The approved image is the measured first-viewport target, with native
HTML text and controls and a deliberate responsive adaptation.
# D006: Native raster limits and explicit layers

The asset tool returned the hero at 1751 x 898 after a targeted resolution retry.
The retained original is not upscaled. The project-detail plate is 2012 x 782 and
uses the approved bleed crop. Both passed the asset tool's actual checks; the
hero comparison passed at 90 percent after semantic text was integrated.
The requested 1.5x hero density from the skill's prose was not produced by the
available generator. Sharpness remains part of the visual review at real sizes.

The hero uses optimized raster artwork behind semantic HTML. The testing-approach
section supplies the real optional 3D interaction. Both layers stay complete when
JavaScript, motion, or WebGL is unavailable.

# D007: Supported, compatible build tooling

Use Node 24, ESLint 10, Astro's current lint plugin, and TypeScript 6.0.3.
TypeScript 7 is outside typescript-eslint's supported range. Disable automatic
peer installation for this project and explicitly pin Vite so optional legacy
accessibility lint peers cannot add an incompatible ESLint dependency. Axe and
the browser suite own measured accessibility verification. Peer checks pass.
