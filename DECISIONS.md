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

## D-014: An experience study before broader motion integration

The owner approved the recommended next step: storyboard the opening and
TestPulse on desktop/mobile, then prototype the strongest sequence against the
current site. Keep the established material identity and factual copy, while
allowing a more expressive interaction. The study is separate from production.

Three composition probes compare an opening fan, a short advance through a
material slot, and a specimen travelling between sections. On 2026-10-23 the
owner selected B: Pass Through after reviewing the desktop and mobile concepts.
Its approved image is .impeccable/mocks/experience/pass-through.png.

Use the current public TestPulse export for the second sequence. The selected
Cal.diy API booking-lifecycle history includes passed and failed observations at
one commit; retain the actual dates, unknown retry counts, and snapshot boundary.
Do not substitute synthetic red/green cells for the real evidence.

After selection, implement only the study in an isolated preview and measure
mobile comfort and rendering cost. Keep the existing acceptance thresholds and
one shared verification record. Integration and production replacement are
separate decisions after the prototype comparison.

## D-015: One native scroll sequence, with stable evidence access

The isolated /experience route has a short sticky opening, immediate work/resume
actions, and three immutable TestPulse observations. GSAP owns scroll progress
and HTML transforms; React Three Fiber reads that progress and renders five
actual desktop volumes on demand. It does not run a perpetual frame loop.
Mobile opens two alpha-cut material plates over 45% of a viewport of travel.
Reduce Motion and no JavaScript show the complete still and semantic evidence.

This route overrides inherited smooth fragment scrolling with native immediate
anchor navigation. The first production-build check exposed a stale fragment
destination when enhancement lengthened the opening during smooth scrolling.
Opening height changes now belong to the same configuration transaction as
reading-position compensation, rather than changing earlier in media-query CSS.
Completed evidence reveals stay completed across preference and size changes.

HTML project lettering remains above the scene so a transmissive surface cannot
hide the destination. The rebuilt renderer uses original chrome and reflection
maps, with cloned color/data textures and a transmission background. A transparent
canvas cannot refract HTML behind it.
The static concept and actual real-time material are reviewed separately.
Reference: https://drei.docs.pmnd.rs/shaders/mesh-transmission-material and
https://drei.docs.pmnd.rs/staging/environment.

## D-016: Keep the desktop material rejection visible

Two independent full reviews of the isolated prototype return rebuild. The
second resolves mobile action clearance, but the live desktop finish still has
broad white/beige reflections and opaque-looking gold planes. It does not match
the approved textured dark chrome, luminous amber volume, and close passage.
The static composition's 94.2% match is a separate result, not a visual approval
of the live scene. Retain both reports and present the actual preview before
deciding between another 3D rebuild and an explicitly approved layered treatment.

Do not integrate or replace production while that material finding remains open.
The existing mobile treatment, factual observations, immediate work/resume access,
complete fallbacks, and original homepage stay intact in this comparison snapshot.

## D-017: Preserve B with cinematic artwork layers

The owner rejected the hosted renderer as visibly unlike the approved B artwork
and authorized preserving the cinematic layered artwork if the renderer could
not match it. Two independent full reviews had already found that material gap.
Choose the authorized layered treatment rather than extend the rejected renderer.

Desktop keeps the approved text-free plate continuous and advances toward its
existing slot with a bounded native-scroll push. The first layered capture exposed
a hard horizontal seam when that image was split, so no artificial cut ships.
Mobile retains the independently moving transparent cutouts. Keep semantic HTML, immediate actions, compact mobile cutouts, and
complete reduced-motion/no-JavaScript states. Remove the prototype-only renderer
and its abandoned maps. Keep the homepage's standalone inspection scene intact.

This resolves the implementation strategy, not visual acceptance. Archive the
rejected build/captures, perform a fresh full finish review of the new treatment,
and update the isolated preview. Production integration remains outside scope.

## D-018: One TestPulse heading from aperture to work section

The owner accepts the artwork treatment but identifies a broken handoff: the
decorative TestPulse grows, stops, and is followed by a second TestPulse heading.
Replace the duplicate with one real linked heading that grows into the complete
work introduction. Fade the hero title, role, description, and buttons fully as
the material field advances and clears. Release the sticky frame only after the
TestPulse introduction is complete, then continue into its existing evidence.

Focal moment: the material aperture becomes the work itself. Continuity: the
same heading and descriptor retain their identity throughout, with existing
approved explanatory copy introducing the project. Feedback: work/resume access
is immediate at rest; hidden hero controls leave keyboard focus when faded.
Budget: a bounded native-scroll timeline, transforms and opacity, no renderer,
new asset, dependency, forced snap, or custom scrolling. Reverse scrolling must
restore the complete opening. Static and Reduce Motion paths remain complete.
The opening's extra travel uses measured pixel height, updated with resize in
the same reading-position transaction. Layout containers opt out of the global
reduced-motion transition shortcut so padding and margins settle immediately.
The evidence approaches from below during the final part of the transformation,
avoiding an empty viewport between the introduction and actual observations.
The enhanced arrival wrapper starts hidden while its layout changes from static
flow to the pinned scene. GSAP reveals that wrapper, with a separate small copy
translation, so initialization cannot move a visible layout box into the opening.
Static and reduced-motion styles keep the wrapper visible without enhancement.

