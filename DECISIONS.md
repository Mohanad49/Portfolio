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

## D-008: Overlapping glass in the desktop inspection study

Use Drei's existing MeshTransmissionMaterial so the amber layers can sample other
transmissive layers. Its extra buffers are bounded at 512 square with six samples,
backside rendering disabled, and no temporal distortion. The three inner layers
add three scene passes per demanded frame. The scene still mounts only near the
viewport for eligible desktop visitors and disposes its owned resources on exit.
The owner authorized the final focused material pass, and the visual reviewer
accepted the resulting dark chrome, refracted amber overlap, and graphite field.
See https://drei.docs.pmnd.rs/shaders/mesh-transmission-material.

## D-009: Real WebGL2 coverage in hosted Firefox

The first Ubuntu acceptance run passed 114 checks and failed the Firefox desktop
interaction check. Its trace reported AllowWebgl2:false. Keep that failure as
evidence rather than changing the assertion or skipping the browser. Run Linux CI
Firefox with a virtual display and explicit software WebGL preferences, then prove
that the existing input, rendering, console-error, and context-loss checks pass.
These settings affect the ephemeral test browser, not the deployed application.
Hosted execution remains a gate until the new configuration actually succeeds.
References: https://playwright.dev/docs/ci and
https://bugzilla.mozilla.org/show_bug.cgi?id=1970486.

## D-010: Stable scene entry before GPU initialization

A hosted desktop Chromium bookmark check exposed software-GPU stalls during
initial Contact navigation. Its trace ends at the correct footer, but the native
smooth scroll briefly passes the inspection study and initializes its renderer.
A local 90-frame capture confirms one renderer request and fifteen canvas frames
during that transit. Delay initial activation until scrolling has settled for
150 ms, then recheck visibility, the media query, and document visibility. Keep
immediate deactivation and the behavior of an already active scene. Consume the
latest IntersectionObserver entry and clear pending timers and listeners on exit.
The same capture now records zero renderer requests and zero canvas frames,
reaching the identical Contact scroll position. Preserve the strict bookmark and
real rendering assertions; do not change global smooth scrolling or the artwork.

## D-011: Explicit resume response filename

The PDF bytes matched the supplied resume in preview and production, but Vercel's
default response header named the browser download resume.pdf. Set the descriptive
attachment filename explicitly on /resume.pdf in vercel.json. Preserve the exact
PDF, route, cache policy, and strict download assertion. The authenticated preview
downloads Mohanad_Yehia_Software_QA_Engineer.pdf with the expected SHA-256 digest.
Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Disposition.

## D-012: Current employment metrics and curated testing evidence

The owner confirms 5,000+ authored test cases and 600+ defects driven to resolution
at Blue Ribbon. The existing local Word and PDF resumes already contain these
figures; copy that PDF exactly into the portfolio rather than rebuilding it.
Add the same figures to the GitHub profile and retain the 85% admin-portal scope.
Identify the degree project explicitly as Graduation Project.

Remove the eBay exercise from the curated portfolio and GitHub framework table.
Its source has one externally configured search/filter journey and a parser unit
suite. Broadening a live-marketplace exercise would duplicate stronger existing
Selenium evidence. Keep the repository unchanged, and send its old /project/10 URL
directly to GitHub. The archive now contains six frameworks across four disciplines.

## D-013: Visible mobile reveals, with desktop-only 3D

The owner selected visible, lightweight reveals on both desktop and mobile.
Remove the viewport cutoff from the existing GSAP loader and keep it only around
the hero's image movement. Strengthen the existing once-only evidence reveal from
75% to 18% starting opacity, with 28px displacement over 0.8 seconds. Skip content
already at the current reading position, clear completed styles, and retain live
Reduce Motion cleanup and history restoration. No dependency or mobile Canvas is
added. The static artwork below 1024px remains an intentional performance choice,
not an inference about iPhone or Safari capability.