Impeccable owns the choreography and finish. The newly installed official
gsap-scrolltrigger skill supplies API guidance only. The inspected timeline and
transitions.dev skills stay inactive, with no second motion system. Official
references: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ and
https://gsap.com/docs/v3/GSAP/gsap.context()/.
Apply this refinement to the isolated /experience preview; production integration
remains a separate decision.

## D-019: Carry the accepted opening through the full portfolio

On 2026-10-25 the owner accepted D-018 and requested a similarly memorable full
website, including the case studies. Promote that opening to the preview homepage
and extend the existing world through content-specific chapter motion. Keep the
focused /experience study, source facts, and production recovery point.

This extends approved surfaces and materials, rather than selecting a new world.
The prior image approvals and explicit D-018 acceptance remain visual authority.
No new raster concept or material rebuild is needed. Impeccable owns the motion
thesis, implementation, visual review, and documentation. The case-study writer
is inactive because facts and narratives are unchanged; imagegen is inactive
because existing approved assets suffice. Git and technical source review retain
their existing separate responsibilities. No extra workflow is activated.

Focal moment: accepted Pass Through. Continuity: distinct Cal.diy contention,
LLM comparison, production trace, inspection, portrait, and contact sequences.
Feedback: native navigation, project links, filters, disclosures, and contact
remain direct. Budget: bounded GSAP timelines, native CSS document transitions,
and the existing on-demand Approach renderer. No smooth-scroll replacement,
client router, perpetual background loop, or additional animation dependency.

Case-study entrances share the material language; prose remains steady. Preserve
static content, Reduce Motion, focus, bookmarks, history, resource cleanup,
responsive reflow, and enlarged text. Reuse the existing acceptance thresholds
and one current-source verification record. Full visual/source reviews precede
preview completion. Production replacement remains a separate decision.

Reference inspection: https://landonorris.com/ supplies a pacing reference, not
assets or product content. Implementation references are GSAP ScrollTrigger and
MDN's native cross-document View Transition API documentation.

Completion: the preview now carries the accepted opening through the homepage,
archive, and all three cases. The fresh visual review's sole enlarged-text
finding is resolved; technical findings and the final hosted checks are complete.
The canonical design pair describes the implemented motion system. Current
evidence, exact source identities, measurements, and review scopes are recorded
in docs/verification.md and the separate review records. Production replacement
remains an owner decision after reviewing this complete preview.

## D-020: Resolve the owner's full-site continuity and motion feedback

Date: 2026-10-26. The owner rejected the D-019 material cutoffs and repeated slab
composition using three actual preview screenshots. Preserve the accepted Pass
Through opening and production. Impeccable owns this refinement; a fresh full
visual review consumes the owner's evidence. Imagegen produces distinct material
forms only from Impeccable's briefs. No competing workflow or motion library.

The narrow target is continuity across the Cal.diy homepage chapter, case-entry
and evidence boundaries, and archive list; clearly legible QA project identity;
more visible, content-specific project choreography; and measured desktop
startup/scroll performance. Do not claim that a blocking loader improves render
speed. Record before/after results and keep the complete static, reduced-motion,
zoom, mobile, keyboard, history, and unsupported-WebGL paths.

Initial local desktop profiling found no startup long tasks, but a 2099.8 ms
frame gap during automatic activation of the optional Approach WebGL scene.
This is headless Chromium with software WebGL, not a physical-device benchmark.
The retained baseline is .research/d020/performance-before.json. Investigate
renderer activation, critical-resource readiness, and image decode timing.

Asset direction: retain the approved materials and lighting, with a concurrency
gate for Cal.diy, paired optical forms for LLM evaluation, and an ordered fan for
the archive. Present the new family before dependent UI integration. The accepted
opening remains the primary sequence; later projects gain their own bounded
scroll narrative instead of repeated subtle entrances.

The first visual batch found two diagram entrances crossing their own captions
and word fragmentation at 320px with 200% text. The correction removes vertical
figure translation, caps compact whitespace, and uses fluid rem-based heading
floors. Metrics wrap into one column when enlarged text needs it. Normal opening
geometry is preserved. A keyboard focus handoff also follows explicit 3D startup;
loading never disables the focused launch button or steals focus after tabbing away.

One initial Approach component capture left its last entrance unsettled. It is
invalid for finish acceptance and is replaced in the confirmation batch, after
scrolling the complete component to settle every entry. The other initial captures
were opened and validated. The final packet must use the refreshed manifest.

The first complete D-020 hosted run, 40249515832, recorded 283 passes, 12
established applicability skips, and three WebKit failures in the deliberate
delayed-module scenario. The original fixture waited for load while holding
an opening-module request. Moving to document commit exposed a real second
dependency: WebKit reported the two fonts loaded while document.fonts.ready
remained pending and general motion had not initialized.

The retained probe is .research/d020/webkit-held-font-state.json. Startup now
uses one shared preparation promise for explicit Alexandria and Manrope loads,
rather than document-wide font-set readiness. The fixture waits for the actual
general-motion state and releases its held request in finally. All original
growth and geometry assertions remain. The corrected nine-configuration run
passes with no failures, skips, retries, or filters. Application markup, styles,
rasters, and settled choreography are unchanged by this resource-readiness fix;
startup timing evidence is refreshed for the amended code.
